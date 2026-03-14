import { useEffect, useRef, useState } from 'react';
import { useSwipeNavigation } from './useSwipeNavigation';

type Slide = {
  src: string;
  alt: string;
  description: string;
};

type Props = {
  slides: Slide[];
};

export default function GalleryContentSlider({ slides }: Props) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const safeIndex = ((current % slides.length) + slides.length) % slides.length;

  const goTo = (index: number) => setCurrent(index);
  const prev = () => setCurrent((value) => value - 1);
  const next = () => setCurrent((value) => value + 1);

  const {
    ref: swipeRef,
    onTouchStart: _hookTouchStart,
    onTouchEnd: _hookTouchEnd,
    onTouchCancel: _hookTouchCancel,
    ...swipeBindings
  } = useSwipeNavigation({
    onSwipeLeft: next,
    onSwipeRight: prev
  });

  const onTouchStart: React.TouchEventHandler<HTMLElement> = (event) => {
    const touch = event.touches[0];
    if (!touch) {
      return;
    }

    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchMove: React.TouchEventHandler<HTMLElement> = (event) => {
    const start = touchStart.current;
    const touch = event.touches[0];
    if (!start || !touch) {
      return;
    }

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
      event.preventDefault();
    }
  };

  const onTouchEnd: React.TouchEventHandler<HTMLElement> = (event) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    if (!start || !touch) {
      touchStart.current = null;
      return;
    }

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    touchStart.current = null;

    if (Math.abs(deltaX) < 24 || Math.abs(deltaY) > 120) {
      return;
    }

    if (deltaX < 0) {
      next();
      return;
    }

    prev();
  };

  const onTouchCancel: React.TouchEventHandler<HTMLElement> = () => {
    touchStart.current = null;
  };

  useEffect(() => {
    if (slides.length <= 1 || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setCurrent((value) => value + 1);
    }, 8500);

    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  const activeSlide = slides[safeIndex];

  return (
    <div
      ref={swipeRef}
      data-slider
      className="w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
      {...swipeBindings}
    >
      <article className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 rounded-sm bg-white/80 p-4 sm:p-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
        <img
          src={activeSlide.src}
          alt={activeSlide.alt}
          className="h-80 w-full rounded-sm object-cover sm:h-96"
          loading="eager"
        />

        <div className="flex flex-col gap-4 px-1 sm:px-2">
          <p className="font-poppins text-xs uppercase tracking-[0.35em] text-[#baa586]">Slider oferty</p>
          <p className="text-xl leading-relaxed text-slate-900 sm:text-2xl">{activeSlide.description}</p>

          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#baa586]/50 text-[#7f6e52] transition-colors hover:bg-[#baa586]/15"
              aria-label="Poprzedni slajd"
            >
              <span aria-hidden="true" className="text-2xl leading-none">&#8249;</span>
            </button>

            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === safeIndex ? 'w-8 bg-[#0e0e0d]' : 'w-2.5 bg-[#baa586]/60 hover:bg-[#baa586]'
                  }`}
                  aria-label={`Przejdz do slajdu ${index + 1}`}
                  aria-current={index === safeIndex}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#baa586]/50 text-[#7f6e52] transition-colors hover:bg-[#baa586]/15"
              aria-label="Nastepny slajd"
            >
              <span aria-hidden="true" className="text-2xl leading-none">&#8250;</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
