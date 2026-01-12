import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', variant = 'default', onClick }) => {
  const baseStyle = "rounded-2xl transition-all duration-300 overflow-hidden";
  
  const variants = {
    default: "bg-surface border border-white/5",
    elevated: "bg-surfaceLight shadow-xl shadow-black/40 translate-y-0 hover:-translate-y-1",
    glass: "bg-white/10 backdrop-blur-md border border-white/20",
  };

  return (
    <div 
      className={`${baseStyle} ${variants[variant]} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};