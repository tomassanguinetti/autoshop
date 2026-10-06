import React from 'react';
import { ClientConfig } from '../types/client';
import { getTheme } from '../utils/theme';
import { HazardStripe } from './HazardStripe';

interface StatsBannerProps {
  client: ClientConfig;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ client }) => {
  const theme = getTheme(client.accentTheme);
  const years = new Date().getFullYear() - client.foundedYear;

  const stats = [
    { value: `${years}`, suffix: '', label: 'Years in business' },
    { value: '48,000', suffix: '+', label: 'Cars serviced' },
    { value: '14', suffix: '', label: 'Certified technicians' },
    { value: `${client.rating}`, suffix: '', label: 'Average review rating' },
  ];

  return (
    <section className="bg-[#121417] text-white">
      <HazardStripe />
      <div className="max-w-[1180px] mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((st, i) => (
            <div key={i} className="p-2">
              <div className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-none">
                {st.value}
                <span className={theme.primaryText}>{st.suffix}</span>
              </div>
              <div className="font-display uppercase tracking-wider text-xs sm:text-sm text-[#8C96A4] mt-2 font-medium">
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <HazardStripe />
    </section>
  );
};
