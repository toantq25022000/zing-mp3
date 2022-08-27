import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Sidebar from './Sidebar';
import Header from './Header';
import Player from './Player';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import instance from '~/utils/axios';
import { authSlice } from '~/redux/features/auth/authSlice';

const cx = classNames.bind(styles);

export default function DefaultLayout({ children }) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);

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

    return (
        <div className={clsx(cx('wrapper'), 'zm-layout', 'has-player')}>
            <Sidebar />
            <Header />
            <div className={cx('container')}>
                <div className={cx('body-scrolled')}>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
            <Player />
        </div>
    );
}
