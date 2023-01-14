import { useEffect, useState } from 'react';
import { faPlay, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import clsx from 'clsx';
import Parser from 'html-react-parser';

import Modal from '~/components/layouts/Modal';
import instance from '~/utils/axios';
import styles from './ArtistInfo.module.scss';
import ArtistAllInfo from './ArtistAllInfo';
import ArtistInfoSkeleton from './ArtistInfoSkeleton';

const cx = classNames.bind(styles);

function ArtistInfo() {
    const { alias, type } = useParams();

    const [artistInfo, setArtistInfo] = useState(null);
    const [typeTab, setTypeTab] = useState('');
    const [openReadMore, setOpenReadMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const tabs = [
        {
            type: 'all',
            title: 'TỔNG QUAN',
            link: `/${alias}`,
        },
        {
            type: 'event',
            title: 'SỰ KIỆN',
            link: `/${alias}/event`,
        },
        {
            type: 'bai-hat',
            title: 'BÀI HÁT',
            link: `/${alias}/bai-hat`,
        },
        {
            type: 'single',
            title: 'SINGLE & EP',
            link: `/${alias}/single`,
        },
        {
            type: 'album',
            title: 'ALBUM',
            link: `/${alias}/album`,
        },
        {
            type: 'mv',
            title: 'MV',
            link: `/${alias}/mv`,
        },
    ];

    const hanldCloseModal = () => {
        setOpenReadMore(false);
    };

    useEffect(() => {
        instance
            .get(`/artist?alias=${alias}`)
            .then((res) => {
                setArtistInfo(res.data);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, [alias]);

    useEffect(() => {
        setTypeTab(() => (type ? type : 'all'));
    }, [type]);

    useEffect(() => {
        const pathnameUrl = window.location.pathname;
        if (pathnameUrl.toString().startsWith('/nghe-si')) {
            window.history.pushState({}, null, pathnameUrl.slice(8));
        }
    }, []);

    return (
        <>
            {isLoading && <ArtistInfoSkeleton />}
            {!isLoading && (
                <>
                    <div className={cx('wrapper')}>
                        <div className={clsx(cx('header'), 'grid')}>
                            <div className={clsx(cx('header__columns'), 'row')}>
                                <div className={clsx(cx('left-column'), 'col l-7 m-7 c-7')}>
                                    <h3 className={cx('title')}>{artistInfo.name}</h3>
                                    <div className={cx('subtitle')}>
                                        <p className={cx('subtitle-text')}>
                                            {artistInfo.sortBiography}
                                            <span className={cx('read-more')} onClick={() => setOpenReadMore(true)}>
                                                ...Xem thêm
                                            </span>
                                        </p>
                                    </div>
                                    <div className={cx('left-bottom')}>
                                        <div className={cx('actions')}>
                                            <button
                                                className={clsx(
                                                    cx('btn-tooltip-header'),
                                                    'is-outline',
                                                    'is-upper',
                                                    'zm-btn',
                                                )}
                                            >
                                                <FontAwesomeIcon icon={faPlay} className={cx('icon')} />
                                                <span>Phát nhạc</span>
                                            </button>
                                            <button
                                                className={clsx(
                                                    cx('btn-tooltip-header'),
                                                    'is-outline',
                                                    'is-upper',
                                                    'zm-btn',
                                                )}
                                            >
                                                <span>Quan tâm • 2.4M</span>
                                            </button>
                                        </div>
                                        <div className={cx('awards')}>
                                            <div className={cx('zma-wrapper')}>
                                                <i className={cx('icon-zma')}></i>
                                                <span className={cx('zma-items')}>
                                                    <p>Nam Ca Sĩ Được Yêu Thích 2017</p>
                                                    <p>Nam Ca Sĩ Được Yêu Thích 2018</p>
                                                    <p>Music Video Của Năm 2018 "Chạy Ngay Đi"</p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={clsx(cx('right-column'), 'col l-5 m-5 c-5')}>
                                    <figure>
                                        <img src={artistInfo.thumbnail || artistInfo.thumbnailM} alt="" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <nav className={cx('navbar-wrapper')}>
                            <div className={cx('navbar-container')}>
                                <div className={cx('navbar-menu')}>
                                    {tabs.map((tab) => (
                                        <div
                                            className={cx('navbar-item', tab.type === typeTab && 'is-active')}
                                            key={tab.type}
                                        >
                                            <div className={cx('navbar-link')}>
                                                <Link to={tab.link}>{tab.title}</Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </nav>

                        {typeTab === 'all' && <ArtistAllInfo artistInfo={artistInfo} />}
                    </div>

                    {openReadMore && (
                        <Modal className={cx('modal-artist-bio')} onClickOverLay={hanldCloseModal}>
                            <button className={clsx(cx('close-modal'), 'zm-btn')} onClick={hanldCloseModal}>
                                <FontAwesomeIcon icon={faXmark} className={cx('icon-close')} />
                            </button>
                            <div className={cx('top')}>
                                <div
                                    className={cx('cover-bg')}
                                    style={{ backgroundImage: `url(${artistInfo.thumbnailM})` }}
                                ></div>
                                <div className={cx('blur-bg')}></div>
                                <div className={cx('top-content')}>
                                    <figure>
                                        <img src={artistInfo.thumbnailM} alt="" />{' '}
                                    </figure>
                                    <h3 className={cx('title')}>{artistInfo.name}</h3>
                                </div>
                            </div>
                            <div className={cx('bio-content')}>
                                <div className={cx('bio-text')}>{Parser(artistInfo.biography)}</div>
                            </div>
                        </Modal>
                    )}
                </>
            )}
        </>
    );
}

export default ArtistInfo;
