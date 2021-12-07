import Navbar from './Navbar';

import styles from '../styles/Layout.module.css';
import Loader from './Loader';

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Loader />
            <Navbar />
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default Layout;
