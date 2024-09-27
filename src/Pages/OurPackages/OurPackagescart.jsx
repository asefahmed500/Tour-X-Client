import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import Packagescart from "./Packagescart";
import usePackage from "../../Hooks/usePackage";


const OurPackagescart = ({ title, items, covering }) => {
    const [packages, isLoading, ] = usePackage();

    if (isLoading) return <div>Loading...</div>;
    if (packages.length === 0) return <div>No packages available</div>;
    return (
        <div className="pt-8">
            {title && <Cover img={covering} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-10 mt-16">
                {items.map(item => (
                    <Packagescart key={item._id} item={item}></Packagescart> // Correct prop passed
                ))}
            </div>

            <Link to={`/bookings/${title}`}>
                <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
            </Link>
        </div>
    );
};

export default OurPackagescart;