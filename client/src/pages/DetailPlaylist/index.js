import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '~/utils/axios';
import classNames from 'classnames/bind';
import styles from './DetailPlaylist.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faHeart as faHeartSolid,
    faPause,
    faPlay,
    faSort,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import SongItem from '~/components/layouts/components/SongItem';
import { songSlice } from '~/redux/features/song/songSlice';
import { playlistSlice } from '~/redux/features/playlist/playlistSlice';
import { handlePlaySongRandom, setNumberToThounsandLike } from '~/utils/collectionFunctionConstants';

const cx = classNames.bind(styles);

function DetailPlaylist() {
    const { id } = useParams();
    const idPlaylist = id.toString().split('.')[0];

    const navigate = useNavigate();
    const songListRef = useRef();

    const playlists = useSelector((state) => state.playlist.playlists);
    const playlistId = useSelector((state) => state.playlist.playlistId);
    const songId = useSelector((state) => state.song.songId);
    const isRandom = useSelector((state) => state.song.isRandom);
    const currentIndexSong = useSelector((state) => state.song.currentIndexSong);
    const arrayIndexRandom = useSelector((state) => state.song.arrayIndexRandom);

    const isPlay = useSelector((state) => state.song.isPlay);
    const dispatch = useDispatch();

    const [playlistResult, setPlaylistResult] = useState({});

    useEffect(() => {
        const getPlaylist = async () => {
            try {
                const response = await instance.get(`/playlist/${idPlaylist}`);
                console.log(response.data);
                if (!response.data) {
                    navigate('/');
                    return;
                }
                setPlaylistResult(response.data);
            } catch (error) {
                navigate('/');
                console.log(error);
                return;
            }
        };
        getPlaylist();
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
    }, [songId]);

    const releaseDateUpdatePlaylist = (date) => {
        if (date) return date;
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
        return hours + ' giờ ' + (minutes > 10 ? '' : '0') + minutes + ' phút';
    };

    const getCurrentIndexSongOfPlaylist = (song) => {
        return playlists.indexOf(song);
    };

    const arrayPlaylistCanPlay = useMemo(() => {
        console.log('tinh toan lai lai ');
        return playlistResult?.song?.items?.filter((song) => song.streamingStatus === 1);
    }, [playlistResult]);

    const handleGetSong = (song) => {
        // if song is allowed , not for VIP
        if (song.streamingStatus === 1) {
            if (isRandom) dispatch(songSlice.actions.setIsRandom(false));
            if (songId === song.encodeId) {
                if (isPlay) {
                    dispatch(songSlice.actions.setIsPlay(false));
                } else {
                    dispatch(songSlice.actions.setIsPlay(true));
                }
            } else {
                dispatch(songSlice.actions.setSongId(song.encodeId));
                dispatch(songSlice.actions.setIsPlay(true));
                if (!(playlistId === idPlaylist && playlists?.length > 0)) {
                    dispatch(playlistSlice.actions.setPlaylists(arrayPlaylistCanPlay));
                    dispatch(playlistSlice.actions.setPlaylistId(idPlaylist));
                    dispatch(
                        playlistSlice.actions.setPlaylistInfo({
                            title: playlistResult.title,
                            link: playlistResult.link,
                        }),
                    );
                    console.log('dispatch playlists new');
                }
                dispatch(songSlice.actions.setCurrentIndexSong(getCurrentIndexSongOfPlaylist(song)));
            }
        }
    };

    const handlePlaySongPlaylist = () => {
        if (idPlaylist === playlistId) {
            dispatch(songSlice.actions.setIsPlay(!isPlay));
        }
        // phát ngẫu nhiên danh sách nhạc
        else {
            dispatch(songSlice.actions.setIsPlay(true));
            dispatch(songSlice.actions.setIsRandom(true));
            dispatch(playlistSlice.actions.setPlaylistId(idPlaylist));
            dispatch(playlistSlice.actions.setPlaylistInfo({ title: playlistResult.title, link: playlistResult.link }));
            dispatch(playlistSlice.actions.setPlaylists(arrayPlaylistCanPlay));
            handlePlaySongRandom(-1, arrayPlaylistCanPlay, [], dispatch, songSlice);
        }
    };

    return (
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
                                            <img src={playlistResult?.thumbnail || playlistResult?.thumbnailM} alt="" />
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
                                <h3 className={cx('title')}>{playlistResult?.title}</h3>
                                <div className={cx('release')}>
                                    Cập nhật: {releaseDateUpdatePlaylist(playlistResult?.releaseDate)}
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
                                    {setNumberToThounsandLike(playlistResult?.like)} người yêu thích
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
                                    onClick={handlePlaySongPlaylist}
                                >
                                    {playlistId === idPlaylist ? (
                                        isPlay ? (
                                            <FontAwesomeIcon icon={faPause} className={cx('icon')} />
                                        ) : (
                                            <FontAwesomeIcon icon={faPlay} className={cx('icon')} />
                                        )
                                    ) : (
                                        <FontAwesomeIcon icon={faPlay} className={cx('icon')} />
                                    )}

                                    <span>
                                        {playlistId === idPlaylist
                                            ? isPlay
                                                ? 'Tạm dừng'
                                                : 'Tiếp tục phát'
                                            : 'Phát ngẫu nhiên'}
                                    </span>
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
                            {playlistResult.sortDescription && (
                                <>
                                    <span>Lời tựa </span> {playlistResult.sortDescription}
                                </>
                            )}
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

                            <div className={cx('song-list')} ref={songListRef}>
                                {playlistResult?.song?.items?.map((song) => (
                                    <SongItem
                                        key={song.encodeId}
                                        data={song}
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
                    </div>
                </div>

                <div className={cx('artist-section')}></div>
            </div>
        </div>
    );
}

export default DetailPlaylist;
