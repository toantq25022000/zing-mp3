import clsx from 'clsx';
import classNames from 'classnames/bind';

import styles from './SongItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faHeart as faHeartSolid, faMicrophone, faEllipsis, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SongItem({ data }) {
    const isSongVip = data.streamingStatus === 2;
    const sToMinutesAndSeconds = (s) => {
        const minutes = Math.floor(s / 60);
        const seconds = ((s % 60) / 10).toFixed(0);
        return (minutes > 10 ? '' : '0') + minutes + ':' + (seconds > 10 ? '' : '0') + seconds;
    };
    return (
        <div className={cx('wrapper')}>
            <div className={clsx(cx('container', { 'is-vip': isSongVip }), 'bor-b-1')}>
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
                            <div className={cx('actions-container')}>
                                <div className={clsx(cx('box-actions'), 'zm-action')}>
                                    <button className={clsx(cx('btn-play'), 'zm-btn')}>
                                        <FontAwesomeIcon icon={faPlay} className={cx('icon-play-circle')} />
                                        {/* <span className={cx('icon-play-gif')}></span> */}
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
                                    ?.map((artist) => (
                                        <a key={artist.id} href="/" className={cx('is-ghost')}>
                                            {artist.name}
                                        </a>
                                    ))
                                    .reduce((prev, current) => [prev, ', ', current])}
                            </div>
                        </div>
                    </div>
                    <Link className={cx('body-content')} to="/album">
                        <div className={cx('album-info')}>
                            <span className={cx('album-name')}>{data?.album?.title}</span>
                        </div>
                    </Link>
                    <div className={cx('body-right')}>
                        <div className={cx('hover-items')}>
                            <div className="level">
                                <div className={cx('level-item')}>
                                    <Tippy content="Phát cùng lời bài hát">
                                        <button
                                            className={clsx(cx('icon-hv', 'icon-width'), 'is-hover-circle', 'zm-btn')}
                                        >
                                            <FontAwesomeIcon icon={faMicrophone} className={cx('icon-hover')} />
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
                                <div className={cx('level-item', 'duration')}>
                                    {sToMinutesAndSeconds(data.duration)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SongItem;
