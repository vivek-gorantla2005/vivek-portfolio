import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

// ─────────────────────────────────────────────────────────────────────────────
// CODE SCENE  —  Floating editor windows + matrix rain + syntax tokens
// ─────────────────────────────────────────────────────────────────────────────

const CODE_SNIPPETS = [
    {
        lang: 'tsx',
        lines: [
            { t: 'kw', v: 'const ' }, { t: 'fn', v: 'Hero' }, { t: 'op', v: ' = () => {' },
            { t: 'kw', v: '  return' },
            { t: 'str', v: '    <Section>' },
            { t: 'fn', v: '      <CinematicScene' }, { t: 'op', v: ' />' },
            { t: 'str', v: '    </Section>' },
            { t: 'op', v: '  )' },
            { t: 'op', v: '}' },
        ],
    },
    {
        lang: 'ts',
        lines: [
            { t: 'kw', v: 'async function ' }, { t: 'fn', v: 'fetchData' }, { t: 'op', v: '() {' },
            { t: 'kw', v: '  const ' }, { t: 'id', v: 'res' }, { t: 'op', v: ' = await ' },
            { t: 'fn', v: '  fetch' }, { t: 'str', v: '("api/data")' },
            { t: 'kw', v: '  const ' }, { t: 'id', v: 'json' }, { t: 'op', v: ' = await res.' }, { t: 'fn', v: 'json' }, { t: 'op', v: '()' },
            { t: 'kw', v: '  return ' }, { t: 'id', v: 'json' },
            { t: 'op', v: '}' },
        ],
    },
    {
        lang: 'py',
        lines: [
            { t: 'kw', v: 'def ' }, { t: 'fn', v: 'generate' }, { t: 'op', v: '(prompt):' },
            { t: 'kw', v: '    model ' }, { t: 'op', v: '= ' }, { t: 'fn', v: 'OpenAI' }, { t: 'op', v: '()' },
            { t: 'id', v: '    response' }, { t: 'op', v: ' = model.' },
            { t: 'fn', v: '    chat' }, { t: 'str', v: '(prompt)' },
            { t: 'kw', v: '    return ' }, { t: 'id', v: 'response' },
        ],
    },
];

// ── Floating syntax token pool ─────────────────────────────────────────────────
// Each entry: { text, type }  type → colour key
const SYNTAX_TOKENS = [
    // Keywords
    { v: 'const', t: 'kw' }, { v: 'async', t: 'kw' },
    { v: 'await', t: 'kw' }, { v: 'return', t: 'kw' },
    { v: 'export', t: 'kw' }, { v: 'import', t: 'kw' },
    { v: 'interface', t: 'kw' }, { v: 'type', t: 'kw' },
    { v: 'useState', t: 'kw' }, { v: 'useEffect', t: 'kw' },
    // Functions / identifiers
    { v: 'render()', t: 'fn' }, { v: 'map()', t: 'fn' },
    { v: 'filter()', t: 'fn' }, { v: 'reduce()', t: 'fn' },
    { v: 'Promise', t: 'fn' }, { v: 'useRef()', t: 'fn' },
    { v: 'setTimeout()', t: 'fn' }, { v: 'console.log()', t: 'fn' },
    { v: 'Array.from()', t: 'fn' }, { v: '.then()', t: 'fn' },
    { v: 'fetch()', t: 'fn' }, { v: 'JSON.parse()', t: 'fn' },
    // Operators / symbols
    { v: '=>', t: 'op' }, { v: '===', t: 'op' },
    { v: '...', t: 'op' }, { v: '?.', t: 'op' }, { v: '??', t: 'op' },
    { v: '{}', t: 'op' }, { v: '[]', t: 'op' }, { v: '()', t: 'op' },
    { v: '&&', t: 'op' }, { v: '||', t: 'op' },
    { v: '!==', t: 'op' }, { v: '+=', t: 'op' },
    // Strings / literals
    { v: '"Hello, World"', t: 'str' }, { v: '`template`', t: 'str' },
    { v: '"vivek"', t: 'str' }, { v: 'true', t: 'str' },
    { v: 'null', t: 'str' }, { v: 'undefined', t: 'str' },
    // Numbers
    { v: '0xff', t: 'num' }, { v: '3.14', t: 'num' },
    { v: '42', t: 'num' }, { v: '1000', t: 'num' },
    // Comments
    { v: '// TODO', t: 'cm' }, { v: '// fix later', t: 'cm' },
    { v: '/* magic */', t: 'cm' }, { v: '// @ts-ignore', t: 'cm' },
    // JSX
    { v: '<div>', t: 'str' }, { v: '</div>', t: 'str' },
    { v: '<React.Fragment>', t: 'str' }, { v: '<Suspense>', t: 'str' },
    { v: '<canvas />', t: 'str' }, { v: '<motion.div />', t: 'str' },
];

const TOKEN_COLORS_DARK: Record<string, string> = {
    kw: '#c792ea',
    fn: '#82aaff',
    str: '#c3e88d',
    id: '#eeffff',
    op: '#89ddff',
    num: '#f78c6c',
    cm: '#546e7a',
};
const TOKEN_COLORS_LIGHT: Record<string, string> = {
    kw: '#7c3aed',
    fn: '#2563eb',
    str: '#16a34a',
    id: '#1e293b',
    op: '#0e7490',
    num: '#b45309',
    cm: '#94a3b8',
};

// ─────────────────────────────────────────────────────────────────────────────
interface CodeWindow {
    x: number; y: number;
    w: number; h: number;
    vy: number; vx: number;
    alpha: number;
    snippet: typeof CODE_SNIPPETS[0];
    phase: number;
    cursorLine: number;
    cursorBlink: number;
    scale: number;
}

interface FloatToken {
    x: number; y: number;
    vx: number; vy: number;
    alpha: number;
    targetAlpha: number;
    text: string;
    color: string;
    fontSize: number;
    phase: number;
    glowRadius: number;
    rotation: number;         // gentle tilt
    rotationSpeed: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// ROUND RECT  (defined outside the effect so drawWindow can use it)
// ─────────────────────────────────────────────────────────────────────────────
const drawRoundRect = (
    c: CanvasRenderingContext2D,
    x: number, y: number, w: number, h: number,
    r: number | number[] = 6
) => {
    const radii = Array.isArray(r) ? r : [r, r, r, r];
    c.moveTo(x + radii[0], y);
    c.lineTo(x + w - radii[1], y);
    c.quadraticCurveTo(x + w, y, x + w, y + radii[1]);
    c.lineTo(x + w, y + h - radii[2]);
    c.quadraticCurveTo(x + w, y + h, x + w - radii[2], y + h);
    c.lineTo(x + radii[3], y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - radii[3]);
    c.lineTo(x, y + radii[0]);
    c.quadraticCurveTo(x, y, x + radii[0], y);
};

// ─────────────────────────────────────────────────────────────────────────────
export const CodeScene = () => {
    const { theme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stateRef = useRef<{
        raf: number;
        windows: CodeWindow[];
        floats: FloatToken[];
    }>({ raf: 0, windows: [], floats: [] });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const isDark = theme === 'dark';
        const accent = isDark ? '#ccff00' : '#ff4d00';
        const tokens = isDark ? TOKEN_COLORS_DARK : TOKEN_COLORS_LIGHT;
        const winBg = isDark ? 'rgba(10,10,20,0.72)' : 'rgba(245,245,255,0.78)';
        const borderC = isDark ? 'rgba(204,255,0,0.18)' : 'rgba(255,77,0,0.18)';
        const headerC = isDark ? 'rgba(204,255,0,0.07)' : 'rgba(255,77,0,0.06)';
        const glowC = isDark ? '204,255,0' : '255,77,0';
        const matrixC = isDark ? '#ccff00' : '#16a34a';

        // ── Resize ──────────────────────────────────────────────────────────────
        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        globalThis.addEventListener('resize', resize);

        // ── Spawn code windows ──────────────────────────────────────────────────
        const spawnWindows = (): CodeWindow[] => {
            const W = canvas.width;
            const H = canvas.height;
            return [0, 1, 2].map((i) => ({
                x: W * (0.05 + i * 0.3) + (Math.random() - 0.5) * 40,
                y: H * (0.08 + Math.random() * 0.35),
                w: 200 + Math.random() * 100,
                h: 0,
                vy: (Math.random() - 0.5) * 0.12,
                vx: (Math.random() - 0.5) * 0.04,
                alpha: 0.45 + Math.random() * 0.35,
                snippet: CODE_SNIPPETS[i % CODE_SNIPPETS.length],
                phase: Math.random() * Math.PI * 2,
                cursorLine: Math.floor(Math.random() * 4),
                cursorBlink: 0,
                scale: 0.82 + Math.random() * 0.24,
            }));
        };

        // ── Spawn floating syntax tokens ─────────────────────────────────────────
        const spawnFloats = (): FloatToken[] => {
            const W = canvas.width;
            const H = canvas.height;
            const count = 38;                    // number of tokens scattered around
            return Array.from({ length: count }, () => {
                const entry = SYNTAX_TOKENS[Math.floor(Math.random() * SYNTAX_TOKENS.length)];
                const color = tokens[entry.t] || tokens['id'];
                const fontSize = 9 + Math.random() * 9;  // 9–18 px
                return {
                    x: Math.random() * W,
                    y: Math.random() * H,
                    vx: (Math.random() - 0.5) * 0.22,
                    vy: (Math.random() - 0.5) * 0.18,
                    alpha: 0,
                    targetAlpha: (0.12 + Math.random() * 0.28) * (isDark ? 1 : 0.65),
                    text: entry.v,
                    color,
                    fontSize,
                    phase: Math.random() * Math.PI * 2,
                    glowRadius: fontSize * (1.5 + Math.random()),
                    rotation: (Math.random() - 0.5) * 0.25,   // ±~14°
                    rotationSpeed: (Math.random() - 0.5) * 0.0008,
                };
            });
        };

        stateRef.current.windows = spawnWindows();
        stateRef.current.floats = spawnFloats();

        // ── Matrix character rain ─────────────────────────────────────────────────
        const CHAR_SIZE = 13;
        const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]()<>=/\\;:.,!?@#$%^&*+-_~`|'.split('');

        let cols: number[] = [];
        let drops: number[] = [];
        const resetMatrix = () => {
            if (!canvas) return;
            cols = [];
            drops = [];
            const numCols = Math.floor(canvas.width / CHAR_SIZE);
            for (let i = 0; i < numCols; i++) {
                cols.push(i * CHAR_SIZE);
                drops.push(Math.random() * -canvas.height);
            }
        };
        resetMatrix();
        globalThis.addEventListener('resize', resetMatrix);

        // ── Draw one editor window ────────────────────────────────────────────────
        const drawWindow = (win: CodeWindow, t: number) => {
            const { x, y, w, snippet, phase, scale } = win;
            const lineH = 15 * scale;
            const padX = 10 * scale;
            const padY = 32 * scale;
            const h = padY + snippet.lines.length * lineH + 8 * scale;
            win.h = h;

            // Outer glow
            const glowA = 0.04 + 0.03 * Math.sin(t * 0.8 + phase);
            const grd = ctx.createRadialGradient(x + w / 2, y + h / 2, 0, x + w / 2, y + h / 2, w * 0.7);
            grd.addColorStop(0, `rgba(${glowC},${glowA * 3})`);
            grd.addColorStop(1, `rgba(${glowC},0)`);
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.ellipse(x + w / 2, y + h / 2, w * 0.9, h * 1.1, 0, 0, Math.PI * 2);
            ctx.fill();

            // Panel
            ctx.save();
            ctx.globalAlpha = win.alpha;
            ctx.beginPath();
            drawRoundRect(ctx, x, y, w, h, 8);
            ctx.fillStyle = winBg;
            ctx.fill();
            ctx.strokeStyle = borderC;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Header
            ctx.fillStyle = headerC;
            ctx.beginPath();
            drawRoundRect(ctx, x, y, w, 22 * scale, [8, 8, 0, 0]);
            ctx.fill();

            // Traffic-light dots
            const dotY = y + 10 * scale;
            const dotR = 3.5 * scale;
            ['#ff5f57', '#febc2e', '#28c840'].forEach((c, k) => {
                ctx.beginPath();
                ctx.arc(x + padX + k * (dotR * 2 + 4 * scale), dotY, dotR, 0, Math.PI * 2);
                ctx.fillStyle = c;
                ctx.fill();
            });

            // Language badge
            ctx.font = `${10 * scale}px monospace`;
            ctx.fillStyle = accent;
            ctx.globalAlpha = win.alpha * 0.6;
            ctx.fillText(snippet.lang, x + w - 28 * scale, dotY + dotR * 0.5);
            ctx.globalAlpha = win.alpha;

            // Code lines
            const fontSize = 10 * scale;
            ctx.font = `${fontSize}px 'JetBrains Mono', 'Fira Code', monospace`;
            snippet.lines.forEach((line, li) => {
                const ly = y + padY + li * lineH;
                if (li === win.cursorLine) {
                    const blinkOn = Math.sin(win.cursorBlink) > 0;
                    ctx.fillStyle = isDark ? 'rgba(204,255,0,0.06)' : 'rgba(255,77,0,0.06)';
                    ctx.fillRect(x, ly - lineH * 0.75, w, lineH);
                    if (blinkOn) {
                        ctx.fillStyle = accent;
                        ctx.fillRect(x + padX, ly - lineH * 0.65, 1.5, lineH * 0.85);
                    }
                }
                ctx.fillStyle = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)';
                ctx.fillText(String(li + 1).padStart(2, ' '), x + padX, ly);
                ctx.fillStyle = tokens[line.t] || tokens['id'];
                ctx.fillText(line.v, x + padX + 20 * scale, ly);
            });

            ctx.restore();
        };

        // ── Draw floating syntax tokens ───────────────────────────────────────────
        const drawFloat = (f: FloatToken, t: number) => {
            // Fade in / breathe
            f.alpha += (f.targetAlpha - f.alpha) * 0.015;
            const pulse = f.alpha * (0.8 + 0.2 * Math.sin(t * 0.7 + f.phase));

            ctx.save();
            ctx.globalAlpha = pulse;
            ctx.translate(f.x, f.y);
            ctx.rotate(f.rotation);

            // Soft text glow (shadow trick)
            ctx.shadowColor = f.color;
            ctx.shadowBlur = f.glowRadius * (0.6 + 0.4 * Math.sin(t * 0.5 + f.phase));

            ctx.font = `${f.fontSize}px 'JetBrains Mono', 'Fira Code', monospace`;
            ctx.fillStyle = f.color;
            ctx.fillText(f.text, 0, 0);

            ctx.shadowBlur = 0;
            ctx.restore();
        };

        // ── Main render loop ─────────────────────────────────────────────────────
        let frame = 0;
        let matrixTick = 0;

        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;
            const t = frame * 0.016;
            frame++;

            ctx.clearRect(0, 0, W, H);

            // Matrix rain —————————————————————————————————
            matrixTick++;
            if (matrixTick % 4 === 0) {
                ctx.fillStyle = isDark ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';
                ctx.fillRect(0, 0, W, H);

                drops.forEach((dropY, i) => {
                    if (dropY < 0) { drops[i] += CHAR_SIZE; return; }
                    const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
                    const prog = Math.min(dropY / H, 1);
                    const a = (0.12 - prog * 0.1) * (isDark ? 1 : 0.5);
                    ctx.fillStyle = matrixC;
                    ctx.globalAlpha = Math.max(0, a);
                    ctx.font = `${CHAR_SIZE}px monospace`;
                    ctx.fillText(ch, cols[i], drops[i]);
                    ctx.globalAlpha = 1;
                    drops[i] += CHAR_SIZE;
                    if (drops[i] > H * 0.55) drops[i] = -Math.random() * H * 0.5;
                });
            }

            // Floating syntax tokens ———————————————————————
            stateRef.current.floats.forEach((f) => {
                f.x += f.vx;
                f.y += f.vy;
                f.rotation += f.rotationSpeed;

                // Wrap around edges with a margin
                const margin = 80;
                if (f.x > W + margin) f.x = -margin;
                if (f.x < -margin) f.x = W + margin;
                if (f.y > H + margin) f.y = -margin;
                if (f.y < -margin) f.y = H + margin;

                drawFloat(f, t);
            });

            // Editor windows ————————————————————————————————
            stateRef.current.windows.forEach((win) => {
                win.y += win.vy;
                win.x += win.vx;
                win.cursorBlink += 0.06;
                if (win.y > H + 60) win.y = -200;
                if (win.y < -200) win.y = H + 60;
                if (win.x > W + 50) win.x = -win.w - 20;
                if (win.x < -win.w - 50) win.x = W + 20;
                drawWindow(win, t);
            });

            stateRef.current.raf = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(stateRef.current.raf);
            globalThis.removeEventListener('resize', resize);
            globalThis.removeEventListener('resize', resetMatrix);
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
                zIndex: 1,
                opacity: 0.95,
            }}
        />
    );
};
