


import { useForm } from "react-hook-form";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'; // Rating component styles

import { useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useToast } from "../../../Hooks/useToast";
import SectionTitle from "../../SectionTitle/SectionTitle";

const AddReview = () => {
    const [rating, setRating] = useState(0); // Separate state for rating
    const axiosPublic = useAxiosPublic() // Axios instance
    const {showToast} = useToast("");

    // React Hook Form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Function to handle form submission
    const onSubmit = (data) => {
        const reviewData = {
            ...data,
            rating: rating, // Include rating from the state
            date: new Date() // Add a date for when the review is added
        };

        axiosPublic.post("/reviews", reviewData)
            .then(res => {
                if (res.data.insertedId) {
                    
                    showToast("Review added successfully!")
                    reset(); // Reset form
                    setRating(0); // Reset rating
                }
            })
            .catch(error => {
                console.error("Error adding review: ", error);
                alert("Failed to add review");
            });
    };

    return (
        <div className="add-review-container">
           <SectionTitle
           headings="Add a Review "
           subheadings="You Review Matters">

           </SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                
                <div>
                    <label htmlFor="name" className="block mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        className="border p-2 rounded w-full"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="review" className="block mb-2">Your Review</label>
                    <textarea
                        id="review"
                        {...register("review", { 
                            required: "Review is required",
                            minLength: { value: 10, message: "Review should be at least 10 characters long" }
                        })}
                        className="border p-2 rounded w-full"
                    ></textarea>
                    {errors.review && <p className="text-red-500">{errors.review.message}</p>}
                </div>

                <div>
                    <label htmlFor="rating" className="block mb-2">Rating</label>
                    <Rating
                        value={rating}
                        onChange={setRating}
                        style={{ maxWidth: 180 }}
                    />
                    {rating === 0 && <p className="text-red-500">Rating is required</p>}
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default AddReview;
