import { useState } from 'react';
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
import { useSelector } from 'react-redux';
import Tippy from '@tippyjs/react';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

function PlayerFullScreen({ onClosePlayerFullScreen, audioRef }) {
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

    const SETTING_NOWPLAYING_OPTION_ITEMS = [
        {
            title: 'Hình nền',
            type: 'theme',
            isCheck: false,
        },
        {
            title: 'Chỉ phát nhạc nền',
            type: 'theme',
            isNoneSelected: true,
            isCheck: false,
        },
        {
            title: 'Cỡ chữ lời nhạc',
            type: 'theme',
            listOptions: [
                {
                    type: 'size',
                    size: 'S',
                    isActive: false,
                },
                {
                    type: 'size',
                    size: 'M',
                    isActive: true,
                },
                {
                    type: 'size',
                    size: 'L',
                    isActive: false,
                },
            ],
        },
        {
            title: 'Luôn phát toàn màn hình',
            type: 'theme',
            isCheck: false,
        },
    ];

    const [typeTab, setTypeTab] = useState('lyric');
    const [isFullScreen, setIsFullScreen] = useState(false);

    const songInfo = useSelector((state) => state.song.songInfo);
    const playlistInfo = useSelector((state) => state.playlist.playlistInfo);

    const handleChangeTab = (type) => {
        if (!(type === typeTab)) {
            setTypeTab(type);
        }
    };

    const elem = document.documentElement;

    /* View in fullscreen */
    const openFullscreen = () => {
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}>
                <div className={cx('overlay')}></div>

                <div className={cx('image-effect')}>
                    <div className={cx('bg-img', 'exit')}>
                        <img
                            src="https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/6/2/3/9/62392463eab1eb1aaa2d1f3bd0f758bb.jpg"
                            alt=""
                        />
                    </div>
                    <div className={cx('bg-img', 'enter')}>
                        <img
                            src="https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/e/6/4/f/e64f4fd6f53caebabc1c26d592093cfa.jpg"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <div className={cx('header__left')}>
                        <div className={cx('logo')}></div>
                        <div className={cx('info')}>
                            <div>Từ playlist</div>
                            <span>{playlistInfo.title}</span>
                        </div>
                    </div>
                    <div className={cx('header__tabs')}>
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
                    <div className={cx('header__action-group')}>
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
                        <Karaoke />
                    ) : (
                        <Playlist />
                    )}
                </div>

                <div className={cx('bottom')}>
                    {typeTab === 'playlist' ? (
                        ''
                    ) : (
                        <div className={cx('text-transition')}>
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
