import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import {
    Fan,
    Newspaper,
    Vinyl,
    MusicNoteList,
    Soundwave,
    Pencil,
    MusicNoteBeamed,
    Slack,
    Star,
    CameraVideo,
    Plus,
} from 'react-bootstrap-icons';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Sidebar.module.scss';
import NavbarItem from '~/components/layouts/components/NavbarItem';

const cx = classNames.bind(styles);

const srcIconImgs = {
    mySong: 'https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-song.cf0cb0b4.svg',
    myPlayList: 'https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-playlist.7e92a5f0.svg',
    myHistory: 'https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-history.374cb625.svg',
};

export default function Sidebar() {
    const sibarRef = useRef();
    const [expanded, setExpanded] = useState(false);

    const handleExpanedSidebar = () => {
        sibarRef.current.classList.toggle(cx('is-expanded'));
        setExpanded((prev) => !prev);
    };

    return (
        <div className={clsx(cx('wrraper', 'zm-sidebar'), 'sidebar-wrapper')} ref={sibarRef}>
            <div className={clsx(cx('logo'), 'hide-on-mobile')}>
                <div className={cx('logo__img')}></div>
            </div>

            <div className={cx('navbar')}>
                <nav className={cx('navbar-menu', 'mb-15')}>
                    <NavbarItem title="Cá nhân" Icon={Fan} to="/mymusic" isExpanded={expanded} />
                    <NavbarItem title="Khám phá" Icon={Vinyl} to="/" isExpanded={expanded} />
                    <NavbarItem title="#zingchart" Icon={MusicNoteList} to="/zing-chart" isExpanded={expanded} />
                    <NavbarItem title="Radio" Icon={Soundwave} liveLable={true} to="/radio" isExpanded={expanded} />
                    <NavbarItem title="Theo dõi" Icon={Newspaper} to="/mymusic" isExpanded={expanded} />
                </nav>

                <div className={clsx(cx('sidebar-devide'), 'hide-on-mobile')}></div>
                <div className={clsx(cx('sidebar-main'), 'hide-on-mobile')}>
                    <div className={cx('sidebar-scrollbar')}>
                        <nav className={cx('navbar-menu')}>
                            <NavbarItem title="Nhạc mới" Icon={MusicNoteBeamed} to="/mymusic" isExpanded={expanded} />
                            <NavbarItem title="Thể loại" Icon={Slack} to="/mymusic" isExpanded={expanded} />
                            <NavbarItem title="Top100" Icon={Star} to="/mymusic" isExpanded={expanded} />
                            <NavbarItem title="MV" Icon={CameraVideo} to="/mymusic" isExpanded={expanded} />
                        </nav>

                        <div className={cx('vip-baner-sidebar')}>
                            <span className={cx('text')}>Nghe nhạc không quảng cáo cùng kho nhạc VIP</span>
                            <div className={cx('button')}>Nâng cấp VIP</div>
                        </div>
                        <nav className={cx('navbar-menu', 'edit-option')}>
                            <div className={cx('title')}>
                                Thư viện
                                <Pencil size={16} />
                            </div>
                            <NavbarItem
                                title="Bài hát"
                                srcImgIcon={srcIconImgs.mySong}
                                to="/mymusic"
                                isExpanded={expanded}
                            />
                            <NavbarItem
                                title="Playlist"
                                srcImgIcon={srcIconImgs.myPlayList}
                                to="/mymusic"
                                isExpanded={expanded}
                            />
                            <NavbarItem
                                title="Gần đây"
                                srcImgIcon={srcIconImgs.myHistory}
                                to="/mymusic"
                                isExpanded={expanded}
                            />
                        </nav>
                    </div>
                </div>
                <div className={clsx(cx('create-playlist'), 'hide-on-mobile')}>
                    <button className={clsx(cx('btn-add'), 'sidebar___create-playlist--btn')}>
                        <Plus className={cx('add-icon')} />
                        <span>Tạo playlist mới</span>
                    </button>
                </div>
            </div>

            <button className={clsx(cx('btn-expanded'), 'zm-btn')} onClick={handleExpanedSidebar}>
                {expanded ? <FontAwesomeIcon icon={faAngleLeft} /> : <FontAwesomeIcon icon={faAngleRight} />}
            </button>
        </div>
    );
}
