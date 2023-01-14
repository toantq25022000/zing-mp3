import { faEllipsis, faPlay, faShuffle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import styles from './Carousel.module.scss';
import classNames from 'classnames/bind';
import { setNumberToThounsandLike } from '~/utils/collectionFunctionConstants';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function CarouselItem({ data, isArtist, isPlaylist, isPlaylistOfArtist = false, isVideo }) {
    return (
        <div
            className={clsx(
                cx('carousel-item'),
                'col',
                isVideo ? 'l-4' : 'l-2-4',
                isVideo ? 'm-6' : 'm-3',
                isVideo ? 'c-6' : 'c-4',
            )}
        >
            <div
                className={cx(
                    'card',
                    isArtist && 'card--artist',
                    isPlaylist && 'playlist-wapper',
                    isVideo && 'video-item',
                )}
            >
                <div className={cx('image-wrapper')}>
                    <div className={clsx(cx('card-img', isVideo && 'video-image'), isArtist && 'is-rounded')}>
                        <a href={data.link} title={data.name || data.title}>
                            <figure>
                                <img src={isVideo ? data.thumbnailM : data.thumbnail} alt="" />
                            </figure>
                            <div className={clsx(cx('opacity-crs'), 'opacity')}></div>
                            <div className={cx('actions-container')}>
                                <div
                                    className={clsx(
                                        cx('actions-box', {
                                            'playlist-actions': isPlaylist || isVideo,
                                        }),
                                        'zm-action',
                                    )}
                                >
                                    {!isVideo && (
                                        <Tippy content="Thêm vào thư viện">
                                            <Button
                                                className={clsx(
                                                    cx('tooltip-btn-action', 'icon-hover'),
                                                    isArtist && 'is-hidden',
                                                    'is-hover-circle',
                                                )}
                                                rounded
                                                tooltip
                                                leftIcon={<FontAwesomeIcon icon={faHeart} className={cx('icon-crs')} />}
                                            ></Button>
                                        </Tippy>
                                    )}

                                    {/* <FontAwesomeIcon icon={faPause} className={cx('icon-crs', 'icon-play')} /> */}
                                    <Button
                                        className={clsx(
                                            cx('tooltip-btn-action', { 'btn-play': isPlaylist || isVideo }),
                                            'm-0',
                                        )}
                                        rounded
                                        tooltip
                                        leftIcon={
                                            isPlaylist || isVideo ? (
                                                <FontAwesomeIcon
                                                    icon={faPlay}
                                                    className={cx('icon-crs', 'icon-play', 'is-pause')}
                                                />
                                            ) : (
                                                <FontAwesomeIcon icon={faShuffle} className={cx('icon-crs')} />
                                            )
                                        }
                                    ></Button>
                                    {!isVideo && (
                                        <Tippy content="Khác">
                                            <Button
                                                className={clsx(
                                                    cx('tooltip-btn-action', 'icon-hover'),
                                                    isArtist && 'is-hidden',
                                                    'is-hover-circle',
                                                )}
                                                rounded
                                                tooltip
                                                leftIcon={
                                                    <FontAwesomeIcon icon={faEllipsis} className={cx('icon-crs')} />
                                                }
                                            ></Button>
                                        </Tippy>
                                    )}
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className={cx('card-content')}>
                    <div className={cx('card-title')}>
                        <a href={data.link} className={cx('is-ghost')} title={data.title}>
                            <span>{isArtist ? data.name : data.title}</span>
                        </a>
                    </div>
                    {!isPlaylistOfArtist && (
                        <div className={cx('card-subtitle')}>
                            {isPlaylist || isVideo ? (
                                data?.artists
                                    ?.map((artist) => (
                                        <a href={artist.link} className={cx('is-ghost')} key={artist.id}>
                                            {artist.name}
                                        </a>
                                    ))
                                    .reduce((prev, current) => [prev, ', ', current])
                            ) : (
                                <span className={cx('followers')}>
                                    {setNumberToThounsandLike(data.totalFollow)} quan tâm
                                </span>
                            )}
                        </div>
                    )}
                </div>
                {isArtist && !isPlaylistOfArtist && (
                    <div className={cx('card-footer')}>
                        <Button
                            className="mb-20 mt-15"
                            rounded
                            outlined
                            active
                            small
                            upper
                            leftIcon={<FontAwesomeIcon icon={faUserPlus} className={cx('icon-add-friend')} />}
                        >
                            Quan tâm
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CarouselItem;
