import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import classNames from 'classnames/bind';
import clsx from 'clsx';

import styles from './ChartCanvas.module.scss';

const cx = classNames.bind(styles);

Chart.register(...registerables);

const dataBorderColor = ['#4a90e2', '#27bd9c', '#e35050'];

function ChartCanvas({ labels, dataTop3Chart, dataTop3Response }) {
    const plugins = [
        {
            id: 'tooltipLine',
            beforeDraw: (chart) => {
                if (chart.tooltip._active && chart.tooltip._active.length > 0) {
                    const ctx = chart.ctx;
                    ctx.save();

                    const activePoint = chart.tooltip._active[0];

                    ctx.beginPath();

                    ctx.moveTo(activePoint.element.x, chart.chartArea.top);
                    ctx.lineTo(activePoint.element.x, activePoint.element.y);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = dataBorderColor[activePoint.datasetIndex];
                    ctx.stroke();
                    ctx.restore();

                    ctx.beginPath();
                    ctx.moveTo(activePoint.element.x, activePoint.element.y);
                    ctx.lineTo(activePoint.element.x, chart.chartArea.bottom);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = dataBorderColor[activePoint.datasetIndex];
                    ctx.stroke();
                    ctx.restore();
                }
            },
        },
    ];

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    display: false,
                },
                stacked: true,
                grace: '7%',
                grid: {
                    display: true,
                    color: '#7c9799',
                    borderDash: [3],
                },
            },
            x: {
                grid: {
                    display: false,
                },
                stacked: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                intersect: false,
                enabled: false,
                external: function (context) {
                    // Tooltip Element
                    let tooltipEl = document.getElementById('zm-chart-tooltip');
                    const caretTooltip = document.querySelector('.caret-chart-tooltip');

                    // Hide if no tooltip
                    const tooltipModel = context.tooltip;
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
                    }
                    const pointDataTooltip = tooltipModel.dataPoints[0].dataset;
                    const pointDataCurrent = dataTop3Response.find((item) => item.encodeId === pointDataTooltip.stack);

                    const imageSongTooltip = tooltipEl.querySelector('img');
                    const titleSongTooltip = tooltipEl.querySelector('.chartjs-song-thumb');
                    const artistsSongTooltip = tooltipEl.querySelector('.chartjs-song-artists');
                    const percentRankSongTooltip = tooltipEl.querySelector('.chartjs-song-right-percent');

                    if (imageSongTooltip) {
                        imageSongTooltip.src = pointDataCurrent.thumbnail || pointDataCurrent.thumbnailM;
                    }

                    if (titleSongTooltip) titleSongTooltip.innerHTML = pointDataCurrent.title;
                    if (artistsSongTooltip) artistsSongTooltip.innerHTML = pointDataCurrent.artistsNames;
                    if (tooltipModel.yAlign) {
                        tooltipEl.classList.add(tooltipModel.yAlign);
                    }
                    if (percentRankSongTooltip)
                        percentRankSongTooltip.innerHTML = `<span>${pointDataTooltip.percent}</span>%`;

                    // Display, position, and set styles for font
                    tooltipEl.style.color = tooltipModel.labelColors[0].borderColor;
                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.left = context.chart.canvas.offsetLeft + tooltipModel.caretX - 90 + 'px';
                    tooltipEl.style.top = tooltipModel.caretY - 70 + 'px';
                    tooltipEl.style.backgroundColor = tooltipModel.labelColors[0].borderColor;
                    const deviantMax =
                        tooltipModel.caretX + tooltipEl.offsetWidth / 2 - context.chart.canvas.offsetWidth;
                    if (tooltipModel.caretX + tooltipEl.offsetWidth / 2 > context.chart.canvas.offsetWidth) {
                        tooltipEl.style.left = tooltipModel.caretX - 90 - deviantMax + 10 + 'px';
                        caretTooltip.style.left = `calc(50% + ${deviantMax - 17}px )`;
                    } else {
                        caretTooltip.style.left = `calc(50% - 7px)`;
                    }
                    const deviantMin = tooltipModel.caretX - tooltipEl.offsetWidth / 2;
                    if (tooltipModel.caretX - tooltipEl.offsetWidth / 2 < 0) {
                        tooltipEl.style.left = tooltipModel.caretX - 90 - deviantMin + 'px';
                        caretTooltip.style.left = `calc(50% + ${deviantMin - 7}px )`;
                    }
                },
            },
        },
    };

    const getPercentSongRank = (sumData, currentData) => {
        let totalData = 0;
        const totalCurrentData = currentData.reduce((prev, next) => prev + next, 0);
        Object.keys(sumData).forEach((key) =>
            sumData[key].forEach((item) => {
                totalData += item.counter;
            }),
        );
        const percentValue = Math.round((totalCurrentData / totalData) * 100);
        return percentValue;
    };

    return (
        <>
            <Line
                className={cx('chartjs-render-monitor')}
                id="chart-size-monitor"
                options={options}
                data={{
                    labels: labels.map((item, index) => (index % 2 === 0 ? item : '')),
                    datasets: Object.keys(dataTop3Chart).map((key, index) => ({
                        stack: key,
                        borderColor: dataBorderColor[index],
                        pointHoverBorderColor: 'white',
                        pointBorderColor: dataBorderColor[index],
                        pointHoverBackgroundColor: dataBorderColor[index],
                        pointBackgroundColor: 'white',
                        pointBorderWidth: 3,
                        pointHoverBorderWidth: 3,
                        pointRadius: 5,
                        pointHoverRadius: 5,
                        data: dataTop3Chart[key].map((value) => value.counter),
                        fill: false,
                        borderWidth: '1.7',
                        tension: 0.25,
                        percent: getPercentSongRank(
                            dataTop3Chart,
                            dataTop3Chart[key].map((value) => value.counter),
                        ),
                    })),
                }}
                plugins={plugins}
                height="300"
            />
            <div id="zm-chart-tooltip" className={cx('zm-chart-tooltip')}>
                <div className={cx('song-data')}>
                    <div className={cx('song-left')}>
                        <img
                            className={cx('song-thumb')}
                            src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/2/8/9/2/2892c3530e93895b6605cea040c749e0.jpg"
                            alt=""
                        />
                    </div>
                    <div className={cx('song-info')}>
                        <div className={clsx(cx('song-title'), 'chartjs-song-thumb')}>Có Chơi Có Chịu</div>
                        <div className={clsx(cx('song-artists'), 'chartjs-song-artists')}>Karik, Only C</div>
                    </div>
                    <span className={clsx(cx('song-right'), 'chartjs-song-right-percent')}>
                        <span>47</span>%
                    </span>
                </div>
                <span className={clsx(cx('caret'), 'caret-chart-tooltip')}></span>
            </div>
        </>
    );
}

export default ChartCanvas;
