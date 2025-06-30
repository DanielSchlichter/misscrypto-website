import React from 'react';
import Link from 'next/link';

export const navigationItems = [
  { name: 'Start', href: '/' },
  { name: 'Investieren', href: '/investieren' },
  { name: 'Trading', href: '/trading' },
  { name: 'Börsen', href: '/boersen' },
  { name: 'Prognosen', href: '/prognosen' },
  { name: 'Vergleiche', href: '/vergleiche' },
];

interface NavigationProps {
  className?: string;
  linkClassName?: string;
  onLinkClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  className = '', 
  linkClassName = '', 
  onLinkClick 
}) => {
  return (
    <nav className={className}>
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={linkClassName}
          onClick={onLinkClick}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation; 