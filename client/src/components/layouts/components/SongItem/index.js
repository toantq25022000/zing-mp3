import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react';
import TippyHandless from '@tippyjs/react/headless';
import clsx from 'clsx';
import classNames from 'classnames/bind';
import styles from './SongItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMusic, faHeart as faHeartSolid, faEllipsis, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

import { secondsToTime } from '~/utils/collectionFunctionConstants';
import { KaraokeIcon } from '../Icons';
import ArtistCard from '../ArtistCard';
import instance from '~/utils/axios';
import { artistSlice } from '~/redux/features/artist/artistSlice';

const cx = classNames.bind(styles);

function SongItem({ data, isAlbum, onDoubleClickSong, onPlayOrPauseSong }) {
    //state
    //const
    const isSongVip = data.streamingStatus === 2;
    const dispatch = useDispatch();
    //selector

    const isPlay = useSelector((state) => state.song.isPlay);
    const songId = useSelector((state) => state.song.songId);
    const artistListInfo = useSelector((state) => state.artist.artistListInfo);

    //handle event
    const checkExistCardInfoArtist = (artist) => {
        const findArtistInList = artistListInfo?.find((item) => item.id === artist.id);
        return findArtistInList;
    };

    const handleFetchInfoArtist = (artist) => {
        const resultCheck = checkExistCardInfoArtist(artist);

        //if not exsist artist in list => call api
        if (!resultCheck) {
            try {
                instance.get(`/card-info?alias=${artist.alias}`).then((response) => {
                    dispatch(artistSlice.actions.setArtistListInfo([...artistListInfo, response.data]));
                    dispatch(artistSlice.actions.setArtistCardInfo(response.data));
                });
            } catch (error) {
                console.log(error);
            }
        }
        // else: exist artist => get info artist
        else {
            dispatch(artistSlice.actions.setArtistCardInfo(resultCheck));
        }
    };

    //delete data artistCardInfo old from store
    const handleHiddenTippyInfo = () => {
        dispatch(artistSlice.actions.setArtistCardInfo(null));
    };

    const handlePlayOrPauseSong = (e) => {
        e.stopPropagation();
        onPlayOrPauseSong();
    };

    return (
        <div className={cx('wrapper')} onDoubleClick={onDoubleClickSong} id={data.encodeId}>
            <div
                className={clsx(
                    cx('container', {
                        isActiveSong: data.encodeId === songId ? true : false,
                        'is-vip': isSongVip,
                        'full-left': isAlbum,
                    }),
                    'bor-b-1',
                )}
            >
                <div className={clsx(cx('body'), 'media')}>
                    <div className={cx('body-left')}>
                        <div className={clsx(cx('song-prefix'), 'mr-10')}>
                            <span className={cx('song-icon')}>
                                <FontAwesomeIcon icon={faMusic} />
                            </span>
                        </div>
                        <div className={cx('song-thumb')}>
                            <figure className="is-40x40 ">
                                <img src={data.thumnail || data.thumbnailM} alt="" />
                            </figure>
                            <div className={clsx(cx('opacity-bg'), 'opacity')}></div>
                            <div className={cx('actions-container')} onClick={onPlayOrPauseSong}>
                                <div className={clsx(cx('box-actions'), 'zm-action')}>
                                    <button className={clsx(cx('btn-play'), 'zm-btn')} onClick={handlePlayOrPauseSong}>
                                        {isPlay ? (
                                            data.encodeId === songId ? (
                                                <span className={cx('icon-play-gif')}></span>
                                            ) : (
                                                <FontAwesomeIcon icon={faPlay} className={cx('icon-play-circle')} />
                                            )
                                        ) : (
                                            <FontAwesomeIcon icon={faPlay} className={cx('icon-play-circle')} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('card-info')}>
                            <div className={cx('title-wrapper')}>
                                <span className={cx('title')}>{data.title}</span>
                                {isSongVip && <i className={cx('icon-vip-label')}></i>}
                            </div>
                            <div className={cx('subtitle')}>
                                {data.artists
                                    ?.map((artist, index) => (
                                        <span key={index}>
                                            <TippyHandless
                                                interactive={true}
                                                placement="bottom-start"
                                                onTrigger={() => handleFetchInfoArtist(artist)}
                                                onHidden={handleHiddenTippyInfo}
                                                render={(attrs) => (
                                                    <div className={cx('box-card-info')} tabIndex="-1" {...attrs}>
                                                        <ArtistCard />
                                                    </div>
                                                )}
                                            >
                                                <a href="/" className={cx('is-ghost')}>
                                                    {artist.name}
                                                </a>
                                            </TippyHandless>
                                        </span>
                                    ))
                                    .reduce((prev, current) => [prev, ', ', current])}
                            </div>
                        </div>
                    </div>
                    {!isAlbum && (
                        <Link className={cx('body-content')} to="/album">
                            <div className={cx('album-info')}>
                                <span className={cx('album-name')}>{data?.album?.title}</span>
                            </div>
                        </Link>
                    )}
                    <div className={cx('body-right')}>
                        <div className={cx('hover-items')}>
                            <div className="level">
                                <div className={cx('level-item')}>
                                    <Tippy content="Phát cùng lời bài hát">
                                        <button
                                            className={clsx(cx('icon-hv', 'icon-width'), 'is-hover-circle', 'zm-btn')}
                                        >
                                            <KaraokeIcon className={cx('icon-hover')} />
                                        </button>
                                    </Tippy>
                                </div>

                                <div className={cx('level-item')}>
                                    <Tippy content="Thêm vào thư viện">
                                        <button
                                            className={clsx(
                                                cx('animation-like', 'icon-width'),
                                                'is-hover-circle',
                                                'zm-btn',
                                            )}
                                        >
                                            <span className={cx('icon', 'is-like')}>
                                                <FontAwesomeIcon icon={faHeartRegular} className={cx('icon-hover')} />
                                            </span>
                                            <span className={cx('icon', 'is-like-full')}>
                                                <FontAwesomeIcon icon={faHeartSolid} className={cx('icon-hover')} />
                                            </span>
                                        </button>
                                    </Tippy>
                                </div>

                                <div className={cx('level-item')}>
                                    <Tippy content="Khác">
                                        <button
                                            className={clsx(cx('icon-hv', 'icon-width'), 'is-hover-circle', 'zm-btn')}
                                        >
                                            <FontAwesomeIcon icon={faEllipsis} className={cx('icon-hover')} />
                                        </button>
                                    </Tippy>
                                </div>
                            </div>
                        </div>
                        <div className={cx('action-items')}>
                            <div className="level">
                                <div className={cx('level-item')}>
                                    <button
                                        className={clsx(
                                            cx('animation-like', 'icon-width'),
                                            'is-hover-circle',
                                            'zm-btn',
                                        )}
                                    >
                                        <span className={cx('icon', 'is-like')}>
                                            <FontAwesomeIcon icon={faHeartRegular} className={cx('icon-hover')} />
                                        </span>
                                        <span className={cx('icon', 'is-like-full')}>
                                            <FontAwesomeIcon icon={faHeartSolid} className={cx('icon-hover')} />
                                        </span>
                                    </button>
                                </div>
                                <div className={cx('level-item', 'duration')}>{secondsToTime(data.duration)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(SongItem);
