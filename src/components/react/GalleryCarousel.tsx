import { useState } from 'react';

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

  const safeIndex = ((current % slides.length) + slides.length) % slides.length;

  const goTo = (index: number) => setCurrent(index);
  const prev = () => setCurrent((value) => value - 1);
  const next = () => setCurrent((value) => value + 1);

  return (
    <div className="w-full">
      <div className="relative overflow-hiddenshadow-sm">
        <img
          src={slides[safeIndex].src}
          alt={slides[safeIndex].alt}
          className="h-90 w-full object-cover"
          loading="eager"
        />
        <p className="px-4 py-4 text-center text-slate-900">{slides[safeIndex].description}</p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={prev}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 bg-white text-gray-800 transition-colors hover:bg-gray-100"
          aria-label="Poprzedni slajd"
        >
          <span aria-hidden="true">&#8249;</span>
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                index === safeIndex ? 'bg-gray-800' : 'bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label={`Przejdz do slajdu ${index + 1}`}
              aria-current={index === safeIndex}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 bg-white text-gray-800 transition-colors hover:bg-gray-100"
          aria-label="Nastepny slajd"
        >
          <span aria-hidden="true">&#8250;</span>
        </button>
      </div>
    </div>
  );
}
