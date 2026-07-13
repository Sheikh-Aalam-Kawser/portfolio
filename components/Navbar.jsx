import React, { useState, useEffect } from 'react';
import '../styles/navbar.css';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls past 20px, apply the scrolled styling state
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#hero" className="nav-logo">
          Sheikh Aalam Kawser<span>.</span>
        </a>

        <nav className="nav-links">
          {/* Hamburger Toggle */}
          <input type="checkbox" id="nav-toggle" className="nav-toggle" />
          <label htmlFor="nav-toggle" className="hamburger">
            <span></span>
          </label>

          {/* Wrap links in a div with class "nav-menu" so CSS can hide/show them */}
          <div className="nav-menu">
            <a href="#projects">Work</a>
            <a href="#experience">Experience</a>
            <button
              className="nav-cta"
              onClick={() => {
                window.dispatchEvent(
                  new KeyboardEvent('keydown', {
                    key: 'k',
                    metaKey: true,
                    bubbles: true,
                    cancelable: true
                  })
                );
              }}
            >
              Console <kbd>⌘K</kbd>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};