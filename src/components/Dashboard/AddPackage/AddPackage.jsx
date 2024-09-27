import { useForm } from "react-hook-form";
import SectionTitle from "../../SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPackage = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {
                // Create package item with the image URL and form data
                const addPackageItem = {
                    name: data.name,
                    tourType: data.tourType,
                    price: parseFloat(data.price),
                    description: data.description,
                    image: res.data.data.display_url,
                };

                // Send the new package data to the server
                const packageRes = await axiosSecure.post('/package', addPackageItem);

                if (packageRes.data.insertedId) {
                    // Show success message and reset form
                    reset();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${data.name} has been added to the package list`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong with adding the package!',
                    });
                }
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add the package!',
            });
        }
    };

    return (
        <div>
            <SectionTitle headings="Add Package" subheadings="Introduce a New Tour Package" />

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Package Name*</span>
                        </div>
                        <input
                            {...register('name', { required: true })}
                            type="text"
                            placeholder="Package Name"
                            className="input input-bordered w-full"
                        />
                    </label>

                    <div className="flex gap-6">
                        {/* Tour Type */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Tour Type*</span>
                            </div>
                            <select {...register('tourType', { required: true })} className="select select-error w-full">
                                <option disabled value="default">Choose the Tour Type</option>
                                <option value="HIKING">Hiking</option>
                                <option value="WALKING">Walking</option>
                                <option value="SPORTS">Sports</option>
                                <option value="OFFERED">Offered</option>
                                <option value="WILDLIFE">Wildlife</option>
                                <option value="AIRRIDES">Air Rides</option>
                            </select>
                        </label>

                        {/* Price */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input
                                {...register('price', { required: true })}
                                type="number"
                                placeholder="Price"
                                className="input input-bordered w-full"
                            />
                        </label>
                    </div>

                    {/* Description */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Description*</span>
                        </div>
                        <textarea
                            {...register('description', { required: true })}
                            className="textarea textarea-bordered h-24"
                            placeholder="Description Details"
                        ></textarea>
                    </label>

                    {/* Image */}
                    <input
                        {...register('image', { required: true })}
                        type="file"
                        className="form-control file-input-bordered file-input-accent w-full my-6"
                    />

                    <button className="btn btn-accent">
                        Add Package
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPackage;
