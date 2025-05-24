import React, { createContext, useContext, useState, ReactNode } from "react";
import { AgentType } from "../data/agents";

export interface Message {
  id: string;
  content: string;
  agentId: string;
  timestamp: Date;
}

interface DebateContextType {
  selectedAgents: AgentType[];
  toggleAgentSelection: (agent: AgentType) => void;
  topic: string;
  setTopic: (topic: string) => void;
  userOpinion: string;
  setUserOpinion: (opinion: string) => void;
  messages: Message[];
  addMessage: (content: string, agentId: string) => string;
  currentStage: "selection" | "topic" | "debate";
  setCurrentStage: (stage: "selection" | "topic" | "debate") => void;
  canAdvance: boolean;
  nextSelectedAgent: string;
  setNextSelectedAgent: (agentId: string) => void;
  updateMessageContent: (id: string, content: string) => void;
  clearSelectedAgents: () => void;
}

const DebateContext = createContext<DebateContextType | undefined>(undefined);

export const DebateProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAgents, setSelectedAgents] = useState<AgentType[]>([]);
  const [topic, setTopic] = useState("");
  const [userOpinion, setUserOpinion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStage, setCurrentStage] = useState<
    "selection" | "topic" | "debate"
  >("selection");
  const [nextSelectedAgent, setNextSelectedAgent] = useState<string>("");

  const toggleAgentSelection = (agent: AgentType) => {
    if (selectedAgents.some((a) => a.id === agent.id)) {
      setSelectedAgents(selectedAgents.filter((a) => a.id !== agent.id));
    } else if (selectedAgents.length < 5) {
      setSelectedAgents([...selectedAgents, agent]);
    }
  };

  const addMessage = (content: string, agentId: string) => {
    const id = Date.now().toString();
    const newMessage: Message = {
      id,
      content,
      agentId,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return id; // Return message ID so we can update it later
  };

  const updateMessageContent = (id: string, newContent: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, content: newContent } : msg
      )
    );
  };

  const clearSelectedAgents = () => {
    setSelectedAgents([]);
    setCurrentStage("selection");
    setTopic("");
    setUserOpinion("");
    setMessages([]);
    setNextSelectedAgent("");
  };

  // Determine if we can advance to the next stage
  const canAdvance =
    (currentStage === "selection" && selectedAgents.length >= 2) ||
    (currentStage === "topic" && topic.trim() !== "");

  return (
    <DebateContext.Provider
      value={{
        selectedAgents,
        toggleAgentSelection,
        updateMessageContent,
        topic,
        setTopic,
        userOpinion,
        setUserOpinion,
        messages,
        addMessage,
        currentStage,
        setCurrentStage,
        canAdvance,
        nextSelectedAgent,
        setNextSelectedAgent,
        clearSelectedAgents,
      }}
    >
      {children}
    </DebateContext.Provider>
  );
};

export const useDebate = () => {
  const context = useContext(DebateContext);
  if (!context) {
    throw new Error("useDebate must be used within a DebateProvider");
  }
  return context;
};
