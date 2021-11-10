import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    return (
        <nav data-testid='navbar' id={styles.navbar}>
            <a href='/' className={styles.brand}>
                <Image
                    src='/images/logo.png'
                    alt='site logo'
                    width={50}
                    height={50}
                />
                FIRe
            </a>
            <Link href='/features'>
                <a className={styles.navLink}>Features</a>
            </Link>
            <Link href='/about'>
                <a className={styles.navLink}>About Us</a>
            </Link>
            <Link href='/login'>
                <a className={styles.navLink}>Login</a>
            </Link>
        </nav>
    );
};

export default Navbar;
