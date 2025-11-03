// src/components/BackButton/BackButton.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  href?: string;
  children: React.ReactNode;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  href, 
  children = 'Назад' 
}) => {
  const router = useRouter();

  if (href) {
    return (
      <Link 
        href={href}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
      >
        <span className="mr-2">←</span>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
    >
      <span className="mr-2">←</span>
      {children}
    </button>
  );
};