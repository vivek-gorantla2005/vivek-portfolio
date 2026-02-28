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
        video: 'https://res.cloudinary.com/dx1rpbut6/video/upload/v1772266100/Small_update_on_VibeCreation_Shipping_consistently._Here_s_what_s_new___Added_custom_agent_memory__The_AI_now_remembers_context_better_making_generations_smarter_and_more_personalized.____Vivek_G._x9zglk.mp4'
    },
    {
        id: 'pdf-rag-system',
        title: 'Scalable PDF RAG System',
        stack: ['Node.js', 'BullMQ', 'Redis', 'Gemini API', 'Vector Embeddings', 'Socket.IO'],
        description:
            'Distributed Retrieval-Augmented Generation (RAG) system enabling intelligent Q&A over PDFs. Implements semantic chunking, embedding-based retrieval, async job processing, and real-time streaming responses via WebSockets.',
        link: '',
        github: 'https://github.com/vivek-gorantla2005/pdf-whisper-server',
        video: 'https://res.cloudinary.com/dx1rpbut6/video/upload/v1772266102/Built_a_scalable_PDF_RAG_system_with_Google_Gemini_and_Socket.IO___Vivek_G._posted_on_the_topic___LinkedIn_r7pra4.mp4'
    },
    {
        id: 'ai-social-platform',
        title: 'AI-Powered Social Media Platform',
        stack: ['Node.js', 'PostgreSQL', 'MongoDB', 'Kafka', 'Redis', 'WebSockets'],
        description:
            'Scalable microservices-based social platform with real-time chat, Kafka-driven notification engine, Redis caching, and AI-powered features including daily message summaries, mood detection, and journaling insights.',
        link: '',
        github: 'https://github.com/vivek-gorantla2005/orbit',
        video: 'https://res.cloudinary.com/dx1rpbut6/video/upload/v1772266105/AI-powered_social_media_app_with_real-time_features___Vivek_G._posted_on_the_topic___LinkedIn_dc5hmn.mp4'
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
        video: 'https://res.cloudinary.com/dx1rpbut6/video/upload/v1772266711/hackathon_project_1_n2wzw1.mp44'
    }
];