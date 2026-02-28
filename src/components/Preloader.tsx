import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import styles from './Preloader.module.css';

interface PreloaderProps {
    onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLHeadingElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(0);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (containerRef.current) {
                        containerRef.current.style.display = 'none';
                    }
                    onComplete();
                }
            });

            // 1. Counter Animation (Virtual, reflected in state)
            // We use a proxy object to animate the number
            const proxy = { val: 0 };

            tl.to(proxy, {
                val: 100,
                duration: 2.5,
                ease: "power2.inOut",
                onUpdate: () => {
                    setCount(Math.floor(proxy.val));
                }
            });

            // Progress bar sync with counter
            tl.to(progressRef.current, {
                width: '100%',
                duration: 2.5,
                ease: "power2.inOut"
            }, "<"); // Run at same time

            // 2. Text Fly out
            tl.to([counterRef.current, `.${styles.percent}`, `.${styles.loadingText}`], {
                y: -50,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            });

            // 3. Curtain Reveal (Slide Up)
            tl.to(containerRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut"
            });

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div ref={containerRef} className={styles.preloader}>
            <div className={styles.counterContainer}>
                <h1 ref={counterRef} className={styles.counter}>
                    {count}
                </h1>
                <span className={styles.percent}>%</span>
            </div>

            <div className={styles.loadingText}>SYSTEM INITIALIZING</div>
            <div ref={progressRef} className={styles.progressBar}></div>
        </div>
    );
};
