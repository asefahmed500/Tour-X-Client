import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useBooking from "../../../../Hooks/useBooking";
import useAuth from "../../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState(null);
    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [booking, refetch] = useBooking();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Calculate total price from the booking items
    const totalPrice = booking.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            // Create Payment Intent with the total price
            axiosSecure.post('create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error("Error creating payment intent:", err);
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setLoading(true); // Start loading

        const card = elements.getElement(CardElement);
        if (card == null) {
            setError('Card information is incomplete.');
            setLoading(false);
            return;
        }

        try {
            // Create Payment Method
            const { error: methodError} = await stripe.createPaymentMethod({
                type: 'card',
                card,
                billing_details: {
                    email: user.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            });

            if (methodError) {
                setError(methodError.message);
                setLoading(false);
                return;
            }

            // Confirm the payment
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    }
                }
            });

            if (confirmError) {
                setError(confirmError.message);
                setLoading(false);
                return;
            }

            // Payment succeeded, store transaction ID
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                // Save payment info in database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    bookingItemIDs: booking.map(item => item._id),
                    packageItemIds: booking.map(item => item.bookingItemID),
                    status: 'pending'
                };

                const res = await axiosSecure.post('/payments', payment);
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment was successful!",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    refetch();
                    navigate('/dashboard/paymenthistory');
                }
            }
        } catch (err) {
            console.error('Error during payment process:', err);
            setError('An error occurred during payment. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className="btn btn-square my-6"
                    type="submit"
                    disabled={!stripe || !clientSecret || loading}
                >
                    {loading ? 'Processing...' : 'Pay'}
                </button>
                {error && <p className="text-red-600">{error}</p>}
                {transactionId && <p className="text-green-300">Your transaction ID: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckOutForm;
