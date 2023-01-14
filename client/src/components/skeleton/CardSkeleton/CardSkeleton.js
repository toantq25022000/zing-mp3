import React from 'react';
import classNames from 'classnames/bind';
import styles from './CardSkeleton.module.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const cx = classNames.bind(styles);

const CardSkeleton = () => {
    return (
        <div className={cx('card')}>
            <div className={cx('thumb')}>
                <Skeleton height={180} width={180} />
            </div>
            <div className={cx('content')}>
                <div className={cx('title')}>
                    <Skeleton height={15} width={180} />
                </div>
                <div className={cx('subtitle')}>
                    <Skeleton height={15} width={180} />
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;
