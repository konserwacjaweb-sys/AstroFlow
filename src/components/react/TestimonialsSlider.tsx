import { useState, useEffect } from 'react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  imageSrc: string;
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
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative min-h-[450px]">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ${
              activeSlide === index 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 lg:p-12 h-full flex flex-col items-center justify-center text-center space-y-6">
              {/* Quote Icon */}
              <div className="text-blue-600 opacity-20">
                <svg 
                  className="w-16 h-16" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote */}
              <p className="text-lg lg:text-xl text-slate-700 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex flex-col items-center space-y-2 pt-4">
                <p className="font-bold text-slate-900 text-lg">
                  {testimonial.name}
                </p>
                <p className="text-slate-600 text-sm">
                  {testimonial.role}
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
          className="p-3 rounded-full bg-white border-2 border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 shadow-md"
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
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === index 
                  ? 'w-12 bg-blue-600' 
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Przejdź do opinii ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setActiveSlide((current) => (current + 1) % testimonials.length)}
          className="p-3 rounded-full bg-white border-2 border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 shadow-md"
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
