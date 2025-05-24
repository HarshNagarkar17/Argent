import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDebate } from "../context/DebateContext";
import { Hash, ArrowLeft } from "lucide-react";

const TopicInput: React.FC = () => {
  const {
    topic,
    setTopic,
    userOpinion,
    setUserOpinion,
    canAdvance,
    setCurrentStage,
    selectedAgents,
    addMessage,
  } = useDebate();

  const handleStartDebate = () => {
    if (topic.trim() === "") return;
    addMessage(`Topic: ${topic}\n\nMy opinion: ${userOpinion}`, "user");
    setCurrentStage("debate");
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#36393f]">
      {/* Discord-style header */}
      <div className="discord-header flex items-center">
        <Hash size={20} className="text-[#72767d] mr-2" />
        <h3 className="font-semibold text-white">Topic Selection</h3>
      </div>

      <div className="container max-w-2xl py-6 px-4 animate-fade-in">
        <Card className="border-[#202225] bg-[#2f3136] shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-white">
              What would you like to debate?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="topic"
                className="text-sm font-medium text-[#dcddde]"
              >
                Debate Topic
              </label>
              <Input
                id="topic"
                placeholder="e.g., Should AI development be regulated?"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="discord-input"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="opinion"
                className="text-sm font-medium text-[#dcddde]"
              >
                Your Opinion (Optional)
              </label>
              <Textarea
                id="opinion"
                placeholder="Share your thoughts on this topic..."
                value={userOpinion}
                onChange={(e) => setUserOpinion(e.target.value)}
                className="discord-input min-h-[120px] resize-none"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white"
              disabled={!canAdvance}
              onClick={handleStartDebate}
            >
              Start Debate with {selectedAgents.length} Agents
            </Button>
            <Button
              variant="ghost"
              onClick={() => setCurrentStage("selection")}
              className="text-sm text-[#b9bbbe] hover:text-[#dcddde] hover:bg-[#36393f]"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Agent Selection
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TopicInput;
