import { faEllipsis, faPlay, faShuffle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import styles from './Carousel.module.scss';
import classNames from 'classnames/bind';
import { setNumberToThounsandLike } from '~/utils/collectionFunctionConstants';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

function CarouselItem({ data, isArtist, isPlaylist, isPlaylistOfArtist = false }) {
    return (
        <div className={clsx(cx('carousel-item'), 'col', 'l-2-4', 'm-3', 'c-4')}>
            <div className={cx('card', isArtist && 'card--artist', isPlaylist && 'playlist-wapper')}>
                <div className={cx('image-wrapper')}>
                    <div className={clsx(cx('card-img'), isArtist && 'is-rounded')}>
                        <a href={data.link} title={data.name || data.title}>
                            <figure>
                                <img src={data.thumbnail} alt="" />
                            </figure>
                            <div className={clsx(cx('opacity-crs'), 'opacity')}></div>
                            <div className={cx('actions-container')}>
                                <div className={clsx(cx('actions-box', isPlaylist && 'playlist-actions'), 'zm-action')}>
                                    <Tippy content="Thêm vào thư viện">
                                        <button
                                            className={clsx(
                                                cx('tooltip-btn-action', 'icon-hover'),
                                                isArtist && 'is-hidden',
                                                'is-hover-circle',
                                                'zm-btn',
                                            )}
                                        >
                                            <FontAwesomeIcon icon={faHeart} className={cx('icon-crs')} />
                                        </button>
                                    </Tippy>
                                    <button
                                        className={clsx(cx('tooltip-btn-action', isPlaylist && 'btn-play'), 'zm-btn')}
                                    >
                                        {isPlaylist ? (
                                            <FontAwesomeIcon
                                                icon={faPlay}
                                                className={cx('icon-crs', 'icon-play', 'is-pause')}
                                            />
                                        ) : (
                                            <FontAwesomeIcon icon={faShuffle} className={cx('icon-crs')} />
                                        )}
                                        {/* <FontAwesomeIcon icon={faPause} className={cx('icon-crs', 'icon-play')} /> */}
                                    </button>
                                    <Tippy content="Khác">
                                        <button
                                            className={clsx(
                                                cx('tooltip-btn-action', 'icon-hover'),
                                                isArtist && 'is-hidden',
                                                'is-hover-circle',
                                                'zm-btn',
                                            )}
                                        >
                                            <FontAwesomeIcon icon={faEllipsis} className={cx('icon-crs')} />
                                        </button>
                                    </Tippy>
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
                            {isPlaylist ? (
                                data.artists
                                    .map((artist) => (
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
                        <button
                            className={clsx(
                                'zm-btn',
                                'is-outlined',
                                'is-small',
                                'is-upper',
                                'mb-20',
                                'mt-15',
                                'is-active',
                            )}
                        >
                            <FontAwesomeIcon icon={faUserPlus} className={cx('icon-add-friend')} />
                            <span>Quan tâm</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CarouselItem;
