import React from 'react';
import clsx from 'clsx';
import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './ArtistInfoSkeleton.module.scss';
import SongItemSkeleton from '~/components/skeleton/SongItemSkeleton/SongItemSkeleton';

const cx = classNames.bind(styles);

const ArtistInfoSkeleton = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={clsx(cx('header'), 'grid')}>
                <div className="row">
                    <div className="col l-7 m-7 c-7">
                        <Skeleton className={cx('title')} />

                        <div className={cx('group-subtitle')}>
                            <Skeleton className={cx('subtitle')} />
                            <Skeleton className={cx('subtitle')} />
                            <Skeleton className={cx('subtitle')} />
                        </div>

                        <div className={cx('left-bottom')}>
                            <div className={cx('group-button')}>
                                <Skeleton className={cx('button')} />
                                <Skeleton className={cx('button')} style={{ marginLeft: '10px' }} />
                            </div>
                            <Skeleton className={cx('subtitle')} />

                            <div className={cx('awards')}>
                                <div className={cx('awards__image')}>
                                    <Skeleton className={cx('image-new-music')} />
                                </div>
                                <div className={cx('awards__content')}>
                                    <Skeleton className={cx('subtitle')} />
                                    <Skeleton className={cx('subtitle')} width={150} />
                                    <Skeleton className={cx('subtitle')} width={120} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(cx('avatar-group', 'col l-5 m-5 c-5'))}>
                        <Skeleton circle className={cx('avatar')} />
                    </div>
                </div>
            </div>
            <nav>
                <Skeleton className={cx('navbar')} />
            </nav>

            <div className={cx('content')}>
                <Skeleton className={cx('title')} />

                <div className={cx('body')}>
                    <div className={cx('body__left')}>
                        <div className={cx('artist-img')}>
                            <Skeleton height="100%" width="100%" />
                        </div>
                    </div>
                    <div className={cx('body__right')}>
                        <div>
                            <SongItemSkeleton counts={10} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistInfoSkeleton;
