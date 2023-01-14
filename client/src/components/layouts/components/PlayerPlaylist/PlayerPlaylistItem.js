import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { songSlice } from '~/redux/features/song/songSlice';
import { handlePlaySongFn } from '~/utils/collectionFunctionConstants';
import styles from './PlayerPlaylist.module.scss';

const cx = classNames.bind(styles);

function PlayerPlaylistItem({ data, indexSong }) {
    const songId = useSelector((state) => state.song.songId);
    const isRandom = useSelector((state) => state.song.isRandom);
    const isPlay = useSelector((state) => state.song.isPlay);
    const currentIndexSong = useSelector((state) => state.song.currentIndexSong);
    const playlists = useSelector((state) => state.playlist.playlists);
    const playlistInfo = useSelector((state) => state.playlist.playlistInfo);

    const dispatch = useDispatch();

    const handlePlaySong = (song) => {
        handlePlaySongFn(song, songId, isRandom, isPlay, playlists, songSlice, dispatch);
    };

    return (
        data && (
            <div>
                <div className={cx('playler-queue__item', 'full-left')}>
                    <div
                        className={cx('media', {
                            'is-active': songId === data.encodeId,
                            'is-previous': indexSong < currentIndexSong,
                        })}
                    >
                        <div className={cx('media-left')}>
                            <div className={cx('song-thumb')}>
                                <figure>
                                    <img src={data.thumbnail || data.thumbnailM} alt="" />
                                </figure>
                                <div className={clsx(cx('opacity'), 'opacity')}></div>
                                <div className={cx('actions-container')} onClick={() => handlePlaySong(data)}>
                                    <div className={clsx(cx('box-actions'), 'zm-action')}>
                                        <button className={clsx(cx('tooltip-btn'), 'zm-btn')}>
                                            {isPlay ? (
                                                data.encodeId === songId ? (
                                                    <span className={cx('icon-play-gif')}></span>
                                                ) : (
                                                    <FontAwesomeIcon icon={faPlay} className={cx('icon')} />
                                                )
                                            ) : (
                                                <FontAwesomeIcon icon={faPlay} className={cx('icon')} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('card-info')}>
                                <div className={cx('title-wrapper')}>
                                    <span className={cx('title')}>{data.title}</span>
                                </div>
                                <h4 className={cx('subtitle')}>
                                    {data?.artists
                                        ?.map((artist) => (
                                            <a href="/" className={cx('is-ghost')} key={artist.id}>
                                                {artist.name}
                                            </a>
                                        ))
                                        .reduce((prev, current) => [prev, ', ', current])}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                {songId === data.encodeId && (
                    <div className={cx('next-songs')}>
                        <h3 className={cx('title')}>Tiếp theo</h3>
                        <h4 className={cx('subtitle')}>
                            <span>Từ playlist</span>
                            <Link to={playlistInfo.link}>{playlistInfo.title}</Link>
                        </h4>
                    </div>
                )}
            </div>
        )
    );
}

export default PlayerPlaylistItem;
