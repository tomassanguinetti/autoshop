import React from 'react';
import { ClientConfig } from '../types/client';
import { getTheme } from '../utils/theme';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation
} from 'lucide-react';

interface HoursLocationProps {
  client: ClientConfig;
}

export const HoursLocation: React.FC<HoursLocationProps> = ({ client }) => {
  const theme = getTheme(client.accentTheme);

  // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
  const todayDayIndex = new Date().getDay();

  const schedule = [
    { dayIndex: 1, name: 'Monday', hours: client.hours.weekdays, closed: false },
    { dayIndex: 2, name: 'Tuesday', hours: client.hours.weekdays, closed: false },
    { dayIndex: 3, name: 'Wednesday', hours: client.hours.weekdays, closed: false },
    { dayIndex: 4, name: 'Thursday', hours: client.hours.weekdays, closed: false },
    { dayIndex: 5, name: 'Friday', hours: client.hours.weekdays, closed: false },
    { dayIndex: 6, name: 'Saturday', hours: client.hours.saturday, closed: false },
    { dayIndex: 0, name: 'Sunday', hours: client.hours.sunday, closed: client.hours.sunday.toLowerCase().includes('closed') },
  ];

  return (
    <section id="visit" className="py-20 bg-[#EEF1F5] text-[#4B535F]">
      <div className="max-w-[1180px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left: Hours & Info */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 font-display font-semibold uppercase tracking-widest text-xs text-[#EA5A0B]">
                <span className="w-6 h-[3px] bg-[#FF6A1A] inline-block" />
                <span>Find us · Hours</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#16191D] mt-2 mb-3">
                Stop by the shop
              </h2>
              <p className="text-base text-[#4B535F] leading-relaxed m-0">
                We're on {client.address.split(',')[0]} with plenty of parking and a comfortable, coffee-stocked waiting room. Early-bird and after-hours key drop available.
              </p>
            </div>

            {/* Operating Schedule with auto-highlighted current day */}
            <div className="bg-white rounded-[6px] border border-[#D3DAE3] p-5 shadow-2xs space-y-2">
              <span className="font-display font-bold uppercase tracking-wider text-xs text-[#16191D] block mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF6A1A]" /> Operating Schedule
              </span>
              <ul className="m-0 p-0 list-none space-y-1">
                {schedule.map((row) => {
                  const isToday = row.dayIndex === todayDayIndex;
                  return (
                    <li
                      key={row.dayIndex}
                      className={`flex items-center justify-between py-2 px-3 rounded-[4px] text-sm transition-colors ${
                        isToday
                          ? 'bg-[#FFE7D6] font-semibold text-[#16191D]'
                          : 'text-[#4B535F] border-b border-[#EEF1F5] last:border-0'
                      }`}
                    >
                      <span className="font-display uppercase tracking-wide flex items-center gap-2">
                        <span>{row.name}</span>
                        {isToday && (
                          <span className="text-[10px] bg-[#FF6A1A] text-white px-1.5 py-0.2 rounded font-sans uppercase font-bold tracking-wider">
                            Today
                          </span>
                        )}
                      </span>
                      <span className={row.closed ? 'text-[#c0392b] font-semibold' : 'text-zinc-800'}>
                        {row.hours}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Contact details */}
            <div className="space-y-3 pt-2 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF6A1A] shrink-0 mt-0.5" />
                <div>
                  <b className="font-display uppercase text-base text-[#16191D] block">Address</b>
                  <span>{client.address}, {client.cityStateZip}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#FF6A1A] shrink-0 mt-0.5" />
                <div>
                  <b className="font-display uppercase text-base text-[#16191D] block">Phone</b>
                  <a href={`tel:${client.phone.replace(/\D/g, '')}`} className="text-[#EA5A0B] hover:underline font-semibold">
                    {client.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#FF6A1A] shrink-0 mt-0.5" />
                <div>
                  <b className="font-display uppercase text-base text-[#16191D] block">Email</b>
                  <a href={`mailto:${client.email}`} className="text-[#EA5A0B] hover:underline">
                    {client.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Mechanical Map Schematic */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative rounded-[6px] overflow-hidden min-h-[380px] h-full bg-[#191C21] border border-[#31363F] flex flex-col items-center justify-center p-8 text-center shadow-xl">
              {/* Grid blueprint lines */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                }}
              />

              {/* Pin */}
              <div className="relative z-10 space-y-4">
                <div className="w-8 h-8 rounded-full rounded-br-none bg-[#FF6A1A] -rotate-45 mx-auto shadow-[0_0_0_8px_rgba(255,106,26,0.25)]" />
                <div className="font-display font-bold text-2xl uppercase tracking-wider text-white">
                  {client.address}
                </div>
                <p className="text-xs text-[#8C96A4] max-w-xs mx-auto">
                  Convenient access from main highway. Customer parking bay directly in front.
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${client.businessName} ${client.address} ${client.cityStateZip}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-display font-bold uppercase tracking-wider text-sm transition-all ${theme.buttonClass}`}
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
