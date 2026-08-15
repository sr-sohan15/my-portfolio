import React, { useRef } from 'react';
import { Mail, Send, PhoneCall } from 'lucide-react';

const ContactLight = () => {
  const formRef = useRef();

  return (
    <section id="contact" className="py-20 px-6 max-w-6xl mx-auto space-y-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sky-600 text-sm font-mono font-bold">
          <Mail size={18} /> Get In Touch
        </div>
        <h2 className="text-3xl font-black text-slate-900">
          Let's Connect
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 space-y-6">
          <p className="text-slate-700 text-sm leading-relaxed font-medium">
            I am currently looking for <span className="text-sky-700 font-bold">Internship</span> or <span className="text-sky-700 font-bold">Junior Frontend Developer</span> opportunities. Feel free to reach out if you have a project or a position available!
          </p>

          <div className="p-4 bg-white/80 border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <span className="text-xs text-slate-500 font-mono font-bold block">Direct Email</span>
            <a href="mailto:sr.sohan5187@gmail.com" className="text-slate-900 hover:text-sky-600 font-mono text-sm font-bold transition block">
              sr.sohan5187@gmail.com
            </a>
          </div>

          <div className="p-4 bg-white/80 border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <span className="text-xs text-slate-500 font-mono font-bold block">Professional Network</span>
            <a 
              href="https://www.linkedin.com/in/sr-sohan-9a3641250/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-900 hover:text-sky-600 font-mono text-sm font-bold transition flex items-center gap-2"
            >
              <svg className="w-4 h-4 fill-sky-600" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn Profile
            </a>
          </div>

          <div className="p-4 bg-white/80 border border-slate-200 rounded-xl space-y-2 shadow-sm">
            <span className="text-xs text-slate-500 font-mono font-bold block">WhatsApp</span>
            <a 
              href="https://wa.me/8801724247815" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-900 hover:text-emerald-600 font-mono text-sm font-bold transition flex items-center gap-2"
            >
              <PhoneCall size={16} className="text-emerald-600" />
              +880 1724-247815
            </a>
          </div>
        </div>

        <form 
          ref={formRef} 
          className="lg:col-span-7 space-y-4 p-6 bg-white/80 border border-slate-200 rounded-xl shadow-sm relative"
        >
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 mb-2">Name</label>
            <input 
              required
              name="from_name"
              type="text" 
              placeholder="Your Name" 
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 mb-2">Email</label>
            <input 
              required
              name="from_email"
              type="email" 
              placeholder="your@email.com" 
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 mb-2">Message</label>
            <textarea 
              required
              name="message"
              rows="4" 
              placeholder="Write your message here..." 
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-lg transition flex items-center justify-center gap-2 shadow-md shadow-sky-600/20 active:scale-95 cursor-pointer"
          >
            Send Message <Send size={16} />
          </button>
        </form>
      </div>

      <footer className="pt-16 border-t border-slate-200 text-center text-xs text-slate-600 font-mono font-semibold">
        © {new Date().getFullYear()} Md. Saidur Rahman Sohan. All rights reserved.
      </footer>
    </section>
  );
};

export default ContactLight;