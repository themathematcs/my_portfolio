// import path from 'path';
// import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig(({ mode }) => {
//     const env = loadEnv(mode, '.', '');
//     return {
//       server: {
//         port: 3000,
//         host: '0.0.0.0',
//       },
//       plugins: [react()],
//       define: {
//         'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
//         'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
//       },
//       resolve: {
//         alias: {
//           '@': path.resolve(__dirname, '.'),
//         }
//       }
//     };
// });

import path from 'path';
import { defineConfig, loadEnv } from 'vite'; // loadEnv is imported but not used, so we can comment it out
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // const env = loadEnv(mode, '.', ''); // Not needed anymore since we removed the 'define' block

    return {
        // --- GITHUB PAGES DEPLOYMENT IS CORRECT ---
        base: '/my_portfolio/', 
        // ----------------------------------------
        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        plugins: [react()],
        // The 'define' block is gone, securing your API key!
        
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            }
        }
    };
});