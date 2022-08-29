import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import clsx from 'clsx';

import styles from './ThemeOption.module.scss';

const cx = classNames.bind(styles);

function ThemeOption({ data }) {
    const { title, items } = data;

    const handlePreviewTheme = (itemTheme) => {
        const htmlElement = document.getElementsByTagName('html')[0];
        const bgLayout = document.querySelector('.zm-layout');
        //Set attr for element HTML
        htmlElement.setAttribute('data-theme', itemTheme.dataTheme);
        if (itemTheme.styleHtml) {
            htmlElement.style = itemTheme.styleHtml;
        } else {
            htmlElement.removeAttribute('style');
        }

        //Set background for website
        if (itemTheme.bgLayout) {
            bgLayout.style.backgroundImage = `url(${itemTheme.bgLayout})`;
            htmlElement.setAttribute('class', 'theme-bg-image');
        } else {
            htmlElement.removeAttribute('style');
            bgLayout.removeAttribute('style');
            htmlElement.removeAttribute('class');
        }
    };
    return (
        <div className={clsx(cx('wrapper'), 'grid')}>
            <h4 className={cx('title')}>{title}</h4>
            <div className={clsx(cx('body'), 'row')}>
                {items?.map((item, index) => (
                    <div key={index} className={clsx(cx('theme-item'), 'col', 'l-2-4', 'm-4', 'c-6')}>
                        <div className={cx('thumbnail')}>
                            <figure>
                                <img src={item.image} alt="" className={cx('thumbnail__img')} />
                            </figure>

                            <span
                                className={cx('icon-check', {
                                    isCheck: item.isCheck,
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
