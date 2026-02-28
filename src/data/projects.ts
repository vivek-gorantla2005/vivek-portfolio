export interface Project {
    id: string;
    title: string;
    stack: string[];
    description: string;
    link: string;
    github: string;
    video: string;
}

export const projects: Project[] = [
    {
        id: 'ai-website-builder',
        title: 'AI Website Builder SaaS',
        stack: ['Next.js', 'Node.js', 'Docker', 'E2B Sandbox', 'Gemini API', 'Tailwind CSS'],
        description:
            'AI-powered SaaS platform that generates production-ready React + Tailwind websites from user prompts. Features agent-based tool calling, live preview injection, and reusable sandbox containers for scalable code execution.',
        link: '',
        github: 'https://github.com/vivek-gorantla2005/vibeCreation',
        video: '/videos/vibecreation.mp4'
    },
    {
        id: 'pdf-rag-system',
        title: 'Scalable PDF RAG System',
        stack: ['Node.js', 'BullMQ', 'Redis', 'Gemini API', 'Vector Embeddings', 'Socket.IO'],
        description:
            'Distributed Retrieval-Augmented Generation (RAG) system enabling intelligent Q&A over PDFs. Implements semantic chunking, embedding-based retrieval, async job processing, and real-time streaming responses via WebSockets.',
        link: '',
        github: 'https://github.com/vivek-gorantla2005/pdf-whisper-server',
        video: '/videos/pdfrag.mp4'
    },
    {
        id: 'ai-social-platform',
        title: 'AI-Powered Social Media Platform',
        stack: ['Node.js', 'PostgreSQL', 'MongoDB', 'Kafka', 'Redis', 'WebSockets'],
        description:
            'Scalable microservices-based social platform with real-time chat, Kafka-driven notification engine, Redis caching, and AI-powered features including daily message summaries, mood detection, and journaling insights.',
        link: '',
        github: 'https://github.com/vivek-gorantla2005/orbit',
        video: '/videos/socialmedia.mp4'
    },
    {
        id: 'lead-ai',
        title: 'Lead AI – Autonomous Lead Management System',
        stack: [
            'Node.js',
            'Gemini / LLMs',
            'Google Search API',
            'Cheerio',
            'Twilio',
            'MongoDB',
            'Agent Orchestration'
        ],
        description:
            'Fully autonomous AI system that discovers, contacts, qualifies, scores, and follows up with leads without human involvement. Implements multi-agent orchestration for discovery, multilingual voice/email outreach, intent detection, real-time scoring, automated follow-ups, and CRM updates.',
        link: '',
        github: 'https://github.com/vivek-gorantla2005/agentflow-leads',
        video: '/videos/hackathon_project.mp4'
    }
];