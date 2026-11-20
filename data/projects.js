// ============================================================
//  MARINA MOHSEN — PORTFOLIO DATA
// ============================================================

const PROJECTS = [

  // ── PROJECT 1: SINGLE OBJECT TRACKING (MTC-AIC4) ────────────
  {
    id:        "sot-tracking",
    title:     "Single Object Tracking on Edge Devices",
    subtitle:  "MTC-AIC4 National AI Competition · 1st Place Winner",
    badge:     "🥇 1st Place · 65+ Teams",
    category:  "Computer Vision · Edge AI",
    date:      "Feb – Jul 2026",
    highlight: true,
    order:     1,

    // Media: uses our high-res clean graphic
    media: {
      type:  "image",
      src:   "assets/images/sot-results.jpg",
      thumb: "assets/images/sot-results.jpg",
      alt:   "MTC-AIC4 Single Object Tracking Leaderboard Dominance (83.7 LB score, 5.44ms latency, 114 FPS)"
    },

    github:      "https://github.com/YOUR_GITHUB/mtcaic4",
    paper:       "",
    certificate: "",
    demo:        "",

    summary: "End-to-end edge tracking pipeline on NVIDIA Jetson Orin Nano / T4. Sliced multi-modal stem to 3-channel RGB, fused Conv-BN heads, and exported an auto-tuned TensorRT FP16 engine — 83.7 Leaderboard AUC at 114 FPS.",

    tags: ["PyTorch", "TensorRT", "ONNX", "NVIDIA Jetson", "Tesla T4", "Docker", "FP16", "Conv-BN Fusion", "Fast-iTPN", "UETrack"],

    metrics: [
      { value: "83.7",   label: "Public Leaderboard AUC" },
      { value: "5.44ms", label: "End-to-End Latency" },
      { value: "114",    label: "Sustained FPS" },
      { value: "1st",    label: "Place (65+ Teams)" }
    ],

    pipeline: `flowchart LR
      A["Dataset Synergy\\n(UAV123, DTB70, VisDrone)"] --> B["Pretrained\\nFast-iTPN Backbone"]
      B --> C["Surgical Optimization\\nPrune Lang/Aux Heads"]
      C --> D["Stem Slicing\\n(6ch to 3ch)"]
      D --> E["Conv-BN\\nLayer Fusion"]
      E --> F["TensorRT FP16\\nCompilation"]
      F --> G["Edge Deployment\\n5.44 ms · 114 FPS"]
      style A fill:#ede9e3,stroke:#c06940
      style G fill:#ede9e3,stroke:#c06940`,

    description: `
<div style="margin-bottom: 32px;">
  <img src="assets/images/sot-pipeline.jpg" alt="End-to-End Technical Methodology Pipeline" style="width:100%; border-radius:12px; border:1px solid var(--border-light); margin-bottom:12px;" />
  <p style="font-size:0.8rem; color:var(--text-3); text-align:center;">Figure 1: Full end-to-end system methodology from multi-dataset supervision to surgical optimization and edge deployment.</p>
</div>

<h3>1. Problem Framing & Design Requirements</h3>
<p>In aerial single-object tracking (UAVs/drones), the tracker faces severe domain-specific hurdles that general computer vision models struggle with. Before building the pipeline, we conducted an empirical evidence analysis across target datasets to formulate four core design requirements:</p>

<div style="margin: 24px 0;">
  <img src="assets/images/sot-requirements.jpg" alt="Design Requirements from Evidence" style="width:100%; border-radius:12px; border:1px solid var(--border-light); margin-bottom:12px;" />
  <p style="font-size:0.8rem; color:var(--text-3); text-align:center;">Figure 2: Empirical dataset evidence directly guiding our architecture choices.</p>
</div>

<ul>
  <li><strong>Small Target Representation:</strong> 65% of tracked targets occupied &lt;0.5% of the frame. We selected a foundation-pretrained pyramid backbone (Fast-iTPN) with strong high-resolution feature maps for small objects.</li>
  <li><strong>Variable Frame Rates (24–96 FPS):</strong> Frame rate shifts across different UAV sensors break motion-velocity assumptions. We implemented FPS-agnostic, appearance-driven tracking with static templates over motion priors.</li>
  <li><strong>Short-Term Protocol:</strong> Targets were absent in only 2.0% of frames. We eliminated heavy re-detection modules to preserve 100% of the compute budget for real-time tracking speed.</li>
  <li><strong>Crowded Scenes & Distractors:</strong> Distractor objects with near-identical appearance required deep discriminative embeddings trained under domain-specific multi-task supervision.</li>
</ul>

<h3>2. Architecture Modification: Stripping to a Vision-Only Core</h3>
<p>The base architecture was a multi-modal transformer designed for both visual tracking and language-prompted tracking. For an autonomous drone tracking pipeline, language and multi-modal alignment modules are completely redundant at runtime:</p>

<div style="margin: 24px 0;">
  <img src="assets/images/sot-pruning.jpg" alt="Model Pruning Diagram" style="width:100%; border-radius:12px; border:1px solid var(--border-light); margin-bottom:12px;" />
  <p style="font-size:0.8rem; color:var(--text-3); text-align:center;">Figure 3: Surgical detachment of frozen CLIP text encoders, auxiliary mask decoders, and cross-attention fusion heads.</p>
</div>

<p>We surgically detached the frozen CLIP text encoder, language tokenizer, text adapter, and auxiliary segmentation/depth decoders. This reduced the active tracking graph to an ultra-efficient <strong>26.62M parameter vision-only core</strong> without altering the underlying tracking representation.</p>

<h3>3. Lossless Hardware Optimization: Channel Surgery & Conv-BN Fusion</h3>
<p>To maximize execution efficiency on NVIDIA edge hardware (Jetson Orin Nano / T4 GPU), we applied two mathematical graph optimizations prior to engine compilation:</p>

<div style="margin: 24px 0;">
  <img src="assets/images/sot-channel-fusion.jpg" alt="Channel Folding and Conv-BN Fusion Diagram" style="width:100%; border-radius:12px; border:1px solid var(--border-light); margin-bottom:12px;" />
  <p style="font-size:0.8rem; color:var(--text-3); text-align:center;">Figure 4: Lossless 6→3 channel folding and mathematical Conv-BN layer fusion.</p>
</div>

<ul>
  <li><strong>Stem Channel Slicing (6ch → 3ch):</strong> The original stem convolution expected a 6-channel input. Slicing the weight tensor along the input dimension (<code>W[:, :3, :, :]</code>) eliminated zero-multiplications and halved input memory traffic across the GPU memory bus with bit-exact numerical forward equivalence.</li>
  <li><strong>Conv-BN Layer Fusion:</strong> In the prediction head, BatchNorm parameters were algebraically folded directly into the preceding Conv weights and biases:
    <pre>W' = (γ / √(σ² + ε)) · W
b' = (γ · (b − μ) / √(σ² + ε)) + β</pre>
    This eliminated separate batch-norm kernel launches and intermediate VRAM memory roundtrips.
  </li>
  <li><strong>TensorRT Compilation:</strong> Exported the fused graph to ONNX (opset 18) and compiled an auto-tuned TensorRT FP16 engine using <code>trtexec</code>.</li>
</ul>

<h3>4. Evaluation Results & Leaderboard Dominance</h3>
<p>We validated the tracker against completely unseen test benchmarks (WebUAV-3M) and the official competition validation split. On the final <strong>Kaggle Public Leaderboard</strong> (89 unseen sequences, 74,293 frames), our optimized model achieved an <strong>83.7 AUC score — securing 1st Place overall</strong> while sustaining an end-to-end latency of <strong>5.44 ms (114 FPS)</strong>.</p>

<div style="margin: 24px 0;">
  <img src="assets/images/sot-evaluation.jpg" alt="Evaluation Setup and Unseen Test Results" style="width:100%; border-radius:12px; border:1px solid var(--border-light); margin-bottom:12px;" />
  <p style="font-size:0.8rem; color:var(--text-3); text-align:center;">Figure 5: Evaluation methodology on unseen WebUAV-3M dataset and official splits.</p>
</div>

<h3>5. Research Finding: Auditing the Deployment Pipeline</h3>
<p>Beyond the competition win, our deployment audit uncovered a critical phenomenon in embedded tracking: while per-frame outputs passed standard numerical equivalence tests (ε &lt; 9.2×10⁻⁵), subtle precision rounding differences between PyTorch FP32 and TensorRT engines caused argmax peak-flips on challenging frames, compounding into a −2.81 AUC closed-loop trajectory divergence. This research formed the basis of our accepted publication for MURC 2026.</p>
    `
  },

  // ── PROJECT 2: SCENE DESCRIPTION (GRADUATION PROJECT) ───────
  {
    id:        "scene-description",
    title:     "Real-Time Scene Description for the Visually Impaired",
    subtitle:  "Graduation Project · Faculty of Electronic Engineering",
    badge:     "Graduation Project",
    category:  "Generative AI · Accessibility",
    date:      "2026",
    highlight: true,
    order:     2,

    media: {
      type:  "placeholder",
      src:   "assets/videos/scene-demo.mp4",
      thumb: "assets/images/scene-thumb.jpg",
      alt:   "Real-time assistive scene description system"
    },

    github:      "https://github.com/YOUR_GITHUB/scene-description",
    paper:       "",
    certificate: "",
    demo:        "",

    summary: "Fine-tuned Qwen2-VL (multimodal foundation model) with LoRA/PEFT and cut inference latency by 53% through four targeted optimizations. Packaged for real-time live camera stream processing.",

    tags: ["Qwen2-VL", "LoRA", "PEFT", "PyTorch", "Hugging Face", "FP16", "SDPA", "KV Caching", "torch.compile"],

    metrics: [
      { value: "53%",    label: "Latency Reduction" },
      { value: "1130ms", label: "Before Optimization" },
      { value: "537ms",  label: "After Optimization" },
      { value: "T4",     label: "GPU Target" }
    ],

    pipeline: `flowchart LR
      A["Camera Frame\\n(Live Stream)"] --> B["Qwen2-VL\\nFine-tuned\\n(LoRA / PEFT)"]
      B --> C["Optimization\\nStack"]
      C --> D["Scene Description\\n(Real-Time Text)"]
      
      subgraph OPT["Inference Optimization Stack"]
        C1["FP16\\nPrecision"] --> C2["SDPA\\nKernel Fusion"]
        C2 --> C3["Static 364×364\\nResolution"]
        C3 --> C4["KV Caching +\\nGreedy Decoding"]
      end
      style A fill:#ede9e3,stroke:#c06940
      style D fill:#ede9e3,stroke:#c06940`,

    description: `
<h3>Overview</h3>
<p>This graduation project builds a real-time assistive tool that describes visual scenes for the visually impaired. Using a camera stream, the system generates natural language descriptions of the environment, objects, and scene context.</p>

<h3>Foundation Model Adaptation</h3>
<p>The base model is <strong>Qwen2-VL</strong>, a large vision-language model. We fine-tuned it using <strong>LoRA (Low-Rank Adaptation)</strong> via the Hugging Face PEFT library — injecting lightweight adapter matrices into the transformer attention layers. This allowed domain adaptation without updating the full model's billions of parameters.</p>

<h3>The 4 Optimization Techniques</h3>
<p><strong>1. FP16 Precision + SDPA Kernel Fusion:</strong> Switched all attention computation to half-precision floating point. PyTorch's Scaled Dot-Product Attention (SDPA) fuses the Q·K matmul, softmax, and attention·V matmul into a single memory-efficient CUDA kernel, eliminating intermediate memory writes.</p>
<p><strong>2. Static Input Resolution (364×364):</strong> ViT patch boundaries divide 364px into exactly 26 patches of 14px with zero padding — aligning the input to the patch grid eliminates dynamic shape handling overhead at every forward pass.</p>
<p><strong>3. Selective torch.compile:</strong> Applied torch.compile only on the vision encoder. Compiled the visual pathway to optimized Triton kernels while leaving the text decoder uncompiled to avoid startup latency.</p>
<p><strong>4. KV Caching + Greedy Decoding:</strong> Cached key-value tensors from the attention mechanism during autoregressive text generation so each new token only processes its own query, not recomputing all previous context.</p>

<h3>Results</h3>
<p>Combined, these four techniques reduced end-to-end inference latency from <strong>1130ms to 537ms</strong> (53% reduction) on a T4 GPU. The system runs at a cadence suitable for real-time assistive audio feedback.</p>
    `
  },

  // ── PROJECT 3: DIABETIC RETINOPATHY ─────────────────────────
  {
    id:        "diabetic-retinopathy",
    title:     "Diabetic Retinopathy Grading Pipeline",
    subtitle:  "Medical Image Classification · Personal Project",
    badge:     "Medical AI",
    category:  "Medical AI · Classical ML",
    date:      "2025",
    highlight: true,
    order:     3,

    media: {
      type:  "placeholder",
      src:   "assets/videos/dr-demo.mp4",
      thumb: "assets/images/dr-thumb.jpg",
      alt:   "Diabetic retinopathy fundus classification pipeline"
    },

    github:      "https://github.com/YOUR_GITHUB/dr-grading",
    paper:       "",
    certificate: "",
    demo:        "",

    summary: "End-to-end medical image classification pipeline for DR severity grading. Combines handcrafted feature engineering with cost-sensitive learning to handle the clinical class imbalance where severe cases are rare but critical to detect.",

    tags: ["Scikit-learn", "OpenCV", "NumPy", "Pandas", "GLCM", "Cost-Sensitive Learning", "Docker", "CLI"],

    metrics: [
      { value: "5",    label: "Severity Classes (0–4)" },
      { value: "GLCM", label: "Texture Features" },
      { value: "F1",   label: "Macro Evaluation" }
    ],

    pipeline: `flowchart LR
      A["Fundus Image"] --> B["Green Channel\\nExtraction"]
      B --> C["Feature Engineering\\n(GLCM Texture +\\nIntensity Stats)"]
      C --> D["Cost-Sensitive\\nRandom Forest"]
      D --> E["DR Severity Grade\\n(0 = None → 4 = PDR)"]
      style A fill:#ede9e3,stroke:#c06940
      style E fill:#ede9e3,stroke:#c06940`,

    description: `
<h3>Clinical Context</h3>
<p>Diabetic Retinopathy (DR) is a leading cause of blindness in diabetic patients. Screening fundus photographs and grading severity (0 = No DR, 1 = Mild, 2 = Moderate, 3 = Severe, 4 = Proliferative DR) is a time-intensive task for ophthalmologists. Automating it enables faster, broader screening.</p>

<h3>The Class Imbalance Challenge</h3>
<p>In any real screening dataset, severe cases (grades 3–4) are rare — but are the most critical to detect. Standard ML trained on imbalanced data will maximize overall accuracy by predicting the majority class (Grade 0) most of the time, missing severe cases. This is clinically dangerous.</p>
<p>We used <strong>cost-sensitive learning</strong> — assigning higher misclassification costs to severe grades — so the model is explicitly penalized more for missing a Proliferative DR case than for misclassifying a healthy fundus.</p>

<h3>Feature Engineering</h3>
<p>Rather than training a CNN end-to-end, we extracted interpretable handcrafted features:</p>
<ul>
  <li><strong>Green channel extraction:</strong> Retinal vessels and lesions are most visible in the green channel.</li>
  <li><strong>GLCM texture features:</strong> Gray-Level Co-occurrence Matrix captures lesion texture patterns.</li>
  <li><strong>Intensity statistics:</strong> Mean, variance, and histogram features per region.</li>
</ul>

<h3>Engineering Quality</h3>
<p>Built as a modular CLI application (main.py) with strict separation of preprocessing, training, and evaluation. Used leak-free StandardScaler pipelines, automated evaluation reporting (Confusion Matrix, Macro F1), and a fully Dockerized environment for reproducibility.</p>
    `
  },

  // ── PROJECT 4: AERIAL SEGMENTATION ──────────────────────────
  {
    id:        "aerial-segmentation",
    title:     "Aerial Semantic Segmentation · ISPRS Vaihingen",
    subtitle:  "Remote Sensing · Sparse Annotation · Personal Project",
    badge:     "Remote Sensing",
    category:  "Computer Vision · Geospatial",
    date:      "2025",
    highlight: false,
    order:     4,

    media: {
      type:  "placeholder",
      src:   "assets/videos/segmentation-demo.mp4",
      thumb: "assets/images/segmentation-thumb.jpg",
      alt:   "Aerial land cover segmentation on ISPRS Vaihingen dataset"
    },

    github:      "https://github.com/YOUR_GITHUB/vaihingen-segmentation",
    paper:       "",
    certificate: "",
    demo:        "",

    summary: "Fine-tuned U-Net for multi-class land cover segmentation on the ISPRS Vaihingen aerial benchmark under sparse annotations. Designed a custom loss function for spatial class imbalance and evaluated spatial accuracy against dense ground truth.",

    tags: ["PyTorch", "U-Net", "Custom Loss", "Aerial Imagery", "ISPRS", "IoU", "Semantic Segmentation"],

    metrics: [
      { value: "IoU",    label: "Primary Metric" },
      { value: "Sparse", label: "Annotation Regime" },
      { value: "5",      label: "Land Cover Classes" }
    ],

    pipeline: `flowchart LR
      A["High-Res Aerial\\nRaster (ISPRS)"] --> B["Spatial Tiling\\n& Preprocessing"]
      B --> C["Sparse\\nAnnotations"]
      C --> D["U-Net\\n(Fine-tuned)"]
      D --> E["Land Cover\\nSegmentation Map"]
      style A fill:#ede9e3,stroke:#c06940
      style E fill:#ede9e3,stroke:#c06940`,

    description: `
<h3>Dataset: ISPRS Vaihingen</h3>
<p>The ISPRS Vaihingen benchmark is a high-resolution aerial image dataset for urban semantic segmentation. It covers a small German town and includes dense labels for 5 land cover classes: impervious surfaces, buildings, low vegetation, trees, and cars.</p>

<h3>The Sparse Annotation Challenge</h3>
<p>Standard training assumes densely labeled pixels across the entire image. In many real-world remote sensing scenarios, only a subset of pixels are annotated. We designed a <strong>custom loss function</strong> that only computes gradients on the labeled pixels, ignoring unlabeled regions during both forward and backward passes.</p>
    `
  },

  // ── PROJECT 5: 3D CELL TRACKING ─────────────────────────────
  {
    id:        "cell-tracking",
    title:     "3D Cell Tracking During Development",
    subtitle:  "Kaggle Competition · Ongoing",
    badge:     "Ongoing · Kaggle",
    category:  "Medical AI · 3D Vision",
    date:      "2026 – Ongoing",
    highlight: false,
    order:     5,

    media: {
      type:  "placeholder",
      src:   "assets/videos/cell-tracking-demo.mp4",
      thumb: "assets/images/cell-tracking-thumb.jpg",
      alt:   "3D cell tracking in zebrafish embryo fluorescence microscopy"
    },

    github:      "https://github.com/YOUR_GITHUB/cell-tracking",
    paper:       "",
    certificate: "",
    demo:        "",

    summary: "End-to-end spatiotemporal pipeline for 3D cell tracking in zebrafish embryo fluorescence microscopy. Processes Zarr-format volumetric data, generates pseudo-labels with Cellpose, fine-tunes a 3D U-Net, and links cells across 100 timesteps with an ILP graph tracker.",

    tags: ["PyTorch", "Zarr", "3D U-Net", "Cellpose", "Ultrack", "Docker", "NumPy", "Fluorescence Microscopy"],

    metrics: [
      { value: "100",  label: "Timesteps Tracked" },
      { value: "Zarr", label: "Data Format" },
      { value: "3D+T", label: "Volume Dimensions" }
    ],

    pipeline: `flowchart LR
      A["3D+Time Zarr\\nVolumes\\n(Anisotropic Voxels)"] --> B["Cellpose\\nTeacher Model\\n(Pseudo-labels)"]
      B --> C["3D U-Net\\nFine-tuning\\n(Foreground Maps)"]
      C --> D["ILP Graph\\nTracker (Ultrack)\\n(Division-Aware)"]
      D --> E["Cell Lineage\\nAcross 100 Timesteps"]
      style A fill:#ede9e3,stroke:#c06940
      style E fill:#ede9e3,stroke:#c06940`,

    description: `
<h3>Overview</h3>
<p>Cell tracking in 3D live-imaging microscopy is a core challenge in developmental biology. Automatically following hundreds of cells across time in zebrafish embryo data enables researchers to study cell division, migration, and tissue formation without manual annotation.</p>

<h3>Data Format: Zarr Volumes</h3>
<p>The raw data is stored in <strong>Zarr format</strong> — a chunked, compressed, N-dimensional array format designed for large scientific datasets. The volumes are 4-dimensional (Z, Y, X, Time) with anisotropic voxels.</p>
    `
  },

  // ── PROJECT 6: BCI ──────────────────────────────────────────
  {
    id:        "bci-classification",
    title:     "BCI — SSVEP & Motor Imagery Classification",
    subtitle:  "MTC-AIC3 National Competition",
    badge:     "🏅 5th Place · 200+ Teams",
    category:  "Signal Processing · ML",
    date:      "2025",
    highlight: false,
    order:     6,

    media: {
      type:  "placeholder",
      src:   "assets/videos/bci-demo.mp4",
      thumb: "assets/images/bci-thumb.jpg",
      alt:   "BCI EEG classification pipeline for SSVEP and Motor Imagery"
    },

    github:      "https://github.com/YOUR_GITHUB/bci-classification",
    paper:       "",
    certificate: "",
    demo:        "",

    summary: "Brain-Computer Interface pipeline implementing SSVEP and Motor Imagery EEG paradigms. Achieved 92% SSVEP accuracy and 85% Motor Imagery accuracy, placing 5th out of 200+ teams nationally.",

    tags: ["MNE-Python", "FFT", "CCA", "TRCA", "Scikit-learn", "EEG", "Signal Processing"],

    metrics: [
      { value: "92%", label: "SSVEP Accuracy" },
      { value: "85%", label: "Motor Imagery Accuracy" },
      { value: "5th", label: "Out of 200+ Teams" }
    ],

    pipeline: `flowchart LR
      A["EEG Signal\\n(Raw)"] --> B["Preprocessing\\n(MNE-Python)"]
      B --> C1["SSVEP Branch\\nFFT + CCA"]
      B --> C2["Motor Imagery\\nTRCA"]
      C1 --> D["Ensemble\\nClassifier"]
      C2 --> D
      D --> E["Intent Class\\n(SSVEP or MI)"]
      style A fill:#ede9e3,stroke:#c06940
      style E fill:#ede9e3,stroke:#c06940`,

    description: `
<h3>Overview</h3>
<p>Brain-Computer Interfaces (BCI) allow users to control devices using brain signals measured from electrodes on the scalp (EEG). MTC-AIC3 challenged teams to build BCI systems for two paradigms: SSVEP and Motor Imagery.</p>
    `
  }

];

// ── PUBLICATIONS ──────────────────────────────────────────────
const PUBLICATIONS = [
  {
    title:   "Per-Frame Equivalence Is Not Closed-Loop Equivalence: Auditing the Embedded Deployment of an Aerial Object Tracker",
    authors: ["Mahmoud E. Ibrahim*", "Marina Mohsen*"],
    venue:   "Menoufia University & MURC",
    year:    "2026",
    status:  "Accepted · Forthcoming",
    link:    "",
    finding: "Demonstrated that per-frame tolerance testing fails in sequential closed-loop systems. A TensorRT FP16 engine reverted to FP32 silently — outputs passed ε < 9.2×10⁻⁵ per-frame checks yet argmax peak-flip caused −2.81 AUC trajectory divergence."
  }
];

// ── AWARDS ────────────────────────────────────────────────────
const AWARDS = [
  {
    icon:  "🥇",
    title: "1st Place — MTC-AIC4 National AI Competition",
    desc:  "Single Object Tracking on Edge Devices · 65+ teams · 2026"
  },
  {
    icon:  "🏅",
    title: "5th Place — MTC-AIC3 National AI Competition",
    desc:  "Brain-Computer Interface Classification · 200+ teams · 2025"
  },
  {
    icon:  "🔬",
    title: "Co-Founder · First Faculty Research Community",
    desc:  "Faculty of Electronic Engineering, Menoufia University · 30+ members · Jan 2026 – Present"
  },
  {
    icon:  "📄",
    title: "Accepted Research Paper",
    desc:  "Neural network deployment auditing · MURC 2026 · Forthcoming"
  }
];

// ── PROFILE ───────────────────────────────────────────────────
const PROFILE = {
  name:        "Marina Mohsen",
  title:       "AI & Computer Vision Engineer",
  location:    "Cairo, Egypt",
  photo:       "assets/photo.jpg",
  bio:         "I build, fine-tune, and deploy machine learning systems end-to-end — from model surgery on transformer architectures to production inference pipelines on edge hardware. I care about systems that work reliably in the real world, not just on benchmarks.",
  cv:          "assets/cv.pdf",
  email:       "your@email.com",
  phone:       "+20 1289477114",
  linkedin:    "https://linkedin.com/in/YOUR_LINKEDIN",
  github:      "https://github.com/YOUR_GITHUB",
  whatsapp:    "https://wa.me/201289477114"
};


// Add SKILLS object to projects.js
const SKILLS_DATA = [
  {
    category: "LANGUAGES",
    skills: ["Python (Advanced)", "C++ (Basic / OOP)", "SQL", "Bash"]
  },
  {
    category: "DEEP LEARNING",
    skills: ["PyTorch", "Hugging Face", "LoRA / PEFT", "Transformers", "TensorFlow"]
  },
  {
    category: "COMPUTER VISION",
    skills: ["OpenCV", "Object Tracking", "Semantic Segmentation", "Object Detection", "Scikit-image"]
  },
  {
    category: "EDGE ACCELERATION",
    skills: ["TensorRT", "ONNX (opset 18)", "Conv-BN Fusion", "trtexec", "FP16 Inference", "SDPA Attention", "KV Caching", "torch.compile"]
  },
  {
    category: "HARDWARE & TARGETS",
    skills: ["NVIDIA Jetson Orin Nano", "Tesla T4", "GPU Profiling", "Latency Benchmarking"]
  },
  {
    category: "ENGINEERING & DEVOPS",
    skills: ["Docker", "Git / GitHub", "Linux", "Modular CLI Design", "Automated Testing"]
  },
  {
    category: "SCIENTIFIC & ARRAYS",
    skills: ["Zarr (N-D Volumes)", "NumPy", "Pandas", "Scikit-learn", "Remote Sensing Rasters"]
  },
  {
    category: "COMMUNITY & LEADERSHIP",
    skills: ["Co-Founder Research Org", "Technical Mentorship", "Paper Reading Sessions", "Academic Writing"]
  }
];
