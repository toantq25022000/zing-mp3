import { faAngleRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { userConfigSlice } from '~/redux/features/userConfig/userConfigSlice';
import Menu from '.';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    const sizeTextLyric = useSelector((state) => state.userConfig.sizeTextLyric);
    const isTurnOnModeWallpaper = useSelector((state) => state.userConfig.isTurnOnModeWallpaper);

    const dispatch = useDispatch();

    const handleChangeCheckboxSwitch = (e) => {
        if (data.isModeWallpaper) {
            dispatch(userConfigSlice.actions.setIsTurnOnModeWallpaper(e.target.checked));
        }
    };

    const renderItem = () => {
        switch (data.type) {
            case 'quaility-music':
                return (
                    <div
                        className={cx(
                            'menu-item',
                            {
                                separate: data.separate,
                            },
                            'option',
                        )}
                    >
                        <div className={cx('item-body')}>
                            <span className={cx('item-title')}>{data.title}</span>
                            {data.description && <span className={cx('item-desc')}>{data.description}</span>}
                        </div>

                        <span className={cx('icon-check', !data.isActive ? 'unCheck' : '')}>
                            {data.isActive && <FontAwesomeIcon icon={faCheck} />}
                        </span>
                    </div>
                );
            case 'theme':
            case 'playerFull':
                return (
                    <div
                        className={cx(
                            'menu-item',
                            {
                                separate: data.separate,
                                noSelect: data.isNoneSelected,
                            },
                            'option-player-full',
                            data.isSettingPlayer && 'setting-menu-player',
                        )}
                    >
                        <span className={cx('item-title')}>{data.title}</span>
                        {data.listOptions ? (
                            <div className={cx('sizes')}>
                                {data.listOptions.map((option) => (
                                    <span
                                        key={option.size}
                                        className={clsx(
                                            cx('button-size', sizeTextLyric === option.size && 'active'),
                                            'zm-btn',
                                        )}
                                        tabIndex="0"
                                        onClick={() => dispatch(userConfigSlice.actions.setSizeTextLyric(option.size))}
                                    >
                                        A
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <span className={cx('icon-check')}>
                                <label className={cx('switch')}>
                                    <input
                                        type="checkbox"
                                        disabled={data.isNoneSelected}
                                        onChange={handleChangeCheckboxSwitch}
                                        checked={data.isModeWallpaper ? isTurnOnModeWallpaper : false}
                                    />
                                    <span className={cx('slider', 'round')}></span>
                                </label>
                            </span>
                        )}
                    </div>
                );
            default:
                return (
                    <div
                        className={cx('menu-item', {
                            separate: data.separate,
                        })}
                        onClick={data.onClick && data.onClick}
                    >
                        {data.icon && <div className={cx('icon-left')}>{data.icon}</div>}
                        <span className={cx('item-title')}>{data.title}</span>
                    </div>
                );
        }
    };
    return (
        <>
            {data.items ? (
                <Menu
                    items={data.items}
                    placement="left-start"
                    trigger="mouseenter focus"
                    className={cx('menu-list', 'menu-sub')}
                >
                    <div
                        className={cx('menu-item', {
                            separate: data.separate,
                        })}
                    >
                        <div className={cx('icon-left')}>{data.icon}</div>
                        <span className={cx('item-title')}>{data.title}</span>
                        <span className={cx('icon-right')}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </span>
                    </div>
                </Menu>
            ) : (
                <>{renderItem()}</>
            )}
        </>
    );
}

export default MenuItem;
