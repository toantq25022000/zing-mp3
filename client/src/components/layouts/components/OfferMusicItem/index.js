import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './OfferMusicItem.module.scss';

const cx = classNames.bind(styles);

function OfferMusicItem({ label }) {
    return (
        <div className={cx('wrapper')}>
            <FontAwesomeIcon icon={faArrowTrendUp} className={cx('icon')} />
            <span className={cx('label')}>{label}</span>
        </div>
    );
}

export default OfferMusicItem;
