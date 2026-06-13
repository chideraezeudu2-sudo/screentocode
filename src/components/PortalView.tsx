import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Download, 
  SlidersHorizontal, 
  Upload, 
  BadgeHelp,
  ShieldCheck,
  ChevronRight,
  PhoneCall,
  User,
  PlusCircle,
  FileMinus,
  MessageSquare,
  Sparkles,
  RefreshCw,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { Estimate, EstimateStatus } from '../types';

interface PortalViewProps {
  estimates: Estimate[];
  setEstimates: React.Dispatch<React.SetStateAction<Estimate[]>>;
  mobileNumber: string;
}

export default function PortalView({ estimates, setEstimates, mobileNumber }: PortalViewProps) {
  const [filter, setFilter] = useState<EstimateStatus | 'ALL'>('ALL');
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null);
  const [isRevisionOpen, setIsRevisionOpen] = useState(false);
  const [revisionResponse, setRevisionResponse] = useState('');
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isSimulateOpen, setIsSimulateOpen] = useState(false);

  // New Simulation Estimate State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Roof');
  const [newNotes, setNewNotes] = useState('');

  // Format phone output
  const getUserPhone = () => {
    return mobileNumber || '+1 (555) 732-4821';
  };

  // Derived Values
  const filteredEstimates = useMemo(() => {
    if (filter === 'ALL') return estimates;
    return estimates.filter(e => e.status === filter);
  }, [estimates, filter]);

  const claimsThisMonth = estimates.length;
  const maxClaims = 50;
  const progressPercent = Math.min((claimsThisMonth / maxClaims) * 100, 100);
  const claimsRemaining = Math.max(maxClaims - claimsThisMonth, 0);

  // Action: Add simulated estimate
  const triggerSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const nextIdNum = Math.max(...estimates.map(es => parseInt(es.id.split('-')[1]) || 30)) + 1;
    const formattedId = `CC-00${nextIdNum}`;

    const newEst: Estimate = {
      id: formattedId,
      title: newTitle.trim(),
      type: newType,
      dateSubmitted: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'PROCESSING',
      notes: newNotes.trim() || 'No customer comments.',
      assignedTo: 'Desk Estimator AI + Senior Audit',
    };

    setEstimates(prev => [newEst, ...prev]);
    setIsSimulateOpen(false);
    setNewTitle('');
    setNewNotes('');
  };

  // Action: Submit revision answers
  const handleRevisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEstimate) return;

    // Update state to processing
    setEstimates(prev => prev.map(item => {
      if (item.id === selectedEstimate.id) {
        return {
          ...item,
          status: 'PROCESSING',
          notes: `Adjuster updated note: "${revisionResponse}". Revised status context processing under active QA audit.`
        };
      }
      return item;
    }));

    setIsRevisionOpen(false);
    setRevisionResponse('');
    setSelectedEstimate(null);
  };

  return (
    <main className="pt-32 pb-24 px-6 md:px-8 max-w-7xl mx-auto relative">
      
      {/* Background radial gradient representing purple-themed authentic portal */}
      <div className="absolute top-0 inset-x-0 h-[800px] portal-blur-bg pointer-events-none z-0" />

      {/* PORTAL SECURED BANNER */}
      <header className="mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface-container-highest rounded-full mb-4 border border-white/5">
          <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
          <span className="font-sans text-[10px] uppercase tracking-wider text-[#e5e2e1] font-extrabold">
            Portal Session Securely Authenticated
          </span>
        </div>
        <h1 className="font-display-xl text-3xl sm:text-5xl font-black text-white mb-2 tracking-tight">
          Portal Access
        </h1>
        <p className="text-muted-text font-sans text-sm sm:text-base">
          Registered Adjuster ID:{' '}
          <span className="text-on-surface font-sans font-extrabold bg-white/5 py-1 px-3 rounded-full text-xs border border-white/5">
            CTX-9942-ALPHA
          </span>
        </p>
      </header>

      {/* TOP DASHBOARD METRICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 relative z-10">
        
        {/* Usage analytics container (progress bar) */}
        <div className="lg:col-span-2 glowing-portal-card rounded-lg p-6 sm:p-8 flex flex-col justify-between border border-surface-border">
          <div>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="font-title-md text-lg sm:text-xl text-white font-bold leading-tight">
                  Claims this month
                </h2>
                <p className="text-muted-text text-xs font-sans mt-0.5">
                  Volume analytics for current billing cycle
                </p>
              </div>
              <div className="text-right">
                <span className="font-display-xl text-3xl sm:text-4xl font-extrabold text-[#e5e2e1] leading-none">
                  {claimsThisMonth}
                </span>
                <span className="text-muted-text font-sans font-extrabold text-xs ml-1">
                  / {maxClaims}
                </span>
              </div>
            </div>

            {/* Glowing progress slider bar */}
            <div className="w-full h-3.5 bg-[#1a1b1b] rounded-full overflow-hidden mb-5 border border-white/5 relative">
              <div 
                className="h-full bg-gradient-to-r from-accent-emerald to-portal-purple rounded-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-5 border-t border-surface-border/40">
            <div className="flex flex-col">
              <span className="text-neutral-500 font-sans text-[9px] uppercase tracking-wider font-extrabold">
                Availability Limit
              </span>
              <span className="text-[#e5e2e1] font-sans text-sm font-extrabold">
                {claimsRemaining} remaining
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-500 font-sans text-[9px] uppercase tracking-wider font-extrabold">
                Projected Surcharges
              </span>
              <span className="text-accent-emerald font-sans text-sm font-extrabold">
                $0.00 in overages
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-500 font-sans text-[9px] uppercase tracking-wider font-extrabold">
                Carrier Rate System
              </span>
              <span className="text-portal-purple font-sans text-sm font-extrabold">
                Audit Pass Verified
              </span>
            </div>
          </div>
        </div>

        {/* Dedicated hotline intake instructions card */}
        <div className="bg-surface-container-low border border-surface-border rounded-lg p-6 flex flex-col justify-center items-center text-center relative group overflow-hidden">
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-portal-purple/5 rounded-full blur-xl pointer-events-none" />
          <PhoneCall className="w-8 h-8 text-neutral-500 group-hover:text-accent-emerald transition-colors mb-4" />
          
          <h3 className="font-sans text-[10px] text-muted-text uppercase tracking-widest font-extrabold mb-1.5">
            Dedicated Intake Hotline
          </h3>
          <div className="font-sans text-xl sm:text-2xl font-black text-white bg-black/40 border border-white/5 py-1.5 px-4 rounded-full tracking-wide mb-4">
            +1 (833) 244-6721
          </div>
          <p className="text-muted-text text-[13px] px-2 leading-relaxed">
            Text tagged ZIP files, PDFs, images or voice scoping context directly. Our automated matching system assigns them instant portal IDs.
          </p>
        </div>

      </div>

      {/* ESTIMATES TABLE SECTION */}
      <section className="mb-12 relative z-10">
        
        {/* Title bar with filtering tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs tracking-wider text-[#e5e2e1] font-extrabold uppercase">
              YOUR CLAIMS ARCHIVE
            </span>
            <div className="px-2.5 py-0.5 bg-accent-emerald/10 text-accent-emerald font-sans text-[9px] font-extrabold rounded-full uppercase">
              {filteredEstimates.length} items
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            
            {/* Simulation button with glass morph / rounded-full shape */}
            <button
              onClick={() => setIsSimulateOpen(true)}
              className="px-4 py-2 bg-purple-950/80 hover:bg-purple-900 border border-purple-500/30 text-xs text-white font-sans rounded-full font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-all mr-2"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Simulate SMS Submission</span>
            </button>

            {/* Selector status filters with rounded-full shapes */}
            {(['ALL', 'PROCESSING', 'COMPLETE', 'REVISION'] as const).map(option => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-3.5 py-1.5 font-sans text-[10px] font-black uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  filter === option
                    ? 'bg-neutral-800 text-white border border-white/10 shadow-lg'
                    : 'text-neutral-450 hover:text-white hover:bg-neutral-900/50'
                }`}
              >
                {option}
              </button>
            ))}

          </div>
        </div>

        {/* LIST OF CLAIMS */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredEstimates.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 bg-surface-container-low border border-surface-border rounded-2xl"
              >
                <FileMinus className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                <p className="font-sans text-xs text-neutral-400 font-extrabold tracking-wider">
                  NO ESTIMATES DETECTED MATCHING CATEGORY
                </p>
                <button 
                  onClick={() => setIsSimulateOpen(true)} 
                  className="mt-4 text-xs font-sans font-extrabold text-accent-emerald hover:underline uppercase"
                >
                  Create Simulated Claim Now
                </button>
              </motion.div>
            ) : (
              filteredEstimates.map(est => {
                // Determine icon and badges
                let StatusIcon = Clock;
                let badgeStyle = '';
                let actButton = null;

                if (est.status === 'PROCESSING') {
                  StatusIcon = RefreshCw;
                  badgeStyle = 'bg-amber-500/10 text-amber-500 border-amber-500/20';
                  actButton = (
                    <button 
                      disabled
                      className="w-full md:w-auto px-5 py-2.5 bg-neutral-900/85 text-neutral-600 font-sans text-[10px] font-extrabold uppercase tracking-widest border border-white/5 cursor-not-allowed select-none leading-none rounded-full"
                    >
                      Under Forensics Review
                    </button>
                  );
                } else if (est.status === 'COMPLETE') {
                  StatusIcon = CheckCircle2;
                  badgeStyle = 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20';
                  actButton = (
                    <button 
                      onClick={() => {
                        setSelectedEstimate(est);
                        setIsPdfOpen(true);
                      }}
                      className="w-full md:w-auto px-5 py-2.5 border border-white text-white hover:bg-white hover:text-black transition-all font-sans text-[10px] font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5 leading-none rounded-full cursor-pointer duration-200"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Estimate
                    </button>
                  );
                } else if (est.status === 'REVISION') {
                  StatusIcon = AlertTriangle;
                  badgeStyle = 'bg-red-500/10 text-red-500 border-red-500/20';
                  actButton = (
                    <button 
                      onClick={() => {
                        setSelectedEstimate(est);
                        setIsRevisionOpen(true);
                      }}
                      className="w-full md:w-auto px-5 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-black border border-red-500/20 hover:border-transparent transition-all font-sans text-[10px] font-extrabold uppercase tracking-widest leading-none rounded-full cursor-pointer"
                    >
                      Review Notes
                    </button>
                  );
                }

                return (
                  <motion.div
                    key={est.id}
                    layoutId={est.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="group bg-surface-container-low border border-surface-border hover:border-accent-emerald/45 transition-colors duration-300 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5"
                  >
                    <div className="flex items-center gap-5">
                      {/* Left icon wrapper */}
                      <div className="hidden md:flex flex-col items-center justify-center w-12 h-12 bg-[#1a1b1b] rounded-xl border border-surface-border group-hover:border-accent-emerald/35 transition-colors">
                        <FileText className="w-5 h-5 text-neutral-400 group-hover:text-accent-emerald transition-colors" />
                      </div>

                      {/* Main descriptive typography */}
                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="font-sans text-white font-black text-sm tracking-wide">
                            {est.id}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-widest border select-none ${badgeStyle}`}>
                            {est.status}
                          </span>
                        </div>
                        <h3 className="text-on-surface font-semibold text-[15px] group-hover:text-white transition-colors">
                          {est.title}
                        </h3>
                        
                        <div className="flex items-center gap-4 mt-2 font-sans text-[10px] text-neutral-500">
                          <span>Damage Type: <strong className="text-neutral-400">{est.type}</strong></span>
                          <span>•</span>
                          <span>Submitted: <strong className="text-neutral-400">{est.dateSubmitted}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons wrapper */}
                    <div className="flex items-center gap-4 border-t border-white/5 pt-4 md:border-t-0 md:pt-0">
                      {actButton}
                    </div>

                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

      </section>

      {/* SUBMISSION PROTOCOL CARD */}
      <section className="relative z-10 transition-transform duration-500">
        <div className="mb-6">
          <h2 className="font-sans text-xs tracking-wider text-neutral-400 uppercase font-extrabold">
            RESTRICTED SUBMISSION PROTOCOL
          </h2>
        </div>

        <div className="bg-surface-container-lowest border border-surface-border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-surface-border/50">
            
            {/* Step 1 */}
            <div className="p-6 md:p-8 flex flex-col gap-4 hover:bg-white/1 transition-all">
              <div className="font-sans text-accent-emerald text-sm font-black">01</div>
              <div>
                <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-wide font-title-md">
                  Initiate Link
                </h4>
                <p className="text-muted-text text-xs leading-relaxed font-sans font-medium">
                  Secure messaging links dynamically to {getUserPhone()}. Text our primary intake line to initiate.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 md:p-8 flex flex-col gap-4 hover:bg-white/1 transition-all">
              <div className="font-sans text-accent-emerald text-sm font-black">02</div>
              <div>
                <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-wide font-title-md">
                  Submit Photos
                </h4>
                <p className="text-muted-text text-xs leading-relaxed font-sans font-medium">
                  Transmit clean high resolution claim photos: primary structures, pitch shots and labeled macro detail.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 md:p-8 flex flex-col gap-4 hover:bg-white/1 transition-all">
              <div className="font-sans text-accent-emerald text-sm font-black">03</div>
              <div>
                <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-wide font-title-md">
                  Transcribe Voice
                </h4>
                <p className="text-muted-text text-xs leading-relaxed font-sans font-medium">
                  Record a brief voice scoping memo. Note architectural details, supplement requests, or interior trades.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 md:p-8 flex flex-col gap-4 hover:bg-white/1 transition-all">
              <div className="font-sans text-accent-emerald text-sm font-black">04</div>
              <div>
                <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-wide font-title-md">
                  Quality Desk Review
                </h4>
                <p className="text-muted-text text-xs leading-relaxed font-sans font-medium">
                  Our dual-human QA process completes Xactimate line estimates within 24 hours. No software downloads necessary.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================== MODAL WINDOWS ==================================== */}

      {/* 1. MOCK PDF PREVIEWER MODAL */}
      <AnimatePresence>
        {isPdfOpen && selectedEstimate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Backdrop blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xs cursor-pointer"
              onClick={() => setIsPdfOpen(false)}
            />

            {/* PDF Modal Content Sheet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-3xl bg-zinc-950 rounded-lg border border-zinc-850 overflow-hidden shadow-2xl z-10 font-mono text-xs max-h-[85vh] flex flex-col text-[#b4b5b5]"
            >
              {/* Modal Header */}
              <div className="border-b border-surface-border/50 py-4 px-6 flex justify-between items-center bg-zinc-900/60 shrink-0">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-5 h-5 text-accent-emerald animate-pulse" />
                  <span className="font-black text-white text-xs tracking-wider">
                    COMPLETED_REPORT_{selectedEstimate.id}.ESX.PDF
                  </span>
                </div>
                <button 
                  onClick={() => setIsPdfOpen(false)}
                  className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* PDF Mock Details body */}
              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* PDF Header mock logo */}
                <div className="flex justify-between items-start border-b border-white/5 pb-6">
                  <div>
                    <h5 className="font-black text-sm text-white">CITADEL CLAIMS FORENSIC SERVICES</h5>
                    <p className="text-[10px] text-neutral-500 mt-1">Estimator Desk: Suite #12A1 Hurricane Team</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent-emerald">AUDIT PASS CONFIRMED</p>
                    <p className="text-[9px] text-neutral-500">Stamp ID: CC-QA-9994</p>
                  </div>
                </div>

                {/* Scope specs block */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/1 p-4 rounded border border-white/5">
                  <div>
                    <p className="text-[9px] text-neutral-500 uppercase tracking-wider mb-0.5">Claim ID</p>
                    <p className="text-white font-bold">{selectedEstimate.id}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-neutral-500 uppercase tracking-wider mb-0.5">Scoping Date</p>
                    <p className="text-white font-bold">{selectedEstimate.dateSubmitted}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-neutral-500 uppercase tracking-wider mb-0.5 text-accent-emerald font-bold">Estimated Cost</p>
                    <p className="text-accent-emerald font-black">$14,582.40</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-neutral-500 uppercase tracking-wider mb-0.5 font-bold text-portal-purple">Status</p>
                    <p className="text-portal-purple font-bold">CARRIER READY</p>
                  </div>
                </div>

                {/* Mock line items */}
                <div className="space-y-4">
                  <h6 className="text-[10px] text-white uppercase tracking-widest font-bold">Xactimate Line Items Breakdown</h6>
                  
                  <div className="border border-white/5 rounded divide-y divide-white/5">
                    <div className="grid grid-cols-12 gap-2 p-3 bg-white/2 text-white font-bold text-[10px]">
                      <span className="col-span-2">CAT CODE</span>
                      <span className="col-span-6">DESCRIPTION</span>
                      <span className="col-span-1 text-right">QTY</span>
                      <span className="col-span-1 text-right">UNIT</span>
                      <span className="col-span-2 text-right">AMOUNT</span>
                    </div>

                    <div className="grid grid-cols-12 gap-2 p-3">
                      <span className="col-span-2 font-mono text-zinc-500">RFG SG30</span>
                      <span className="col-span-6">Premium 3-Tab composition shingle, 30yr warranty style</span>
                      <span className="col-span-1 text-right">32.6</span>
                      <span className="col-span-1 text-right">SQ</span>
                      <span className="col-span-2 text-right text-white font-semibold">$9,232.00</span>
                    </div>

                    <div className="grid grid-cols-12 gap-2 p-3">
                      <span className="col-span-2 font-mono text-zinc-500">RFG VAL</span>
                      <span className="col-span-6">Ice &amp; water barrier protective lining membrane</span>
                      <span className="col-span-1 text-right">180</span>
                      <span className="col-span-1 text-right">LF</span>
                      <span className="col-span-2 text-right text-white font-semibold">$1,440.00</span>
                    </div>

                    <div className="grid grid-cols-12 gap-2 p-3">
                      <span className="col-span-2 font-mono text-zinc-500">RFG VENT</span>
                      <span className="col-span-6">Ridge cap continuous exhaust ventilating slots</span>
                      <span className="col-span-1 text-right">88</span>
                      <span className="col-span-1 text-right">LF</span>
                      <span className="col-span-2 text-right text-white font-semibold">$1,848.00</span>
                    </div>

                    <div className="grid grid-cols-12 gap-2 p-3 font-semibold bg-accent-emerald/5">
                      <span className="col-span-2 text-accent-emerald">FEE SUB</span>
                      <span className="col-span-6 text-accent-emerald">Taxes, material haul, cleanup and safety staging</span>
                      <span className="col-span-1 text-right text-accent-emerald">1.0</span>
                      <span className="col-span-1 text-right text-accent-emerald">EA</span>
                      <span className="col-span-2 text-right text-accent-emerald font-black">$2,062.40</span>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-zinc-500 font-sans italic text-center select-none pt-4">
                  The information in this document has passed rigorous, secure desk forensics matching carrier guidelines. 
                  Underwritten by licensed public adjustment inspectors, Citadel LLC.
                </p>

              </div>

              {/* Footer downloads */}
              <div className="border-t border-surface-border/50 p-4 bg-zinc-900/60 block shrink-0 text-center">
                <a
                  href={`data:text/plain;charset=utf-8,${encodeURIComponent(`CITADEL CLAIMS CARRIER REPORT CC-QA-9994\nEstimate: ${selectedEstimate.title}\nTotal Cost Amount: $14,582.40`)}`}
                  download={`Estimate_${selectedEstimate.id}.txt`}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-accent-emerald text-black font-mono font-bold uppercase rounded hover:bg-emerald-400 cursor-pointer active:scale-95 transition-all text-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Download report (TXT)
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. REVISION REVIEW DIALOG (REVERT STATE BACK TO PROCESSING) */}
      <AnimatePresence>
        {isRevisionOpen && selectedEstimate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Backdrop blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xs cursor-pointer"
              onClick={() => setIsRevisionOpen(false)}
            />

            {/* Modal Sheet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95}}
              animate={{ opacity: 1, scale: 1}}
              exit={{ opacity: 0, scale: 0.95}}
              className="relative w-full max-w-lg bg-zinc-950 rounded-2xl border border-zinc-850 overflow-hidden shadow-2xl z-10 font-sans p-6 text-[#b4b5b5]"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="font-sans text-sm text-white font-extrabold uppercase tracking-wider">
                    REVISION NOTES • {selectedEstimate.id}
                  </span>
                </div>
                <button onClick={() => setIsRevisionOpen(false)} className="text-zinc-500 hover:text-white cursor-pointer select-none">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scope details */}
              <div className="space-y-4">
                <div>
                  <h6 className="text-[10px] text-zinc-500 uppercase tracking-widest font-sans font-extrabold">CLAIM SOURCE</h6>
                  <p className="text-white font-bold text-base mt-0.5">{selectedEstimate.title}</p>
                </div>

                <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl">
                  <span className="font-sans text-[10px] text-red-400 uppercase font-black tracking-wide block mb-1">
                    ESTIMATOR FEEDBACK COMMENTS log
                  </span>
                  <p className="text-zinc-300 italic text-sm leading-relaxed font-sans">
                    "Line structural assessment CC-0035 specifies 4 valley components. Aerial photography indicates venting is composite metal rather than felt shingles, which changes the ridge line count. Adjuster validation required before final PDF lock."
                  </p>
                </div>

                {/* response form */}
                <form onSubmit={handleRevisionSubmit} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-[10px] text-zinc-400 font-sans uppercase tracking-wider mb-2 font-extrabold select-none">
                      Your Correction Scoping Notes
                    </label>
                    <textarea
                      required
                      placeholder="e.g., Composite metal venting is verified correct. Valley length is indeed 120 LF rather than 180 LP. Double-checked material photos on site..."
                      value={revisionResponse}
                      onChange={(e) => setRevisionResponse(e.target.value)}
                      className="w-full bg-[#141515] text-white border border-white/10 rounded-xl p-3 text-sm focus:outline-hidden focus:border-red-400 min-h-[100px] transition-colors"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsRevisionOpen(false)}
                      className="px-5 py-2.5 border border-white/10 text-neutral-400 hover:text-white text-xs font-sans font-bold rounded-full uppercase cursor-pointer transition-colors"
                    >
                      Dismiss
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-red-500 text-black text-xs font-sans font-black rounded-full uppercase cursor-pointer hover:bg-red-400 transition-colors"
                    >
                      Resubmit Scoping Notes
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. SIMULATED SMS SUBMISSION CLIENT FORM */}
      <AnimatePresence>
        {isSimulateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Backdrop blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xs cursor-pointer"
              onClick={() => setIsSimulateOpen(false)}
            />

            {/* Modal dialogue Sheet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-zinc-950 rounded-2xl border border-zinc-850 p-6 shadow-2xl z-10 font-sans text-neutral-300"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-portal-purple animate-pulse" />
                  <span className="font-sans text-xs text-white font-black uppercase tracking-wider">
                    SIMULATE SMS WORKFLOW SUBMIT
                  </span>
                </div>
                <button onClick={() => setIsSimulateOpen(false)} className="text-zinc-500 hover:text-white cursor-pointer select-none">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={triggerSimulation} className="space-y-4 text-xs font-sans">
                
                <div>
                  <label className="block text-[10px] text-zinc-400 uppercase tracking-wider mb-2 font-black select-none">
                    Estimate Title / Insured Resident
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Roof Inspection - Residence 509"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-[#141515] text-white border border-white/10 rounded-xl p-3 text-xs focus:outline-hidden focus:border-portal-purple transition-colors font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 uppercase tracking-wider mb-2 font-black select-none">
                    Damage Loss Category
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full bg-[#141515] text-white border border-white/10 rounded-xl p-3 text-xs focus:outline-hidden focus:border-portal-purple transition-colors font-sans py-2.5"
                  >
                    <option value="Roof">Roof Shingles &amp; Gutters</option>
                    <option value="Flood">Flood / Storm Surge</option>
                    <option value="Fire">Fire / Burn Commercial trades</option>
                    <option value="Wind">Severe Wind / Siding loss</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 uppercase tracking-wider mb-2 font-black select-none flex justify-between items-center">
                    <span>Voice Scope Transcription Text</span>
                    <span className="text-[9px] text-[#814ac8] uppercase">Optional</span>
                  </label>
                  <textarea
                    placeholder="e.g. Voice note transcribed: 32 squares shingles composition 3-tab, double valleys, replacement needed for flashing vents on ridge line..."
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full bg-[#141515] text-white border border-white/10 rounded-xl p-3 text-xs focus:outline-hidden focus:border-portal-purple min-h-[90px] transition-colors font-sans"
                  />
                </div>

                <div className="bg-portal-purple/5 border border-portal-purple/10 p-3 rounded-xl text-[10px] text-zinc-400 leading-relaxed font-sans mb-2 font-medium">
                  This simulates an adjuster hitting the Citadel Intake number via SMS. 
                  Once submitted, our backend pipeline spins up forensic ingestions, scheduling immediately.
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSimulateOpen(false)}
                    className="px-5 py-2 border border-white/10 text-neutral-400 hover:text-white text-[10px] font-bold uppercase rounded-full cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-portal-purple text-white font-extrabold text-[10px] uppercase cursor-pointer hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all rounded-full shadow-md"
                  >
                    Send simulated SMS
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
