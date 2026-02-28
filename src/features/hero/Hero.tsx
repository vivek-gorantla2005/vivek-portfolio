import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CinematicScene } from './CinematicScene';
import styles from './Hero.module.css';

gsap.registerPlugin(useGSAP);

const TECH_TAGS = ['React', 'TypeScript', 'Node.js', 'Next.js', 'Python'];

export const Hero = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.from(`.${styles.tagline}`, {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.3,
        })
            .from(`.${styles.headlineWord}`, {
                y: 120,
                opacity: 0,
                duration: 1.2,
                stagger: 0.12,
                ease: 'power4.out',
            }, '-=0.6')
            .from(`.${styles.subtext}`, {
                y: 20,
                opacity: 0,
                duration: 0.9,
            }, '-=0.5')
            .from(`.${styles.techTag}`, {
                y: 15,
                opacity: 0,
                duration: 0.6,
                stagger: 0.07,
            }, '-=0.5')
            .from(`.${styles.scrollIndicator}`, {
                opacity: 0,
                duration: 0.8,
            }, '-=0.3');

    }, { scope: containerRef });

    return (
        <section id="hero" ref={containerRef} className={styles.heroSection}>
            <CinematicScene />

            <div className={styles.overlay}>
                {/* Role badge */}
                <p className={styles.tagline}>
                    <span className={styles.taglineDot} />&nbsp;Available for work
                </p>

                {/* Main headline — per-word for stagger animation */}
                <h1 className={styles.headline}>
                    <span className={styles.headlineWord}>Vivek</span>
                    {' '}
                    <span className={styles.headlineWord}>Gorantla</span>
                </h1>

                <p className={styles.subtext}>Full-Stack &amp; Creative&nbsp;Developer</p>

                {/* Tech stack chips */}
                <div className={styles.techStack}>
                    {TECH_TAGS.map(tag => (
                        <span key={tag} className={styles.techTag}>{tag}</span>
                    ))}
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <div className={styles.line} />
                SCROLL TO EXPLORE
            </div>
        </section>
    );
};
