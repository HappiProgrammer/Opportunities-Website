import { Opportunity } from './types';

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Google Summer of Code (GSoC) 2026',
    organization: 'Google Open Source',
    orgLogo: 'https://www.google.com/s2/favicons?domain=summerofcode.withgoogle.com&sz=128',
    category: 'Internships',
    type: '12-Week Remote Internship / Mentorship',
    location: 'Global (Online)',
    isRemote: true,
    fundingAmount: '$3,000 - $6,000 Stipend',
    deadline: '2026-09-18', // closing soon!
    description: 'A global program focused on bringing new contributors into open source software development. Contributors work with an open source mentor organization on a 12+ week programming project.',
    eligibility: [
      'Must be at least 18 years old at time of registration',
      'Eligible to work in your country of residence',
      'New or beginner contributor to open source software',
      'Demonstrated proficiency in at least one programming language (e.g. Python, Rust, Go, C++, JS)'
    ],
    benefits: [
      'Competitive stipend adjusted to your geographic purchasing power',
      '1-on-1 direct mentorship from leading core maintainers of global OSS projects',
      'Certificate of completion and internationally recognized portfolio addition',
      'Direct alumni network access to top engineering recruiters'
    ],
    applicationSteps: [
      'Review the participating open source organizations and project ideas list',
      'Engage on organization channels (Discord/Slack/Mailing list) and submit a draft proposal',
      'Refine proposal based on maintainer feedback',
      'Submit final proposal through the Google Summer of Code platform'
    ],
    applyUrl: 'https://summerofcode.withgoogle.com',
    tags: ['Open Source', 'Mentorship', 'Software Engineering', 'Remote', 'Beginner Friendly'],
    featured: true,
    verified: true,
    educationLevel: 'Any / All Levels',
    createdAt: '2026-08-15',
    contactEmail: 'gsoc-support@google.com'
  },
  {
    id: 'opp-2',
    title: 'Thiel Fellowship 2026 - $100,000 for Young Builders',
    organization: 'The Thiel Foundation',
    orgLogo: 'https://www.google.com/s2/favicons?domain=thielfellowship.org&sz=128',
    category: 'Fellowships',
    type: '2-Year Equity-Free Fellowship',
    location: 'San Francisco, CA (or Remote)',
    isRemote: true,
    fundingAmount: '$100,000 Equity-Free Grant',
    deadline: 'Rolling',
    description: 'A two-year, $100,000 grant for young people who want to build new things instead of sitting in a classroom. Thiel Fellows skip or stop out of college to pursue startups, non-profits, or scientific research.',
    eligibility: [
      'Must be aged 22 or younger at time of application',
      'Willing to stop out of college or work full-time on your venture',
      'Clear technological innovation, hardware, AI, biotech, or transformative product vision'
    ],
    benefits: [
      '$100,000 grant given directly to you over two years with zero equity taken',
      'Exclusive network of current fellows, alumni founders, and prominent Silicon Valley investors',
      'Direct mentorship from industry luminaries and technical experts',
      'Retreats, founder dinners, and demo days in the SF Bay Area'
    ],
    applicationSteps: [
      'Complete the online questionnaire detailing your project, background, and vision',
      'Submit demonstrable proof of work (GitHub repo, prototype, live link, or scientific paper)',
      'Shortlisted candidates complete virtual interviews with Foundation partners',
      'Final cohort selection and onboarding in San Francisco'
    ],
    applyUrl: 'https://thielfellowship.org',
    tags: ['Startup', 'Equity Free', 'Founders', 'DeepTech', 'Under 23'],
    featured: true,
    verified: true,
    educationLevel: 'Undergraduate',
    createdAt: '2026-08-01',
    contactEmail: 'fellows@thielfoundation.org'
  },
  {
    id: 'opp-3',
    title: 'Rhodes Scholarship 2027 at Oxford University',
    organization: 'The Rhodes Trust',
    orgLogo: 'https://www.google.com/s2/favicons?domain=rhodeshouse.ox.ac.uk&sz=128',
    category: 'Scholarships',
    type: 'Fully-Funded Postgraduate Degree',
    location: 'Oxford, United Kingdom',
    isRemote: false,
    fundingAmount: 'Fully Funded (~£65,000/yr + Tuition)',
    deadline: '2026-09-30',
    description: 'The world\'s oldest and perhaps most prestigious international graduate scholarship program, enabling outstanding young people from across the globe to study at the University of Oxford.',
    eligibility: [
      'Completed undergraduate degree with First Class Honors or GPA >= 3.8/4.0',
      'Aged between 18 and 24 (or up to 27 for non-traditional academic paths)',
      'Citizenship or residency in an eligible Rhodes constituency',
      'Demonstrated energy to use one\'s talents to the full and commitment to service'
    ],
    benefits: [
      'All University and College fees paid in full',
      'Generous living stipend (£19,000+ per year tax-free)',
      'Economy class airfare to and from Oxford at beginning and end of tenure',
      'Membership in the Rhodes House global community and lifelong leadership seminars'
    ],
    applicationSteps: [
      'Obtain institutional endorsement from your undergraduate university',
      'Submit detailed CV, personal statement, and academic transcripts',
      'Provide 4-8 academic and character references',
      'Participate in regional committee interviews followed by national final round'
    ],
    applyUrl: 'https://www.rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/',
    tags: ['Oxford', 'Postgraduate', 'Leadership', 'Fully Funded', 'Prestigious'],
    featured: true,
    verified: true,
    educationLevel: 'Undergraduate',
    createdAt: '2026-07-20',
    contactEmail: 'scholarships@rhodeshouse.ox.ac.uk'
  },
  {
    id: 'opp-4',
    title: 'OpenAI Superalignment & Safety Research Grant',
    organization: 'OpenAI & Alignment Foundation',
    orgLogo: 'https://www.google.com/s2/favicons?domain=openai.com&sz=128',
    category: 'Grants',
    type: 'Academic & Independent Research Grant',
    location: 'Worldwide (Hybrid / Remote)',
    isRemote: true,
    fundingAmount: '$50,000 - $150,000 + Compute Credits',
    deadline: '2026-10-15',
    description: 'Supporting researchers, graduate students, and independent labs working on technical solutions to align superhuman AI systems with human intent and societal benefit.',
    eligibility: [
      'Graduate students, postdocs, professors, or established independent researchers',
      'Background in machine learning, mathematics, theoretical computer science, or cognitive systems',
      'Clear methodology addressing scalable oversight, interpretability, or robustness to distributional shift'
    ],
    benefits: [
      'Unrestricted financial grant paid directly to institution or individual',
      'Up to $50,000 in dedicated OpenAI compute and API credits',
      'Bi-weekly technical discussions with frontier AI alignment researchers',
      'Sponsored attendance at leading conferences (NeurIPS, ICML, ICLR)'
    ],
    applicationSteps: [
      'Draft a 3-5 page research proposal following the provided rubric',
      'Detail proposed compute and operational budget breakdown',
      'Include CV and prior publications or empirical research codebases',
      'Submit online for peer review by the scientific committee'
    ],
    applyUrl: 'https://openai.com/alignment-grants',
    tags: ['AI Safety', 'Machine Learning', 'Research Grant', 'Compute Credits', 'Ph.D.'],
    featured: true,
    verified: true,
    educationLevel: 'Graduate',
    createdAt: '2026-08-20',
    contactEmail: 'grants@openai.com'
  },
  {
    id: 'opp-5',
    title: 'ETHGlobal Singapore 2026 - Hackathon & Builder Showcase',
    organization: 'ETHGlobal',
    orgLogo: 'https://www.google.com/s2/favicons?domain=ethglobal.com&sz=128',
    category: 'Hackathons',
    type: '36-Hour Hackathon & Conference',
    location: 'Singapore Expo, Singapore',
    isRemote: false,
    fundingAmount: '$350,000 Prize Pool + Travel Grants',
    deadline: '2026-09-15', // closing in 4 days!
    description: 'Join over 1,500 Web3 developers, cryptographic researchers, and founders building decentralized applications, zero-knowledge proofs, and automated finance infrastructure.',
    eligibility: [
      'Open to developers, UI/UX designers, smart contract auditors, and product leads worldwide',
      'Teams of 1 to 5 members',
      'All code must be written during the hackathon period and open-sourced under MIT/Apache'
    ],
    benefits: [
      'Compete for over $350k in general track and partner sponsor bounties',
      'Direct feedback and code reviews from core protocol creators',
      'Free food, swag, hardware, and travel reimbursement grants for qualifying teams',
      'Fast-tracked consideration for top seed Web3 accelerators'
    ],
    applicationSteps: [
      'Submit builder profile and link your GitHub / previous hackathon projects',
      'Receive instant acceptance verification within 72 hours',
      'Join the hacker Discord and match with teammates or form a squad',
      'Check in on-site in Singapore and start hacking!'
    ],
    applyUrl: 'https://ethglobal.com',
    tags: ['Hackathon', 'Web3', 'Blockchain', 'High Reward', 'Closing Soon'],
    featured: true,
    verified: true,
    educationLevel: 'Any / All Levels',
    createdAt: '2026-08-10',
    contactEmail: 'contact@ethglobal.com'
  },
  {
    id: 'opp-6',
    title: 'Senior Distributed Systems Engineer',
    organization: 'Cloudflare',
    orgLogo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=128&auto=format&fit=crop&q=80',
    category: 'Jobs',
    type: 'Full-time Permanent',
    location: 'San Francisco, CA / London / Remote',
    isRemote: true,
    fundingAmount: '$170,000 - $225,000 + Equity',
    deadline: 'Rolling',
    description: 'Help build and scale the next-generation global edge compute fabric powering millions of internet properties. Work with Rust, Go, and Linux eBPF systems.',
    eligibility: [
      '5+ years of experience engineering high-throughput distributed systems in production',
      'Deep knowledge of TCP/IP, HTTP/3, TLS, and Linux networking internals',
      'Proficiency in Rust, C++, or Go with emphasis on performance optimization and safety',
      'Experience with on-call rotations and maintaining mission-critical 24/7 infrastructure'
    ],
    benefits: [
      'Top-tier competitive base salary + substantial public equity grants (RSUs)',
      'Comprehensive medical, dental, and vision insurance with 100% premium coverage',
      'Remote work stipend ($2,000 home office setup + $150/mo internet)',
      'Unlimited paid time off (PTO) and 16 weeks parental leave'
    ],
    applicationSteps: [
      'Submit resume and portfolio / open source contributions',
      'Initial 30-minute introductory chat with engineering hiring manager',
      'Technical architecture and concurrent systems pairing session',
      'Virtual onsite interviews and executive values alignment chat'
    ],
    applyUrl: 'https://www.cloudflare.com/careers',
    tags: ['Full-time', 'Systems Engineering', 'Rust', 'Remote', 'High Compensation'],
    featured: false,
    verified: true,
    educationLevel: 'Post-Doc / Professional',
    createdAt: '2026-08-25',
    contactEmail: 'careers@cloudflare.com'
  },
  {
    id: 'opp-7',
    title: 'CERN Summer Student Programme 2027',
    organization: 'European Organization for Nuclear Research (CERN)',
    orgLogo: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=128&auto=format&fit=crop&q=80',
    category: 'Internships',
    type: '8 to 13-Week Research Internship',
    location: 'Geneva, Switzerland',
    isRemote: false,
    fundingAmount: '90 CHF/day (~€2,700/mo) + Travel',
    deadline: '2026-11-30',
    description: 'Spend your summer at the epicenter of particle physics research in Geneva. Join day-to-day work of experimental or theoretical teams, attend lectures, and tour experimental facilities.',
    eligibility: [
      'Bachelor or Master student in Physics, Computing, Engineering or Mathematics',
      'Completed at least 3 years of full-time higher education by summer',
      'Proficiency in English or French',
      'Have not worked at CERN as a summer student or trainee previously'
    ],
    benefits: [
      'Daily subsistence allowance of 90 Swiss Francs (tax-free in Switzerland)',
      'Travel allowance covering round-trip flight or train to Geneva',
      'Comprehensive CERN health insurance coverage',
      'Access to state-of-the-art detector labs, computing clusters, and particle beams'
    ],
    applicationSteps: [
      'Prepare CV, official academic transcripts, and recent letter of motivation',
      'Nominate two academic referees to submit reference letters directly',
      'Submit application via CERN SmartRecruiters portal',
      'Selection results announced mid-spring'
    ],
    applyUrl: 'https://careers.cern/summer-student-programme',
    tags: ['Physics', 'Geneva', 'CERN', 'STEM', 'Fully Funded'],
    featured: true,
    verified: true,
    educationLevel: 'Undergraduate',
    createdAt: '2026-08-05',
    contactEmail: 'summer.student@cern.ch'
  },
  {
    id: 'opp-8',
    title: 'Schmidt Science Fellows 2027',
    organization: 'Schmidt Sciences & Rhodes Trust',
    orgLogo: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=128&auto=format&fit=crop&q=80',
    category: 'Fellowships',
    type: '1-2 Year Postdoctoral Fellowship',
    location: 'Host Institution of Choice (Global)',
    isRemote: false,
    fundingAmount: '$110,000/yr Stipend + $10,000 Research Grant',
    deadline: '2026-10-01',
    description: 'Designed to develop the next generation of science leaders to transcend scientific boundaries, pivot to a new field after completing their Ph.D., and tackle global challenges.',
    eligibility: [
      'Ph.D. in natural sciences, computing, engineering, or mathematics awarded within the past year',
      'Institutional nomination by an invited partner university',
      'Compelling scientific proposal representing a substantial field pivot from doctoral research'
    ],
    benefits: [
      '$110,000 annual stipend for up to two years of postdoctoral placement',
      'Global Meeting Series with world leaders in science, policy, and business',
      'Mentorship from renowned international research fellows',
      'Full relocation, travel, and health insurance allowance'
    ],
    applicationSteps: [
      'Receive formal nomination from your university\'s graduate dean',
      'Submit detailed research proposal explaining your planned disciplinary pivot',
      'Academic panel evaluation and global video review',
      'Finalist in-person interviews with the Schmidt Sciences Advisory Council'
    ],
    applyUrl: 'https://schmidtsciencefellows.org',
    tags: ['Postdoctoral', 'Interdisciplinary', 'Science Leadership', 'High Stipend'],
    featured: false,
    verified: true,
    educationLevel: 'Post-Doc / Professional',
    createdAt: '2026-07-15',
    contactEmail: 'info@schmidtsciencefellows.org'
  },
  {
    id: 'opp-9',
    title: 'Gates Cambridge Scholarship 2027',
    organization: 'Gates Cambridge Trust',
    orgLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=128&auto=format&fit=crop&q=80',
    category: 'Scholarships',
    type: 'Full Postgraduate Scholarship (Ph.D. / M.Phil.)',
    location: 'Cambridge, United Kingdom',
    isRemote: false,
    fundingAmount: 'Fully Funded (~£45,000/yr + University Fees)',
    deadline: '2026-10-12',
    description: 'Established in October 2000 by a donation from the Bill and Melinda Gates Foundation. Awarded to outstanding applicants from countries outside the UK to pursue a full-time postgraduate degree at the University of Cambridge.',
    eligibility: [
      'Citizen of any country outside the United Kingdom',
      'Applying to pursue a full-time residential course of study at Cambridge (Ph.D., M.Phil., etc.)',
      'Demonstrated academic excellence and strong social commitment to improving the lives of others'
    ],
    benefits: [
      'Full University Composition Fee paid directly to Cambridge College',
      'Maintenance allowance of £20,000/yr for single students',
      'One economy single airfare at beginning and end of course',
      'Inbound visa costs & immigration health surcharge covered'
    ],
    applicationSteps: [
      'Apply for Cambridge postgraduate admission via the Graduate Applicant Portal',
      'Submit the Gates Cambridge statement (500 words) and reference',
      'Departmental ranking and Trust selection shortlist',
      'Virtual interviews with international subject panels'
    ],
    applyUrl: 'https://www.gatescambridge.org',
    tags: ['Cambridge', 'Postgraduate', 'Gates Foundation', 'Fully Funded', 'Global'],
    featured: true,
    verified: true,
    educationLevel: 'Graduate',
    createdAt: '2026-08-18',
    contactEmail: 'info@gatescambridge.org'
  },
  {
    id: 'opp-10',
    title: 'Climate Tech Venture Grant - Carbon Removal Innovation',
    organization: 'Breakthrough Energy Foundation',
    orgLogo: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=128&auto=format&fit=crop&q=80',
    category: 'Grants',
    type: 'Non-Dilutive Pilot Grant',
    location: 'Global (Remote applications)',
    isRemote: true,
    fundingAmount: '$75,000 - $250,000 Non-Dilutive',
    deadline: '2026-09-22', // closing soon!
    description: 'Empowering innovative hardware and bio-engineering projects capable of sequestering gigatons of CO2 at under $100/ton cost thresholds. For lab-stage and prototype builders.',
    eligibility: [
      'Founders, university spinoffs, or non-profit research teams',
      'Validated lab proof-of-concept (TRL 3+)',
      'Commitment to open sharing of key life-cycle measurement and verification data'
    ],
    benefits: [
      'Non-dilutive grant capital with zero warrants or equity requirements',
      'Direct connection with leading industrial pilot off-takers and carbon marketplaces',
      'Engineering mentorship on techno-economic modeling and lifecycle analysis',
      'Showcase slot at the annual Climate Innovation Summit'
    ],
    applicationSteps: [
      'Complete the technical assessment deck (maximum 15 slides)',
      'Submit third-party or lab validation data on sequestration efficiency',
      'Review by expert science advisory board',
      'Grant agreement execution and tranche milestone disbursement'
    ],
    applyUrl: 'https://breakthroughenergy.org/fellows',
    tags: ['Climate Tech', 'Non Dilutive', 'CleanTech', 'Innovation', 'Closing Soon'],
    featured: false,
    verified: true,
    educationLevel: 'Any / All Levels',
    createdAt: '2026-08-22',
    contactEmail: 'grants@breakthroughenergy.org'
  },
  {
    id: 'opp-11',
    title: 'NASA Space Apps Challenge 2026',
    organization: 'NASA Earth Science Division',
    orgLogo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=128&auto=format&fit=crop&q=80',
    category: 'Hackathons',
    type: '48-Hour Global Hackathon',
    location: 'Online / 300+ Cities Worldwide',
    isRemote: true,
    fundingAmount: 'Global Trophy + NASA VIP Rocket Launch Invitation',
    deadline: '2026-10-04',
    description: 'The world\'s largest annual global hackathon. Over 50,000 participants solve real-world challenges on Earth and in space using NASA\'s open data.',
    eligibility: [
      'Completely open to all coders, scientists, designers, storytellers, makers, and students',
      'Participants of all ages welcome (minors require parental consent)',
      'Teams from 1 to 6 members'
    ],
    benefits: [
      'Access to exclusive NASA, ESA, JAXA, and CSA open satellite data and APIs',
      'Global winner teams receive an invitation to attend an active rocket launch at NASA Kennedy Space Center',
      'Official certificate signed by NASA leadership for all valid project submissions',
      'Global media recognition and press coverage'
    ],
    applicationSteps: [
      'Register for a local in-person event or join the Universal Virtual event',
      'Browse the challenge statements published 2 weeks prior',
      'Form or join a team on the Space Apps portal',
      'Develop solution and submit a 30-second video demo and GitHub repository'
    ],
    applyUrl: 'https://www.spaceappschallenge.org',
    tags: ['NASA', 'Space', 'Earth Science', 'Open Data', 'Hackathon'],
    featured: true,
    verified: true,
    educationLevel: 'Any / All Levels',
    createdAt: '2026-08-12',
    contactEmail: 'info@spaceappschallenge.org'
  },
  {
    id: 'opp-12',
    title: 'Lead Product Designer (Design Systems)',
    organization: 'Linear App',
    orgLogo: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=128&auto=format&fit=crop&q=80',
    category: 'Jobs',
    type: 'Full-time Remote',
    location: 'Remote (Worldwide, UTC-8 to UTC+3)',
    isRemote: true,
    fundingAmount: '$160,000 - $195,000 + Equity',
    deadline: 'Rolling',
    description: 'Shape the visual language and interaction design of software used by the world\'s highest-performing product teams. Relentless focus on craft, typography, keyboard speed, and micro-interactions.',
    eligibility: [
      '4+ years designing high-craft desktop or web productivity software',
      'Mastery of Figma, component libraries, typography, and motion design',
      'Ability to prototype in code (React/TypeScript/CSS) is highly valued',
      'Obsession with details, keyboard shortcuts, and performance'
    ],
    benefits: [
      'Generous salary and meaningful early-stage equity package',
      'Remote-first culture: work from anywhere within compatible timezones',
      'Annual in-person company retreats in world-class destinations',
      'Unlimited book, software, and hardware budget (latest MacBook Pro + 5K monitor)'
    ],
    applicationSteps: [
      'Share your portfolio with deep-dive case studies showcasing craft and interaction',
      'Portfolio review and design critique conversation with head of design',
      'Paid design exercise focusing on practical product trade-offs',
      'Meet the co-founders and team members'
    ],
    applyUrl: 'https://linear.app/careers',
    tags: ['Design', 'UI/UX', 'Figma', 'Remote', 'High Craft'],
    featured: false,
    verified: true,
    educationLevel: 'Any / All Levels',
    createdAt: '2026-08-28',
    contactEmail: 'jobs@linear.app'
  },
  {
    id: 'opp-13',
    title: 'Kauffman Fellowship in Venture Capital (Class 31)',
    organization: 'Kauffman Fellows',
    orgLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=128&auto=format&fit=crop&q=80',
    category: 'Fellowships',
    type: '2-Year Executive Leadership Program',
    location: 'San Francisco, CA & Global Modules',
    isRemote: false,
    fundingAmount: 'Executive Network & Venture Placement',
    deadline: '2026-11-15',
    description: 'The premier two-year leadership development program for innovation investors and venture capitalists. Accelerating the world’s top emerging venture partners.',
    eligibility: [
      'Currently working full-time at a venture capital fund, corporate venture arm, or accelerator',
      'At least 2-4 years of professional investing or startup founding experience',
      'Strong commitment to fostering diverse entrepreneurship and innovation ecosystems'
    ],
    benefits: [
      'Lifelong membership in the Kauffman Fellows Society (900+ partners globally across 60+ countries)',
      'Quarterly in-person modules in Silicon Valley, Tokyo, London, and Singapore',
      'Executive coaching and peer mentorship from veteran general partners',
      'Unmatched deal-flow and co-investment syndication network'
    ],
    applicationSteps: [
      'Secure formal sponsor nomination from your investment fund partners',
      'Submit written application essays, investment track record, and references',
      'Peer review and admissions committee evaluation',
      'Finalist in-person candidate assessment in San Francisco'
    ],
    applyUrl: 'https://www.kauffmanfellows.org',
    tags: ['Venture Capital', 'Executive', 'Fellowship', 'Investing', 'Global'],
    featured: false,
    verified: true,
    educationLevel: 'Post-Doc / Professional',
    createdAt: '2026-08-01',
    contactEmail: 'admissions@kauffmanfellows.org'
  },
  {
    id: 'opp-14',
    title: 'Erasmus Mundus Joint Master Degree Scholarship 2027',
    organization: 'European Commission',
    orgLogo: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=128&auto=format&fit=crop&q=80',
    category: 'Scholarships',
    type: 'Fully Funded 2-Year International Master Degree',
    location: 'Study across 2-3 European Countries',
    isRemote: false,
    fundingAmount: 'Fully Funded (~€1,400/mo + Tuition + Travel)',
    deadline: '2027-01-15',
    description: 'High-level integrated study programmes delivered by an international consortium of higher education institutions across Europe. Experience living and studying in multiple countries.',
    eligibility: [
      'Hold a first higher education degree (Bachelor degree or equivalent)',
      'Proof of English proficiency (IELTS >= 6.5 or TOEFL >= 90)',
      'Meet the specific academic prerequisites of the selected Erasmus Mundus consortium'
    ],
    benefits: [
      'Full participation and tuition fees waived across all partner universities',
      'Monthly living allowance of €1,400 for up to 24 months',
      'Comprehensive international health and accident insurance',
      'Graduation with a recognized double or joint European Master degree'
    ],
    applicationSteps: [
      'Browse the Erasmus Mundus Catalogue and choose up to 3 master programmes',
      'Prepare motivation statement, CV in Europass format, and academic transcripts',
      'Submit online dossier to the specific consortium coordinator',
      'Interviews and scholarship award announcement in March/April'
    ],
    applyUrl: 'https://erasmus-plus.ec.europa.eu',
    tags: ['Europe', 'Master Degree', 'Study Abroad', 'Fully Funded', 'Erasmus'],
    featured: false,
    verified: true,
    educationLevel: 'Undergraduate',
    createdAt: '2026-07-10',
    contactEmail: 'info@erasmusplus.eu'
  },
  {
    id: 'opp-15',
    title: 'Mozilla Tech & Society Fellowship',
    organization: 'Mozilla Foundation',
    orgLogo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=128&auto=format&fit=crop&q=80',
    category: 'Fellowships',
    type: '12-Month Paid Embedded Fellowship',
    location: 'Remote / Global Partner Organizations',
    isRemote: true,
    fundingAmount: '$80,000 Stipend + $10,000 Project Budget',
    deadline: '2026-10-25',
    description: 'Embedding technologists, cybersecurity specialists, and open web activists with civil society organizations fighting for digital human rights, privacy, and online safety.',
    eligibility: [
      'Demonstrated expertise in software development, data science, cybersecurity, or digital policy',
      'Passion for open source, privacy, and countering algorithmic discrimination',
      'Ability to collaborate effectively across multicultural and interdisciplinary teams'
    ],
    benefits: [
      '$80,000 USD stipend for 12 months full-time commitment',
      'Discretionary project & equipment allowance of $10,000',
      'Health insurance supplement and childcare stipend available upon request',
      'Mentorship from Mozilla\'s global research and public policy teams'
    ],
    applicationSteps: [
      'Review matching host organizations and their technical challenge briefs',
      'Submit statement of interest, CV, and GitHub / public work links',
      'Host organization interview and project plan co-design session',
      'Final fellowship confirmation and cohort kick-off retreat'
    ],
    applyUrl: 'https://foundation.mozilla.org/fellowships',
    tags: ['Mozilla', 'Digital Rights', 'Privacy', 'Remote', 'Fellowship'],
    featured: false,
    verified: true,
    educationLevel: 'Any / All Levels',
    createdAt: '2026-08-14',
    contactEmail: 'fellowships@mozillafoundation.org'
  },
  {
    id: 'opp-16',
    title: 'AI Startup Residency & Pre-Seed Accelerator',
    organization: 'Antler Global',
    orgLogo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=128&auto=format&fit=crop&q=80',
    category: 'Grants',
    type: '10-Week Founder Residency & Investment',
    location: 'New York, London, Singapore, or Berlin',
    isRemote: false,
    fundingAmount: '$150,000 - $250,000 Investment + Stipend',
    deadline: 'Rolling',
    description: 'Build your next tech venture from day zero. Antler pairs exceptional technologists, domain experts, and repeat operators to co-found startups and provides pre-seed capital.',
    eligibility: [
      'Experienced engineers, product leaders, researchers, or commercial domain specialists',
      'Ready to commit full-time to building a high-growth technology startup',
      'Solo founders or existing teams looking for institutional backing'
    ],
    benefits: [
      'Individual founder stipend during the initial 10-week matching residency',
      'Guaranteed investment committee pitch for $150k - $250k initial pre-seed check',
      'Access to proprietary Antler network of 8,000+ founders and 600+ global portfolio companies',
      'Dedicated office space in prime global innovation hubs'
    ],
    applicationSteps: [
      'Submit application detailing your unique spike and venture hypotheses',
      'Two 30-minute founder assessment interviews with Antler partners',
      'Acceptance into the upcoming residency cohort in your preferred city',
      'Co-founding phase, business validation, and Investment Committee presentation'
    ],
    applyUrl: 'https://www.antler.co',
    tags: ['Pre-Seed', 'Accelerator', 'Startups', 'Founders', 'Venture'],
    featured: true,
    verified: true,
    educationLevel: 'Any / All Levels',
    createdAt: '2026-08-27',
    contactEmail: 'apply@antler.co'
  }
];
