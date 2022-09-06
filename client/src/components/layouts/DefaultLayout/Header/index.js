import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, ArrowRight, Upload, Gear } from 'react-bootstrap-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBan,
    faFileLines,
    faFlag,
    faGem,
    faHighlighter,
    faInfo,
    faPhone,
    faPlayCircle,
    faRectangleAd,
    faShieldAlt,
    faSignOut,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faVuejs } from '@fortawesome/free-brands-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import instance from '~/utils/axios';
import { ThemeIcon } from '~/components/layouts/components/Icons';
import Search from '~/components/layouts/components/Search';
import Menu from '~/components/Popper/Menu';
import Modal from '~/components/layouts/Modal';
import ThemeOption from '~/components/layouts/components/ThemeOption';
import images from '~/assets/images';
import Image from '~/components/layouts/components/Image';
import { authSlice } from '~/redux/features/auth/authSlice';
import { handleSetThemeWebsite } from '~/utils/collectionFunctionConstants';

const cx = classNames.bind(styles);

const SETTING_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faBan} />,
        title: 'Danh sách chặn',
    },
    {
        icon: <FontAwesomeIcon icon={faHighlighter} />,
        title: 'Chất lượng nhạc',
        items: [
            {
                title: 'SQ • 128',
                type: 'quaility-music',
                description: 'Giảm sử dụng dữ liệu cho các kết nối chậm hơn.',
                isActive: false,
            },
            {
                title: 'HQ • 320',
                type: 'quaility-music',
                description: 'Kết hợp tốt nhất giữa việc sử dụng dữ liệu và chất lượng âm thanh.',
                isActive: true,
            },
        ],
    },
    {
        icon: <FontAwesomeIcon icon={faPlayCircle} />,
        title: 'Giao diện',
        items: [
            {
                title: 'Luôn phát nhạc toàn màn hình',
                type: 'theme',
                isCheck: false,
            },
            {
                title: 'Hiệu ứng',
                type: 'theme',
                isCheck: false,
            },
        ],
    },
    {
        icon: <FontAwesomeIcon icon={faInfo} />,
        title: 'Giới thiệu',
        separate: true,
    },
    {
        icon: <FontAwesomeIcon icon={faFlag} />,
        title: 'Góp ý',
    },
    {
        icon: <FontAwesomeIcon icon={faPhone} />,
        title: 'Liên hệ',
    },
    {
        icon: <FontAwesomeIcon icon={faRectangleAd} />,
        title: 'Quảng cáo',
    },
    {
        icon: <FontAwesomeIcon icon={faFileLines} />,
        title: 'Thỏa thuận sử dụng',
    },
    {
        icon: <FontAwesomeIcon icon={faShieldAlt} />,
        title: 'Chính sách bảo mật',
    },
];

const THEME_ITEMS = [
    {
        title: 'Dynamic',
        items: [
            {
                id: 'lodon',
                title: 'Lodon',
                image: images.LodonTheme,
                bgLayout: images.LodonLayout,
                dataTheme: 'blue',
                styleHtml: '--layout-bg: #061d50;',
            },
            {
                id: 'dyamic',
                title: 'Sáng tối',
                image: images.LightDarkTheme,
                dataTheme: 'dark',
            },
            {
                id: 'dyamic-blue',
                title: 'Xanh Da Trời',
                image: images.BlueTheme,
                dataTheme: 'blue',
            },
            {
                id: 'dyamic-pink',
                title: 'Hồng',
                image: images.PinkTheme,
                dataTheme: 'pink-light',
            },
            {
                id: 'dyamic-brown',
                title: 'Nâu',
                image: images.BrownTheme,
                dataTheme: 'brown',
            },
        ],
    },
    {
        title: 'Chủ Đề',
        items: [
            {
                id: 'xmon',
                title: 'XNON',
                image: images.XoneTheme,
                bgLayout: images.XoneLayout,
                dataTheme: 'dark',
                styleHtml: '--purple-primary: #d7cb1f;--progressbar-active-bg: #d7cb1f;--link-text-hover: #d7cb1f;',
            },
            {
                id: 'zma',
                title: 'Zing Music Awards',
                image: images.ZMATheme,
                bgLayout: images.ZMALayout,
                dataTheme: 'blue',
                styleHtml:
                    '--layout-bg: #37075d;--primary-bg: #6a39af;--queue-player-popup-bg: #5d218c;--purple-primary: #ed2b91;--link-text-hover: #fe63da;--sidebar-popup-bg: #572f90;--linear-gradient-bg: linear-gradient(to bottom, #740091, #2d1a4c);',
            },
            {
                id: 'eiffel',
                title: 'Tháp Eiffel',
                image: images.EiffelTheme,
                bgLayout: images.EiffelLayout,
                dataTheme: 'dark',
                styleHtml: '--layout-bg: #282828;--primary-bg: #3d3d3d;',
            },
        ],
    },
    {
        title: 'Nghệ Sĩ',
        items: [
            {
                id: 'jack',
                title: 'Jack',
                image: images.JackTheme,
                bgLayout: images.JackLayout,
                dataTheme: 'brown',
                styleHtml:
                    '--layout-bg:#767269; --primary-bg:#565147; --queue-player-popup-bg:#726c5e; --purple-primary:#ac8e77; --main-box-shadow:#4242421a; --linear-gradient-bg:linear-gradient(to bottom, #656156, #574f40);',
            },
            {
                id: 'iu',
                title: 'IU',
                image: images.IUTheme,
                bgLayout: images.IULayout,
                dataTheme: 'gray',
                styleHtml: '--layout-bg:#e7dfdd; --purple-primary:#409abc; --text-item-hover:#409abc;',
            },
            {
                id: 'ji-chang-wook',
                title: 'Ji Chang Wook',
                image: images.JiChangWookTheme,
                bgLayout: images.JiChangWookLayout,
                dataTheme: 'green-light',
                styleHtml: '--layout-bg:#b2d8db;',
            },
            {
                id: 'lisa',
                title: 'Lisa',
                image: images.LisaTheme,
                bgLayout: images.LisaLayout,
                dataTheme: 'pink-light',
                styleHtml: '--layout-bg:#b2d8db;',
            },
            {
                id: 'jennie-kim',
                title: 'Jennie Kim',
                image: images.JennieTheme,
                bgLayout: images.JennieLayout,
                dataTheme: 'gray',
                styleHtml:
                    '--layout-bg:#bab8c3; --player-bg:#c6c4d1; --purple-primary:#346875; --primary-bg:#e2e7f5; --text-item-hover:#2a5e6b;',
            },
            {
                id: 'jisoo',
                title: 'Jisoo',
                image: images.JisooTheme,
                bgLayout: images.JisooLayout,
                dataTheme: 'light',
                styleHtml: null,
            },
            {
                id: 'rose',
                title: 'Rosé',
                image: images.RoseTheme,
                bgLayout: images.RoseLayout,
                dataTheme: 'blue',
                styleHtml: '--layout-bg:#061d50;',
            },
        ],
    },
    {
        title: 'Màu Tối',
        items: [
            {
                id: 'dark',
                title: 'Tối',
                image: images.DarkTheme,
                dataTheme: 'dark',
            },
            {
                id: 'purple',
                title: 'Tím',
                image: images.PurpleTheme,
                dataTheme: 'purple',
            },
            {
                id: 'blue',
                title: 'Xanh Đậm',
                image: images.BlueTheme,
                dataTheme: 'blue',
            },
            {
                id: 'blue-light',
                title: 'Xanh Biển',
                image: images.BlueLightTheme,
                dataTheme: 'blue-light',
            },
            {
                id: 'green',
                title: 'Xanh Lá',
                image: images.GreenTheme,
                dataTheme: 'green',
            },
            {
                id: 'brown',
                title: 'Nâu',
                image: images.BrownTheme,
                dataTheme: 'brown',
            },
            {
                id: 'pink',
                title: 'Hồng',
                image: images.PinkTheme,
                dataTheme: 'pink',
            },
            {
                id: 'red',
                title: 'Đỏ',
                image: images.RedTheme,
                dataTheme: 'red',
            },
        ],
    },
    {
        title: 'Màu Sáng',
        items: [
            {
                id: 'light',
                title: 'Sáng',
                image: images.LightTheme,
                dataTheme: 'light',
            },
            {
                id: 'gray',
                title: 'Xám',
                image: images.GrayTheme,
                dataTheme: 'gray',
            },
            {
                id: 'green-light',
                title: 'Xanh Nhạt',
                image: images.GreenLightTheme,
                dataTheme: 'green-light',
            },
            {
                id: 'pink-light',
                title: 'Hồng Cánh Sen',
                image: images.PinkLightTheme,
                dataTheme: 'pink-light',
            },
        ],
    },
];

function Header({ headerRef }) {
    const [openTheme, setOpenTheme] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const theme = useSelector((state) => state.userConfig.theme);

    const USER_OPTION_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faGem} />,
            title: 'Nâng cấp VIP',
        },
        {
            icon: <FontAwesomeIcon icon={faVuejs} />,
            title: 'Mua code VIP',
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Đăng xuất',
            separate: true,
            onClick: () => {
                dispatch(authSlice.actions.setToken(null));
                dispatch(authSlice.actions.setUser(null));
                localStorage.removeItem('token-user-zm3');
                navigate('/login');
            },
        },
    ];

    const handleOpenModalSetting = () => {
        setOpenTheme(true);
    };

    const hanldCloseModal = () => {
        const htmlElement = document.getElementsByTagName('html')[0];
        const dataIdTheme = htmlElement.getAttribute('data-themeid');

        if (dataIdTheme !== theme.id) {
            handleSetThemeWebsite(theme);
        }
        setOpenTheme(false);
    };

    return (
        <>
            <div className={cx('wrapper')} ref={headerRef}>
                <div className={cx('inner')}>
                    <div className={cx('inner__left')}>
                        <ArrowLeft className={clsx('zm-btn', 'hide-on-mobile', cx('button'))} />
                        <ArrowRight className={clsx('zm-btn', 'disabled', 'hide-on-mobile', cx('button'))} />

                        <Search />
                    </div>
                    <div className={cx('notifycation-wrap')}>
                        <button className={cx('notify')}>
                            <FontAwesomeIcon icon={faBell} />
                        </button>
                    </div>
                    <div className={cx('inner__right')}>
                        <Tippy content="Chủ đề">
                            <div className={clsx(cx('setting'), 'hide-on-mobile')}>
                                <button className={clsx(cx('icon', 'size'), 'zm-btn')} onClick={handleOpenModalSetting}>
                                    <ThemeIcon />
                                </button>
                            </div>
                        </Tippy>

                        <Tippy content="Nâng cấp VIP">
                            <div className={clsx(cx('setting'), 'hide-on-mobile')}>
                                <button className={clsx(cx('icon', 'size'), 'zm-btn')}>
                                    <FontAwesomeIcon icon={faVuejs} />
                                </button>
                            </div>
                        </Tippy>

                        <Tippy content="Tải lên">
                            <div className={clsx(cx('setting'), 'hide-on-mobile')}>
                                <button className={clsx(cx('icon', 'size'), 'zm-btn')}>
                                    <Upload />
                                </button>
                            </div>
                        </Tippy>
                        <Menu items={SETTING_ITEMS} placement="bottom-end" trigger="click" className={cx('menu-list')}>
                            <Tippy content="Cài đặt">
                                <div className={clsx(cx('setting'), 'hide-on-mobile')}>
                                    <button className={clsx(cx('icon', 'size'), 'zm-btn')}>
                                        <Gear />
                                    </button>
                                </div>
                            </Tippy>
                        </Menu>
                        {user ? (
                            <Menu
                                items={USER_OPTION_ITEMS}
                                placement="bottom-end"
                                trigger="click"
                                className={cx('menu-list')}
                            >
                                <div className={cx('avatar')}>
                                    <Image
                                        src="https://s120-ava-talk-zmp3.zmdcdn.me/3/a/a/b/27/120/b4701d451aea1101afa6d78875e0f7f6.jpg"
                                        alt=""
                                        className={cx('avatar__img')}
                                    />
                                </div>
                            </Menu>
                        ) : (
                            <Link to="/login">
                                <div className={cx('avatar')}>
                                    <Image
                                        src="https://s120-ava-talk-zmp3.zmdcdn.me/3/a/a/b/27/120/b4701d451aea1101afa6d78875e0f7f6.jpg"
                                        alt=""
                                        className={cx('avatar__img')}
                                    />
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            {openTheme && (
                <Modal className={cx('content-theme')} onClickOverLay={hanldCloseModal}>
                    <h3 className={cx('heading')}>Giao diện</h3>
                    <button className={clsx(cx('close-modal'), 'zm-btn')} onClick={hanldCloseModal}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>

                    <div className={cx('modal-body')}>
                        {THEME_ITEMS.map((theme, index) => (
                            <ThemeOption key={index} data={theme} onSetOpenTheme={setOpenTheme} />
                        ))}
                    </div>
                </Modal>
            )}
        </>
    );
}

export default Header;
