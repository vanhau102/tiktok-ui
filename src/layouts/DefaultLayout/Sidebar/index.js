import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Narbar() {
    return <aside className={cx('wrapper')}>
        <h2>Navbar</h2>
    </aside>;
}

export default Narbar;