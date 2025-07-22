import React from 'react';
import metaTraderLogoPath from '../assets/metatrader5-logo.png';
import pocketOptionLogoPath from '../assets/pocketoption-logo.png';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const MetaTrader5Logo: React.FC<LogoProps> = ({ 
  className = "", 
  width = 40, 
  height = 40 
}) => {
  return (
    <img 
      src={metaTraderLogoPath} 
      alt="MetaTrader 5 Logo" 
      width={width} 
      height={height}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};

export const PocketOptionLogo: React.FC<LogoProps> = ({ 
  className = "", 
  width = 40, 
  height = 40 
}) => {
  return (
    <img 
      src={pocketOptionLogoPath} 
      alt="Pocket Option Logo" 
      width={width} 
      height={height}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};