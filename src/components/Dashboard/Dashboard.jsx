import { FaAd, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

import { FaBook, FaEnvelope } from "react-icons/fa6";
import useBooking from "../../Hooks/useBooking";
import useAdmin from "../../Hooks/useAdmin";
import useGuide from "../../Hooks/useGuide";
import { MdAddCard } from "react-icons/md";

const DashBoard = () => {
   const [booking ] = useBooking()
    const [isAdmin] = useAdmin();
    const [isGuide] = useGuide();

    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-orange-400 p-4">
                <ul className="menu space-y-2">
                    {
                        isAdmin ? (
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminhome" className="flex items-center">
                                        <FaHome className="mr-2" /> Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addpackage" className="flex items-center">
                                        <MdAddCard  className="mr-2" /> Add Package
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/managepackage" className="flex items-center">
                                        <FaList className="mr-2" /> Manage Package
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addguides" className="flex items-center">
                                        <FaBook className="mr-2" /> Add Guides
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allusers" className="flex items-center">
                                        <FaUser className="mr-2" /> All Users
                                    </NavLink>
                                </li>
                            </>
                        ) : isGuide ? (
                            <>
                                <li>
                                    <NavLink to="/dashboard/myprofile" className="flex items-center">
                                        <FaUser className="mr-2" /> My Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myassignedtours" className="flex items-center">
                                        <FaBook className="mr-2" /> My Assigned Tours
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/dashboard/userhome" className="flex items-center">
                                        <FaHome className="mr-2" /> User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation" className="flex items-center">
                                        <FaCalendar className="mr-2" /> Reservation
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/booking" className="flex items-center">
                                        <FaShoppingCart className="mr-2" /> My Booking ({booking.length})
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review" className="flex items-center">
                                        <FaAd className="mr-2" /> Add a Review
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymenthistory" className="flex items-center">
                                        <FaList className="mr-2" /> Payment History
                                    </NavLink>
                                </li>
                            </>
                        )
                    }
                    <div className="divider"></div>
                    {/* Shared links */}
                    <li>
                        <NavLink to="/" className="flex items-center">
                            <FaHome className="mr-2" /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/bookings/:tourType" className="flex items-center">
                            <FaSearch className="mr-2" /> Booking
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className="flex items-center">
                            <FaEnvelope className="mr-2" /> Contact
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 bg-gray-100 min-h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoard;
