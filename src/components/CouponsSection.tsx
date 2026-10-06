import React, { useState } from 'react';
import { ClientConfig } from '../types/client';
import { getTheme } from '../utils/theme';
import { Check, Copy } from 'lucide-react';

interface CouponsSectionProps {
  client: ClientConfig;
}

export const CouponsSection: React.FC<CouponsSectionProps> = ({ client }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const theme = getTheme(client.accentTheme);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-20 bg-[#121417] text-white border-b border-[#31363F]">
      <div className="max-w-[1180px] mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 font-display font-semibold uppercase tracking-widest text-xs text-[#FF6A1A]">
            <span className="w-6 h-[3px] bg-[#FF6A1A] inline-block" />
            <span>This month's specials</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white m-0">
            Coupons worth the drive
          </h2>
          <p className="text-base text-[#B9C1CC] leading-relaxed m-0">
            Mention or show these when you book. One coupon per visit — click a code to copy it.
          </p>
        </div>

        {/* 3 Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {client.coupons.map((coupon, i) => (
            <div
              key={i}
              className="tq-coupon bg-white text-[#4B535F] p-7 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="font-display font-bold text-4xl text-[#C94A05] leading-none mb-2">
                  {coupon.tag}
                </div>
                <h3 className="font-display font-bold text-xl uppercase tracking-wide text-[#16191D] mt-2 mb-1">
                  {coupon.title}
                </h3>
                <p className="text-xs text-[#4B535F] leading-relaxed mb-4">
                  {coupon.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E7EE]">
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-[4px] bg-[#121417] text-white hover:bg-black transition-colors font-display font-semibold uppercase tracking-wider text-xs"
                  title="Click to copy coupon code"
                >
                  <span className="flex items-center gap-1.5">
                    Code: <b className="text-[#FF6A1A]">{coupon.code}</b>
                  </span>
                  <span className="text-[11px] text-[#8C96A4] flex items-center gap-1">
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2FBF71]" />
                        <span className="text-[#2FBF71] font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </span>
                </button>

                <small className="block text-[11px] text-[#8C96A4] mt-2 leading-tight">
                  {coupon.note}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
