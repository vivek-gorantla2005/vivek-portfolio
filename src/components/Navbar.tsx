import { useState } from 'react';
import { Magnetic } from './Magnetic';
import { ThemeToggle } from './ThemeToggle';
import styles from './Navbar.module.css';
import { useLenis } from './SmoothScroll';

export const Navbar = () => {
    const { lenis } = useLenis();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        setMenuOpen(false);
        if (lenis) {
            lenis.scrollTo(targetId, {
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        }
    };

    const navLinks = ['ABOUT', 'PROJECTS', 'SKILLS', 'CONTACT'];

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.pill}>
                    <Magnetic strength={0.4}>
                        <a
                            href="#hero"
                            className={styles.logo}
                            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', fontSize: '1.5rem' }}
                            onClick={(e) => handleScroll(e, '#hero')}
                        >
                            VG
                        </a>
                    </Magnetic>

                    {/* Desktop links */}
                    <div className={styles.links}>
                        {navLinks.map((item) => (
                            <Magnetic key={item} strength={0.3}>
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    className={styles.link}
                                    style={{ display: 'inline-block', padding: '0.5rem' }}
                                    onClick={(e) => handleScroll(e, `#${item.toLowerCase()}`)}
                                >
                                    {item}
                                </a>
                            </Magnetic>
                        ))}
                    </div>

                    <div className={styles.actions}>
                        <Magnetic strength={0.3}>
                            <button
                                className={styles.resumeBtn}
                                onClick={() =>
                                    window.open(
                                        'https://drive.google.com/file/d/1wTplRI73kMZux65y0pIuTXkp8i3y2A3b/view?usp=sharing',
                                        '_blank',
                                        'noopener,noreferrer'
                                    )
                                }
                                title="Download Resume"
                            >
                                <span className={styles.resumeText}>RESUME</span>
                            </button>
                        </Magnetic>
                        <div className={styles.divider}></div>
                        <ThemeToggle />

                        {/* Hamburger button — mobile only */}
                        <button
                            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
                            onClick={() => setMenuOpen((prev) => !prev)}
                            aria-label="Toggle menu"
                            aria-expanded={menuOpen}
                        >
                            <span className={styles.bar}></span>
                            <span className={styles.bar}></span>
                            <span className={styles.bar}></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile full-screen menu */}
            <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
                <nav className={styles.mobileNav}>
                    {navLinks.map((item, i) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className={styles.mobileLink}
                            style={{ '--i': i } as React.CSSProperties}
                            onClick={(e) => handleScroll(e, `#${item.toLowerCase()}`)}
                        >
                            {item}
                        </a>
                    ))}
                    <button
                        className={styles.mobileResumeBtn}
                        style={{ '--i': navLinks.length } as React.CSSProperties}
                        onClick={() => {
                            setMenuOpen(false);
                            window.open(
                                'https://drive.google.com/file/d/1wTplRI73kMZux65y0pIuTXkp8i3y2A3b/view?usp=sharing',
                                '_blank',
                                'noopener,noreferrer'
                            );
                        }}
                    >
                        RESUME ↗
                    </button>
                </nav>
            </div>
        </>
    );
};
