import React from 'react';
import { ClientConfig } from '../types/client';
import { getTheme } from '../utils/theme';
import { HelpCircle } from 'lucide-react';

interface PriceListSectionProps {
  client: ClientConfig;
}

export const PriceListSection: React.FC<PriceListSectionProps> = ({ client }) => {
  const theme = getTheme(client.accentTheme);

  return (
    <section id="pricing" className="py-20 bg-[#EEF1F5] text-[#4B535F]">
      <div className="max-w-[1180px] mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 font-display font-semibold uppercase tracking-widest text-xs text-[#EA5A0B]">
            <span className="w-6 h-[3px] bg-[#FF6A1A] inline-block" />
            <span>Transparent pricing</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#16191D] m-0">
            Common service prices, posted right here
          </h2>
          <p className="text-base text-[#4B535F] leading-relaxed m-0">
            Starting prices for our most-requested jobs on most makes and models. Your written estimate confirms the exact figure before any work begins.
          </p>
        </div>

        {/* 2-Column Dot-Leader Price Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          {client.priceList.map((item, idx) => (
            <div
              key={idx}
              className="flex items-baseline justify-between py-3 border-b border-[#D3DAE3] gap-2"
            >
              <div className="shrink-0">
                <span className="font-bold text-[#16191D] text-base block font-display uppercase tracking-wide">
                  {item.name}
                </span>
                <span className="text-xs text-[#8C96A4] font-normal block font-sans">
                  {item.sub}
                </span>
              </div>

              {/* Dotted dot-leader */}
              <div
                className="flex-1 border-b-2 border-dotted border-[#D3DAE3] mx-2 mb-1"
                aria-hidden="true"
              />

              <div className="shrink-0 text-right">
                <span className={`font-display font-bold text-2xl text-[#C94A05] leading-none`}>
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Note Box */}
        <div className="mt-10 bg-white border border-[#D3DAE3] border-l-4 border-l-[#FF6A1A] rounded-[4px] p-5 shadow-xs text-sm text-[#4B535F]">
          <strong className="text-[#16191D] font-bold">Not sure what your car needs?</strong> Bring it in for a free multi-point inspection and we will build a prioritized plan — the safety items first, the rest when your budget allows.
        </div>
      </div>
    </section>
  );
};
