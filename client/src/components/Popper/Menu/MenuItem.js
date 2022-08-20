import { faAngleRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Menu from '.';
import styles from './Menu.module.scss';
const cx = classNames.bind(styles);

function MenuItem({ data }) {
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
                return (
                    <div
                        className={cx(
                            'menu-item',
                            {
                                separate: data.separate,
                            },
                            'option-theme',
                        )}
                    >
                        <span className={cx('item-title')}>{data.title}</span>
                        <span className={cx('icon-check')}>
                            <label className={cx('switch')}>
                                <input type="checkbox" />
                                <span className={cx('slider', 'round')}></span>
                            </label>
                        </span>
                    </div>
                );
            default:
                return (
                    <div
                        className={cx('menu-item', {
                            separate: data.separate,
                        })}
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