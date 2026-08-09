import React, { lazy, Suspense, useState, useEffect } from 'react';

// Components that load immediately
import Navbar from './components/Navbar';
import Hero from './components/Hero_v2';
import Footer from './components/Footer';

// Lazily loaded components
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Profession = lazy(() => import('./components/Profession'));
const TechStack = lazy(() => import('./components/TechStack'));
const UseCases = lazy(() => import('./components/UseCases'));
const Projects = lazy(() => import('./components/Projects'));
const CaseStudies = lazy(() => import('./components/CaseStudies'));
const Certifications = lazy(() => import('./components/Certifications'));
const AIChat = lazy(() => import('./components/AIChat'));
const CTA = lazy(() => import('./components/CTA'));
const TradingForALiving = lazy(() => import('./components/TradingForALiving'));

function App() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [currentView, setCurrentView] = useState<'portfolio' | 'trading'>('portfolio');

    // Check hash on load and listen to hash change
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.toLowerCase();
            const pathname = window.location.pathname.toLowerCase();
            if (hash === '#trading' || hash.startsWith('#trading') || pathname.includes('/trading')) {
                setCurrentView('trading');
            } else {
                setCurrentView('portfolio');
            }
        };

        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleOpenTrading = () => {
        window.location.hash = 'trading';
        setCurrentView('trading');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackToPortfolio = () => {
        window.location.hash = '';
        setCurrentView('portfolio');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCloseChat = () => {
        setIsChatOpen(false);
    };

    const handleOpenChat = () => {
        setIsChatOpen(true);
    };

    // If viewing Trading for a Living platform
    if (currentView === 'trading') {
        return (
            <Suspense fallback={
                <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-4">
                    <div className="text-3xl mb-4 animate-bounce">📈</div>
                    <p className="text-lg font-bold text-[#00E676] font-mono">Loading Trading for a Living Academy...</p>
                </div>
            }>
                <TradingForALiving onBackToPortfolio={handleBackToPortfolio} />
            </Suspense>
        );
    }

    // Default Portfolio View
    return (
        <div className="min-h-screen text-slate-200 selection:bg-neon-cyan selection:text-black relative">
            <Navbar onOpenTrading={handleOpenTrading} />
            <Hero />
            
            <Suspense fallback={
                <div className="text-center py-20">
                    <p className="text-xl text-neon-cyan">Loading portfolio sections...</p>
                </div>
            }>
                <About />
                <Skills />
                <Profession />
                <UseCases />
                <Projects />
                <CaseStudies />
                <TechStack />
                <Certifications />
                <CTA />
                
                {isChatOpen && (
                    <AIChat onClose={handleCloseChat} />
                )}
            </Suspense>

            <Footer />
            
            {/* Floating button to open chat */}
            {!isChatOpen && (
                <button
                    className="fixed bottom-6 right-6 z-50 bg-neon-cyan text-black p-4 rounded-full shadow-2xl transition-transform hover:scale-105"
                    onClick={handleOpenChat}
                    aria-label="Open AI Chat Assistant"
                >
                    💬 Chat with Gemini
                </button>
            )}
        </div>
    );
}

export default App;
