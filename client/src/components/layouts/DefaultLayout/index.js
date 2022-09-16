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
import { handleSetThemeWebsite } from '~/utils/collectionFunctionConstants';
import { songSlice } from '~/redux/features/song/songSlice';

const cx = classNames.bind(styles);

export default function DefaultLayout({ children }) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const theme = useSelector((state) => state.userConfig.theme);
    const isPlay = useSelector((state) => state.song.isPlay);
    const isOpenSearchResult = useSelector((state) => state.userConfig.isOpenSearchResult);
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

    const handleChangeStatePlaySong = () => {
        dispatch(songSlice.actions.setIsPlay(!isPlay));
    };

    useEffect(() => {
        //handle set theme of user current or default
        if (theme) {
            handleSetThemeWebsite(theme);
        }
    }, [theme]);

    useEffect(() => {
        const keyDownHandler = (event) => {
            // If search result wrap is open
            if (isOpenSearchResult) return;
            if (event.code === 'Space') {
                event.preventDefault();

                handleChangeStatePlaySong();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpenSearchResult, isPlay]);

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
