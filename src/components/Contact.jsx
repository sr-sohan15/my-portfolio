import React, { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulated API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000); // Reset toast after 4s
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-6xl mx-auto space-y-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sky-400 text-sm font-mono">
          <Mail size={18} /> Get In Touch
        </div>
        <h2 className="text-3xl font-bold text-slate-100">Let's Connect</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 space-y-6">
          <p className="text-slate-400 leading-relaxed text-sm">
            I am currently looking for <span className="text-sky-400 font-medium">Internship</span> or <span className="text-sky-400 font-medium">Junior Frontend Developer</span> opportunities. Feel free to reach out if you have a project or a position available!
          </p>

          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs text-slate-500 font-mono block">Direct Email</span>
            <a href="mailto:sohan@example.com" className="text-slate-200 hover:text-sky-400 font-mono text-sm transition">
              sohan@example.com
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4 p-6 bg-slate-900/40 border border-slate-800 rounded-xl relative">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">Name</label>
            <input 
              required
              type="text" 
              placeholder="Your Name" 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">Email</label>
            <input 
              required
              type="email" 
              placeholder="your@email.com" 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">Message</label>
            <textarea 
              required
              rows="4" 
              placeholder="Write your message here..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 transition resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 text-white font-medium text-sm rounded-lg transition flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95"
          >
            {loading ? "Sending..." : "Send Message"} <Send size={16} />
          </button>

          {/* Success Notification */}
          {submitted && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-800/80 rounded-lg text-emerald-400 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 size={16} /> Thank you! Your message has been sent successfully.
            </div>
          )}
        </form>
      </div>

      <footer className="pt-16 border-t border-slate-800/80 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} Md. Saidur Rahman Sohan. All rights reserved.
      </footer>
    </section>
  );
};

export default Contact;