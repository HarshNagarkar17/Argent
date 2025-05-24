
import React from 'react';
import { DebateProvider } from '../context/DebateContext';
import { useDebate } from '../context/DebateContext';
import AgentSelector from '../components/AgentSelector';
import TopicInput from '../components/TopicInput';
import DebateChat from '../components/DebateChat';

const DiscordLogo = () => (
  <div className="flex items-center gap-2 py-4 px-4 border-b border-[#202225]">
    <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-semibold">
      D
    </div>
    <span className="font-bold text-white">DebateBot</span>
  </div>
);

const DebateApp: React.FC = () => {
  const { currentStage, selectedAgents } = useDebate();
  
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {currentStage === 'debate' && (
        <div className="discord-sidebar hidden md:flex flex-col h-full">
          <DiscordLogo />
          <div className="p-2 text-sm text-[#72767d] font-medium">PARTICIPANTS</div>
          <div className="px-2 flex flex-col gap-1 overflow-y-auto">
            {selectedAgents.map((agent) => (
              <div key={agent.id} className="flex items-center p-2 rounded hover:bg-[#36393f] cursor-pointer gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${agent.color}15`, border: `1px solid ${agent.color}40` }}
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
      
      <div className="flex-1 flex flex-col h-full">
        {currentStage === 'selection' && <AgentSelector />}
        {currentStage === 'topic' && <TopicInput />}
        {currentStage === 'debate' && <DebateChat />}
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <DebateProvider>
      <div className="h-screen bg-[#36393f] text-[#dcddde] font-inter antialiased overflow-hidden">
        <DebateApp />
      </div>
    </DebateProvider>
  );
};

export default Index;
