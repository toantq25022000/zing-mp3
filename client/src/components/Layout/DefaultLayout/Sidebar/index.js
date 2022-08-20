import React from 'react';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import NavbarItem from '../../components/NavbarItem';

import {
    MusicPlayer,
    Vinyl,
    MusicNoteList,
    Soundwave,
    FileEarmarkSlides,
    Pencil,
    MusicNoteBeamed,
    Slack,
    Star,
    CameraVideo,
    Plus,
} from 'react-bootstrap-icons';
import clsx from 'clsx';

const cx = classNames.bind(styles);

export default function Sidebar() {
    const srcIconImgs = {
        mySong: 'https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-song.cf0cb0b4.svg',
        myPlayList: 'https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-playlist.7e92a5f0.svg',
        myHistory: 'https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-history.374cb625.svg',
    };
    return (
        <div className={clsx(cx('wrraper'), 'zm-sidebar')}>
            <div className={cx('logo')}>
                <img
                    src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
                    alt=""
                    className={cx('logo__img')}
                />
            </div>

            <div className={cx('navbar')}>
                <nav className={cx('navbar-menu', 'mb-15')}>
                    <NavbarItem title="Cá nhân" Icon={MusicPlayer} isActive={true} />
                    <NavbarItem title="Khám phá" Icon={Vinyl} />
                    <NavbarItem title="#zingchart" Icon={MusicNoteList} />
                    <NavbarItem title="Radio" Icon={Soundwave} liveLable={true} />
                    <NavbarItem title="Theo dõi" Icon={FileEarmarkSlides} />
                </nav>

                <div className={cx('sidebar-devide')}></div>
                <div className={cx('sidebar-main')}>
                    <div className={cx('sidebar-scrollbar')}>
                        <nav className={cx('navbar-menu')}>
                            <NavbarItem title="Nhạc mới" Icon={MusicNoteBeamed} />
                            <NavbarItem title="Thể loại" Icon={Slack} />
                            <NavbarItem title="Top100" Icon={Star} />
                            <NavbarItem title="MV" Icon={CameraVideo} />
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
                            <NavbarItem title="Bài hát" srcImgIcon={srcIconImgs.mySong} />
                            <NavbarItem title="Playlist" srcImgIcon={srcIconImgs.myPlayList} />
                            <NavbarItem title="Gần đây" srcImgIcon={srcIconImgs.myHistory} />
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
        </div>
    );
}
