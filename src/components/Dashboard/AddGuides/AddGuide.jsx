import { useForm } from "react-hook-form";
import SectionTitle from "../../SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddGuide = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            // Upload the image to imgbb
            const imageFile = { image: data.profilePicture[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {
                // Create guide object with the image URL and form data
                const newGuide = {
                    name: data.name,
                    email: data.email,
                    experience: data.experience,
                    profilePicture: res.data.data.display_url,
                };

                // Send the new guide data to the server
                const guideRes = await axiosSecure.post('/guides', newGuide);

                if (guideRes.data.insertedId) {
                    reset(); // Reset form after success
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${data.name} has been added as a guide`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong with adding the guide!',
                    });
                }
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add the guide!',
            });
        }
    };

    return (
        <div>
            <SectionTitle headings="Add Guide" subheadings="Register a New Guide" />

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Guide Name */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Guide Name*</span>
                        </div>
                        <input
                            {...register('name', { required: true })}
                            type="text"
                            placeholder="Guide Name"
                            className="input input-bordered w-full"
                        />
                    </label>

                    {/* Email */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Email*</span>
                        </div>
                        <input
                            {...register('email', { required: true })}
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full"
                        />
                    </label>

                    {/* Experience */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Experience (Years)*</span>
                        </div>
                        <input
                            {...register('experience', { required: true })}
                            type="number"
                            placeholder="Years of Experience"
                            className="input input-bordered w-full"
                        />
                    </label>

                    {/* Profile Picture */}
                    <input
                        {...register('profilePicture', { required: true })}
                        type="file"
                        className="form-control file-input-bordered file-input-accent w-full my-6"
                    />

                    <button className="btn btn-accent">
                        Add Guide
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddGuide;
