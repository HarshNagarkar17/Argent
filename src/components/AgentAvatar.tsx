
import React from 'react';
import { Agent } from '../data/agents';
import { cn } from '@/lib/utils';

interface AgentAvatarProps {
  agent: Agent;
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  showStatus?: boolean;
}

export const AgentAvatar: React.FC<AgentAvatarProps> = ({ 
  agent, 
  size = 'md',
  selected = false,
  showStatus = false
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-10 h-10 text-xl',
    lg: 'w-14 h-14 text-2xl'
  };

  const statusColor = agent.id === 'user' ? '#43b581' : '#747f8d'; // Online for user, idle for agents

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full transition-all duration-150',
        sizeClasses[size],
        selected ? 'ring-2 ring-offset-2 ring-offset-[#2f3136]' : 'opacity-90 hover:opacity-100'
      )}
      style={{ 
        backgroundColor: `${agent.color}20`,
        borderColor: agent.color,
        boxShadow: selected ? `0 0 0 2px ${agent.color}40` : 'none'
      }}
    >
      <span role="img" aria-label={agent.role} className="select-none">
        {agent.avatar}
      </span>
      
      {showStatus && (
        <div 
          className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2f3136]" 
          style={{ backgroundColor: statusColor }}
        ></div>
      )}
    </div>
  );
};

export default AgentAvatar;
