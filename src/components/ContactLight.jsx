import React, { useRef, useState } from 'react';
import { Mail, Send, PhoneCall, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const ContactLight = () => {
  const formRef = useRef();
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    const formData = new FormData(formRef.current);
    formData.append("access_key", "a546ea22-e914-44f0-8ece-8cc5885381af");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ loading: false, success: true, error: '' });
        formRef.current.reset();
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      } else {
        setStatus({ loading: false, success: false, error: 'Failed to send message. Please try again.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Network error. Please try again later.' });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (formRef.current.reportValidity()) {
        handleSubmit();
      }
    }
  };

  return (
    <section id="contact" className="pt-6 md:pt-10 pb-12 px-6 max-w-6xl mx-auto space-y-6 md:space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sky-600 text-sm font-mono font-bold">
          <Mail size={18} /> Get In Touch
        </div>
        <h2 className="text-3xl font-black text-slate-900">
          Let's Connect
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-4">
          <p className="text-slate-700 text-sm leading-relaxed font-medium">
            I am currently looking for <span className="text-sky-700 font-bold">Internship</span> or <span className="text-sky-700 font-bold">Junior Frontend Developer</span> opportunities. Feel free to reach out if you have a project or a position available!
          </p>

          <div className="p-4 bg-white/80 border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="text-xs text-slate-500 font-mono font-bold block">Direct Email</span>
            <a href="mailto:sr.sohan7815@gmail.com" className="text-slate-900 hover:text-sky-600 font-mono text-sm font-bold transition block">
              sr.sohan7815@gmail.com
            </a>
          </div>

          <div className="p-4 bg-white/80 border border-slate-200 rounded-xl space-y-1 shadow-sm">
            <span className="text-xs text-slate-500 font-mono font-bold block">Professional Network</span>
            <a 
              href="https://www.linkedin.com/in/sr-sohan15/" 
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

          <div className="p-4 bg-white/80 border border-slate-200 rounded-xl space-y-1 shadow-sm">
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
          onSubmit={handleSubmit}
          className="lg:col-span-7 space-y-4 p-5 md:p-6 bg-white/80 border border-slate-200 rounded-xl shadow-sm relative"
        >
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">Name</label>
            <input 
              required
              name="name"
              type="text" 
              placeholder="Your Name" 
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">Email</label>
              <input 
                required
                name="email"
                type="email" 
                placeholder="your@email.com" 
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                Phone Number <span className="text-slate-400 text-[10px] font-normal">(Optional)</span>
              </label>
              <input 
                name="phone"
                type="tel" 
                placeholder="+880 1XXX-XXXXXX" 
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
              Message <span className="text-slate-400 text-[10px] font-normal">(Press Enter to send, Shift+Enter for new line)</span>
            </label>
            <textarea 
              required
              name="message"
              rows="4" 
              onKeyDown={handleKeyDown}
              placeholder="Write your message here..." 
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status.loading}
            className="w-full sm:w-auto px-6 py-2.5 bg-sky-600 hover:bg-sky-500 disabled:bg-sky-400 text-white font-bold text-sm rounded-lg transition flex items-center justify-center gap-2 shadow-md shadow-sky-600/20 active:scale-95 cursor-pointer"
          >
            {status.loading ? (
              <>Sending <Loader2 size={16} className="animate-spin" /></>
            ) : (
              <>Send Message <Send size={16} /></>
            )}
          </button>

          {status.success && (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
              <CheckCircle2 size={15} /> Message sent successfully!
            </div>
          )}

          {status.error && (
            <div className="flex items-center gap-2 text-xs font-mono text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-lg">
              <AlertCircle size={15} /> {status.error}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactLight;