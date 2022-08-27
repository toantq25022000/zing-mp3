import React, { useRef, useState } from 'react';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import NavbarItem from '../../components/NavbarItem';

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
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

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
        <div className={cx('wrraper', 'zm-sidebar')} ref={sibarRef}>
            <div className={cx('logo')}>
                <div className={cx('logo__img')}></div>
            </div>

            <div className={cx('navbar')}>
                <nav className={cx('navbar-menu', 'mb-15')}>
                    <NavbarItem title="Cá nhân" Icon={Fan} to="/mymusic" isExpanded={expanded} />
                    <NavbarItem title="Khám phá" Icon={Vinyl} to="/" isExpanded={expanded} />
                    <NavbarItem title="#zingchart" Icon={MusicNoteList} to="/mymusic" isExpanded={expanded} />
                    <NavbarItem title="Radio" Icon={Soundwave} liveLable={true} to="/mymusic" isExpanded={expanded} />
                    <NavbarItem title="Theo dõi" Icon={Newspaper} to="/mymusic" isExpanded={expanded} />
                </nav>

                <div className={cx('sidebar-devide')}></div>
                <div className={cx('sidebar-main')}>
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
                <div className={cx('create-playlist')}>
                    <button className={cx('btn-add')}>
                        <Plus className={cx('add-icon')} />
                        <span>Tạo playlist mới</span>
                    </button>
                </div>
            </div>

            <button className={clsx(cx('btn-expanded'), 'zm-btn')} onClick={handleExpanedSidebar}>
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
        </div>
    );
}
