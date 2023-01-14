import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import instance from '~/utils/axios';
import classNames from 'classnames/bind';
import styles from './DetailPlaylist.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPause, faPlay, faSort } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import SongItem from '~/components/SongItem';
import { songSlice } from '~/redux/features/song/songSlice';
import { playlistSlice } from '~/redux/features/playlist/playlistSlice';
import {
    arrayPlaylistCanPlay,
    handleGetSongAndPlaySongInPlayList,
    handlePlaySongRandom,
    setNumberToThounsandLike,
} from '~/utils/collectionFunctionConstants';
import Carousel from '~/components/layouts/components/Carousel';
import Button from '~/components/Button';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import DetailPlaylistSkeleton from './DetailPlaylistSkeleton';

const cx = classNames.bind(styles);

function DetailPlaylist() {
    const { id } = useParams();
    const idPlaylist = id.toString().split('.')[0];

    const navigate = useNavigate();

    const playlists = useSelector((state) => state.playlist.playlists);
    const playlistId = useSelector((state) => state.playlist.playlistId);
    const songId = useSelector((state) => state.song.songId);
    const isRandom = useSelector((state) => state.song.isRandom);

    const isPlay = useSelector((state) => state.song.isPlay);
    const dispatch = useDispatch();

    const [playlistResult, setPlaylistResult] = useState({});
    const [suggestPlaylists, setSuggestPlaylists] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getPlaylist = async () => {
            try {
                const response = await instance.get(`/playlist?id=${idPlaylist}`);

                if (!response.data) {
                    navigate('/');
                    return;
                }
                setPlaylistResult(response.data);
                const pathNameURL = window.location.pathname;
                if (pathNameURL !== response.data.link) {
                    window.history.pushState({}, null, response.data.link);
                }
                setIsLoading(false);
            } catch (error) {
                navigate('/');
                console.log(error);
                return;
            }
        };

        const getSuggestedPlaylists = () => {
            instance
                .get(`/suggested-playlist?id=${idPlaylist}`)
                .then((res) => {
                    const data = res.data.filter((item) => item.viewType === 'slider');
                    setSuggestPlaylists(data);
                })
                .catch((error) => console.log(error));
        };
        getPlaylist();
        getSuggestedPlaylists();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idPlaylist]);

    useEffect(() => {
        if (idPlaylist === playlistId) {
            const scrollIntoViewSong = (ref) => {
                ref.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            };
            if (document.getElementById(songId)) {
                scrollIntoViewSong(document.getElementById(songId));
            }
        } else {
            window.scrollTo(0, 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [songId]);

    const releaseDateUpdatePlaylist = (date) => {
        if (date) {
            if (date.includes('/')) {
                return date;
            } else {
                const dd = date.slice(0, 2);
                const mm = date.slice(2, 4);
                const yy = date.slice(4);
                return dd + '/' + mm + '/' + yy;
            }
        }
        const d = new Date();
        const mm = d.getMonth() + 1;
        const dd = d.getDate();
        const yy = d.getFullYear();
        return dd + '/' + mm + '/' + yy;
    };

    const getSumDurationPlaylist = () => {
        if (!playlistResult.song) return '';
        const sumDurationSeconds = playlistResult?.song?.items.reduce((prev, current) => current.duration + prev, 0);
        const durationMinutes = sumDurationSeconds / 60;
        const hours = Math.floor(durationMinutes / 60);
        const minutes = (durationMinutes % 60).toFixed(0);
        const fixHours = hours === 0 ? '' : hours + ' giờ ';
        return fixHours + (minutes >= 10 ? '' : '0') + minutes + ' phút';
    };

    const handleGetSong = (song) => {
        handleGetSongAndPlaySongInPlayList({
            song,
            isRandom,
            isPlay,
            songId,
            playlistId,
            idPlaylist,
            playlists,
            playlistResult,
            songSlice,
            playlistSlice,
            dispatch,
        });
    };

    const handlePlaySongPlaylist = () => {
        if (idPlaylist === playlistId) {
            dispatch(songSlice.actions.setIsPlay(!isPlay));
        }
        // phát ngẫu nhiên danh sách nhạc
        else {
            dispatch(songSlice.actions.setIsRandom(true));
            dispatch(playlistSlice.actions.setPlaylistId(idPlaylist));
            dispatch(playlistSlice.actions.setPlaylistInfo({ title: playlistResult.title, link: playlistResult.link }));
            dispatch(playlistSlice.actions.setPlaylists(arrayPlaylistCanPlay(playlistResult)));
            handlePlaySongRandom(-1, arrayPlaylistCanPlay(playlistResult), [], dispatch, songSlice);

            setTimeout(() => {
                dispatch(songSlice.actions.setIsPlay(true));
            }, 200);
        }
    };

    return (
        <>
            {isLoading && <DetailPlaylistSkeleton />}
            {!isLoading && (
                <div className={clsx(cx('wrapper'), 'pt-20')}>
                    <div className={cx('container')}>
                        <div className={clsx(cx('inner'), 'mb-30', 'clearfix')}>
                            <div className={clsx(cx('playlist-header', 'sticky'), 'media')}>
                                <div className={cx('media-left')}>
                                    <div
                                        className={cx('header-thumbnail', {
                                            isPlaying: isPlay ? (idPlaylist === playlistId ? true : false) : false,
                                        })}
                                    >
                                        <div className={cx('card-image')}>
                                            <div
                                                className={cx(
                                                    'thumb',
                                                    isPlay
                                                        ? idPlaylist === playlistId
                                                            ? 'thumb-rotate'
                                                            : 'thumb-rotate-off'
                                                        : 'thumb-rotate-off',
                                                )}
                                            >
                                                <figure>
                                                    <img
                                                        src={playlistResult.thumbnailM || playlistResult.thumbnail}
                                                        alt=""
                                                    />
                                                </figure>
                                                <div className={cx('opacity')}></div>
                                            </div>
                                            <div className={cx('actions-container')}>
                                                <div className={clsx(cx('playlist-actions'), 'zm-action')}>
                                                    <button
                                                        className={clsx(cx('action-play'), 'zm-btn')}
                                                        onClick={handlePlaySongPlaylist}
                                                    >
                                                        <span
                                                            className={cx(
                                                                isPlay
                                                                    ? idPlaylist === playlistId
                                                                        ? 'icon-play-gif'
                                                                        : 'icon-play-circle'
                                                                    : 'icon-play-circle',
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
                                            {playlistResult.artists ? (
                                                playlistResult.artists
                                                    .map((artist) => (
                                                        <Link
                                                            to={artist.link}
                                                            key={artist.id}
                                                            className={cx('is-ghost')}
                                                        >
                                                            {artist.name}
                                                        </Link>
                                                    ))
                                                    .reduce((prev, current) => [prev, ', ', current])
                                            ) : (
                                                <Skeleton width={200} height={10} />
                                            )}
                                        </div>
                                        <div className={cx('like')}>
                                            {setNumberToThounsandLike(playlistResult.like)} người yêu thích
                                        </div>
                                    </div>

                                    <div className={cx('actions')}>
                                        <Button
                                            className={cx('btn-play-all')}
                                            rounded
                                            outlined
                                            active
                                            upper
                                            leftIcon={
                                                <FontAwesomeIcon
                                                    icon={
                                                        playlistId === idPlaylist ? (isPlay ? faPause : faPlay) : faPlay
                                                    }
                                                />
                                            }
                                            onClick={handlePlaySongPlaylist}
                                        >
                                            {playlistId === idPlaylist
                                                ? isPlay
                                                    ? 'Tạm dừng'
                                                    : 'Tiếp tục phát'
                                                : 'Phát ngẫu nhiên'}
                                        </Button>

                                        <div className={clsx(cx('level-wrap'), 'level')}>
                                            <Tippy content="Thêm vào thư viện">
                                                <Button
                                                    className={cx('tooltip-btn')}
                                                    rounded
                                                    tooltip
                                                    leftIcon={<FontAwesomeIcon icon={faHeartRegular} />}
                                                ></Button>
                                            </Tippy>
                                            <Tippy content="Khác">
                                                <Button
                                                    className={clsx(cx('tooltip-btn'), 'ml-10')}
                                                    rounded
                                                    tooltip
                                                    leftIcon={<FontAwesomeIcon icon={faEllipsisVertical} />}
                                                ></Button>
                                            </Tippy>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('playlist-content')}>
                                <div className={cx('description')}>
                                    <span>Lời tựa </span> {playlistResult?.sortDescription}
                                </div>
                                <div className={clsx(cx('song-list-select'), 'mb-10')}>
                                    <div
                                        className={clsx(
                                            cx('box-header', { 'select-header': playlistResult.isAlbum }),
                                            'media',
                                        )}
                                    >
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
                                        {playlistResult?.song?.items?.map((song) => (
                                            <SongItem
                                                key={song.encodeId}
                                                data={song}
                                                isAlbum={playlistResult.isAlbum}
                                                onDoubleClickSong={() => handleGetSong(song)}
                                                onPlayOrPauseSong={() => handleGetSong(song)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <h3 className={cx('bottom-info')}>
                                    <span>{playlistResult?.song?.items.length} bài hát</span>•
                                    <span>{getSumDurationPlaylist()}</span>
                                </h3>

                                {playlistResult?.sections?.map((section, index) => (
                                    <div className={cx('container-section', 'channel-section')} key={index}>
                                        <h3 className={cx('channel-title')}>{section.title}</h3>
                                        <div className={cx('song-list')}>
                                            {section?.items?.map((song) => (
                                                <SongItem
                                                    key={song.encodeId}
                                                    data={song}
                                                    isAlbum={false}
                                                    onDoubleClickSong={() => handleGetSong(song)}
                                                    onPlayOrPauseSong={() => handleGetSong(song)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {suggestPlaylists &&
                            suggestPlaylists.map((section, index) => <Carousel key={index} dataSection={section} />)}

                        <div className={cx('artist-section')}></div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DetailPlaylist;
