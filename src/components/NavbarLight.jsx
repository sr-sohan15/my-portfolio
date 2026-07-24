import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function NavbarLight() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Research', href: '#research' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="text-xl font-mono font-bold text-slate-900 tracking-tight">
          sohan<span className="text-sky-600">.dev</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-mono text-slate-700 font-bold">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-sky-600 transition">
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-bold transition shadow-sm hover:bg-sky-500"
          >
            Contact
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-800 hover:text-sky-600 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 border-b border-slate-200 px-6 py-4 space-y-4 font-mono text-sm font-bold">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-slate-800 hover:text-sky-600 transition"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block text-center py-2 bg-sky-600 text-white rounded-lg text-xs font-bold"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}