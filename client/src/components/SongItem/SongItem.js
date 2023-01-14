import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react';
import TippyHandless from '@tippyjs/react/headless';
import clsx from 'clsx';
import classNames from 'classnames/bind';
import styles from './SongItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faMusic,
    faHeart as faHeartSolid,
    faEllipsis,
    faPlay,
    faCaretUp,
    faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

import { secondsToTime } from '~/utils/collectionFunctionConstants';
import { KaraokeIcon } from '../layouts/components/Icons';
import ArtistCard from '../layouts/components/ArtistCard';
import instance from '~/utils/axios';
import { artistSlice } from '~/redux/features/artist/artistSlice';
import Image from '../layouts/components/Image';
import Button from '../Button';

const cx = classNames.bind(styles);

function SongItem({
    data,
    isAlbum = false,
    onDoubleClickSong,
    onPlayOrPauseSong,
    isZingChart = false,
    isChartSongItem = false,
    indexSTT,
}) {
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
        <div
            className={cx('wrapper', {
                'chart-song-item': isChartSongItem,
                'chart-week': isZingChart && !isChartSongItem,
            })}
            onDoubleClick={onDoubleClickSong}
            id={data.encodeId}
        >
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
                            {isZingChart ? (
                                <>
                                    <span
                                        className={clsx(
                                            cx('number', isChartSongItem && indexSTT < 3 && `is-top-${indexSTT + 1}`),
                                            'is-center',
                                            'mr-5',
                                        )}
                                    >
                                        {indexSTT + 1}
                                    </span>
                                    <div className={cx('sort')}>
                                        {data.rakingStatus === 0 ? (
                                            <span className={cx('no-rank-sort')}></span>
                                        ) : (
                                            <>
                                                {data.rakingStatus > 0 ? (
                                                    <span className={cx('rank-sort-up')}>
                                                        <FontAwesomeIcon icon={faCaretUp} />
                                                    </span>
                                                ) : (
                                                    <span className={cx('rank-sort-down')}>
                                                        <FontAwesomeIcon icon={faCaretDown} />
                                                    </span>
                                                )}

                                                <span className={cx('sort-number')}>1</span>
                                            </>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <span className={cx('song-icon')}>
                                    <FontAwesomeIcon icon={faMusic} />
                                </span>
                            )}
                        </div>
                        <div className={cx('song-thumb')}>
                            <figure className="is-40x40 ">
                                <Image src={data.thumnail || data.thumbnailM} alt="" />
                            </figure>
                            <div className={clsx(cx('opacity-bg'), 'opacity')}></div>
                            <div className={cx('actions-container')} onClick={onPlayOrPauseSong}>
                                <div className={clsx(cx('box-actions'), 'zm-action')}>
                                    {/* <button className={clsx(cx('btn-play'), 'zm-btn')} onClick={handlePlayOrPauseSong}>
                                        {isPlay ? (
                                            data.encodeId === songId ? (
                                                <span className={cx('icon-play-gif')}></span>
                                            ) : (
                                                <FontAwesomeIcon icon={faPlay} className={cx('icon-play-circle')} />
                                            )
                                        ) : (
                                            <FontAwesomeIcon icon={faPlay} className={cx('icon-play-circle')} />
                                        )}
                                    </button> */}
                                    <Button className={cx('btn-play')} tooltip onClick={handlePlayOrPauseSong}>
                                        {isPlay ? (
                                            data.encodeId === songId ? (
                                                <span className={cx('icon-play-gif')}></span>
                                            ) : (
                                                <FontAwesomeIcon icon={faPlay} className={cx('icon-play-circle')} />
                                            )
                                        ) : (
                                            <FontAwesomeIcon icon={faPlay} className={cx('icon-play-circle')} />
                                        )}
                                    </Button>
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
                                        <TippyHandless
                                            interactive={true}
                                            placement="bottom-start"
                                            onTrigger={() => handleFetchInfoArtist(artist)}
                                            onHidden={handleHiddenTippyInfo}
                                            appendTo={() => document.body}
                                            render={(attrs) => (
                                                <div className={cx('box-card-info')} tabIndex="-1" {...attrs}>
                                                    <ArtistCard />
                                                </div>
                                            )}
                                            key={index}
                                        >
                                            <a href={artist.link} className={cx('is-ghost')}>
                                                {artist.name}
                                            </a>
                                        </TippyHandless>
                                    ))
                                    .reduce((prev, current) => [prev, ', ', current])}
                            </div>
                        </div>
                    </div>
                    {!isAlbum && (
                        <a className={cx('body-content')} href={data?.album?.link}>
                            <div className={cx('album-info')}>
                                <span className={cx('album-name')}>{data?.album?.title}</span>
                            </div>
                        </a>
                    )}
                    <div className={cx('body-right')}>
                        <div className={cx('hover-items')}>
                            <div className="level">
                                <div className={cx('level-item')}>
                                    <Tippy content="Phát cùng lời bài hát">
                                        <Button
                                            className={clsx(cx('icon-hv', 'icon-width'), 'is-hover-circle')}
                                            tooltip
                                            rounded
                                            leftIcon={<KaraokeIcon className={cx('icon-hover')} />}
                                        ></Button>
                                    </Tippy>
                                </div>

                                <div className={cx('level-item')}>
                                    <Tippy content="Thêm vào thư viện">
                                        <Button
                                            className={clsx(cx('animation-like', 'icon-width'), 'is-hover-circle')}
                                            tooltip
                                            rounded
                                            leftIcon={
                                                <FontAwesomeIcon
                                                    icon={faHeartRegular}
                                                    className={cx('icon-hover', 'is-like')}
                                                />
                                            }
                                        ></Button>
                                    </Tippy>
                                </div>

                                <div className={cx('level-item')}>
                                    <Tippy content="Khác">
                                        <Button
                                            className={clsx(cx('icon-hv', 'icon-width'), 'is-hover-circle')}
                                            tooltip
                                            rounded
                                            leftIcon={
                                                <FontAwesomeIcon icon={faEllipsis} className={cx('icon-hover')} />
                                            }
                                        ></Button>
                                    </Tippy>
                                </div>
                            </div>
                        </div>
                        <div className={cx('action-items')}>
                            <div className="level">
                                <div className={cx('level-item')}>
                                    <Button
                                        className={clsx(cx('animation-like', 'icon-width'), 'is-hover-circle')}
                                        tooltip
                                        rounded
                                        leftIcon={
                                            <FontAwesomeIcon
                                                icon={faHeartRegular}
                                                className={cx('icon-hover', 'is-like')}
                                            />
                                        }
                                    ></Button>
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
