import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUsers, FaUserTie } from "react-icons/fa";

const Allusers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Handle make admin
    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now an Admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error making user an Admin",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    // Handle make guide
    const handleMakeGuide = (user) => {
        axiosSecure.patch(`/users/guide/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now a Guide`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error making user a Guide",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    // Handle remove guide role
    const handleRemoveGuide = (user) => {
        axiosSecure.patch(`/users/guide/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is no longer a Guide`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error removing guide role",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    // Handle user deletion
    const handleDeleteUser = (user) => {
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
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "User has been deleted.", "success");
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire("Error!", "There was a problem deleting the user.", "error");
                    });
            }
        });
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Roles</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role || 'No role assigned'}</td>
                                    <td>
                                        {/* Admin Button */}
                                        {(!user.role || !user.role.includes('admin')) && (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn bg-orange-500">
                                                <FaUsers className="text-white text-2xl" title="Make Admin" />
                                            </button>
                                        )}

                                        {/* Guide Buttons */}
                                        {user.role && user.role.includes('guide') ? (
                                            <button
                                                onClick={() => handleRemoveGuide(user)}
                                                className="btn bg-red-500 ml-2">
                                                <FaUserTie className="text-white text-2xl" title="Remove Guide" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeGuide(user)}
                                                className="btn bg-green-500 ml-2">
                                                <FaUserTie className="text-white text-2xl" title="Make Guide" />
                                            </button>
                                        )}

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="btn btn-ghost btn-xs ml-2">
                                            <FaTrashAlt className="text-red-600 text-2xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }




                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Allusers;
