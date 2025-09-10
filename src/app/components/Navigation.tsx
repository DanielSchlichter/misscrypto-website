import React from 'react';
import Link from 'next/link';

export const navigationItems = [
  { name: 'Start', href: '/' },
  { name: 'Krypto kaufen', href: '/krypto-kaufen' },
  { name: 'Sparplanrechner', href: '/sparplanrechner' },
  { name: 'Krypto-Lexikon', href: '/lexikon' },
  { name: 'Wallets', href: '/wallets' },
  { name: 'Newsfeed', href: '/newsfeed' },
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