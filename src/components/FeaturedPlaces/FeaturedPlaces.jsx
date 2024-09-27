
import SectionTitle from "../SectionTitle/SectionTitle";
import 'swiper/css';
import { Swiper, SwiperSlide } from "swiper/react";
import sld1 from "../../assets/FeaturedPlaces/slider1.jpg"
import sld2 from "../../assets/FeaturedPlaces/slider2.jpg"
import sld3 from "../../assets/FeaturedPlaces/slider3.jpg"
import sld4 from "../../assets/FeaturedPlaces/slider4.jpg"


const FeaturedPlaces = () => {
    return (
        <div>
            <SectionTitle

                headings="Popular Places"
                subheadings="Enjoy Your Journey">

            </SectionTitle>

            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide> <img src={sld1} alt="" />
                    <h2 className="text-center font-extralight text-white -mt-12">Inani Beach</h2>

                </SwiperSlide>
                <SwiperSlide> <img src={sld2} alt="" />
                    <h2 className="text-center font-extralight text-white -mt-12">Laboni Beach</h2></SwiperSlide>
                <SwiperSlide> <img src={sld3} alt="" />
                    <h2 className="text-center font-extralight text-white -mt-12">Batali Hill</h2></SwiperSlide>
                <SwiperSlide> <img src={sld4} alt="" />
                    <h2 className="text-center font-extralight text-white -mt-12">Sitakunda Eco Park</h2></SwiperSlide>


            </Swiper>
        </div>
    );
};

export default FeaturedPlaces;