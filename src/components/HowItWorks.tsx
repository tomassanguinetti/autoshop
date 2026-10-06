import React from 'react';
import { ClientConfig } from '../types/client';
import { getTheme } from '../utils/theme';
import { Calendar, Search, Wrench } from 'lucide-react';

interface HowItWorksProps {
  client: ClientConfig;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ client }) => {
  const theme = getTheme(client.accentTheme);

  const steps = [
    {
      num: '01',
      icon: <Calendar className={`w-8 h-8 ${theme.primaryText}`} />,
      title: 'Book your visit',
      desc: 'Grab an appointment online or over the phone in under a minute. Same-day slots are usually available for maintenance.',
    },
    {
      num: '02',
      icon: <Search className={`w-8 h-8 ${theme.primaryText}`} />,
      title: 'We diagnose & quote',
      desc: 'Our techs inspect the vehicle, show you what they find, and send a written estimate for your approval — no work without your OK.',
    },
    {
      num: '03',
      icon: <Wrench className={`w-8 h-8 ${theme.primaryText}`} />,
      title: 'We fix it right',
      desc: `Certified techs complete the repair with quality parts, then road-test it and hand you the keys — backed by our ${client.warrantyMonths}-month warranty.`,
    },
  ];

  return (
    <section className="py-20 bg-[#191C21] tq-carbon text-[#B9C1CC] border-b border-[#31363F]">
      <div className="max-w-[1180px] mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 font-display font-semibold uppercase tracking-widest text-xs text-[#FF6A1A]">
            <span className="w-6 h-[3px] bg-[#FF6A1A] inline-block" />
            <span>Simple from start to finish</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white m-0">
            Three steps to a fixed car
          </h2>
        </div>

        {/* 3 Step Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="text-left space-y-3">
              {/* Number with Orange Outline Stroke */}
              <div
                className="font-display font-extrabold text-6xl leading-none text-transparent"
                style={{
                  WebkitTextStroke: `2px ${theme.primaryHex}`,
                }}
              >
                {s.num}
              </div>

              <div className="w-14 h-14 rounded-[4px] bg-[#121417] border border-[#31363F] flex items-center justify-center">
                {s.icon}
              </div>

              <h3 className="font-display font-bold text-2xl uppercase tracking-wide text-white m-0">
                {s.title}
              </h3>

              <p className="text-sm text-[#B9C1CC] leading-relaxed m-0">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
