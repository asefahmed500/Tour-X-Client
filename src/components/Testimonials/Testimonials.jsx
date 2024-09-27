import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

import { Swiper, SwiperSlide } from 'swiper/react';
import '@smastrom/react-rating/style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import { Rating } from "@smastrom/react-rating";
import useAxiosPublic from './../../Hooks/useAxiosPublic';
const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get("reviews")
            .then(res => setReviews(res.data))  // Directly use res.data instead of res.json()
            .catch(error => console.log("error", error));
    }, [axiosPublic]);
    return (
        <div>
            <SectionTitle

                headings="What Our Clients Say"
                subheadings="Testimonials"

            >

            </SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className=" flex flex-col items-center  mx-16 my-24">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p>{review.review}</p>
                            <h3 className="text-2xl text-orange-400 uppercase"    >{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>




        </div>
    );
};

export default Testimonials;