// import { Certification, ContactInfo, Project, Skill } from './types';

// export const CONTACT_INFO: ContactInfo = {
//   phone: "+254 743 269 133",
//   email: "chriznganga69@gmail.com",
//   location: "Nairobi, Kenya",
//   linkedin: "https://linkedin.com/in/chriz-nganga-635648264",
//   github: "https://github.com/themathematcs"
// };

// export const ABOUT_ME = `
// Aspiring AI/Machine Learning Engineer with foundational knowledge in machine learning, deep learning, and computer vision gained through hands-on certifications from Kaggle. Eager to apply skills in Python and TensorFlow to develop innovative AI solutions, including text classification models for sentiment analysis. Passionate about leveraging AI to solve real-world problems in automation and technology.
// `;

// export const SKILLS: Skill[] = [
//   {
//     category: "Programming & Frameworks",
//     items: ["Python", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "OpenCV"]
//   },

//   {
//     category: "Machine Learning",
//     items: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Predictive Modeling"]
//   },
//   {
//     category: "Deep Learning",
//     items: ["Neural Networks", "CNNs", "Object Detection", "Feature Extraction"]
//   },
//   {
//     category: "Tools & Others",
//     items: ["Git", "Jupyter Notebooks", "Basic Networking", "Automation"]
//   }
// ];

// export const CERTIFICATIONS: Certification[] = [
//   {
//     id: "cv-kaggle",
//     title: "Computer Vision",
//     issuer: "Kaggle",
//     date: "2025",
//     url: "https://www.kaggle.com/learn/certification/chriznganga/computer-vision",
//     description: "Explored image classification, feature extraction, and CNN architectures.",
//     tags: ["CV", "CNN", "Image Proc"]
//   },
//   {
//     id: "dl-kaggle",
//     title: "Intro to Deep Learning",
//     issuer: "Kaggle",
//     date: "2025",
//     url: "https://www.kaggle.com/learn/certification/chriznganga/intro-to-deep-learning",
//     description: "Focused on building and training neural networks for predictive modeling.",
//     tags: ["Deep Learning", "Neural Nets"]
//   },
//   {
//     id: "ml-kaggle",
//     title: "Intro to Machine Learning",
//     issuer: "Kaggle",
//     date: "2025",
//     url: "https://www.kaggle.com/learn/certification/chriznganga/intro-to-machine-learning",
//     description: "Covered data preprocessing, model building, and validation techniques.",
//     tags: ["ML", "Data Prep"]
//   },
//   {
//     id: "opencv-simpli",
//     title: "OpenCV Training",
//     issuer: "Simplilearn",
//     date: "2025",
//     url: "https://simpli-web.app.link/e/qsKZoVYcUYb",
//     description: "Specialized training in computer vision library utilization.",
//     tags: ["OpenCV", "Vision"]
//   },
//   {
//     id: "tf-simpli",
//     title: "TensorFlow Training",
//     issuer: "Simplilearn",
//     date: "2025",
//     url: "https://simpli-web.app.link/e/NxO3mK0cUYb",
//     description: "Hands-on training with the TensorFlow framework.",
//     tags: ["TensorFlow", "Tensors"]
//   }
// ];

// export const PROJECTS: Project[] = [
//   {
//     id: "sentiment-classifier",
//     title: "Sentiment Analysis Text Classifier",
//     description: "Developed a machine learning model using TensorFlow and Python to classify movie reviews as positive or negative. Preprocessed text data, trained a neural network, and achieved improved accuracy through hyperparameter tuning.",
//     technologies: ["Python", "TensorFlow", "Scikit-learn"],
//     type: "NLP"
//   },
//   {
//     id: "portfolio-site",
//     title: "AI Interactive Portfolio",
//     description: "A React-based portfolio website featuring an integrated Gemini AI assistant to answer questions about my professional background.",
//     technologies: ["React", "TypeScript", "Gemini API", "Tailwind"],
//     type: "Web"
//   }
// ];
// ///////
// import { GoogleGenAI } from "@google/genai";
// import { ChatMessage } from "./types";

// // --- 1. SECURELY GET THE API KEY ---
// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// if (!apiKey) {
//     throw new Error("API Key missing. Please set VITE_GEMINI_API_KEY in your .env file.");
// }

// const ai = new GoogleGenAI({ apiKey });
// const model = "gemini-2.5-flash"; // Efficient model for chat

// // --- PORTFOLIO KNOWLEDGE BASE ---
// // ⚠️ ACTION: INSERT THE CONSOLIDATED CONTENT HERE
// const PORTFOLIO_CONTEXT = `
// ABOUT ME: Aspiring AI/Machine Learning Engineer with foundational knowledge in machine learning, deep learning, and computer vision gained through hands-on certifications from Kaggle. Eager to apply skills in Python and TensorFlow to develop innovative AI solutions, including text classification models for sentiment analysis. Passionate about leveraging AI to solve real-world problems in automation and technology.

// SKILLS: 
// - Programming & Frameworks: Python, TensorFlow, Scikit-learn, Pandas, NumPy, OpenCV.
// - Machine Learning: Supervised Learning, Unsupervised Learning, Model Evaluation, Predictive Modeling.
// - Deep Learning: Neural Networks, CNNs, Object Detection, Feature Extraction.
// - Tools & Others: Git, Jupyter Notebooks, Basic Networking, Automation.

// CERTIFICATIONS (Kaggle & Simplilearn, 2025):
// - Computer Vision (Kaggle): Explored image classification, feature extraction, and CNN architectures.
// - Intro to Deep Learning (Kaggle): Focused on building and training neural networks for predictive modeling.
// - Intro to Machine Learning (Kaggle): Covered data preprocessing, model building, and validation techniques.
// - OpenCV Training (Simplilearn): Specialized training in computer vision library utilization.
// - TensorFlow Training (Simplilearn): Hands-on training with the TensorFlow framework.

// PROJECTS:
// - Sentiment Analysis Text Classifier (NLP, Python, TensorFlow, Scikit-learn): Developed a machine learning model to classify movie reviews as positive or negative. Achieved improved accuracy through hyperparameter tuning.
// - AI Interactive Portfolio (Web, React, TypeScript, Gemini API, Tailwind): A React-based portfolio website featuring an integrated Gemini AI assistant to answer questions about Christian's professional background.
// `;

// // 2. Define the new streaming function
// export const streamMessageFromGemini = async (
//     userMessage: string, 
//     setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
// ) => {
//     try {
//         const response = await ai.models.generateContentStream({
//             model: model,
//             contents: [{ role: "user", parts: [{ text: userMessage }] }],
//             // ⚠️ FIX: Include the configuration object with the System Instruction
//             config: {
//                 systemInstruction: `You are Christian's personal AI assistant. Your sole purpose is to answer questions about Christian's skills, experience, projects, and certifications. Always refer to Christian in the third person. Base your answers ONLY on the following knowledge provided to you: ${PORTFOLIO_CONTEXT}`
//             }
//         });

//         // The rest of the streaming logic remains the same...
//         let fullResponseText = "";
//         for await (const chunk of response) {
//             const chunkText = chunk.text;
//             if (chunkText) {
//                 fullResponseText += chunkText;
//                 setMessages(prevMessages => {
//                     const newMessages = [...prevMessages];
//                     const lastMessage = newMessages[newMessages.length - 1];

//                     if (lastMessage.role === 'model') {
//                         lastMessage.text = fullResponseText; // Replace the text entirely for smoother stream
//                     }
//                     return newMessages;
//                 });
//             }
//         }
//     } catch (error) {
//         console.error("Error streaming response from Gemini:", error);
//         setMessages(prev => {
//             const newMessages = [...prev];
//             newMessages[newMessages.length - 1] = {
//                 role: 'model',
//                 text: "An error occurred while connecting to the AI. Please try again."
//             };
//             return newMessages;
//         });
//     }
// };

// // 3. Keep the old function definition for structure, but it's now unused.
// export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
//     return "This function is deprecated, use streamMessageFromGemini instead.";
// };
// FILE: src/constants.ts (or wherever your constants file is)

// FILE: src/constants.ts

import { Certification, ContactInfo, Project, Skill } from './types';

export const CONTACT_INFO: ContactInfo = {
    phone: "+254 743 269 133",
    email: "chriznganga69@gmail.com",
    location: "Nairobi, Kenya",
    linkedin: "https://linkedin.com/in/chriz-nganga-635648264",
    github: "https://github.com/themathematcs"
};

export const AUTHOR_NAME = "Christian Nganga";

export const ABOUT_ME = `
Experienced Software & AI Engineer delivering production-ready applications across mobile, systems automation, and advanced AI. I build secure, scalable solutions for SMEs and enterprises in Kenya and the wider E.A. region — from Android/React Native apps and .NET/Node APIs to RAG/LLM assistants (incl. medical with Gemma), CCTV/NMS monitoring, and data recovery/continuity. I focus on clear outcomes, reliability, and thoughtful architecture.
`;

export const SKILLS: Skill[] = [
    {
        category: "Mobile Apps",
        items: ["Android", "React Native", "Flutter", ".NET MAUI", "Offline‑first", "Play Store/Release"]
    },
    {
        category: "Backend & APIs",
        items: [".NET", "Node.js", "REST/GraphQL", "Auth & RBAC", "CI/CD", "Observability"]
    },
    {
        category: "AI/ML & CV",
        items: ["Python", "TensorFlow", "RAG", "LLM Orchestration", "OpenCV", "Evaluation"]
    },
    {
        category: "Payments & Messaging",
        items: ["M‑Pesa STK/USSD", "WhatsApp Business", "WhatsApp Cloud API", "SMS/Email Gateways"]
    },
    {
        category: "Data & Storage",
        items: ["PostgreSQL", "SQLite", "Vector DB (FAISS)", "Backups", "DR/Recovery"]
    },
    {
        category: "Cloud & Infra",
        items: ["AWS/Azure/GCP", "Docker", "Kubernetes", "On‑prem", "Networking", "Security"]
    },
    {
        category: "CCTV & Networking",
        items: ["CCTV/NVR/VMS", "Dahua/Hikvision", "NMS", "MikroTik/Ubiquiti", "RTSP Analytics"]
    },
    {
        category: "Robotics & Edge",
        items: ["Edge AI", "Telemetry", "Sensor Fusion", "ADAS Prototyping", "Fleet Tracking"]
    }
];

export const CERTIFICATIONS: Certification[] = [
    {
        id: "cv-kaggle",
        title: "Computer Vision",
        issuer: "Kaggle",
        date: "2025",
        url: "https://www.kaggle.com/learn/certification/chriznganga/computer-vision",
        description: "Explored image classification, feature extraction, and CNN architectures.",
        tags: ["CV", "CNN", "Image Proc"]
    },
    {
        id: "dl-kaggle",
        title: "Intro to Deep Learning",
        issuer: "Kaggle",
        date: "2025",
        url: "https://www.kaggle.com/learn/certification/chriznganga/intro-to-deep-learning",
        description: "Focused on building and training neural networks for predictive modeling.",
        tags: ["Deep Learning", "Neural Nets"]
    },
    {
        id: "ml-kaggle",
        title: "Intro to Machine Learning",
        issuer: "Kaggle",
        date: "2025",
        url: "https://www.kaggle.com/learn/certification/chriznganga/intro-to-machine-learning",
        description: "Covered data preprocessing, model building, and validation techniques.",
        tags: ["ML", "Data Prep"]
    },
    {
        id: "opencv-simpli",
        title: "OpenCV Training",
        issuer: "Simplilearn",
        date: "2025",
        url: "https://simpli-web.app.link/e/qsKZoVYcUYb",
        description: "Specialized training in computer vision library utilization.",
        tags: ["OpenCV", "Vision"]
    },
    {
        id: "tf-simpli",
        title: "TensorFlow Training",
        issuer: "Simplilearn",
        date: "2025",
        url: "https://simpli-web.app.link/e/NxO3mK0cUYb",
        description: "Hands-on training with the TensorFlow framework.",
        tags: ["TensorFlow", "Tensors"]
    }
];

export const PROJECTS: Project[] = [
    {
        id: "sentinel-csim",
        title: "Sentinel AI Platform (CSIM)",
        description: "A military-grade Converged Security Information Management platform. Fuses real-time physical security (CCTV, Access Control) with digital forensics. Features proprietary Neural Vision Layers for zero-day threat detection and an Immutable Cryptographic Vault for tamper-proof evidence storage.",
        technologies: ["React 19", "Node.js", "Neural Vision", "WORM Storage", "ZFS"],
        type: "AI/Security",
        link: "https://sentinel-csim-v1.web.app/"
    },
    {
        id: "forensic-station",
        title: "Forensic Guardian Workstation",
        description: "An L0-Certified digital investigation suite for post-incident analysis. Features Atomic Time-Travel (ZFS Snapshots) for instant ransomware recovery and a Cryptographic Vault for legally admissible, tamper-proof evidence management.",
        technologies: ["React 19", "MinIO", "AES-256", "Audit Logs", "Digital Chain-of-Custody"],
        type: "Cybersecurity/Forensics",
        link: "https://sentinel-csim-v1.web.app/"
    },
    {
        id: "sentiment-classifier",
        title: "Sentiment Analysis Text Classifier",
        description: "Developed a machine learning model using TensorFlow and Python to classify movie reviews as positive or negative. Preprocessed text data, trained a neural network, and achieved improved accuracy through hyperparameter tuning.",
        technologies: ["Python", "TensorFlow", "Scikit-learn"],
        type: "NLP"
    },
    {
        id: "portfolio-site",
        title: "AI Interactive Portfolio",
        description: "A React-based portfolio website featuring an integrated Gemini AI assistant to answer questions about my professional background.",
        technologies: ["React", "TypeScript", "Gemini API", "Tailwind"],
        type: "Web"
    }
];