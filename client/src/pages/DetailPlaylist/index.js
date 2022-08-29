import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '~/utils/axios';
import classNames from 'classnames/bind';
import styles from './DetailPlaylist.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faHeart as faHeartSolid, faPlay, faSort } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import SongItem from '~/components/layouts/components/SongItem';

const cx = classNames.bind(styles);

function DetailPlaylist() {
    const { id } = useParams();
    const idPlaylist = id.toString().split('.')[0];

    const [isPlayingPlaylist, setIsPlayingPlaylist] = useState(false);
    const [playlistResult, setPlaylistResult] = useState(null);

    useEffect(() => {
        const getPlaylist = async () => {
            try {
                const response = await instance.get(`/playlist/${idPlaylist}`);
                setPlaylistResult(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getPlaylist();
    }, [idPlaylist]);

    const handleChangePlayingPlaylist = () => {
        setIsPlayingPlaylist((prev) => !prev);
    };

    const releaseDateUpdatePlaylist = (date) => {
        if (date) return date;
        const d = new Date();
        const mm = d.getMonth() + 1;
        const dd = d.getDate();
        const yy = d.getFullYear();
        return dd + '/' + mm + '/' + yy;
    };

    const setNumberToThounsandLike = (number) => {
        if (number < 1000) return number;
        return Math.floor(number / 1000) + 'K';
    };

    const getSumDurationPlaylist = () => {
        const sumDurationSeconds = playlistResult.song.items.reduce((prev, current) => current.duration + prev, 0);
        const durationMinutes = sumDurationSeconds / 60;
        const hours = Math.floor(durationMinutes / 60);
        const minutes = (durationMinutes % 60).toFixed(0);
        return hours + ' giờ ' + (minutes > 10 ? '' : '0') + minutes + ' phút';
    };

    return (
        <div className={clsx(cx('wrapper'), 'pt-20')}>
            <div className={cx('container')}>
                {playlistResult && (
                    <div className={clsx(cx('inner'), 'mb-30', 'clearfix')}>
                        <div className={clsx(cx('playlist-header', 'sticky'), 'media')}>
                            <div className={cx('media-left')}>
                                <div className={cx('header-thumbnail')}>
                                    <div className={cx('card-image')}>
                                        <div
                                            className={cx(
                                                'thumb',
                                                isPlayingPlaylist ? 'thumb-rotate' : 'thumb-rotate-off',
                                            )}
                                        >
                                            <figure>
                                                <img
                                                    src={playlistResult.thumbnail || playlistResult.thumbnailM}
                                                    alt=""
                                                />
                                            </figure>
                                            <div className={cx('opacity')}></div>
                                        </div>
                                        <div className={cx('actions-container')}>
                                            <div className={clsx(cx('playlist-actions'), 'zm-action')}>
                                                <button
                                                    className={clsx(cx('action-play'), 'zm-btn')}
                                                    onClick={handleChangePlayingPlaylist}
                                                >
                                                    <span
                                                        className={cx(
                                                            isPlayingPlaylist ? 'icon-play-gif' : 'icon-play-circle',
                                                        )}
                                                    ></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('media-content')}>
                                <div className={cx('content-top')}>
                                    <h3 className={cx('title')}>{playlistResult.title}</h3>
                                    <div className={cx('release')}>
                                        Cập nhật: {releaseDateUpdatePlaylist(playlistResult.releaseDate)}
                                    </div>
                                    <div className={cx('artists')}>
                                        {playlistResult.artists &&
                                            playlistResult.artists
                                                .map((artist) => (
                                                    <a key={artist.id} href="/" className={cx('is-ghost')}>
                                                        {artist.name}
                                                    </a>
                                                ))
                                                .reduce((prev, current) => [prev, ', ', current])}
                                    </div>
                                    <div className={cx('like')}>
                                        {setNumberToThounsandLike(playlistResult.like)} người yêu thích
                                    </div>
                                </div>
                                <div className={cx('actions')}>
                                    <button
                                        className={clsx(
                                            cx('btn-play-all'),
                                            'zm-btn',
                                            'is-outlined',
                                            'is-active',
                                            'is-medium ',
                                            'is-upper',
                                        )}
                                    >
                                        <FontAwesomeIcon icon={faPlay} className={cx('icon')} />
                                        <span>Tiếp tục hát</span>
                                    </button>
                                    <div className={clsx(cx('level-wrap'), 'level')}>
                                        <Tippy content="Thêm vào thư viện">
                                            <button className={clsx(cx('tooltip-btn'), 'zm-btn')}>
                                                <FontAwesomeIcon icon={faHeartRegular} />
                                            </button>
                                        </Tippy>
                                        <Tippy content="Khác">
                                            <button className={clsx(cx('tooltip-btn'), 'zm-btn')}>
                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                            </button>
                                        </Tippy>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('playlist-content')}>
                            <div className={cx('description')}>
                                <span>Lời tựa </span>
                                {playlistResult.sortDescription}
                            </div>
                            <div className={clsx(cx('song-list-select'), 'mb-10')}>
                                <div className={clsx(cx('select-header'), 'media')}>
                                    <div className={cx('zm-media-left')}>
                                        <div className={cx('sort-wrapper')}>
                                            <div className={clsx(cx('group-dropdown'), 'mr-10')}>
                                                <div className={cx('dropdown-trigger')}>
                                                    <button className={clsx(cx('btn-sort'), 'zm-btn')}>
                                                        <FontAwesomeIcon icon={faSort} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={cx('column-text')}>Bài hát</div>
                                        </div>
                                    </div>
                                    <div className={cx('zm-media-content')}>
                                        <div className={clsx(cx('column-text'), 'ml-10')}>Album</div>
                                    </div>
                                    <div className={cx('zm-media-right')}>
                                        <div className={cx('column-text')}>Thời gian</div>
                                    </div>
                                </div>

                                <div className={cx('song-list')}>
                                    {playlistResult.song.items?.map((song) => (
                                        <SongItem key={song.encodeId} data={song} />
                                    ))}
                                </div>
                            </div>
                            <h3 className={cx('bottom-info')}>
                                <span>{playlistResult.song.items.length} bài hát</span>•
                                <span>{getSumDurationPlaylist()}</span>
                            </h3>
                        </div>
                    </div>
                )}

                <div className={cx('artist-section')}></div>
            </div>
        </div>
    );
}

export default DetailPlaylist;
