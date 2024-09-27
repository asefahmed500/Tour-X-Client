// Make sure to import your custom hook if you have one

import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyAssignedTours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure(); // Use the custom axios instance if available
    const { user } = useAuth(); // Assuming useAuth provides the authenticated user's data

    useEffect(() => {
        const fetchAssignedTours = async () => {
            try {
                const email = user?.email; // Fetch the logged-in guide's email from user context
                if (!email) throw new Error('Guide email not found');

                const response = await axiosSecure.get(`/guide/${email}`);
                setTours(response.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch tours');
            } finally {
                setLoading(false);
            }
        };

        fetchAssignedTours();
    }, [axiosSecure, user]);

    if (loading) return <p>Loading assigned tours...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="assigned-tours">
        <h2>My Assigned Tours</h2>
        {tours.length > 0 ? (
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>User ID</th>
                            <th>Date</th>
                            <th>Guide Name</th>
                            <th>Guide Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tours.map((tour, index) => (
                            <tr key={tour._id}>
                                <th>{index + 1}</th>
                                <td>{tour.bookedBy}</td>
                                <td>{tour.date}</td>
                                <td>{tour.name}</td>
                                <td>{tour.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <p>No tours assigned yet.</p>
        )}
    </div>
    
    );
};

export default MyAssignedTours;
