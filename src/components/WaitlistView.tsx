import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, CornerDownRight, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface WaitlistViewProps {
  onNavigate: (tab: 'waitlist' | 'home' | 'pricing' | 'success' | 'portal' | 'privacy' | 'terms') => void;
}

export default function WaitlistView({ onNavigate }: WaitlistViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showTopForm, setShowTopForm] = useState(false);
  const [showBottomForm, setShowBottomForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const getSupabaseErrorMessage = (err: any): string => {
    if (!err) return '';
    const parts = [];
    if (err.message) parts.push(err.message);
    if (err.details) parts.push(err.details);
    if (err.hint) parts.push(err.hint);
    if (err.code) parts.push(`(code: ${err.code})`);
    return parts.length > 0 ? parts.join(' ') : String(err);
  };

  const handleSubmitTop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showTopForm) {
      setShowTopForm(true);
      return;
    }
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your phone number.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    if (!isSupabaseConfigured) {
      setError('Supabase is not configured yet. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Settings.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([{ name: name.trim(), email: email.trim(), phone: phone.trim() }]);
      if (insertError) {
        throw insertError;
      }
      setIsSubmitted(true);
    } catch (err: any) {
      const detailedMessage = getSupabaseErrorMessage(err);
      console.error('Supabase insert error detailed:', detailedMessage);
      setError(`Something went wrong. Please try again or email itsyu5668@gmail.com. Error detail: ${detailedMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitBottom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showBottomForm) {
      setShowBottomForm(true);
      return;
    }
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your phone number.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    if (!isSupabaseConfigured) {
      setError('Supabase is not configured yet. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Settings.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([{ name: name.trim(), email: email.trim(), phone: phone.trim() }]);
      if (insertError) {
        throw insertError;
      }
      setIsSubmitted(true);
    } catch (err: any) {
      const detailedMessage = getSupabaseErrorMessage(err);
      console.error('Supabase insert error detailed:', detailedMessage);
      setError(`Something went wrong. Please try again or email itsyu5668@gmail.com. Error detail: ${detailedMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative pt-32 pb-24 bg-black min-h-screen text-white select-text">
      {/* Background aesthetics: Subtle vector lines / minimal glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* SECTION 1: HERO SECTION */}
        <section className="text-center py-12 md:py-16 border-b border-zinc-900">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/80 border border-zinc-800 rounded-full text-[11px] text-zinc-400 font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
            <span>EXCLUSIVELY FOR INDEPENDENT ADJUSTERS</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-sans uppercase tracking-tight leading-none text-white max-w-3xl mx-auto">
            Your estimates done before morning.
          </h1>
          
          <p className="mt-6 text-zinc-400 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Send photos and a voice note. Get a carrier-ready estimate back the same day. Built exclusively for independent adjusters.
          </p>

          {/* DYNAMIC TIMER / SPOTS LEFT PROGRESS BAR (5/20) */}
          <div className="max-w-md mx-auto mt-10 p-5 bg-zinc-950/85 border border-zinc-900 rounded-3xl relative overflow-hidden text-left shadow-xl select-none">
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-accent-emerald" />
            <div className="flex justify-between items-center text-xs font-mono mb-2.5">
              <span className="text-zinc-500 uppercase tracking-widest font-black">Live Reservation Speed</span>
              <span className="text-[#10B981] font-black">5 / 20 PUBLIC SPOTS FILLED</span>
            </div>
            {/* ProgressBar */}
            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-accent-emerald to-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: '25%' }} />
            </div>
            <div className="flex justify-between items-center text-[10px] text-zinc-500 font-sans font-extrabold uppercase mt-2 tracking-wider">
              <span>5 adjusters on track</span>
              <span className="text-white">15 SPOTS LEFT</span>
            </div>
          </div>

          <div className="mt-10 max-w-md mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmitTop} className="space-y-4">
                {!showTopForm ? (
                  <button
                    type="submit"
                    className="w-full bg-white hover:bg-zinc-200 text-black py-5 font-black uppercase tracking-widest text-xs rounded-full font-sans active:scale-98 transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <span>Join the Waitlist</span>
                    <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-zinc-950 border border-zinc-900 rounded-3xl text-left space-y-4 shadow-2xl relative"
                  >
                    <div className="space-y-1">
                      <h4 className="text-white font-sans text-xs font-black uppercase tracking-wider">
                        Waitlist Intake Registration
                      </h4>
                      <p className="text-zinc-500 text-[11px] font-sans">
                        Provide credentials below to register your dedicated adjustor line.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          required
                          disabled={isSubmitting}
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (error) setError('');
                          }}
                          placeholder="Your Full Name"
                          className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-white focus:outline-none px-4 py-3.5 rounded-2xl text-xs text-white font-sans font-medium disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          disabled={isSubmitting}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError('');
                          }}
                          placeholder="Professional Email Address"
                          className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-white focus:outline-none px-4 py-3.5 rounded-2xl text-xs text-white font-sans font-medium disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          required
                          disabled={isSubmitting}
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (error) setError('');
                          }}
                          placeholder="Working Mobile Number"
                          className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-white focus:outline-none px-4 py-3.5 rounded-2xl text-xs text-white font-sans font-medium disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-400 text-xs flex items-center gap-1.5 font-semibold px-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{error}</span>
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-4 font-black uppercase tracking-widest text-xs rounded-full font-sans active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Registering...' : 'Complete Registration'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white stroke-[3]" />
                    </button>
                  </motion.div>
                )}
                <p className="text-zinc-500 font-sans text-xs tracking-wide text-center px-2">
                  First 20 adjusters get 2 free files. No strings.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-950 border border-zinc-800 p-8 rounded-3xl text-left shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent-emerald" />
                <h3 className="text-white font-sans text-lg font-black uppercase tracking-wider mb-3">
                  You're on the list.
                </h3>
                <p className="text-zinc-300 text-sm font-sans leading-relaxed">
                  We'll be in touch within 24 hours. If you have a file ready now, email it to{' '}
                  <a href="mailto:itsyu5668@gmail.com" className="text-white underline hover:text-accent-emerald font-bold">
                    itsyu5668@gmail.com
                  </a>
                </p>

                <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col gap-3">
                  <p className="text-zinc-500 text-xs font-sans font-semibold">
                    Want to learn more about how Citadel Claims works?
                  </p>
                  <button
                    onClick={() => onNavigate('home')}
                    className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-white hover:border-white px-5 py-3 rounded-full text-xs font-extrabold uppercase tracking-widest cursor-pointer transition-colors w-full sm:w-auto self-start"
                  >
                    <span>Visit citadelclaims.com ➔</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* SECTION 2: HOW IT WORKS — THREE STEPS */}
        <section className="py-16 md:py-20 border-b border-zinc-900">
          <div className="mb-12">
            <span className="font-mono text-[11px] text-zinc-500 tracking-widest uppercase block mb-2">
              THE WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
              How it works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-950/60 border border-zinc-900 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-zinc-600 text-3xl font-bold select-none block mb-4">
                  01
                </span>
                <h4 className="text-sm font-bold text-zinc-400 font-sans uppercase tracking-widest mb-3">
                  Submit Media
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-sans font-medium">
                  Text us photos of the damage and a short voice note describing the loss.
                </p>
              </div>
            </div>

            <div className="bg-zinc-950/60 border border-zinc-900 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-zinc-600 text-3xl font-bold select-none block mb-4">
                  02
                </span>
                <h4 className="text-sm font-bold text-zinc-400 font-sans uppercase tracking-widest mb-3">
                  Build &amp; QA
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-sans font-medium">
                  We build your carrier-ready estimate using our industry grade system pipeline plus quality review.
                </p>
              </div>
            </div>

            <div className="bg-zinc-950/60 border border-zinc-900 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-zinc-600 text-3xl font-bold select-none block mb-4">
                  03
                </span>
                <h4 className="text-sm font-bold text-zinc-400 font-sans uppercase tracking-widest mb-3">
                  Instant Delivery
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-sans font-medium">
                  Your PDF is delivered same day with a direct download link.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: WHAT YOU STOP DOING — THREE PAIN POINTS */}
        <section className="py-16 md:py-20 border-b border-zinc-900">
          <div className="mb-12">
            <span className="font-mono text-[11px] text-zinc-500 tracking-widest uppercase block mb-2">
              THE BURDEN SLOWDOWN
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
              What you stop doing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-950 border border-zinc-900/60 p-6 rounded-2xl flex items-start gap-4">
              <span className="text-red-500 mt-1 flex-shrink-0">
                <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
              </span>
              <div>
                <h4 className="text-white font-sans text-[13px] font-black uppercase tracking-wide">
                  Rebuilding estimates at midnight
                </h4>
                <p className="mt-2 text-zinc-500 text-xs leading-relaxed font-sans font-medium">
                  Say goodbye to lost weekends and burnout hours inside desk software tools.
                </p>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-900/60 p-6 rounded-2xl flex items-start gap-4">
              <span className="text-red-500 mt-1 flex-shrink-0">
                <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
              </span>
              <div>
                <h4 className="text-white font-sans text-[13px] font-black uppercase tracking-wide">
                  Missing line items on rushed files
                </h4>
                <p className="mt-2 text-zinc-500 text-xs leading-relaxed font-sans font-medium">
                  No more underpaid values or forgotten trim assemblies due to claim backlog.
                </p>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-900/60 p-6 rounded-2xl flex items-start gap-4">
              <span className="text-red-500 mt-1 flex-shrink-0">
                <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
              </span>
              <div>
                <h4 className="text-white font-sans text-[13px] font-black uppercase tracking-wide">
                  Resubmitting after carrier rejections
                </h4>
                <p className="mt-2 text-zinc-500 text-xs leading-relaxed font-sans font-medium">
                  End the tedious back-and-forth loops triggered by inaccurate building assemblies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: WHAT YOU GET — BULLET LIST */}
        <section className="py-16 md:py-20 border-b border-zinc-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="font-mono text-[11px] text-zinc-500 tracking-widest uppercase block mb-2">
                CORE BENEFIT MATRIX
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
                What you get
              </h2>
              <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed font-sans font-medium">
                We manage the heavy technical work so you can prioritize inspects, scale intake, and double your gross collections rate.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-900 p-6 sm:p-8 rounded-2xl">
              <ul className="space-y-4 font-sans text-sm font-medium">
                {[
                  "Same-day PDF delivery",
                  "Free revision on any carrier rejection",
                  "Supplement protection — if we miss a line item from your photos we fix it free",
                  "Quality confidence score on every file",
                  "Dedicated SMS line — yours permanently",
                  "Cancel anytime by text"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 bg-accent-emerald/15 border border-accent-emerald/30 p-0.5 rounded text-accent-emerald flex-shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span className="text-zinc-350">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5: PRICING — SIMPLE DISPLAY */}
        <section className="py-16 md:py-20 border-b border-zinc-900">
          <div className="text-center mb-12">
            <span className="font-mono text-[11px] text-zinc-500 tracking-widest uppercase block mb-2">
              TRANSPARENT VALUE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
              Pricing
            </h2>
          </div>

          <div className="max-w-md mx-auto bg-zinc-950 border border-zinc-800 p-8 sm:p-12 rounded-3xl text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-zinc-800" />
            
            <p className="font-mono text-[11px] text-zinc-500 tracking-widest uppercase mb-4">
              RECURRING PLAN
            </p>
            
            <div className="flex justify-center items-baseline gap-2 mb-2">
              <span className="text-5xl sm:text-6xl font-black font-sans uppercase tracking-tight text-white">
                $500
              </span>
              <span className="text-zinc-500 font-sans font-bold text-sm">
                /month
              </span>
            </div>

            <p className="text-accent-emerald text-xs font-mono font-extrabold uppercase tracking-wider mb-6">
              + $50 ONE-TIME SETUP FEE
            </p>

            <div className="border-t border-zinc-900 pt-6 mt-6 space-y-4 text-left font-sans text-sm font-semibold text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                <span>10 claims included monthly</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                <span>$75 per claim over 10</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                <span>Dedicated SMS line assigned</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: SECOND EMAIL CAPTURE AT THE BOTTOM */}
        <section className="py-16 md:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-black font-sans uppercase tracking-tight text-white mb-4 animate-pulse">
            Spots are limited. First 20 adjusters get 2 free files.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-sans font-medium mb-8 max-w-lg mx-auto">
            Secure your dedicated adjuster pipeline sequence now. Cancel anytime with a single text block.
          </p>

          <div className="max-w-md mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmitBottom} className="space-y-4">
                {!showBottomForm ? (
                  <button
                    type="submit"
                    className="w-full bg-white hover:bg-zinc-200 text-black py-5 font-black uppercase tracking-widest text-xs rounded-full font-sans active:scale-98 transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <span>Join the Waitlist</span>
                    <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-zinc-950 border border-zinc-900 rounded-3xl text-left space-y-4 shadow-2xl relative"
                  >
                    <div className="space-y-1">
                      <h4 className="text-white font-sans text-xs font-black uppercase tracking-wider">
                        Waitlist Intake Registration
                      </h4>
                      <p className="text-zinc-500 text-[11px] font-sans">
                        Provide credentials below to register your dedicated adjustor line.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          required
                          disabled={isSubmitting}
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (error) setError('');
                          }}
                          placeholder="Your Full Name"
                          className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-white focus:outline-none px-4 py-3.5 rounded-2xl text-xs text-white font-sans font-medium disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          disabled={isSubmitting}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError('');
                          }}
                          placeholder="Professional Email Address"
                          className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-white focus:outline-none px-4 py-3.5 rounded-2xl text-xs text-white font-sans font-medium disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          required
                          disabled={isSubmitting}
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (error) setError('');
                          }}
                          placeholder="Working Mobile Number"
                          className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-white focus:outline-none px-4 py-3.5 rounded-2xl text-xs text-white font-sans font-medium disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-400 text-xs flex items-center gap-1.5 font-semibold px-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{error}</span>
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-4 font-black uppercase tracking-widest text-xs rounded-full font-sans active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Registering...' : 'Complete Registration'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white stroke-[3]" />
                    </button>
                  </motion.div>
                )}
                <p className="text-zinc-500 font-sans text-xs tracking-wide text-center px-2">
                  First 20 adjusters get 2 free files. No strings.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-950 border border-zinc-800 p-8 rounded-3xl text-left shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent-emerald" />
                <h3 className="text-white font-sans text-lg font-black uppercase tracking-wider mb-3">
                  You're on the list.
                </h3>
                <p className="text-zinc-300 text-sm font-sans leading-relaxed">
                  We'll be in touch within 24 hours. If you have a file ready now, email it to{' '}
                  <a href="mailto:itsyu5668@gmail.com" className="text-white underline hover:text-accent-emerald font-bold">
                    itsyu5668@gmail.com
                  </a>
                </p>

                <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col gap-3">
                  <p className="text-zinc-500 text-xs font-sans font-semibold">
                    Want to learn more about how Citadel Claims works?
                  </p>
                  <button
                    onClick={() => onNavigate('home')}
                    className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-white hover:border-white px-5 py-3 rounded-full text-xs font-extrabold uppercase tracking-widest cursor-pointer transition-colors w-full sm:w-auto self-start"
                  >
                    <span>Visit citadelclaims.com ➔</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}
