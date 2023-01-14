import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import clsx from 'clsx';

import { getFirstSongCanPlayInPlaylist, handleGetSongAndPlaySongInPlayList } from '~/utils/collectionFunctionConstants';
import { playlistSlice } from '~/redux/features/playlist/playlistSlice';
import { songSlice } from '~/redux/features/song/songSlice';
import styles from './ZingChart.module.scss';
import instance from '~/utils/axios';
import ChartCanvas from './ChartCanvas';
import SongItem from '~/components/SongItem';

const cx = classNames.bind(styles);

const titleKeyWeekChart = {
    vn: { title: 'Việt Nam' },
    us: { title: 'US-UK' },
    korea: { title: 'K-Pop' },
};

function ZingChart() {
    //state
    const [chartRealTime, setChartRealTime] = useState(null);
    const [dataWeekChart, setDataWeekChart] = useState(null);
    const [labels, setLabels] = useState([]);
    const [dataTop3Chart, setDataTop3Chart] = useState({});
    const [dataTop3Response, setDataTop3Response] = useState({});
    const [isShowTop100, setIsShowTop100] = useState(false);
    const [playlistResult, setPlaylistResult] = useState(null);

    //redux
    const playlists = useSelector((state) => state.playlist.playlists);
    const playlistId = useSelector((state) => state.playlist.playlistId);

    const songId = useSelector((state) => state.song.songId);
    const isRandom = useSelector((state) => state.song.isRandom);
    const isPlay = useSelector((state) => state.song.isPlay);

    const dispatch = useDispatch();

    const handleShowTop100 = () => {
        setIsShowTop100(true);
    };

    const handleGetSong = async (song, idPlaylist) => {
        if (idPlaylist !== playlistId || !playlistResult) {
            instance
                .get(`/playlist?id=${idPlaylist}`)
                .then((res) => {
                    setPlaylistResult(res.data || {});
                    handleGetSongAndPlaySongInPlayList({
                        song,
                        isRandom,
                        isPlay,
                        songId,
                        playlistId,
                        idPlaylist,
                        playlists,
                        playlistResult: res.data || {},
                        songSlice,
                        playlistSlice,
                        dispatch,
                    });
                })
                .catch((err) => console.log(err));
        } else {
            playlistResult &&
                handleGetSongAndPlaySongInPlayList({
                    song,
                    isRandom,
                    isPlay,
                    songId,
                    playlistId,
                    idPlaylist,
                    playlists,
                    playlistResult: playlistResult,
                    songSlice,
                    playlistSlice,
                    dispatch,
                });
        }
    };

    useEffect(() => {
        instance
            .get('/chart-home')
            .then((res) => {
                setChartRealTime(res.data['RTChart']);
                setDataWeekChart(res.data['weekChart']);
                const groundLabels = res.data['RTChart'].chart.times.map((item) => `${item.hour}:00`);
                setLabels(groundLabels);

                const itemsTop3 = res.data['RTChart'].chart.items;
                setDataTop3Chart(itemsTop3);

                const dataSongTop3 = Object.keys(itemsTop3).map((key) =>
                    res.data['RTChart'].items.find((item) => item.encodeId === key),
                );
                setDataTop3Response(dataSongTop3);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('container', 'rt-chart-section')}>
                <div className={cx('chart-wrapper')}>
                    <div className={clsx(cx('bg-blur'), 'bg-blur')}></div>
                    <div className={clsx(cx('bg-alpha'), 'bg-alpha')}></div>
                    <div className={clsx(cx('bg-alpha-1'), 'bg-alpha-1')}></div>
                    <div className={cx('header')}>
                        <div className={cx('chart-title')}>
                            <h3 className={cx('title')}>#zingchart</h3>
                            <button className={cx('button-play-list')}>
                                <FontAwesomeIcon icon={faPlay} className={cx('icon-play')} />
                            </button>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        {chartRealTime && (
                            <ChartCanvas
                                labels={labels}
                                dataTop3Chart={dataTop3Chart}
                                dataTop3Response={dataTop3Response}
                            />
                        )}
                    </div>
                </div>

                <div className={clsx(cx('list-song'), 'mb-20')}>
                    {chartRealTime?.items &&
                        chartRealTime.items
                            ?.slice(0, !isShowTop100 ? 10 : chartRealTime.items.length)
                            .map((item, index) => (
                                <SongItem
                                    key={item.encodeId}
                                    data={item}
                                    onDoubleClickSong={(item) => handleGetSong(item)}
                                    onPlayOrPauseSong={(item) => handleGetSong(item)}
                                    isChartSongItem={true}
                                    isZingChart={true}
                                    indexSTT={index}
                                />
                            ))}
                </div>
                {!isShowTop100 && (
                    <div className="is-center">
                        <button className={cx('show-all')} onClick={handleShowTop100}>
                            Xem top 100
                        </button>
                    </div>
                )}
            </div>

            <div className={cx('container', 'week-chart-section')}>
                <div className={clsx(cx('bg-blur'), 'bg-blur')}></div>
                <div className={clsx(cx('bg-alpha'), 'bg-alpha')}></div>
                <div className={cx('header')}>
                    <div className={cx('chart-title')}>
                        <h3 className={cx('title')}>Bảng Xếp Hạng Tuần</h3>
                    </div>
                </div>
                <div className={clsx(cx('columns'), 'grid')}>
                    <div className="row">
                        {dataWeekChart &&
                            Object.keys(dataWeekChart).map((key) => (
                                <div className="col l-4 m-12 c-12 mb-30" key={key}>
                                    <div className={cx('week-chart-box', `${key}`)}>
                                        <div className={cx('box-header')}>
                                            <Link to={dataWeekChart[key].link}> {titleKeyWeekChart[key].title}</Link>
                                            <button
                                                className={cx('button-play-list')}
                                                onClick={() =>
                                                    handleGetSong(
                                                        getFirstSongCanPlayInPlaylist(dataWeekChart[key].items),
                                                        dataWeekChart[key].playlistId,
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon icon={faPlay} className={cx('icon-play')} />
                                            </button>
                                        </div>
                                        <div className={clsx(cx('list'), 'mb-15')}>
                                            {dataWeekChart[key].items.slice(0, 5).map((item, index) => (
                                                <SongItem
                                                    key={item.encodeId}
                                                    data={item}
                                                    onDoubleClickSong={() =>
                                                        handleGetSong(item, dataWeekChart[key].playlistId)
                                                    }
                                                    onPlayOrPauseSong={() =>
                                                        handleGetSong(item, dataWeekChart[key].playlistId)
                                                    }
                                                    isZingChart={true}
                                                    indexSTT={index}
                                                    isAlbum={true}
                                                />
                                            ))}
                                        </div>
                                        <div className="is-center">
                                            <Link to={dataWeekChart[key].link} className={cx('show-all')}>
                                                Xem tất cả
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ZingChart;
