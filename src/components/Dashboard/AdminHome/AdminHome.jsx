import { useEffect, useState } from 'react';
import { FaUsers, FaUserTie, FaBook, FaDollarSign, FaBoxOpen } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from './../../../Hooks/useAuth';

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalGuides: 0,
        totalPackages: 0,
        totalBookings: 0,
        totalRevenue: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axiosSecure.get('/admin-stats');
                setStats(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch admin stats:', error);
            }
        };
        fetchStats();
    }, [axiosSecure]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="flex items-center gap-4">
                <h2 className="text-3xl">Welcome, {user?.displayName ? user.displayName : 'Admin'}</h2>
            </div>

            <div className="stats shadow mt-4">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">{stats.totalUsers}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUserTie className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Guides</div>
                    <div className="stat-value">{stats.totalGuides}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaBoxOpen className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Packages</div>
                    <div className="stat-value">{stats.totalPackages}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaBook className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Bookings</div>
                    <div className="stat-value">{stats.totalBookings}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Revenue</div>
                    <div className="stat-value">${stats.totalRevenue.toFixed(2)}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
