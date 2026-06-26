// ============================================================
// Sokratix — static content + fallback defaults.
// Content-driven sections (projects, case studies, intro video)
// read from Supabase first and fall back to these defaults so the
// site renders fully even before the admin has added anything.
// ============================================================

export const PROFILE = {
  brand: "Sokratix",
  tagline: "Design begins with better questions.",
  name: "Danussh Aditya K",
  role: "UI/UX Designer",
  location: "Salem, India",
  behance: "https://www.behance.net/danusshadityak",
  linkedin: "https://www.linkedin.com/in/danussh-aditya-k-6284ab268/",
  email: "danusshadityak@gmail.com",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "UX Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
];

export const HERO_CHIPS = [
  "User Research",
  "Why?",
  "Wireframes",
  "Prototypes",
  "Design Systems",
  "Usability Testing",
  "Better Questions",
  "Better UX",
];

export const EXPERIENCE = [
  "UI/UX Designer at Procyon Technostructure Pvt. Ltd",
  "Designing healthcare dashboards and patient-focused products",
  "Working on Hekma healthcare web and mobile app",
  "Working on XATS applicant tracking and AI interview platform",
  "Creating real-time health metric visualizations",
  "Designing web and mobile user flows",
  "Improved candidate screening flow by 30%",
];

// ---- Current professional projects (Supabase fallback) ----
export const PROJECTS = [
  {
    id: "hekma",
    name: "Hekma",
    category: "Healthcare App",
    platform: "Web + Mobile",
    role: "UI/UX Designer",
    accent: "#7c5cff",
    behance_url: PROFILE.behance,
    description:
      "Hekma is a healthcare platform focused on patient experience, health dashboards, clinical study journeys, health metrics, medical records, appointment flows, and patient-centered digital care.",
    ux_focus: [
      "Patient-first dashboard experience",
      "Clinical study journey clarity",
      "Health metrics visualization",
      "Medical record accessibility",
      "Appointment and care workflow design",
      "Clean mobile and web experience",
    ],
    image_url: null,
  },
  {
    id: "xats",
    name: "XATS",
    category: "Applicant Tracking / AI Interview",
    platform: "Web + Mobile",
    role: "UI/UX Designer",
    accent: "#2f80ff",
    behance_url: PROFILE.behance,
    description:
      "XATS is an applicant tracking and AI interview platform designed to simplify candidate screening, interview scheduling, assessments, and recruitment workflows across web and mobile.",
    ux_focus: [
      "Candidate screening flow",
      "AI interview experience",
      "Resume and profile review",
      "Interview scheduling",
      "Recruiter dashboard",
      "Pipeline management",
      "Faster decision-making",
    ],
    image_url: null,
  },
];

// ---- Case studies (Supabase fallback) ----
export const CASE_STUDIES = [
  {
    id: "skill-tree",
    title: "Skill Tree",
    type: "UI Case Study",
    accent: "#33b651",
    behance_url: PROFILE.behance,
    description:
      "Skill Tree connects skilled professionals with clients, simplifying job posting, skill discovery, and collaboration across industries.",
    ux_focus:
      "Easy category discovery, search-first experience, clear service listing, trust-focused worker profiles.",
    tags: ["Marketplace", "Job Platform", "Skill Discovery", "Mobile App", "UI Design"],
    image_url: null,
  },
  {
    id: "kuppai-vandi",
    title: "Kuppai Vandi",
    type: "UX Case Study",
    accent: "#ff7a1a",
    behance_url: PROFILE.behance,
    description:
      "A waste management app that encourages users to segregate organic, plastic, and e-waste while earning rewards through responsible disposal.",
    ux_focus:
      "Behavior motivation, reward system, simple pickup booking, environmental awareness.",
    tags: ["Waste Management", "Sustainability", "Rewards", "Tracking", "UX Design"],
    image_url: null,
  },
  {
    id: "medimeet",
    title: "MediMeet",
    type: "UX Case Study",
    accent: "#2f80ff",
    behance_url: PROFILE.behance,
    description:
      "MediMeet simplifies healthcare access by helping users find doctors, book online or in-person consultations, access reports, and receive appointment reminders.",
    ux_focus:
      "Trust, accessibility, fast doctor discovery, appointment clarity, simple healthcare flow.",
    tags: ["Healthcare", "Appointment Booking", "Doctor Search", "Reports", "UX Design"],
    image_url: null,
  },
  {
    id: "fundnest",
    title: "FundNest",
    type: "UX Case Study",
    accent: "#37c0e6",
    behance_url: PROFILE.behance,
    description:
      "FundNest makes investing easier by helping users explore mutual funds, manage SIPs, track portfolios, and receive personalized recommendations.",
    ux_focus:
      "Financial clarity, beginner-friendly investing, confidence-building UI, personalized insights.",
    tags: ["Fintech", "Mutual Funds", "SIP", "Portfolio", "UX Design"],
    image_url: null,
  },
];

// ---- Skills ----
export const SKILL_GROUPS = [
  {
    title: "UX Skills",
    items: [
      ["User Research", "Understanding real users before designing."],
      ["Journey Mapping", "Visualizing the end-to-end experience."],
      ["Wireframing", "Low-fidelity structure before visuals."],
      ["Prototyping", "Clickable flows to validate ideas."],
      ["Usability Testing", "Watching real users to find friction."],
      ["A/B Testing", "Comparing options with evidence."],
      ["Problem Framing", "Defining the right problem first."],
      ["Information Architecture", "Structuring content for clarity."],
    ],
  },
  {
    title: "UI Skills",
    items: [
      ["Design Systems", "Reusable, scalable component libraries."],
      ["Responsive Design", "Fluid layouts across every screen."],
      ["Accessibility WCAG", "Usable interfaces for everyone."],
      ["Interaction Design", "Meaningful motion and feedback."],
      ["Visual Design", "Hierarchy, color, and typography."],
      ["Mobile UI", "Thumb-friendly mobile experiences."],
      ["Web UI", "Crisp, modern web interfaces."],
      ["Dashboard Design", "Dense data made readable."],
    ],
  },
  {
    title: "Tools",
    items: [
      ["Figma", "Primary design & prototyping tool."],
      ["Adobe XD", "Wireframing and UI design."],
      ["Photoshop", "Image editing and assets."],
      ["Illustrator", "Vector illustration and icons."],
      ["Miro", "Collaborative research mapping."],
      ["FigJam", "Workshops and ideation."],
      ["Framer", "High-fidelity interactive prototypes."],
      ["ProtoPie", "Advanced micro-interactions."],
    ],
  },
];

// ---- UX Process ----
export const UX_PROCESS = [
  {
    step: "Ask",
    question: "What are we really solving?",
    detail: "Understand business goals, user needs, product context, and constraints.",
  },
  {
    step: "Discover",
    detail: "User interviews, competitor analysis, stakeholder inputs, market understanding.",
  },
  {
    step: "Define",
    detail: "Problem statement, personas, user journey, pain points, success metrics.",
  },
  {
    step: "Ideate",
    detail: "User flows, information architecture, sketches, low-fidelity wireframes.",
  },
  {
    step: "Design",
    detail: "High-fidelity UI, design system, interaction patterns, responsive layouts.",
  },
  {
    step: "Test",
    detail: "Usability testing, accessibility check, feedback collection, design iteration.",
  },
  {
    step: "Deliver",
    detail: "Developer handoff, clickable prototype, design specs, component documentation.",
  },
];

// ---- UX Principles ----
export const UX_PRINCIPLES = [
  ["User-Centered Design", "Design decisions should be based on real user needs, not assumptions."],
  ["Accessibility First", "Interfaces should be readable, reachable, and usable for everyone."],
  ["Visual Hierarchy", "Users should know what matters first, second, and next."],
  ["Cognitive Load Reduction", "Complex workflows should feel simple and easy to complete."],
  ["Consistency", "Reusable patterns help users learn faster and reduce confusion."],
  ["Feedback & Error Prevention", "Good products guide users clearly and prevent avoidable mistakes."],
  ["Mobile-first Thinking", "Design should work beautifully on smaller screens before scaling up."],
  ["Scalable Design Systems", "Clean components make products easier to build, maintain, and grow."],
];

// ---- UX Thinking ----
export const UX_THINKING = [
  ["Research Driven", "I start by understanding users, pain points, business goals, and real-world context."],
  ["Question-led Design", "I ask better questions before creating solutions, so the design solves the right problem."],
  ["Clear Information Architecture", "I structure content and flows so users can reach their goal with less confusion."],
  ["Developer Friendly Handoff", "I create clean components, reusable design systems, and clear specs for development."],
];

// ---- Metrics ----
export const METRICS = [
  { value: 4, suffix: "+", label: "Case Studies" },
  { value: 2, suffix: "", label: "Current Professional Projects" },
  { value: 8, suffix: "+", label: "Design Tools" },
  { value: 30, suffix: "%", label: "Screening Flow Improved" },
  { value: null, text: "Web & Mobile", label: "Experience" },
  { value: null, text: "Healthcare · ATS", label: "Domains" },
];
