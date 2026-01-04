
// import React, { lazy, Suspense } from 'react'; // <-- Import lazy and Suspense
// import { motion } from 'framer-motion';

// // 1. Components that MUST load immediately (above the fold)
// import Hero from './components/Hero';
// import Footer from './components/Footer';

// // 2. Components to be LAZILY LOADED (below the fold / less critical)
// // These components will be split into separate, smaller JS files
// const About = lazy(() => import('./components/About'));
// const Skills = lazy(() => import('./components/Skills'));
// const Certifications = lazy(() => import('./components/Certifications'));
// const Projects = lazy(() => import('./components/Projects'));
// const AIChat = lazy(() => import('./components/AIChat'));


// // Paint Effect Background Component (remains the same)
// const PaintBackground = () => {
//     // ... (Your PaintBackground component code)
//     return (
//         <div className="fixed inset-0 -z-10 overflow-hidden bg-[#02040a]">
//             {/* Cyan Blob */}
//             <motion.div
//                 animate={{
//                     x: [0, 100, -50, 0],
//                     y: [0, -100, 50, 0],
//                     scale: [1, 1.2, 0.9, 1],
//                 }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
//                 className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-neon-cyan rounded-full mix-blend-screen opacity-20 blur-[120px]"
//             />
            
//             {/* Purple Blob */}
//             <motion.div
//                 animate={{
//                     x: [0, -100, 50, 0],
//                     y: [0, 100, -50, 0],
//                     scale: [1, 1.3, 0.9, 1],
//                 }}
//                 transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
//                 className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] bg-neon-purple rounded-full mix-blend-screen opacity-20 blur-[120px]"
//             />
            
//             {/* Pink Blob */}
//             <motion.div
//                 animate={{
//                     x: [0, 150, -100, 0],
//                     y: [0, 50, -50, 0],
//                     scale: [1, 0.8, 1.2, 1],
//                 }}
//                 transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
//                 className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-neon-pink rounded-full mix-blend-screen opacity-15 blur-[120px]"
//             />

//             {/* Orange Blob - Adding warmth for "Paint" look */}
//             <motion.div
//                 animate={{
//                     x: [0, -50, 100, 0],
//                     y: [0, -50, 100, 0],
//                     scale: [0.8, 1, 0.8, 0.8],
//                 }}
//                 transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
//                 className="absolute bottom-[20%] right-[30%] w-[35vw] h-[35vw] bg-neon-orange rounded-full mix-blend-screen opacity-15 blur-[100px]"
//             />

//             {/* Blue Blob - Deepening the background */}
//             <motion.div
//                 animate={{
//                     x: [0, 50, -50, 0],
//                     y: [0, -100, 100, 0],
//                     scale: [1, 1.1, 0.9, 1],
//                 }}
//                 transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
//                 className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] bg-neon-blue rounded-full mix-blend-screen opacity-10 blur-[120px]"
//             />

//             {/* Noise Texture for that "canvas" feel (optional, using simple overlay) */}
//             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
//         </div>
//     );
// };


// function App() {
//     return (
//         <div className="min-h-screen text-slate-200 selection:bg-neon-cyan selection:text-black relative">
//             <PaintBackground />
//             <Hero />
            
//             {/* Wrap the lazy-loaded components in Suspense */}
//             <Suspense fallback={
//                 <div className="text-center py-20">
//                     <p className="text-xl text-neon-cyan">Loading portfolio sections...</p>
//                 </div>
//             }>
//                 <About />
//                 <Skills />
//                 <Certifications />
//                 <Projects />
//                 <AIChat />
//             </Suspense>

//             <Footer />
//         </div>
//     );
// }

// export default App;

import React, { lazy, Suspense, useEffect, useState } from 'react'; // <-- ADD useState here
import { motion, useMotionValue, useSpring } from 'framer-motion';

// 1. Components that MUST load immediately (above the fold)
import Hero from './components/Hero';
import Footer from './components/Footer';

// 2. Components to be LAZILY LOADED (below the fold / less critical)
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Certifications = lazy(() => import('./components/Certifications'));
const Profession = lazy(() => import('./components/Profession'));
const Projects = lazy(() => import('./components/Projects'));
const AIChat = lazy(() => import('./components/AIChat')); // This is the component we'll toggle


// Paint Effect Background Component (remains the same)
const PaintBackground = () => {
    const mvX = useMotionValue(0);
    const mvY = useMotionValue(0);

    const x = useSpring(mvX, { stiffness: 60, damping: 18, mass: 0.8 });
    const y = useSpring(mvY, { stiffness: 60, damping: 18, mass: 0.8 });

    useEffect(() => {
        const supportsFinePointer = typeof window !== 'undefined'
            ? window.matchMedia?.('(pointer:fine)')?.matches
            : false;

        if (!supportsFinePointer) return;

        const handleMove = (e: PointerEvent) => {
            const w = window.innerWidth || 1;
            const h = window.innerHeight || 1;
            const nx = (e.clientX / w) * 2 - 1;
            const ny = (e.clientY / h) * 2 - 1;

            mvX.set(nx * 10);
            mvY.set(ny * 7);
        };

        window.addEventListener('pointermove', handleMove, { passive: true });
        return () => window.removeEventListener('pointermove', handleMove);
    }, [mvX, mvY]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050814] pointer-events-none">
            <motion.div className="absolute inset-0" style={{ x, y }}>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-[#060a1b]/55 to-[#02040a]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(0,243,255,0.08),transparent_58%),radial-gradient(circle_at_80%_25%,rgba(188,19,254,0.07),transparent_58%),radial-gradient(circle_at_50%_85%,rgba(255,0,255,0.06),transparent_62%)]" />

                <motion.div
                    animate={{
                        x: [0, 90, -60, 0],
                        y: [0, -70, 50, 0],
                        scale: [1, 1.15, 0.95, 1],
                    }}
                    transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-[-15%] left-[-10%] w-[42vw] h-[42vw] bg-neon-cyan rounded-full mix-blend-screen opacity-16 blur-[130px]"
                />

                <motion.div
                    animate={{
                        x: [0, -110, 70, 0],
                        y: [0, 80, -60, 0],
                        scale: [1, 1.2, 0.95, 1],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-[5%] right-[-12%] w-[48vw] h-[48vw] bg-neon-purple rounded-full mix-blend-screen opacity-14 blur-[140px]"
                />

                <motion.div
                    animate={{
                        x: [0, 120, -80, 0],
                        y: [0, 60, -40, 0],
                        scale: [1, 0.9, 1.25, 1],
                    }}
                    transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-[-18%] left-[18%] w-[55vw] h-[55vw] bg-neon-pink rounded-full mix-blend-screen opacity-12 blur-[150px]"
                />
            </motion.div>

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,4,10,0.00)_0%,rgba(2,4,10,0.55)_70%,rgba(2,4,10,0.75)_100%)]" />
        </div>
    );
};


function App() {
    // 🟢 1. INTRODUCE STATE TO MANAGE CHAT VISIBILITY
    const [isChatOpen, setIsChatOpen] = useState(true); // Set to true to show it by default

    // Function to close the chat, passed as a prop
    const handleCloseChat = () => {
        setIsChatOpen(false);
    };

    // Function to open the chat
    const handleOpenChat = () => {
        setIsChatOpen(true);
    };

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
                <Profession />
                <Projects />
                
                {/* AIChat is now conditionally rendered */}
                {/* When AIChat is rendered, we pass the close function */}
                {isChatOpen && (
                    <AIChat onClose={handleCloseChat} />
                )}

            </Suspense>

            <Footer />
            
            {/* 🟢 2. FLOATING BUTTON TO REOPEN THE CHAT */}
            {/* Only show this button if the chat is currently closed */}
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

