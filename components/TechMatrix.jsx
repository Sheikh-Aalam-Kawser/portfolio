import React, { useState } from 'react';
import '../styles/tech-matrix.css';

const SKILLS_DATA = [
  // --- Core CS & Languages ---
  { name: 'Core Algorithms & Logic', category: 'fundamentals', experience: 'Solved 240+ LeetCode problems (Peak Rating: 1874) spanning graphs, trees, dynamic programming, and recursion.' },
  { name: 'Operating Systems', category: 'fundamentals', experience: 'Strong foundational knowledge of OS architecture, process management, and memory allocation.' },
  { name: 'Java, C++ & C', category: 'fundamentals', experience: 'Applied Object-Oriented Programming (OOP) principles, system stability protocols, and custom exception handling.' },
  { name: 'SDLC & Agile', category: 'fundamentals', experience: 'Understanding of the Software Development Life Cycle and iterative Agile methodologies for team-based engineering.' },

  // --- Full-Stack Web ---
  { name: 'React & Node.js', category: 'web', experience: 'Full-stack UI/UX architecture utilizing React, HTML, CSS, and Express.js REST APIs.' },
  { name: 'Database Management', category: 'web', experience: 'SQL and MySQL implementation for secure transactional workflows and data integrity.' },

  // --- Cloud & APIs ---
  { name: 'API Integration', category: 'cloud', experience: 'Production-grade integration of Gemini and OpenAI APIs via Google AI Studio.' },
  { name: 'Google Cloud Run', category: 'cloud', experience: 'Application containerization and serverless deployment ensuring high availability and seamless scalability.' },

  // --- Tools & Environment ---
  { name: 'Linux OS', category: 'tools', experience: 'Comfortable navigating Linux environments, command-line interfaces, and system configurations.' },
  { name: 'Version Control', category: 'tools', experience: 'Source code management, branching strategies, and collaboration using Git and GitHub.' },
  { name: 'Development Workflow', category: 'tools', experience: 'API testing with Postman and utilizing AI-assisted engineering environments like Cursor AI, VS Code, and IntelliJ IDEA.' }
];

const CATEGORIES = [
  { id: 'all', label: 'All Layers' },
  { id: 'fundamentals', label: 'Core CS & Languages' },
  { id: 'web', label: 'Full-Stack Web' },
  { id: 'cloud', label: 'Cloud & APIs' },
  { id: 'tools', label: 'Tools & Environment' }
];

export const TechMatrix = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(SKILLS_DATA[0]);

  const filteredSkills = activeFilter === 'all' 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(skill => skill.category === activeFilter);

  return (
    <div className="matrix-wrapper">
      {/* Category Filter Pills Container */}
      <div className="matrix-filters" role="tablist">
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            role="tab"
            aria-selected={activeFilter === category.id}
            className={`matrix-filter-btn ${activeFilter === category.id ? 'is-active' : ''}`}
            onClick={() => setActiveFilter(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="matrix-split-layout">
        {/* Left Side: Interactive Dynamic Skills Grid */}
        <div className="skills-interactive-grid">
          {filteredSkills.map(skill => (
            <button
              key={skill.name}
              className={`skill-matrix-item ${selectedSkill.name === skill.name ? 'is-selected' : ''}`}
              onClick={() => setSelectedSkill(skill)}
            >
              <div className="skill-dot"></div>
              <span className="skill-title-text">{skill.name}</span>
            </button>
          ))}
        </div>

        {/* Right Side: Deep Technical Breakdown Showcase */}
        <div className="skill-telemetry-panel">
          <div className="panel-header">
            <span className="panel-tag">{selectedSkill.category} telemetry</span>
            <h4 className="panel-skill-title">{selectedSkill.name}</h4>
          </div>
          <div className="panel-divider"></div>
          <div className="panel-body">
            <h5>Production Application Scope</h5>
            <p>{selectedSkill.experience}</p>
          </div>
        </div>
      </div>
    </div>
  );
};