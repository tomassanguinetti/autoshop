import React from 'react';
import { ClientConfig } from '../types/client';
import { getTheme } from '../utils/theme';
import {
  ShieldCheck,
  FileText,
  Star,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface WhyChooseUsProps {
  client: ClientConfig;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ client }) => {
  const theme = getTheme(client.accentTheme);

  const reasons = [
    {
      icon: <ShieldCheck className={`w-6 h-6 ${theme.primaryText}`} />,
      title: 'ASE-certified technicians',
      desc: 'Every repair is handled by a certified tech, not a trainee. We invest in ongoing training so we can service the latest hybrids and turbo engines.',
    },
    {
      icon: <FileText className={`w-6 h-6 ${theme.primaryText}`} />,
      title: 'Upfront, written quotes',
      desc: 'You approve the price before we touch a wrench. No mystery fees, no upselling parts your car doesn’t need.',
    },
    {
      icon: <Star className={`w-6 h-6 ${theme.primaryText}`} />,
      title: `${client.warrantyMonths}-month warranty on repairs`,
      desc: `Parts and labor are covered nationwide for two years or ${client.warrantyMiles.toLocaleString()} miles — because we stand behind the work.`,
    },
    {
      icon: <Clock className={`w-6 h-6 ${theme.primaryText}`} />,
      title: 'Fast turnaround',
      desc: 'Most maintenance is done same-day. Need a ride? We offer a free local shuttle and loaner cars for bigger jobs.',
    },
  ];

  return (
    <section className="py-20 bg-[#191C21] tq-carbon text-[#B9C1CC] border-b border-[#31363F]">
      <div className="max-w-[1180px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Media with Star Rating Badge */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-[6px] overflow-hidden border border-[#31363F] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=1000&q=80"
                alt="Interior of clean modern auto repair facility with cars on hydraulic lift"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

            {/* Overlapping Rating Badge */}
            <div
              className={`absolute -bottom-6 -left-2 sm:-left-6 ${theme.primaryBg} text-white p-4 sm:p-5 rounded-[4px] shadow-2xl flex flex-col items-start`}
            >
              <div className="font-display font-bold text-3xl sm:text-4xl leading-none flex items-center gap-1">
                <span>{client.rating}</span>
                <span className="text-white text-2xl">★</span>
              </div>
              <span className="font-display uppercase tracking-wider text-xs sm:text-sm text-white/90 mt-1 font-semibold">
                {client.reviewsCount.toLocaleString()}+ Google reviews
              </span>
            </div>
          </div>

          {/* Right Why Copy & Feature List */}
          <div className="lg:col-span-7 space-y-6 pt-6 lg:pt-0">
            <div className="inline-flex items-center gap-2 font-display font-semibold uppercase tracking-widest text-xs text-[#FF6A1A]">
              <span className="w-6 h-[3px] bg-[#FF6A1A] inline-block" />
              <span>Why drivers choose {client.businessName.split(' ')[0]}</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white m-0">
              A garage that treats you like a neighbor, not a number
            </h2>

            <p className="text-base text-[#B9C1CC] leading-relaxed m-0 font-normal">
              We built {client.businessName} on a simple promise: fix it right the first time, charge a fair price, and explain everything in plain English. That’s why families in our town have trusted us with three generations of cars.
            </p>

            <ul className="space-y-4 m-0 p-0 list-none pt-2">
              {reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-[4px] bg-[#FF6A1A]/15 border border-[#FF6A1A]/30 flex items-center justify-center shrink-0">
                    {r.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xl uppercase tracking-wide text-white m-0">
                      {r.title}
                    </h4>
                    <p className="text-xs text-[#B9C1CC] leading-relaxed mt-1 m-0">
                      {r.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
