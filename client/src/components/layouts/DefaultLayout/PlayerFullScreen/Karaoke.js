import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { songSlice } from '~/redux/features/song/songSlice';
import instance from '~/utils/axios';
import styles from './PlayerFullScreen.module.scss';
import clsx from 'clsx';

const cx = classNames.bind(styles);

function Karaoke({ audioRef }) {
    const songId = useSelector((state) => state.song.songId);
    const lyricSong = useSelector((state) => state.song.lyricSong);

    const [karaokeLyric, setKaraokeLyric] = useState([]);

    const [karaokeCurrent, setKaraokeCurrent] = useState({
        first: 0,
        second: 1,
    });

    const [indexActiveCurrent, setIndexActiveCurrent] = useState(0);

    const dispatch = useDispatch();

    const karaokeContentRef = useRef();

    const getIndexLyricCurrent = (lyrics, time) => {
        return lyrics.findIndex(
            (lyric) =>
                // get the gap or distance or we call it score

                lyric.words[lyric.words.length - 1].endTime / 1000 > time && lyric.words[0].startTime / 1000 <= time,
        );
    };

    const checkTextHighlight = (time) => {
        const textHightLights = document.querySelectorAll('.karaoke__text-clss');
        textHightLights.forEach((text, index) => {
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

    audioRef.current.ontimeupdate = () => {
        if (audioRef.current.currentTime) {
            const time = audioRef.current.currentTime;

            const indexCurrent = getIndexLyricCurrent(karaokeLyric, time);
            checkTextHighlight(time);
            if (indexCurrent === -1) {
                karaokeContentRef.current.style.flexDirection = 'column';
                setKaraokeCurrent({
                    first: 0,
                    second: 1,
                });
            } else {
                setIndexActiveCurrent(indexCurrent);
                setKaraokeCurrent({
                    first: indexCurrent,
                    second: indexCurrent + 1,
                });
            }
        }
    };

    useEffect(() => {
        if (karaokeContentRef.current) {
            if (indexActiveCurrent !== 0) {
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
    }, [indexActiveCurrent]);

    useEffect(() => {
        const getLyricSong = async () => {
            if (lyricSong) {
                setKaraokeLyric(lyricSong.sentences || []);
            } else {
                try {
                    const response = await instance.get(`/song/lyric?id=${songId}`);

                    if (response.data) {
                        dispatch(songSlice.actions.setLyricSong(response.data));
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };

        getLyricSong();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [songId, lyricSong]);

    return karaokeLyric.length === 0 ? (
        <div className={styles.karaokeEmpty}>Karaoke đang được cập nhật</div>
    ) : (
        <div className={cx('karaoke')}>
            <div className={cx('karaoke__content')} ref={karaokeContentRef}>
                <div className={cx('karaoke__text-wrapper', 'line-first')}>
                    {karaokeLyric[karaokeCurrent.first].words.map((word, index) => (
                        <div
                            className={clsx(cx('karaoke__text'), 'karaoke__text-clss')}
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
                <div className={cx('karaoke__text-wrapper', 'line-second')}>
                    {karaokeLyric[karaokeCurrent.second].words.map((word, index) => (
                        <div
                            className={cx('karaoke__text')}
                            data-starttime={word.startTime / 1000}
                            data-endtime={word.endTime / 1000}
                            key={index}
                        >
                            <div className={cx('karaoke__text--fill')}>
                                <div className={cx('karaoke__text--fill-wrapper')}>{word.data}</div>
                            </div>
                            <div className={cx('karaoke__text--text')}>{word.data}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Karaoke;
