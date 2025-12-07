
import React, { lazy, Suspense } from 'react'; // <-- Import lazy and Suspense
import { motion } from 'framer-motion';

// 1. Components that MUST load immediately (above the fold)
import Hero from './components/Hero';
import Footer from './components/Footer';

// 2. Components to be LAZILY LOADED (below the fold / less critical)
// These components will be split into separate, smaller JS files
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Certifications = lazy(() => import('./components/Certifications'));
const Projects = lazy(() => import('./components/Projects'));
const AIChat = lazy(() => import('./components/AIChat'));


// Paint Effect Background Component (remains the same)
const PaintBackground = () => {
    // ... (Your PaintBackground component code)
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#02040a]">
            {/* Cyan Blob */}
            <motion.div
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -100, 50, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-neon-cyan rounded-full mix-blend-screen opacity-20 blur-[120px]"
            />
            
            {/* Purple Blob */}
            <motion.div
                animate={{
                    x: [0, -100, 50, 0],
                    y: [0, 100, -50, 0],
                    scale: [1, 1.3, 0.9, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] bg-neon-purple rounded-full mix-blend-screen opacity-20 blur-[120px]"
            />
            
            {/* Pink Blob */}
            <motion.div
                animate={{
                    x: [0, 150, -100, 0],
                    y: [0, 50, -50, 0],
                    scale: [1, 0.8, 1.2, 1],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-neon-pink rounded-full mix-blend-screen opacity-15 blur-[120px]"
            />

            {/* Orange Blob - Adding warmth for "Paint" look */}
            <motion.div
                animate={{
                    x: [0, -50, 100, 0],
                    y: [0, -50, 100, 0],
                    scale: [0.8, 1, 0.8, 0.8],
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[20%] right-[30%] w-[35vw] h-[35vw] bg-neon-orange rounded-full mix-blend-screen opacity-15 blur-[100px]"
            />

            {/* Blue Blob - Deepening the background */}
            <motion.div
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, -100, 100, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] bg-neon-blue rounded-full mix-blend-screen opacity-10 blur-[120px]"
            />

            {/* Noise Texture for that "canvas" feel (optional, using simple overlay) */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        </div>
    );
};


function App() {
    return (
        <div className="min-h-screen text-slate-200 selection:bg-neon-cyan selection:text-black relative">
            <PaintBackground />
            <Hero />
            
            {/* Wrap the lazy-loaded components in Suspense */}
            <Suspense fallback={
                <div className="text-center py-20">
                    <p className="text-xl text-neon-cyan">Loading portfolio sections...</p>
                </div>
            }>
                <About />
                <Skills />
                <Certifications />
                <Projects />
                <AIChat />
            </Suspense>

            <Footer />
        </div>
    );
}

export default App;