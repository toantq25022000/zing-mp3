import React, { useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './ArtistInfo.module.scss';
import SongItem from '~/components/SongItem';
import Carousel from '~/components/layouts/components/Carousel';

const cx = classNames.bind(styles);

const ArtistAllInfo = ({ artistInfo }) => {
    useEffect(() => {
        let timer;
        let imgIndex = 2;
        const slideImgs = Array.from(document.querySelectorAll('.song-animate-item'));

        if (slideImgs.length > 0) {
            const slideShow = () => {
                const slideImgFirst = document.querySelector('.song-animate-item.first');
                const slideImgSecond = document.querySelector('.song-animate-item.second');

                const findIndexSecond = slideImgs.findIndex((item) => item.classList.contains('second'));
                imgIndex = findIndexSecond >= slideImgs.length - 1 ? 0 : findIndexSecond + 1;
                const slideImgThird = slideImgs[imgIndex];
                slideImgThird.classList.replace('third', 'second');
                slideImgSecond.classList.replace('second', 'first');
                slideImgFirst.classList.replace('first', 'third');

                timer = setTimeout(slideShow, 2000);
            };
            slideShow();
        }

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div>
            {artistInfo.sections.map((section, index) =>
                section.sectionType === 'song' ? (
                    <div className={cx('channel-section', 'song-animate-section')} key={index}>
                        <h3 className={cx('section-title')}>{section.title}</h3>
                        <div className={cx('content')}>
                            <div className="song-animate-container">
                                {section.items.map((item, index) => (
                                    <div
                                        className={`song-animate-item ${
                                            index === 0 ? 'first' : index === 1 ? 'second' : 'third'
                                        }`}
                                        key={item.encodeId}
                                    >
                                        <figure>
                                            <img src={item.thumbnailM || item.thumbnail} alt="" />
                                        </figure>
                                    </div>
                                ))}
                            </div>

                            <div className={cx('list')}>
                                <div className={cx('list__container')}>
                                    <div className={cx('list__content')}>
                                        <div className={cx('song-list', 'pad-l-20')}>
                                            {section.items.map((item) => (
                                                <SongItem data={item} key={item.encodeId} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Carousel dataSection={section} key={index} />
                ),
            )}
        </div>
    );
};

export default ArtistAllInfo;
