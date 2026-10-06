import React, { useState } from 'react';
import { ClientConfig } from '../types/client';
import { ChevronDown, Plus, Minus } from 'lucide-react';

interface FaqSectionProps {
  client: ClientConfig;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ client }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const faqs = [
    {
      q: 'Do I need an appointment, or can I just drop in?',
      a: 'Both work. We keep same-day slots open for oil changes, inspections and quick diagnostics, so walk-ins are welcome. For bigger jobs like brakes or transmission work, booking ahead guarantees a bay and the fastest turnaround.',
    },
    {
      q: 'Will you tell me the price before you start?',
      a: 'Always. After we inspect your vehicle we send a written estimate covering parts and labor, and we do not touch a wrench until you approve it. If we spot something extra mid-repair, we stop and call you first — never a surprise on the final bill.',
    },
    {
      q: 'What warranty comes with your repairs?',
      a: `Most repairs are backed by our nationwide ${client.warrantyMonths}-month / ${client.warrantyMiles.toLocaleString()}-mile warranty on parts and labor. That means if a covered part fails, we make it right at no cost, and the coverage travels with you even if you are out of town.`,
    },
    {
      q: 'Do you work on my make and model?',
      a: 'Very likely. Our techs service domestic, import, and hybrid vehicles — Toyota, Honda, Ford, Chevy, Subaru, BMW and many more. We invest in dealer-level scan tools and factory information, so we can handle modern electronics as well as classic mechanical work.',
    },
    {
      q: 'Can I get a ride while my car is being serviced?',
      a: 'Yes. We offer a free local shuttle within a few miles of the shop, plus loaner cars for larger jobs that keep your vehicle overnight. Just let us know when you book so we can have it ready.',
    },
    {
      q: 'How do payments and financing work?',
      a: 'We accept all major cards, debit, and cash, and we offer interest-free financing on repairs over $250 through our service-credit partner. Ask a service advisor and we will walk you through the options before work begins.',
    },
    {
      q: 'My check-engine light is on — is it safe to drive?',
      a: 'A steady light usually means it is safe to drive to us soon, but a flashing light signals a serious misfire — pull over and call us. Either way, book a diagnostic so we can read the codes and fix the real cause before it turns into a bigger repair.',
    },
    {
      q: 'Do you offer discounts or specials?',
      a: 'We do. Check the specials section above for current coupons, and ask about our fleet, senior, and first-responder discounts. Sign up for text reminders and you will get seasonal service deals before anyone else.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-[#EEF1F5] text-[#4B535F] border-b border-[#D3DAE3]">
      <div className="max-w-[820px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 font-display font-semibold uppercase tracking-widest text-xs text-[#EA5A0B]">
            <span className="w-6 h-[3px] bg-[#FF6A1A] inline-block" />
            <span>Good to know</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#16191D] m-0">
            Frequently asked questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-[#D3DAE3] rounded-[6px] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-display font-bold uppercase tracking-wide text-lg sm:text-xl text-[#16191D] hover:text-[#FF6A1A] transition-colors"
                >
                  <span>{item.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#FF6A1A] text-white' : 'bg-[#EEF1F5] text-[#16191D]'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#4B535F] leading-relaxed border-t border-[#EEF1F5]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
