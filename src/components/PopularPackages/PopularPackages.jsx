import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import PopularPackagescart from "./PopularPackagescart";
import { Link } from "react-router-dom";

const PopularPackages = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        fetch('popularpackage.json') // Ensure the filename matches exactly
            .then(res => res.json())
            .then(data => setPackages(data))
            .catch(error => console.error("Error fetching packages:", error));
    }, []);

    return (
        <div>
            <SectionTitle
                headings="Our Popular Packages"
                subheadings="Choose Your Favourite One"
            />

            <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map(item => (
                    <PopularPackagescart
                        key={item._id} // Using _id as key
                        item={item}
                    />
                ))}
            </div>
            <div className="card-actions justify-evenly mt-6">
                <Link to="ourpackages"><button className="btn btn-wide">View More</button></Link>
            </div>
        </div>
    );
};

export default PopularPackages;