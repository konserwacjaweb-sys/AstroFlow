import { useState } from 'react';

interface SlideContent {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface SliderControlsProps {
  slides: SlideContent[];
}

export default function SliderControls({ slides }: SliderControlsProps) {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  return (
    <>
      {/* Wrapper - obok siebie na lg, pod sobą na mobile (karuzela na górze) */}
      <div className="flex flex-col-reverse lg:flex-row gap-1 lg:gap-0 w-full h-[400px] lg:h-[600px]">
        {/* Opis */}
        <div className="flex flex-col justify-center px-24 py-24 bg-[oklch(0.96_0_0/0.5)] rounded-3xl flex-1">
          <div className="space-y-4">
            <h3 className="text-slate-900 mb-8">
              {slides[activeSlide].title}
            </h3>
            
            <p className="text-slate-900 leading-relaxed">
              {slides[activeSlide].description}
            </p>
          </div>
        </div>

        {/* Karuzela */}
        <div className="flex flex-col gap-6 w-full flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {slides.map((slide, index) => {
              // Na mobile: tylko activeSlide
              // Na lg: activeSlide i następny
              const isActive = index === activeSlide;
              const isNext = index === (activeSlide + 1) % slides.length;
              
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}
                  className={`relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden transition-all duration-500 group ${
                    isActive 
                      ? '' 
                      : isNext 
                        ? 'hidden lg:block' 
                        : 'hidden'
                  }`}
                  style={{
                    backgroundImage: `url(${slide.imageSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  aria-label={`Wybierz ${slide.title}`}
                >
                  {/* Tytuł na dole */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/60 to-transparent">
                        <h4 className="text-white">
                      {slide.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Nawigacja - kropki - całkiem na dole */}
      <div className="flex gap-2 justify-center pt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`h-5 rounded-full transition-all duration-300 ${
              activeSlide === index
                ? 'bg-[#3b5b63] w-10'
                : 'bg-slate-300 hover:bg-slate-400 w-2'
            }`}
            aria-label={`Przejdź do slajdu ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}
