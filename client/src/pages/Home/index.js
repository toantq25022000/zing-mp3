import { useEffect, useState } from 'react';
import CarouselMusic from '~/components/layouts/components/CarouselMusic';
import instance from '~/utils/axios';
import SliderShow from '~/components/layouts/components/SliderShow';
import { useDispatch } from 'react-redux';
import { collectSlice } from '~/redux/features/collect/collectSlice';

function Home() {
    const [result, setResult] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getHome = async () => {
            const response = await instance.get('/home');
            if (response.data) {
                const resResult = response.data.items.filter(
                    (item) => item.sectionType === 'playlist' || item.sectionType === 'mix',
                );
                setResult(resResult);

                response.data?.items?.forEach((item) => {
                    const banner = item.sectionType === 'banner';
                    if (banner) {
                        dispatch(collectSlice.actions.setSliders(item.items));
                    }
                });
            }
        };
        getHome();
    }, [dispatch]);

    return (
        <>
            <SliderShow />
            {result.map(
                (playlist, index) =>
                    (playlist.sectionType === 'playlist' || playlist.sectionType === 'mix') && (
                        <CarouselMusic
                            key={playlist.sectionId}
                            title={playlist.title}
                            isUnderSlider={index === 0 ? true : false}
                            data={playlist}
                        />
                    ),
            )}
        </>
    );
}

export default Home;
