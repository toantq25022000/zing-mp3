import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { userConfigSlice } from '~/redux/features/userConfig/userConfigSlice';
import { handleSetThemeWebsite } from '~/utils/collectionFunctionConstants';

import styles from './ThemeOption.module.scss';

const cx = classNames.bind(styles);

function ThemeOption({ data, onSetOpenTheme }) {
    const { title, items } = data;
    const { theme } = useSelector((state) => state.userConfig.theme);

    const dispatch = useDispatch();

    const handlePreviewTheme = (itemTheme) => {
        handleSetThemeWebsite(itemTheme);
    };

    const handleSetThemeForApp = (itemTheme) => {
        dispatch(
            userConfigSlice.actions.setTheme({
                theme: itemTheme,
            }),
        );
        onSetOpenTheme(false);
    };

    return (
        <div className={clsx(cx('wrapper'), 'grid')}>
            <h4 className={cx('title')}>{title}</h4>
            <div className={clsx(cx('body'), 'row')}>
                {items?.map((item) => (
                    <div key={item.id} className={clsx(cx('theme-item'), 'col', 'l-2-4', 'm-4', 'c-6')}>
                        <div className={cx('thumbnail')}>
                            <figure>
                                <img src={item.thumbnail} alt="" className={cx('thumbnail__img')} />
                            </figure>

                            <span
                                className={cx('icon-check', {
                                    isCheck: theme.id === item.id,
                                })}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </span>

                            <div className={cx('opacity')}></div>
                            <div className={clsx(cx('theme-actions'), 'theme-actions-g')}>
                                <button
                                    className={clsx(
                                        cx('action-btn', {
                                            active: true,
                                        }),
                                        'zm-btn',
                                        'is-outlined',
                                        'mb-10',
                                    )}
                                    onClick={() => handleSetThemeForApp(item)}
                                >
                                    Áp dụng
                                </button>
                                <button
                                    className={clsx(cx('action-btn'), 'zm-btn', 'is-outlined')}
                                    onClick={() => handlePreviewTheme(item)}
                                >
                                    Xem trước
                                </button>
                            </div>
                        </div>
                        <h5 className={cx('name')}>{item.title}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ThemeOption;
