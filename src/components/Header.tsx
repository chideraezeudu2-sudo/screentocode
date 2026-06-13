import { motion } from 'motion/react';
import { Shield, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'waitlist' | 'home' | 'pricing' | 'success' | 'portal' | 'privacy' | 'terms';
  setActiveTab: (tab: 'waitlist' | 'home' | 'pricing' | 'success' | 'portal' | 'privacy' | 'terms') => void;
  mobileNumber?: string;
  isAuthenticated: boolean;
}

export default function Header({
  activeTab,
  setActiveTab,
  mobileNumber,
  isAuthenticated,
}: HeaderProps) {
  // Format phone number to hide detail to match the template (e.g. *** *** 4821)
  const getMaskedPhone = () => {
    if (!mobileNumber) return '*** *** 4821';
    // grab last 4 characters
    const clean = mobileNumber.replace(/\D/g, '');
    const lastFour = clean.slice(-4) || '4821';
    return `*** *** ${lastFour}`;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
        {/* LOGO */}
        <div 
          onClick={() => setActiveTab('waitlist')}
          className="flex items-center cursor-pointer group"
          id="nav-logo"
        >
          <span className="font-display-xl text-lg sm:text-xl font-black tracking-wide text-white uppercase transition-colors">
            Citadel Claims
          </span>
        </div>

        {/* DIVISION REMOVED: NO TABS NEEDED FOR ACTIVE WAITLIST PHASE */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-zinc-850 rounded-full">
          <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
          <span className="font-mono text-[11px] font-black text-zinc-350 tracking-wider">
            WAITLIST LIVE
          </span>
        </div>

        {/* RIGHT ACTION OR ACC STATE WITH GLASS WATER EFFECT */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 py-2.5 px-4 rounded-full select-none" id="header-spots-badge">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="font-sans text-[11px] tracking-widest text-zinc-400 font-extrabold uppercase">
              RESERVATIONS:
            </span>
            <span className="font-sans text-xs font-black text-white bg-accent-emerald/10 border border-accent-emerald/20 px-2.5 py-0.5 rounded-full">
              5 / 20 CLAIMED
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
