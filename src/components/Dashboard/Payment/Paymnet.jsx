import { loadStripe } from '@stripe/stripe-js';
import SectionTitle from '../../SectionTitle/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutFrom from './CheckOutFrom/CheckOutFrom';



const  stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
const Paymnet = () => {
    return (
        <div>

            <SectionTitle
            headings="Payment"
            subheadings="Pay for the Tour">

            </SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutFrom>

                    </CheckOutFrom>
                </Elements>
            </div>
            
        </div>
    );
};

export default Paymnet;