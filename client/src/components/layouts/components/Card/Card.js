import clsx from 'clsx';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import styles from './Card.module.scss';

const cx = classNames.bind(styles);

function CardItem({ data, isMix = false }) {
    const handleLikePlayList = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleMoreOption = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('thumbnail')} title={isMix ? '' : data.title}>
                <Link to={data.link}>
                    <figure>
                        <img
                            src={data.thumbnailM || data.thumbnailR}
                            alt={data.title}
                            className={cx('thumbnail__img')}
                        />
                    </figure>

                    {!isMix && <div className={cx('opacity')}></div>}

                    {isMix && (
                        <div
                            className={cx('blur-bg')}
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 50%, rgb(28, 26, 25))',
                            }}
                        ></div>
                    )}

                    {isMix && (
                        <div className={cx('mix-content')}>
                            <h3 className={cx('mix-title')}>{data.artistsNames}</h3>
                            <div className={cx('thumbs')}>
                                {data.song?.items?.slice(0, 3)?.map((song, index) => (
                                    <div key={index} className={cx('thumb-item')}>
                                        <figure className={cx('image')}>
                                            <img src={song.thumbnail || song.thumbnailM} alt="" />
                                        </figure>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={cx('actions')}>
                        {!isMix && (
                            <Tippy content="Thêm vào thư viện">
                                <button className={clsx(cx('btn-action'), 'zm-btn')} onClick={handleLikePlayList}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </button>
                            </Tippy>
                        )}
                        <button className={clsx(cx('btn-play'), 'zm-btn')} title={data.title}>
                            <span className={cx('icon-play')}></span>
                        </button>
                        {!isMix && (
                            <Tippy content="Khác">
                                <button className={clsx(cx('btn-action'), 'zm-btn')} onClick={handleMoreOption}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            </Tippy>
                        )}
                    </div>
                </Link>
            </div>
            {!isMix && (
                <>
                    <h5 className={cx('title')} title={data.title}>
                        {data.title}
                    </h5>
                    <h3 className={cx('subtitle')}>
                        {data.userName === 'XONE Radio' || data.userName === 'XONE RADIO'
                            ? data.sortDescription
                            : data?.artists?.map((artist, index) => {
                                  return (
                                      <a key={artist.id} href="/" className={cx('is-ghost')}>
                                          {artist.name}
                                          {index === data.artists.length - 1 ? '' : ', '}
                                      </a>
                                  );
                              })}
                    </h3>
                </>
            )}
        </div>
    );
}

export default CardItem;
