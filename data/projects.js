// ============================================================
//  MARINA MOHSEN — PORTFOLIO DATA
// ============================================================

const PROFILE = {
  name:        "Marina Mohsen",
  title:       "AI Engineer",
  location:    "Cairo, Egypt",
  email:       "marinamohsen70@gmail.com",
  github:      "https://github.com/marina317",
  whatsapp:    "https://wa.me/201289477114",
  phone:       "+20 1289477114",
  linkedin:    "https://linkedin.com/in/YOUR_LINKEDIN",
  cv:          "assets/cv.pdf"
};

// ── Cleaned, Verified Skills Inventory ──
const SKILLS_DATA = [
  {
    category: "LANGUAGES & CORE",
    skills: ["Python", "SQL", "Bash", "Git / GitHub"]
  },
  {
    category: "DEEP LEARNING & TRANSFORMERS",
    skills: ["PyTorch", "Hugging Face", "LoRA / PEFT", "Attention Mechanisms", "Fine-Tuning"]
  },
  {
    category: "COMPUTER VISION",
    skills: ["OpenCV", "Single Object Tracking", "Semantic Segmentation", "Scikit-image"]
  },
  {
    category: "EDGE ACCELERATION & OPTIMIZATION",
    skills: ["TensorRT", "ONNX", "Conv-BN Fusion", "Stem Surgery", "FP16 Inference", "SDPA Attention", "KV Caching", "torch.compile"]
  },
  {
    category: "DEPLOYMENT & SCIENTIFIC ARRAYS",
    skills: ["Docker", "NumPy", "Pandas", "Scikit-learn", "NVIDIA Jetson Orin Nano", "Modular CLI Design"]
  },
  {
    category: "RESEARCH & ACADEMIC INITIATIVE",
    skills: ["Co-Founder Student Research Community", "Deployment Auditing", "Closed-Loop Verification", "Technical Writing"]
  }
];

// ── Projects (Selina-Style Structure with Technical & Impact Paragraphs) ──
const PROJECTS = [

  // 1. SINGLE OBJECT TRACKING
  {
    id:          "sot-tracking",
    num:         "1",
    title:       "Single Object Tracking on Edge Devices",
    badge:       "🥇 1ST PLACE · MTC-AIC4",
    category:    "EDGE AI",
    subCategory: "COMPUTER VISION",
    date:        "2026",
    summary:     "End-to-end aerial tracking system engineered and deployed on the NVIDIA Jetson Orin Nano. Conducted surgical weight pruning down to a 26.62M vision-only core, 6→3 channel folding, Conv-BN fusion, and TensorRT FP16 compilation.",
    detail:      "Achieved 83.7 public leaderboard AUC at 114 sustained FPS under real UAV flight telemetry, winning 1st Place out of 65+ national engineering teams in the MTC-AIC4 competition.",
    media: {
      type:      "video",
      src:       "assets/videos/sot-tracking-demo.mp4",
      thumb:     "assets/images/sot-results.jpg"
    },
    github:      "https://github.com/marina317",
    paper:       "",
    tags:        ["PyTorch", "TensorRT", "ONNX", "Jetson Orin Nano", "FP16", "Fast-iTPN", "Docker"]
  },

  // 2. SCENE DESCRIPTION FOR VISUALLY IMPAIRED
  {
    id:          "scene-description",
    num:         "2",
    title:       "Real-Time Scene Description for the Visually Impaired",
    badge:       "GRADUATION PROJECT · 2026",
    category:    "MULTIMODAL AI",
    subCategory: "FOUNDATION MODELS",
    date:        "2026",
    summary:     "Fine-tuned the Qwen2-VL vision-language model using parameter-efficient fine-tuning (LoRA) across multi-domain assistive datasets for continuous live camera captioning and hazard awareness.",
    detail:      "Engineered full inference latency optimization via FP16 precision, SDPA attention kernel fusion, static patch grid alignment, and KV caching — cutting end-to-end response latency by 53% for real-time edge performance.",
    media: {
      type:      "image",
      src:       "assets/images/sot-core-model.jpg"
    },
    github:      "https://github.com/marina317",
    paper:       "",
    tags:        ["Qwen2-VL", "LoRA", "PEFT", "PyTorch", "Hugging Face", "SDPA", "KV Caching"]
  },

  // 3. DIABETIC RETINOPATHY
  {
    id:          "diabetic-retinopathy",
    num:         "3",
    title:       "Diabetic Retinopathy Clinical Grading Pipeline",
    badge:       "HEALTHCARE AI · 2025",
    category:    "MEDICAL AI",
    subCategory: "CLINICAL ML",
    date:        "2025",
    summary:     "End-to-end multi-class fundus classification pipeline engineered for high-stakes clinical diagnosis and micro-lesion detection across diverse retinal image distributions.",
    detail:      "Combines green-channel handcrafted feature extraction (GLCM texture + micro-aneurysm statistics) with cost-sensitive learning to counter severe diagnostic class imbalance. Packaged as a reproducible modular CLI with Docker.",
    media: {
      type:      "image",
      src:       "assets/images/sot-requirements.jpg"
    },
    github:      "https://github.com/marina317",
    paper:       "",
    tags:        ["Scikit-learn", "OpenCV", "GLCM", "Cost-Sensitive ML", "Docker", "CLI"]
  },

  // 4. AERIAL SEMANTIC SEGMENTATION
  {
    id:          "aerial-segmentation",
    num:         "4",
    title:       "Aerial Semantic Segmentation · ISPRS Vaihingen",
    badge:       "REMOTE SENSING · 2025",
    category:    "COMPUTER VISION",
    subCategory: "AERIAL IMAGERY",
    date:        "2025",
    summary:     "Fine-tuned U-Net architecture for high-resolution multi-class land cover segmentation on the ISPRS Vaihingen remote sensing benchmark.",
    detail:      "Formulated a custom loss function with masked background handling and balanced cross-entropy to handle sparse ground-truth annotations and extreme spatial class skew.",
    media: {
      type:      "image",
      src:       "assets/images/sot-evaluation.jpg"
    },
    github:      "https://github.com/marina317",
    paper:       "",
    tags:        ["PyTorch", "U-Net", "Custom Loss", "Aerial Imagery", "IoU"]
  }
];

// ── Filtered Experience List (Without Competition) ──
const EXPERIENCES = [
  {
    period: "Jan 2026 – Present",
    role:   "Co-Founder & VP of Research Operations",
    org:    "Faculty Research Community · Menoufia University",
    desc:   "Co-founded the first student-run research community at the Faculty of Electronic Engineering, overseeing 30+ active members. Organizes weekly research methodology webinars and leads academic paper-reading sessions on transformer architectures, attention mechanisms, and deep learning theory."
  },
  {
    period: "Jul – Aug 2023",
    role:   "AI & Deep Learning Trainee",
    org:    "National Telecommunication Institute (NTI)",
    desc:   "Completed intensive training in computer vision, deep learning, PyTorch, and machine learning pipelines."
  }
];

// ── Symmetrical 2x2 Highlights (Honors & Academic Leadership) ──
const HIGHLIGHTS = [
  {
    num:   "01",
    title: "1st Place Winner — MTC-AIC4",
    badge: "National Champion",
    desc:  "Single Object Tracking on Edge Devices. Placed 1st out of 65+ teams with 83.7 public leaderboard AUC on target hardware."
  },
  {
    num:   "02",
    title: "5th Place Finalist — MTC-AIC3",
    badge: "Top 5 Nationally",
    desc:  "Brain-Computer Interface Classification. Built statistical signal extraction (CCA, TRCA, FFT) placing 5th out of 200+ national teams."
  },
  {
    num:   "03",
    title: "Co-Founded Research Community",
    badge: "Academic Leadership",
    desc:  "Co-founded the first official academic research community at the Faculty of Electronic Engineering, mentoring 30+ students in AI research."
  },
  {
    num:   "04",
    title: "Accepted Publication · MURC 2026",
    badge: "Research Track Record",
    desc:  "Co-authored research auditing deployment stability in embedded transformers, demonstrating closed-loop divergence under precision shifts."
  }
];
