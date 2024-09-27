import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import TourPackageCard from '../TourPackageCard/TourPackageCard';

const BookingTab = ({ items }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    return (
        <div>

            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="grid md:grid-cols-3 gap-10">
                        {

                            items.map(item => <TourPackageCard
                                key={item._id}
                                item={item}

                            ></TourPackageCard>)

                        }
                    </div>
                </SwiperSlide>

            </Swiper>

        </div>
    );
};

export default BookingTab;