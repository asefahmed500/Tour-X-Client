import { useEffect, useState } from 'react';
import { FaUserCircle, FaBook, FaDollarSign } from 'react-icons/fa';
import useAuth from './../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const UserHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({ totalBookings: 0, totalSpent: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (user?.email) {
                try {
                    const res = await axiosSecure.get(`/user-stats/${user.email}`);
                    setStats(res.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Failed to fetch user stats:', error);
                }
            }
        };
        fetchStats();
    }, [user, axiosSecure]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="flex items-center gap-4">
                <FaUserCircle className="text-4xl" />
                <h2 className="text-3xl">
                    <span className="mr-2">Welcome</span>
                    {user?.displayName ? user.displayName : 'Unknown'}
                </h2>
            </div>

            <div className="stats shadow mt-4">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaBook className='text-3xl' />
                    </div>
                    <div className="stat-title">Total Bookings</div>
                    <div className="stat-value">{stats.totalBookings}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className='text-3xl' />
                    </div>
                    <div className="stat-title">Total Spent</div>
                    <div className="stat-value">${stats.totalSpent}</div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
