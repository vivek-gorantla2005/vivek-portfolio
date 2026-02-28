import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import { CodeScene } from './CodeScene';

// ── CONFIG ────────────────────────────────────────────────────────────────
const COLS = 42;
const ROWS = 24;
const SPREAD_X = 24;
const SPREAD_Y = 14;

// ── DOT WAVE GRID ─────────────────────────────────────────────────────────
// A grid of dots that ripples away from the mouse cursor — minimal, clean,
// recognisable as a data / code grid aesthetic.
const WaveGrid = ({ theme }: { theme: string }) => {
    const ref = useRef<THREE.Points>(null);

    // Build initial flat grid positions once
    const initPos = useMemo(() => {
        const arr = new Float32Array(COLS * ROWS * 3);
        for (let c = 0; c < COLS; c++) {
            for (let r = 0; r < ROWS; r++) {
                const i = (c * ROWS + r) * 3;
                arr[i] = (c / (COLS - 1) - 0.5) * SPREAD_X;
                arr[i + 1] = (r / (ROWS - 1) - 0.5) * SPREAD_Y;
                arr[i + 2] = 0;
            }
        }
        return arr;
    }, []);

    useFrame(({ clock, pointer }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime();
        const mx = pointer.x * (SPREAD_X * 0.5);
        const my = pointer.y * (SPREAD_Y * 0.5);
        const pos = ref.current.geometry.attributes.position.array as Float32Array;

        for (let c = 0; c < COLS; c++) {
            for (let r = 0; r < ROWS; r++) {
                const i = (c * ROWS + r) * 3;
                const x = (c / (COLS - 1) - 0.5) * SPREAD_X;
                const y = (r / (ROWS - 1) - 0.5) * SPREAD_Y;
                const d = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
                // Ripple that falls off exponentially from cursor
                pos[i + 2] = Math.sin(d * 1.1 - t * 2.4) * Math.exp(-d * 0.22) * 0.55;
            }
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[initPos, 3]} />
            </bufferGeometry>
            <pointsMaterial
                color={theme === 'dark' ? '#ffffff' : '#000000'}
                size={0.028}
                transparent
                opacity={theme === 'dark' ? 0.28 : 0.18}
                sizeAttenuation
            />
        </points>
    );
};

// ── ACCENT RING ───────────────────────────────────────────────────────────
// One very faint accent ring that slowly rotates — gives a sense of depth
// without overwhelming. Barely visible.
const AccentRing = ({ theme }: { theme: string }) => {
    const ref = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime();
        ref.current.rotation.z = t * 0.06;
        ref.current.rotation.x = t * 0.03;
        // Gentle pulse
        (ref.current.material as THREE.MeshBasicMaterial).opacity =
            0.06 + 0.03 * Math.sin(t * 0.9);
    });

    return (
        <mesh ref={ref}>
            <torusGeometry args={[4.2, 0.007, 3, 160]} />
            <meshBasicMaterial
                color={theme === 'dark' ? '#ccff00' : '#000000'}
                transparent
                opacity={0.07}
            />
        </mesh>
    );
};

// ── SECOND RING ───────────────────────────────────────────────────────────
const AccentRing2 = ({ theme }: { theme: string }) => {
    const ref = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime();
        ref.current.rotation.z = -t * 0.04;
        ref.current.rotation.y = t * 0.05;
        (ref.current.material as THREE.MeshBasicMaterial).opacity =
            0.04 + 0.02 * Math.sin(t * 1.1 + 1);
    });

    return (
        <mesh ref={ref} rotation={[Math.PI / 5, 0, 0]}>
            <torusGeometry args={[6.0, 0.005, 3, 200]} />
            <meshBasicMaterial
                color={theme === 'dark' ? '#ccff00' : '#000000'}
                transparent
                opacity={0.04}
            />
        </mesh>
    );
};

// ── CAMERA RIG ────────────────────────────────────────────────────────────
const CameraRig = () => {
    const { camera, pointer } = useThree();
    useFrame(() => {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.5, 0.03);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.3, 0.03);
        camera.lookAt(0, 0, 0);
    });
    return null;
};

// ── MAIN EXPORT ───────────────────────────────────────────────────────────
export const CinematicScene = () => {
    const { theme } = useTheme();
    const bgColor = theme === 'dark' ? '#000000' : '#ffffff';
    const glowRgba = theme === 'dark'
        ? 'rgba(204, 255, 0, 0.045)'
        : 'rgba(0, 0, 0, 0.03)';

    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <div
            style={{
                position: 'absolute', top: 0, left: 0,
                width: '100%', height: '100%', zIndex: 0,
                background: bgColor, transition: 'background 0.4s',
            }}
        >
            {/* Subtle centre glow — barely there, just adds warmth */}
            <div
                style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%', height: '70%', pointerEvents: 'none',
                    background: `radial-gradient(ellipse, ${glowRgba} 0%, transparent 65%)`,
                    zIndex: 1, transition: 'background 0.4s',
                }}
            />

            {/* Animated coding scene — floating editor windows + matrix rain */}
            <CodeScene />

            {/* Vignette — darkens the very edge so text pops */}
            <div
                style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
                    background: theme === 'dark'
                        ? 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)'
                        : 'radial-gradient(ellipse at center, transparent 40%, rgba(255,255,255,0.6) 100%)',
                }}
            />

            {mounted && (
                <Canvas
                    camera={{ position: [0, 0, 9], fov: 50 }}
                    gl={{ antialias: true, alpha: true }}
                    style={{ position: 'absolute', inset: 0 }}
                    frameloop="always"
                >
                    <color attach="background" args={[bgColor]} />
                    <CameraRig />
                    <WaveGrid theme={theme} />
                    <AccentRing theme={theme} />
                    <AccentRing2 theme={theme} />
                </Canvas>
            )}
        </div>
    );
};
