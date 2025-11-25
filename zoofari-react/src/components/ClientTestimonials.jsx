import React from "react";
import parse from 'html-react-parser';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const ClientTestimonials = (props) => {
    return (
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <h1 className="display-5 text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
                        {props?.sectiontitle}
                    </h1>

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        loop={true}
                        centeredSlides={true}
                        allowTouchMove={false}
                        speed={4000}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                        }}
                        freeMode={true}
                        slidesPerView={"auto"}
                        spaceBetween={30}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            992: { slidesPerView: 3 },
                        }}
                        className="testimonialSwiper"
                    >

                        {props.testimonials ? props.testimonials.map(x => {
                            return(
                                <>
                                    <SwiperSlide>
                                        <div className="testimonial-item text-center">
                                            {x?.featuredImage?.node?.sourceUrl ? <>
                                                <img
                                                className="img-fluid rounded-circle border border-2 p-2 mx-auto mb-4"
                                                src={x?.featuredImage?.node?.sourceUrl}
                                                style={{ width: "100px", height: "100px" }}
                                                alt=""
                                            />
                                            </> : ''}
                                            <div className="testimonial-text rounded text-center p-4">
                                                <p>
                                                    {x?.content ? parse(x?.content) : ''}
                                                </p>
                                                <h5 className="mb-1">{x?.title}</h5>
                                                <span className="fst-italic">{x?.professionName?.clientProfession}</span>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </>
                            )
                        }) : ''}

                    </Swiper>

                </div>
            </div>
        </>
    )
}
