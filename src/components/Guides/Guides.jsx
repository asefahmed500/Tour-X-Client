import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import GuidesCart from "./GuidesCart";
import { Pagination } from "flowbite-react"; // Corrected import statement
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Guides = () => {
    const [guides, setGuides] = useState([]); // State for guides
    const [currentPage, setCurrentPage] = useState(1);
    const [, setLoading] = useState(true); // State for loading
    const [, setError] = useState(null); // State for error handling
    const guidesPerPage = 4; // Number of guides per page

    // Calculate the start and end indices for slicing the guides array
    const indexOfLastGuide = currentPage * guidesPerPage;
    const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;
    const currentGuides = guides.slice(indexOfFirstGuide, indexOfLastGuide);

    const onPageChange = (page) => setCurrentPage(page);

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchGuides = async () => {
            setLoading(true);
            try {
                const res = await axiosPublic.get("/guides");
                setGuides(res.data);
            } catch (error) {
                setError("Error fetching guides. Please try again later.");
                console.log("Error fetching guides:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGuides();
    }, [axiosPublic]);

    return (
        <div>
            <SectionTitle headings="Our Guides" subheadings="Meet Our Guides..." />
            <div className="guides-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {currentGuides.length > 0 ? (
                    currentGuides.map(guide => (
                        <GuidesCart key={guide._id} guide={guide} />
                    ))
                ) : (
                    <p>No guides available at the moment.</p>
                )}
            </div>
            <div className="mt-6 flex justify-center">
                <Pagination
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    showIcons={true}
                    totalPages={Math.ceil(guides.length / guidesPerPage)}
                />
            </div>
           


        </div>
    );

}


export default Guides;
