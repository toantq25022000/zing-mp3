import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { setNumberToThounsandLike } from '~/utils/collectionFunctionConstants';
import styles from './ArtistCard.module.scss';

const cx = classNames.bind(styles);

function ArtistCard() {
    const cardInfo = useSelector((state) => state.artist.artistCardInfo);

    return (
        <div className={cx('wrapper')}>
            {cardInfo && (
                <div className={cx('content')}>
                    <div className={cx('top-content')}>
                        <div
                            className={cx('cover-bg')}
                            style={{ backgroundImage: `url(${cardInfo.thumbnail || cardInfo.thumbnailM})` }}
                        ></div>
                        <div className={cx('blur-bg')}></div>
                        <div className={cx('media')}>
                            <div className={cx('media-left')}>
                                <div className={cx('card-thumb')}>
                                    <figure>
                                        <img src={cardInfo.thumbnail || cardInfo.thumbnailM} alt="" />
                                    </figure>
                                </div>
                            </div>
                            <div className={cx('media-content')}>
                                <div className={cx('title')}>
                                    <a href={cardInfo.link}>{cardInfo.name}</a>
                                </div>

                                <div className={cx('subtitle')}>
                                    {setNumberToThounsandLike(cardInfo.totalFollow)} quan tâm
                                </div>
                            </div>
                            <div className={cx('media-right')}>
                                <button
                                    className={clsx(
                                        cx('btn-addfriend'),
                                        'zm-btn',
                                        'is-outlined',
                                        'is-upper',
                                        'is-active',
                                    )}
                                >
                                    <FontAwesomeIcon icon={faUserPlus} />
                                    <span>Quan tâm</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('bottom-content')}>
                        {cardInfo.sortBiography && (
                            <div className={cx('description')}>
                                <span>{cardInfo.sortBiography}</span>
                                <span>
                                    <a href={cardInfo.link}>Xem thêm</a>
                                </span>
                            </div>
                        )}
                        {(cardInfo.spotlight || cardInfo.awards) && (
                            <div className={cx('awards')}>
                                <h3 className={cx('awards-title')}>Giải thưởng</h3>
                                <div className={cx('awards-content')}>
                                    {cardInfo.spotlight && <i className={cx('icon', 'icon-zing-choice')}></i>}
                                    {cardInfo.awards && <i className={cx('icon', 'icon-zma')}></i>}
                                </div>
                            </div>
                        )}

                        <div className={cx('album')}>
                            <h3 className={cx('title')}>Mới nhất</h3>
                            <div className={cx('album__list')}>
                                {cardInfo?.album.slice(0, 4).map((item, index) => (
                                    <div className={cx('album__item')} key={index}>
                                        <div className={cx('album__thumb')}>
                                            <figure>
                                                <img src={item.thumbnail || item.thumbnailM} alt="" />
                                            </figure>
                                        </div>
                                        <div className={cx('album__content')}>
                                            <h3 className={cx('title')}>
                                                <a href={item.link}>{item.title}</a>
                                            </h3>
                                            <div className={cx('subtitle')}>
                                                {item.releaseDateText.includes('/')
                                                    ? item.releaseDateText.split('/')[1]
                                                    : item.releaseDateText}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ArtistCard;
