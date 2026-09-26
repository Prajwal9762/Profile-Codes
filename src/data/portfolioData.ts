export interface Project {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  features: string[];
  technologies: string[];
  githubUrl: string;
  projectUrl?: string;
  note?: string;
}

export interface LearningItem {
  name: string;
  category: string;
  notes: string;
}

export interface ExperimentTool {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  buttonLabel: string;
  toolUrl: string; // Configurable link: replace GITHUB_VIEWER_URL with deployed URL
  defaultUsername: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    tagline: string;
    shortBio: string;
    education: {
      degree: string;
      status: string;
    };
    aboutText: string[];
  };
  skillsAndTools: {
    languagesAndTech: string[];
    handsOnExperience: string[];
  };
  currentlyLearning: LearningItem[];
  projects: Project[];
  experiments: ExperimentTool[];
  socials: {
    github: {
      label: string;
      url: string;
      username: string;
    };
    linkedin: {
      label: string;
      url: string;
      username: string;
    };
    discord: {
      label: string;
      handle: string;
      serverOrProfileUrl?: string;
    };
    email: {
      label: string;
      address: string;
    };
  };
}

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Prajwal Pokharel',
    role: 'Student • Developer • Builder',
    tagline: 'Student • Developer • Builder',
    shortBio:
      'I enjoy coding, experimenting with new concepts, and building useful things from scratch.',
    education: {
      degree: 'BSc CSIT',
      status: 'Currently studying',
    },
    aboutText: [
      "Hi, I'm Prajwal Pokharel. I am a student and developer who genuinely enjoys building things, experimenting with code, and learning by actually getting hands-on with projects.",
      'I am currently studying BSc CSIT. Much of what I know comes from curiosity — diving into documentation, tinkering with scripts, building custom bots, and seeing what happens when you piece ideas together.',
      'Rather than claiming expertise or mastery, I focus on steady progress: writing cleaner code, understanding foundational concepts, and solving practical problems one step at a time.',
    ],
  },

  skillsAndTools: {
    languagesAndTech: [
      'Python',
      'C',
      'C++',
      'JavaScript',
      'Node.js',
      'HTML/CSS',
      'GitHub',
    ],
    handsOnExperience: [
      'Discord bot development',
      'Minecraft server/plugin work',
      'Graphic design with Adobe tools',
    ],
  },

  currentlyLearning: [
    {
      name: 'Python',
      category: 'Programming & Logic',
      notes: 'Deepening core knowledge, writing cleaner algorithms, and exploring practical scripting.',
    },
    {
      name: 'Web Development',
      category: 'Frontend & Full-stack Basics',
      notes: 'Practicing modern web standards, component structures, and responsive layouts.',
    },
    {
      name: 'Graphic Design',
      category: 'Design & Visuals',
      notes: 'Honing visual composition, typography, and asset creation using Adobe tools.',
    },
  ],

  projects: [
    {
      id: 'discord-bot-cody',
      title: 'Discord Bot Cody',
      tagline: 'Custom Discord bot built from scratch for server management and community interaction',
      description:
        'A Discord bot project I built while learning and experimenting with Discord bot development. It includes systems for moderation, automod, welcome messages, tickets, giveaways, levels, economy, and utility commands.',
      note: 'Built during hands-on learning and exploration. It represents real practical practice with asynchronous JavaScript, event handling, and bot APIs.',
      features: [
        'Moderation tools & command handling',
        'Automod system for filtering rules',
        'Customizable welcome messages',
        'Ticket support system',
        'Giveaway management',
        'User leveling & XP system',
        'Virtual economy mechanics',
        'Everyday server utility commands',
      ],
      technologies: ['JavaScript', 'Node.js', 'Discord API'],
      githubUrl: 'https://github.com/Prajwal9762/Cody',
      projectUrl: '',
    },
  ],

  experiments: [
    {
      id: 'github-profile-viewer',
      title: 'GitHub Profile Viewer',
      tagline: 'GitHub REST API Tool',
      description:
        'A small tool built using the GitHub API to display public GitHub profile information.',
      buttonLabel: 'View Tool →',
      toolUrl: 'GITHUB_VIEWER_URL', // Easy to replace after deploying the tool
      defaultUsername: 'Prajwal9762',
    },
  ],

  socials: {
    github: {
      label: 'GitHub',
      url: 'https://github.com/Prajwal9762',
      username: '@Prajwal9762',
    },
    linkedin: {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/prajwal-pokharel-1a77b943a/',
      username: 'prajwal-pokharel',
    },
    discord: {
      label: 'Discord',
      handle: 'prajwal9762',
      serverOrProfileUrl: 'https://discord.com',
    },
    email: {
      label: 'Email',
      address: 'prajwalpokharel5@gmail.com',
    },
  },
};
