import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import CarouselMusic from '~/components/layouts/components/CarouselMusic';
import instance from '~/utils/axios';
import SliderShow from '~/components/layouts/components/SliderShow';
import { collectSlice } from '~/redux/features/collect/collectSlice';
import { CardSkeleton } from '~/components/skeleton';

function Home() {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
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

                setLoading(false);
            }
        };
        getHome();
    }, [dispatch]);

    return (
        <>
            {loading && (
                <div className="grid">
                    <div className="row no-wrap overflow-hidden" style={{ height: '200px' }}>
                        {Array(3)
                            .fill(0)
                            .map((_, index) => (
                                <div className="col l-4 m-6 c-12" key={index}>
                                    <Skeleton width="100%" height="100%" />
                                </div>
                            ))}
                    </div>
                </div>
            )}
            {!loading && <SliderShow />}

            {loading &&
                Array(5)
                    .fill(0)
                    .map((_, i) => (
                        <div className="grid" key={i}>
                            <Skeleton height={30} width={210} style={{ marginTop: '20px', marginBottom: '20px' }} />

                            <div className="row no-wrap overflow-hidden">
                                {Array(5)
                                    .fill(0)
                                    .map((_, index) => (
                                        <div className="col l-2-4 m-3 c-4" key={index}>
                                            <CardSkeleton />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
            {!loading &&
                result?.map(
                    (playlist) =>
                        (playlist.sectionType === 'playlist' || playlist.sectionType === 'mix') && (
                            <CarouselMusic key={playlist.sectionId} title={playlist.title} data={playlist} />
                        ),
                )}
        </>
    );
}

export default Home;
