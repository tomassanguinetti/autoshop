import React, { useState } from 'react';
import { ClientConfig } from '../types/client';
import { getTheme } from '../utils/theme';
import {
  Phone,
  Clock,
  Wrench,
  Menu,
  X,
  Calendar,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  client: ClientConfig;
  activeView: 'home' | 'services';
  onNavigateView: (view: 'home' | 'services') => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  client,
  activeView,
  onNavigateView,
  onScrollToSection,
  onOpenBooking,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = getTheme(client.accentTheme);

  const handleNavClick = (target: string) => {
    if (target === 'services-page') {
      onNavigateView('services');
    } else {
      if (activeView !== 'home') {
        onNavigateView('home');
        setTimeout(() => onScrollToSection(target), 50);
      } else {
        onScrollToSection(target);
      }
    }
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#121417]/98 border-b border-[#31363F] backdrop-blur-md">
      {/* Top Bar */}
      <div className="bg-[#121417] text-[#B9C1CC] text-xs border-b border-white/5 py-1.5 px-4">
        <div className="max-w-[1180px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <ul className="flex items-center gap-5 m-0 p-0 list-none">
            <li>
              <a
                href={`tel:${client.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-1.5 text-[#B9C1CC] hover:text-white transition-colors font-medium"
              >
                <Phone className={`w-3.5 h-3.5 ${theme.primaryText}`} />
                <span>{client.phone}</span>
              </a>
            </li>
            <li className="hidden sm:flex items-center gap-1.5 text-zinc-400">
              <Clock className={`w-3.5 h-3.5 ${theme.primaryText}`} />
              <span>
                Mon–Fri {client.hours.weekdays} · Sat {client.hours.saturday}
              </span>
            </li>
          </ul>

          <div className="flex items-center gap-2 font-display uppercase tracking-wider text-white text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#2FBF71] shadow-[0_0_0_3px_rgba(47,191,113,0.25)] animate-pulse" />
            <span>Same-day appointments available</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-[1180px] mx-auto px-4 min-h-[72px] flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => {
            onNavigateView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div
            className={`w-10 h-10 rounded-[4px] ${theme.primaryBg} flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105`}
          >
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-2xl text-white tracking-wide uppercase">
            {client.businessName.split(' ')[0]}
            <b className={theme.primaryText}>{client.businessName.split(' ').slice(1).join(' ')}</b>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-6 m-0 p-0 list-none font-display font-semibold uppercase tracking-wider text-sm">
          <li>
            <button
              onClick={() => {
                onNavigateView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`py-1 relative transition-colors ${
                activeView === 'home' ? 'text-white' : 'text-[#B9C1CC] hover:text-white'
              }`}
            >
              Home
              {activeView === 'home' && (
                <span className={`absolute bottom-[-4px] left-0 right-0 h-[3px] ${theme.primaryBg}`} />
              )}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick('services')}
              className="text-[#B9C1CC] hover:text-white transition-colors py-1"
            >
              Services
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick('pricing')}
              className="text-[#B9C1CC] hover:text-white transition-colors py-1"
            >
              Pricing
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick('team')}
              className="text-[#B9C1CC] hover:text-white transition-colors py-1"
            >
              Our Team
            </button>
          </li>
          <li>
            <button
              onClick={() => onNavigateView('services')}
              className={`py-1 relative transition-colors ${
                activeView === 'services' ? 'text-white' : 'text-[#B9C1CC] hover:text-white'
              }`}
            >
              Book Online
              {activeView === 'services' && (
                <span className={`absolute bottom-[-4px] left-0 right-0 h-[3px] ${theme.primaryBg}`} />
              )}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick('faq')}
              className="text-[#B9C1CC] hover:text-white transition-colors py-1"
            >
              FAQ
            </button>
          </li>
        </ul>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${client.phone.replace(/\D/g, '')}`}
            className="px-3.5 py-2 rounded-[4px] border border-white/20 text-white font-display uppercase tracking-wider text-xs font-semibold hover:border-zinc-400 transition-colors"
          >
            {client.phone}
          </a>
          <button
            onClick={onOpenBooking}
            className={`px-4 py-2 rounded-[4px] font-display uppercase tracking-wider text-xs font-bold transition-all hover:scale-102 ${theme.buttonClass}`}
          >
            Book a Service
          </button>
        </div>

        {/* Mobile Burger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-[4px] bg-[#21252C] border border-[#31363F] text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#191C21] border-t border-[#31363F] px-5 py-5 space-y-4 font-display uppercase tracking-wider text-sm">
          <div className="space-y-2">
            <button
              onClick={() => {
                onNavigateView('home');
                setMobileOpen(false);
              }}
              className="w-full text-left py-2 text-[#B9C1CC] hover:text-white border-b border-[#31363F]/50 flex justify-between items-center"
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="w-full text-left py-2 text-[#B9C1CC] hover:text-white border-b border-[#31363F]/50 flex justify-between items-center"
            >
              <span>Services</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="w-full text-left py-2 text-[#B9C1CC] hover:text-white border-b border-[#31363F]/50 flex justify-between items-center"
            >
              <span>Pricing</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </button>
            <button
              onClick={() => handleNavClick('team')}
              className="w-full text-left py-2 text-[#B9C1CC] hover:text-white border-b border-[#31363F]/50 flex justify-between items-center"
            >
              <span>Our Team</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </button>
            <button
              onClick={() => {
                onNavigateView('services');
                setMobileOpen(false);
              }}
              className="w-full text-left py-2 text-[#B9C1CC] hover:text-white border-b border-[#31363F]/50 flex justify-between items-center"
            >
              <span>Book Online (Services Page)</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="w-full text-left py-2 text-[#B9C1CC] hover:text-white flex justify-between items-center"
            >
              <span>FAQ</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </button>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              className={`w-full py-2.5 rounded-[4px] font-bold ${theme.buttonClass}`}
            >
              Book a Service
            </button>
            <a
              href={`tel:${client.phone.replace(/\D/g, '')}`}
              className="block text-center w-full py-2.5 rounded-[4px] bg-[#21252C] text-white border border-[#31363F] font-semibold"
            >
              Call {client.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
