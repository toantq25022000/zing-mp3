import classNames from 'classnames/bind';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import instance from '~/utils/axios';
import styles from './PlayerFullScreen.module.scss';

const cx = classNames.bind(styles);

function Lyric({ audioRef }) {
    const songId = useSelector((state) => state.song.songId);
    const songInfo = useSelector((state) => state.song.songInfo);

    const [lyrics, setLyrics] = useState([]);

    const handleUpdateLyricNew = () => {
        const listSentences = document.querySelectorAll('.sentence-item');
        if (listSentences) {
            for (let i = 0; i < listSentences.length; i++) {
                const timeStartEle = parseFloat(listSentences[i].getAttribute('data-starttime'));

                const timeStartEleNext =
                    i === listSentences.length - 1
                        ? audioRef.current.duration
                        : parseFloat(listSentences[i + 1].getAttribute('data-starttime'));

                const itemIndex0 = listSentences[0];
                const timeStartElement0 = parseFloat(itemIndex0.getAttribute('data-starttime'));

                if (audioRef.current.currentTime < timeStartElement0) {
                    listSentences[i].classList.remove('is-over-lyric');
                    listSentences[i].classList.remove('is-active-lyric');
                } else {
                    if (
                        timeStartEle < audioRef.current.currentTime &&
                        audioRef.current.currentTime > timeStartEleNext - 0.6
                    ) {
                        if (listSentences[i].classList.contains('is-active-lyric')) {
                            listSentences[i].classList.remove('is-active-lyric');
                        }
                        listSentences[i].classList.add(cx('is-over-lyric'));
                    } else if (
                        timeStartEle - 0.5 <= audioRef.current.currentTime &&
                        audioRef.current.currentTime < timeStartEleNext
                    ) {
                        listSentences[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
                        if (listSentences[i].classList.contains('is-over-lyric')) {
                            listSentences[i].classList.remove('is-over-lyric');
                        }
                        if (!listSentences[i].classList.contains('is-active-lyric')) {
                            listSentences[i].classList.add('is-active-lyric');
                        }
                    } else {
                        listSentences[i].classList.remove(cx('is-over-lyric'));
                        listSentences[i].classList.remove(cx('is-active-lyric'));
                    }
                }
            }
        }
    };

    audioRef.current.ontimeupdate = () => {
        if (audioRef.current.currentTime) {
            handleUpdateLyricNew();
        }
    };

    useEffect(() => {
        const getLyric = async () => {
            try {
                const response = await instance.get(`/song/lyric/${songId}`);
                if (response.data) {
                    const arrayLyric = response.data.sentences.map((sentence) => {
                        return {
                            startTime: sentence.words[0].startTime / 1000,
                            sentence: sentence.words.map((word) => word.data).join(' '),
                        };
                    });
                    setLyrics(arrayLyric);
                    // console.log(arrayLyric);
                }

                const scrollContentElement = document.querySelector('.scroll-content-lyric');
                scrollContentElement.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.log(error);
            }
        };
        getLyric();
    }, [songId]);

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
                        </div>
                    </div>
                </div>
                <div className={clsx(cx('column', 'is-size-S', 'fullhd-7'), 'col', 'l-7', 'm-12')}>
                    <div className={clsx(cx('scroll-content'), 'scroll-content-lyric')}>
                        {lyrics.map((lyric, index) => (
                            <p
                                key={index}
                                className={clsx(cx('item'), 'sentence-item')}
                                data-starttime={lyric.startTime}
                            >
                                {lyric.sentence}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lyric;
