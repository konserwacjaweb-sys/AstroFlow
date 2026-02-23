import React from 'react';

interface HeroButtonsProps {
  onMakijazClick?: () => void;
  onUstaClick?: () => void;
}

export default function HeroButtons({ onMakijazClick, onUstaClick }: HeroButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <button
        onClick={onMakijazClick}
        className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 px-6 py-4 text-normal bg-secondary-600 text-white hover:bg-secondary-700"
        type="button"
      >
        Makijaz Permanentny
      </button>
      <button
        onClick={onUstaClick}
        className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 px-6 py-4 text-normal bg-primary-800 text-white hover:bg-primary-900"
        type="button"
      >
        Powiększanie Ust
      </button>
    </div>
  );
}
