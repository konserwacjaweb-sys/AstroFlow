import { useState } from 'react';
import { useSwipeNavigation } from './useSwipeNavigation';

interface SlideContent {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface SliderControlsProps {
  slides: SlideContent[];
  showContentColumn?: boolean;
  showImageCaption?: boolean;
}

export default function SliderControls({
  slides,
  showContentColumn = true,
  showImageCaption = true
}: SliderControlsProps) {
  if (slides.length === 0) {
    return null;
  }

  const [activeSlide, setActiveSlide] = useState<number>(0);
  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };
  const prevSlide = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };
  const { ref: swipeRef, ...swipeBindings } = useSwipeNavigation({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide
  });

  const slideRedirects: Record<number, string> = {
    1: '/wioleta-literska-makijaz-permanentny',
    2: '/wiktoria-literska-makijaz'
  };

  const activeRedirect = slideRedirects[slides[activeSlide].id] ?? '#';

  return (
    <>
      <div
        ref={swipeRef}
        data-slider
        className={`flex w-full gap-4 select-none ${
          showContentColumn ? 'flex-col-reverse lg:flex-row lg:gap-6' : 'flex-col items-center'
        }`}
        {...swipeBindings}
      >
        {showContentColumn ? (
          <div className="flex flex-1 flex-col justify-start rounded-sm bg-[oklch(0.96_0_0/0.5)] px-8 py-10 lg:px-16 lg:py-16">
            <div className="space-y-4">
              <h3 className="mb-8 font-notoDisplay text-4xl text-slate-900">{slides[activeSlide].title}</h3>
              <p className="leading-relaxed text-slate-900">{slides[activeSlide].description}</p>
              <a
                href={activeRedirect}
                className="mt-4 inline-flex items-center justify-center rounded-sm border-2 border-slate-900  px-6 py-3 font-normal uppercase tracking-wide text-slate-900 transition-colors hover:bg-[#999173]/90"
              >
                Zobacz więcej
              </a>
            </div>
          </div>
        ) : null}

        <div className={`flex w-full flex-col gap-6 ${showContentColumn ? 'lg:w-auto lg:flex-none' : 'items-center'}`}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[repeat(2,370px)] lg:gap-6">
            {slides.map((slide, index) => {
              const isActive = index === activeSlide;
              const isNext = index === (activeSlide + 1) % slides.length;

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}
                  className={`group relative h-95 w-full overflow-hidden rounded-sm transition-all duration-700 lg:h-130 ${
                    isActive ? '' : isNext ? 'hidden lg:block' : 'hidden'
                  }`}
                  aria-label={`Wybierz ${slide.title}`}
                >
                  <img
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    className="h-full w-full object-cover"
                    loading={isActive ? 'eager' : 'lazy'}
                    fetchPriority={isActive ? 'high' : 'auto'}
                    decoding="async"
                  />
                  {showImageCaption ? (
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-6">
                      <h4 className="text-white font-notoDisplay text-2xl">{slide.title}</h4>
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 pt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveSlide(index)}
            className={`h-2.5 rounded-full transition-all ${
              activeSlide === index ? 'w-8 bg-[#999173]' : 'w-2.5 bg-[#999173]/50'
            }`}
            aria-label={`Przejdz do slajdu ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}
