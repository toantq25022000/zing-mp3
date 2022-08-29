import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './FormInput.module.scss';

const cx = classNames.bind(styles);

const FormInput = ({ label, help, message, invalid = false, inputRef, ...rest }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('labelGroup')}>{label && <label className={cx('label')}>{label}</label>}</div>
            <div
                className={cx('inputWrap', {
                    invalid,
                })}
            >
                {inputRef ? <input ref={inputRef} {...rest} /> : <input {...rest} />}
            </div>
            {message && <div className={cx('message')}>{message}</div>}
            {help && <div className={cx('help')}>{help}</div>}
        </div>
    );
};

FormInput.propTypes = {
    label: PropTypes.string,
};

export default FormInput;
