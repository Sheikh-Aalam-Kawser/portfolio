import React, { useState, useRef, useEffect } from 'react';
import '../styles/terminal.css';

// ... (COMMAND_RESPONSES stays the same) ...

export const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to AalamOS v1.0.0' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  // Focus terminal input after mount without autoFocus scroll jump
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Scrolls ONLY the internal terminal container
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase();
      if (!command) return;

      if (command === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }

      const newHistory = [...history, { type: 'input', text: `guest@aalam-portfolio:~$ ${command}` }];
      
      if (COMMAND_RESPONSES[command]) {
        newHistory.push({ type: 'output', text: COMMAND_RESPONSES[command] });
      } else {
        newHistory.push({ type: 'output', text: `Command not found: ${command}. Type "help" for a list of commands.` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="terminal-container" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="btn-close"></span>
          <span className="btn-minimize"></span>
          <span className="btn-maximize"></span>
        </div>
        <div className="terminal-title">guest@aalam-portfolio:~</div>
      </div>
      
      <div className="terminal-body" ref={bodyRef}>
        {history.map((line, index) => (
          <div key={index} className={`terminal-line ${line.type}`}>
            {line.text}
          </div>
        ))}
        
        <div className="terminal-input-line">
          <span className="prompt">guest@aalam-portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            spellCheck="false"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};