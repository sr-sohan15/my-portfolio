import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Research from './components/Research';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-200 font-sans selection:bg-sky-500 selection:text-white">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Research />
      <Contact />
    </div>
  );
}