import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Sidebar from './Sidebar';
import Header from './Header';
import Player from './Player';
import instance from '~/utils/axios';
import { authSlice } from '~/redux/features/auth/authSlice';

const cx = classNames.bind(styles);

export default function DefaultLayout({ children }) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const headerRef = useRef();
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const currentUser = await instance.get('/auth/current-user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                dispatch(authSlice.actions.setUser(currentUser.data));
            } catch (error) {
                console.log(error);
            }
        };

        getCurrentUser();
    }, [token, dispatch]);

    const handleScrollBody = (e) => {
        const scrollTop = e.target.scrollTop;

        if (scrollTop < 10) {
            headerRef.current.style.boxShadow = 'none';
        } else {
            headerRef.current.style.boxShadow = '0 3px 5px var(--sticky-header-box-shadow)';
        }
    };

    return (
        <div className={clsx(cx('wrapper'), 'zm-layout', 'has-player')}>
            <Sidebar />
            <Header headerRef={headerRef} />
            <div className={cx('container')}>
                <div className={cx('body-scrolled')} onScroll={handleScrollBody}>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
            <Player />
        </div>
    );
}
