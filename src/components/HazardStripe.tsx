import React from 'react';

export const HazardStripe: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`tq-hazard-thin w-full ${className}`} role="presentation" />;
};
