# 🚀 Personal Portfolio Website | Md. Saidur Rahman Sohan

Welcome to the official repository of my personal portfolio web application. Built with **React.js (Vite)**, **Tailwind CSS**, and modern UI/UX architecture, this platform showcases my professional profile, technical expertise, full-stack projects, and IEEE research contributions.

---

## 🌟 Key Features & Architecture

* **🎨 Intelligent Theme Switching (Day & Night Mode):** Seamless light and dark mode synchronization with persistent state (`localStorage`) and automatic mobile status bar meta theme adaptation.
* **🧠 Neural Network Node Mesh Background:** High-performance HTML5 Canvas background featuring responsive interactive cursor synapsing, smooth node floating, and soft ambient nebulae glows.
* **🔍 Dynamic Skills Engine:** 6-category technical stack featuring real-time live keyword search, category filtering tabs, and micro-tooltips[cite: 6].
* **🧭 ScrollSpy Navigation & Smooth Scrolling:** Active section tracking with dynamic glowing indicators, progress bar, and ultra-smooth scrolling transitions[cite: 6].
* **💻 Featured Projects & Deployment:** In-depth showcase of full-stack production apps (such as *AxyMart*), complete with tiered pricing logic, secure admin demo credentials, and direct copy-to-clipboard utilities[cite: 6].
* **📑 Interactive Resume Modal:** Built-in professional PDF resume viewer with animated status tags, direct download triggers, and external viewing capabilities[cite: 6].
* **📖 Academic Research Showcase:** Dedicated section highlighting peer-reviewed IEEE conference publications, author lists, methodology highlights, and direct IEEE Xplore digital library access[cite: 6].
* **✉️ Live Working Contact Form:** Integrated with WebForms API for real-time inbox delivery, keyboard shortcuts (`Enter` to submit), and quick-copy contact cards[cite: 6].
* **📱 Fully Responsive Design:** Mobile-first responsive UI built with Tailwind CSS, featuring collapsible drawers and fluid typography[cite: 6].

---

## 🛠️ Tech Stack & Tools

* **Frontend Framework:** React.js (Vite), JavaScript (ES6+)[cite: 6]
* **Styling & Design System:** Tailwind CSS, PostCSS[cite: 6]
* **Icons & Assets:** Lucide React[cite: 6]
* **Animations & Canvas:** HTML5 Canvas API (Custom Neural Mesh Engine)[cite: 6]
* **Form Service:** WebForms API[cite: 6]
* **Deployment & Hosting:** Vercel / GitHub Pages[cite: 6]

---

## 📂 Project Structure

```text
src/
├── assets/                  # Static Images, Logo & Media files
├── components/              
│   ├── Navbar.jsx           # Sticky Navbar with ScrollSpy, Progress Bar & Resume Trigger
│   ├── Hero.jsx             # Hero Section with Typewriter Effect & 3D Tilt Portrait
│   ├── Skills.jsx           # Symmetrical Skill Grid with Search & Category Filters
│   ├── Projects.jsx         # Featured Works, Tech Tags & Live Demo Links
│   ├── Research.jsx         # IEEE Publication Highlights & Direct Paper Links
│   ├── Guestbook.jsx        # Interactive Community Guestbook (Firebase Firestore)
│   ├── Contact.jsx          # Live WebForms Integration & Copy-to-Clipboard Actions
│   ├── Footer.jsx           # Unified Global Footer with Quick Navigation
│   ├── ScrollToTop.jsx      # Floating Back-to-Top Navigation Button
│   ├── ResumeModal.jsx      # Interactive PDF Resume Viewer Modal
│   ├── ThemeConfigurator.jsx# Floating Light/Dark Mode Switcher
│   └── SmartSpaceBackground.jsx # Dynamic Neural Mesh Canvas & Nebula Glow Layer
├── App.jsx                  # Root Application, Theme State & Route Scaffolding
├── App.css                  # Component-Specific Styles
├── index.css                # Tailwind Directives & Smooth Scroll Config
└── main.jsx                 # React DOM Mounting & Entry Point
