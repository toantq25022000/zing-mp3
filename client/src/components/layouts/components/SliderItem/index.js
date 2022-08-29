import classNames from 'classnames/bind';
import styles from './SliderItem.module.scss';

const cx = classNames.bind(styles);

function SliderItem({ imgSrc }) {
    return (
        <div className={cx('wrapper')}>
            <figure className={cx('figure')}>
                <img src={imgSrc} alt="" className={cx('img')} />
            </figure>
        </div>
    );
}

export default SliderItem;
