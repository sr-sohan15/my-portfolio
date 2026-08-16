import React, { useState } from 'react';
import { Mail, Send, PhoneCall, Loader2, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: ''
  });

  const [copiedType, setCopiedType] = useState('');

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(''), 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ loading: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }

    setStatus({ loading: true, success: false, error: '' });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: 'a546ea22-e914-44f0-8ece-8cc5885381af',
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not Provided',
          message: formData.message,
          subject: `Portfolio Message from ${formData.name}`
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => {
          setStatus((prev) => ({ ...prev, success: false }));
        }, 5000);
      } else {
        setStatus({ loading: false, success: false, error: result.message || 'Submission failed. Please try again.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Network error. Please check your connection.' });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section id="contact" className="pt-6 md:pt-10 pb-12 px-6 max-w-6xl mx-auto space-y-6 md:space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono font-semibold">
          <Mail size={18} /> Get In Touch
        </div>
        <h2 className="text-3xl font-bold text-slate-100">
          Let's Connect
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            I am currently looking for <span className="text-cyan-400 font-semibold">Internship</span> or <span className="text-cyan-400 font-semibold">Junior Frontend Developer</span> opportunities. Feel free to reach out if you have a project or a position available!
          </p>

          {/* Email with Click-to-Copy */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5 shadow-md flex items-center justify-between group">
            <div>
              <span className="text-xs text-slate-400 font-mono font-medium block">Direct Email</span>
              <a href="mailto:sr.sohan7815@gmail.com" className="text-slate-100 hover:text-cyan-400 font-mono text-sm font-semibold transition block">
                sr.sohan7815@gmail.com
              </a>
            </div>
            <button
              onClick={() => copyToClipboard('sr.sohan7815@gmail.com', 'email')}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition"
              title="Copy Email"
            >
              {copiedType === 'email' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>
          </div>

          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5 shadow-md">
            <span className="text-xs text-slate-400 font-mono font-medium block">Professional Network</span>
            <a 
              href="https://www.linkedin.com/in/sr-sohan15/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-100 hover:text-cyan-400 font-mono text-sm font-semibold transition flex items-center gap-2"
            >
              <svg className="w-4 h-4 fill-cyan-400" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn Profile
            </a>
          </div>

          {/* WhatsApp with Click-to-Copy */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5 shadow-md flex items-center justify-between group">
            <div>
              <span className="text-xs text-slate-400 font-mono font-medium block">WhatsApp</span>
              <a 
                href="https://wa.me/8801724247815" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-100 hover:text-emerald-400 font-mono text-sm font-semibold transition flex items-center gap-2"
              >
                <PhoneCall size={16} className="text-emerald-400" />
                +880 1724-247815
              </a>
            </div>
            <button
              onClick={() => copyToClipboard('+8801724247815', 'phone')}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 transition"
              title="Copy Number"
            >
              {copiedType === 'phone' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* Form */}
        <form 
          onSubmit={handleSubmit}
          className="lg:col-span-7 space-y-4 p-6 bg-slate-900/80 border border-slate-700/80 rounded-xl relative shadow-xl backdrop-blur-md"
        >
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-200 mb-1.5">
              Name <span className="text-cyan-400">*</span>
            </label>
            <input 
              required
              name="name"
              type="text" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name" 
              className="w-full bg-slate-950/90 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-200 mb-1.5">
                Email <span className="text-cyan-400">*</span>
              </label>
              <input 
                required
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com" 
                className="w-full bg-slate-950/90 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-200 mb-1.5">
                Phone Number <span className="text-slate-400 text-[11px] font-normal">(Optional)</span>
              </label>
              <input 
                name="phone"
                type="tel" 
                value={formData.phone}
                onChange={handleChange}
                placeholder="+880 1XXX-XXXXXX" 
                className="w-full bg-slate-950/90 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-slate-200 mb-1.5">
              Message <span className="text-cyan-400">*</span> <span className="text-slate-400 text-[11px] font-normal">(Enter to send, Shift+Enter for newline)</span>
            </label>
            <textarea 
              required
              name="message"
              rows="4" 
              value={formData.message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Write your message here..." 
              className="w-full bg-slate-950/90 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status.loading}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 disabled:opacity-50 text-slate-950 font-bold text-sm rounded-lg transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 cursor-pointer"
          >
            {status.loading ? (
              <>Sending <Loader2 size={16} className="animate-spin text-slate-950" /></>
            ) : (
              <>Send Message <Send size={16} /></>
            )}
          </button>

          {status.success && (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 bg-emerald-950/70 border border-emerald-500/50 p-3 rounded-lg animate-fadeIn">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
              <span>Thank you! Your message has been sent successfully.</span>
            </div>
          )}

          {status.error && (
            <div className="flex items-center gap-2 text-xs font-mono text-rose-300 bg-rose-950/70 border border-rose-500/50 p-3 rounded-lg animate-fadeIn">
              <AlertCircle size={16} className="shrink-0 text-rose-400" />
              <span>{status.error}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;