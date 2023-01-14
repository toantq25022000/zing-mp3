import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { songSlice } from '~/redux/features/song/songSlice';
import instance from '~/utils/axios';
import styles from './PlayerFullScreen.module.scss';
import clsx from 'clsx';
import { SpinnerLoadIcon } from '../../components/Icons';
import { collectSlice } from '~/redux/features/collect/collectSlice';
import { getRadomTwoBGLyric } from '~/utils/collectionFunctionConstants';

const cx = classNames.bind(styles);

function Karaoke({ audioRef }) {
    const songId = useSelector((state) => state.song.songId);
    const songInfo = useSelector((state) => state.song.songInfo);
    const lyricSong = useSelector((state) => state.song.lyricSong);

    const [karaokeLyric, setKaraokeLyric] = useState([]);

    const [karaokeCurrent, setKaraokeCurrent] = useState({
        first: 0,
        second: 1,
    });

    const [indexActiveCurrent, setIndexActiveCurrent] = useState(0);
    const [endTimeKaraoke, setEndTimeKaraoke] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const karaokeContentRef = useRef();
    const karaokeLineFirst = useRef();
    const karaokeLineSecond = useRef();

    const getIndexLyricCurrent = (lyrics, time) => {
        const wordEnd = lyrics[lyrics.length - 1];
        const checkEnd = wordEnd.words[wordEnd.words.length - 1].endTime / 1000;
        if (time > checkEnd) {
            return null;
        }

        return lyrics.findIndex(
            (lyric) =>
                // get the gap or distance or we call it score
                lyric.words[lyric.words.length - 1].endTime / 1000 > time && lyric.words[0].startTime / 1000 <= time,
        );
    };

    const checkIndexNearestTimeCurrent = (lyrics, time) => {
        if (time < lyrics[0].words[0].startTime / 1000) {
            return 0;
        } else {
            return indexActiveCurrent;
        }
    };

    const checkTextHighlight = (time) => {
        const textHightLights = document.querySelectorAll('.karaoke__text-clss');

        textHightLights.forEach((text) => {
            const startTime = parseFloat(text.getAttribute('data-starttime'));
            const endtTime = parseFloat(text.getAttribute('data-endtime'));
            const childrenElement = text.querySelector('.karaoke__text--fill');

            if (time > startTime && time > endtTime) {
                text.classList.add(cx('is-previous'));
                text.classList.remove(cx('is-pending'));
                childrenElement.style.width = `100%`;
            } else if (time >= startTime && time < endtTime) {
                const percent = (((time - startTime) / (endtTime - startTime)) * 100).toFixed(2);

                text.classList.remove(cx('is-previous'));
                text.classList.add(cx('is-pending'));
                if (childrenElement) {
                    childrenElement.style.width = `${percent}%`;
                }
            } else {
                text.classList.remove(cx('is-previous'));
                text.classList.remove(cx('is-pending'));
            }
        });
    };

    const handleHighLightKaraokeAudioChange = () => {
        if (audioRef.current.currentTime) {
            const time = audioRef.current.currentTime;

            const indexCurrent = getIndexLyricCurrent(karaokeLyric, time);
            if (indexCurrent === null) {
                checkTextHighlight(time);
                setEndTimeKaraoke(true);
                return;
            }

            setEndTimeKaraoke(false);

            if (indexCurrent === karaokeLyric.length - 1) {
                const childrenSecondTexts = karaokeLineSecond.current.querySelectorAll('.karaoke__text');
                if (childrenSecondTexts)
                    childrenSecondTexts.forEach((item) => item.classList.add('karaoke__text-clss'));

                setKaraokeCurrent({
                    first: karaokeLyric.length - 2,
                    second: karaokeLyric.length - 1,
                });
            } else {
                if (indexCurrent === -1) {
                    const resultIndex = checkIndexNearestTimeCurrent(karaokeLyric, time);
                    if (resultIndex === 0) {
                        if (karaokeContentRef.current) karaokeContentRef.current.style.flexDirection = 'column';
                    }
                    const textHightLights = document.querySelectorAll('.karaoke__text-clss');

                    textHightLights.forEach((text) => {
                        const childrenElement = text.querySelector('.karaoke__text--fill');
                        if (childrenElement) {
                            childrenElement.style.width = `0%`;
                        }
                        text.classList.remove(cx('is-previous'));
                        text.classList.remove(cx('is-pedding'));
                    });

                    setIndexActiveCurrent(resultIndex);
                    setKaraokeCurrent({
                        first: resultIndex,
                        second: resultIndex + 1,
                    });
                } else {
                    setIndexActiveCurrent(indexCurrent);
                    setKaraokeCurrent({
                        first: indexCurrent,
                        second: indexCurrent + 1,
                    });
                }
            }
            checkTextHighlight(time);
        }
    };

    audioRef.current.ontimeupdate = () => {
        if (karaokeLyric.length > 0) handleHighLightKaraokeAudioChange();
    };

    useEffect(() => {
        let handlerTimeout;
        if (karaokeContentRef.current) {
            if (indexActiveCurrent !== 0) {
                if (karaokeLineSecond.current && karaokeLineFirst.current) {
                    karaokeLineSecond.current.style.opacity = '0';
                    karaokeLineSecond.current.style.transition = 'none';
                    handlerTimeout = setTimeout(() => {
                        karaokeLineSecond.current.style.opacity = '1';
                        karaokeLineSecond.current.style.transition = 'opacity 0.5s ease-out';
                    }, 500);
                    karaokeLineFirst.current.style.opacity = '1';
                }

                const textHightLights = document.querySelectorAll('.karaoke__text-clss');

                textHightLights.forEach((text) => {
                    const childrenElement = text.querySelector('.karaoke__text--fill');
                    if (childrenElement) {
                        childrenElement.style.width = `0%`;
                    }
                    text.classList.remove(cx('is-previous'));
                    text.classList.remove(cx('is-pedding'));
                });
                if (karaokeContentRef.current.style.flexDirection === 'column') {
                    karaokeContentRef.current.style.flexDirection = 'column-reverse';
                } else {
                    karaokeContentRef.current.style.flexDirection = 'column';
                }
            }
        }

        return () => clearTimeout(handlerTimeout);
    }, [indexActiveCurrent]);

    useEffect(() => {
        const getLyricSong = async () => {
            if (lyricSong && lyricSong.encodeId === songId) {
                dispatch(collectSlice.actions.setListBackgroundLyric(lyricSong.data.defaultIBGUrls || []));
                setKaraokeLyric(lyricSong.data.sentences || []);
            } else {
                setLoading(true);
                try {
                    const response = await instance.get(`/song/lyric?id=${songId}`);

                    if (response.data) {
                        dispatch(
                            songSlice.actions.setLyricSong({
                                encodeId: songId,
                                data: response.data,
                            }),
                        );
                        dispatch(collectSlice.actions.setListBackgroundLyric(response.data.defaultIBGUrls || []));
                        dispatch(collectSlice.actions.setArrayIndexListBGRandomLyric([]));

                        getRadomTwoBGLyric(response.data.defaultIBGUrls, [], collectSlice, dispatch);

                        setKaraokeLyric(response.data.sentences || []);
                    }
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    console.log(error);
                }
            }
            setKaraokeCurrent({ first: 0, second: 1 });
        };

        getLyricSong();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [songId]);

    return karaokeLyric.length === 0 ? (
        <div className={styles.karaokeEmpty}>Karaoke đang được cập nhật</div>
    ) : loading ? (
        <div className={cx('loading')}>
            <SpinnerLoadIcon />
        </div>
    ) : (
        <div className={cx('karaoke')}>
            <div className={cx('karaoke__content')} ref={karaokeContentRef}>
                {endTimeKaraoke ? (
                    <div className={cx('karaoke__title-wrapper')}>
                        <div className={cx('title')}>{songInfo.title}</div>
                        <div className={cx('subtitle')}>
                            {songInfo.artists
                                ?.map((artist) => artist.name)
                                .reduce((prev, current) => [prev, ', ', current])}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={cx('karaoke__text-wrapper', 'karaoke__line-first')} ref={karaokeLineFirst}>
                            {karaokeLyric[karaokeCurrent.first].words.map((word, index) => (
                                <div
                                    className={clsx(cx('karaoke__text'), 'karaoke__text', 'karaoke__text-clss')}
                                    data-starttime={word.startTime / 1000}
                                    data-endtime={word.endTime / 1000}
                                    key={index}
                                >
                                    <div className={clsx(cx('karaoke__text--fill'), 'karaoke__text--fill')}>
                                        <div className={cx('karaoke__text--fill-wrapper')}>{word.data}</div>
                                    </div>
                                    <div className={cx('karaoke__text--text')}>{word.data}</div>
                                </div>
                            ))}
                        </div>
                        <div className={cx('karaoke__text-wrapper', 'karaoke__line-second')} ref={karaokeLineSecond}>
                            {karaokeLyric[karaokeCurrent.second].words.map((word, index) => (
                                <div
                                    className={clsx(cx('karaoke__text'), 'karaoke__text')}
                                    data-starttime={word.startTime / 1000}
                                    data-endtime={word.endTime / 1000}
                                    key={index}
                                >
                                    <div className={clsx(cx('karaoke__text--fill'), 'karaoke__text--fill')}>
                                        <div className={cx('karaoke__text--fill-wrapper')}>{word.data}</div>
                                    </div>
                                    <div className={cx('karaoke__text--text')}>{word.data}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Karaoke;
