
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDebate } from '../context/DebateContext';
import { agents } from '../data/agents';
import AgentAvatar from './AgentAvatar';
import { cn } from '@/lib/utils';
import { Hash } from 'lucide-react';

const AgentSelector: React.FC = () => {
  const { selectedAgents, toggleAgentSelection, canAdvance, setCurrentStage } = useDebate();

  return (
    <div className="h-screen overflow-y-auto bg-[#36393f]">
      {/* Discord-style header */}
      <div className="discord-header flex items-center">
        <Hash size={20} className="text-[#72767d] mr-2" />
        <h3 className="font-semibold text-white">Agent Selection</h3>
      </div>
      
      <div className="container max-w-4xl py-6 px-4 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-3 text-white">Select Your Debate Agents</h1>
          <p className="text-[#b9bbbe]">Choose 2-5 agents with different perspectives for your debate</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {agents.map(agent => {
            const isSelected = selectedAgents.some(a => a.id === agent.id);
            
            return (
              <Card 
                key={agent.id}
                className={cn(
                  "cursor-pointer bg-[#2f3136] border-2 hover:bg-[#36393f] transition-all duration-200",
                  isSelected ? `border-[${agent.color}]` : "border-[#202225]"
                )}
                onClick={() => toggleAgentSelection(agent)}
                style={{ borderColor: isSelected ? agent.color : '#202225' }}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="font-bold text-white" style={{ color: agent.color }}>
                      {agent.name}
                    </CardTitle>
                    {isSelected && (
                      <div className="bg-[#5865f2] text-white text-xs px-2 py-1 rounded-full">
                        Selected
                      </div>
                    )}
                  </div>
                  <CardDescription className="text-[#b9bbbe]">{agent.role}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-4">
                  <AgentAvatar agent={agent} size="lg" selected={isSelected} />
                </CardContent>
                <CardFooter className="text-center text-sm">
                  <p className="text-[#72767d]">{agent.description}</p>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="flex flex-col items-center">
          <p className="text-[#b9bbbe] text-sm mb-3">
            {selectedAgents.length > 0 ? (
              <>
                Selected {selectedAgents.length} agent{selectedAgents.length !== 1 ? 's' : ''}
                {selectedAgents.length >= 2 && selectedAgents.length <= 5 ? ' - Good to go!' : ''}
                {selectedAgents.length > 5 ? ' - Too many agents!' : ''}
                {selectedAgents.length === 1 ? ' - Please select at least one more' : ''}
              </>
            ) : (
              'Please select at least 2 agents'
            )}
          </p>
          <Button 
            className="w-full max-w-xs bg-[#5865f2] hover:bg-[#4752c4] text-white"
            disabled={!canAdvance}
            onClick={() => setCurrentStage('topic')}
          >
            Continue to Topic Selection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgentSelector;
