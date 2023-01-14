import classNames from 'classnames/bind';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collectSlice } from '~/redux/features/collect/collectSlice';
import { songSlice } from '~/redux/features/song/songSlice';
import instance from '~/utils/axios';
import { getRadomTwoBGLyric } from '~/utils/collectionFunctionConstants';
import { SpinnerLoadIcon } from '../../components/Icons';
import styles from './PlayerFullScreen.module.scss';

const cx = classNames.bind(styles);

function Lyric({ audioRef }) {
    const songId = useSelector((state) => state.song.songId);
    const songInfo = useSelector((state) => state.song.songInfo);
    const isPlay = useSelector((state) => state.song.isPlay);
    const lyricSong = useSelector((state) => state.song.lyricSong);
    const sizeTextLyric = useSelector((state) => state.userConfig.sizeTextLyric);

    const [lyrics, setLyrics] = useState([]);
    const [indexTextHighLight, setIndexTextHighLight] = useState(0);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    // lyrics (Array) - output from parseLyric function
    // time (Number) - current time from audio player
    const syncLyric = (lyrics, time) => {
        const scores = [];

        lyrics.forEach((lyric) => {
            // get the gap or distance or we call it score
            const score = time - lyric.time;

            // only accept score with positive values
            if (score >= 0) scores.push(score);
        });

        if (scores.length === 0) return 0;

        // get the smallest value from scores
        const closest = Math.min(...scores);

        // return the index of closest lyric
        return scores.indexOf(closest);
    };

    const handleHighlightLyricText = (indexTextSong) => {
        const listSentences = document.querySelectorAll('.sentence-item');
        if (listSentences) {
            listSentences.forEach((item) => {
                item.classList.remove('is-over-lyric');
                item.classList.remove('is-active-lyric');
            });

            listSentences.forEach((item, index) => {
                if (index === indexTextSong) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    item.classList.add('is-active-lyric');
                } else if (index < indexTextSong) {
                    if (item.classList.contains('is-active-lyric')) {
                        item.classList.remove('is-active-lyric');
                    }
                    item.classList.add(cx('is-over-lyric'));
                }
            });
        }
    };

    const handleUpdateHighlightLyricSync = (timeCurrent) => {
        const indexTextSong = syncLyric(lyrics, timeCurrent);

        setIndexTextHighLight(indexTextSong);

        if (indexTextSong !== indexTextHighLight) {
            handleHighlightLyricText(indexTextSong);
        }
    };

    // parse formated time
    // "03:24.73" => 204.73 (total time in seconds)
    const parseTime = (time) => {
        const minsec = time.split(':');

        const min = parseInt(minsec[0]) * 60;
        const sec = parseFloat(minsec[1]);

        return min + sec;
    };

    // lrc (String) - lrc file text
    const parseLyric = (lrc) => {
        // will match "[00:00.00] ooooh yeah!"
        // note: i use named capturing group
        const regex = /^\[(?<time>\d{2}:\d{2}(.\d{2})?)\](?<text>.*)/;

        // split lrc string to individual lines
        const lines = lrc.split('\n');

        const output = [];

        lines.forEach((line) => {
            const match = line.match(regex);

            // if doesn't match, return.
            if (match == null) return;

            const { time, text } = match.groups;
            if (text) {
                output.push({
                    time: parseTime(time),
                    text: text.trim(),
                });
            }
        });

        return output;
    };

    const readLrcSong = async (fileUrl) => {
        const res = await fetch(fileUrl);
        const lrc = await res.text();
        const lyricsResult = parseLyric(lrc);
        setLyrics(lyricsResult);
    };

    audioRef.current.ontimeupdate = () => {
        if (audioRef.current.currentTime) {
            handleUpdateHighlightLyricSync(audioRef.current.currentTime);
        }
    };

    audioRef.current.onchange = () => {
        handleUpdateHighlightLyricSync(audioRef.current.currentTime);
    };

    useEffect(() => {
        const getLyric = async () => {
            //Have lyyric song
            if (lyricSong && lyricSong.encodeId === songId) {
                dispatch(collectSlice.actions.setListBackgroundLyric(lyricSong.data.defaultIBGUrls || []));
                readLrcSong(lyricSong?.data?.file);
            } else {
                //Haven't lyric song => call api
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

                        console.log('call');
                        dispatch(collectSlice.actions.setListBackgroundLyric(response.data.defaultIBGUrls || []));
                        dispatch(collectSlice.actions.setArrayIndexListBGRandomLyric([]));

                        getRadomTwoBGLyric(response.data.defaultIBGUrls, [], collectSlice, dispatch);
                        readLrcSong(response.data.file);
                    }
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    console.log(error);
                }
            }
        };
        getLyric();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [songId]);

    useEffect(() => {
        if (!isPlay) {
            const time = audioRef.current.currentTime;
            const indexTextSong = syncLyric(lyrics, time);
            setIndexTextHighLight(indexTextSong);
            handleHighlightLyricText(indexTextSong);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lyrics]);

    return (
        <div className={clsx(cx('lyric'), 'grid')}>
            <div className={clsx(cx('columns', 'is-multiline'), 'row')}>
                <div className={clsx(cx('column', 'fullhd-5'), 'col', 'l-5', 'm-0')}>
                    <div className={cx('song-item')}>
                        <div className={cx('cover')}>
                            <figure className={cx('image')}>
                                <img
                                    src={
                                        songInfo.thumbnail.replace('w94', 'w480') ||
                                        songInfo.thumbnailM.replace('w240', 'w480')
                                    }
                                    alt=""
                                />
                            </figure>
                            {isPlay ? <i className={cx('playing-icon-gif')}></i> : <></>}
                        </div>
                    </div>
                </div>
                <div className={clsx(cx('column', `is-size-${sizeTextLyric}`, 'fullhd-7'), 'col', 'l-7', 'm-12')}>
                    {loading ? (
                        <div className={cx('loading')}>
                            <SpinnerLoadIcon />
                        </div>
                    ) : (
                        <div className={clsx(cx('scroll-content'), 'scroll-content-lyric')}>
                            {lyrics?.map((lyric, index) => (
                                <p
                                    key={index}
                                    className={clsx(cx('item'), 'sentence-item')}
                                    data-index={index}
                                    data-time={lyric.time}
                                >
                                    {lyric.text}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Lyric;
