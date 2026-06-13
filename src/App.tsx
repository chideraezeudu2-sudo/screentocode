import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import PricingView from './components/PricingView';
import SuccessView from './components/SuccessView';
import PortalView from './components/PortalView';
import PrivacyView from './components/PrivacyView';
import TermsView from './components/TermsView';
import WaitlistView from './components/WaitlistView';
import { Estimate } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'waitlist' | 'home' | 'pricing' | 'success' | 'portal' | 'privacy' | 'terms'>('waitlist');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Default seed estimates representing claims history
  const [estimates, setEstimates] = useState<Estimate[]>([
    {
      id: 'CC-0042',
      title: 'Roof Damage - Residence 402',
      type: 'Roof',
      dateSubmitted: 'Oct 24, 2024',
      status: 'PROCESSING',
      assignedTo: 'Desk Estimator James R.',
      notes: 'Estimator assigned. Initial photogrammetry sizing complete.',
    },
    {
      id: 'CC-0039',
      title: 'Flood Assessment - Unit B',
      type: 'Flood',
      dateSubmitted: 'Oct 21, 2024',
      status: 'COMPLETE',
      assignedTo: 'Desk Estimator Marcus V.',
      notes: 'Line item pricing confirmed. QA audit complete.',
      pdfUrl: 'report-39.pdf',
    },
    {
      id: 'CC-0035',
      title: 'Fire Damage - Commercial Warehouse',
      type: 'Fire',
      dateSubmitted: 'Oct 18, 25',
      status: 'REVISION',
      assignedTo: 'Senior Desk Lead Sarah T.',
      notes: 'Estimator flagged possible code compliance variance on structural lumber.',
    },
  ]);

  // Smooth scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col selection:bg-accent-emerald selection:text-neutral-950 antialiased font-sans">
      
      {/* GLOBAL HEADER HEADER */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileNumber={mobileNumber}
        isAuthenticated={isAuthenticated}
      />

      {/* RENDER ACTIVE SCREEN CONTROLLER */}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'waitlist' && (
              <WaitlistView onNavigate={setActiveTab} />
            )}

            {activeTab === 'home' && (
              <HomeView onNavigate={setActiveTab} />
            )}

            {activeTab === 'pricing' && (
              <PricingView
                onNavigate={setActiveTab}
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
                setIsAuthenticated={setIsAuthenticated}
              />
            )}

            {activeTab === 'success' && (
              <SuccessView 
                onNavigate={setActiveTab} 
                mobileNumber={mobileNumber} 
              />
            )}

            {activeTab === 'portal' && (
              <PortalView
                estimates={estimates}
                setEstimates={setEstimates}
                mobileNumber={mobileNumber}
              />
            )}

            {activeTab === 'privacy' && (
              <PrivacyView onNavigate={setActiveTab} />
            )}

            {activeTab === 'terms' && (
              <TermsView onNavigate={setActiveTab} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* GLOBAL FOOTER BAR */}
      <Footer 
        onNavigate={setActiveTab} 
        isAuthenticated={isAuthenticated} 
      />

    </div>
  );
}
