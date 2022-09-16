import React, { useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './stylesSlidePlaylist.css';

import classNames from 'classnames/bind';
import styles from './PlayerFullScreen.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPause, faPlay, faRadio } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { songSlice } from '~/redux/features/song/songSlice';
import { getCurrentIndexSongOfPlaylist } from '~/utils/collectionFunctionConstants';

const cx = classNames.bind(styles);
// import required modules

function Playlist() {
    const dispatch = useDispatch();

    const playlists = useSelector((state) => state.playlist.playlists);
    const songId = useSelector((state) => state.song.songId);
    const isPlay = useSelector((state) => state.song.isPlay);
    const isRandom = useSelector((state) => state.song.isRandom);

    const handlePlaySong = (song) => {
        // if song is allowed , not for VIP
        if (song.streamingStatus === 1) {
            if (isRandom) dispatch(songSlice.actions.setIsRandom(false));
            if (songId === song.encodeId) {
                if (isPlay) {
                    dispatch(songSlice.actions.setIsPlay(false));
                } else {
                    dispatch(songSlice.actions.setIsPlay(true));
                }
            } else {
                dispatch(songSlice.actions.setSongId(song.encodeId));
                dispatch(songSlice.actions.setIsPlay(true));

                dispatch(songSlice.actions.setCurrentIndexSong(getCurrentIndexSongOfPlaylist(playlists, song)));
            }
        }
    };

    useEffect(() => {
        let timeout;
        const handleMouseNotActive = () => {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                // const scrollIntoViewSong = (ref) => {
                //     console.log({ ref });
                // };
                // if (document.getElementById('song-' + songId)) {
                //     scrollIntoViewSong(document.getElementById('song-' + songId));
                // }
            }, 6000);
        };
        document.addEventListener('mousemove', handleMouseNotActive);

        return () => {
            document.removeEventListener('mousemove', handleMouseNotActive);
        };
    }, []);

    return (
        <div className={clsx(cx('playlist-container'), 'wrapper-playlist-slider')}>
            <Swiper
                slidesPerView={4}
                spaceBetween={60}
                centeredSlides={true}
                navigation={true}
                modules={[Navigation]}
                breakpoints={{
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 40,
                    },
                    600: {
                        slidesPerView: 2,
                        spaceBetween: 80,
                    },
                    965: {
                        slidesPerView: 3,
                        spaceBetween: 70,
                    },
                    1300: {
                        slidesPerView: 4,
                        spaceBetween: 60,
                    },
                }}
                className="SwiperPlaylist"
            >
                {playlists &&
                    playlists.map((song) => (
                        <SwiperSlide key={song.encodeId}>
                            <div
                                className={cx('wrap-card', songId === song.encodeId && 'active-song')}
                                id={'song-' + song.encodeId}
                            >
                                <div className={cx('card-content')}>
                                    <figure className={cx('image-card')}>
                                        <img
                                            src={
                                                song.thumbnail.replace('w94', 'w480') ||
                                                song.thumbnailM.replace('w240', 'w480')
                                            }
                                            alt=""
                                        />
                                    </figure>
                                    <div className={cx('playlist-actions')}>
                                        <button className={clsx(cx('tooltip-btn'), 'zm-btn')}>
                                            <FontAwesomeIcon icon={faHeart} />
                                        </button>
                                        <button
                                            className={clsx(
                                                cx(
                                                    'tooltip-btn',
                                                    'btn-play',
                                                    !(songId === song.encodeId && isPlay) && 'is-pause',
                                                ),
                                                'zm-btn',
                                            )}
                                            onClick={() => handlePlaySong(song)}
                                        >
                                            <FontAwesomeIcon
                                                icon={songId === song.encodeId && isPlay ? faPause : faPlay}
                                            />
                                        </button>
                                        <button className={clsx(cx('tooltip-btn'), 'zm-btn')}>
                                            <FontAwesomeIcon icon={faRadio} />
                                        </button>
                                    </div>
                                    {songId === song.encodeId && isPlay ? (
                                        <i className={cx('playing-icon-gif')}></i>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div className={cx('meta-info')}>
                                    <h3 className={cx('song-title')}>{song.title}</h3>
                                    <h3 className={cx('song-subtitle')}>
                                        {song?.artists
                                            ?.map((artist) => artist.name)
                                            .reduce((prev, current) => [prev, ', ', current])}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}

export default Playlist;
