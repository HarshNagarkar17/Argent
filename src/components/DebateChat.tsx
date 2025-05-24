import React, { useState, useEffect, useRef } from "react";
import { useDebate } from "../context/DebateContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Message from "./Message";
import AgentAvatar from "./AgentAvatar";
import { ArrowUp, Hash, MenuIcon } from "lucide-react";

const DebateChat: React.FC = () => {
  const {
    selectedAgents,
    messages,
    addMessage,
    topic,
    nextSelectedAgent,
    setNextSelectedAgent,
    setCurrentStage,
    updateMessageContent,
  } = useDebate();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Set default first agent if none selected
    if (!nextSelectedAgent && selectedAgents.length > 0) {
      setNextSelectedAgent(selectedAgents[0].id);
    }
  }, [nextSelectedAgent, selectedAgents, setNextSelectedAgent]);

  // Group messages by agent to determine if a message is first in its group
  const getIsFirstInGroup = (index: number) => {
    if (index === 0) return true;
    return messages[index].agentId !== messages[index - 1].agentId;
  };

  // Simulate agent response with a delay
  const handleAgentRespond = async () => {
    if (!nextSelectedAgent) return;

    const agent = selectedAgents.find((a) => a.id === nextSelectedAgent);
    if (!agent) return;

    setLoading(true);
    try {
      const controller = new AbortController();

      const response = await fetch(
        `http://localhost:3000/api/stream-sse/ceo_agent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: topic,
            threadId: "abc-123",
            threadMessages: messages,
          }),
          signal: controller.signal,
        }
      );

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      const messageId = addMessage("", agent.id);
      let fullMessage = ""; // <- move it here!

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop()!;

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.replace("data: ", "").trim();

          try {
            const parsed = JSON.parse(jsonStr);

            if (parsed.type === "chunk") {
              fullMessage += parsed.content;
              updateMessageContent(messageId, fullMessage);
            }

            if (parsed.type === "streaming_completed") {
              setLoading(false);
              return;
            }
          } catch (err) {
            console.error("Failed to parse SSE line:", jsonStr);
          }
        }
      }
    } catch (error) {
      console.error("Error streaming from agent:", error);
      setLoading(false);
    }
  };

  console.log({ messages });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="discord-header flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="md:hidden mr-2 text-[#dcddde]"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <MenuIcon size={20} />
          </button>
          <Hash size={20} className="text-[#72767d] mr-2" />
          <h3 className="font-semibold text-white truncate">
            {topic || "Debate Channel"}
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentStage("selection")}
          className="text-xs text-[#b9bbbe] hover:text-[#dcddde]"
        >
          New Debate
        </Button>
      </div>

      {/* Mobile Sidebar */}
      {showSidebar && (
        <div className="md:hidden absolute top-12 left-0 bottom-0 w-64 bg-[#2f3136] z-10 border-r border-[#202225]">
          <div className="p-2 text-sm text-[#72767d] font-medium">
            PARTICIPANTS
          </div>
          <div className="px-2 flex flex-col gap-1">
            {selectedAgents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center p-2 rounded hover:bg-[#36393f] cursor-pointer gap-2"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${agent.color}15`,
                    border: `1px solid ${agent.color}40`,
                  }}
                >
                  <span role="img" aria-label={agent.role}>
                    {agent.avatar}
                  </span>
                </div>
                <span className="text-[#dcddde] truncate">{agent.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div
        className="flex-grow overflow-y-auto bg-[#36393f] px-2"
        onClick={() => showSidebar && setShowSidebar(false)}
      >
        <div className="max-w-4xl mx-auto">
          {messages.map((message, index) => (
            <Message
              key={message.id}
              message={message}
              isFirstInGroup={getIsFirstInGroup(index)}
            />
          ))}
          {loading && (
            <div className="flex items-center px-4 py-2 text-[#72767d]">
              <div className="mr-2 text-sm">Someone is typing</div>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-[#72767d] rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-[#72767d] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1 h-1 bg-[#72767d] rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4"></div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#36393f] border-t border-[#202225]">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Select
            value={nextSelectedAgent}
            onValueChange={setNextSelectedAgent}
            disabled={loading}
          >
            <SelectTrigger className="discord-input bg-[#40444b] border-none w-48 text-sm flex-shrink-0">
              <SelectValue placeholder="Choose who responds" />
            </SelectTrigger>
            <SelectContent className="bg-[#2f3136] border-[#202225] text-[#dcddde]">
              {selectedAgents.map((agent) => (
                <SelectItem
                  key={agent.id}
                  value={agent.id}
                  className="focus:bg-[#5865f2] focus:text-white"
                >
                  <div className="flex items-center">
                    <span className="mr-2">{agent.avatar}</span>
                    <span>{agent.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex-1 rounded-md bg-[#40444b] flex items-center">
            <div className="flex-1 h-10 px-4 flex items-center">
              <span className="text-[#72767d]">
                Message will appear from selected agent...
              </span>
            </div>

            <Button
              onClick={handleAgentRespond}
              disabled={!nextSelectedAgent || loading}
              size="icon"
              className="rounded-full h-8 w-8 mr-2 bg-[#5865f2] hover:bg-[#4752c4] text-white"
            >
              <ArrowUp size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebateChat;
