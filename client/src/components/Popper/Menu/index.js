import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

import { Wrapper as WrapperPopper } from '../../Popper';

const cx = classNames.bind(styles);

function Menu({ children, items = [], className, placement, trigger }) {
    const renderItems = () => {
        return items.map((item, index) => <MenuItem key={index} data={item} />);
    };
    return (
        <div>
            <Tippy
                interactive
                // visible={true}
                placement={placement}
                trigger={trigger}
                render={(attrs) => (
                    <div className={cx('menu-setting')} tabIndex="-1" {...attrs}>
                        <WrapperPopper className={className}>{renderItems()}</WrapperPopper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Menu;
