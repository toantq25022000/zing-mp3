import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart as faHeartSolid,
    faEllipsis,
    faBackwardStep,
    faPlay,
    faForwardStep,
    faPause,
    faVideo,
    faExpand,
    faVolumeLow,
    faList,
    faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import clsx from 'clsx';

import { KaraokeIcon, LoopIcon, ShuffleIcon, SpinnerLoadIcon } from '../../components/Icons';
import styles from './Player.module.scss';
import instance from '~/utils/axios';
import { songSlice } from '~/redux/features/song/songSlice';
import { handleClickToStopPropagation, handlePlaySongRandom, secondsToTime } from '~/utils/collectionFunctionConstants';
import PlayerFullScreen from '../PlayerFullScreen';
import PlayerPlaylist from '../../components/PlayerPlaylist';
import { userConfigSlice } from '~/redux/features/userConfig/userConfigSlice';

const cx = classNames.bind(styles);

function Player() {
    //State
    const [isLoadingPlay, setIsLoadingPlay] = useState(false);
    const [isOpenPlayerFullScreen, setIsOpenPlayerFullScreen] = useState(false);
    //selector
    const songId = useSelector((state) => state.song.songId);
    const volume = useSelector((state) => state.song.volume);
    const isVolumeOff = useSelector((state) => state.song.isVolumeOff);
    const songInfo = useSelector((state) => state.song.songInfo);
    const playlists = useSelector((state) => state.playlist.playlists);
    const isPlay = useSelector((state) => state.song.isPlay);
    const isLoop = useSelector((state) => state.song.isLoop);
    const isRandom = useSelector((state) => state.song.isRandom);
    const arrayIndexRandom = useSelector((state) => state.song.arrayIndexRandom);
    const srcAudio = useSelector((state) => state.song.srcAudio);
    const currentIndexSong = useSelector((state) => state.song.currentIndexSong);

    const isOpenPlayerQueue = useSelector((state) => state.userConfig.isOpenPlayerQueue);
    //ref
    const audioRef = useRef();
    const timeCurrentAudioRef = useRef();

    const inputTimeSongRef = useRef();
    const inputVolumeSongRef = useRef();
    const progressbarTimeRef = useRef();
    const sliderHandleTimeRef = useRef();

    const playerFullRef = useRef();
    const playerQueueRef = useRef();

    const dispatch = useDispatch();

    let isSeeking = false;

    const seekStart = () => {
        if (audioRef.current.duration) {
            isSeeking = true;
        }
    };

    const seekEnd = () => {
        isSeeking = false;
    };

    const handlePlayAndPauseSong = (e) => {
        e.stopPropagation();
        if (!songId) return;
        if (isPlay) {
            dispatch(songSlice.actions.setIsPlay(false));
            audioRef.current.pause();
        } else {
            dispatch(songSlice.actions.setIsPlay(true));
            audioRef.current.play();
        }
    };

    const handleUpdateTimeAudio = () => {
        let percentTime = 0;
        if (audioRef.current.duration) {
            if (!isSeeking) {
                const valueInput = Math.round((audioRef.current.currentTime / audioRef.current.duration) * 100);
                inputTimeSongRef.current.value = valueInput;

                percentTime = ((audioRef.current.currentTime / songInfo.duration) * 100).toFixed(5);
                timeCurrentAudioRef.current.innerHTML = secondsToTime(Math.floor(audioRef.current.currentTime));

                progressbarTimeRef.current.style.background = `linear-gradient(to right,var(--progressbar-active-bg) 0%,var(--progressbar-active-bg) ${percentTime}%,var(--progressbar-player-bg) ${percentTime}%,var(--progressbar-player-bg) 100%)`;

                const sliderHanldeY = (((progressbarTimeRef.current.clientWidth - 12) * valueInput) / 100).toFixed(4);
                sliderHandleTimeRef.current.style.transform = `translate(${sliderHanldeY}px, -3.5px)`;
            }
        } else {
            inputTimeSongRef.current.addEventListener('change', (e) => {
                e.stopPropagation();
                const seekTime = (e.target.value * audioRef.current.duration) / 100;
                audioRef.current.currentTime = seekTime;
            });
        }
    };

    // Method 2 to seek time
    const currentTimeSong = () => {
        if (isSeeking) {
            let seekTime;
            inputTimeSongRef.current.addEventListener('input', (e) => {
                e.stopPropagation();
                const valueInput = e.target.value;
                seekTime = (valueInput * audioRef.current.duration) / 100;
                const percentTime = (seekTime / audioRef.current.duration) * 100;

                progressbarTimeRef.current.style.background = `linear-gradient(to right,var(--progressbar-active-bg) 0%,var(--progressbar-active-bg) ${percentTime}%,var(--progressbar-player-bg) ${percentTime}%,var(--progressbar-player-bg) 100%)`;
                const sliderHanldeY = (((progressbarTimeRef.current.clientWidth - 12) * valueInput) / 100).toFixed(4);

                sliderHandleTimeRef.current.style.transform = `translate(${sliderHanldeY}px, -3.5px)`;

                timeCurrentAudioRef.current.innerHTML = secondsToTime(Math.floor(seekTime));
            });
        }
    };

    // Method 2 to seek volumn
    const handleChangeVolume = (e) => {
        e.stopPropagation();
        const valueInputVolume = parseInt(inputVolumeSongRef.current.value);
        if (valueInputVolume === 0) {
            dispatch(songSlice.actions.setIsVolumeOff(true));
        } else if (isVolumeOff) dispatch(songSlice.actions.setIsVolumeOff(false));
        dispatch(songSlice.actions.setVolume(valueInputVolume));
        audioRef.current.volume = valueInputVolume / 100;
    };

    //On or off volume
    const handleOnOffVolume = (e) => {
        e.stopPropagation();
        if (!isVolumeOff) {
            dispatch(songSlice.actions.setIsVolumeOff(true));
            dispatch(songSlice.actions.setVolume(0));
            inputVolumeSongRef.current.value = 0;
            audioRef.current.volume = 0;
        } else {
            dispatch(songSlice.actions.setIsVolumeOff(false));
            dispatch(songSlice.actions.setVolume(100));
            inputVolumeSongRef.current.value = 100;
            audioRef.current.volume = 1;
        }
    };

    //player queue
    const handleOpenPlayerQueuePlaylist = (e) => {
        e.stopPropagation();
        dispatch(userConfigSlice.actions.setIsOpenPlayerQueue(true));
        playerQueueRef.current.classList.add(cx('player-queue-animation-enter'));
        setTimeout(() => {
            playerQueueRef.current.classList.add(cx('player-queue-animation-enter'));
            playerQueueRef.current.classList.add(cx('player-queue-animation-enter-active'));
        }, 100);
        setTimeout(() => {
            playerQueueRef.current.classList.remove(cx('player-queue-animation-enter'));
            playerQueueRef.current.classList.remove(cx('player-queue-animation-enter-active'));
        }, 800);
    };

    const handleCloselayerQueuePlaylist = (e) => {
        e.stopPropagation();
        playerQueueRef.current.classList.add(cx('player-queue-animation-exit'));
        setTimeout(() => {
            playerQueueRef.current.classList.add(cx('player-queue-animation-exit'));
            playerQueueRef.current.classList.add(cx('player-queue-animation-exit-active'));
        }, 100);
        setTimeout(() => {
            playerQueueRef.current.classList.remove(cx('player-queue-animation-exit'));
            playerQueueRef.current.classList.remove(cx('player-queue-animation-exit-active'));
            dispatch(userConfigSlice.actions.setIsOpenPlayerQueue(false));
        }, 800);
    };

    //Handle open player full screen
    const handleOpenPlayerFullScreen = () => {
        playerFullRef.current.style.width = '100%';
        playerFullRef.current.style.height = '100%';

        playerFullRef.current.classList.add(cx('video-animation-enter'));
        setIsOpenPlayerFullScreen(true);
        setTimeout(() => {
            playerFullRef.current.classList.remove(cx('video-animation-enter'));
        }, 600);
    };

    //

    const handleClosePlayerFullScreen = () => {
        playerFullRef.current.style.width = '0%';
        playerFullRef.current.style.height = '0%';
        playerFullRef.current.classList.add(cx('video-animation-exit'));
        setIsOpenPlayerFullScreen(false);
        setTimeout(() => {
            playerFullRef.current.classList.remove(cx('video-animation-exit'));
        }, 600);
    };

    //handle event loop song
    const handleLoopSong = (e) => {
        e.stopPropagation();
        dispatch(songSlice.actions.setIsLoop(!isLoop));
    };

    //Handle random
    const handleTouchBtnRandom = (e) => {
        e.stopPropagation();
        dispatch(songSlice.actions.setIsRandom(!isRandom));
    };

    //Handle when audio end song
    const handleEndAudio = () => {
        if (!isLoop) {
            dispatch(songSlice.actions.setIsPlay(false));
            if (!isRandom) {
                if (currentIndexSong === playlists.length - 1) {
                    dispatch(songSlice.actions.setCurrentIndexSong(0));
                    dispatch(songSlice.actions.setSongId(playlists[0].encodeId));
                    dispatch(songSlice.actions.setIsPlay(true));
                } else {
                    const indexSongNext = currentIndexSong + 1;
                    dispatch(songSlice.actions.setCurrentIndexSong(indexSongNext));
                    dispatch(songSlice.actions.setSongId(playlists[indexSongNext].encodeId));
                    dispatch(songSlice.actions.setIsPlay(true));
                }
            }
            //play song in playlist random
            else {
                handlePlaySongRandom(currentIndexSong, playlists, arrayIndexRandom, dispatch, songSlice);
            }
        }
    };

    const handleNextSong = (e) => {
        e.stopPropagation();
        dispatch(songSlice.actions.setIsPlay(false));
        if (isRandom) {
            if (isLoop) dispatch(songSlice.actions.setIsLoop(false));

            handlePlaySongRandom(currentIndexSong, playlists, arrayIndexRandom, dispatch, songSlice);
        } else {
            if (currentIndexSong === playlists.length - 1) {
                dispatch(songSlice.actions.setCurrentIndexSong(0));
                dispatch(songSlice.actions.setSongId(playlists[0].encodeId));
                dispatch(songSlice.actions.setIsPlay(true));
            } else {
                const indexSongNext = currentIndexSong + 1;
                dispatch(songSlice.actions.setCurrentIndexSong(indexSongNext));
                dispatch(songSlice.actions.setSongId(playlists[indexSongNext].encodeId));
                dispatch(songSlice.actions.setIsPlay(true));
            }
        }
    };

    const handlePreviousSong = (e) => {
        e.stopPropagation();
        dispatch(songSlice.actions.setIsPlay(false));
        if (isRandom) {
            if (isLoop) dispatch(songSlice.actions.setIsLoop(false));

            handlePlaySongRandom();
        } else {
            let indexSongPrevious;
            if (currentIndexSong === 0) {
                indexSongPrevious = playlists.length - 1;
                dispatch(songSlice.actions.setCurrentIndexSong(indexSongPrevious));
                dispatch(songSlice.actions.setSongId(playlists[indexSongPrevious].encodeId));
                dispatch(songSlice.actions.setIsPlay(true));
            } else {
                indexSongPrevious = currentIndexSong - 1;
                dispatch(songSlice.actions.setCurrentIndexSong(indexSongPrevious));
                dispatch(songSlice.actions.setSongId(playlists[indexSongPrevious].encodeId));
                dispatch(songSlice.actions.setIsPlay(true));
            }
        }
    };

    useEffect(() => {
        const getSongResponse = async () => {
            try {
                const response = await instance.get(`/song/info?id=${songId}`);
                if (response.data) {
                    dispatch(songSlice.actions.setSongInfo(response.data));
                } else {
                    dispatch(
                        songSlice.actions.setSongInfo({
                            title: '',
                            artists: [],
                            duration: 0,
                        }),
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        const getSrcAudio = async () => {
            try {
                setIsLoadingPlay(true);
                const response = await instance.get(`/song/streaming?id=${songId}`);
                if (response.data) {
                    dispatch(songSlice.actions.setSrcAudio(response.data[128]));

                    setTimeout(() => {
                        setIsLoadingPlay(false);
                    }, 500);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getSrcAudio();
        getSongResponse();
    }, [songId, dispatch]);

    useEffect(() => {
        if (srcAudio !== '') {
            isPlay ? audioRef.current.play() : audioRef.current.pause();
        }
    }, [srcAudio, isPlay]);

    useEffect(() => {
        if (srcAudio !== '') {
            audioRef.current.volume = volume / 100;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [srcAudio]);

    useEffect(() => {
        const handleResizeWindow = () => {
            //Update sliderhandle circle time
            const sliderHanldeTimeY = (
                ((progressbarTimeRef.current.clientWidth - 12) * inputTimeSongRef.current.value) /
                100
            ).toFixed(4);
            sliderHandleTimeRef.current.style.transform = `translate(${sliderHanldeTimeY}px, -3.5px)`;
        };
        window.addEventListener('resize', handleResizeWindow);

        return () => {
            window.removeEventListener('resize', handleResizeWindow);
        };
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleCloselayerQueuePlaylist);

        return () => {
            document.removeEventListener('click', handleCloselayerQueuePlaylist);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpenPlayerQueue]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('nowplaying-full')} ref={playerFullRef}>
                {isOpenPlayerFullScreen && (
                    <PlayerFullScreen onClosePlayerFullScreen={handleClosePlayerFullScreen} audioRef={audioRef} />
                )}
            </div>
            <div className={cx('player-queue')} ref={playerQueueRef}>
                {isOpenPlayerQueue && <PlayerPlaylist onClosePlayerQueuePlaylist={handleCloselayerQueuePlaylist} />}
            </div>
            <div className={cx('inner', 'clickable', isOpenPlayerFullScreen && 'opac')}>
                <div className={cx('player-controls')}>
                    <div className={cx('player-controls__left')}>
                        <div className={cx('song-detail')}>
                            <div className={cx('song-thumb')}>
                                <Link to="/">
                                    <div className={cx('thumb')}>
                                        <figure className="image">
                                            <img src={songInfo?.thumbnail || songInfo?.thumbnailM} alt="" />
                                        </figure>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('song-info')}>
                                <div className={cx('name-wrapper')}>
                                    <span className={cx('name')}>{songInfo?.title}</span>
                                </div>
                                <h3 className={cx('artist')}>
                                    {songInfo?.artists.length > 0 &&
                                        songInfo.artists
                                            .map((artist) => (
                                                <Link key={artist.id} to={artist.link} className={cx('is-ghost')}>
                                                    {artist.name}
                                                </Link>
                                            ))
                                            .reduce((prev, current) => [prev, ', ', current])}
                                </h3>
                            </div>
                            <div className={cx('actions-song-left')}>
                                <div className={clsx(cx('level-left'), 'level')}>
                                    <div className={cx('level-item')}>
                                        <Tippy content="Thêm vào thư viện">
                                            <button
                                                className={clsx(
                                                    cx('animation-like', 'icon-width'),
                                                    'is-hover-circle',
                                                    'zm-btn',
                                                )}
                                            >
                                                <span className={cx('icon', 'is-like')}>
                                                    <FontAwesomeIcon
                                                        icon={faHeartRegular}
                                                        className={cx('icon-hover')}
                                                    />
                                                </span>
                                                <span className={cx('icon', 'is-like-full')}>
                                                    <FontAwesomeIcon icon={faHeartSolid} className={cx('icon-hover')} />
                                                </span>
                                            </button>
                                        </Tippy>
                                    </div>
                                    <div className={cx('level-item')}>
                                        <Tippy content="Xem thêm">
                                            <button
                                                className={clsx(cx('more', 'icon-width'), 'is-hover-circle', 'zm-btn')}
                                            >
                                                <FontAwesomeIcon icon={faEllipsis} className={cx('icon-hover')} />
                                            </button>
                                        </Tippy>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('player-controls__player-bar')}>
                        <div className={cx('level-item')}>
                            <div className={cx('controls')}>
                                <Tippy
                                    trigger="mouseenter focus click"
                                    content={isRandom ? 'Tắt phát ngẫu nhiên' : 'Bật phát ngẫu nhiên'}
                                >
                                    <button
                                        className={clsx(
                                            cx('tooltip-btn', 'icon-width', { isActiveRandom: isRandom }),
                                            'is-hover-circle',
                                            'hide-on-mobile',
                                            'zm-btn',
                                        )}
                                        onClick={handleTouchBtnRandom}
                                    >
                                        <ShuffleIcon className={cx('icon-hover', 'icon-no-pd')} />
                                    </button>
                                </Tippy>
                                <button
                                    className={clsx(
                                        cx('tooltip-btn', 'icon-width'),
                                        'is-hover-circle',
                                        'hide-on-mobile',
                                        'zm-btn',
                                    )}
                                    onClick={handlePreviousSong}
                                >
                                    <FontAwesomeIcon icon={faBackwardStep} className={cx('icon-hover')} />
                                </button>
                                <button
                                    className={clsx(cx('tooltip-btn', 'btn-play'), 'zm-btn')}
                                    onClick={handlePlayAndPauseSong}
                                >
                                    {isLoadingPlay ? (
                                        <SpinnerLoadIcon />
                                    ) : isPlay ? (
                                        <FontAwesomeIcon
                                            icon={faPause}
                                            className={cx('icon-hover', 'icon-toggle-play')}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faPlay}
                                            className={cx('icon-hover', 'icon-toggle-play', 'icon-play')}
                                        />
                                    )}
                                </button>
                                <button
                                    className={clsx(cx('tooltip-btn', 'icon-width'), 'is-hover-circle', 'zm-btn')}
                                    onClick={handleNextSong}
                                >
                                    <FontAwesomeIcon icon={faForwardStep} className={cx('icon-hover')} />
                                </button>
                                <Tippy
                                    trigger="mouseenter focus click"
                                    content={isLoop ? 'Bật phát lại tất cả' : 'Bật phát lại một bài'}
                                >
                                    <button
                                        className={clsx(
                                            cx('tooltip-btn', 'icon-width', { isActiveLoop: isLoop }),
                                            'is-hover-circle',
                                            'hide-on-mobile',
                                            'zm-btn',
                                        )}
                                        onClick={handleLoopSong}
                                    >
                                        <LoopIcon className={cx('icon-hover', 'icon-no-pd')} />
                                    </button>
                                </Tippy>
                            </div>
                        </div>
                        <div className={clsx(cx('level-item', 'wrapper-time-song'), 'mb-5', 'hide-on-mobile')}>
                            <div className={cx('time-left')} ref={timeCurrentAudioRef}>
                                00:00
                            </div>
                            <input
                                ref={inputTimeSongRef}
                                type="range"
                                className={cx('progress-time-input')}
                                step="1"
                                min="0"
                                max="100"
                                defaultValue="0"
                                onMouseDown={seekStart}
                                onTouchStart={seekStart}
                                onMouseUp={seekEnd}
                                onTouchEnd={seekEnd}
                                onMouseMove={currentTimeSong}
                                onTouchMove={currentTimeSong}
                                onClick={handleClickToStopPropagation}
                            />
                            <div className={cx('duration-bar', 'progress__track')}>
                                <div
                                    ref={progressbarTimeRef}
                                    className={cx('slider-bar')}
                                    style={{
                                        borderRadius: '4px',
                                        background:
                                            'linear-gradient(to right,var(--progressbar-active-bg) 0%,var(--progressbar-active-bg) 0%,var(--progressbar-player-bg) 0%,var(--progressbar-player-bg) 100%)',
                                    }}
                                >
                                    <div className={cx('slider-handle')} ref={sliderHandleTimeRef}></div>
                                </div>
                            </div>
                            <div className={cx('time-right')}>{secondsToTime(songInfo.duration)}</div>
                        </div>
                    </div>
                    <div className={clsx(cx('player-controls__right'), 'hide-on-mobile')}>
                        <div className={cx('level-item')}>
                            <button
                                className={clsx(cx('tooltip-btn', 'icon-width'), 'is-hover-circle', 'zm-btn')}
                                disabled={!songInfo.mvlink}
                            >
                                <FontAwesomeIcon icon={faVideo} className={cx('icon-hover')} />
                            </button>
                        </div>

                        <div className={cx('level-item')}>
                            <Tippy content="Xem lời bài hát">
                                <button
                                    className={clsx(cx('tooltip-btn', 'icon-width'), 'is-hover-circle', 'zm-btn')}
                                    onClick={handleOpenPlayerFullScreen}
                                >
                                    <KaraokeIcon className={cx('icon-hover')} />
                                </button>
                            </Tippy>
                        </div>

                        <div className={cx('level-item')}>
                            <Tippy content="Chế độ cửa sổ">
                                <button className={clsx(cx('tooltip-btn', 'icon-width'), 'is-hover-circle', 'zm-btn')}>
                                    <FontAwesomeIcon icon={faExpand} className={cx('icon-hover')} />
                                </button>
                            </Tippy>
                        </div>
                        <div className={cx('level-item')}>
                            <div className={cx('group-volumn')}>
                                <button
                                    className={clsx(
                                        cx('tooltip-btn', 'icon-width', 'btn-volumn'),
                                        'is-hover-circle',
                                        'zm-btn',
                                    )}
                                    onClick={handleOnOffVolume}
                                >
                                    {isVolumeOff ? (
                                        <FontAwesomeIcon icon={faVolumeXmark} className={cx('icon-hover')} />
                                    ) : (
                                        <FontAwesomeIcon icon={faVolumeLow} className={cx('icon-hover')} />
                                    )}
                                </button>

                                <div className={cx('volumn-wrap')}>
                                    <input
                                        ref={inputVolumeSongRef}
                                        className={cx('volumn-input')}
                                        type="range"
                                        step="1"
                                        min="0"
                                        max="100"
                                        defaultValue={volume}
                                        onChange={handleChangeVolume}
                                        onClick={handleClickToStopPropagation}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('separate')}></div>

                        <div className={cx('level-item', 'expand-wrap')}>
                            <Tippy content="Danh sách phát">
                                <button
                                    className={clsx(
                                        cx(
                                            'tooltip-btn',
                                            'icon-width',
                                            'queue-expand-btn',
                                            isOpenPlayerQueue && 'active',
                                        ),
                                        'is-hover-circle',
                                        'zm-btn',
                                    )}
                                    onClick={(e) => {
                                        isOpenPlayerQueue
                                            ? handleCloselayerQueuePlaylist(e)
                                            : handleOpenPlayerQueuePlaylist(e);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faList} className={cx('icon-hover')} />
                                </button>
                            </Tippy>
                        </div>
                    </div>
                </div>
            </div>
            <audio
                ref={audioRef}
                src={srcAudio}
                loop={isLoop}
                autoPlay={isPlay}
                onTimeUpdate={handleUpdateTimeAudio}
                onEnded={handleEndAudio}
            />
        </div>
    );
}

export default Player;
