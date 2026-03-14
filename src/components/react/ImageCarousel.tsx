import { useEffect, useState } from 'react';
import { useSwipeNavigation } from './useSwipeNavigation';

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
    description: string;
  }[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  if (images.length === 0) {
    return null;
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((current) => (current - 1 + images.length) % images.length);
  };
  const { ref: swipeRef, ...swipeBindings } = useSwipeNavigation({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide
  });

  useEffect(() => {
    if (images.length <= 1 || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % images.length);
    }, 8500);

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  return (
    <div
      ref={swipeRef}
      data-carousel
      className="w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      {...swipeBindings}
    >
      <div className="mx-auto relative">

        {/* Karuzela bez ramek */}
        <div className="relative h-100 overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover"
                loading={currentSlide === index ? 'eager' : 'lazy'}
                fetchPriority={currentSlide === index ? 'high' : 'auto'}
                decoding="async"
              />
            </div>
          ))}
        </div>
        
        {/* Strzałki bez tła */}
        <button 
          onClick={prevSlide}
          className="absolute -left-14 top-1/2 -translate-y-1/2 z-30 p-2 transition-transform hover:scale-110" 
          aria-label="Previous slide"
        >
          <svg className="h-6.25 w-6.25" fill="white" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button onClick={nextSlide} className="absolute -right-14 top-1/2 -translate-y-1/2 z-30 p-2 transition-transform hover:scale-110" aria-label="Next slide"
        >
          <svg className="h-6.25 w-6.25" fill="white" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>
      
      {/* Opis pod karuzelą */}
      <p className="text-center  text-white mt-6 mb-4 min-h-7">
        {images[currentSlide].description}
      </p>
      
      {/* Button do galerii */}
      <a
        href="/galeria"
        className="inline-flex items-center justify-center rounded-lg border-2 border-[#999173] bg-[#999173] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#999173]/90"
      >
        Zobacz galerię
      </a>
    </div>
  );
}
