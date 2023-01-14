import { useEffect, useState } from 'react';
import {
    faAngleDown,
    faDownLeftAndUpRightToCenter,
    faGear,
    faUpRightAndDownLeftFromCenter,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import classNames from 'classnames/bind';
import Karaoke from './Karaoke';
import Lyric from './Lyric';
import styles from './PlayerFullScreen.module.scss';
import Playlist from './Playlist';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react';
import Menu from '~/components/Popper/Menu';
import { SETTING_NOWPLAYING_OPTION_ITEMS } from '~/utils/contains';
import { collectSlice } from '~/redux/features/collect/collectSlice';
import { getRadomTwoBGLyric } from '~/utils/collectionFunctionConstants';

const cx = classNames.bind(styles);

const tabs = [
    {
        title: 'Danh sách phát',
        type: 'playlist',
    },
    {
        title: 'Karaoke',
        type: 'karaoke',
    },
    {
        title: 'Lời bài hát',
        type: 'lyric',
    },
];
function PlayerFullScreen({ onClosePlayerFullScreen, audioRef }) {
    //state
    const [typeTab, setTypeTab] = useState('lyric');
    const [isFullScreen, setIsFullScreen] = useState(false);

    //selector
    const songInfo = useSelector((state) => state.song.songInfo);
    const isPlay = useSelector((state) => state.song.isPlay);

    const playlistInfo = useSelector((state) => state.playlist.playlistInfo);

    const twoBackgroundForUILyric = useSelector((state) => state.collect.twoBackgroundForUILyric);
    const listBackgroundLyric = useSelector((state) => state.collect.listBackgroundLyric);
    const arrayIndexListBGRandomLyric = useSelector((state) => state.collect.arrayIndexListBGRandomLyric);

    const isTurnOnModeWallpaper = useSelector((state) => state.userConfig.isTurnOnModeWallpaper);

    const dispatch = useDispatch();

    const handleChangeTab = (type) => {
        if (!(type === typeTab)) {
            setTypeTab(type);
        }
    };

    /* View in fullscreen */
    const openFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
        }
    };

    /* Close fullscreen */
    const closeFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen();
        }
    };

    const handleChangeFullScreen = () => {
        if (!isFullScreen) {
            setIsFullScreen(true);
            openFullscreen();
        } else {
            setIsFullScreen(false);
            closeFullscreen();
        }
    };

    useEffect(() => {
        let handler;
        if (isPlay) {
            handler = setInterval(() => {
                getRadomTwoBGLyric(listBackgroundLyric, arrayIndexListBGRandomLyric, collectSlice, dispatch);
            }, 15000);
        } else {
            clearInterval(handler);
        }

        return () => clearInterval(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlay, listBackgroundLyric, arrayIndexListBGRandomLyric]);

    useEffect(() => {
        let timer;
        if (isTurnOnModeWallpaper) {
            const bgAnimationPlayerFulls = document.querySelectorAll('.bg-animation-playerfull');

            if (bgAnimationPlayerFulls) {
                bgAnimationPlayerFulls.forEach((item) => {
                    item.style.animation = 'none';
                });

                timer = setTimeout(() => {
                    bgAnimationPlayerFulls.forEach((item, index) => {
                        let animateName = '';
                        let animateDuration = '';
                        if (index === 0) {
                            animateName = 'animateExit';
                            animateDuration = '5s';
                        } else if (index === 1) {
                            animateName = 'animateEnter';
                            animateDuration = '10s';
                        }
                        item.style.animation = `=${animateName} ${animateDuration} linear`;
                        item.style.webkitanimationTimingFunction = 'linear';
                        item.style.webkitAnimationName = animateName;
                        item.style.webkitAnimationDuration = animateDuration;
                    });
                }, 200);
            }
        }

        return () => {
            clearTimeout(timer);
        };
    }, [twoBackgroundForUILyric, isTurnOnModeWallpaper]);

    useEffect(() => {
        const playingNowBarWrapper = document.getElementById('playing-now-bar-wrapper');
        let timerMove;
        const drawCanvasBackground = () => {
            const canvas = document.querySelector('.react-blur-canvas');

            if (canvas) {
                const ctx = canvas.getContext('2d');

                const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
                // Add three color stops
                gradient.addColorStop(0, '#e1e8e8');
                gradient.addColorStop(0.5, '#d99595');
                gradient.addColorStop(1, '#e1e8e8');

                // Set the fill style and draw a rectangle
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        };

        drawCanvasBackground();

        // event mousemove

        const handleEventMouseOut = () => {
            clearTimeout(timerMove);
            playingNowBarWrapper.classList.remove('is-idle');

            timerMove = setTimeout(() => {
                console.log('not change mouse in 6s');
                playingNowBarWrapper.classList.add('is-idle');
            }, 6000);
        };
        window.addEventListener('mouseout', handleEventMouseOut);

        return () => {
            playingNowBarWrapper.classList.remove('is-idle');
            clearTimeout(timerMove);
            window.removeEventListener('mouseout', handleEventMouseOut);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}>
                <div className={cx('video-blur-image')}>
                    <canvas className="react-blur-canvas"></canvas>
                </div>
                <div className={cx('overlay')}></div>

                {isTurnOnModeWallpaper && (
                    <div className={cx('image-effect', isPlay && 'is-play')}>
                        {twoBackgroundForUILyric?.map((image, index) => (
                            <div
                                className={clsx(
                                    cx('bg-img', index === 0 ? 'exit' : 'enter'),
                                    'bg-animation-playerfull',
                                )}
                                key={index}
                            >
                                <img src={image} alt="" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={cx('content')}>
                <div className={clsx(cx('header'), 'fs-header')}>
                    <div className={clsx(cx('header__left'), 'fs-header-left')}>
                        <div className={cx('logo')}></div>
                        <div className={cx('info')}>
                            <div>Từ playlist</div>
                            <span>{playlistInfo.title}</span>
                        </div>
                    </div>
                    <div className={clsx(cx('header__tabs'), 'tabs-pnbf')}>
                        {tabs.map((tab) => (
                            <div
                                key={tab.type}
                                className={cx('tab-item', typeTab === tab.type && 'active')}
                                onClick={() => handleChangeTab(tab.type)}
                            >
                                {tab.title}
                            </div>
                        ))}
                    </div>
                    <div className={clsx(cx('header__action-group'), 'action-group-pnbf')}>
                        <div className={cx('action-item')}>
                            <Tippy content={isFullScreen ? 'Thoát toàn màn hinh' : 'Toàn màn hình'}>
                                <button className={clsx(cx('tooltip-btn'), 'zm-btn')} onClick={handleChangeFullScreen}>
                                    <FontAwesomeIcon
                                        icon={
                                            isFullScreen ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter
                                        }
                                    />
                                </button>
                            </Tippy>
                        </div>
                        <div className={cx('action-item')}>
                            <Menu
                                items={SETTING_NOWPLAYING_OPTION_ITEMS}
                                placement="bottom-end"
                                trigger="click"
                                className={cx('menu-list')}
                            >
                                <Tippy content="Cài đặt">
                                    <button className={clsx(cx('tooltip-btn'), 'zm-btn')}>
                                        <FontAwesomeIcon icon={faGear} />
                                    </button>
                                </Tippy>
                            </Menu>
                        </div>
                        <div className={cx('action-item')}>
                            <Tippy content="Đóng">
                                <button className={clsx(cx('tooltip-btn'), 'zm-btn')} onClick={onClosePlayerFullScreen}>
                                    <FontAwesomeIcon icon={faAngleDown} />
                                </button>
                            </Tippy>
                        </div>
                    </div>
                </div>

                <div className={cx('body')}>
                    {typeTab === 'lyric' ? (
                        <Lyric audioRef={audioRef} />
                    ) : typeTab === 'karaoke' ? (
                        <Karaoke audioRef={audioRef} />
                    ) : (
                        <Playlist />
                    )}
                </div>

                <div className={cx('bottom')}>
                    {typeTab === 'playlist' ? (
                        ''
                    ) : (
                        <div className={clsx(cx('text-transition'), 'zm-text-transition')}>
                            <div className={cx('text-transition__content')}>
                                <span className={cx('text-transition__item')}>
                                    {songInfo.title} -{' '}
                                    <span className={cx('artist')}>
                                        {songInfo.artists
                                            ?.map((artist) => artist.name)
                                            .reduce((prev, current) => [prev, ', ', current])}
                                    </span>
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PlayerFullScreen;
