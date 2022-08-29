import classNames from 'classnames/bind';
import Image from '../Image';
import styles from './SigninButton.module.scss';

const cx = classNames.bind(styles);

function SigninButton({ title, iconSrc, alt, onClick }) {
    return (
        <div className={cx('wrapper')} onClick={onClick}>
            <Image className={cx('icon')} src={iconSrc} alt={alt} />
            <span className={cx('title')}>{title}</span>
        </div>
    );
}

export default SigninButton;
