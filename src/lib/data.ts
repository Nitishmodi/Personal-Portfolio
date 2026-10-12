export const links = {
  email: "nitiannitish9999@gmail.com",
  phone: "+91 8102143055",
  phoneHref: "tel:+918102143055",
  linkedin: "https://www.linkedin.com/in/nitish-modi-a11b17227/",
  github: "https://github.com/Nitishmodi",
  leetcode: "https://leetcode.com/u/B21CS030/",
  codechef: "https://www.codechef.com/users/nitishmodi20",
  devpilot: "https://ai-interview-app-pink.vercel.app/",
  devpilotRepo: "https://github.com/Nitishmodi/Ai_Interview_App",
  flowpilot: "https://flow-pilot-ai-nu.vercel.app/",
  flowpilotRepo: "https://github.com/Nitishmodi/FlowPilot--AI",
  ias: "https://iassathi.com",
  resume: "/nitish-modi-resume.pdf",
} as const;

export const nav = [
  { href: "#work", id: "work", label: "Work" },
  { href: "#products", id: "products", label: "Products" },
  { href: "#stack", id: "stack", label: "Stack" },
  { href: "#record", id: "record", label: "Record" },
  { href: "#contact", id: "contact", label: "Contact me" },
] as const;

export const facts = [
  {
    id: "now",
    label: "Now",
    title: "Software Engineer, Cimpress India",
    points: ["July 2025 – present", "Intern, January – June 2025", "Same systems, title changed in July"],
  },
  {
    id: "place",
    label: "Place",
    title: "Hazaribagh",
    points: ["Open to on-site", "Open to hybrid", "Open to remote"],
  },
  {
    id: "study",
    label: "Study",
    title: "B.Tech, Computer Science",
    points: ["NIT Meghalaya, Sep 2021 – May 2025", "Intermediate, Jul 2019 – May 2021"],
  },
  {
    id: "club",
    label: "Club",
    title: "Head, competitive programming",
    points: ["Coding Club, NIT Meghalaya", "June 2022 – August 2025", "Contests for Cognitia"],
  },
] as const;

export type RolePoint = {
  title: string;
  body: string;
  tags: string[];
};

export type Role = {
  id: string;
  org: string;
  title: string;
  span: string;
  place: string;
  note: string;
  summary: string;
  points: RolePoint[];
};

export const experience: Role[] = [
  {
    id: "cimpress",
    org: "Cimpress India",
    title: "Software Engineer",
    span: "Jul 2025 – Present",
    place: "Bengaluru · Remote",
    note: "",
    summary: "Intern from January 2025 to June 2025, then full time from July 2025 to the present.",
    points: [
      {
        title: "Planned Shipment Viewer",
        body: "A React and TypeScript surface on Cimpress React. Operators search items and correct addresses. Daily escalations on that flow fell by about 90%.",
        tags: ["React", "TypeScript", "Cimpress React"],
      },
      {
        title: "Planman ship and replan",
        body: "Node.js, Koa, and TypeScript APIs. Label generation moved off TMSv2 onto Planman v2, and the plans are stored in DynamoDB.",
        tags: ["Node.js", "Koa", "DynamoDB"],
      },
      {
        title: "Packing Slip Service",
        body: "A new service, written from an empty repository. Node.js and TypeScript, its own REST API, deployed on Humanitech IDP.",
        tags: ["Node.js", "TypeScript", "REST"],
      },
      {
        title: "Labels into iPack",
        body: "An AWS Lambda on SNS and SQS that sends shipping labels to iPack over TCP, with retries when the connection does not hold.",
        tags: ["Lambda", "SNS", "SQS"],
      },
      {
        title: "What shipped is allowed to mean",
        body: "Barcode validation, commercial invoices, return slips, and an Add Tracking ID step. A shipment cannot be marked shipped until a tracking id exists.",
        tags: ["Workflow", "Validation"],
      },
      {
        title: "Events and contracts",
        body: "Comet Bridge events for created, cancelled, and shipped plans. A request and response schema mismatch across packing, replan, and customs, found and corrected.",
        tags: ["Events", "Schemas"],
      },
      {
        title: "How the team watches it",
        body: "Log monitoring moved from Sumo Logic to New Relic for most of the team services. Releases go out with Docker, Kubernetes, Helm, and CI/CD.",
        tags: ["New Relic", "Docker", "Kubernetes"],
      },
    ],
  },
  {
    id: "siemens",
    org: "Siemens",
    title: "SDE Intern",
    span: "Oct 2024 – Jan 2025",
    place: "Bengaluru · Remote",
    note: "Four months",
    summary:
      "A short internship aimed at the machinery around building software, not a single product feature.",
    points: [
      {
        title: "Copier, instead of Cookiecutter",
        body: "Project templates moved from Cookiecutter to Copier. Regenerating a project took about half the time.",
        tags: ["Copier", "Cookiecutter"],
      },
      {
        title: "Ruff on the lint path",
        body: "Ruff joined the code-quality pipeline. Lint runs came back about 40% faster.",
        tags: ["Ruff", "Python"],
      },
      {
        title: "Nova on Bedrock",
        body: "Inpainting, outpainting, and video generation with Amazon Nova, Lite, Micro, and Pro, on AWS Bedrock. The workflow around that generation got about 30% more efficient.",
        tags: ["AWS Bedrock", "Nova"],
      },
    ],
  },
  {
    id: "ias",
    org: "IAS Sathi",
    title: "MERN stack developer",
    span: "Apr 2024 – May 2024",
    place: "Punjab · Remote · Part-time",
    note: "Part-time · iassathi.com",
    summary:
      "Two months building the public site, on the frontend and the backend together.",
    points: [
      {
        title: "iassathi.com",
        body: "Contributed to the public website. The live site is iassathi.com.",
        tags: ["Next.js", "React"],
      },
      {
        title: "Frontend and backend",
        body: "Worked both sides of the same product. React on the pages, Express and MongoDB behind the content.",
        tags: ["React", "Express", "MongoDB"],
      },
      {
        title: "Server render and static pages",
        body: "Pages that have to stay current are server-rendered. Pages that can stand still are generated ahead of time.",
        tags: ["SSR", "SSG", "Next.js"],
      },
    ],
  },
  {
    id: "club",
    org: "Coding Club, NIT Meghalaya",
    title: "Head, competitive programming",
    span: "Jun 2022 – Aug 2025",
    place: "Shillong · Education",
    note: "Three years, three months",
    summary:
      "The competitive programming wing of the club, through most of the degree.",
    points: [
      {
        title: "Cognitia",
        body: "Contests and technical events for the institute fest. Problem sets, a timetable that had to hold on the day, and a room that had to know where to sit.",
        tags: ["Contests", "Events"],
      },
      {
        title: "The weeks between fests",
        body: "Keeping people who had not sat a contest in the habit of sitting one. The fest was the public version of that job.",
        tags: ["Mentorship", "DSA"],
      },
    ],
  },
];

export const products = [
  {
    id: "devpilot",
    index: "01",
    name: "DevPilot AI",
    href: links.devpilot,
    repo: links.devpilotRepo,
    kicker: "Hiring desk",
    summary:
      "A recruiter posts a role. A candidate who fits does not drop a resume into a pile. Applying opens an interview written from that job and that person. When it is over, both sides open the same scorecard. The product prepares the read. It does not make the hire.",
    points: [
      "A role is a brief: the work, the skills, the years. It can sit as a draft, go visible, or close when the seat is filled.",
      "Open roles line up against a candidate by target title, skills, and experience. The weight is 55% skills, 25% experience, 20% title.",
      "The screen is Gemini: 20 skill questions, 5 answers spoken, 5 written. Two people on the same role do not sit the same paper. Answers are stored and scored.",
      "A recommendation to move forward requires every section, and the overall score, above 80%. Charts and a PDF for the rest of the team. The recruiter still decides.",
      "The desks are separate. An assistant helps write a brief and read a scorecard. It does not draft the candidate answers.",
    ],
    stack: ["Next.js", "React", "Gemini", "PostgreSQL", "Tailwind"],
  },
  {
    id: "flowpilot",
    index: "02",
    name: "FlowPilot AI",
    href: links.flowpilot,
    repo: links.flowpilotRepo,
    kicker: "Local toolbox",
    summary:
      "A CLI and a VS Code extension for the repository already on the machine. Format, lint, typecheck, test, a secret scan, and a look at the diff, before a pull request exists. The site explains the product. It does not receive the source.",
    points: [
      "Ten packages in one repository: a CLI, a VS Code extension, and the docs site.",
      "Sixteen local checks, and two workflows. A three-step check, and a six-step run before a pull request. A script the project does not have stays unavailable. It is never marked passed.",
      "The extension ships 28 commands, an activity-bar view, and a one-file install. It calls the same CLI the terminal does.",
      "A secret match names the file and the line. The value stays masked.",
    ],
    stack: ["TypeScript", "Node.js", "Next.js", "VS Code", "GitHub Actions"],
  },
] as const;

export const groups = [
  "All",
  "Languages",
  "Interface",
  "Services",
  "Data",
  "Cloud",
  "Models",
  "Practice",
] as const;

export type Skill = {
  name: string;
  group: (typeof groups)[number];
  note: string;
  hex: string;
  mark?: string;
};

export const skills: Skill[] = [
  { name: "TypeScript", group: "Languages", hex: "#3178C6", note: "Services at Cimpress, plus both products." },
  { name: "JavaScript", group: "Languages", hex: "#F7DF1E", note: "IAS Sathi and earlier web work." },
  { name: "C++", group: "Languages", hex: "#7BA7D7", note: "Contest code." },
  { name: "Python", group: "Languages", hex: "#3776AB", note: "Siemens, including Nova on Bedrock." },
  { name: "Java", group: "Languages", hex: "#E6893A", note: "From the degree." },
  { name: "React", group: "Interface", hex: "#61DAFB", note: "Shipment viewer, DevPilot, IAS Sathi." },
  { name: "Next.js", group: "Interface", hex: "#EDEDED", note: "DevPilot, FlowPilot docs, IAS Sathi." },
  { name: "Tailwind", group: "Interface", hex: "#38BDF8", note: "DevPilot." },
  { name: "Node.js", group: "Services", hex: "#5FA04E", note: "Planman, packing slips, FlowPilot." },
  { name: "Koa", group: "Services", hex: "#F2F2F2", note: "Ship and replan APIs." },
  { name: "Express", group: "Services", hex: "#EDEDED", note: "IAS Sathi." },
  { name: "NestJS", group: "Services", hex: "#E0234E", note: "Declared Node modules and routes." },
  { name: "PostgreSQL", group: "Data", hex: "#4169E1", note: "DevPilot." },
  { name: "MongoDB", group: "Data", hex: "#47A248", note: "Content on IAS Sathi." },
  { name: "DynamoDB", group: "Data", hex: "#7AA4E8", mark: "DDB", note: "Shipment plans in Planman." },
  { name: "Docker", group: "Cloud", hex: "#2496ED", note: "How the Cimpress services ship." },
  { name: "Kubernetes", group: "Cloud", hex: "#326CE5", note: "Where those images run." },
  { name: "Helm", group: "Cloud", hex: "#8EB8F8", note: "Charts for that deploy." },
  { name: "AWS", group: "Cloud", hex: "#FF9900", mark: "AWS", note: "Lambda, SNS, SQS, and Bedrock." },
  { name: "LLMs", group: "Models", hex: "#C4B5FD", mark: "LLM", note: "Gemini on DevPilot, and Nova on Bedrock." },
  { name: "LangChain", group: "Models", hex: "#9AE66E", note: "The wiring around those model calls." },
  { name: "RAG", group: "Models", hex: "#5EEAD4", mark: "RAG", note: "Retrieval beside the model." },
  { name: "Git", group: "Practice", hex: "#F05032", note: "Everything sits on this." },
  { name: "Gemini", group: "Practice", hex: "#8E75FF", note: "DevPilot screens. It does not write the answers." },
];

export const ratings = [
  {
    label: "LeetCode",
    level: "Guardian",
    value: 2166,
    hint: "max rating",
    href: links.leetcode,
  },
  {
    label: "CodeChef",
    level: "5 star",
    value: 2054,
    hint: "max rating",
    href: links.codechef,
  },
] as const;

export const contests = [
  {
    id: "eroh",
    event: "EROH, round one",
    host: "InfoEdge",
    result: "1st in college",
    context: "412th nationally",
    detail:
      "Engineer’s Ring of Honour. First in college, and 412th in the country, in the opening round.",
  },
  {
    id: "lc418",
    event: "Weekly Contest 418",
    host: "LeetCode",
    result: "141st",
    context: "global",
    detail: "LeetCode Weekly Contest 418. Ranked 141st globally.",
  },
  {
    id: "lc140",
    event: "Biweekly Contest 140",
    host: "LeetCode",
    result: "862nd",
    context: "global",
    detail: "LeetCode Biweekly Contest 140. Ranked 862nd globally.",
  },
  {
    id: "s154",
    event: "Starters 154",
    host: "CodeChef",
    result: "29th",
    context: "global",
    detail: "CodeChef Starters 154. Finished 29th.",
  },
  {
    id: "s156",
    event: "Starters 156, Div 2",
    host: "CodeChef",
    result: "107th",
    context: "of 36,000+",
    detail:
      "CodeChef Starters 156, Division 2. 107th among more than 36,000 participants.",
  },
  {
    id: "gfg174",
    event: "Weekly Contest 174",
    host: "GeeksforGeeks",
    result: "92nd",
    context: "of 38,000+",
    detail:
      "GFG Weekly Coding Contest 174. 92nd among more than 38,000 contestants.",
  },
  {
    id: "coderush",
    event: "CodeRush",
    host: "AlgoUniversity",
    result: "2nd",
    context: "DSA",
    detail:
      "Second place in the AlgoUniversity CodeRush challenge, on data structures and algorithms.",
  },
] as const;

export const education = [
  {
    school: "National Institute of Technology Meghalaya",
    credential: "B.Tech, Computer Science and Engineering",
    span: "Sep 2021 – May 2025",
    result: "CGPA 9.76",
    note: "2nd Rank in Institute",
  },
  {
    school: "Sri Ramakrishna Sarada Ashrama, Hazaribagh",
    credential: "Intermediate of Science",
    span: "Jul 2019 – May 2021",
    result: "96%",
    note: "2nd Rank in District",
  },
] as const;
