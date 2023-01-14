import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import classNames from 'classnames/bind';

import styles from './DetailPlaylist.module.scss';
import clsx from 'clsx';
import SongItemSkeleton from '~/components/skeleton/SongItemSkeleton/SongItemSkeleton';

const cx = classNames.bind(styles);

const DetailPlaylistSkeleton = () => {
    return (
        <div className={clsx(cx('wrapper'), 'pt-20')}>
            <div className={cx('container')}>
                <div className={clsx(cx('inner'), 'mb-30', 'clearfix')}>
                    <div className={clsx(cx('playlist-header', 'sticky'), 'media')}>
                        <div className={cx('media-left')}>
                            <div className={cx('header-thumbnail')}>
                                <div className={cx('card-image')}>
                                    <Skeleton className={cx('thumb-img-skeletom')} style={{ borderRadius: '6px' }} />
                                </div>
                            </div>
                        </div>
                        <div className={cx('media-content')}>
                            <div className={cx('content-top')} style={{ textAlign: 'center' }}>
                                <h3 className={cx('title')}>
                                    <Skeleton width={250} height={20} />
                                </h3>
                                <div className={cx('release')}>
                                    <Skeleton width={180} height={10} />
                                </div>
                                <div className={cx('artists')}>
                                    <Skeleton width={180} height={10} />
                                </div>
                                <div className={cx('like')}>
                                    <Skeleton width={180} height={10} />
                                </div>
                            </div>

                            <div className={cx('actions')}>
                                <Skeleton width={180} height={36} style={{ borderRadius: '999px' }} />

                                <div className={clsx(cx('level-wrap'), 'level')}>
                                    <Skeleton circle width={35} height={35} style={{ marginLeft: '10px' }} />
                                    <Skeleton circle width={35} height={35} style={{ marginLeft: '10px' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('playlist-content')}>
                        <div className={clsx(cx('song-list-select'), 'mb-10')}>
                            <SongItemSkeleton counts={15} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPlaylistSkeleton;
