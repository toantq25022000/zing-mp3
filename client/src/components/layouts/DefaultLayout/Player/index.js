import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart as faHeartSolid,
    faMicrophone,
    faEllipsis,
    faShuffle,
    faBackwardStep,
    faPlay,
    faForwardStep,
    faRandom,
    faRepeat,
    faPause,
    faVideo,
    faExpand,
    faVolumeLow,
    faList,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular, faListAlt } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './Player.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Player() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('player-controls')}>
                    <div className={cx('player-controls__left')}>
                        <div className={cx('song-detail')}>
                            <div className={cx('song-thumb')}>
                                <Link to="/">
                                    <div className={cx('thumb')}>
                                        <figure className="image">
                                            <img
                                                src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/covers/d/3/d3987e294552bfd40eeb770946a8db2d_1375685055.jpg"
                                                alt=""
                                            />
                                        </figure>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('song-info')}>
                                <div className={cx('name-wrapper')}>
                                    <span className={cx('name')}>Đừng Về Trễ (Acoustic Version)</span>
                                </div>
                                <h3 className={cx('artist')}>
                                    <Link to="/Son-Tung-M-TP" className={cx('is-ghost')}>
                                        Sơn Tùng M-TP
                                    </Link>
                                </h3>
                            </div>
                            <div className={cx('actions-song-left')}>
                                <div className={clsx(cx('level-left'), 'level')}>
                                    <div className={cx('level-item')}>
                                        <button
                                            className={clsx(
                                                cx('animation-like', 'icon-width'),
                                                'is-hover-circle',
                                                'zm-btn',
                                            )}
                                        >
                                            <span className={cx('icon', 'is-like')}>
                                                <FontAwesomeIcon icon={faHeartRegular} className={cx('icon-hover')} />
                                            </span>
                                            <span className={cx('icon', 'is-like-full')}>
                                                <FontAwesomeIcon icon={faHeartSolid} className={cx('icon-hover')} />
                                            </span>
                                        </button>
                                    </div>
                                    <div className={cx('level-item')}>
                                        <button className={clsx(cx('more', 'icon-width'), 'is-hover-circle', 'zm-btn')}>
                                            <FontAwesomeIcon icon={faEllipsis} className={cx('icon-hover')} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('player-controls__player-bar')}>
                        <div className={cx('level-item')}>
                            <div className={cx('controls')}>
                                <button className={clsx(cx('tooltip-btn', 'icon-width'), 'is-hover-circle', 'zm-btn')}>
                                    <FontAwesomeIcon icon={faShuffle} className={cx('icon-hover')} />
                                </button>
                                <button className={clsx(cx('tooltip-btn', 'icon-width'), 'is-hover-circle', 'zm-btn')}>
                                    <FontAwesomeIcon icon={faBackwardStep} className={cx('icon-hover')} />
                                </button>
                                <button className={clsx(cx('tooltip-btn', 'btn-play'), 'zm-btn')}>
                                    <FontAwesomeIcon icon={faPlay} className={cx('icon-hover', 'icon-play')} />
                                </button>
                                <button className={clsx(cx('tooltip-btn', 'icon-width'), 'is-hover-circle', 'zm-btn')}>
                                    <FontAwesomeIcon icon={faForwardStep} className={cx('icon-hover')} />
                                </button>
                                <button className={clsx(cx('tooltip-btn', 'icon-width'), 'is-hover-circle', 'zm-btn')}>
                                    <FontAwesomeIcon icon={faRepeat} className={cx('icon-hover')} />
                                </button>
                            </div>
                        </div>
                        <div className={clsx(cx('level-item'), 'mb-5')}>
                            <div className={cx('time-left')}>01:02</div>
                            <div className={cx('duration-bar')}>
                                <div className={cx('slider-bar')}></div>
                            </div>
                            <div className={cx('time-left')}>03:04</div>
                        </div>
                    </div>
                    <div className={cx('player-controls__right')}>
                        <div className={cx('level-item')}>
                            <button className={clsx(cx('tooltip-btn', 'icon-width'), 'is-hover-circle', 'zm-btn')}>
                                <FontAwesomeIcon icon={faVideo} className={cx('icon-hover')} />
                            </button>
                        </div>

                        <div className={cx('level-item')}>
                            <button className={clsx(cx('tooltip-btn', 'icon-width'), 'is-hover-circle', 'zm-btn')}>
                                <FontAwesomeIcon icon={faMicrophone} className={cx('icon-hover')} />
                            </button>
                        </div>

                        <div className={cx('level-item')}>
                            <button className={clsx(cx('tooltip-btn', 'icon-width'), 'is-hover-circle', 'zm-btn')}>
                                <FontAwesomeIcon icon={faExpand} className={cx('icon-hover')} />
                            </button>
                        </div>
                        <div className={cx('level-item')}>
                            <div className={cx('group-volumn')}>
                                <button className={clsx(cx('tooltip-btn', 'icon-width'), 'is-hover-circle', 'zm-btn')}>
                                    <FontAwesomeIcon icon={faVolumeLow} className={cx('icon-hover')} />
                                </button>
                                {/* <div className={cx('duration-bar')}>
                                    <div className={cx('slider-bar')}></div>
                                </div> */}
                                <input type="range" className={cx('volumn-input')} />
                            </div>
                        </div>
                        <div className={cx('level-item')}>
                            <button className={clsx(cx('tooltip-btn', 'icon-width'), 'is-hover-circle', 'zm-btn')}>
                                <FontAwesomeIcon icon={faList} className={cx('icon-hover')} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Player;
