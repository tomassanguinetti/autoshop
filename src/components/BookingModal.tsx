import React, { useState } from 'react';
import { ClientConfig } from '../types/client';
import { getTheme } from '../utils/theme';
import {
  X,
  Calendar,
  Clock,
  Car,
  CheckCircle2,
  Phone,
  User,
  Mail,
  ShieldCheck
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientConfig;
  initialService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  client,
  initialService,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialService || 'Oil & Filter Change');
  const [vehicle, setVehicle] = useState('');
  const [date, setDate] = useState('2026-10-12');
  const [time, setTime] = useState('Morning (7:30–11:00)');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const theme = getTheme(client.accentTheme);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    const code = 'TQ-' + Math.floor(10000 + Math.random() * 90000);
    setConfirmationCode(code);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-[6px] shadow-2xl overflow-hidden my-6 text-[#4B535F]">
        {/* Header */}
        <div className="bg-[#121417] text-white px-6 py-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-[4px] ${theme.primaryBg} text-white`}>
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold uppercase text-lg text-white m-0 tracking-wide">
                {isSubmitted ? 'Appointment Request In!' : 'Book a Service'}
              </h3>
              <span className="text-xs text-[#8C96A4] block">
                {client.businessName} · 24-month warranty on every repair
              </span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-[4px] text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 rounded-full bg-[#e8f8ef] border border-[#2FBF71] flex items-center justify-center mx-auto text-[#17643c]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-display font-bold text-2xl uppercase text-[#16191D] m-0">
                  Request Confirmed
                </h4>
                <p className="text-xs text-[#8C96A4] mt-1 m-0">
                  Confirmation Code: <strong className="text-[#FF6A1A] font-mono">{confirmationCode}</strong>
                </p>
              </div>
              <p className="text-xs text-[#4B535F] leading-relaxed max-w-md mx-auto m-0">
                Thanks, <strong>{name}</strong>. Our service advisors will call you at <strong>{phone}</strong> within one business hour to finalize your time slot and review your estimate before any work begins.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-[4px] bg-[#121417] text-white font-display font-bold uppercase tracking-wider text-xs hover:bg-black transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A]"
                  />
                </div>
                <div>
                  <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                    Service Needed
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A]"
                  >
                    {client.services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} (from ${s.fromPrice})
                      </option>
                    ))}
                    <option value="Not sure / Check Engine">Not sure / Check Engine</option>
                  </select>
                </div>
                <div>
                  <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                    Vehicle (Make/Year)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2018 Toyota RAV4"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A]"
                  />
                </div>
                <div>
                  <label className="block font-display font-bold uppercase tracking-wider text-[#16191D] text-xs mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A]"
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
                  Notes or Symptoms (optional)
                </label>
                <textarea
                  placeholder="Brake noise, vibration at highway speeds, coupon code…"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D3DAE3] rounded-[4px] text-zinc-900 bg-white focus:outline-none focus:border-[#FF6A1A] resize-none"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-[4px] font-display font-bold uppercase tracking-wider text-sm transition-all ${theme.buttonClass}`}
              >
                Confirm Appointment Request
              </button>

              <p className="text-[11px] text-[#8C96A4] text-center m-0">
                No deposit required. We will confirm pricing before any work begins.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
