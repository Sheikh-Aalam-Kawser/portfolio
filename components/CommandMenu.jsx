import React, { useState, useEffect, useRef } from 'react';
import '../styles/command-menu.css';

// ... (COMMANDS array stays the same) ...

export const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const menuRef = useRef(null);
  const inputRef = useRef(null); // Added ref

  // Focus input when menu opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // ... (Listeners stay the same) ...

  if (!isOpen) return null;

  return (
    <div className="command-overlay" onClick={() => setIsOpen(false)}>
      <div
        className="command-dialog"
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command Menu"
      >
        <div className="command-search-wrapper">
          <input
            ref={inputRef} // Added ref
            type="text"
            placeholder="Type a command or navigate..."
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