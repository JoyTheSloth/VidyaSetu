import React, { useState } from 'react';
import { 
  Lock, Mail, Eye, EyeOff, ArrowRight, ArrowLeft, 
  Sun, Moon, Shield, Users, GraduationCap, HeartHandshake, CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onGoHome?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onGoHome }) => {
  const { school, switchUser, theme, toggleTheme } = useApp();
  const [selectedRole, setSelectedRole] = useState<Role>('ADMIN');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const roleCredentials: Record<Role, { email: string; label: string; roleType: string }> = {
    ADMIN: { email: 'admin@bhaktivedanta.edu', label: 'Admin', roleType: 'Super Admin' },
    TEACHER: { email: 'teacher@bhaktivedanta.edu', label: 'Teacher', roleType: 'Faculty Staff' },
    STUDENT: { email: 'arjun.sharma@bhaktivedanta.edu', label: 'Student', roleType: 'Class 11 - Science' }
  };

  const [username, setUsername] = useState<string>(roleCredentials.ADMIN.email);
  const [password, setPassword] = useState<string>('••••••••••••');

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setUsername(roleCredentials[role].email);
    setPassword('••••••••••••');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      switchUser(selectedRole);
      setIsLoading(false);
      onLoginSuccess();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07131F] text-[#1E293B] dark:text-slate-100 flex flex-col justify-between selection:bg-[#002B66] selection:text-white transition-colors duration-200 relative overflow-x-hidden">
      
      {/* Modern Academic Campus Illustration Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
        {/* Full-bleed crisp modern campus architectural illustration */}
        <img 
          src="/assets/login_bg_illustration.png" 
          alt="Campus Architectural Illustration" 
          className="absolute inset-0 w-full h-full object-cover object-bottom scale-100 opacity-90 dark:opacity-25 brightness-100 dark:brightness-70 contrast-105 transition-all duration-700"
        />

        {/* Soft Theme Adaptive Overlay to keep login card floating with high contrast */}
        <div className="absolute inset-0 bg-linear-to-b from-white/30 via-transparent to-white/40 dark:from-[#07131F]/80 dark:via-[#07131F]/60 dark:to-[#07131F]/90" />

        {/* Gentle Ambient Vignettes */}
        <div className="absolute -top-20 -right-20 w-[550px] h-[550px] rounded-full bg-linear-to-b from-blue-400/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[550px] h-[550px] rounded-full bg-linear-to-tr from-[#002B66]/15 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Top Header - Centralized School Crest & Name, Mabbele Studios Tag */}
      <header className="px-3 sm:px-8 py-2 sm:py-2.5 grid grid-cols-3 items-center border-b border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-[#0B1A2C]/85 backdrop-blur-md z-20 shrink-0">
        {/* Left: Back Button */}
        <div className="flex items-center">
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/15 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Back to School Website</span>
              <span className="sm:hidden">Back</span>
            </button>
          )}
        </div>

        {/* Center: Centralized School Crest & Name */}
        <div className="flex items-center justify-center gap-2 min-w-0">
          <img 
            src="/assets/school_logo.jpg" 
            alt="School Crest" 
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-contain border border-amber-400/50 p-0.5 bg-white shrink-0"
          />
          <div className="text-center min-w-0">
            <div className="text-[10px] sm:text-sm font-black text-[#002B66] dark:text-white leading-tight tracking-tight truncate">
              BHAKTIVEDANTA INSTITUTE MISSION
            </div>
            <div className="text-[9px] text-slate-400 dark:text-slate-400 font-semibold tracking-wider uppercase hidden sm:block">
              by <span className="text-amber-600 dark:text-amber-400 font-bold">Mabbele Studios</span>
            </div>
          </div>
        </div>

        {/* Right: Security & Theme toggle */}
        <div className="flex items-center justify-end gap-2">
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <Shield className="w-3 h-3 text-emerald-600" />
            <span>Secure • Reliable</span>
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-amber-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/15 transition-all active:scale-95 cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
        </div>
      </header>

      {/* Main Split Body - Slender & Compact Card Size with Clean Lateral Margins on Mobile */}
      <main className="flex-1 flex items-center justify-center px-4 xs:px-5 sm:px-6 py-4 sm:py-6 z-10 max-w-4xl w-full mx-auto my-auto">
        <div className="w-full max-w-[370px] xs:max-w-[390px] sm:max-w-4xl bg-white dark:bg-[#0F1E31] rounded-3xl shadow-2xl shadow-slate-300/60 dark:shadow-black/60 border border-slate-200/90 dark:border-[#1E3146] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-0 sm:min-h-[460px]">
          
          {/* Left Hero Column without photo - Clean, Comfortable Inner Padding on Mobile */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#002B66] via-[#003882] to-[#0A418C] text-white p-5 xs:p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden text-center lg:text-left items-center lg:items-start">
            {/* Subtle inner geometric & dot texture */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(currentColor 1.2px, transparent 1.2px)`,
                backgroundSize: '18px 18px',
                color: '#FFFFFF'
              }}
            />
            {/* Wave curve overlay */}
            <div className="absolute top-0 right-0 w-32 h-full bg-white/5 pointer-events-none transform skew-x-12"></div>

            {/* School Crest Logo - Centered on mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1.5 sm:gap-2.5 z-10 w-full">
              <img 
                src="/assets/school_logo.jpg" 
                alt="School Crest" 
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white p-0.5 sm:p-1 object-contain shadow-md border-2 border-amber-400 shrink-0"
              />
              <div className="text-center sm:text-left">
                <div className="font-extrabold text-[12px] sm:text-sm tracking-tight leading-tight">
                  BHAKTIVEDANTA
                </div>
                <div className="text-[8.5px] sm:text-[10px] text-amber-300 font-semibold uppercase tracking-wider">
                  INSTITUTE MISSION HR. SEC. SCHOOL
                </div>
                <div className="text-[7.5px] sm:text-[9px] text-slate-300 font-medium hidden sm:block">
                  EDUCATE • EMPOWER • EXCEL
                </div>
              </div>
            </div>

            {/* "Welcome to Vidyasetu" - Centered on mobile */}
            <div className="py-3 sm:py-8 z-10 space-y-1 sm:space-y-2 w-full flex flex-col items-center lg:items-start">
              <div className="text-[9.5px] sm:text-xs uppercase tracking-widest text-amber-300 font-bold">
                Welcome to
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white m-0 tracking-tight leading-none font-vidyasetu">
                Vidya<span className="text-amber-400">setu</span>
              </h2>
              <div className="w-8 sm:w-12 h-0.5 sm:h-1.5 bg-amber-400 rounded-full my-1.5 sm:my-3 mx-auto lg:mx-0"></div>
              <p className="text-[11px] sm:text-sm text-slate-200 leading-relaxed font-normal max-w-xs sm:max-w-none mx-auto lg:mx-0">
                A smart digital platform to simplify and streamline school management, academics & communications.
              </p>
            </div>

            {/* Bottom trust footer note */}
            <div className="z-10 pt-2 sm:pt-4 border-t border-white/10 text-[9.5px] sm:text-[11px] text-slate-300 flex items-center justify-between w-full">
              <span>by <span className="text-white font-bold">Mabbele Studios</span></span>
              <span className="font-semibold text-amber-300">v2.4 Live</span>
            </div>
          </div>

          {/* Right Login Form Column - Generous Inner Padding on Phone UI */}
          <div className="lg:col-span-7 p-5 xs:p-6 sm:p-8 flex flex-col justify-center max-w-md mx-auto w-full">
            
            {/* Vidyasetu Logo Crest - Hidden on phone UI to eliminate duplication and keep form compact */}
            <div className="hidden sm:block text-center mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-11 sm:h-11 mx-auto mb-1 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#002B66] dark:text-amber-400 flex items-center justify-center border border-blue-100 dark:border-blue-900 shadow-2xs">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-[#002B66] dark:text-white m-0 tracking-tight font-vidyasetu">
                Vidya<span className="text-amber-500">setu</span>
              </h3>
              <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                School Management System
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1 sm:mt-2">
                Sign in to continue
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Username / Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username / Email"
                    className="w-full pl-10 pr-3 py-2.5 sm:py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-[#132235] border border-slate-200 dark:border-[#1E3146] rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-[#002B66] dark:focus:border-amber-400 transition-colors font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-10 pr-9 py-2.5 sm:py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-[#132235] border border-slate-200 dark:border-[#1E3146] rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-[#002B66] dark:focus:border-amber-400 transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] sm:text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-300">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#002B66] focus:ring-0" 
                  />
                  <span>Remember me</span>
                </label>
                <a 
                  href="#forgot" 
                  onClick={(e) => { e.preventDefault(); alert('Demo mode: Click "Login →" with pre-filled credentials.'); }}
                  className="text-blue-600 dark:text-amber-400 font-semibold hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 sm:py-3 px-4 bg-[#002B66] hover:bg-[#00224f] dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.99] cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* "OR LOGIN AS" Role Icons Strip */}
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-5 border-t border-slate-100 dark:border-white/10 text-center">
              <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2 sm:mb-3">
                OR LOGIN AS
              </span>

              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {/* Admin */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('ADMIN')}
                  className={`p-2 sm:p-2.5 rounded-xl border flex flex-col items-center gap-1 sm:gap-1.5 transition-all duration-150 cursor-pointer ${
                    selectedRole === 'ADMIN'
                      ? 'border-[#002B66] dark:border-amber-400 bg-blue-50 dark:bg-blue-950/40 shadow-xs ring-1 ring-[#002B66]'
                      : 'border-slate-200 dark:border-[#1E3146] hover:bg-slate-50 dark:hover:bg-[#132235]'
                  }`}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs">
                    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-200">Admin</span>
                </button>

                {/* Teacher */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('TEACHER')}
                  className={`p-1.5 sm:p-2.5 rounded-xl border flex flex-col items-center gap-1 sm:gap-1.5 transition-all duration-150 cursor-pointer ${
                    selectedRole === 'TEACHER'
                      ? 'border-[#002B66] dark:border-amber-400 bg-emerald-50 dark:bg-emerald-950/40 shadow-xs ring-1 ring-[#002B66]'
                      : 'border-slate-200 dark:border-[#1E3146] hover:bg-slate-50 dark:hover:bg-[#132235]'
                  }`}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs">
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-200">Teacher</span>
                </button>

                {/* Student */}
                <button
                  type="button"
                  onClick={() => handleRoleSelect('STUDENT')}
                  className={`p-1.5 sm:p-2.5 rounded-xl border flex flex-col items-center gap-1 sm:gap-1.5 transition-all duration-150 cursor-pointer ${
                    selectedRole === 'STUDENT'
                      ? 'border-[#002B66] dark:border-amber-400 bg-purple-50 dark:bg-purple-950/40 shadow-xs ring-1 ring-[#002B66]'
                      : 'border-slate-200 dark:border-[#1E3146] hover:bg-slate-50 dark:hover:bg-[#132235]'
                  }`}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xs">
                    <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-200">Student</span>
                </button>
              </div>

              <div className="mt-2 sm:mt-4 text-[10.5px] sm:text-xs text-slate-500 dark:text-slate-400">
                New here? <span className="text-[#002B66] dark:text-amber-400 font-bold cursor-pointer hover:underline">Contact Administrator</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer matching Image 2 */}
      <footer className="py-2.5 sm:py-4 text-center text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/80 dark:border-white/10 shrink-0">
        <div className="flex items-center justify-center gap-1.5 font-medium">
          <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 dark:text-amber-400" />
          <span>Powering Digital Education</span>
        </div>
        <div className="text-[9.5px] sm:text-[11px] text-slate-400 mt-0.5">
          © 2026 Bhaktivedanta Institute Mission HR. Sec. School. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
