import React from 'react';
import { Navbar } from '../components/Navbar';
import { CommandMenu } from '../components/CommandMenu';
import { ScrollReveal } from '../components/ScrollReveal';
import { InteractiveCard } from '../components/InteractiveCard';
import { TechMatrix } from '../components/TechMatrix';
import { Terminal } from '../components/Terminal';
import './index.css';

function App() {
    return (
        <div className="portfolio-app">
            <Navbar />
            <CommandMenu />
            <div className="ambient-glow" />

            <main className="container" style={{ paddingTop: '8rem' }}>
                {/* Hero Section */}
                <section id="hero" className="hero-section">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', width: '100%', alignItems: 'center' }}>
                        <div style={{ flex: '1 1 400px' }}>
                            <div className="badge">B.Tech IT @ NIT Srinagar • LeetCode Knight (1874)</div>
                            <h1 className="title-huge">
                                Sheikh Aalam Kawser<br />
                                <span>Software Engineer.</span>
                            </h1>
                            <p className="lead-text">
                                I am an Information Technology undergraduate specializing in full-stack web development, robust Object-Oriented systems, and advanced Data Structures and Algorithms.
                            </p>
                        </div>
                        <div style={{ flex: '1 1 400px' }}>
                            <Terminal />
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="projects-section">
                    <h2 className="section-title">Selected Engineering Work</h2>

                    <div className="project-grid">

                        {/* Project 1 */}
                        <ScrollReveal delay={0}>
                            <InteractiveCard
                                tech="React • TypeScript • Cloud Run"
                                title="Nexus-AI API Integration"
                                description="Rapidly prototyped a web application integrating the Gemini API for contextual responses. Containerized and deployed infrastructure to Google Cloud Run."
                                link="#nexus-ai"
                            />
                        </ScrollReveal>

                        {/* Project 2 */}
                        <ScrollReveal delay={150}>
                            <InteractiveCard
                                tech="Java • OOP Design"
                                title="Bank Account Management"
                                description="Built a secure, console-based banking system enforcing robust Object-Oriented Programming principles, custom exception handling, and input validation."
                                link="#github-bank"
                            />
                        </ScrollReveal>

                        {/* Project 3 */}
                        <ScrollReveal delay={300}>
                            <InteractiveCard
                                tech="HTML • CSS • Vanilla JS"
                                title="Tesla UI Architecture"
                                description="Developed a fully responsive, pixel-perfect landing page clone featuring modern frontend layouts and interactive components."
                                link="#github-tesla"
                            />
                        </ScrollReveal>

                    </div>
                </section>

                {/* Experience Section */}
                <section id="experience" style={{ padding: '8rem 0', borderTop: '1px solid var(--border)' }}>
                    <ScrollReveal>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                            Technical Core Architecture
                        </h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', lineHeight: '1.6' }}>
                            A detailed breakdown of my execution stack, categorized by engineering layers and practical system production boundaries.
                        </p>
                        <TechMatrix />
                    </ScrollReveal>
                </section>
            </main>
        </div>
    );
}

export default App;