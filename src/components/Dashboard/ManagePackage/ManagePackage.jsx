import { FaEdit, FaTrashAlt } from "react-icons/fa";
import usePackage from "../../../Hooks/usePackage";
import SectionTitle from "../../SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const ManagePackage = () => {
    const [packages, isLoading, refetch] = usePackage();
    const axiosSecure = useAxiosSecure()
    console.log(isLoading)
    console.log(packages)
    console.log(refetch)

    const handleDeleteItem = async (item) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });
            if (result.isConfirmed) {
                console.log(`Deleting item with ID: ${item._id}`);
                const res = await axiosSecure.delete(`/package/${item._id}`);

                if (!res.data || res.data.deletedCount === undefined) {
                    throw new Error('Unexpected response format');
                }

                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Not Found",
                        text: "The item you are trying to delete does not exist.",
                    });
                }
            }

        }
        catch (error) {
            console.error("Error deleting item:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `There was a problem deleting the item: ${error.message}. Please try again.`,
            });
            

        }

    }
    return (
        <div>
            <SectionTitle headings="Manage Packages" subheadings="Hurry Up" />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Tour Type</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages.map((packageitem, index) => (
                                <tr key={packageitem._id}>
                                    <th>{index + 1}</th>
                                    <td>{packageitem.name}</td>
                                    <td>{packageitem.tourType}</td>
                                    <td><img className="w-5 rounded-xl" src={packageitem.image} alt="" /></td>
                                    <td>{packageitem.price}</td>
                                    <td>
                                    <Link to={`/dashboard/updatepackage/${packageitem._id}`}>
                                        <button className="btn btn-ghost btn-xs bg-orange-500">
                                            <FaEdit className="text-white" />
                                        </button>
                                    </Link>

                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteItem(packageitem)}
                                            className="btn btn-ghost btn-xs ml-2"
                                        >
                                            <FaTrashAlt className="text-red-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

};

export default ManagePackage;