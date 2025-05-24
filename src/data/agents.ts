export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string;
  avatar: string;
  responses: string[];
}

export const agents: Agent[] = [
  {
    id: "cricket",
    name: "Emma Boundary",
    role: "Cricket Expert",
    description: "Passionate cricket analyst with deep knowledge of the game",
    color: "#4CAF50",
    avatar: "🏏",
    responses: [
      "Looking at the statistics, I'd say this is similar to the World Cup final of 2019. Let me break down the technical aspects...",
      "As someone who's analyzed thousands of matches, I believe we need to consider the pitch conditions here. Let's not forget that in cricket, context is everything.",
      "If we examine the history of this debate topic, it's similar to how test cricket evolved over time. Initially the approach was conservative, but data shows a more aggressive strategy yields better results.",
    ],
  },
  {
    id: "politician",
    name: "Senator Thompson",
    role: "Politician",
    description:
      "Experienced political figure with diplomatic communication skills",
    color: "#2196F3",
    avatar: "🏛️",
    responses: [
      "My constituents have consistently expressed concerns about this very issue. Let me be clear - we need a comprehensive approach that benefits all stakeholders.",
      "I respectfully disagree with my colleague. The facts clearly show that our proposed policy framework would address these concerns while maintaining fiscal responsibility.",
      "Let me say this - when I was working across the aisle on the bipartisan commission, we found that consensus building, while difficult, ultimately leads to the most sustainable solutions.",
    ],
  },
  {
    id: "reporter",
    name: "Taylor Facts",
    role: "News Reporter",
    description: "Objective journalist focused on factual reporting",
    color: "#FFC107",
    avatar: "📰",
    responses: [
      "Sources close to the situation have revealed that this debate has wider implications than previously reported. We're following this developing story closely.",
      "Breaking down the facts: According to our investigation, there are multiple perspectives that haven't been covered in mainstream discussions about this topic.",
      "This reminds me of a similar case I covered last year. The parallels are striking, and the data suggests we should be looking more closely at the underlying patterns.",
    ],
  },
  {
    id: "philosopher",
    name: "Dr. Sophia Wisdom",
    role: "Philosopher",
    description:
      "Contemplative thinker exploring deeper meanings and ethical implications",
    color: "#9C27B0",
    avatar: "🧠",
    responses: [
      "If we examine this from a Kantian perspective, we must consider the categorical imperative - would we want the maxim of our action to become a universal law?",
      "The existential implications here are profound. As Sartre might suggest, we are condemned to be free in making these choices, and that freedom carries tremendous responsibility.",
      "Perhaps we're asking the wrong question entirely. Instead of 'what should we do?' we might benefit from examining 'who should we be?' in relation to this matter.",
    ],
  },
  {
    id: "comedian",
    name: "Chuckles McGee",
    role: "Comedian",
    description: "Humorous commentator bringing levity to serious discussions",
    color: "#FF5722",
    avatar: "🎭",
    responses: [
      "Is it just me, or does this conversation remind anyone else of trying to explain TikTok to your grandparents? Everyone's using different languages but thinks they're talking about the same thing!",
      "Oh sure, that's a GREAT idea... and maybe afterwards we can also try solving world hunger with a bake sale! Look, I'm just saying we might need to adjust our expectations here.",
      "So what you're saying is... we've spent three hours debating something that could have been solved with a simple Google search? Classic humans, making things complicated since 10,000 BC!",
    ],
  },
];
