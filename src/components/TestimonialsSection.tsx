import React, { useState } from 'react';
import { ClientConfig } from '../types/client';
import { getTheme } from '../utils/theme';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialsSectionProps {
  client: ClientConfig;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ client }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = getTheme(client.accentTheme);

  const testimonials = client.testimonials;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Showing 2 testimonials on desktop, 1 on mobile
  const activeTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
  ];

  return (
    <section className="py-20 bg-[#191C21] tq-carbon text-white border-b border-[#31363F]">
      <div className="max-w-[1180px] mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 font-display font-semibold uppercase tracking-widest text-xs text-[#FF6A1A]">
            <span className="w-6 h-[3px] bg-[#FF6A1A] inline-block" />
            <span>Straight from the driveway</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white m-0">
            What our customers say
          </h2>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#21252C] border border-[#31363F] rounded-[6px] p-6 sm:p-8 flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex gap-1 text-[#FF6A1A]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FF6A1A]" />
                  ))}
                </div>

                <p className="text-white text-base leading-relaxed italic m-0">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-6 mt-4 border-t border-[#31363F]">
                <div className="w-12 h-12 rounded-full bg-[#121417] border border-[#31363F] flex items-center justify-center font-display font-bold text-lg text-white">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <b className="font-display uppercase tracking-wide text-lg text-white block">
                    {t.author}
                  </b>
                  <span className="text-xs text-[#8C96A4] block">{t.vehicle}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Nav Controls */}
        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-[4px] border border-[#31363F] bg-[#21252C] hover:bg-[#FF6A1A] hover:border-[#FF6A1A] text-white flex items-center justify-center transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-[4px] border border-[#31363F] bg-[#21252C] hover:bg-[#FF6A1A] hover:border-[#FF6A1A] text-white flex items-center justify-center transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
