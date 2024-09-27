import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useBooking from "../../Hooks/useBooking";
import Swal from "sweetalert2";


const TourPackageCard = ({ item }) => {
    const { name, tourType, description, price, image } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useBooking();

    const handlePackageCart = (packageCart) => {
        if (user && user.email) {
            const bookingItem = {
                bookingItemID: packageCart._id,
                email: user.email,
                name: packageCart.name,
                image: packageCart.image,
                price: packageCart.price
            };

            console.log("Booking item to be sent:", bookingItem); // Log the booking item being sent

            axiosSecure.post("/bookings", bookingItem)
                .then((res) => {
                    console.log("Server response:", res.data); // Log the response from the server
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${packageCart.name} has been added to your cart`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        refetch();
                    }
                })
                .catch((error) => {
                    console.error("Error adding to cart:", error.response); // Log the error with the response object
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to add the item to your cart',
                    });
                });
        } else {
            Swal.fire({
                title: "You are not logged in!",
                text: "Please login to add items to your cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };


    return (
        <div>
            <div className="card bg-base-100 w-72 min-h-full shadow-xl">
                <figure className="px-10 pt-10">
                    <img
                        src={image}
                        alt="place"
                        className="rounded-xl w-48 h-36" />
                </figure>
                <div className="card-body items-center text-center space-y-1">
                    <h2 className="card-title">{name}</h2>
                    <div className="badge badge-secondary">{tourType}</div>
                    <p>{description}</p>
                    <h2>${price}</h2>
                    <div className="card-actions">
                        <button onClick={() => handlePackageCart(item)}
                            className="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourPackageCard;