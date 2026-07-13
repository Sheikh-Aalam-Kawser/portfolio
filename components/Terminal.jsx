import React, { useState, useRef, useEffect } from 'react';
import '../styles/terminal.css';

const COMMAND_RESPONSES = {
  help: `Available commands:
  - whoami   : Display background information
  - skills   : List technical core competencies
  - projects : View top engineering work
  - clear    : Clear the terminal output`,
  
  whoami: `Sheikh Aalam Kawser
Role: Software Engineer / B.Tech IT Undergrad
Location: NIT Srinagar
Highlights: LeetCode Knight (1874 Peak), Competitive Programmer.`,

  skills: `[Core CS] Java, C++, C, Data Structures & Algorithms, OOP, OS
[Web] React, Node.js, Express.js, TypeScript, JavaScript, SQL
[Cloud & AI] Google Cloud Run, Gemini API, OpenAI API`,

  projects: `1. Nexus-AI (React, Cloud Run, Gemini API)
2. Bank Account Management System (Java, OOP)
3. Tesla Homepage Clone (HTML, CSS, Vanilla JS)`
};

export const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to AalamOS v1.0.0' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

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