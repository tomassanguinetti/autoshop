import React from 'react';
import { ClientConfig } from '../types/client';
import { getTheme } from '../utils/theme';
import {
  Wrench,
  MapPin,
  Phone,
  Clock,
  ArrowUp
} from 'lucide-react';
import { HazardStripe } from './HazardStripe';

interface FooterProps {
  client: ClientConfig;
  onNavigateView: (view: 'home' | 'services') => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenCustomizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  client,
  onNavigateView,
  onScrollToSection,
  onOpenCustomizer,
}) => {
  const theme = getTheme(client.accentTheme);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (target: string) => {
    if (target === 'services-page') {
      onNavigateView('services');
    } else {
      onNavigateView('home');
      setTimeout(() => onScrollToSection(target), 50);
    }
  };

  return (
    <>
      <HazardStripe />
      <footer className="bg-[#121417] text-[#8C96A4] text-xs pt-16 pb-8 border-t border-[#31363F]">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#31363F]">
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-4 space-y-4">
              <div
                onClick={() => {
                  onNavigateView('home');
                  scrollToTop();
                }}
                className="flex items-center gap-2.5 cursor-pointer select-none"
              >
                <div
                  className={`w-9 h-9 rounded-[4px] ${theme.primaryBg} flex items-center justify-center text-white shadow-md`}
                >
                  <Wrench className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-2xl text-white tracking-wide uppercase">
                  {client.businessName.split(' ')[0]}
                  <b className={theme.primaryText}>{client.businessName.split(' ').slice(1).join(' ')}</b>
                </span>
              </div>

              <p className="text-xs text-[#8C96A4] leading-relaxed max-w-sm m-0">
                Family-owned, ASE-certified auto repair you can trust. Honest quotes, quality parts, and a {client.warrantyMonths}-month warranty on every job.
              </p>

              {/* Social icons */}
              <div className="flex gap-2 pt-1">
                {['Facebook', 'Instagram', 'YouTube'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    aria-label={`${client.businessName} on ${social}`}
                    className="w-9 h-9 rounded-[4px] bg-[#21252C] border border-[#31363F] flex items-center justify-center text-white hover:bg-[#FF6A1A] hover:border-[#FF6A1A] transition-colors"
                  >
                    <span className="font-display text-xs font-bold uppercase">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Services */}
            <div className="lg:col-span-2 space-y-3">
              <h5 className="font-display font-bold uppercase tracking-wider text-sm text-white m-0">
                Services
              </h5>
              <ul className="m-0 p-0 list-none space-y-2 text-xs">
                {client.services.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => onNavigateView('services')}
                      className="text-[#8C96A4] hover:text-[#FF6A1A] transition-colors text-left"
                    >
                      {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Shop Links */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="font-display font-bold uppercase tracking-wider text-sm text-white m-0">
                Shop
              </h5>
              <ul className="m-0 p-0 list-none space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => handleLinkClick('services')}
                    className="text-[#8C96A4] hover:text-[#FF6A1A] transition-colors"
                  >
                    All Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('pricing')}
                    className="text-[#8C96A4] hover:text-[#FF6A1A] transition-colors"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('team')}
                    className="text-[#8C96A4] hover:text-[#FF6A1A] transition-colors"
                  >
                    Our Team
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('faq')}
                    className="text-[#8C96A4] hover:text-[#FF6A1A] transition-colors"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateView('services')}
                    className="text-[#8C96A4] hover:text-[#FF6A1A] transition-colors"
                  >
                    Book Online
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('visit')}
                    className="text-[#8C96A4] hover:text-[#FF6A1A] transition-colors"
                  >
                    Hours &amp; Location
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Visit Us */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="font-display font-bold uppercase tracking-wider text-sm text-white m-0">
                Visit Us
              </h5>
              <ul className="m-0 p-0 list-none space-y-2.5 text-xs text-[#8C96A4]">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#FF6A1A] shrink-0 mt-0.5" />
                  <span>
                    {client.address}<br />{client.cityStateZip}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#FF6A1A] shrink-0" />
                  <a href={`tel:${client.phone.replace(/\D/g, '')}`} className="hover:text-white">
                    {client.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#FF6A1A] shrink-0 mt-0.5" />
                  <span>
                    Mon–Fri {client.hours.weekdays}<br />
                    Sat {client.hours.saturday} · Sun {client.hours.sunday}
                  </span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={onOpenCustomizer}
                  className="px-3 py-1.5 rounded-[4px] bg-[#21252C] hover:bg-[#31363F] text-white font-display uppercase tracking-wider text-[11px] border border-[#31363F] transition-colors"
                >
                  Edit Client Config
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8C96A4]">
            <p className="m-0">
              &copy; {new Date().getFullYear()} {client.businessName}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span>Built for easy client rebrand &amp; reuse</span>
              <button
                onClick={scrollToTop}
                className="text-white hover:text-[#FF6A1A] flex items-center gap-1 font-semibold transition-colors"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
