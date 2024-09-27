import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import { AiOutlineLogout } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import useBooking from "../../Hooks/useBooking";

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const [booking] = useBooking()

    const handlelogout = () => {
        logout()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const navoptions = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/ourpackages">Our Packages</Link></li>
            <li><Link to="/bookings/:tourType">Bookings</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>

            <li>
            <Link to="/dashboard/booking"> {/* Simplified structure */}
                <FaShoppingCart />
                <div className="badge badge-secondary">{booking?.length || 0}</div>
            </Link>
        </li>
        </>
    );

    return (
        <div>
            <div className="navbar max-w-5xl mx-auto fixed z-10 bg-opacity-30 bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            {navoptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Tour X</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{navoptions}</ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <>
                            <span className="rounded-8xl   p-[1/6]">{user?.displayName}</span>
                            <button onClick={handlelogout} className="ml-5 ">
                               <div className="btn"> <AiOutlineLogout /></div>
                            </button>
                        </>
                    ) : (
                        <li className="btn">
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                   
                </div>
            </div>
        </div>
    );
};

export default NavBar;
