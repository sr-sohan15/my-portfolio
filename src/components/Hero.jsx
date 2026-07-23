import React from 'react';
import { ChevronRight } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="about" className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen flex items-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Left Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-800/50 text-sky-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Available for Intern / Junior Roles
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight">
            Md. Saidur Rahman <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Sohan
            </span>
          </h1>

          {/* Dynamic Typing Effect */}
          <div className="text-xl sm:text-2xl font-semibold text-sky-400 font-mono h-8 flex items-center">
            <Typewriter
              options={{
                strings: [
                  'Frontend Web Developer',
                  'MERN Enthusiast',
                  'React.js Developer',
                  'CSE Graduate'
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 30,
              }}
            />
          </div>

          <p className="text-slate-400 leading-relaxed max-w-xl text-base">
            CSE Graduate specializing in building high-performance, responsive, and visually appealing web interfaces using <span className="text-slate-200">React.js</span> and <span className="text-slate-200">Tailwind CSS</span>. Skilled in component architecture, state management, and Linux environments.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#contact" className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-sky-500/20 hover:scale-105 active:scale-95 duration-200">
              Contact Me <ChevronRight size={18} />
            </a>
            <a href="https://github.com/sohan-15" target="_blank" rel="noreferrer" className="px-6 py-3 bg-slate-900 border border-slate-700 hover:border-sky-400 text-slate-300 font-medium rounded-lg transition-all flex items-center gap-2 hover:scale-105 active:scale-95 duration-200">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub Profile
            </a>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-80 transition duration-500"></div>
            
         <div className="relative w-64 h-64 sm:w-80 sm:h-80 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-2 group-hover:scale-[1.02] transition duration-300">
  <img 
    src={`${import.meta.env.BASE_URL}sohan.jpeg`} 
    alt="Md. Saidur Rahman Sohan" 
    className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition duration-500"
  />
</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;