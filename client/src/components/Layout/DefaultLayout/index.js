import React from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Sidebar from './Sidebar';
import Header from './Header';
import Player from './Player';
import clsx from 'clsx';

const cx = classNames.bind(styles);

export default function DefaultLayout({ children }) {
    return (
        <div className={clsx(cx('wrapper'), 'zm-layout', 'has-player')}>
            <Sidebar />
            <Header />
            <div className={cx('content')}>{children}</div>
            <Player />
        </div>
    );
}
