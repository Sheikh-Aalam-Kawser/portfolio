import React, { useRef } from 'react';
import '../styles/interactive-card.css';

export const InteractiveCard = ({ tech, title, description, link }) => {
  const cardRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // 1. Calculate relative cursor position inside the card bounding box
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 2. Map coordinates directly to local CSS variables
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // 3. Optional: Calculate rotation degrees for a 3D Tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; // Max 8-degree rotation on X-axis
    const rotateY = ((x - centerX) / centerX) * 8;  // Max 8-degree rotation on Y-axis

    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  const handlePointerLeave = () => {
    if (!cardRef.current) return;
    
    // Reset properties instantly when mouse exits the boundary box
    const card = cardRef.current;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <div 
      ref={cardRef}
      className="interactive-card-wrapper"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Dynamic light emission mask layer */}
      <div className="glow-effect-overlay" />
      
      {/* Inner Structural Card Content */}
      <div className="card-content">
        <span className="card-tech">{tech}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={link} className="card-link">View Source Code →</a>
      </div>
    </div>
  );
};