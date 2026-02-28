import { useEffect, useRef } from 'react';
import styles from './Journey.module.css';
import { useTheme } from '../../context/ThemeContext';

const EXPERIENCE = [
    {
        year: "2025",
        role: "Contribution",
        desc: "Malai Club(AIML club)",
        company: "Anurag University, Hyderabad" 
    },
    {
        year: "2023 – Present",
        role: "B.Tech - Computer Science and Engineering",
        desc: "CGPA: 8.91 | Specialized in backend systems, algorithms, and full-stack development, AI & ML, System Design",
        company: "Anurag University, Hyderabad"
    },
    {
        year: "2021 – 2023",
        role: "MPC",
        desc: "Percentage: 89%",
        company: "Sri Chaitanya Junior College, Hyderabad"
    },
    {
        role: "Schooling",
        desc: "gpa :10 points",
        company: "Oak Valley International School, Hyderabad"
    }
];

// ── Subtle animated background drawn on a <canvas> ────────────────────────
// Lazy-loaded, no Three.js — keeps the bundle lean for a secondary section.
const BackgroundCanvas = ({ theme }: { theme: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId = 0;
        let t = 0;

        const isDark = theme === 'dark';
        const dotColor = isDark ? 'rgba(255,255,255,' : 'rgba(0,0,0,';
        const lineColor = isDark ? 'rgba(255,255,255,' : 'rgba(0,0,0,';

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Grid of points
        const COLS = 28;
        const ROWS = 16;

        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);

            const gapX = W / (COLS - 1);
            const gapY = H / (ROWS - 1);

            // Draw subtle connecting lines between adjacent nodes
            ctx.lineWidth = 0.5;
            for (let c = 0; c < COLS; c++) {
                for (let r = 0; r < ROWS; r++) {
                    const x = c * gapX;
                    const y = r * gapY;
                    // Wave offsets per node
                    const waveX = Math.sin(t * 0.6 + c * 0.4 + r * 0.3) * 6;
                    const waveY = Math.cos(t * 0.5 + r * 0.5 + c * 0.2) * 4;
                    const nx = x + waveX;
                    const ny = y + waveY;

                    // Connect right
                    if (c < COLS - 1) {
                        const nx2 = (c + 1) * gapX + Math.sin(t * 0.6 + (c + 1) * 0.4 + r * 0.3) * 6;
                        const ny2 = r * gapY + Math.cos(t * 0.5 + r * 0.5 + (c + 1) * 0.2) * 4;
                        const alpha = 0.04 + 0.02 * Math.sin(t * 0.4 + c + r);
                        ctx.strokeStyle = `${lineColor}${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(nx, ny);
                        ctx.lineTo(nx2, ny2);
                        ctx.stroke();
                    }
                    // Connect down
                    if (r < ROWS - 1) {
                        const nx2 = c * gapX + Math.sin(t * 0.6 + c * 0.4 + (r + 1) * 0.3) * 6;
                        const ny2 = (r + 1) * gapY + Math.cos(t * 0.5 + (r + 1) * 0.5 + c * 0.2) * 4;
                        const alpha = 0.04 + 0.02 * Math.cos(t * 0.3 + c + r);
                        ctx.strokeStyle = `${lineColor}${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(nx, ny);
                        ctx.lineTo(nx2, ny2);
                        ctx.stroke();
                    }

                    // Draw dot
                    const dotAlpha = 0.12 + 0.08 * Math.sin(t * 0.8 + c * 0.6 + r * 0.4);
                    ctx.fillStyle = `${dotColor}${dotAlpha})`;
                    ctx.beginPath();
                    ctx.arc(nx, ny, 1.2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            t += 0.012;
            animId = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                display: 'block',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
};

// ─────────────────────────────────────────────────────────────────────────────
export const Journey = () => {
    const { theme } = useTheme();

    return (
        <section id="journey" className={styles.section}>
            {/* Subtle animated background */}
            <BackgroundCanvas theme={theme} />

            <div className={styles.headerContainer}>
                <h2 className={styles.sectionHeading}>EDUCATION &amp; EXPERIENCE</h2>
                <div className={styles.headerDecoration}></div>
            </div>

            <div className={styles.list}>
                {EXPERIENCE.map((item, i) => (
                    <div key={i} className={styles.row}>
                        <div className={styles.date}>{item.year}</div>
                        <div className={styles.roleGroup}>
                            <h3 className={styles.role}>{item.role}</h3>
                            <p className={styles.desc}>{item.desc}</p>
                        </div>
                        <div className={styles.org}>{item.company}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};
