import React from 'react';
import { ClientConfig, ServiceItem } from '../types/client';
import { getTheme } from '../utils/theme';
import {
  Wrench,
  Disc,
  Activity,
  Compass,
  Wind,
  Layers,
  BatteryCharging,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface ServicesGridProps {
  client: ClientConfig;
  onNavigateView: (view: 'home' | 'services') => void;
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  client,
  onNavigateView,
  onSelectService,
}) => {
  const theme = getTheme(client.accentTheme);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'oil':
        return <Wrench className={`w-7 h-7 ${theme.primaryText}`} />;
      case 'brakes':
        return <Disc className={`w-7 h-7 ${theme.primaryText}`} />;
      case 'diagnostics':
        return <Activity className={`w-7 h-7 ${theme.primaryText}`} />;
      case 'tires':
        return <Compass className={`w-7 h-7 ${theme.primaryText}`} />;
      case 'ac':
        return <Wind className={`w-7 h-7 ${theme.primaryText}`} />;
      case 'transmission':
        return <Layers className={`w-7 h-7 ${theme.primaryText}`} />;
      case 'battery':
        return <BatteryCharging className={`w-7 h-7 ${theme.primaryText}`} />;
      case 'inspection':
      default:
        return <ShieldCheck className={`w-7 h-7 ${theme.primaryText}`} />;
    }
  };

  return (
    <section id="services" className="pt-20 pb-16 bg-[#EEF1F5] text-[#4B535F]">
      <div className="max-w-[1180px] mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 font-display font-semibold uppercase tracking-widest text-xs text-[#EA5A0B]">
            <span className="w-6 h-[3px] bg-[#FF6A1A] inline-block" />
            <span>What we fix</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#16191D] m-0">
            Full-service auto repair, under one roof
          </h2>
          <p className="text-base text-[#4B535F] leading-relaxed m-0">
            Bumper-to-bumper care from routine maintenance to major mechanical work. Every job starts with a written estimate — no surprises on the invoice.
          </p>
        </div>

        {/* 4x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {client.services.map((service) => (
            <article
              key={service.id}
              className="group relative bg-white border border-[#D3DAE3] rounded-[6px] p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden"
            >
              {/* Top Accent Strip on Hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${theme.primaryBg} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}
              />

              <div className="space-y-3">
                <div className="w-14 h-14 rounded-[4px] bg-[#121417] flex items-center justify-center">
                  {getServiceIcon(service.id)}
                </div>

                <h3 className="font-display font-bold text-xl uppercase tracking-wide text-[#16191D] m-0">
                  {service.name}
                </h3>

                <p className="text-xs text-[#4B535F] leading-relaxed m-0">
                  {service.description}
                </p>
              </div>

              {/* Footer with Price and Link */}
              <div className="pt-4 mt-5 border-t border-[#E2E7EE] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-[#8C96A4] uppercase tracking-wider block">
                    From
                  </span>
                  <span className="font-display font-bold text-2xl text-[#C94A05] leading-none">
                    ${service.fromPrice}
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(service)}
                  className="inline-flex items-center gap-1 font-display font-bold text-xs uppercase tracking-wider text-[#16191D] group-hover:text-[#FF6A1A] transition-colors"
                >
                  <span>Book</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => onNavigateView('services')}
            className="px-7 py-3.5 rounded-[4px] bg-[#121417] hover:bg-black text-white font-display font-bold uppercase tracking-wider text-base transition-colors shadow-md"
          >
            View all services &amp; book online
          </button>
        </div>
      </div>
    </section>
  );
};
