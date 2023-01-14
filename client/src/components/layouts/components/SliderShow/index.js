import { useSelector } from 'react-redux';
import classNames from 'classnames';
// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
//Import css component
import './SilderShow.css';
import styles from './SliderShow.module.scss';
import SliderItem from './SliderItem';

const SliderShow = () => {
    const sliders = useSelector((state) => state.collect.sliders);

    return (
        <div className={classNames(styles.wrapper)}>
            {sliders && (
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
                            spaceBetween: 0,
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
            )}
        </div>
    );
};

export default SliderShow;
