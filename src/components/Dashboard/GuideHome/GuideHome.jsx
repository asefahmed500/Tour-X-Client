import { useEffect, useState } from 'react';
import { FaBook, FaStar, FaUserCircle } from 'react-icons/fa';
import useAuth from './../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const GuideHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({ totalAssignedTours: 0, totalReviews: 0, avgRating: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (user?.email) {
                try {
                    const res = await axiosSecure.get(`/guide-stats/${user.email}`);
                    setStats(res.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Failed to fetch guide stats:', error);
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
                    {user?.displayName ? user.displayName : 'Guide'}
                </h2>
            </div>

            <div className="stats shadow mt-4">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaBook className="text-3xl" />
                    </div>
                    <div className="stat-title">Assigned Tours</div>
                    <div className="stat-value">{stats.totalAssignedTours}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaStar className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Reviews</div>
                    <div className="stat-value">{stats.totalReviews}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaStar className="text-3xl" />
                    </div>
                    <div className="stat-title">Average Rating</div>
                    <div className="stat-value">{stats.avgRating.toFixed(1)}</div>
                </div>
            </div>
        </div>
    );
};

export default GuideHome;
