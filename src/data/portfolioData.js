export const personalInfo = {
  name: "KUMMARA GOWTHAM",
  preferredName: "Gowtham",
  role: "Python & Java Full Stack Developer & Software Engineer",
  tagline: "Building scalable full-stack web applications & real-time embedded DSP systems with Python, React.js & Java.",
  bio: "Enthusiastic and detail-oriented B.Tech Electronics and Communication student from BIHER Chennai (CGPA: 8.14) with strong skills in Python, SQL, and web technologies. Experienced in developing full-stack projects with a focus on scalability and user experience. Seeking an entry-level Software Engineer role to contribute technical expertise and innovative solutions.",
  email: "gurugowtham776@gmail.com",
  phone: "+91-7893005305",
  location: "Hyderabad, India",
  linkedin: "https://linkedin.com/in/kummara-gowtham-396319298",
  leetcode: "https://leetcode.com",
  github: "https://github.com",
  cgpa: "8.14 / 10",
  status: "Seeking Entry-Level Software Engineer / Full Stack Roles",
  avatar: "/gowtham.png",
};

export const stats = [
  { label: "BIHER CGPA", value: "8.14 / 10", description: "B.Tech Electronics & Communication" },
  { label: "Internships", value: "2 Completed", description: "EduSkills & Cod Tech IT Solutions" },
  { label: "Certifications", value: "3 Credentials", description: "EduSkills Java, Python, Agile" },
  { label: "Primary Stack", value: "React & Full-Stack", description: "Python, Java, MySQL & REST APIs" },
];

export const skillsCategories = [
  {
    category: "Programming Languages",
    icon: "Code2",
    color: "cyan",
    skills: [
      { name: "Python", level: 92, tag: "Primary Language" },
      { name: "JavaScript", level: 88, tag: "Modern ES6+" },
      { name: "C", level: 80, tag: "Embedded / DSP" },
    ],
  },
  {
    category: "Web Technologies",
    icon: "Globe",
    color: "purple",
    skills: [
      { name: "React.js", level: 88, tag: "Frontend Framework" },
      { name: "JavaScript", level: 88, tag: "DOM & Async Logic" },
      { name: "HTML5", level: 94, tag: "Semantic Markup" },
      { name: "CSS3", level: 92, tag: "Responsive Styling" },
      { name: "REST APIs", level: 86, tag: "API Integration" },
    ],
  },
  {
    category: "Database & Development Tools",
    icon: "Wrench",
    color: "emerald",
    skills: [
      { name: "MySQL", level: 86, tag: "Relational Queries" },
      { name: "Git", level: 88, tag: "Version Control" },
      { name: "GitHub", level: 88, tag: "Collaboration & CI" },
      { name: "VS Code", level: 92, tag: "Primary IDE" },
    ],
  },
  {
    category: "AI, GenAI & Systems",
    icon: "Cpu",
    color: "amber",
    skills: [
      { name: "Prompt Engineering", level: 90, tag: "AI & GenAI" },
      { name: "Digital Signal Processing (DSP)", level: 85, tag: "TMS320C6748 Hardware" },
      { name: "Code Composer Studio (CCS)", level: 82, tag: "Texas Instruments IDE" },
      { name: "MATLAB", level: 80, tag: "Algorithm Simulation" },
    ],
  },
];

export const projects = [
  {
    id: "dsp-sawtooth",
    title: "Real-Time Saw Tooth Wave Generation using TMS320C6748 DSP Processor",
    category: "Embedded Systems & DSP",
    type: "Academic Engineering Project",
    badge: "Hardware & DSP Lab",
    accent: "cyan",
    shortDesc: "Real-time sawtooth waveform generation and signal analysis system utilizing TMS320C6748 DSP Trainer Kit with live oscilloscope measurement.",
    points: [
      "Developed a real-time saw tooth waveform generation system using Digital Signal Processing (DSP) techniques.",
      "Implemented waveform generation algorithms using the TMS320C6748 DSP Trainer Kit and Code Composer Studio (CCS).",
      "Analyzed waveform parameters such as amplitude, frequency, and sampling rate using an oscilloscope.",
      "Utilized C programming, MATLAB, and DSP concepts for signal generation and waveform analysis.",
      "Worked with DAC interfacing and real-time signal processing concepts.",
    ],
    tools: ["TMS320C6748 DSP", "Code Composer Studio (CCS)", "MATLAB", "C Programming", "Digital Oscilloscope"],
    interactiveType: "oscilloscope",
    algorithmSnippet: `// TMS320C6748 Real-Time Sawtooth Wave Generator
#include <stdio.h>
#include <c6x.h>

#define SAMPLE_RATE 48000
#define FREQUENCY   1000
#define AMPLITUDE   32767

void generate_sawtooth(short *buffer, int size) {
    int step = (AMPLITUDE * 2 * FREQUENCY) / SAMPLE_RATE;
    short val = -AMPLITUDE;
    for(int i = 0; i < size; i++) {
        buffer[i] = val;
        val += step;
        if(val >= AMPLITUDE) {
            val = -AMPLITUDE;
        }
    }
}`,
  },
  {
    id: "personal-portfolio-website",
    title: "Personal Portfolio & Web Application Platform",
    category: "Web Development",
    type: "Production Project",
    badge: "Deployed Web App",
    accent: "purple",
    shortDesc: "Responsive, high-performance web platform built with modern web technologies showcasing interactive engineering projects, animations, and live labs.",
    points: [
      "Developed a responsive portfolio website using HTML, CSS, JavaScript, and React.js.",
      "Created sections to showcase projects, technical skills, and professional information.",
      "Deployed the website for public access with optimized performance and cross-device responsiveness.",
    ],
    tools: ["React.js", "JavaScript", "HTML5", "CSS3", "Git", "GitHub", "Vite"],
    interactiveType: "architecture",
  },
  {
    id: "python-fullstack-cli",
    title: "Python Full-Stack Data & Automation Suite",
    category: "Python Development",
    type: "Full-Stack Project",
    badge: "Interactive Shell",
    accent: "emerald",
    shortDesc: "Modular Python system with persistent JSON storage, clean function design, database integration, and interactive command-line workflow.",
    points: [
      "Engineered modular Python architecture utilizing dictionaries, functions, and structured exception handling.",
      "Implemented automated JSON and MySQL database integration for persistent data storage.",
      "Built interactive CLI commands with real-time state manipulation and search indexing.",
    ],
    tools: ["Python 3", "MySQL", "JSON Persistence", "CLI Shell", "File I/O"],
    interactiveType: "terminal",
    initialContacts: [
      { name: "Kummara Gowtham", phone: "6301600676", email: "gurugowtham776@gmail.com", group: "Engineering" },
      { name: "EduSkills Lead", phone: "9876543210", email: "support@eduskillsfoundation.org", group: "Internship" },
      { name: "Cod Tech Mentor", phone: "9812345678", email: "info@codtech.in", group: "Internship" },
    ],
  },
];

export const experience = [
  {
    role: "Java Full Stack Developer Intern",
    company: "EduSkills",
    location: "Virtual / Remote",
    period: "Jan 2026 – Mar 2026",
    duration: "10-Week Program",
    type: "Internship",
    badge: "Verified Internship",
    description: "Completed an intensive 10-week virtual internship in Java Full Stack Development working on enterprise web applications, REST APIs, and database architecture.",
    highlights: [
      "Completed a 10-week virtual internship in Java Full Stack Development.",
      "Worked with HTML, CSS, Bootstrap, JavaScript, Core Java, Spring Boot, Hibernate, and MySQL.",
      "Gained hands-on experience in REST APIs, database integration, and version control using Git.",
      "Improved problem-solving and web application development skills through practical assignments.",
    ],
    technologies: ["Core Java", "Spring Boot", "Hibernate", "MySQL", "JavaScript", "HTML5", "CSS3", "Bootstrap", "REST APIs", "Git"],
  },
  {
    role: "Web Development Intern",
    company: "Cod Tech IT Solutions Private Limited",
    location: "Virtual",
    period: "Virtual Internship",
    duration: "Web Development",
    type: "Internship",
    badge: "Live Deployment",
    description: "Hands-on web engineering role focused on building, styling, and deploying responsive web applications and personal branding platforms.",
    highlights: [
      "Assisted in building and enhancing web applications using HTML, CSS, JavaScript and AI tools under senior developer guidance.",
      "Designed and deployed a personal portfolio website to showcase projects and technical skills.",
      "Gained practical experience in teamwork, web development, and real-world project workflows.",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "React.js", "AI Tools", "Git", "GitHub"],
  },
];

export const education = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Electronics and Communication Engineering",
    institution: "Bharath Institute of Higher Education and Research (BIHER)",
    location: "Chennai, Tamil Nadu",
    period: "2022 – 2026",
    status: "Final Year Student",
    score: "CGPA: 8.14",
    highlight: "Academic Standing (8.14 CGPA)",
    details: "Bachelor of Technology in Electronics and Communication Engineering with coursework in Digital Signal Processing, Embedded Systems, Web Technologies, and Software Engineering.",
  },
];

export const certifications = [
  {
    title: "Python Full Stack Development",
    issuer: "Python Life",
    year: "2026",
    badge: "Full Stack Python",
    summary: "Comprehensive certification covering Python programming, full-stack web architecture, frontend integration, and database systems.",
    skillsCovered: ["Python", "Full Stack Development", "Web Technologies", "Database Integration"],
  },
  {
    title: "Java Full Stack Development",
    issuer: "EduSkills",
    year: "2026",
    badge: "Enterprise Web",
    summary: "Industry internship certificate verifying hands-on web application development, REST API design, and database integration.",
    skillsCovered: ["Core Java", "Spring Boot", "REST APIs", "MySQL", "Git"],
  },
  {
    title: "Agile Development and Scrum",
    issuer: "Coursera",
    year: "2026",
    badge: "Agile & Scrum",
    summary: "Professional certification validating expertise in Agile methodologies, Scrum sprints, user stories, and modern iterative software engineering workflows.",
    skillsCovered: ["Agile Methodology", "Scrum Framework", "Sprint Planning", "Team Workflows"],
  },
];
