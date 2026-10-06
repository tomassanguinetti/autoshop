import React from 'react';

export const BrandsSection: React.FC = () => {
  const brands = [
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Subaru',
    'BMW', 'Jeep', 'Hyundai', 'Ram', 'Volkswagen', 'Mazda', 'GMC', 'Kia'
  ];

  return (
    <section className="py-12 bg-[#EEF1F5] border-b border-[#D3DAE3]">
      <div className="max-w-[1180px] mx-auto px-4 text-center">
        <p className="font-display font-semibold uppercase tracking-widest text-xs text-[#8C96A4] mb-5 m-0">
          Domestic, import &amp; hybrid — we service the makes you drive
        </p>
        <div className="flex flex-wrap gap-2.5 justify-center">
          {brands.map((b, i) => (
            <span
              key={i}
              className="font-display font-semibold uppercase tracking-wider text-sm sm:text-base text-[#4B535F] border border-[#D3DAE3] rounded-full px-5 py-2 bg-white hover:border-[#FF6A1A] hover:text-[#C94A05] transition-colors shadow-2xs select-none"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
