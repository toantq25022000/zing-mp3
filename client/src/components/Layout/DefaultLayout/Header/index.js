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
//
import clsx from 'clsx';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { ThemeIcon } from '~/components/Layout/components/Icons';
import Search from '~/components/Layout/components/Search';
import Menu from '~/components/Popper/Menu';
import Modal from '~/components/Layout/Modal';
import ThemeOption from '~/components/Layout/components/ThemeOption';
import images from '~/assets/images';
import Image from '~/components/Layout/components/Image';
import { authSlice } from '~/redux/features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import instance from '~/utils/axios';
import { faVuejs } from '@fortawesome/free-brands-svg-icons';

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
                title: 'Lodon',
                image: images.LodonTheme,
                bgLayout: images.LodonLayout,
                dataTheme: 'blue',
                styleHtml: '--layout-bg: #061d50;',
                isCheck: false,
            },
            {
                title: 'Sáng tối',
                image: images.LightDarkTheme,
                dataTheme: 'dark',
                isCheck: true,
            },
            {
                title: 'Xanh Da Trời',
                image: images.BlueTheme,
                dataTheme: 'blue',
                isCheck: false,
            },
            {
                title: 'Hồng',
                image: images.PinkTheme,
                dataTheme: 'pink-light',
                isCheck: false,
            },
            {
                title: 'Nâu',
                image: images.BrownTheme,
                dataTheme: 'brown',
                isCheck: false,
            },
        ],
    },
    {
        title: 'Chủ Đề',
        items: [
            {
                title: 'XNON',
                image: images.XoneTheme,
                bgLayout: images.XoneLayout,
                dataTheme: 'dark',
                styleHtml: '--purple-primary: #d7cb1f;--progressbar-active-bg: #d7cb1f;--link-text-hover: #d7cb1f;',
                isCheck: false,
            },
            {
                title: 'Zing Music Awards',
                image: images.ZMATheme,
                bgLayout: images.ZMALayout,
                dataTheme: 'blue',
                styleHtml:
                    '--layout-bg: #37075d;--primary-bg: #6a39af;--queue-player-popup-bg: #5d218c;--purple-primary: #ed2b91;--link-text-hover: #fe63da;--sidebar-popup-bg: #572f90;--linear-gradient-bg: linear-gradient(to bottom, #740091, #2d1a4c);',
                isCheck: false,
            },
            {
                title: 'Tháp Eiffel',
                image: images.EiffelTheme,
                bgLayout: images.EiffelLayout,
                dataTheme: 'dark',
                styleHtml: '--layout-bg: #282828;--primary-bg: #3d3d3d;',
                isCheck: false,
            },
        ],
    },
    {
        title: 'Nghệ Sĩ',
        items: [
            {
                title: 'Jack',
                image: images.JackTheme,
                bgLayout: images.JackLayout,
                dataTheme: 'brown',
                styleHtml:
                    '--layout-bg:#767269; --primary-bg:#565147; --queue-player-popup-bg:#726c5e; --purple-primary:#ac8e77; --main-box-shadow:#4242421a; --linear-gradient-bg:linear-gradient(to bottom, #656156, #574f40);',
                isCheck: false,
            },
            {
                title: 'IU',
                image: images.IUTheme,
                bgLayout: images.IULayout,
                dataTheme: 'gray',
                styleHtml: '--layout-bg:#e7dfdd; --purple-primary:#409abc; --text-item-hover:#409abc;',
                isCheck: false,
            },
            {
                title: 'Ji Chang Wook',
                image: images.JiChangWookTheme,
                bgLayout: images.JiChangWookLayout,
                dataTheme: 'green-light',
                styleHtml: '--layout-bg:#b2d8db;',
                isCheck: false,
            },
            {
                title: 'Lisa',
                image: images.LisaTheme,
                bgLayout: images.LisaLayout,
                dataTheme: 'pink-light',
                styleHtml: '--layout-bg:#b2d8db;',
                isCheck: false,
            },
            {
                title: 'Jennie Kim',
                image: images.JennieTheme,
                bgLayout: images.JennieLayout,
                dataTheme: 'gray',
                styleHtml:
                    '--layout-bg:#bab8c3; --player-bg:#c6c4d1; --purple-primary:#346875; --primary-bg:#e2e7f5; --text-item-hover:#2a5e6b;',
                isCheck: false,
            },
            {
                title: 'Jisoo',
                image: images.JisooTheme,
                bgLayout: images.JisooLayout,
                dataTheme: 'light',
                styleHtml: null,
                isCheck: false,
            },
            {
                title: 'Rosé',
                image: images.RoseTheme,
                bgLayout: images.RoseLayout,
                dataTheme: 'blue',
                styleHtml: '--layout-bg:#061d50;',
                isCheck: false,
            },
        ],
    },
    {
        title: 'Màu Tối',
        items: [
            {
                title: 'Tối',
                image: images.DarkTheme,
                dataTheme: 'dark',
                isCheck: false,
            },
            {
                title: 'Tím',
                image: images.PurpleTheme,
                dataTheme: 'purple',
                isCheck: false,
            },
            {
                title: 'Xanh Đậm',
                image: images.BlueTheme,
                dataTheme: 'blue',
                isCheck: false,
            },
            {
                title: 'Xanh Biển',
                image: images.BlueLightTheme,
                dataTheme: 'blue-light',
                isCheck: false,
            },
            {
                title: 'Xanh Lá',
                image: images.GreenTheme,
                dataTheme: 'green',
                isCheck: false,
            },
            {
                title: 'Nâu',
                image: images.BrownTheme,
                dataTheme: 'brown',
                isCheck: false,
            },
            {
                title: 'Hồng',
                image: images.PinkTheme,
                dataTheme: 'pink',
                isCheck: false,
            },
            {
                title: 'Đỏ',
                image: images.RedTheme,
                dataTheme: 'red',
                isCheck: false,
            },
        ],
    },
    {
        title: 'Màu Sáng',
        items: [
            {
                title: 'Sáng',
                image: images.LightTheme,
                dataTheme: 'light',
                isCheck: false,
            },
            {
                title: 'Xám',
                image: images.GrayTheme,
                dataTheme: 'gray',
                isCheck: false,
            },
            {
                title: 'Xanh Nhạt',
                image: images.GreenLightTheme,
                dataTheme: 'green-light',
                isCheck: false,
            },
            {
                title: 'Hồng Cánh Sen',
                image: images.PinkLightTheme,
                dataTheme: 'pink-light',
                isCheck: false,
            },
        ],
    },
];

function Header() {
    const [openTheme, setOpenTheme] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);

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
        setOpenTheme((prev) => !prev);
    };

    const hanldCloseModal = () => {
        setOpenTheme(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('inner__left')}>
                    <ArrowLeft className={clsx('zm-btn', cx('button'))} />
                    <ArrowRight className={clsx('zm-btn', 'disabled', cx('button'))} />

                    <Search />
                </div>
                <div className={cx('inner__right')}>
                    <Tippy content="Chủ đề">
                        <div className={cx('setting')}>
                            <button className={clsx(cx('icon', 'size'), 'zm-btn')} onClick={handleOpenModalSetting}>
                                <ThemeIcon />
                            </button>

                            {openTheme && (
                                <Modal className={cx('content-theme')} onClickOverLay={hanldCloseModal}>
                                    <h3 className={cx('heading')}>Giao diện</h3>
                                    <button className={clsx(cx('close-modal'), 'zm-btn')} onClick={hanldCloseModal}>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>

                                    <div className={cx('modal-body')}>
                                        {THEME_ITEMS.map((theme, index) => (
                                            <ThemeOption key={index} data={theme} />
                                        ))}
                                    </div>
                                </Modal>
                            )}
                        </div>
                    </Tippy>

                    <Tippy content="Nâng cấp VIP">
                        <div className={cx('setting')}>
                            {/* <button className={clsx(cx('icon'), 'zm-btn')}>
                                <div className={cx('box-wrap')}>
                                    <span className={cx('text')}>VIP</span>
                                </div>
                            </button> */}
                            <button className={clsx(cx('icon', 'size'), 'zm-btn')}>
                                <FontAwesomeIcon icon={faVuejs} />
                            </button>
                        </div>
                    </Tippy>

                    <Tippy content="Tải lên">
                        <div className={cx('setting')}>
                            <button className={clsx(cx('icon', 'size'), 'zm-btn')}>
                                <Upload />
                            </button>
                        </div>
                    </Tippy>
                    <Menu items={SETTING_ITEMS} placement="bottom-end" trigger="click" className={cx('menu-list')}>
                        <Tippy content="Cài đặt">
                            <div className={cx('setting')}>
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
    );
}

export default Header;
