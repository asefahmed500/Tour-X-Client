import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import logo from "../../assets/banners/logo.png"




const Footer = () => {
    return (
        <div>
            <footer className="footer bg-neutral text-neutral-content p-10">
                <aside>
                    <img className="w-5 rounded-3xl" src={logo} alt="" />
                    <p>
                        Tour X
                        <br />
                        Providing Comfort Tour since 1992
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4 text-2xl">
                        <a>
                        <FaFacebookSquare />
                        </a>
                        <a>
                        <RiTwitterXLine />
                        </a>
                        <a>
                        <FaYoutube />
                        </a>
                    </div>

                </nav>

            </footer>
            <aside className="text-center bg-slate-500">
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Tour X Ltd</p>
            </aside>
        </div>
    );
};

export default Footer;