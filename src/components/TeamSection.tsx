import React from 'react';
import { ClientConfig } from '../types/client';
import { getTheme } from '../utils/theme';

interface TeamSectionProps {
  client: ClientConfig;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ client }) => {
  const theme = getTheme(client.accentTheme);

  return (
    <section id="team" className="py-20 bg-[#EEF1F5] text-[#4B535F] border-b border-[#D3DAE3]">
      <div className="max-w-[1180px] mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 font-display font-semibold uppercase tracking-widest text-xs text-[#EA5A0B]">
            <span className="w-6 h-[3px] bg-[#FF6A1A] inline-block" />
            <span>The crew under the hood</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#16191D] m-0">
            Meet the mechanics
          </h2>
          <p className="text-base text-[#4B535F] leading-relaxed m-0">
            Real people who will know your car — and your name. Most of our team has been with {client.businessName.split(' ')[0]} for over a decade.
          </p>
        </div>

        {/* 4-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {client.team.map((member, i) => (
            <article key={i} className="group">
              <div className="relative rounded-[6px] overflow-hidden aspect-square border border-[#D3DAE3] bg-zinc-900 shadow-sm">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Certification Badge */}
                <span
                  className={`absolute top-3 left-3 ${theme.primaryBg} text-white font-display font-bold uppercase tracking-wider text-[11px] px-2.5 py-1 rounded-[3px] shadow-md`}
                >
                  {member.cert}
                </span>
              </div>

              <h4 className="font-display font-bold text-xl uppercase tracking-wide text-[#16191D] mt-3.5 mb-0.5">
                {member.name}
              </h4>

              <div className="font-display font-semibold uppercase tracking-wider text-xs text-[#C94A05] mb-2">
                {member.role}
              </div>

              <p className="text-xs text-[#4B535F] leading-relaxed m-0">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
