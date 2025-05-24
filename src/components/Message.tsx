
import React from 'react';
import { Message as MessageType } from '../context/DebateContext';
import { Agent, agents } from '../data/agents';
import AgentAvatar from './AgentAvatar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface MessageProps {
  message: MessageType;
  isFirstInGroup?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isFirstInGroup = true }) => {
  const agent = agents.find(a => a.id === message.agentId) || {
    id: 'user',
    name: 'You',
    role: 'User',
    description: 'Your opinion',
    color: '#7289DA',
    avatar: '👤',
    responses: []
  };
  
  const isUserMessage = agent.id === 'user';
  const timestamp = format(message.timestamp, 'HH:mm');

  return (
    <div className={cn(
      "group flex py-1 hover:bg-[#32353b] transition-colors duration-200",
      isFirstInGroup ? "pt-2" : "pt-0"
    )}>
      {isFirstInGroup && (
        <div className="flex-shrink-0 w-14 flex justify-center pt-1">
          <AgentAvatar agent={agent} size="sm" showStatus={agent.id === 'user'} />
        </div>
      )}
      {!isFirstInGroup && <div className="flex-shrink-0 w-14"></div>}
      
      <div className={cn(
        "flex-1 min-w-0 pr-6",
        !isFirstInGroup ? "pl-0" : ""
      )}>
        {isFirstInGroup && (
          <div className="flex items-baseline mb-1">
            <span 
              className="font-medium text-sm mr-2" 
              style={{ color: agent.color }}
            >
              {agent.name}
            </span>
            <span className="text-xs text-[#72767d]">
              {agent.id !== 'user' && agent.role} • {timestamp}
            </span>
          </div>
        )}
        
        <div className="text-[#dcddde] break-words whitespace-pre-wrap pr-10">
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default Message;
