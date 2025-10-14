// Mock data for Rifat's Portfolio

export const personalInfo = {
  name: "Rifat Arman Chowdhury",
  title: "Technical Engineer & Data Analyst",
  tagline: "Web Development & SQA Hybrid | Shipping Quality Experiences",
  bio: "Web development and SQA hybrid with expertise in shipping Figma-based WordPress/React experiences, running UI/API/SQL testing, instrumenting analytics, and streamlining CMS processes to reduce defects and rework.",
  location: "Dhaka, Bangladesh",
  email: "rifatusho7@gmail.com",
  phone: "+88 01939 695 245",
  linkedin: "https://linkedin.com/in/rifat-arman-chowdhury-a2483935b",
  github: "https://github.com/RifatC2002",
  resumeUrl: "#"
};

export const skills = {
  design: ["Figma", "Photoshop", "Illustrator"],
  webDevelopment: ["HTML", "CSS", "React", "Node.js", "Express", "MongoDB", "Flask", "WordPress", "Framer", "MJML"],
  testing: ["Test Plans/Cases", "Boundary/Equivalence", "Postman", "Selenium", "PyTest", "GitHub Actions", "Jira", "TestRail"],
  programming: ["Python", "JavaScript", "SQL"],
  analytics: ["GA4", "Looker Studio", "Tableau", "Power BI", "Excel"],
  marketing: ["Meta Ads", "Google Ads", "Pixel", "Campaign Management"],
  automation: ["n8n", "Zapier", "GoHighLevel"],
  devTools: ["Git", "GitHub"]
};

export const experience = [
  {
    id: 1,
    title: "Technical Engineer and Data Analyst",
    company: "Obby (USA)",
    type: "Remote",
    duration: "Nov 2024 – Present",
    startDate: "2024-11",
    highlights: [
      "Built and launched 17 responsive landing pages and company website in WordPress and React with lead forms",
      "Increased CVR by 38% and achieved Lighthouse Accessibility score of 98+",
      "Executed 120+ test cases per release with zero critical escapees across 4 releases",
      "Deployed and optimized 10+ Meta and Google Ads campaigns",
      "Decreased CPA by 24% with 0 mismatched events in 14 integrity checks",
      "Reduced onboarding time from 6 hours to 2 hours using SOPs and dashboards"
    ]
  },
  {
    id: 2,
    title: "Instructor of English as Second Language",
    company: "Mentors Education",
    type: "Dhaka",
    duration: "Dec 2023 – Present",
    startDate: "2023-12",
    highlights: [
      "Delivered Spoken English and Grammar to 450+ students",
      "Designed 11 assessments with 4.85/5 average feedback score",
      "Maintained 96% completion rate",
      "Strengthened ability to communicate complex technical issues to non-technical audiences"
    ]
  }
];

export const education = {
  degree: "BSc in Computer Science",
  institution: "BRAC University",
  location: "Dhaka",
  duration: "Oct 2021 – Sep 2025",
  coursework: [
    "Data Structures & Algorithms",
    "Software Engineering",
    "System Design",
    "Database Management",
    "Neural Networks",
    "Artificial Intelligence"
  ]
};

export const projects = [
  {
    id: 1,
    title: "Fabric Defect Detection System",
    category: "Machine Learning",
    description: "YOLOv8-style CNN with reproducible pipeline for automated fabric quality control. Implemented comprehensive EDA, augmentation, and ablation studies.",
    technologies: ["Python", "PyTorch", "YOLOv8", "Computer Vision"],
    highlights: [
      "Achieved 95.7% validation accuracy on 7k labeled images",
      "Implemented reproducible ML pipeline",
      "Thesis project demonstrating real-world application"
    ],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
  },
  {
    id: 2,
    title: "FinAid — Personal Finance Web App",
    category: "Full Stack",
    description: "Comprehensive personal finance management platform with authentication, REST API, and responsive UI designed in Figma.",
    technologies: ["React", "Flask", "PostgreSQL", "Figma", "REST API"],
    highlights: [
      "Lighthouse Accessibility score of 97",
      "Completed 25+ test cases with Postman",
      "SQL reconciliation and data validation"
    ],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80"
  },
  {
    id: 3,
    title: "ParkPilot — Parking Management",
    category: "Full Stack",
    description: "Smart parking management system with operator dashboard, booking functionality, and GA event tracking.",
    technologies: ["Flask", "React", "PyTest", "Google Analytics"],
    highlights: [
      "Reduced booking submit time by 40%",
      "16 PyTest smoke test cases",
      "Comprehensive auth and form validation"
    ],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80"
  },
  {
    id: 4,
    title: "HealthLens — Fitness Tracker",
    category: "Full Stack",
    description: "Fitness and nutrition tracking application with interactive charts, custom component library, and comprehensive API validation.",
    technologies: ["React", "Flask", "Postman", "Chart.js"],
    highlights: [
      "Lightweight component library",
      "12 API endpoints validated",
      "Standardized error states"
    ],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager at TechCorp",
    content: "Rifat's attention to detail and testing methodology helped us achieve zero critical bugs in our last four releases. His technical and communication skills are exceptional.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO at StartupX",
    content: "Working with Rifat was a game-changer. He not only built our landing pages but also optimized our entire testing workflow, reducing our QA time by 70%.",
    avatar: "https://i.pravatar.cc/150?img=12"
  }
];

export const achievements = [
  { label: "Projects Completed", value: "20+" },
  { label: "Test Cases Executed", value: "500+" },
  { label: "Landing Pages Built", value: "17" },
  { label: "Students Taught", value: "450+" }
];
