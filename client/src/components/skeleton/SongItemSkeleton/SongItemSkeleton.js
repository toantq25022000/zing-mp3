import React from 'react';
import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './SongItemSkeleton.module.scss';

const cx = classNames.bind(styles);

const SongItemSkeleton = ({ counts = 1 }) => {
    return Array(counts)
        .fill(0)
        .map((_, index) => (
            <div className={cx('media')} key={index}>
                <div className={cx('media-left')}>
                    <div>
                        <Skeleton className={cx('image')} />
                    </div>
                    <div className={cx('info')}>
                        <Skeleton className={cx('title')} />
                        <Skeleton className={cx('subtitle')} />
                    </div>
                </div>
                <div className={cx('media-content')}>
                    <Skeleton className={cx('artist')} />
                </div>
                <div className={cx('media-right')}>
                    {Array(4)
                        .fill(0)
                        .map((_, i) => (
                            <Skeleton className={cx('tooltip')} key={i} />
                        ))}
                </div>
            </div>
        ));
};

export default SongItemSkeleton;
