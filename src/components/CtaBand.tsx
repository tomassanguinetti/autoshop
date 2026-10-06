import React from 'react';
import { ClientConfig } from '../types/client';
import { getTheme } from '../utils/theme';
import { Phone, Calendar } from 'lucide-react';

interface CtaBandProps {
  client: ClientConfig;
  onOpenBooking: () => void;
  onNavigateView: (view: 'home' | 'services') => void;
}

export const CtaBand: React.FC<CtaBandProps> = ({
  client,
  onOpenBooking,
  onNavigateView,
}) => {
  const theme = getTheme(client.accentTheme);

  return (
    <section className="relative py-20 text-white text-center tq-hazard overflow-hidden">
      {/* Dark tint overlay */}
      <div className="absolute inset-0 bg-[#121417]/93 z-0" />

      <div className="relative z-10 max-w-[1180px] mx-auto px-4 space-y-4">
        <div className="inline-flex items-center gap-2 font-display font-semibold uppercase tracking-widest text-xs text-[#FF6A1A]">
          <span className="w-6 h-[3px] bg-[#FF6A1A] inline-block" />
          <span>Ready when you are</span>
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white m-0">
          Book your service today
        </h2>

        <p className="text-base sm:text-lg text-[#B9C1CC] max-w-xl mx-auto leading-relaxed m-0 font-normal">
          Same-day appointments, upfront quotes, and a warranty you can count on. Let's get your car running its best.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
          <button
            onClick={() => onNavigateView('services')}
            className={`px-7 py-3.5 rounded-[4px] font-display font-bold uppercase tracking-wider text-base transition-all ${theme.buttonClass}`}
          >
            Book an appointment
          </button>
          <a
            href={`tel:${client.phone.replace(/\D/g, '')}`}
            className="px-7 py-3.5 rounded-[4px] font-display font-semibold uppercase tracking-wider text-base bg-transparent text-white border border-white/30 hover:border-white transition-colors"
          >
            Call {client.phone}
          </a>
        </div>
      </div>
    </section>
  );
};
