
// import React, { lazy, Suspense } from 'react'; // <-- Import lazy and Suspense
// import { motion } from 'framer-motion';

// // 1. Components that MUST load immediately (above the fold)
// import Hero from './components/Hero';
import Navbar from './components/Navbar';
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
//             <Navbar />
            <Hero />
            
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

import React, { lazy, Suspense, useState } from 'react'; // <-- ADD useState here

// 1. Components that MUST load immediately (above the fold)
import Hero from './components/Hero_v2';
import Footer from './components/Footer';

// 2. Components to be LAZILY LOADED (below the fold / less critical)
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Profession = lazy(() => import('./components/Profession'));
const TechStack = lazy(() => import('./components/TechStack'));
const UseCases = lazy(() => import('./components/UseCases'));
const Projects = lazy(() => import('./components/Projects'));
const CaseStudies = lazy(() => import('./components/CaseStudies'));
const Certifications = lazy(() => import('./components/Certifications'));
const AIChat = lazy(() => import('./components/AIChat')); // This is the component we'll toggle
const CTA = lazy(() => import('./components/CTA'));


// (PaintBackground removed)


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
            <Hero />
            
            {/* Wrap the lazy-loaded components in Suspense */}
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

