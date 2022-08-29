import { useEffect, useState } from 'react';
import CarouselMusic from '~/components/layouts/components/CarouselMusic';
import instance from '~/utils/axios';
import SliderShow from '~/components/layouts/components/SliderShow';

function Home() {
    const [result, setResult] = useState([]);

    useEffect(() => {
        const getHome = async () => {
            const response = await instance.get('/home');
            if (response) {
                const resResult = response.data.items.filter(
                    (item) => item.sectionType === 'playlist' || item.sectionType === 'mix',
                );
                setResult(resResult);
            }
        };
        getHome();
    }, []);

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
