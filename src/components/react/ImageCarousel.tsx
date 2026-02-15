import { useState } from 'react';

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
    description: string;
  }[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((current) => (current - 1 + images.length) % images.length);
  };

  return (
    <div className="rounded-4xl py-10 flex flex-col items-center justify-center p-6 bg-cyan-950 w-full">
      <div className="relative w-[70%] mx-auto">
        {/* Karuzela z białą ramką */}
        <div className="relative w-full aspect-4/3 overflow-hidden border-20 border-white rounded-lg">
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
                loading="lazy"
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
          <svg className="w-10 h-10" fill="white" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button onClick={nextSlide} className="absolute -right-14 top-1/2 -translate-y-1/2 z-30 p-2 transition-transform hover:scale-110" aria-label="Next slide"
        >
          <svg className="w-10 h-10" fill="white" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>
      
      {/* Opis pod karuzelą */}
      <p className="text-center text-white mt-6 mb-4 min-h-7">
        {images[currentSlide].description}
      </p>
      
      {/* Button do galerii */}
      <a href="/galeria" className="inline-flex mt-4 items-center px-6 py-5 text-base font-semibold text-white bg-linear-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 rounded-lg shadow-lg hover:shadow-xl transition-all group"
      >
        Zobacz galerię
        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  );
}
