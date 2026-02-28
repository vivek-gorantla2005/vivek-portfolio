import { useRef } from 'react';
import styles from './About.module.css';
import { TextReveal } from '../../components/TextReveal';

export const About = () => {
    const containerRef = useRef<HTMLElement>(null);

    return (
        <section id="about" ref={containerRef} className={styles.section}>
            <div className={styles.manifesto}>
                <div className={styles.line}>
                    <TextReveal inline>CRAFTING</TextReveal>
                </div>
                <div className={styles.line} style={{ color: 'var(--accent)' }}>
                    <TextReveal inline>DIGITAL</TextReveal>
                </div>
                <div className={styles.line}>
                    <TextReveal inline>EXPERIENCES</TextReveal>
                </div>
                <div className={styles.line}>
                    <TextReveal inline>WITH</TextReveal><span><TextReveal inline>PRECISION</TextReveal></span>
                </div>
            </div>


        </section>
    );
};
