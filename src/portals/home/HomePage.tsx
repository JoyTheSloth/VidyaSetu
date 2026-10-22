import React, { useState } from 'react';
import { 
  Shield, ArrowRight, CheckCircle2, ChevronRight, 
  Award, Calendar, Laptop, Sun, Moon,
  Users, GraduationCap, Check, BookOpen, Star, Building2,
  Clock, School, HeartHandshake, PhoneCall, Mail,
  Sparkles, Bell, Volume2, MapPin, Eye, X, BookMarked,
  Microscope, Palette, Flame, Quote, Menu, Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import { TextType } from '../../components/common/TextType';
import { motion, AnimatePresence } from 'framer-motion';

interface HomePageProps {
  onGoToPortal: (role?: Role) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGoToPortal }) => {
  const { school, theme, toggleTheme } = useApp();
  
  // Active Section Scroll Spy & Scroll Header Elevation
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ['hero', 'academics', 'philosophy', 'gallery', 'events', 'footer'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero Section Auto-Carousel Slides
  const heroSlides = [
    {
      image: '/assets/campus_building.jpg',
      title: 'Main Academic Campus & Vedic Heritage Building',
      label: 'Campus View'
    },
    {
      image: '/assets/stem_lab.jpg',
      title: 'Advanced AI & Atal Tinkering STEM Innovation Labs',
      label: 'Robotics & Research'
    },
    {
      image: '/assets/sports_complex.jpg',
      title: 'Olympic-Standard Track, Cricket Turf & Athletic Fields',
      label: 'Sports Arena'
    },
    {
      image: '/assets/vedic_manuscript.jpg',
      title: 'Sacred Sanskrit Library & Epistemological Archives',
      label: 'Philosophy Wing'
    }
  ];
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  // Auto slide interval every 4.5 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Gallery Tab & Lightbox
  const [activeGalleryTab, setActiveGalleryTab] = useState<'all' | 'campus' | 'labs' | 'sports' | 'library'>('all');
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string; desc: string } | null>(null);

  // Event Category Filter
  const [eventFilter, setEventFilter] = useState<'all' | 'academic' | 'sports' | 'cultural'>('all');

  // Campus Gallery Data
  const galleryItems = [
    {
      id: 'g1',
      category: 'campus',
      title: 'Main Academic Campus Wing',
      desc: 'Four-story neo-classical architecture housing 48 modern smart classrooms and administrative chambers.',
      src: '/assets/campus_building.jpg',
      badge: 'Campus View'
    },
    {
      id: 'g2',
      category: 'labs',
      title: 'Atal Tinkering & STEM Robotics Lab',
      desc: 'Advanced 3D printers, IoT microcontrollers, automation kits, and collaborative maker tables.',
      src: '/assets/stem_lab.jpg',
      badge: 'STEM / AI Lab'
    },
    {
      id: 'g3',
      category: 'library',
      title: 'Saraswati Central Library & Vedic Archives',
      desc: 'Over 25,000 reference volumes, international journals, digital e-book kiosks, and rare Sanskrit palm-leaf manuscripts.',
      src: '/assets/vedic_manuscript.jpg',
      badge: 'Knowledge Hub'
    },
    {
      id: 'g4',
      category: 'sports',
      title: 'Sri Chaitanya Athletic Arena & Track',
      desc: 'Olympic-grade 400m synthetic running track, full-size football field, volleyball pavilion, and athletic spectator stands.',
      src: '/assets/sports_complex.jpg',
      badge: 'Sports Complex'
    }
  ];

  const filteredGallery = activeGalleryTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeGalleryTab);

  // Events Calendar Data
  const events = [
    { id: 'e1', type: 'academic', date: '24 Oct 2025', title: 'CBSE Regional Science & AI Exhibition', time: '09:30 AM', venue: 'STEM Innovation Block', tag: 'Academic' },
    { id: 'e2', type: 'sports', date: '28 Oct 2025', title: 'Inter-House Annual Track & Field Meet', time: '08:00 AM', venue: 'Athletic Arena', tag: 'Sports' },
    { id: 'e3', type: 'cultural', date: '04 Nov 2025', title: 'Gita Jayanti & Vedic Heritage Conclave', time: '10:00 AM', venue: 'Swami Prabhupada Auditorium', tag: 'Cultural' },
    { id: 'e4', type: 'academic', date: '15 Nov 2025', title: 'Pre-Board Model Assessments Phase 1', time: '08:30 AM', venue: 'Examination Wings', tag: 'Academic' },
  ];

  const filteredEvents = eventFilter === 'all' 
    ? events 
    : events.filter(e => e.type === eventFilter);

  return (
    <div className="home-page min-h-screen bg-[#F8FAFC] dark:bg-[#07131F] text-[#1E293B] dark:text-slate-100 flex flex-col selection:bg-[#002B66] selection:text-white transition-colors duration-200 relative overflow-x-clip">
      
      {/* Small Square Dotted Grid Pattern Background - Theme Adaptive & Subtle */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
        {/* Subtle Small Square Dotted Grid: Navy in Light Mode, Soft Slate/Amber in Dark Mode */}
        <div 
          className="absolute inset-0 opacity-[0.18] dark:opacity-[0.28] text-[#002B66] dark:text-[#94A3B8]"
          style={{
            backgroundImage: `radial-gradient(currentColor 1.2px, transparent 1.2px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Ultra-soft ambient vignettes for gentle atmosphere */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full bg-gradient-to-b from-amber-400/5 dark:from-amber-400/8 via-transparent to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-[450px] h-[450px] rounded-full bg-gradient-to-r from-[#002B66]/4 dark:from-blue-500/6 via-transparent to-transparent blur-3xl pointer-events-none" />
      </div>
      
      {/* 1. Fixed Institutional Header (Live Circular + Main Navigation Bar) - Permanently pinned at top */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Live Urgent Notice Ticker Bar */}
        <div 
          className={`bg-[#001D45] dark:bg-[#050C14] text-white px-4 sm:px-8 text-xs flex items-center justify-between border-b border-white/10 transition-all duration-300 overflow-hidden ${
            isScrolled ? 'max-h-0 py-0 opacity-0 border-b-0' : 'max-h-12 py-2 opacity-100'
          }`}
        >
          <div className="max-w-7xl mx-auto w-full flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shrink-0 animate-pulse">
              <Volume2 className="w-3 h-3" /> Live Circular
            </span>
            <div className="overflow-hidden whitespace-nowrap flex-1">
              <div className="inline-block animate-marquee text-[11px] sm:text-xs text-slate-200 font-medium">
                🔔 Admissions Open for Academic Session 2025–26 (LKG to Class 11 Science/Commerce) • CBSE Class 10 & 12 Registration Forms Verification Closes this Friday • Inter-School Science Conclave Nominations Invited.
              </div>
            </div>
            <span className="hidden md:inline-block text-[11px] text-amber-300 font-mono font-bold shrink-0">
              Helpline: +91 98765 43210
            </span>
          </div>
        </div>

        {/* 2. Top Institutional Navbar - Complete with School Logo & Crest & Micro-animations */}
        <nav 
          className={`w-full px-3 sm:px-8 lg:px-12 transition-all duration-300 ${
            isScrolled 
              ? 'py-2 sm:py-2.5 bg-white/95 dark:bg-[#081525]/95 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-slate-200/80 dark:border-white/10' 
              : 'py-2.5 sm:py-3.5 bg-white dark:bg-[#081525] border-b border-slate-100 dark:border-white/10 shadow-xs'
          }`}
        >
          <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
            
            {/* School Crest Logo & Institute Name with hover micro-animations */}
            <a 
              href="#hero" 
              className="group flex items-center gap-2 sm:gap-3 shrink min-w-0 cursor-pointer select-none"
            >
              <div className="relative shrink-0">
                <img 
                  src="/assets/school_logo.jpg" 
                  alt="Bhaktivedanta Institute Logo" 
                  className="w-9 h-9 sm:w-12 sm:h-12 rounded-full object-contain shadow-xs border-2 border-amber-400 bg-white p-0.5 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 group-hover:border-amber-500 group-hover:shadow-md group-hover:shadow-amber-500/20"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 border-2 border-white dark:border-[#081525] rounded-full animate-pulse" title="Campus Active" />
              </div>
              <div className="min-w-0 overflow-hidden">
                <div className="text-xs xs:text-sm sm:text-base font-black tracking-tight text-[#002B66] dark:text-white leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                  BHAKTIVEDANTA
                </div>
                <div className="text-[8.5px] xs:text-[9.5px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider group-hover:tracking-widest transition-all duration-200 truncate">
                  INSTITUTE MISSION HR. SEC. SCHOOL
                </div>
                <div className="text-[8.5px] sm:text-[9px] text-amber-600 dark:text-amber-400 font-serif font-bold tracking-wide hidden sm:block truncate">
                  •— अथातो ब्रह्म जिज्ञासा —•
                </div>
              </div>
            </a>

            {/* Center Navigation Links with smooth animated pill background & underline (Desktop) */}
            <div className="hidden xl:flex items-center gap-1.5 p-1 rounded-full bg-slate-100/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-[13px] font-semibold backdrop-blur-xs">
              {[
                { id: 'hero', label: 'Home', href: '#hero' },
                { id: 'academics', label: 'Academics', href: '#academics' },
                { id: 'philosophy', label: 'Philosophy', href: '#philosophy' },
                { id: 'gallery', label: 'Campus Tour', href: '#gallery' },
                { id: 'events', label: 'Notices & Events', href: '#events' },
                { id: 'footer', label: 'Contact', href: '#footer' },
              ].map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 group flex items-center justify-center ${
                      isActive 
                        ? 'bg-[#002B66] text-white shadow-sm shadow-[#002B66]/30 dark:bg-amber-500 dark:text-slate-950 scale-[1.02]' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-[#002B66] dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10'
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-linear-to-r from-amber-400/20 to-transparent pointer-events-none animate-pulse" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right Action Bar: Theme toggle + Vidyasetu Portal Button + Mobile Hamburger Menu */}
            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 shrink-0">
              
              {/* Theme toggle - Circular pill button visible on all devices */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle color theme"
                className="flex w-9 h-9 sm:w-10 sm:h-10 rounded-full text-slate-600 dark:text-amber-300 bg-slate-100/80 hover:bg-slate-200/80 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-200/90 dark:border-white/15 transition-all duration-200 active:scale-90 cursor-pointer shadow-2xs items-center justify-center shrink-0"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300" />
                )}
              </button>

              {/* Vidyasetu Portal Button - Fully compact, unbreakable text & responsive icon */}
              <button
                onClick={() => onGoToPortal()}
                className="group relative flex items-center gap-1.5 sm:gap-2 px-2.5 xs:px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-[#002B66] to-[#003B8A] hover:from-[#001D45] hover:to-[#002B66] text-white shadow-md hover:shadow-lg hover:shadow-[#002B66]/25 transition-all duration-200 active:scale-95 cursor-pointer border border-[#0047A5]/60 overflow-hidden shrink-0"
                title="Enter Vidyasetu Portal"
              >
                <div className="text-amber-400 group-hover:scale-110 transition-transform duration-200 shrink-0">
                  <Laptop className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                </div>
                <div className="text-left leading-none flex items-center gap-1">
                  <span className="text-[12px] sm:text-[14px] font-bold text-white font-vidyasetu whitespace-nowrap">
                    Vidyasetu
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-amber-300 font-bold uppercase tracking-wider hidden sm:inline">
                    Portal
                  </span>
                </div>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0 hidden xs:inline group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>

              {/* Mobile Hamburger Menu Button - Prominent, High-Contrast & Clearly Clickable */}
              <button
                onClick={() => setIsMobileNavOpen(true)}
                aria-label="Open navigation menu"
                className="xl:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-[#002B66] dark:text-white border border-slate-200 dark:border-white/15 transition-all duration-200 active:scale-90 cursor-pointer shadow-xs flex items-center justify-center shrink-0"
              >
                <Menu className="w-5 h-5 stroke-[2.3]" />
              </button>

            </div>
          </div>
        </nav>
      </header>

      {/* Spacer to preserve document flow height so hero content is not obscured by fixed header */}
      <div className={`transition-all duration-300 shrink-0 pointer-events-none ${
        isScrolled ? 'h-[64px] sm:h-[72px]' : 'h-[96px] sm:h-[106px]'
      }`} aria-hidden="true" />

      {/* Mobile Navigation Dialog Box - Centered Modal */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileNavOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Centered Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-[#0D1C2E] border border-slate-200 dark:border-white/15 p-6 shadow-2xl z-10 space-y-5"
            >
              {/* Header with Title and Close Button */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <img 
                    src="/assets/school_logo.jpg" 
                    alt="Logo" 
                    className="w-8 h-8 rounded-full border border-amber-400 object-contain p-0.5 bg-white"
                  />
                  <div>
                    <div className="text-xs font-black text-[#002B66] dark:text-white uppercase tracking-wider">
                      Navigation
                    </div>
                    <div className="text-[10px] text-slate-400">Bhaktivedanta Institute</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileNavOpen(false)}
                  aria-label="Close menu"
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1.5 py-1">
                {[
                  { id: 'hero', label: 'Home', href: '#hero' },
                  { id: 'academics', label: 'Academics & Faculty', href: '#academics' },
                  { id: 'philosophy', label: 'Vedic Philosophy', href: '#philosophy' },
                  { id: 'gallery', label: 'Campus Tour & Labs', href: '#gallery' },
                  { id: 'events', label: 'Notices & Circulars', href: '#events' },
                  { id: 'footer', label: 'Contact Campus', href: '#footer' },
                ].map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all active:scale-98 ${
                      activeSection === link.id
                        ? 'bg-[#002B66] text-white shadow-md dark:bg-amber-400 dark:text-slate-950 font-extrabold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${activeSection === link.id ? 'opacity-100 text-amber-300 dark:text-slate-950' : 'opacity-40'}`} />
                  </a>
                ))}
              </div>

              {/* Dark/Light mode switcher inside drawer */}
              <div className="pt-2 pb-1 border-t border-slate-100 dark:border-white/10 flex items-center justify-between px-1">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Appearance</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-amber-300 border border-slate-200 dark:border-white/15"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-300" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-slate-700" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </div>

              {/* Portal Quick Access Button inside modal */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsMobileNavOpen(false);
                    onGoToPortal();
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-linear-to-r from-[#002B66] via-[#0047AB] to-[#0D5CDE] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform cursor-pointer"
                >
                  <Laptop className="w-4 h-4 text-amber-400" />
                  <span>Launch Vidyasetu Portal</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Hero Section - Streamlined & Centered on Mobile Phones, Grand on Desktop */}
      <section id="hero" className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-0 pb-12 sm:pb-16 lg:pb-0 w-full scroll-mt-24">
        <div className="w-full px-4 sm:px-6 lg:pl-20 lg:pr-0 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle, and CTA Button - Centered on Mobile, Left-aligned on Desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4 sm:space-y-6 lg:space-y-7 relative z-10 pr-0 lg:pr-6 pt-3 sm:py-6 lg:py-16 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Main Headline with TextType dynamic typing effect */}
            <div className="space-y-3 w-full flex flex-col items-center lg:items-start">
              {/* Classical Laurel Wreath Insignia - CBSE Affiliated Sr. Secondary School */}
              <div className="inline-flex items-center justify-center gap-2.5 sm:gap-3 py-1 select-none">
                {/* Left Golden Laurel Wreath */}
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500 shrink-0"
                  viewBox="0 0 36 36"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Stem */}
                  <path
                    d="M26 32 C 18 28, 12 20, 14 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  {/* Leaves on left side */}
                  <path d="M14 6 C 11 7, 9 9, 8 12 C 10 11, 13 9, 14 6 Z" />
                  <path d="M14 10 C 10 11, 7 14, 7 17 C 10 16, 12 13, 14 10 Z" />
                  <path d="M14.5 15 C 10 17, 7 21, 8 24 C 11 23, 13 19, 14.5 15 Z" />
                  <path d="M16 20 C 11 23, 9 27, 10 30 C 13 28, 15 24, 16 20 Z" />
                  <path d="M18 25 C 14 28, 13 32, 15 34 C 17 32, 18 29, 18 25 Z" />
                  {/* Leaves on right side (pointing inward/upward) */}
                  <path d="M14.5 8 C 17 9, 19 12, 19 14 C 17 13, 15 11, 14.5 8 Z" />
                  <path d="M15.5 13 C 18 15, 20 18, 20 20 C 18 19, 16 16, 15.5 13 Z" />
                  <path d="M17 18 C 20 20, 22 23, 22 25 C 20 24, 18 21, 17 18 Z" />
                  <path d="M19 23 C 22 25, 24 28, 23 30 C 21 29, 20 26, 19 23 Z" />
                </svg>

                {/* Classical Centered Academic Typography */}
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-[12px] sm:text-[13.5px] font-black uppercase tracking-[0.22em] text-[#002B66] dark:text-amber-400 font-sans leading-none">
                    CBSE AFFILIATED
                  </span>
                  <span className="text-[9.5px] sm:text-[10.5px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-300 font-sans leading-none mt-1">
                    SR. SECONDARY SCHOOL
                  </span>
                </div>

                {/* Right Golden Laurel Wreath (Flipped Horizontally) */}
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500 shrink-0 transform -scale-x-100"
                  viewBox="0 0 36 36"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Stem */}
                  <path
                    d="M26 32 C 18 28, 12 20, 14 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  {/* Leaves on left side */}
                  <path d="M14 6 C 11 7, 9 9, 8 12 C 10 11, 13 9, 14 6 Z" />
                  <path d="M14 10 C 10 11, 7 14, 7 17 C 10 16, 12 13, 14 10 Z" />
                  <path d="M14.5 15 C 10 17, 7 21, 8 24 C 11 23, 13 19, 14.5 15 Z" />
                  <path d="M16 20 C 11 23, 9 27, 10 30 C 13 28, 15 24, 16 20 Z" />
                  <path d="M18 25 C 14 28, 13 32, 15 34 C 17 32, 18 29, 18 25 Z" />
                  {/* Leaves on right side */}
                  <path d="M14.5 8 C 17 9, 19 12, 19 14 C 17 13, 15 11, 14.5 8 Z" />
                  <path d="M15.5 13 C 18 15, 20 18, 20 20 C 18 19, 16 16, 15.5 13 Z" />
                  <path d="M17 18 C 20 20, 22 23, 22 25 C 20 24, 18 21, 17 18 Z" />
                  <path d="M19 23 C 22 25, 24 28, 23 30 C 21 29, 20 26, 19 23 Z" />
                </svg>
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[30px] xs:text-[36px] sm:text-5xl lg:text-[62px] font-black text-[#002B66] dark:text-white tracking-tight leading-[1.12] sm:leading-[1.05] m-0"
              >
                Nurturing Minds.
              </motion.h1>
              <h1 className="text-[30px] xs:text-[36px] sm:text-5xl lg:text-[62px] font-black text-[#F59E0B] tracking-tight leading-[1.12] sm:leading-[1.05] m-0 flex items-center justify-center lg:justify-start min-h-[40px] xs:min-h-[46px] sm:min-h-[58px] lg:min-h-[72px]">
                <TextType
                  text={[
                    "Building Futures.",
                    "Inspiring Leaders.",
                    "Igniting Curiosity.",
                    "Rooted in Values."
                  ]}
                  as="span"
                  typingSpeed={70}
                  pauseDuration={2200}
                  deletingSpeed={40}
                  deleteMode="backspace"
                  typeEffect="fade"
                  showCursor={false}
                  loop
                />
              </h1>
            </div>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto lg:mx-0 leading-relaxed font-normal pt-1"
            >
              A holistic learning environment that inspires academic excellence, character, and spiritual growth in the heart of our campus.
            </motion.p>

            {/* CTA Button & Watch Our Story Row */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="pt-4 sm:pt-5 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-5 w-full sm:w-auto"
            >
              {/* Primary Pill Button: Explore Vidyasetu ERP with golden circular arrow badge */}
              <button
                onClick={() => onGoToPortal()}
                className="group relative inline-flex items-center justify-between gap-3 sm:gap-4 pl-6 sm:pl-7 pr-2 sm:pr-2.5 py-2 sm:py-2.5 rounded-full bg-[#002855] hover:bg-[#001F42] dark:bg-[#002244] dark:hover:bg-[#001A35] text-white shadow-lg shadow-[#002855]/25 hover:shadow-xl hover:shadow-[#002855]/35 transition-all duration-300 active:scale-95 cursor-pointer border border-white/10"
              >
                <span className="font-bold text-[13px] sm:text-[14.5px] tracking-tight text-white select-none whitespace-nowrap">
                  Explore <span className="font-vidyasetu font-extrabold text-[15px] sm:text-[16px]">Vidyasetu</span> ERP
                </span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F6BE65] hover:bg-[#F3B34D] text-[#002855] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-200">
                  <ArrowRight className="w-4 h-4 stroke-[2.5] text-[#002855] group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </button>

              {/* Secondary Action: Watch Our Story circular play button */}
              <button
                onClick={() => {
                  const galleryEl = document.getElementById('gallery');
                  if (galleryEl) {
                    galleryEl.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onGoToPortal();
                  }
                }}
                className="group inline-flex items-center gap-3 py-1 cursor-pointer select-none active:scale-95 transition-all"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-[#002855] dark:text-blue-300 flex items-center justify-center shadow-xs group-hover:border-[#002855]/40 group-hover:scale-105 transition-all duration-200">
                  <Play className="w-4 h-4 ml-0.5 text-[#002855] dark:text-blue-300 stroke-[2] fill-transparent group-hover:fill-[#002855]/10" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[12px] sm:text-[13px] font-bold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-[#002855] dark:group-hover:text-white transition-colors">
                    Watch
                  </span>
                  <span className="text-[11.5px] sm:text-[12.5px] font-semibold text-slate-500 dark:text-slate-400 leading-tight">
                    Our Story
                  </span>
                </div>
              </button>
            </motion.div>

            {/* Phone UI: Full-bleed Edge-to-Edge Enlarged Campus Cutout Image */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="lg:hidden -mx-4 sm:-mx-6 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] pt-3 pb-1 flex items-center justify-center pointer-events-none select-none overflow-visible"
            >
              <img 
                src="/assets/Bhaktivedanta%20School%20Building%20Cutout.png" 
                alt="Bhaktivedanta Institute Mission Hr. Sec. School Campus" 
                className="w-full h-auto object-contain transform scale-108 sm:scale-110 origin-center drop-shadow-[0_14px_28px_rgba(0,43,102,0.25)] dark:drop-shadow-[0_14px_28px_rgba(0,0,0,0.65)]"
              />
            </motion.div>

            {/* 3 Metric Stats Strip with Icons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 dark:border-white/10 w-full text-left"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[#002B66] dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-[#002B66] dark:text-white leading-tight">32+</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Years</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-[#002B66] dark:text-white leading-tight">CBSE</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Affiliated</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-[#002B66] dark:text-white leading-tight">K-12</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Streams</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Full Bleed Arched on desktop only (hidden on mobile phone UI) */}
          <div className="hidden lg:flex lg:col-span-7 relative w-full self-stretch flex-col justify-center">
            
            {/* Deep Royal Blue Corner Wedge on the right edge - Desktop only */}
            <div className="hidden lg:block absolute right-0 bottom-0 w-52 sm:w-64 h-96 bg-[#002B66] dark:bg-[#001D45] rounded-tl-[140px] pointer-events-none -z-10"></div>

            {/* Shared SVG Definition for Golden Arch Mask on Desktop */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <clipPath id="heroArchClip" clipPathUnits="objectBoundingBox">
                  <path d="M 0.24,0 C 0.11,0.12 0.05,0.35 0.09,0.62 C 0.12,0.80 0.18,0.92 0.24,1 L 1,1 L 1,0 Z" />
                </clipPath>
              </defs>
            </svg>

            {/* Shared SVG Definition for Mobile Scooped Wave Mask */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <clipPath id="heroMobileWaveClip" clipPathUnits="objectBoundingBox">
                  <path d="M 0,0.14 C 0.28,0.22 0.72,0.02 1,0.08 L 1,0.88 C 0.76,0.98 0.24,0.92 0,0.84 Z" />
                </clipPath>
              </defs>
            </svg>

            {/* Image Container: High-end Organic Curved Hero Canvas on Mobile & Arched on Desktop */}
            <div className="relative w-full h-[320px] xs:h-[360px] sm:h-[420px] lg:h-full lg:min-h-[640px] overflow-hidden lg:overflow-visible">
              
              {/* Golden Crescent Double Border Overlay - Desktop only */}
              <svg 
                className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10" 
                viewBox="0 0 1000 650" 
                fill="none" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M 240,0 C 110,78 50,228 90,402 C 120,520 180,598 240,650" 
                  stroke="#F59E0B" 
                  strokeWidth="8" 
                  strokeLinecap="round"
                />
                <path 
                  d="M 252,0 C 124,78 66,228 104,402 C 134,520 192,598 252,650" 
                  stroke="#FEF3C7" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                />
              </svg>

              {/* DESKTOP VIEW: Classical Arched Carousel */}
              <div className="hidden lg:block w-full h-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative [clip-path:url(#heroArchClip)]">
                {heroSlides.map((slide, idx) => {
                  const isCurrent = idx === heroSlideIndex;
                  return (
                    <div
                      key={slide.image}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        isCurrent ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
                      }`}
                      style={{ transitionProperty: 'opacity, transform' }}
                    >
                      <img 
                        src={slide.image} 
                        alt={slide.title} 
                        className="w-full h-full object-cover object-[center_35%]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />
                    </div>
                  );
                })}

                {/* Carousel Pagination Indicator Dots (Desktop) */}
                <div className="absolute bottom-6 left-36 z-20 flex items-center gap-1.5">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroSlideIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        i === heroSlideIndex 
                          ? 'w-7 bg-amber-400 shadow-sm shadow-amber-400/50' 
                          : 'w-2 bg-white/60 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>

                {/* Floating "1,800+ Happy Students" badge (Desktop) */}
                <div className="absolute bottom-6 right-16 bg-white/95 dark:bg-[#0D1C2E]/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-slate-200/80 dark:border-white/10 flex items-center gap-2 z-20 pointer-events-none">
                  <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base font-black text-[#002B66] dark:text-white leading-tight">
                      1,800+
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-tight">
                      Happy Students
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Quick Institutional Highlights Ribbon (Cards right above Philosophy) */}
      <section id="academics" className="scroll-mt-24 py-2.5 sm:py-6 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4"
        >
          
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-3 sm:p-5 rounded-2xl bg-white dark:bg-[#0D1C2E] border border-slate-200/90 dark:border-white/10 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between text-center sm:text-left items-center sm:items-start"
          >
            <div className="flex flex-col items-center sm:items-start w-full">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#002B66] dark:text-blue-400 flex items-center justify-center font-bold mb-2 sm:mb-3.5 group-hover:scale-105 transition-transform mx-auto sm:mx-0">
                <Microscope className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-[#002B66] dark:text-white m-0 leading-snug">
                STEM & Robotics Lab
              </h4>
              <p className="text-[10.5px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 sm:mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
                Atal Tinkering certified maker lab equipped with 3D printers and IoT prototyping kits.
              </p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-3 sm:p-5 rounded-2xl bg-white dark:bg-[#0D1C2E] border border-slate-200/90 dark:border-white/10 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between text-center sm:text-left items-center sm:items-start"
          >
            <div className="flex flex-col items-center sm:items-start w-full">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-2 sm:mb-3.5 group-hover:scale-105 transition-transform mx-auto sm:mx-0">
                <BookMarked className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-[#002B66] dark:text-white m-0 leading-snug">
                Vedic & Values
              </h4>
              <p className="text-[10.5px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 sm:mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
                Daily Gita recitation, character development, and universal mindfulness.
              </p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-3 sm:p-5 rounded-2xl bg-white dark:bg-[#0D1C2E] border border-slate-200/90 dark:border-white/10 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between text-center sm:text-left items-center sm:items-start"
          >
            <div className="flex flex-col items-center sm:items-start w-full">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-2 sm:mb-3.5 group-hover:scale-105 transition-transform mx-auto sm:mx-0">
                <Award className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-[#002B66] dark:text-white m-0 leading-snug">
                100% CBSE Pass
              </h4>
              <p className="text-[10.5px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 sm:mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
                Consistently producing district science & commerce toppers with exemplary distinctions.
              </p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-3 sm:p-5 rounded-2xl bg-white dark:bg-[#0D1C2E] border border-slate-200/90 dark:border-white/10 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between text-center sm:text-left items-center sm:items-start"
          >
            <div className="flex flex-col items-center sm:items-start w-full">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mb-2 sm:mb-3.5 group-hover:scale-105 transition-transform mx-auto sm:mx-0">
                <Laptop className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-[#002B66] dark:text-white m-0 leading-snug">
                <span className="font-vidyasetu text-[15px] sm:text-base font-bold">Vidyasetu</span> Portal
              </h4>
              <p className="text-[10.5px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 sm:mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
                Real-time attendance, live timetables, digital homework submissions, and fees.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* 5. Principal's Desk & Vedic Philosophy Section - Editorial Redesign with Authentic Photography */}
      <section id="philosophy" className="scroll-mt-24 py-10 sm:py-20 px-4 sm:px-8 lg:px-12 bg-white dark:bg-[#07131F] relative overflow-hidden border-t border-slate-100 dark:border-white/10">
        
        {/* Full Section Campus Illustration Background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
          <img 
            src="/assets/login_bg_illustration.png" 
            alt="Campus Architectural Illustration" 
            className="w-full h-full object-cover object-bottom opacity-65 dark:opacity-20 scale-100 contrast-105"
          />
          {/* Subtle light/dark gradient to preserve readability of the text heading */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/90 dark:from-[#07131F]/90 dark:via-[#07131F]/60 dark:to-[#07131F]/95" />
        </div>

        {/* Subtle Background Geometry */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          
          {/* Section Eyebrow Header - Compact on Phone UI */}
          <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase border border-amber-200 dark:border-amber-400/20">
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-500" />
              <span>Institutional Soul</span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#002B66] dark:text-white tracking-tight m-0">
              Vedic Wisdom & Modern Science
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Synthesizing timeless epistemology with globally certified educational leadership.
            </p>
          </div>

          {/* Unified Architectural Showcase Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[24px] sm:rounded-[48px] bg-gradient-to-br from-[#001D45] via-[#002B66] to-[#031B3B] text-white shadow-2xl border border-amber-400/20 overflow-hidden relative"
          >
            
            {/* Campus Illustration Background Layer */}
            <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
              <img 
                src="/assets/login_bg_illustration.png" 
                alt="Vidyasetu Campus Illustration" 
                className="w-full h-full object-cover object-bottom opacity-18 scale-105 mix-blend-luminosity brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#001D45]/90 via-[#002B66]/80 to-[#031B3B]/90" />
            </div>

            {/* Ambient Radial Highlights */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
              
              {/* Left Column: Authentic Sanskrit Manuscript Parchment with blended overlay (5 cols) */}
              <div className="lg:col-span-5 relative p-5 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between space-y-4 sm:space-y-6 overflow-hidden text-center lg:text-left items-center lg:items-start">
                
                {/* Blended Ancient Manuscript Photo Texture */}
                <div className="absolute inset-0 -z-10 opacity-20">
                  <img 
                    src="/assets/vedic_manuscript.jpg" 
                    alt="Vedic Sanskrit Manuscript Texture" 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001D45] via-[#002B66]/90 to-[#001D45]/90"></div>
                </div>

                {/* Header Tag */}
                <div className="space-y-2.5 sm:space-y-3 relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-extrabold uppercase tracking-widest border border-amber-400/30 backdrop-blur-xs mx-auto lg:mx-0">
                    <Quote className="w-3 h-3 text-amber-400" />
                    <span>FOUNDATION EPIGRAPH</span>
                  </div>

                  {/* Calligraphic Sanskrit Centerpiece */}
                  <div className="pt-0.5 w-full">
                    <div className="text-xl sm:text-3xl font-serif font-black text-amber-300 tracking-wide leading-tight drop-shadow-sm">
                      "अथातो ब्रह्म जिज्ञासा"
                    </div>
                    <div className="text-[10.5px] sm:text-xs font-serif italic text-amber-200/90 mt-0.5 font-semibold">
                      athāto brahma-jijñāsā — Vedanta Sutra (1.1.1)
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal pt-1 max-w-md mx-auto lg:mx-0">
                    <strong className="text-white font-semibold">"Now, inquire into the Supreme Truth."</strong> Education here elevates consciousness, shapes moral character, and nurtures academic brilliance.
                  </p>
                </div>

                {/* Core Philosophical Pillars */}
                <div className="space-y-2.5 pt-3 sm:pt-4 border-t border-white/10 relative z-10 w-full">
                  <div className="flex items-center lg:items-start justify-center lg:justify-start gap-2.5 text-center lg:text-left">
                    <div className="w-5 h-5 rounded-full bg-amber-400/25 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Vidya & Moral Fortitude</div>
                      <div className="text-[11px] text-slate-300">Cultivating truthfulness, humility, and universal respect.</div>
                    </div>
                  </div>

                  <div className="flex items-center lg:items-start justify-center lg:justify-start gap-2.5 text-center lg:text-left">
                    <div className="w-5 h-5 rounded-full bg-amber-400/25 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Rigorous STEM Inquiry</div>
                      <div className="text-[11px] text-slate-300">Empirical robotics, AI labs, and CBSE academic mastery.</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Principal's Address with Authentic Portrait Photo of Dr. Matthew (7 cols) */}
              <div className="lg:col-span-7 p-5 sm:p-10 lg:p-12 flex flex-col justify-between space-y-4 sm:space-y-6 bg-white/5 backdrop-blur-xs text-center lg:text-left items-center lg:items-start">
                
                {/* Principal Bio Header with Real Portrait */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
                  <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                    {/* Real Portrait of Dr. Matthew */}
                    <img 
                      src="/assets/principal_matthew.jpg" 
                      alt="Dr. Matthew, Principal" 
                      className="w-13 h-13 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl object-cover object-top shadow-xl border-2 border-amber-400 shrink-0 mx-auto sm:mx-0"
                    />
                    <div className="flex flex-col items-center sm:items-start">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                        LEADERSHIP PERSPECTIVE
                      </div>
                      <h3 className="text-base sm:text-xl font-black text-white m-0 tracking-tight">
                        Dr. Matthew <span className="text-xs font-semibold text-slate-300">(Ph.D., M.Ed.)</span>
                      </h3>
                      <div className="text-[11px] sm:text-xs text-slate-300 font-medium">Principal & Academic Director</div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30 mx-auto sm:mx-0">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>25+ Yrs Leadership</span>
                  </span>
                </div>

                {/* Principal's Message Body - Streamlined */}
                <div className="space-y-2.5 w-full">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                    "We envision an education that breaks beyond rote memorization. Through certified Atal Tinkering labs and real-time student tracking on Vidyasetu, our scholars develop analytical brilliance grounded in ethical courage."
                  </p>
                </div>

                {/* Bottom Signature & CTA Strip */}
                <div className="pt-3.5 sm:pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 w-full text-center sm:text-left">
                  <div className="space-y-0.5 flex flex-col items-center sm:items-start">
                    <div className="font-serif italic text-amber-300 text-base sm:text-lg tracking-wider">
                      Dr. Matthew
                    </div>
                    <div className="text-[9.5px] sm:text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                      Bhaktivedanta Institute
                    </div>
                  </div>

                  <button
                    onClick={() => onGoToPortal()}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 shadow-md cursor-pointer shrink-0 w-full sm:w-auto"
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>Explore <span className="font-vidyasetu font-bold text-[13px]">Vidyasetu</span></span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

              </div>

            </div>

          </motion.div>

        </div>
      </section>

      {/* 5. Campus Virtual Tour / Facilities - Modern Card Redesign */}
      <section id="gallery" className="scroll-mt-24 py-10 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10 text-center md:text-left items-center md:items-start">
          <div className="flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#002B66] dark:text-amber-400 text-[10px] font-bold tracking-widest uppercase border border-blue-200 dark:border-white/10 mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>WORLD-CLASS INFRASTRUCTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#002B66] dark:text-white m-0 tracking-tight">
              Interactive Campus Tour & Labs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed mx-auto md:mx-0">
              Equipped with smart digital touchscreens, certified robotics kits, extensive Vedic library collections, and synthetic sporting tracks designed to develop well-rounded leaders.
            </p>
          </div>
        </div>

        {/* Upgraded Gallery Cards with Image Zoom & Rich Metadata */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {filteredGallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => setLightboxImg(item)}
              className="bg-white dark:bg-[#0E1E31] rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/10 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative overflow-hidden h-44 sm:h-56 bg-slate-100 dark:bg-slate-800">
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Badge Overlay */}
                <span className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 bg-[#001D45]/90 text-amber-300 text-[10px] font-extrabold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full backdrop-blur-md border border-white/20 shadow-xs">
                  {item.badge}
                </span>

                {/* Hover Preview Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white gap-2 text-xs font-extrabold">
                  <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md">
                    <Eye className="w-5 h-5 text-amber-300" />
                  </div>
                  <span>Expand Preview</span>
                </div>
              </div>

              <div className="p-4 sm:p-5 space-y-2.5 sm:space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-[#002B66] dark:text-white m-0 group-hover:text-amber-500 transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 sm:mt-2 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2.5 sm:pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-bold text-[#002B66] dark:text-amber-400">
                  <span className="text-[11px] font-semibold text-slate-400">Explore Facility</span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 6. Upcoming Events Calendar & Circulars with Filter */}
      <section id="events" className="scroll-mt-24 py-10 sm:py-20 px-4 sm:px-8 lg:px-12 bg-slate-50/70 dark:bg-[#07131F] border-t border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10 text-center sm:text-left items-center sm:items-start">
            <div className="flex flex-col items-center sm:items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-[10px] font-bold tracking-widest uppercase border border-amber-200 dark:border-amber-400/20 mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>OFFICIAL BULLETINS & TIMELINE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#002B66] dark:text-white m-0 tracking-tight">
                School Events & Notices
              </h2>
            </div>

            {/* Event Category Filter Pills - Horizontally Scrollable on Mobile to prevent staggered wrapping */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 max-w-full no-scrollbar">
              {[
                { id: 'all', label: 'All Notices' },
                { id: 'academic', label: 'Academic & Exams' },
                { id: 'sports', label: 'Sports Meets' },
                { id: 'cultural', label: 'Cultural Conclaves' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setEventFilter(filter.id as any)}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer shrink-0 whitespace-nowrap ${
                    eventFilter === filter.id
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-white dark:bg-[#121F2F] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E3146] hover:bg-slate-50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredEvents.map((evt) => (
              <div 
                key={evt.id} 
                className="p-6 rounded-3xl bg-white dark:bg-[#0E1E31] border border-slate-200/90 dark:border-white/10 hover:border-amber-400 dark:hover:border-amber-400 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-blue-50 text-[#002B66] dark:bg-blue-950 dark:text-blue-300 uppercase tracking-wider">
                      {evt.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">{evt.date}</span>
                  </div>

                  <h4 className="font-bold text-sm sm:text-base text-[#002B66] dark:text-white leading-snug group-hover:text-amber-500 transition-colors">
                    {evt.title}
                  </h4>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Academic Wings & Curriculum Structure */}
      <section id="academics" className="py-10 sm:py-20 px-4 sm:px-8 lg:px-12 bg-white dark:bg-[#081525] border-t border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 text-center md:text-left items-center md:items-start">
            <div className="flex flex-col items-center md:items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold tracking-widest uppercase border border-emerald-200 dark:border-emerald-400/20 mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>PEDAGOGICAL CONTINUUM</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#002B66] dark:text-white m-0 tracking-tight">
                Academic Wings & Disciplines
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto md:mx-0">
              From early foundational play-based inquiry to rigorous CBSE senior secondary board preparations with specialized STEM labs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Wing 1: Foundational & Primary */}
            <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-[#0D1C2E] border border-slate-200 dark:border-white/10 space-y-2.5 sm:space-y-4 hover:border-amber-400 transition-colors text-center sm:text-left flex flex-col items-center sm:items-start">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-base sm:text-xl shadow-xs mx-auto sm:mx-0">
                🌱
              </div>
              <span className="text-[10px] sm:text-[11px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                LKG to Class 5
              </span>
              <h3 className="text-base sm:text-lg font-black text-[#002B66] dark:text-white m-0">
                Foundational & Primary Wing
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Activity-based learning, phonics, number sense, interactive storytelling, and character building in a nurturing and safe setting.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-1 sm:pt-2 text-center sm:text-left">
                <li>• Play-way pedagogy & motor skills</li>
                <li>• Introductory Vedic values & recitation</li>
                <li>• Child-safe indoor activity rooms</li>
              </ul>
            </div>

            {/* Wing 2: Middle Preparatory */}
            <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-[#0D1C2E] border border-slate-200 dark:border-white/10 space-y-2.5 sm:space-y-4 hover:border-amber-400 transition-colors text-center sm:text-left flex flex-col items-center sm:items-start">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-base sm:text-xl shadow-xs mx-auto sm:mx-0">
                🔬
              </div>
              <span className="text-[10px] sm:text-[11px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Classes 6 to 10
              </span>
              <h3 className="text-base sm:text-lg font-black text-[#002B66] dark:text-white m-0">
                Middle & Secondary CBSE Wing
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Empirical science labs, algebra, language proficiency, coding fundamentals, robotics, and sports leagues preparing for board success.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-1 sm:pt-2 text-center sm:text-left">
                <li>• Atal Tinkering STEM laboratory exposure</li>
                <li>• Continuous comprehensive evaluation</li>
                <li>• Hindi, English & Sanskrit languages</li>
              </ul>
            </div>

            {/* Wing 3: Senior Secondary */}
            <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-[#0D1C2E] border border-slate-200 dark:border-white/10 space-y-2.5 sm:space-y-4 hover:border-amber-400 transition-colors text-center sm:text-left flex flex-col items-center sm:items-start">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#002B66] dark:bg-amber-400 text-amber-300 dark:text-slate-950 flex items-center justify-center font-black text-base sm:text-xl shadow-xs mx-auto sm:mx-0">
                🎓
              </div>
              <span className="text-[10px] sm:text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Classes 11 & 12
              </span>
              <h3 className="text-base sm:text-lg font-black text-[#002B66] dark:text-white m-0">
                Senior Secondary (Science & Commerce)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Rigorous career training for IIT-JEE, NEET, CUET, and CA Foundation alongside integrated computer science, AI, and applied mathematics.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-1 sm:pt-2 text-center sm:text-left">
                <li>• PCM / PCB with AI & Informatics</li>
                <li>• Commerce with Accountancy & Economics</li>
                <li>• Specialized university career counseling</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Lightbox Modal for Campus Spaces */}
      {lightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#121F2F] rounded-2xl sm:rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/20">
            <div className="p-3.5 sm:p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-[#002B66] dark:text-white">{lightboxImg.title}</span>
              <button 
                onClick={() => setLightboxImg(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img src={lightboxImg.src} alt={lightboxImg.title} className="w-full max-h-[50vh] sm:max-h-[60vh] object-cover" />
            <div className="p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                {lightboxImg.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 9. Standalone Subscribe Card with Safe Mobile Margin - Compact & Centered on Phone UI */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 -mb-6 sm:-mb-14">
        <div className="relative rounded-2xl sm:rounded-[32px] bg-gradient-to-r from-[#002B66] via-[#073B82] to-[#001D45] dark:from-[#0D233A] dark:via-[#132F4C] dark:to-[#091829] text-white p-4 sm:p-8 lg:p-10 shadow-xl border border-white/20 overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-60 sm:w-80 h-60 sm:h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 lg:gap-8 items-center">
            {/* Title & Tag - Centered on mobile, left-aligned on desktop */}
            <div className="lg:col-span-7 space-y-1.5 text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                <Sparkles className="w-3 h-3" />
                <span>Stay Connected</span>
              </div>
              <h3 className="text-base sm:text-xl lg:text-2xl font-black text-white m-0 tracking-tight leading-snug">
                Subscribe to Institutional Bulletins & Circulars
              </h3>
              <p className="text-slate-300 text-[11px] sm:text-xs max-w-xl leading-relaxed mx-auto lg:mx-0">
                Receive weekly academic updates, exam circulars, and Vedic discourse summaries.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! You have been subscribed to Bhaktivedanta Institute announcements.");
                }} 
                className="flex items-center gap-1.5 p-1 sm:p-1.5 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 shadow-inner"
              >
                <input 
                  type="email" 
                  required
                  placeholder="Enter email address..."
                  className="bg-transparent px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 outline-none flex-1 font-medium min-w-0"
                />
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-150 active:scale-95 shadow-md shrink-0 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3 h-3 hidden xs:inline" />
                </button>
              </form>
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[10px] sm:text-[11px] text-slate-300 mt-1.5 px-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Zero spam. Unsubscribe anytime.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Institutional Footer - Streamlined & Compact on Phone UI, Grand on Desktop */}
      <footer id="footer" className="scroll-mt-24 w-full bg-[#001738] dark:bg-[#050C15] text-white pt-10 sm:pt-20 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-12 border-t border-white/10 rounded-t-[28px] sm:rounded-t-[56px] relative z-10 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Footer Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 pb-8 sm:pb-12 border-b border-white/10">
            
            {/* Col 1: Institute Brand & Philosophy (Col span 4) */}
            <div className="lg:col-span-4 space-y-3.5 sm:space-y-5 text-center sm:text-left flex flex-col items-center sm:items-start">
              <div className="flex flex-col xs:flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-3 text-center sm:text-left">
                <img 
                  src="/assets/school_logo.jpg" 
                  alt="Bhaktivedanta Institute Crest" 
                  className="w-11 h-11 sm:w-14 sm:h-14 rounded-full object-contain p-0.5 bg-white shadow-md border-2 border-amber-400 shrink-0 mx-auto sm:mx-0"
                />
                <div className="text-center sm:text-left">
                  <div className="text-sm sm:text-base font-black tracking-tight text-white leading-tight">
                    BHAKTIVEDANTA
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-amber-300 tracking-wider uppercase">
                    INSTITUTE MISSION HR. SEC. SCHOOL
                  </div>
                  <div className="text-[9.5px] sm:text-[10px] text-slate-300 font-serif italic">
                    Affiliated to CBSE, New Delhi
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto sm:mx-0 text-center sm:text-left">
                Empowering the youth with scientific acumen, holistic Vedic values, and ethical character to serve humanity with wisdom and compassion.
              </p>

              {/* Motto Pill */}
              <div className="inline-block p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-center mx-auto sm:mx-0">
                <div className="text-amber-300 font-serif font-black text-xs sm:text-sm">
                  "अथातो ब्रह्म जिज्ञासा"
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                  Now, therefore, inquire into the Supreme Truth — Vedanta Sutra 1.1.1
                </div>
              </div>

              {/* Affiliation Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[10px] sm:text-[11px] font-mono text-slate-300">
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-white/10 border border-white/15">CBSE Affiliation: 2430092</span>
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-white/10 border border-white/15">School Code: 15604</span>
              </div>
            </div>

            {/* Quick Links Group: 2 Columns on Mobile for Compact Layout, 5 Columns on Desktop */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
              {/* Col 2: Academic Wings */}
              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Academic Wings</span>
                </h4>
                <ul className="space-y-2 text-[11px] sm:text-xs text-slate-300">
                  <li className="hover:text-white transition-colors cursor-pointer truncate">
                    Early Childhood (LKG–UKG)
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer truncate">
                    Primary Wing (1–5)
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer truncate">
                    Middle Block (6–8)
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer truncate">
                    Secondary CBSE (9–10)
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer truncate">
                    Sr. Sec. Science (PCM/PCB)
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer truncate">
                    Sr. Sec. Commerce
                  </li>
                </ul>
              </div>

              {/* Col 3: Vidyasetu ERP & Portals */}
              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5" />
                  <span><span className="font-vidyasetu tracking-normal capitalize text-sm sm:text-base font-bold text-white">Vidyasetu</span> ERP</span>
                </h4>
                <ul className="space-y-2 text-[11px] sm:text-xs text-slate-300">
                  <li>
                    <button 
                      onClick={() => onGoToPortal('STUDENT')}
                      className="hover:text-amber-300 transition-colors cursor-pointer text-left truncate w-full"
                    >
                      Student Portal (Anoop)
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => onGoToPortal('TEACHER')}
                      className="hover:text-amber-300 transition-colors cursor-pointer text-left truncate w-full"
                    >
                      Teacher Attendance
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => onGoToPortal('ADMIN')}
                      className="hover:text-amber-300 transition-colors cursor-pointer text-left truncate w-full"
                    >
                      Admin ERP Console
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => onGoToPortal()}
                      className="hover:text-amber-300 transition-colors cursor-pointer text-left truncate w-full"
                    >
                      Parent Fee & Reports
                    </button>
                  </li>
                  <li>
                    <a href="#events" className="hover:text-amber-300 transition-colors block text-slate-400 truncate">
                      Exam Circulars
                    </a>
                  </li>
                  <li>
                    <a href="#gallery" className="hover:text-amber-300 transition-colors block text-slate-400 truncate">
                      Virtual Tour
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Col 4: Campus Helpdesk & Location (Col span 3) */}
            <div className="lg:col-span-3 space-y-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
              <h4 className="text-xs sm:text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Campus & Helpdesk</span>
              </h4>
              
              <div className="space-y-2.5 text-[11px] sm:text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Sri Chaitanya Knowledge Enclave, Kolkata – 700054, WB</span>
                </div>

                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-mono font-bold text-white">+91 33 2345 6789 / 98765 43210</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-mono">admissions@bvihss.ac.in</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Mon – Sat: 08:00 AM – 04:30 PM IST</span>
                </div>
              </div>

              {/* Quick Launch Button */}
              <div className="pt-2">
                <button
                  onClick={() => onGoToPortal()}
                  className="w-full py-2.5 px-4 rounded-xl bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Launch <span className="font-vidyasetu font-bold text-sm text-slate-950">Vidyasetu</span> Portal</span>
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Legal Strip */}
          <div className="pt-5 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-slate-400 text-center sm:text-left">
            <div>
              <span>© {new Date().getFullYear()} Bhaktivedanta Institute Mission Hr. Sec. School.</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[10.5px] sm:text-[11px]">
              <span className="hover:text-white transition-colors cursor-pointer">CBSE Disclosure</span>
              <span>•</span>
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-amber-400 font-serif italic hidden sm:inline">अथातो ब्रह्म जिज्ञासा</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};
