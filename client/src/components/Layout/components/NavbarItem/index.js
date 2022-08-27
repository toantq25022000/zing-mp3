import React from 'react';
import styles from './NavbarItem.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function NavbarItem({ title, Icon, liveLable, srcImgIcon, to, isExpanded }) {
    return (
        <NavLink
            className={cx('wrapper', {
                'is-expanded': isExpanded,
            })}
            title={title}
            to={to}
        >
            <div className={cx('content')}>
                {srcImgIcon ? (
                    <img src={srcImgIcon} alt="" className={cx('icon')} />
                ) : Icon ? (
                    <Icon className={cx('icon')} />
                ) : (
                    ''
                )}
                <span className={cx('title')}>{title}</span>
                {liveLable ? (
                    <img
                        src="https://zjs.zmdcdn.me/zmp3-desktop/dev/147506/static/media/live-tag.e25dd240.svg"
                        alt=""
                        className={cx('live-img')}
                    />
                ) : (
                    ''
                )}
            </div>
        </NavLink>
    );
}
