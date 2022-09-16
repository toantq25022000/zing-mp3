import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faPlay, faSearch, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';

import instance from '~/utils/axios';
import styles from './Search.module.scss';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import { userConfigSlice } from '~/redux/features/userConfig/userConfigSlice';
import { useDebounce } from '~/hooks';
import clsx from 'clsx';
import { ChangeToSlug, setNumberToThounsandLike } from '~/utils/collectionFunctionConstants';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [recommendKeyword, setRecommenedKeyword] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);

    const isOpenSearchResult = useSelector((state) => state.userConfig.isOpenSearchResult);
    const dispatch = useDispatch();

    const inputRef = useRef();
    const debounce = useDebounce(searchValue, 300);

    const handleCloseSearchResult = () => {
        if (!isOpenSearchResult) return;
        setSearchResult([]);
        dispatch(userConfigSlice.actions.setIsOpenSearchResult(false));
    };

    const handleOpenSearchWrapper = () => {
        if (isOpenSearchResult) return;
        dispatch(userConfigSlice.actions.setIsOpenSearchResult(true));
    };

    const handleClickWrapSerach = (e) => {
        e.stopPropagation();
    };

    const handleClearTextSearch = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);
        instance
            .get(`/ac-suggestions?q=${encodeURIComponent(debounce)}`)
            .then((res) => {
                setLoading(false);
                setSearchResult(res.data.items);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [debounce]);

    useEffect(() => {
        const getRecommenedKeywords = async () => {
            try {
                const response = await instance.get('/recommended-keyword');
                if (response.data) {
                    setRecommenedKeyword(() => response.data.map((item) => item.keyword));
                }
            } catch (error) {
                console.log(error);
            }
        };

        getRecommenedKeywords();
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleCloseSearchResult);

        return () => {
            document.removeEventListener('click', handleCloseSearchResult);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpenSearchResult]);
    return (
        <div className={cx('search')} onClick={handleClickWrapSerach}>
            <div
                className={cx('search-container', {
                    'search-is-collapse': isOpenSearchResult,
                })}
            >
                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                    value={searchValue}
                    onFocus={handleOpenSearchWrapper}
                    onChange={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setSearchValue(e.target.value);
                    }}
                />

                {!!searchValue && !loading && (
                    <FontAwesomeIcon icon={faXmark} className={cx('clear')} onClick={handleClearTextSearch} />
                )}
                {loading && <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />}
            </div>

            {isOpenSearchResult && (
                <div className={cx('search-result', 'suggest__list')}>
                    <WrapperPopper className={cx('popper-search', 'suggest__list--content')}>
                        <h4 className={cx('search-title')}>
                            {searchResult.length > 0 ? 'Từ khóa liên quan' : ' Đề xuất cho bạn'}
                        </h4>
                        {searchResult.length === 0 &&
                            recommendKeyword &&
                            recommendKeyword.map((keyword, index) => (
                                <div className={cx('suggest-item')} key={index}>
                                    <FontAwesomeIcon icon={faArrowTrendUp} className={cx('icon-suggest-search')} />
                                    <span className={cx('is-oneline')}>{keyword}</span>
                                </div>
                            ))}

                        {searchResult.length > 0 && (
                            <>
                                {searchResult[0]?.keywords?.map((item, index) => (
                                    <div className={cx('suggest-item')} key={index}>
                                        <FontAwesomeIcon icon={faSearch} className={cx('icon-suggest-search')} />
                                        <span className={cx('is-oneline')}>
                                            <span className={cx('keywork--highlight')}>{searchValue}</span>
                                            {item.keyword.slice(searchValue.trim().length)}
                                        </span>
                                    </div>
                                ))}
                                <div className={cx('suggest-item')}>
                                    <FontAwesomeIcon icon={faSearch} className={cx('icon-suggest-search')} />
                                    <span className={cx('is-oneline')}>
                                        Tìm kiếm <span className={cx('keywork--highlight')}>{`"${searchValue}"`}</span>
                                    </span>
                                </div>
                            </>
                        )}

                        {searchResult.length > 0 && (
                            <div className={cx('suggestion')}>
                                <h4 className={cx('search-title')}>Gợi ý kết quả</h4>
                                {searchResult[1]?.suggestions?.map((result) =>
                                    result.type === 4 ? (
                                        <div className={cx('suggest-item')} key={result.id}>
                                            <div className={cx('media')}>
                                                <div className={cx('media-left')}>
                                                    <figure className="is-rounded">
                                                        <img src={result.avatar} alt="" />
                                                    </figure>
                                                </div>
                                                <div className={cx('media-content')}>
                                                    <h3 className={cx('title')}>{result.name}</h3>
                                                    <h4 className={cx('subtitle')}>
                                                        Nghệ sĩ • {setNumberToThounsandLike(result.followers)} quan tâm
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        result.type === 1 && (
                                            <div className={cx('suggest-item', 'song-item')} key={result.id}>
                                                <div className={cx('media')}>
                                                    <div className={cx('media-left')}>
                                                        <figure className="is-rounded">
                                                            <img src={result.thumb} alt="" />
                                                        </figure>
                                                        <div className={clsx(cx('opacity-bg'), 'opacity')}></div>
                                                        <button
                                                            className={clsx(cx('action-play'), 'zm-btn')}
                                                            tabIndex="0"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faPlay}
                                                                className={cx('icon', 'icon-play')}
                                                            />
                                                        </button>
                                                    </div>
                                                    <div className={cx('media-content')}>
                                                        <h3 className={cx('title')}>
                                                            <a
                                                                href={`/album/${ChangeToSlug(result.title)}/${
                                                                    result.id
                                                                }.html`}
                                                            >
                                                                {result.title}
                                                            </a>
                                                        </h3>
                                                        <h4 className={cx('subtitle')}>
                                                            {result.artists
                                                                ?.map((artist) => artist.name)
                                                                .reduce((prev, current) => [prev, ', ', current])}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ),
                                )}
                            </div>
                        )}
                    </WrapperPopper>
                </div>
            )}
        </div>
    );
}

export default Search;

/* <button className={clsx(cx('btn-remove'), 'zm-btn')}>Xóa</button>  */
