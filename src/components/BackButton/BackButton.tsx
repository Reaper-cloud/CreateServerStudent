'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  href?: string;
  children?: React.ReactNode;
  label?: string; // Добавляем опциональный пропс label
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  href, 
  children,
  label 
}) => {
  const router = useRouter();

  // Определяем отображаемый текст
  const displayText = children || label || 'Назад';

  if (href) {
    return (
      <Link 
        href={href}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <span className="mr-2">←</span>
        {displayText}
      </Link>
    );
  }

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
    >
      <span className="mr-2">←</span>
      {displayText}
    </button>
  );
};