-- ============================================================
-- MARINA MOHSEN — PORTFOLIO SUPABASE SCHEMA & INITIAL SEED
-- Run this entire script in Supabase Dashboard -> SQL Editor -> Run
-- ============================================================

-- 1. SITE CONTENT (Profile, Publication, Skills)
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  display_order INT NOT NULL DEFAULT 1,
  num TEXT NOT NULL DEFAULT '1',
  title TEXT NOT NULL,
  badge TEXT DEFAULT '',
  category TEXT DEFAULT 'AI & DEEP LEARNING',
  sub_category TEXT DEFAULT '',
  date TEXT DEFAULT '2026',
  summary TEXT NOT NULL,
  detail TEXT DEFAULT '',
  media_type TEXT NOT NULL DEFAULT 'image', -- 'video' or 'image'
  media_src TEXT NOT NULL,
  media_thumb TEXT DEFAULT '',
  github TEXT DEFAULT '',
  paper TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  description TEXT DEFAULT '',
  metrics JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_order INT NOT NULL DEFAULT 1,
  period TEXT NOT NULL,
  role TEXT NOT NULL,
  org TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. HIGHLIGHTS & HONORS TABLE
CREATE TABLE IF NOT EXISTS public.highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_order INT NOT NULL DEFAULT 1,
  num TEXT NOT NULL DEFAULT '01',
  title TEXT NOT NULL,
  badge TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ENABLE ROW LEVEL SECURITY (RLS) FOR SAFE DEPLOYMENT
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;

-- 6. RLS POLICIES: PUBLIC CAN READ EVERYTHING
DROP POLICY IF EXISTS "Public can view site_content" ON public.site_content;
CREATE POLICY "Public can view site_content" ON public.site_content FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view experiences" ON public.experiences;
CREATE POLICY "Public can view experiences" ON public.experiences FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view highlights" ON public.highlights;
CREATE POLICY "Public can view highlights" ON public.highlights FOR SELECT USING (true);

-- 7. RLS POLICIES: AUTHENTICATED ADMIN CAN DO ALL (INSERT, UPDATE, DELETE)
DROP POLICY IF EXISTS "Admin can manage site_content" ON public.site_content;
CREATE POLICY "Admin can manage site_content" ON public.site_content FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can manage projects" ON public.projects;
CREATE POLICY "Admin can manage projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can manage experiences" ON public.experiences;
CREATE POLICY "Admin can manage experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can manage highlights" ON public.highlights;
CREATE POLICY "Admin can manage highlights" ON public.highlights FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 8. STORAGE BUCKET FOR MEDIA UPLOADS
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view portfolio media" ON storage.objects;
CREATE POLICY "Public can view portfolio media" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Authenticated can upload portfolio media" ON storage.objects;
CREATE POLICY "Authenticated can upload portfolio media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Authenticated can update portfolio media" ON storage.objects;
CREATE POLICY "Authenticated can update portfolio media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Authenticated can delete portfolio media" ON storage.objects;
CREATE POLICY "Authenticated can delete portfolio media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-media');


-- ============================================================
-- SEED INITIAL DATA
-- ============================================================

-- Profile
INSERT INTO public.site_content (id, data) VALUES
('profile', '{
  "name": "Marina Mohsen",
  "title": "AI Engineer",
  "location": "Cairo, Egypt",
  "tagline": "AI Engineer · Cairo, Egypt ⇄ Remote Worldwide",
  "bio": "I build, fine-tune, and deploy machine learning architectures end-to-end — from parameter-efficient foundation model adaptation to mathematical kernel surgery and low-latency inference on edge hardware.",
  "availability": "Available for AI Engineering & Research",
  "email": "marinamohsen70@gmail.com",
  "github": "https://github.com/marina317",
  "whatsapp": "https://wa.me/201289477114",
  "phone": "+20 1289477114",
  "linkedin": "https://linkedin.com/in/YOUR_LINKEDIN",
  "cv": "assets/cv.pdf"
}'::jsonb)
ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;

-- Publication
INSERT INTO public.site_content (id, data) VALUES
('publication', '{
  "tag": "✓ Accepted Research Publication · Forthcoming 2026",
  "title": "\"Per-Frame Equivalence Is Not Closed-Loop Equivalence: Auditing the Embedded Deployment of an Aerial Object Tracker\"",
  "authors": "Mahmoud E. Ibrahim*, Marina Mohsen* (Co-Author) · Menoufia University & MURC",
  "finding": "Proved that standard per-frame tolerance testing (ε < 9.2×10⁻⁵) fails in sequential vision pipelines. When an FP16 TensorRT engine reverted to FP32, micro-rounding perturbations induced argmax peak-flips that caused a −2.81 AUC closed-loop trajectory divergence.",
  "is_active": true
}'::jsonb)
ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;

-- Skills
INSERT INTO public.site_content (id, data) VALUES
('skills', '[
  {
    "category": "LANGUAGES & CORE",
    "skills": ["Python", "SQL", "Bash", "Git / GitHub"]
  },
  {
    "category": "DEEP LEARNING & TRANSFORMERS",
    "skills": ["PyTorch", "Hugging Face", "LoRA / PEFT", "Attention Mechanisms", "Fine-Tuning"]
  },
  {
    "category": "COMPUTER VISION",
    "skills": ["OpenCV", "Single Object Tracking", "Semantic Segmentation", "Scikit-image"]
  },
  {
    "category": "EDGE ACCELERATION & OPTIMIZATION",
    "skills": ["TensorRT", "ONNX", "Conv-BN Fusion", "Stem Surgery", "FP16 Inference", "SDPA Attention", "KV Caching", "torch.compile"]
  },
  {
    "category": "DEPLOYMENT & SCIENTIFIC ARRAYS",
    "skills": ["Docker", "NumPy", "Pandas", "Scikit-learn", "NVIDIA Jetson Orin Nano", "Modular CLI Design"]
  },
  {
    "category": "RESEARCH & ACADEMIC INITIATIVE",
    "skills": ["Co-Founder Student Research Community", "Deployment Auditing", "Closed-Loop Verification", "Technical Writing"]
  }
]'::jsonb)
ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;

-- Initial Projects
INSERT INTO public.projects (id, display_order, num, title, badge, category, sub_category, date, summary, detail, media_type, media_src, media_thumb, github, tags)
VALUES
(
  'sot-tracking',
  1,
  '1',
  'Single Object Tracking on Edge Devices',
  '🥇 1ST PLACE · MTC-AIC4',
  'EDGE AI',
  'COMPUTER VISION',
  '2026',
  'End-to-end aerial tracking system engineered and deployed on the NVIDIA Jetson Orin Nano. Conducted surgical weight pruning down to a 26.62M vision-only core, 6→3 channel folding, Conv-BN fusion, and TensorRT FP16 compilation.',
  'Achieved 83.7 public leaderboard AUC at 114 sustained FPS under real UAV flight telemetry, winning 1st Place out of 65+ national engineering teams in the MTC-AIC4 competition.',
  'video',
  'assets/videos/sot-tracking-demo.mp4',
  'assets/images/sot-results.jpg',
  'https://github.com/marina317',
  ARRAY['PyTorch', 'TensorRT', 'ONNX', 'Jetson Orin Nano', 'FP16', 'Fast-iTPN', 'Docker']
),
(
  'scene-description',
  2,
  '2',
  'Real-Time Scene Description for the Visually Impaired',
  'GRADUATION PROJECT · 2026',
  'MULTIMODAL AI',
  'FOUNDATION MODELS',
  '2026',
  'Fine-tuned the Qwen2-VL vision-language model using parameter-efficient fine-tuning (LoRA) across multi-domain assistive datasets for continuous live camera captioning and hazard awareness.',
  'Engineered full inference latency optimization via FP16 precision, SDPA attention kernel fusion, static patch grid alignment, and KV caching — cutting end-to-end response latency by 53% for real-time edge performance.',
  'image',
  'assets/images/sot-core-model.jpg',
  '',
  'https://github.com/marina317',
  ARRAY['Qwen2-VL', 'LoRA', 'PEFT', 'PyTorch', 'Hugging Face', 'SDPA', 'KV Caching']
),
(
  'diabetic-retinopathy',
  3,
  '3',
  'Diabetic Retinopathy Clinical Grading Pipeline',
  'HEALTHCARE AI · 2025',
  'MEDICAL AI',
  'CLINICAL ML',
  '2025',
  'End-to-end multi-class fundus classification pipeline engineered for high-stakes clinical diagnosis and micro-lesion detection across diverse retinal image distributions.',
  'Combines green-channel handcrafted feature extraction (GLCM texture + micro-aneurysm statistics) with cost-sensitive learning to counter severe diagnostic class imbalance. Packaged as a reproducible modular CLI with Docker.',
  'image',
  'assets/images/sot-requirements.jpg',
  '',
  'https://github.com/marina317',
  ARRAY['Scikit-learn', 'OpenCV', 'GLCM', 'Cost-Sensitive ML', 'Docker', 'CLI']
),
(
  'aerial-segmentation',
  4,
  '4',
  'Aerial Semantic Segmentation · ISPRS Vaihingen',
  'REMOTE SENSING · 2025',
  'COMPUTER VISION',
  'AERIAL IMAGERY',
  '2025',
  'Fine-tuned U-Net architecture for high-resolution multi-class land cover segmentation on the ISPRS Vaihingen remote sensing benchmark.',
  'Formulated a custom loss function with masked background handling and balanced cross-entropy to handle sparse ground-truth annotations and extreme spatial class skew.',
  'image',
  'assets/images/sot-evaluation.jpg',
  '',
  'https://github.com/marina317',
  ARRAY['PyTorch', 'U-Net', 'Custom Loss', 'Aerial Imagery', 'IoU']
)
ON CONFLICT (id) DO NOTHING;

-- Initial Experiences
DELETE FROM public.experiences;
INSERT INTO public.experiences (display_order, period, role, org, description)
VALUES
(
  1,
  'Jan 2026 – Present',
  'Co-Founder & VP of Research Operations',
  'Faculty Research Community · Menoufia University',
  'Co-founded the first student-run research community at the Faculty of Electronic Engineering, overseeing 30+ active members. Organizes weekly research methodology webinars and leads academic paper-reading sessions on transformer architectures, attention mechanisms, and deep learning theory.'
),
(
  2,
  'Jul – Aug 2023',
  'AI & Deep Learning Trainee',
  'National Telecommunication Institute (NTI)',
  'Completed intensive training in computer vision, deep learning, PyTorch, and machine learning pipelines.'
);

-- Initial Highlights
DELETE FROM public.highlights;
INSERT INTO public.highlights (display_order, num, title, badge, description)
VALUES
(
  1,
  '01',
  '1st Place Winner — MTC-AIC4',
  'National Champion',
  'Single Object Tracking on Edge Devices. Placed 1st out of 65+ teams with 83.7 public leaderboard AUC on target hardware.'
),
(
  2,
  '02',
  '5th Place Finalist — MTC-AIC3',
  'Top 5 Nationally',
  'Brain-Computer Interface Classification. Built statistical signal extraction (CCA, TRCA, FFT) placing 5th out of 200+ national teams.'
),
(
  3,
  '03',
  'Co-Founded Research Community',
  'Academic Leadership',
  'Co-founded the first official academic research community at the Faculty of Electronic Engineering, mentoring 30+ students in AI research.'
),
(
  4,
  '04',
  'Accepted Publication · MURC 2026',
  'Research Track Record',
  'Co-authored research auditing deployment stability in embedded transformers, demonstrating closed-loop divergence under precision shifts.'
);
