import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
    children: string;
    className?: string;
}

export const TextReveal = ({ children, className, inline = false }: TextRevealProps & { inline?: boolean }) => {
    const el = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!el.current) return;
            const words = el.current.querySelectorAll('.word');

            gsap.fromTo(words,
                {
                    y: 50,
                    opacity: 0,
                    rotateX: 45
                },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el.current,
                        start: "top 85%", // Trigger when top of element hits 85% of viewport
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, el);

        return () => ctx.revert();
    }, [children]);

    const words = children.split(' ');

    return (
        <div ref={el} className={className} style={{ overflow: 'hidden', display: inline ? 'inline-block' : 'block' }}> {/* Masking container */}
            {words.map((word, i) => (
                <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.25em', transformOrigin: '0% 50%' }}>
                    {word}
                </span>
            ))}
        </div>
    );
};
