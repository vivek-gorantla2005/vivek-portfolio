import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CallToAction.module.css';

gsap.registerPlugin(ScrollTrigger);

export const CallToAction = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const text = textRef.current;
        const orb = orbRef.current;

        if (text) {
            gsap.from(text.children, {
                scrollTrigger: {
                    trigger: text,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out"
            });
        }

        if (orb) {
            gsap.to(orb, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    scrub: 1,
                },
                y: -100,
                opacity: 0.8,
                force3D: true // Force GPU
            });
        }
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                <h2 ref={textRef} className={styles.headline}>
                    <div className={styles.line}>
                        <span>BUILDING SYSTEM'S</span>
                    </div>
                    <div className={styles.line}>
                        <span className={styles.accent}>SOLVING PROBLEM'S</span>
                    </div>
                    <div className={styles.line}>
                        <span>LEARNING RELENTLESSLY</span>
                    </div>
                </h2>

                <div ref={orbRef} className={styles.orb}></div>
            </div>
        </section>
    );
};
