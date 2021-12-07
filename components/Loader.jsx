import { useStoreState } from 'easy-peasy';

import styles from '../styles/Loader.module.css';

const Loader = () => {
    const loader_shown = useStoreState(
        (store) => store.loaderModel.loader_shown,
    );

    return (
        <div id={styles.box} className={loader_shown ? 'shown' : ''}>
            <svg className={styles.svg}>
                <filter id='glowfloxs'>
                    <feGaussianBlur in='SourceGraphic' stdDeviation='10' />
                    <feColorMatrix
                        values='
                         1 0 0 0 0                      
                         0 1 0 0 0                       
                         0 0 1 0 0                       
                         0 0 0 20 -10'
                    ></feColorMatrix>
                </filter>
            </svg>
            <div className={styles.loader}>
                <span style={{ '--i': 1 }}></span>
                <span style={{ '--i': 2 }}></span>
                <span style={{ '--i': 3 }}></span>
                <span style={{ '--i': 4 }}></span>
                <span style={{ '--i': 5 }}></span>
                <span style={{ '--i': 6 }}></span>
                <span style={{ '--i': 7 }}></span>
                <span style={{ '--i': 8 }}></span>
                <span style={{ '--i': 9 }}></span>
                <span style={{ '--i': 10 }}></span>
                <span className={styles.rotate} style={{ '--watet': 0 }}></span>
                <span className={styles.rotate} style={{ '--watet': 2 }}></span>
                <span className={styles.rotate} style={{ '--watet': 3 }}></span>
                <span className={styles.rotate} style={{ '--watet': 4 }}></span>
                <span className={styles.rotate} style={{ '--watet': 5 }}></span>
                <span className={styles.rotate} style={{ '--watet': 6 }}></span>
                <span className={styles.rotate} style={{ '--watet': 7 }}></span>
            </div>
        </div>
    );
};

export default Loader;
