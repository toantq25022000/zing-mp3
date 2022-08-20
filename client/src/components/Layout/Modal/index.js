import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ children, className, onClickOverLay }) {
    const handleClickContent = (e) => {
        e.stopPropagation();
    };
    return (
        <div className={cx('overlay')} onClick={onClickOverLay}>
            <div className={cx('container', className)} onClick={handleClickContent}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default Modal;
