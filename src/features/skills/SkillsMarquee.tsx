import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Blocks, X } from 'lucide-react';
import styles from './SkillsMarquee.module.css';

const SKILL_ROWS = [
    // Backend & Architecture
    [
        { name: 'NODE.JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
        { name: 'EXPRESS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
        { name: 'JAVA', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
        { name: 'KAFKA', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg' },
        { name: 'REDIS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
        { name: 'DOCKER', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
        { name: 'NODE.JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
        { name: 'EXPRESS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
        { name: 'JAVA', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
        { name: 'KAFKA', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg' },
    ],

    // Frontend & Full Stack
    [
        { name: 'NEXT.JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
        { name: 'REACT', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
        { name: 'TYPESCRIPT', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
        { name: 'TAILWIND CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'PYTHON', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
        { name: 'REST APIs', icon: '' },
        { name: 'NEXT.JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
        { name: 'REACT', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
        { name: 'TYPESCRIPT', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
        { name: 'PYTHON', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    ],

    // AI / ML & Data
    [
        { name: 'POSTGRESQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
        { name: 'MONGODB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
        { name: 'MACHINE LEARNING', icon: '' },
        { name: 'LLMs', icon: '' },
        { name: 'SEMANTIC SEARCH', icon: '' },
        { name: 'WEBSOCKETS', icon: '' },
        { name: 'POSTGRESQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
        { name: 'MONGODB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
        { name: 'MACHINE LEARNING', icon: '' },
        { name: 'LLMs', icon: '' },
    ]
];

const SKILL_GROUPS = [
    {
        title: "Backend & Architecture",
        skills: [
            { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
            { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
            { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
            { name: 'Microservices', icon: '' },
            { name: 'Event-Driven Architectures', icon: '' },
            { name: 'Kafka', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg' },
            { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
            { name: 'BullMQ', icon: '' },
            { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' }
        ]
    },
    {
        title: "Frontend & Full Stack",
        skills: [
            { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
            { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
            { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
            { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
            { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
            { name: 'WebSockets', icon: '' },
            { name: 'REST APIs', icon: '' }
        ]
    },
    {
        title: "AI / ML & Data",
        skills: [
            { name: 'Machine Learning', icon: '' },
            { name: 'LLMs & Prompt Eng', icon: '' },
            { name: 'RAG Pipelines', icon: '' },
            { name: 'Embeddings', icon: '' },
            { name: 'Semantic Search', icon: '' },
            { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
            { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' }
        ]
    }
];

export const SkillsMarquee = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    return (
        <section id="skills" className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.sectionHeading}>Technical Arsenal</h2>
                <div className={styles.headerDecoration}></div>
                <button
                    className={styles.viewAllBtn}
                    onClick={() => setIsModalOpen(true)}
                >
                    <Blocks size={18} />
                    <span>VIEW ALL</span>
                </button>
            </div>

            <div className={styles.container}>
                {SKILL_ROWS.map((row, i) => (
                    <div
                        key={i}
                        className={styles.marqueeRow}
                        style={{ '--direction': i % 2 === 0 ? 1 : -1 } as React.CSSProperties}
                    >
                        <div className={styles.track}>
                            {row.map((skill, index) => (
                                <span key={index} className={styles.skillItem}>
                                    {skill.icon && <img src={skill.icon} alt={skill.name} className={styles.skillIcon} />}
                                    <span className={styles.skillText}>{skill.name}</span>
                                    <span className={styles.separator}>✦</span>
                                </span>
                            ))}
                        </div>

                        <div className={styles.track} aria-hidden>
                            {row.map((skill, index) => (
                                <span key={index} className={styles.skillItem}>
                                    {skill.icon && <img src={skill.icon} alt={skill.name} className={styles.skillIcon} />}
                                    <span className={styles.skillText}>{skill.name}</span>
                                    <span className={styles.separator}>✦</span>
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Skills Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            className={styles.modalContent}
                            initial={{ y: 50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={styles.closeBtn}
                                onClick={() => setIsModalOpen(false)}
                            >
                                <X size={24} />
                            </button>

                            <div className={styles.modalHeader}>
                                <h3 className={styles.modalHeading}>Technology Stack</h3>
                                <p className={styles.modalSubheading}>A comprehensive overview of my technical expertise.</p>
                            </div>

                            <div className={styles.modalGrid}>
                                {SKILL_GROUPS.map((group, i) => (
                                    <div key={i} className={styles.skillGroup}>
                                        <h4 className={styles.groupTitle}>{group.title}</h4>
                                        <div className={styles.groupItems}>
                                            {group.skills.map((skill, j) => (
                                                <div key={j} className={styles.modalSkillItem}>
                                                    {skill.icon ? (
                                                        <img src={skill.icon} alt={skill.name} className={styles.modalSkillIcon} />
                                                    ) : (
                                                        <div className={styles.modalSkillDot}></div>
                                                    )}
                                                    <span>{skill.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};