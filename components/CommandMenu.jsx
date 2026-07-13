import React, { useState, useEffect, useRef } from 'react';
import '../styles/command-menu.css';

const COMMANDS = [
  {
    id: 'hero',
    label: 'Scroll to Introduction',
    action: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
  },
  {
    id: 'projects',
    label: 'Jump to Engineering Projects',
    action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  },
  {
    id: 'experience',
    label: 'View Technical Core Architecture',
    action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
  },
  {
    id: 'resume',
    label: 'Download Engineering Resume',
    action: () => window.open('/Resume.pdf', '_blank')
  },
  {
    id: 'github',
    label: 'Open GitHub Profile',
    shortcut: '↗',
    action: () => window.open('https://github.com/Sheikh-Aalam-Kawser', '_blank')
  },
  {
    id: 'linkedin',
    label: 'Open LinkedIn Profile',
    shortcut: '↗',
    action: () => window.open('https://www.linkedin.com/in/sheikhaalam', '_blank')
  }
];

export const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const menuRef = useRef(null);

  // Listener 1: Handle toggling via Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setActiveIndex(0); // Reset position on toggle
      }

      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Listener 2: Intercept Arrow Keys & Enter when menu is open
  useEffect(() => {
    if (!isOpen) return;

    const handleMenuNavigation = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % COMMANDS.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + COMMANDS.length) % COMMANDS.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        COMMANDS[activeIndex].action();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleMenuNavigation);
    return () => window.removeEventListener('keydown', handleMenuNavigation);
  }, [isOpen, activeIndex]);

  if (!isOpen) return null;

  return (
    <div className="command-overlay" onClick={() => setIsOpen(false)}>
      <div
        className="command-dialog"
        ref={menuRef}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        role="dialog"
        aria-modal="true"
        aria-label="Command Menu"
      >
        <div className="command-search-wrapper">
          <input
            type="text"
            placeholder="Type a command or navigate..."
            autoFocus
            className="command-input"
            aria-autocomplete="list"
          />
          <span className="command-esc-hint">ESC to close</span>
        </div>

        <ul className="command-list" role="listbox">
          {COMMANDS.map((cmd, idx) => (
            <li
              key={cmd.id}
              className={`command-item ${idx === activeIndex ? 'is-active' : ''}`}
              role="option"
              aria-selected={idx === activeIndex}
              onClick={() => {
                cmd.action();
                setIsOpen(false);
              }}
            >
              <span>{cmd.label}</span>
              <kbd className="command-shortcut">{cmd.shortcut}</kbd>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};