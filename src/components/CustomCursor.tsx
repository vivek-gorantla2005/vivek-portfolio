import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './CustomCursor.module.css';

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
            });
            // Liquid/Elastic feel for follower
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            });
        };

        window.addEventListener('mousemove', moveCursor);

        // Add hover effects for links and buttons
        const handleHover = () => {
            gsap.to(follower, { scale: 3, opacity: 0.5 });
        };
        const handleUnhover = () => {
            gsap.to(follower, { scale: 1, opacity: 1 });
        };

        const handleMouseDown = () => {
            gsap.to(follower, { scale: 0.8, duration: 0.2 });
        };

        const handleMouseUp = () => {
            gsap.to(follower, { scale: 1, duration: 0.2 });
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', handleHover);
            el.addEventListener('mouseleave', handleUnhover);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.querySelectorAll('a, button').forEach(el => {
                el.removeEventListener('mouseenter', handleHover);
                el.removeEventListener('mouseleave', handleUnhover);
            });
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className={styles.cursor} />
            <div ref={followerRef} className={styles.follower} />
        </>
    );
};
