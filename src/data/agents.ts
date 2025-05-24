export type AgentType = {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string;
  avatar: string;
};

export const allAgents: AgentType[] = [
  {
    id: "ceo_agent",
    name: "Ava Grant",
    role: "CEO",
    description:
      "Visionary business leader with a sharp eye for market trends and strategic insights.",
    color: "#4CAF50",
    avatar: "💼",
  },
  {
    id: "senator_agent",
    name: "Julian Cross",
    role: "Senator",
    description:
      "Seasoned politician skilled in public policy, governance, and persuasive diplomacy.",
    color: "#2196F3",
    avatar: "🏛️",
  },
  {
    id: "reporter_agent",
    name: "Taylor Facts",
    role: "News Reporter",
    description:
      "Objective journalist dedicated to uncovering truth and delivering fact-based reporting.",
    color: "#FFC107",
    avatar: "📰",
  },
  {
    id: "philosopher_agent",
    name: "Ved Arora",
    role: "Philosopher",
    description:
      "Deep thinker questioning assumptions and exploring the moral core of complex issues.",
    color: "#9C27B0",
    avatar: "🧠",
  },
  {
    id: "actor_agent",
    name: "Mira Vance",
    role: "Actor",
    description:
      "Expressive storyteller using humor, drama, and empathy to reframe conversations.",
    color: "#FF5722",
    avatar: "🎭",
  },
];
