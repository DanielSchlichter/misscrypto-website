import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  iconClassName = '', 
  textClassName = '' 
}) => {
  return (
    <Link href="/" className={className}>
      <div className={iconClassName}>
        <Image
          src="https://misscrypto.de/wp-content/uploads/2024/07/Logo-weiss.webp"
          alt="MissCrypto Logo"
          width={120}
          height={40}
          className="h-8 w-auto md:h-10"
          priority
        />
      </div>
    </Link>
  );
};

export default Logo; 