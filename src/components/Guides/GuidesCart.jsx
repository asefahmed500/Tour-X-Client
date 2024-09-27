import { useNavigate } from 'react-router-dom';

const GuidesCart = ({ guide }) => {
    const { _id, name, profilePicture, experience } = guide; // Ensure guide has an ID
    console.log('Guide ID:', _id);

    const navigate = useNavigate(); // For navigation

    const handleBookNow = () => {
        navigate(`/guides/${_id}`); // Redirect to the details page for booking
    };

    return (
        <div className="card bg-base-100  shadow-xl">
            <figure className="px-10 pt-10">
                <img
                    src={profilePicture}
                    alt={name}
                    className="rounded-xl w-24" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>Experience: {experience}</p>
                <div className="card-actions">
                    <button className="btn btn-primary" onClick={handleBookNow}>Book Now</button>
                </div>
                
            </div>
        </div>
    );
};

export default GuidesCart;
