import React, { useEffect, useState } from 'react';

// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

//Import css component
import './SilderShow.css';
import SliderItem from '../SliderItem';
import instance from '../../../../utils/axios';

function SliderShow() {
    const [sliders, setSliders] = useState([]);
    useEffect(() => {
        const getSlider = async () => {
            const response = await instance.get('/home');
            if (response.data) {
                response.data?.items?.forEach((item) => {
                    const banner = item.sectionType === 'banner';
                    if (banner) {
                        setSliders(item.items);
                        return;
                    }
                });
            }
        };
        getSlider();
    }, []);

    return (
        <div className="wrapper">
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                navigation={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    450: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    689: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1240: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
            >
                {sliders.map((slider, index) => (
                    <SwiperSlide key={index}>
                        <SliderItem imgSrc={slider.banner} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SliderShow;
