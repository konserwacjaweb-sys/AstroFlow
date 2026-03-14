import { useEffect, useState } from 'react';
import { useSwipeNavigation } from './useSwipeNavigation';

type Slide = {
  src: string;
  alt: string;
  description: string;
};

type Props = {
  slides: Slide[];
};

export default function GalleryCarousel({ slides }: Props) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const safeIndex = ((current % slides.length) + slides.length) % slides.length;
  const secondIndex = ((safeIndex + 1) % slides.length + slides.length) % slides.length;
  const visibleIndexes = slides.length > 1 ? [safeIndex, secondIndex] : [safeIndex];

  const goTo = (index: number) => setCurrent(index);
  const prev = () => setCurrent((value) => value - 1);
  const next = () => setCurrent((value) => value + 1);
  const { ref: swipeRef, ...swipeBindings } = useSwipeNavigation({
    onSwipeLeft: next,
    onSwipeRight: prev
  });

  useEffect(() => {
    if (slides.length <= 1 || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setCurrent((value) => value + 1);
    }, 8500);

    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  return (
    <div
      ref={swipeRef}
      data-carousel
      className="w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      {...swipeBindings}
    >
      <div className="mx-auto grid w-full max-w-205 grid-cols-1 justify-items-center gap-4 md:grid-cols-2">
        {visibleIndexes.map((index, visiblePosition) => (
          <img
            key={`${slides[index].src}-${visiblePosition}`}
            src={slides[index].src}
            alt={slides[index].alt}
            className={`h-125 w-full max-w-100 rounded-sm object-cover ${
              visiblePosition === 1 ? 'hidden md:block' : ''
            }`}
            loading={visiblePosition === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center">
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2.5 w-5.5 rounded-full transition-all ${
                index === safeIndex ? 'bg-[#0e0e0d]' : 'bg-[#baa586] hover:bg-[#baa586]/70'
              }`}
              aria-label={`Przejdz do slajdu ${index + 1}`}
              aria-current={index === safeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
