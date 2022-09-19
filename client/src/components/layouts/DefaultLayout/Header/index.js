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
import { ThemeIcon } from '~/components/layouts/components/Icons';
import Search from '~/components/layouts/components/Search';
import Menu from '~/components/Popper/Menu';
import Modal from '~/components/layouts/Modal';
import ThemeOption from '~/components/layouts/components/ThemeOption';
import Image from '~/components/layouts/components/Image';
import { authSlice } from '~/redux/features/auth/authSlice';
import { handleSetThemeWebsite } from '~/utils/collectionFunctionConstants';
import instance from '~/utils/axios';
import { userConfigSlice } from '~/redux/features/userConfig/userConfigSlice';

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

function Header({ headerRef }) {
    const [openTheme, setOpenTheme] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { theme } = useSelector((state) => state.userConfig.theme);
    const config = useSelector((state) => state.userConfig.config);

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

    useEffect(() => {
        const getConfig = async () => {
            try {
                const res = await instance.get('/config');
                dispatch(userConfigSlice.actions.setConfigTheme(res.data));
            } catch (error) {
                console.log(error);
            }
        };

        getConfig();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    <h3 className={cx('heading')}>{config?.theme?.title}</h3>
                    <button className={clsx(cx('close-modal'), 'zm-btn')} onClick={hanldCloseModal}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>

                    <div className={cx('modal-body')}>
                        {config?.theme?.sections?.map((theme, index) => (
                            <ThemeOption key={index} data={theme} onSetOpenTheme={setOpenTheme} />
                        ))}
                    </div>
                </Modal>
            )}
        </>
    );
}

export default Header;
