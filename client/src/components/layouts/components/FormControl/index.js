import classNames from 'classnames/bind';
import styles from './FormControl.module.scss';

const cx = classNames.bind(styles);

function FormControl({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default FormControl;
