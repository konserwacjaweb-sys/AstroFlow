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
      {/* Lewa kolumna - dynamiczna treść */}
      <div className="flex flex-col justify-center p-8 lg:p-12 bg-white rounded-3xl shadow-xl border border-slate-100">
        <div className="space-y-6">
          <div className="inline-block">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-4 py-2 rounded-full">
              Nasze Usługi
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 leading-tight transition-all duration-300">
            {slides[activeSlide].title}
          </h2>
          
          <p className="text-lg text-slate-600 leading-relaxed transition-all duration-300">
            {slides[activeSlide].description}
          </p>
          
          <div className="pt-4">
            <a
              href="/uslugi"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Dowiedz się więcej
              <svg 
                className="ml-2 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </a>
          </div>

          {/* Wskaźniki (kropki) */}
          <div className="flex gap-3 pt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === index 
                    ? 'w-12 bg-blue-600' 
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Przejdź do slajdu ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Prawa kolumna - klikalne karty */}
      <div className="grid grid-cols-2 gap-4 lg:gap-6 auto-rows-fr">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setActiveSlide(index)}
            className={`group relative h-full rounded-3xl overflow-hidden transition-all duration-500 transform hover:scale-[1.02] ${
              activeSlide === index 
                ? 'ring-4 ring-blue-600 shadow-2xl' 
                : 'shadow-lg hover:shadow-xl'
            }`}
            style={{
              backgroundImage: `url(${slide.imageSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            aria-label={`Wybierz ${slide.title}`}
          >
            {/* Overlay gradient - subtlejszy aby obraz był lepiej widoczny */}
            <div className={`absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent transition-opacity duration-300 ${
              activeSlide === index ? 'opacity-50' : 'opacity-60 group-hover:opacity-55'
            }`} />
            

              {/* Tytuł na dole */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className={`font-bold text-white transition-all duration-300 ${
                  activeSlide === index 
                    ? 'text-xl lg:text-2xl' 
                    : 'text-lg lg:text-xl'
                }`}>
                  {slide.title}
                </h3>
              </div>
          </button>
        ))}
      </div>
    </>
  );
}
