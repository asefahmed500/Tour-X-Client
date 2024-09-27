import { Table } from "flowbite-react";

import useBooking from "../../../Hooks/useBooking";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Bookings = () => {
    const [booking, refetch] = useBooking();
    const axiosSecure = useAxiosSecure();
    console.log(booking)

    const handleDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`bookings/${id}`)
                    .then(res => {
                        console.log("Response after deletion ", res.data);
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your odreded package has been deleted.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your ordered pakcage has not found.",
                                icon: "success"
                            });

                        }

                    })
                    .catch(error => {
                        console.error("Error deleting item", error)
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem deleting your ordered package ",
                            icon: "error"
                        });
                    })





            }
        });
        // 

    };

    const totalprice = booking.reduce((total, item) => total + item.price , 0);
    return (
        <div className="space-y-6">
         
            <div className="flex justify-evenly">
                <h2 className="text-4xl"> Items: {booking.length} </h2>
                <h2 className="text-4xl"> Total Price: ${totalprice.toFixed(2)} </h2>
                {booking.length ? <Link to="/dashboard/payment">
                    <button className="btn btn-primary"> Pay</button>

                </Link> :
                    <button disabled className="btn btn-primary"> Pay</button>


                }
            </div>















            <div className="overflow-x-auto">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>#</Table.HeadCell>
                        <Table.HeadCell>Package name</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>Photo</Table.HeadCell>

                        <Table.HeadCell>Action</Table.HeadCell>

                    </Table.Head>
                    <Table.Body className="divide-y">
                        {booking.map((item, index) => (
                            <Table.Row key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                </Table.Cell>
                                <Table.Cell>{item.price.toFixed(2)}</Table.Cell>
                                <Table.Cell>
                                    <img className="w-5 rounded-xl" src={item.image} alt="" />
                                </Table.Cell>

                                <Table.Cell>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-ghost btn-xs">
                                        <FaTrashAlt className="text-red-600" />
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>

                </Table>
            </div>

        </div>
    );
};

export default Bookings;