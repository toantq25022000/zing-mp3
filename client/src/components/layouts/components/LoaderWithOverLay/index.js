import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import styles from './LoaderWithOVerlay.module.scss';

function LoaderWithOVerlay() {
    return (
        <div className={classNames(styles.wrapper)}>
            <div className={classNames(styles.container)}>
                <FontAwesomeIcon icon={faSpinner} className={classNames(styles.iconLoading)} />
            </div>
        </div>
    );
}

export default LoaderWithOVerlay;
