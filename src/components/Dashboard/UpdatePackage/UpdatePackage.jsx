import { useForm } from "react-hook-form";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdatePackage = () => {
    const { register, handleSubmit } = useForm();
    const { name, tourType, description, price, _id } = useLoaderData();

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // Now send the data to the database 
            const updatePcakageItem = {
                name: data.name,
                tourType: data.tourType,
                price: parseFloat(data.price),
                description: data.description,
                image: res.data.data.display_url
            };
            const pakcageRes = await axiosSecure.patch(`/package/${_id}`, updatePcakageItem)
            console.log(pakcageRes.data)

            if (pakcageRes.data.modifiedCount > 0) {
                // Show success message 
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log(res.data);



    }
    return (
        <div>
            <SectionTitle

                headings="Update Package"
                subheadings="Refersh Info"

            >

            </SectionTitle>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input
                            defaultValue={name}
                            {...register('name', { required: true })}
                            type="text"
                            placeholder="Package Name"
                            className="input input-bordered w-full"
                        />
                    </label>

                    <div className="flex gap-6">
                        {/* Category */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Tour TYpe*</span>
                            </div>
                            <select
                                defaultValue={tourType}
                                {...register('tourType', { required: true })}
                                className="select select-error w-full"
                            >
                                <option disabled value="default">Choose the Tour Type</option>
                                <option value="HIKING">HIKING</option>
                                <option value="WALKING">WALKING</option>
                                <option value="SPORTS">SPORTS</option>
                                <option value="OFFERED">OFFERED</option>
                                <option value="WILDLIFE">WILDLIFE</option>
                                <option value="AIRRIDES">AIRRIDES</option>
                            </select>
                        </label>

                        {/* Price */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input
                                {...register('price', { required: true })}
                                defaultValue={price}
                                type="number"
                                placeholder="Price"
                                className="input input-bordered w-full"
                            />
                        </label>
                    </div>

                    {/* Recipe Details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Description*</span>
                        </div>
                        <textarea
                            {...register('recipe', { required: true })}
                            className="textarea textarea-bordered h-24"
                            defaultValue={description}
                            placeholder="description Details"
                        />
                    </label>

                    <input
                        {...register('image', { required: true })}
                        type="file"
                        className="form-control file-input-bordered file-input-accent w-full my-6"
                    />

                    <button className="btn btn-accent">
                        Update Pacakge                    </button>
                </form>
            </div>

        </div>
    );
};


export default UpdatePackage;