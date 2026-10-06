import React, { useState, useMemo } from 'react';
import { ClientConfig, ServiceItem } from '../types/client';
import { getTheme } from '../utils/theme';
import { HazardStripe } from './HazardStripe';
import {
  Wrench,
  Disc,
  Activity,
  Compass,
  Wind,
  Layers,
  BatteryCharging,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Phone,
  Calculator,
  User,
  Car
} from 'lucide-react';

interface ServicesBookingViewProps {
  client: ClientConfig;
  onNavigateHome: () => void;
  preselectedService?: ServiceItem | null;
}

export const ServicesBookingView: React.FC<ServicesBookingViewProps> = ({
  client,
  onNavigateHome,
  preselectedService,
}) => {
  const theme = getTheme(client.accentTheme);

  // Category filter state
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Estimator state
  const [estService, setEstService] = useState('brakes');
  const [estVehicle, setEstVehicle] = useState('sedan');

  // Booking Form state
  const [bookName, setBookName] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [bookEmail, setBookEmail] = useState('');
  const [bookService, setBookService] = useState(preselectedService?.name || 'Brake Service');
  const [bookVehicle, setBookVehicle] = useState('');
  const [bookDate, setBookDate] = useState('2026-10-12');
  const [bookTime, setBookTime] = useState('Morning (7:30–11:00)');
  const [bookNotes, setBookNotes] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  // Service base prices from js/main.js
  const estimatorPrices: Record<string, [number, number]> = {
    oil: [49, 89],
    brakes: [149, 320],
    diagnostics: [89, 89],
    tires: [120, 260],
    ac: [110, 240],
    transmission: [180, 520],
    battery: [139, 220],
    inspection: [39, 59],
  };

  const vehicleMultipliers: Record<string, number> = {
    compact: 1.0,
    sedan: 1.08,
    suv: 1.2,
    truck: 1.32,
    luxury: 1.45,
  };

  const estimateCalculation = useMemo(() => {
    if (!estService || !estimatorPrices[estService]) {
      return { text: '$—', note: 'Pick a service to see an estimate' };
    }
    const mult = vehicleMultipliers[estVehicle] || 1.08;
    const [baseLo, baseHi] = estimatorPrices[estService];
    const lo = Math.round(baseLo * mult);
    const hi = Math.round(baseHi * mult);
    const text = lo === hi ? `$${lo}` : `$${lo}–$${hi}`;
    return {
      text,
      note: 'Ballpark parts + labor. Final quote confirmed before any work.',
      serviceKey: estService,
    };
  }, [estService, estVehicle]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName || !bookPhone || !bookService) return;
    const num = 'TQ-' + Math.floor(10000 + Math.random() * 90000);
    setConfirmationNumber(num);
    setBookingSubmitted(true);
  };

  const categories = [
    { id: 'all', label: 'All services' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'repair', label: 'Repair' },
    { id: 'tires', label: 'Tires & alignment' },
    { id: 'inspection', label: 'Inspection' },
  ];

  const filteredServices = client.services.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

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
    <div className="bg-[#121417] text-white">
      {/* Banner from services.html */}
      <section className="relative py-14 bg-[#121417] border-b border-[#31363F]">
        <div className="max-w-[1180px] mx-auto px-4 relative z-10 space-y-3">
          <nav className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-[#8C96A4]">
            <button
              onClick={onNavigateHome}
              className="text-[#B9C1CC] hover:text-white transition-colors"
            >
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#FF6A1A]">Services &amp; Booking</span>
          </nav>

          <h1 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white m-0">
            Services &amp; online booking
          </h1>

          <p className="text-sm sm:text-base text-[#B9C1CC] max-w-2xl leading-relaxed m-0 font-normal">
            Every repair we offer, what is included, honest starting prices and turnaround times — plus an instant estimate and a booking form to lock in your slot.
          </p>
        </div>
      </section>
      <HazardStripe />

      {/* Detailed Services Menu */}
      <section className="py-20 bg-[#EEF1F5] text-[#4B535F]">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 font-display font-semibold uppercase tracking-widest text-xs text-[#EA5A0B]">
              <span className="w-6 h-[3px] bg-[#FF6A1A] inline-block" />
              <span>Full service menu</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#16191D] m-0">
              What we can do for your car
            </h2>
            <p className="text-sm text-[#4B535F] leading-relaxed m-0">
              Filter by category, then book online or call. Prices are starting points on most makes and models — your written estimate confirms the exact figure first.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`font-display font-semibold uppercase tracking-wider text-sm px-5 py-2.5 rounded-[4px] border transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-[#121417] text-white border-[#121417]'
                    : 'bg-white text-[#4B535F] border-[#D3DAE3] hover:border-[#FF6A1A] hover:text-[#C94A05]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Detailed Cards 2-Col Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                className="bg-white border border-[#D3DAE3] rounded-[6px] p-6 sm:p-7 flex gap-5 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-[4px] bg-[#121417] flex items-center justify-center shrink-0">
                  {getServiceIcon(service.id)}
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="font-display font-bold text-xl uppercase tracking-wide text-[#16191D] m-0">
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#4B535F] leading-relaxed mt-1 m-0">
                      {service.description}
                    </p>
                  </div>

                  <ul className="m-0 p-0 list-none space-y-1.5 text-xs text-[#16191D]">
                    {service.features.map((feat, fi) => (
                      <li key={fi} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2FBF71] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-[#EEF1F5] flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-[10px] text-[#8C96A4] font-display uppercase tracking-wider block">
                          From
                        </span>
                        <b className="font-display font-bold text-2xl text-[#C94A05]">
                          ${service.fromPrice}
                        </b>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#8C96A4] font-display uppercase tracking-wider block">
                          Time
                        </span>
                        <span className="font-display font-bold text-base text-[#16191D]">
                          {service.duration}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setBookService(service.name);
                        const el = document.getElementById('book-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="font-display font-bold text-xs uppercase tracking-wider text-[#FF6A1A] hover:underline"
                    >
                      Select &amp; Book
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Estimator + Booking Section */}
      <section id="book-section" className="py-20 bg-[#191C21] tq-carbon text-white border-b border-[#31363F]">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className="inline-flex items-center gap-2 font-display font-semibold uppercase tracking-widest text-xs text-[#FF6A1A]">
              <span className="w-6 h-[3px] bg-[#FF6A1A] inline-block" />
              <span>Book in two minutes</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white m-0">
              Get an estimate &amp; reserve your slot
            </h2>
            <p className="text-sm text-[#B9C1CC] leading-relaxed m-0">
              Ballpark the cost first, then send us your preferred day and time. We will confirm by phone within one business hour.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Estimator Card */}
            <div className="lg:col-span-5 bg-[#21252C] border border-[#31363F] rounded-[6px] p-6 sm:p-7 space-y-5 shadow-xl">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-2xl uppercase tracking-wide text-white m-0">
                  Instant cost estimator
                </h3>
                <p className="text-xs text-[#B9C1CC] m-0">
                  Pick a service and your vehicle type for a ballpark range. This is a guide only — your exact price is confirmed in a written quote.
                </p>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-display font-bold uppercase tracking-wider text-white text-xs mb-1">
                    Service
                  </label>
                  <select
                    value={estService}
                    onChange={(e) => setEstService(e.target.value)}
                    className="w-full px-3 py-2 border border-[#31363F] rounded-[4px] bg-[#191C21] text-white focus:outline-none focus:border-[#FF6A1A]"
                  >
                    <option value="oil">Oil &amp; filter change</option>
                    <option value="brakes">Brake service</option>
                    <option value="diagnostics">Engine diagnostics</option>
                    <option value="tires">Tires &amp; alignment</option>
                    <option value="ac">AC &amp; heating</option>
                    <option value="transmission">Transmission</option>
                    <option value="battery">Battery &amp; charging</option>
                    <option value="inspection">Safety inspection</option>
                  </select>
                </div>

                <div>
                  <label className="block font-display font-bold uppercase tracking-wider text-white text-xs mb-1">
                    Vehicle Type
                  </label>
                  <select
                    value={estVehicle}
                    onChange={(e) => setEstVehicle(e.target.value)}
                    className="w-full px-3 py-2 border border-[#31363F] rounded-[4px] bg-[#191C21] text-white focus:outline-none focus:border-[#FF6A1A]"
                  >
                    <option value="compact">Compact car</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV / crossover</option>
                    <option value="truck">Truck / van</option>
                    <option value="luxury">Luxury / European</option>
                  </select>
                </div>

                {/* Estimate Output Box */}
                <div className="bg-[#121417] border border-[#31363F] rounded-[4px] p-6 text-center space-y-1 shadow-inner">
                  <div className="font-display font-semibold uppercase tracking-wider text-xs text-[#8C96A4]">
                    Estimated Price
                  </div>
                  <div className="font-display font-bold text-5xl text-[#FF6A1A] leading-tight">
                    {estimateCalculation.text}
                  </div>
                  <small className="block text-[11px] text-[#8C96A4]">
                    {estimateCalculation.note}
                  </small>
                </div>
              </div>
            </div>

            {/* Booking Form Card */}
            <div className="lg:col-span-7 bg-white text-[#4B535F] border border-[#D3DAE3] rounded-[6px] p-6 sm:p-8 shadow-xl">
              <h3 className="font-display font-bold text-2xl uppercase tracking-wide text-[#16191D] mt-0 mb-4">
                Request an appointment
              </h3>

              {bookingSubmitted ? (
                <div className="bg-[#e8f8ef] border border-[#2FBF71] rounded-[4px] p-6 text-[#17643c] space-y-4 text-center">
                  <CheckCircle2 className="w-12 h-12 text-[#2FBF71] mx-auto" />
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-2xl uppercase text-[#17643c] m-0">
                      Appointment Requested!
                    </h4>
                    <p className="text-xs">
                      Reference Code: <strong>{confirmationNumber}</strong>
                    </p>
                  </div>
                  <p className="text-xs leading-relaxed max-w-md mx-auto m-0">
                    Thanks, <strong>{bookName}</strong>! We have recorded your requested service (<strong>{bookService}</strong>) for <strong>{bookDate}</strong> ({bookTime}). A service advisor will call <strong>{bookPhone}</strong> within one business hour to confirm the bay schedule and estimate.
                  </p>
                  <button
                    onClick={() => setBookingSubmitted(false)}
                    className="text-xs text-[#17643c] underline font-bold mt-2"
                  >
                    Submit another booking request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A] focus:ring-2 focus:ring-[#FF6A1A]/20"
                      />
                    </div>
                    <div>
                      <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={bookPhone}
                        onChange={(e) => setBookPhone(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A] focus:ring-2 focus:ring-[#FF6A1A]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={bookEmail}
                      onChange={(e) => setBookEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A] focus:ring-2 focus:ring-[#FF6A1A]/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                        Service Needed
                      </label>
                      <select
                        value={bookService}
                        onChange={(e) => setBookService(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A] focus:ring-2 focus:ring-[#FF6A1A]/20"
                      >
                        <option value="">Choose a service…</option>
                        {client.services.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name} (from ${s.fromPrice})
                          </option>
                        ))}
                        <option value="Other / not sure">Other / not sure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                        Vehicle (make/year)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2018 Toyota"
                        value={bookVehicle}
                        onChange={(e) => setBookVehicle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A] focus:ring-2 focus:ring-[#FF6A1A]/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={bookDate}
                        onChange={(e) => setBookDate(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A] focus:ring-2 focus:ring-[#FF6A1A]/20"
                      />
                    </div>

                    <div>
                      <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                        Preferred Time
                      </label>
                      <select
                        value={bookTime}
                        onChange={(e) => setBookTime(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A] focus:ring-2 focus:ring-[#FF6A1A]/20"
                      >
                        <option>Morning (7:30–11:00)</option>
                        <option>Midday (11:00–2:00)</option>
                        <option>Afternoon (2:00–6:00)</option>
                        <option>Saturday (8:00–3:00)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                      Anything else? (optional)
                    </label>
                    <textarea
                      placeholder="Symptoms, noises, warning lights, or a coupon code…"
                      rows={3}
                      value={bookNotes}
                      onChange={(e) => setBookNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A] focus:ring-2 focus:ring-[#FF6A1A]/20 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3.5 rounded-[4px] font-display font-bold uppercase tracking-wider text-sm transition-all ${theme.buttonClass}`}
                  >
                    Request appointment
                  </button>

                  <p className="text-[11px] text-[#8C96A4] text-center m-0">
                    We will call to confirm your slot and price. No deposit required.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call directly CTA band */}
      <section className="py-16 bg-[#121417] text-white text-center border-t border-[#31363F]">
        <div className="max-w-[1180px] mx-auto px-4 space-y-3">
          <div className="inline-flex items-center gap-2 font-display font-semibold uppercase tracking-widest text-xs text-[#FF6A1A]">
            <span className="w-6 h-[3px] bg-[#FF6A1A] inline-block" />
            <span>Prefer to talk it through?</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-white m-0">
            Call the shop directly
          </h2>
          <p className="text-sm text-[#B9C1CC] max-w-md mx-auto m-0">
            Our service advisors can book you in, answer questions, and give ballpark pricing right over the phone.
          </p>
          <div className="pt-3">
            <a
              href={`tel:${client.phone.replace(/\D/g, '')}`}
              className={`inline-flex items-center gap-2 px-7 py-3 rounded-[4px] font-display font-bold uppercase tracking-wider text-base ${theme.buttonClass}`}
            >
              <Phone className="w-4 h-4" />
              <span>Call {client.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
