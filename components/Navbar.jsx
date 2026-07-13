
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="font-bold text-xl">AalamOS</div>
      
      {/* Hamburger Button (Visible only on mobile) */}
      <button 
        className="md:hidden p-2" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Menu Items */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block absolute md:static top-16 left-0 w-full bg-white md:w-auto p-4 md:p-0 shadow-lg md:shadow-none`}>
        <ul className="flex flex-col md:flex-row gap-6">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#resume">Resume</a></li>
        </ul>
      </div>
    </nav>
  );
};