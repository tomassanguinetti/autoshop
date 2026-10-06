import React, { useState } from 'react';
import { ClientConfig } from '../types/client';
import { getTheme } from '../utils/theme';
import {
  FileText,
  Phone,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface HeroProps {
  client: ClientConfig;
  onOpenBooking: () => void;
  onNavigateView: (view: 'home' | 'services') => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  client,
  onOpenBooking,
  onNavigateView,
  onScrollToSection,
}) => {
  const theme = getTheme(client.accentTheme);

  // Quick-quote form state
  const [qqService, setQqService] = useState('');
  const [qqMake, setQqMake] = useState('');
  const [qqYear, setQqYear] = useState('');
  const [qqName, setQqName] = useState('');
  const [qqPhone, setQqPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleQuickQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qqService || !qqMake || !qqYear || !qqName || !qqPhone) {
      setValidationError('Please complete all required fields.');
      return;
    }
    setValidationError('');
    setSubmitted(true);
  };

  const yearsInBusiness = new Date().getFullYear() - client.foundedYear;

  return (
    <section className="relative bg-[#121417] text-white overflow-hidden pt-8 pb-16">
      {/* Background Graphic & Texture */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1600&q=80"
          alt="Modern mechanic workshop with cars on hydraulic lift"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121417] via-[#121417]/90 to-[#121417]/60" />
      </div>

      <div className="relative z-10 max-w-[1180px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-8 lg:py-14">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FF6A1A]/15 border border-[#FF6A1A]/40 text-[#FF6A1A] font-display font-semibold uppercase tracking-widest text-xs px-3.5 py-1.5 rounded-full">
              <span>ASE-Certified</span>
              <span>·</span>
              <span>Family-Owned Since {client.foundedYear}</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-[4.2rem] uppercase leading-[1.02] tracking-tight text-white m-0">
              Honest repairs.<br />
              <span className={theme.primaryText}>Straight</span> answers.
            </h1>

            <p className="text-[#B9C1CC] text-base sm:text-lg max-w-xl font-normal leading-relaxed m-0">
              {client.subTagline}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateView('services')}
                className={`px-6 py-3.5 rounded-[4px] font-display font-bold uppercase tracking-wider text-base transition-all ${theme.buttonClass}`}
              >
                Book an appointment
              </button>
              <button
                onClick={() => onScrollToSection('pricing')}
                className="px-6 py-3.5 rounded-[4px] font-display font-semibold uppercase tracking-wider text-base bg-transparent text-white border border-white/30 hover:border-white transition-colors"
              >
                See our pricing
              </button>
            </div>

            <div className="pt-2 flex items-center gap-2 text-sm font-display uppercase tracking-wider text-white">
              <Phone className={`w-4 h-4 ${theme.primaryText}`} />
              <span>
                Prefer to talk? Call{' '}
                <a
                  href={`tel:${client.phone.replace(/\D/g, '')}`}
                  className="text-white underline underline-offset-4 decoration-[#FF6A1A] font-bold"
                >
                  {client.phone}
                </a>
              </span>
            </div>
          </div>

          {/* Right Quick Quote Mini Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[6px] shadow-2xl overflow-hidden text-[#4B535F]">
              {/* Card Header */}
              <div className="bg-[#121417] text-white px-5 py-4 flex items-center gap-3 border-b border-zinc-800">
                <FileText className={`w-6 h-6 ${theme.primaryText} shrink-0`} />
                <div>
                  <h3 className="font-display font-bold text-xl uppercase tracking-wide text-white m-0">
                    Get a free quote
                  </h3>
                  <span className="text-xs text-[#8C96A4] block">Reply within one business hour</span>
                </div>
              </div>

              {/* Card Form */}
              <div className="p-6">
                {submitted ? (
                  <div className="bg-[#e8f8ef] border border-[#2FBF71] rounded-[4px] p-5 text-[#17643c] space-y-3 text-center">
                    <CheckCircle2 className="w-10 h-10 text-[#2FBF71] mx-auto" />
                    <h4 className="font-display font-bold text-lg uppercase text-[#17643c] m-0">
                      Request Received!
                    </h4>
                    <p className="text-xs leading-relaxed m-0">
                      Thanks, <strong>{qqName}</strong> — our service advisors will contact you at <strong>{qqPhone}</strong> within one business hour with your vehicle quote.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-[#17643c] underline font-semibold mt-2"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickQuoteSubmit} className="space-y-3.5 text-xs">
                    {validationError && (
                      <div className="p-2.5 rounded bg-red-50 text-red-600 border border-red-200 flex items-center gap-1.5 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{validationError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                        What do you need?
                      </label>
                      <select
                        value={qqService}
                        onChange={(e) => setQqService(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A] focus:ring-2 focus:ring-[#FF6A1A]/20"
                      >
                        <option value="">Choose a service…</option>
                        <option value="Oil change">Oil change</option>
                        <option value="Brakes">Brakes</option>
                        <option value="Engine diagnostics">Engine diagnostics</option>
                        <option value="Tires & alignment">Tires & alignment</option>
                        <option value="AC & heating">AC & heating</option>
                        <option value="Transmission">Transmission</option>
                        <option value="Battery">Battery</option>
                        <option value="State inspection">State inspection</option>
                        <option value="Not sure">Not sure — please advise</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                          Vehicle Make
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Toyota"
                          value={qqMake}
                          onChange={(e) => setQqMake(e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A] focus:ring-2 focus:ring-[#FF6A1A]/20"
                        />
                      </div>
                      <div>
                        <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                          Year
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2018"
                          value={qqYear}
                          onChange={(e) => setQqYear(e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A] focus:ring-2 focus:ring-[#FF6A1A]/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={qqName}
                        onChange={(e) => setQqName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A] focus:ring-2 focus:ring-[#FF6A1A]/20"
                      />
                    </div>

                    <div>
                      <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={qqPhone}
                        onChange={(e) => setQqPhone(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A] focus:ring-2 focus:ring-[#FF6A1A]/20"
                      />
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-3 rounded-[4px] font-display font-bold uppercase tracking-wider text-sm transition-all ${theme.buttonClass}`}
                    >
                      Request my quote
                    </button>

                    <p className="text-[11px] text-[#8C96A4] text-center m-0">
                      No obligation. We will confirm pricing before any work begins.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 bg-[#21252C] border border-[#31363F] rounded-[6px] overflow-hidden mt-6 mb-[-2.5rem] relative z-20 shadow-xl">
          <div className="p-4 sm:p-5 text-center border-r border-[#31363F]">
            <div className="font-display font-bold text-3xl sm:text-4xl text-white">ASE</div>
            <div className="text-xs text-[#8C96A4] mt-1 font-medium">Certified technicians</div>
          </div>
          <div className="p-4 sm:p-5 text-center border-r border-[#31363F] max-md:border-r-0">
            <div className="font-display font-bold text-3xl sm:text-4xl text-white">
              {yearsInBusiness}<span className={theme.primaryText}>yrs</span>
            </div>
            <div className="text-xs text-[#8C96A4] mt-1 font-medium">In business locally</div>
          </div>
          <div className="p-4 sm:p-5 text-center border-r border-[#31363F] max-md:border-t max-md:border-[#31363F]">
            <div className="font-display font-bold text-3xl sm:text-4xl text-white">
              48k<span className={theme.primaryText}>+</span>
            </div>
            <div className="text-xs text-[#8C96A4] mt-1 font-medium">Cars serviced</div>
          </div>
          <div className="p-4 sm:p-5 text-center max-md:border-t max-md:border-[#31363F]">
            <div className="font-display font-bold text-3xl sm:text-4xl text-white">
              {client.warrantyMonths}<span className={theme.primaryText}>mo</span>
            </div>
            <div className="text-xs text-[#8C96A4] mt-1 font-medium">Warranty on repairs</div>
          </div>
        </div>
      </div>
    </section>
  );
};
