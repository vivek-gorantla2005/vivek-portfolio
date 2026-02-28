import { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Projects.module.css';
import { projects } from '../../data/projects';

export const Projects = () => {
    const [activeId, setActiveId] = useState<string | number>(projects[0].id);

    return (
        <section id="projects" className={styles.wrapper}>
            <div className={styles.headerContainer}>
                <h2 className={styles.sectionHeading}>PROJECTS</h2>
                <div className={styles.headerDecoration}></div>
            </div>

            <div className={styles.container}>
                {/* Left: Info Column */}
                <div className={styles.projectList}>
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            className={`${styles.projectRow} ${activeId === project.id ? styles.active : ''}`}
                            onViewportEnter={() => setActiveId(project.id)}
                            viewport={{ amount: 0.6, margin: "0px 0px -20% 0px" }} // Trigger when 60% visible or well into view
                        >
                            <div className={styles.titleGroup}>
                                <div className={styles.accentDash}></div>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                            </div>

                            {/* Mobile Only Video */}
                            <div className={styles.mobileImageContainer}>
                                <video
                                    src={project.video}
                                    className={styles.mobileProjectImage}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    controls
                                />
                            </div>

                            <p className={styles.description}>
                                {project.description}
                            </p>

                            <div className={styles.techStack}>
                                {project.stack.map(tech => (
                                    <span key={tech} className={styles.techTag}>{tech}</span>
                                ))}
                            </div>

                            <div className={styles.links}>
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                    <Github size={16} /> GITHUB
                                </a>
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.link} style={{ color: 'var(--accent)' }}>
                                        <ExternalLink size={16} /> LIVE DEMO
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right: Sticky Video Card */}
                <div className={styles.imageWrapper}>
                    <div className={styles.imageCard}>
                        {projects.map((project) => (
                            <video
                                key={project.id}
                                src={project.video}
                                className={`${styles.projectImage} ${activeId === project.id ? styles.active : ''}`}
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
