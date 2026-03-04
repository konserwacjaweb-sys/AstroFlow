import { useState, useEffect } from 'react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  ringColor?: string;
}

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="w-full max-w-2xl mx-auto h-[600px] lg:h-[600px]">
      <div className="relative" style={{ minHeight: '600px' }}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              activeSlide === index 
                ? 'opacity-100 pointer-events-auto' 
                : 'opacity-0 pointer-events-none'
            }`}
            style={{ transitionProperty: 'opacity' }}
          >
            <div className="bg-[#3b5b63] rounded-3xl p-8 lg:p-12 h-full flex flex-col items-center justify-center text-center space-y-6" style={{ willChange: 'opacity' }}>
              {/* Quote Icon */}
              <div className="text-white opacity-20">
                <svg 
                  className="w-16 h-16" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote */}
              <p className="!text-[1.4rem] text-white leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex flex-col items-center space-y-2 pt-4">
                <p className="text-white">
                  {testimonial.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => setActiveSlide((current) => (current - 1 + testimonials.length) % testimonials.length)}
          className="inline-flex items-center justify-center rounded-lg border-2 border-[#999173] bg-[#999173] p-2 text-white transition-colors hover:bg-[#999173]/90"
          aria-label="Poprzednia opinia"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </button>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-5 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? 'bg-[#3b5b63] w-10'
                  : 'bg-slate-300 hover:bg-slate-400 w-2'
              }`}
              aria-label={`Przejdź do opinii ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setActiveSlide((current) => (current + 1) % testimonials.length)}
          className="inline-flex items-center justify-center rounded-lg border-2 border-[#999173] bg-[#999173] p-2 text-white transition-colors hover:bg-[#999173]/90"
          aria-label="Następna opinia"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
