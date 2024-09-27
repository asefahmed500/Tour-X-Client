import { useEffect, useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom'; // Removed 'useNavigate'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosPublic from '../../Hooks/useAxiosPublic'; 
import { useToast } from '../../Hooks/useToast';
import { Card } from 'flowbite-react';
import useAuth from '../../Hooks/useAuth';

const GuidesDetails = () => {
    const { _id } = useLoaderData(); // Get the guide's ID from the route loader
    const [date, setDate] = useState(null); 
    const [guide, setGuide] = useState(null); 
    const [bookingSuccess, setBookingSuccess] = useState(false); // Track booking success
    const axiosPublic = useAxiosPublic(); 
    const { showToast } = useToast();
    const { user } = useAuth();

    // Fetch the guide details based on the guide ID
    useEffect(() => {
        const fetchGuide = async () => {
            try {
                const response = await axiosPublic.get(`/guides/${_id}`);
                setGuide(response.data);
            } catch (error) {
                console.error('Error fetching guide details:', error);
                alert('There was a problem retrieving the guide details. Please try again later.');
            }
        };

        fetchGuide();
    }, [_id, axiosPublic]);

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!date) {
            alert('Please select a date!');
            return;
        }

        if (user && user.email) {
            const bookingData = {
                guideId: _id,
                date,
                name: guide.name,
                email: guide.email,
                bookedBy: user.email, // Include the user who booked the guide
            };

            try {
                const response = await axiosPublic.post('/guide', bookingData);
                console.log('Booking successful:', response.data);
                showToast(`${guide.name} booked successfully!`);
                setBookingSuccess(true); // Set booking success to true
            } catch (error) {
                console.error('Error booking guide:', error);
                showToast('Failed to book guide.');
            }
        } else {
            alert('Please log in to book a guide.');
        }
    };

    if (!guide) return <div>Loading...</div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="guide-details">
                <Card className="max-w-sm w-full" imgSrc={guide.profilePicture} horizontal>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {guide.name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Experience: {guide.experience}
                    </p>
                    <form onSubmit={handleBooking}>
                        <div>
                            <label>Select Date:</label>
                            <DatePicker selected={date} onChange={(date) => setDate(date)} />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Hire Me</button>
                    </form>
                </Card>

                {/* Conditionally show the "Back to Home" button after a successful booking */}
                {bookingSuccess && (
                    <div className="btn mt-4">
                        <Link to="/">
                            <button className="btn btn-secondary">Back to Home</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GuidesDetails;
