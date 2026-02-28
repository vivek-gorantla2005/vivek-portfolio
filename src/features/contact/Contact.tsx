import { Magnetic } from '../../components/Magnetic';
import styles from './Contact.module.css';

export const Contact = () => {
    return (
        <footer id="contact" className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.linksGroup}>
                        <div className={styles.column}>
                            <h4 className={styles.colTitle}>SOCIALS</h4>
                            <Magnetic strength={0.2}><a href="https://github.com/vivek-gorantla2005" target="_blank" rel="noopener noreferrer" className={styles.link}>GITHUB</a></Magnetic>
                            <Magnetic strength={0.2}><a href="https://www.linkedin.com/in/vivek-gorantla/" target="_blank" rel="noopener noreferrer" className={styles.link}>LINKEDIN</a></Magnetic>
                        </div>

                        <div className={styles.column}>
                            <h4 className={styles.colTitle}>COMPETITIVE CODING</h4>
                            <Magnetic strength={0.2}><a href="https://leetcode.com/u/vivek__001/" target="_blank" rel="noopener noreferrer" className={styles.link}>LEETCODE</a></Magnetic>
                            <Magnetic strength={0.2}><a href="https://www.geeksforgeeks.org/profile/23eg103ufj" target="_blank" rel="noopener noreferrer" className={styles.link}>GEEKSFORGEEKS</a></Magnetic>
                            <Magnetic strength={0.2}><a href="https://www.codechef.com/users/vivek_g_2005" target="_blank" rel="noopener noreferrer" className={styles.link}>CODECHEF</a></Magnetic>
                        </div>
                    </div>

                    <div className={styles.ctaColumn}>
                        <h4 className={styles.colTitle}>Want To Connect?</h4>
                        <a href="mailto:vivek.gorantla@gmail.com" className={styles.bigCta}>
                            LET'S TALK
                        </a>
                        <p className={styles.email}>vivek.gorantla@gmail.com</p>
                        <p className={styles.email}>Contact: +91 9700407379</p>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>© 2026 VIVEK GORANTLA</p>
                    <p className={styles.location}>HYDERABAD, INDIA</p>
                </div>
            </div>
        </footer>
    );
};
