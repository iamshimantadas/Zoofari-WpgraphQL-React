import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
// import "swiper/css/navigation";

export const OwlCarousels = ({ data }) => {
    return (
        <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{
                delay: 1000, 
                disableOnInteraction: false
            }}
        >
            {data?.map((x, i) => (
                <SwiperSlide key={i}>
                    <img
                        className="img-fluid"
                        src={x?.rightCarouselsImagesImage?.node?.sourceUrl}
                        alt=""
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
