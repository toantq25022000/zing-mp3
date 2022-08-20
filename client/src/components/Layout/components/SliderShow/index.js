import React, { useEffect, useRef, useState } from 'react';

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
            if (response) {
                response?.items?.forEach((item) => {
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

    const imgs = [
        'https://photo-zmp3.zmdcdn.me/banner/e/d/7/e/ed7e08cbb44c48ae048234a289106ca2.jpg',
        'https://photo-zmp3.zmdcdn.me/banner/b/f/3/d/bf3dfe4ba61ce88efaf77d37c255ee05.jpg',
        'https://photo-zmp3.zmdcdn.me/banner/a/4/c/6/a4c6a0657deb5465785c3cef08b1c305.jpg',
        'https://photo-zmp3.zmdcdn.me/banner/e/e/b/5/eeb58dfab29271bd6d99d31f3e1d5cb9.jpg',
        'https://photo-zmp3.zmdcdn.me/banner/f/5/0/a/f50a9d735ce1d5c332cd594f9ede1760.jpg',
        'https://photo-zmp3.zmdcdn.me/banner/2/f/9/a/2f9a9727c784170ac85b6c401af8a8db.jpg',
    ];
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
