import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  style = {},
}) => {
  return (
    <BootstrapButton
      onClick={onClick}
      variant={variant}
      className={className}
      style={style}
    >
      {children}
    </BootstrapButton>
  );
}; 