import { Certification, ContactInfo, Project, Skill } from './types';

export const CONTACT_INFO: ContactInfo = {
  phone: "+254 743 269 133",
  email: "chriznganga69@gmail.com",
  location: "Nairobi, Kenya",
  linkedin: "https://linkedin.com/in/chriz-nganga-635648264",
  github: "https://github.com/themathematcs"
};

export const ABOUT_ME = `
Aspiring AI/Machine Learning Engineer with foundational knowledge in machine learning, deep learning, and computer vision gained through hands-on certifications from Kaggle. Eager to apply skills in Python and TensorFlow to develop innovative AI solutions, including text classification models for sentiment analysis. Passionate about leveraging AI to solve real-world problems in automation and technology.
`;

export const SKILLS: Skill[] = [
  {
    category: "Programming & Frameworks",
    items: ["Python", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "OpenCV"]
  },
  {
    category: "Machine Learning",
    items: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Predictive Modeling"]
  },
  {
    category: "Deep Learning",
    items: ["Neural Networks", "CNNs", "Object Detection", "Feature Extraction"]
  },
  {
    category: "Tools & Others",
    items: ["Git", "Jupyter Notebooks", "Basic Networking", "Automation"]
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
