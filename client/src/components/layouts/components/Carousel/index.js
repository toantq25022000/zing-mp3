import clsx from 'clsx';

import styles from './Carousel.module.scss';
import classNames from 'classnames/bind';
import CarouselItem from './CarouselItem';

const cx = classNames.bind(styles);

function Carousel({ dataSection }) {
    return (
        <div className={cx('container-section', 'playlist-section', 'channel-section')}>
            <h3 className={cx('channel-title')}>{dataSection.title}</h3>
            <div className={clsx(cx('carousel-wrapper'), 'grid')}>
                <div className={clsx(cx('carousel'), 'row')}>
                    <div className={cx('carousel-container')}>
                        {dataSection.sectionType === 'playlistOfArtist' ? (
                            <>
                                <CarouselItem
                                    data={dataSection.sectionValue}
                                    isArtist={true}
                                    isPlaylist={false}
                                    isPlaylistOfArtist={true}
                                    key={dataSection.sectionValue.id}
                                />

                                {dataSection?.items?.map((item) => (
                                    <CarouselItem
                                        data={item}
                                        key={item.id || item.encodeId}
                                        isArtist={false}
                                        isPlaylist={true}
                                    />
                                ))}
                            </>
                        ) : (
                            <>
                                {dataSection?.items?.map((item) => (
                                    <CarouselItem
                                        data={item}
                                        key={item.id || item.encodeId}
                                        isArtist={dataSection.sectionType === 'artist'}
                                        isPlaylist={dataSection.sectionType === 'playlist'}
                                        isVideo={dataSection.sectionType === 'video'}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
