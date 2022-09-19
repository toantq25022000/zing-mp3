import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { songSlice } from '~/redux/features/song/songSlice';
import { getCurrentIndexSongOfPlaylist, handleClickToStopPropagation } from '~/utils/collectionFunctionConstants';
import styles from './PlayerPlaylist.module.scss';
import PlayerPlaylistItem from './PlayerPlaylistItem';

const cx = classNames.bind(styles);

function PlayerPlaylist() {
    const playlists = useSelector((state) => state.playlist.playlists);
    const currentIndexSong = useSelector((state) => state.song.currentIndexSong);
    const songInfo = useSelector((state) => state.song.songInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        const indexCurrentSong = getCurrentIndexSongOfPlaylist(playlists, songInfo);
        if (indexCurrentSong !== currentIndexSong) {
            dispatch(songSlice.actions.setCurrentIndexSong(indexCurrentSong));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div className={cx('wrapper')} onClick={handleClickToStopPropagation}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <div className={cx('tab-bars', 'level')}>
                        <div className={cx('level-left')}>
                            <div className={cx('level-item', 'is-active')}>
                                <h6 className={cx('tab-title')}>Danh sách phát</h6>
                            </div>
                            <div className={cx('level-item')}>
                                <h6 className={cx('tab-title')}>Nghe gần đây</h6>
                            </div>
                        </div>
                        <div className={cx('level-right')}>
                            <div className={cx('level')}>
                                <div className={cx('level-item')}>
                                    <button className={clsx(cx('tooltip-btn'), 'zm-btn')}>
                                        <FontAwesomeIcon icon={faClock} className={cx('icon')} />
                                    </button>
                                </div>
                                <div className={cx('level-item')}>
                                    <button className={clsx(cx('tooltip-btn'), 'zm-btn')}>
                                        <FontAwesomeIcon icon={faEllipsis} className={cx('icon')} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body-scroll')}>
                        <div className={cx('body-content')}>
                            <div className={cx('playler-queue__list')}>
                                {playlists &&
                                    playlists.map((song, index) => (
                                        <PlayerPlaylistItem data={song} indexSong={index} key={song.encodeId} />
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerPlaylist;
