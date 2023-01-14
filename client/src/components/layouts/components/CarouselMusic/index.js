import clsx from 'clsx';
import classNames from 'classnames/bind';
import Card from '../Card';
import styles from './CarouselMusic.module.scss';

const cx = classNames.bind(styles);

function CarouselMusic({ data, title }) {
    const dataRadomMix = data.sectionType === 'mix' && data.items.sort(() => Math.random() - 0.5);
    return (
        <div className={clsx(cx('wrapper'), 'grid')}>
            <h3 className={cx('title')}>{title || 'Playlist/Album'}</h3>
            <div className={clsx(cx('carousel-list'), 'row')}>
                {dataRadomMix
                    ? dataRadomMix.map((item, index) => (
                          <div key={index} className={clsx(cx('carousel-item'), 'col', 'l-2-4', 'm-3', 'c-4')}>
                              <Card data={item} isMix={true} />
                          </div>
                      ))
                    : data.items.map((item, index) => (
                          <div key={index} className={clsx(cx('carousel-item'), 'col', 'l-2-4', 'm-3', 'c-4')}>
                              <Card data={item} isMix={false} />
                          </div>
                      ))}
            </div>
        </div>
    );
}

export default CarouselMusic;
