import { useRef, cloneElement } from 'react';
import type { ReactElement } from 'react';
import gsap from 'gsap';

interface MagneticProps {
    children: ReactElement;
    strength?: number; // How strong the pull is. Default 0.5 (half movement)
}

export const Magnetic = ({ children, strength = 0.5 }: MagneticProps) => {
    const magnetRef = useRef<HTMLElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = magnetRef.current!.getBoundingClientRect();

        // Calculate distance from center
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        // Move the element towards mouse
        gsap.to(magnetRef.current, {
            x: x * strength,
            y: y * strength,
            duration: 1,
            ease: "elastic.out(1, 0.3)"
        });
    };

    const handleMouseLeave = () => {
        // Snap back to center
        gsap.to(magnetRef.current, {
            x: 0,
            y: 0,
            duration: 1,
            ease: "elastic.out(1, 0.3)"
        });
    };

    return cloneElement(children as any, {
        ref: magnetRef,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave
    });
};
