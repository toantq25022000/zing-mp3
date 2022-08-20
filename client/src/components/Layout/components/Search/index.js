import React, { useEffect, useState, useRef } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';

import clsx from 'clsx';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Wrapper as WrapperPopper } from '../../../Popper';
import OfferMusicItem from '../OfferMusicItem';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [stateInput, setStateInput] = useState(false);
    const inputRef = useRef();

    const handleFocusInput = (e) => {
        setStateInput(true);
    };

    const hanldeBlurInput = () => {
        setStateInput(false);
    };
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
        }, 0);
    }, []);
    return (
        <>
            <Tippy
                interactive
                trigger="click"
                // visible={searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <WrapperPopper className={clsx(cx('popper-search', 'suggest__list'))}>
                            <h4 className={cx('search-title')}>Đề xuất cho bạn</h4>
                            <div className={cx('offer-list')}>
                                <OfferMusicItem label="nhìn về" />
                                <OfferMusicItem label="pháo hông" />
                                <OfferMusicItem label="karaoke" />
                            </div>
                        </WrapperPopper>
                    </div>
                )}
            >
                <div
                    className={cx('search', {
                        ['search-is-collapse']: stateInput,
                    })}
                >
                    <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                        ref={inputRef}
                        onFocus={handleFocusInput}
                        onBlur={hanldeBlurInput}
                    />
                    <FontAwesomeIcon icon={faXmark} className={cx('clear')} />
                </div>
            </Tippy>
        </>
    );
}

export default Search;
