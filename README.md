# 🚀 Personal Portfolio Website | Md. Saidur Rahman Sohan

Welcome to my personal portfolio repository! This is a modern, responsive, and feature-rich portfolio web application engineered with **React.js**, **Tailwind CSS**, and **Framer Motion**. It features a dynamic interactive particle canvas background, intelligent theme persistence, smooth scroll navigation, and seamless API integrations.

---

## 🌟 Key Features

* **🌗 Intelligent Theme Switching (Day & Night Mode):** Tailored light and dark components with persistent storage (`localStorage`) for seamless browsing across sessions.
* **✨ Dynamic Skills Engine:** 6-category technical stack featuring real-time live search, interactive category filtering tabs, and micro-tooltips.
* **📜 ScrollSpy Navigation & Smooth Scrolling:** Active section tracking with dynamic glowing indicators, breadcrumbs, and ultra-smooth scrolling.
* **📬 Live Working Contact Form:** Integrated with **Web3Forms API** for real-time inbox delivery, keyboard shortcuts (`Enter` to submit), and one-click copy-to-clipboard contact cards.
* **📄 Interactive Resume Modal:** In-app PDF resume viewer with animated status radar and direct download capabilities.
* **🔬 Academic Research Showcase:** Dedicated section highlighting published IEEE conference research with direct digital library access.
* **🌌 Smart Particle Space Canvas:** High-performance HTML5 Canvas background with dynamic cursor tracking, particle drift, and nebula ambient glows.
* **⚡ Dynamic Global Footer:** Unified responsive footer with auto-updating copyright year (`new Date().getFullYear()`), live tech attribution, and quick back-to-top navigation.
* **📱 Fully Responsive Design:** Clean, mobile-first responsive UI built with Tailwind CSS.

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite), JavaScript (ES6+)
* **Styling & Design:** Tailwind CSS
* **Icons & Assets:** Lucide React
* **Animations:** Framer Motion, HTML5 Canvas API
* **Form Service:** Web3Forms API
* **Deployment:** GitHub Pages / Vercel

---

## 📂 Project Architecture

```text
src/
├── assets/                                # Static icons, logos, and preview media
├── components/
│   ├── Navbar.jsx / NavbarLight.jsx       # Header with ScrollSpy & Live Radar Resume Trigger
│   ├── Hero.jsx / HeroLight.jsx           # Hero Section with Typing Effect & Dynamic Avatar
│   ├── Skills.jsx / SkillsLight.jsx       # Symmetrical 3x2 Grid with Search & Category Filters
│   ├── Projects.jsx / ProjectsLight.jsx   # Featured Works, Tech Tags & Live Demo Links
│   ├── Research.jsx / ResearchLight.jsx   # IEEE Publication Highlights & Direct Paper Links
│   ├── Contact.jsx / ContactLight.jsx     # Web3Forms Integration & Click-to-Copy Actions
│   ├── Footer.jsx / FooterLight.jsx       # Unified Global Footer with Dynamic Year & Quick Navigation
│   ├── ScrollToTop.jsx                    # Floating Back-to-Top Navigation Button
│   ├── ResumeModal.jsx                    # Interactive PDF Resume Viewer Modal
│   ├── SmartSpaceBackground.jsx           # Dynamic Canvas Particle & Nebula Glow Layer
│   └── ThemeConfigurator.jsx              # Floating Light/Dark Mode Switcher
├── App.css                                # Component-Specific Styles
├── App.jsx                                # Root Application, Theme State & Route Scaffolding
├── index.css                              # Tailwind Directives & Smooth Scroll Config
└── main.jsx                               # React DOM Mounting & Entry Point
