import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <h1 className="text-3xl font-poppins font-semibold text-deep-purple">
        <span className="text-teal-blue">A</span>nga
      </h1>
    </div>
  );
};

export default Logo;