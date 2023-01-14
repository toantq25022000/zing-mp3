import classNames from 'classnames/bind';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button(
    {
        to,
        href,
        outlined = false,
        rounded = false,
        small = false,
        active = false,
        upper = false,
        disabled = false,
        children,
        tooltip = false,
        leftIcon,
        rightIcon,
        className,
        onClick,
        ...passProps
    },
    ref,
) {
    let Comp = 'button';
    let props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    //Remove event listeners when button is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    const classes = cx('wrapper', {
        [className]: className,
        outlined,
        rounded,
        small,
        upper,
        tooltip,
        active,
        disabled,
    });

    return (
        <Comp ref={ref} className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            {children && <span className={cx('title')}>{children}</span>}
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default forwardRef(Button);
