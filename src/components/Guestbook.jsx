import React, { useState, useEffect, useMemo } from 'react';
import { 
  MessageSquare, Send, Lock, Trash2, Clock, Edit2, Check, X, 
  ShieldCheck, Heart, Flame, Sparkles, User, 
  Briefcase, Code2, Rocket, Compass, CornerDownRight,
  Mic, MicOff, Volume2, VolumeX, Flame as TrendingIcon
} from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, deleteDoc, updateDoc, doc, serverTimestamp, arrayUnion, arrayRemove } from 'firebase/firestore';

const ROLE_OPTIONS = [
  { label: "Recruiter / HR", icon: Briefcase },
  { label: "Software Engineer", icon: Code2 },
  { label: "Client / Founder", icon: Rocket },
  { label: "Visitor / Peer", icon: Compass },
];

const FILTER_TABS = ["All", "Recruiter / HR", "Software Engineer", "Client / Founder", "Top Liked"];

// টাইমজোন টু কান্ট্রি কোড অফলাইন ডিকশনারি
const detectCountryByTimezone = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    
    if (tz.includes("Dhaka")) return "bd";
    if (tz.includes("Kolkata") || tz.includes("Calcutta")) return "in";
    if (tz.includes("London")) return "gb";
    if (tz.includes("New_York") || tz.includes("Los_Angeles") || tz.includes("Chicago") || tz.includes("Denver") || tz.includes("Phoenix") || tz.includes("Anchorage") || tz.includes("Honolulu")) return "us";
    if (tz.includes("Toronto") || tz.includes("Vancouver") || tz.includes("Montreal")) return "ca";
    if (tz.includes("Sydney") || tz.includes("Melbourne") || tz.includes("Brisbane")) return "au";
    if (tz.includes("Berlin") || tz.includes("Frankfurt")) return "de";
    if (tz.includes("Paris")) return "fr";
    if (tz.includes("Tokyo")) return "jp";
    if (tz.includes("Singapore")) return "sg";
    if (tz.includes("Dubai")) return "ae";
    if (tz.includes("Karachi")) return "pk";
    if (tz.includes("Colombo")) return "lk";
    if (tz.includes("Kathmandu")) return "np";
    if (tz.includes("Riyadh")) return "sa";
    if (tz.includes("Kuala_Lumpur")) return "my";
    
    // এশিয়া জোনের ডিফল্ট বাংলাদেশ
    if (tz.startsWith("Asia/")) return "bd";

    return "bd";
  } catch (e) {
    return "bd";
  }
};

// মিনিমাল সিন্থেসাইজড সাউন্ড ইঞ্জিন
const playBeepSound = (type = 'click', isMuted = false) => {
  if (isMuted) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'success') {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'reaction') {
      osc.frequency.setValueAtTime(750, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    }
  } catch (e) {
    // Audio block ignore
  }
};

const Guestbook = ({ isDarkMode = true }) => {
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Visitor / Peer');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // UI & Utility State
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [countryCode, setCountryCode] = useState('bd');

  // Edit & Reply State
  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState('');
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyName, setReplyName] = useState('');
  const [replyText, setReplyText] = useState('');

  // Secret Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [showPinInput, setShowPinInput] = useState(false);

  // ব্রাউজার ক্লায়েন্ট টোকেন
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    let token = localStorage.getItem('guestbook_user_token');
    if (!token) {
      token = 'user_' + Math.random().toString(36).substring(2, 9) + Date.now();
      localStorage.setItem('guestbook_user_token', token);
    }
    setUserToken(token);

    // কোনো এক্সটার্নাল এপিআই ছাড়া সরাসরি ডিভাইস টাইমজোন থেকে দেশ নির্ধারণ
    const detectedCountry = detectCountryByTimezone();
    setCountryCode(detectedCountry);

    // ফায়ারবেস রিয়েল-টাইম লিসেনার
    const unsubscribe = onSnapshot(
      collection(db, "guestbook_notes"),
      (snapshot) => {
        const fetched = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data()
        }));
        
        fetched.sort((a, b) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.timestamp || 0);
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.timestamp || 0);
          return timeB - timeA;
        });

        setNotes(fetched);
      },
      (error) => console.error("Firestore Listen Error:", error)
    );

    return () => unsubscribe();
  }, []);

  // ভয়েস টু টেক্সট
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    if (!isListening) {
      recognition.start();
      setIsListening(true);
      playBeepSound('click', isMuted);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  // ফিল্টার করা নোটস
  const filteredNotes = useMemo(() => {
    if (selectedFilter === "All") return notes;
    if (selectedFilter === "Top Liked") {
      return [...notes].sort((a, b) => {
        const aLikes = (a.likedBy?.length || 0) + (a.reactions?.likes || 0);
        const bLikes = (b.likedBy?.length || 0) + (b.reactions?.likes || 0);
        return bLikes - aLikes;
      });
    }
    return notes.filter(n => n.role === selectedFilter);
  }, [notes, selectedFilter]);

  // নতুন পোস্ট সাবমিট
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    try {
      setIsSubmitting(true);
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      await addDoc(collection(db, "guestbook_notes"), {
        name: name.trim(),
        role: role,
        country: countryCode || 'bd',
        message: message.trim(),
        authorToken: userToken,
        timestamp: Date.now(),
        displayDate: `Today at ${currentTime}`,
        likedBy: [],
        firedBy: [],
        replies: [],
        createdAt: serverTimestamp()
      });

      setName('');
      setMessage('');
      playBeepSound('success', isMuted);
    } catch (err) {
      console.error("Firestore Submit Error:", err);
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // থ্রেডেড রিপ্লাই সাবমিট
  const handleReplySubmit = async (noteId) => {
    if (!replyText.trim()) return;
    
    const finalName = isAdmin ? "Author" : (replyName.trim() || "Peer Visitor");
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newReply = {
      id: 'reply_' + Date.now(),
      name: finalName,
      text: replyText.trim(),
      isOwner: isAdmin,
      displayDate: `Today at ${currentTime}`,
      timestamp: Date.now()
    };

    try {
      const noteRef = doc(db, "guestbook_notes", noteId);
      await updateDoc(noteRef, {
        replies: arrayUnion(newReply)
      });
      setReplyText('');
      setReplyName('');
      setActiveReplyId(null);
      playBeepSound('click', isMuted);
    } catch (err) {
      console.error("Reply failed:", err);
    }
  };

  // স্মার্ট টগল রিয়্যাকশন হ্যান্ডলার
  const handleReaction = async (noteId, type, isAlreadyReacted) => {
    try {
      playBeepSound('reaction', isMuted);
      const noteRef = doc(db, "guestbook_notes", noteId);
      const fieldName = type === 'likes' ? 'likedBy' : 'firedBy';

      if (isAlreadyReacted) {
        await updateDoc(noteRef, {
          [fieldName]: arrayRemove(userToken)
        });
      } else {
        await updateDoc(noteRef, {
          [fieldName]: arrayUnion(userToken)
        });
      }
    } catch (err) {
      console.error("Reaction failed:", err);
    }
  };

  // এডিট সেভ
  const handleUpdate = async (noteId) => {
    if (!editMessage.trim()) return;
    try {
      await updateDoc(doc(db, "guestbook_notes", noteId), {
        message: editMessage.trim(),
        isEdited: true
      });
      setEditingId(null);
      setEditMessage('');
      playBeepSound('click', isMuted);
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  };

  // অ্যাডমিন আনলক
  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (adminPin === "7815") {
      setIsAdmin(true);
      setShowPinInput(false);
      setAdminPin('');
      playBeepSound('success', isMuted);
    } else {
      alert("Invalid Admin PIN");
    }
  };

  // অ্যাডমিন ডিলিট
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "guestbook_notes", id));
      playBeepSound('click', isMuted);
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  return (
    <section id="guestbook" className="pt-6 md:pt-10 pb-12 px-4 md:px-6 max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase ${
              isDarkMode ? 'text-cyan-400' : 'text-sky-600'
            }`}>
              <MessageSquare size={15} /> Public Feed
            </div>

            <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded-full border ${
              isDarkMode ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-700'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Live Sync Active
            </span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Public Live Feed
          </h2>
        </div>

        {/* Audio Toggle & Admin Lock */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-xl border text-xs transition cursor-pointer ${
              isDarkMode ? 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-cyan-400' : 'bg-white border-slate-200 text-slate-600'
            }`}
            title={isMuted ? "Unmute UI sounds" : "Mute UI sounds"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {!isAdmin ? (
            <button 
              onClick={() => setShowPinInput(!showPinInput)} 
              className={`p-2 rounded-xl border text-xs transition cursor-pointer ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800 text-slate-500 hover:text-slate-300' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
              }`}
              title="Admin Login"
            >
              <Lock size={15} />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono px-2.5 py-1 rounded-xl border flex items-center gap-1.5 font-semibold ${
                isDarkMode 
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300' 
                  : 'bg-emerald-50 border-emerald-300 text-emerald-700'
              }`}>
                <ShieldCheck size={13} /> Admin
              </span>
              <button 
                onClick={() => setIsAdmin(false)}
                className="text-xs font-mono text-slate-300 hover:text-rose-400 transition cursor-pointer"
              >
                Exit
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Secret PIN Form */}
      {showPinInput && !isAdmin && (
        <form onSubmit={handleAdminAuth} className={`flex gap-2 p-3 rounded-xl w-full max-w-xs border shadow-xl ${
          isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <input
            type="password"
            placeholder="Admin PIN"
            value={adminPin}
            onChange={(e) => setAdminPin(e.target.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border focus:outline-none flex-grow ${
              isDarkMode ? 'bg-slate-950 text-white border-slate-700 focus:border-cyan-400' : 'bg-slate-50 text-slate-800 border-slate-300'
            }`}
          />
          <button 
            type="submit" 
            className={`px-3 py-1.5 text-xs font-bold font-mono rounded-lg transition active:scale-95 cursor-pointer ${
              isDarkMode ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950' : 'bg-sky-600 hover:bg-sky-500 text-white'
            }`}
          >
            Unlock
          </button>
        </form>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Side: Note Input Box */}
        <form 
          onSubmit={handleSubmit}
          className={`lg:col-span-5 p-5 md:p-6 rounded-2xl border shadow-xl space-y-4 backdrop-blur-md transition-all ${
            isDarkMode ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' : 'bg-white/90 border-slate-200'
          }`}
        >
          <div className="space-y-1">
            <h3 className={`text-lg font-bold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Write to Feed
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Drop a message, review, or say hello to the network.
            </p>
          </div>

          {/* Role Selector Grid */}
          <div>
            <label className={`block text-xs font-mono font-semibold mb-2 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Identity / Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ROLE_OPTIONS.map((item) => {
                const IconComponent = item.icon;
                const isSelected = role === item.label;
                return (
                  <button
                    type="button"
                    key={item.label}
                    onClick={() => {
                      setRole(item.label);
                      playBeepSound('click', isMuted);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono transition-all text-left border cursor-pointer active:scale-95 ${
                      isSelected
                        ? isDarkMode 
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20 font-bold'
                          : 'bg-sky-100 border-sky-500 text-sky-900 font-bold'
                        : isDarkMode
                          ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <IconComponent 
                      size={14} 
                      className={`shrink-0 transition-colors ${
                        isSelected ? (isDarkMode ? 'text-cyan-400' : 'text-sky-600') : 'text-slate-500'
                      }`} 
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div>
            <label className={`block text-xs font-mono font-semibold mb-1 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Your Name
            </label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Jenkins" 
              className={`w-full rounded-xl px-3.5 py-2 text-xs font-mono border focus:outline-none transition ${
                isDarkMode 
                  ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-500'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className={`text-xs font-mono font-semibold ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Message
              </label>
              
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`text-[11px] font-mono flex items-center gap-1 transition px-2 py-0.5 rounded-md border cursor-pointer ${
                  isListening 
                    ? 'bg-rose-950 border-rose-500 text-rose-300 animate-pulse' 
                    : isDarkMode 
                      ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-cyan-400' 
                      : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}
                title="Dictate message with voice"
              >
                {isListening ? <MicOff size={12} /> : <Mic size={12} />}
                {isListening ? "Listening..." : "Speech-to-Text"}
              </button>
            </div>
            <textarea 
              required
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a quick message or review..." 
              className={`w-full rounded-xl px-3.5 py-2 text-xs font-mono border focus:outline-none resize-none transition ${
                isDarkMode 
                  ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-500'
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2.5 font-mono font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 active:scale-95 cursor-pointer shadow-lg disabled:opacity-50 ${
              isDarkMode 
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20' 
                : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-500/20'
            }`}
          >
            {isSubmitting ? "Posting..." : "Broadcast Message"} <Send size={13} />
          </button>
        </form>

        {/* Right Side: Public Live Feed & Filtering */}
        <div className="lg:col-span-7 space-y-3">
          
          {/* Filter Pills Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {FILTER_TABS.map((tab) => {
              const isSelected = selectedFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setSelectedFilter(tab);
                    playBeepSound('click', isMuted);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition cursor-pointer border ${
                    isSelected
                      ? isDarkMode 
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold' 
                        : 'bg-sky-100 border-sky-500 text-sky-800 font-bold'
                      : isDarkMode 
                        ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white' 
                        : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  {tab === "Top Liked" && <TrendingIcon size={11} className="inline mr-1 text-amber-400" />}
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Compact Scrollable Feed */}
          <div 
            className={`space-y-3 max-h-[380px] md:max-h-[460px] overflow-y-auto pr-1.5 md:pr-2 rounded-2xl transition-all ${
              isDarkMode
                ? '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-cyan-500/50'
                : '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-sky-400'
            }`}
          >
            {filteredNotes.length === 0 ? (
              <div className={`text-center py-12 md:py-16 px-4 border border-dashed rounded-2xl flex flex-col items-center justify-center space-y-2 ${
                isDarkMode ? 'text-slate-400 border-slate-800 bg-slate-900/20' : 'text-slate-400 border-slate-200 bg-slate-50'
              }`}>
                <div className="p-3 bg-cyan-950/40 rounded-full border border-cyan-500/20 text-cyan-400">
                  <MessageSquare size={20} />
                </div>
                <p className="text-xs font-mono font-bold text-slate-200">No notes found in this category</p>
                <p className="text-[11px] text-slate-400">Be the first to leave a message! 🚀</p>
              </div>
            ) : (
              filteredNotes.map((note) => {
                const isAuthor = note.authorToken === userToken;
                const isEditing = editingId === note.id;

                const likedList = Array.isArray(note.likedBy) ? note.likedBy : [];
                const firedList = Array.isArray(note.firedBy) ? note.firedBy : [];
                const repliesList = Array.isArray(note.replies) ? note.replies : [];

                const hasLiked = likedList.includes(userToken);
                const hasFired = firedList.includes(userToken);

                const totalLikes = likedList.length + (note.reactions?.likes || 0);
                const totalFires = firedList.length + (note.reactions?.fires || 0);

                const country = (note.country || 'bd').toLowerCase();

                return (
                  <div 
                    key={note.id} 
                    className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 backdrop-blur-md ${
                      isDarkMode 
                        ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-md' 
                        : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {/* Avatar, Inline Flag Image & User Details */}
                      <div className="flex items-center gap-2.5">
                        <div className="relative shrink-0">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-sky-400 flex items-center justify-center text-slate-950 font-bold text-sm font-mono shadow-sm">
                            {note.name?.charAt(0)?.toUpperCase() || <User size={14} />}
                          </div>
                          
                          {/* Image Flag */}
                          <div className="absolute -bottom-1 -right-1 bg-slate-950 p-0.5 rounded border border-slate-800 flex items-center justify-center shadow-xs">
                            <img
                              src={`https://flagcdn.com/w40/${country}.png`}
                              alt={country}
                              className="w-3.5 h-2.5 object-cover rounded-xs"
                              loading="lazy"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-bold font-mono ${
                            isDarkMode ? 'text-white' : 'text-slate-900'
                          }`}>
                            {note.name}
                          </span>
                          {note.role && (
                            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border font-medium ${
                              isDarkMode 
                                ? 'bg-slate-950 border-slate-700 text-cyan-300' 
                                : 'bg-slate-100 border-slate-200 text-slate-700'
                            }`}>
                              {note.role}
                            </span>
                          )}
                          {isAuthor && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-400/50 text-cyan-300 font-bold">
                              You
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Header Actions */}
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {note.displayDate || "Just now"}
                        </span>
                        {note.isEdited && (
                          <span className="text-[10px] text-slate-400 font-mono">(edited)</span>
                        )}

                        {isAuthor && !isEditing && (
                          <button
                            onClick={() => {
                              setEditingId(note.id);
                              setEditMessage(note.message);
                              playBeepSound('click', isMuted);
                            }}
                            className="p-1 text-slate-400 hover:text-cyan-400 transition cursor-pointer"
                            title="Edit note"
                          >
                            <Edit2 size={13} />
                          </button>
                        )}

                        {isAdmin && (
                          <button 
                            onClick={() => handleDelete(note.id)} 
                            className="p-1 text-rose-400 hover:text-rose-300 transition cursor-pointer"
                            title="Admin Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Message Body */}
                    {isEditing ? (
                      <div className="space-y-2 pt-1 pl-10">
                        <textarea
                          rows="2"
                          value={editMessage}
                          onChange={(e) => setEditMessage(e.target.value)}
                          className={`w-full rounded-lg px-3 py-1.5 text-xs font-mono border focus:outline-none ${
                            isDarkMode 
                              ? 'bg-slate-950 border-slate-700 text-white focus:border-cyan-400' 
                              : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-500'
                          }`}
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-mono flex items-center gap-1 hover:bg-slate-700 cursor-pointer"
                          >
                            <X size={12} /> Cancel
                          </button>
                          <button
                            onClick={() => handleUpdate(note.id)}
                            className="px-2.5 py-1 rounded bg-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-1 hover:bg-cyan-400 cursor-pointer"
                          >
                            <Check size={12} /> Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="pl-10 space-y-2.5">
                        <p className={`text-sm leading-relaxed font-sans font-normal ${
                          isDarkMode ? 'text-slate-100' : 'text-slate-800'
                        }`}>
                          "{note.message}"
                        </p>

                        {/* Reactions & Reply Toggle */}
                        <div className="flex items-center gap-2 pt-0.5">
                          <button
                            onClick={() => handleReaction(note.id, 'likes', hasLiked)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border transition active:scale-95 cursor-pointer ${
                              hasLiked
                                ? isDarkMode
                                  ? 'bg-rose-950/80 border-rose-500 text-rose-300 font-bold'
                                  : 'bg-rose-50 border-rose-300 text-rose-700 font-bold'
                                : isDarkMode 
                                  ? 'bg-slate-950/90 border-slate-800 text-slate-300 hover:text-rose-400 hover:border-rose-500/40' 
                                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-rose-600'
                            }`}
                            title={hasLiked ? "Unlike" : "Like"}
                          >
                            <Heart size={13} className={hasLiked ? "text-rose-500 fill-rose-500" : "text-rose-400"} /> 
                            <span>{totalLikes}</span>
                          </button>

                          <button
                            onClick={() => handleReaction(note.id, 'fires', hasFired)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border transition active:scale-95 cursor-pointer ${
                              hasFired
                                ? isDarkMode
                                  ? 'bg-amber-950/80 border-amber-500 text-amber-300 font-bold'
                                  : 'bg-amber-50 border-amber-300 text-amber-700 font-bold'
                                : isDarkMode 
                                  ? 'bg-slate-950/90 border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40' 
                                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-amber-600'
                            }`}
                            title={hasFired ? "Remove Flame" : "Add Flame"}
                          >
                            <Flame size={13} className={hasFired ? "text-amber-500 fill-amber-500" : "text-amber-400"} /> 
                            <span>{totalFires}</span>
                          </button>

                          <button
                            onClick={() => {
                              setActiveReplyId(activeReplyId === note.id ? null : note.id);
                              playBeepSound('click', isMuted);
                            }}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono border transition cursor-pointer ${
                              activeReplyId === note.id
                                ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                                : isDarkMode 
                                  ? 'bg-slate-950/90 border-slate-800 text-slate-400 hover:text-cyan-400' 
                                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-sky-600'
                            }`}
                          >
                            <CornerDownRight size={13} /> Reply {repliesList.length > 0 && `(${repliesList.length})`}
                          </button>
                        </div>

                        {/* Nested Replies Thread */}
                        {repliesList.length > 0 && (
                          <div className="mt-3 space-y-2 pl-3 border-l-2 border-slate-800">
                            {repliesList.map((reply) => {
                              return (
                                <div 
                                  key={reply.id} 
                                  className={`p-2.5 rounded-lg text-xs font-sans border ${
                                    reply.isOwner 
                                      ? isDarkMode ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-100' : 'bg-sky-50 border-sky-300 text-sky-900'
                                      : isDarkMode ? 'bg-slate-950/60 border-slate-800/80 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-bold font-mono text-[11px] text-slate-200">{reply.name}</span>
                                      {reply.isOwner && (
                                        <span className="text-[9px] font-mono px-1 rounded bg-cyan-500 text-slate-950 font-bold">Author</span>
                                      )}
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-500">{reply.displayDate}</span>
                                  </div>
                                  <p className="text-xs leading-normal">{reply.text}</p>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Inline Reply Input Box */}
                        {activeReplyId === note.id && (
                          <div className="mt-2 space-y-2 p-3 rounded-xl border bg-slate-950/80 border-slate-800">
                            {!isAdmin && (
                              <input
                                type="text"
                                placeholder="Your name (optional)"
                                value={replyName}
                                onChange={(e) => setReplyName(e.target.value)}
                                className="w-full px-2.5 py-1 text-xs font-mono rounded-lg border bg-slate-900 border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                              />
                            )}
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder={isAdmin ? "Replying as Author..." : "Write a reply..."}
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleReplySubmit(note.id); }}
                                className="flex-grow px-2.5 py-1 text-xs font-sans rounded-lg border bg-slate-900 border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                              />
                              <button
                                onClick={() => handleReplySubmit(note.id)}
                                className="px-3 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono hover:bg-cyan-400 transition cursor-pointer"
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        )}

                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Guestbook;