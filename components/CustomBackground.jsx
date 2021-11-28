import styles from '../styles/CustomBackground.module.css';

const CustomBackground = ({ children }) => {
    return (
        <div className={styles.main}>
            <div className={`${styles.background}`}>
                <ul className={`${styles.circles}`}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            {children}
        </div>
    );
};

export default CustomBackground;
