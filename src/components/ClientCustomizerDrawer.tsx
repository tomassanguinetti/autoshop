import React, { useState } from 'react';
import { ClientConfig } from '../types/client';
import { PRESET_CLIENTS } from '../data/presetClients';
import {
  X,
  Sliders,
  Palette,
  Phone,
  Building2,
  ShieldCheck,
  Check,
  Copy,
  Download,
  RotateCcw
} from 'lucide-react';

interface ClientCustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientConfig;
  onUpdateClient: (updated: ClientConfig) => void;
  onResetClient: () => void;
}

export const ClientCustomizerDrawer: React.FC<ClientCustomizerDrawerProps> = ({
  isOpen,
  onClose,
  client,
  onUpdateClient,
  onResetClient,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(client, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(client, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${client.businessName.toLowerCase().replace(/\s+/g, '-')}-config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const colorThemes: { id: ClientConfig['accentTheme']; name: string; hex: string }[] = [
    { id: 'orange', name: 'Safety Orange', hex: '#FF6A1A' },
    { id: 'red', name: 'Racer Red', hex: '#dc2626' },
    { id: 'blue', name: 'German Blue', hex: '#2563eb' },
    { id: 'green', name: 'Precision Green', hex: '#059669' },
    { id: 'amber', name: 'Torque Gold', hex: '#f59e0b' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#191C21] border-l border-[#31363F] h-full flex flex-col shadow-2xl text-[#B9C1CC]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#31363F] bg-[#121417] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-[4px] bg-[#21252C] text-[#FF6A1A]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold uppercase text-lg text-white m-0 tracking-wide">
                Client Rebrand Studio
              </h3>
              <p className="text-xs text-[#8C96A4] m-0">Adapt Torque for any automotive client</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-[4px] text-[#8C96A4] hover:text-white hover:bg-[#21252C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          {/* Preset Selector */}
          <div>
            <label className="block font-display font-bold text-white uppercase tracking-wider mb-2">
              Select Client Preset
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PRESET_CLIENTS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => onUpdateClient({ ...preset })}
                  className={`p-2.5 rounded-[4px] text-left transition-colors border ${
                    client.id === preset.id
                      ? 'bg-[#2A2F37] text-white border-[#FF6A1A] shadow-xs'
                      : 'bg-[#121417] text-[#8C96A4] border-[#31363F] hover:text-white hover:border-zinc-500'
                  }`}
                >
                  <p className="font-display font-bold uppercase text-xs truncate m-0">
                    {preset.businessName.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-zinc-500 truncate m-0">{preset.accentTheme}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Colors */}
          <div>
            <label className="block font-display font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#FF6A1A]" /> Brand Accent Color
            </label>
            <div className="grid grid-cols-5 gap-2">
              {colorThemes.map((th) => (
                <button
                  key={th.id}
                  onClick={() => onUpdateClient({ ...client, accentTheme: th.id })}
                  className={`p-2 rounded-[4px] border text-center transition-all flex flex-col items-center gap-1 ${
                    client.accentTheme === th.id
                      ? 'border-white bg-[#2A2F37] shadow-sm'
                      : 'border-[#31363F] bg-[#121417] hover:border-zinc-500'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full shadow-inner"
                    style={{ backgroundColor: th.hex }}
                  />
                  <span className="text-[10px] text-zinc-300 truncate w-full text-center">
                    {th.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Business Info */}
          <div className="space-y-3">
            <label className="block font-display font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#FF6A1A]" /> Shop Identity
            </label>
            <div>
              <span className="text-zinc-400 block mb-1">Business Name</span>
              <input
                type="text"
                value={client.businessName}
                onChange={(e) => onUpdateClient({ ...client, businessName: e.target.value })}
                className="w-full bg-[#121417] border border-[#31363F] rounded-[4px] px-3 py-2 text-white focus:outline-none focus:border-[#FF6A1A]"
              />
            </div>
            <div>
              <span className="text-zinc-400 block mb-1">Headline Tagline</span>
              <input
                type="text"
                value={client.tagline}
                onChange={(e) => onUpdateClient({ ...client, tagline: e.target.value })}
                className="w-full bg-[#121417] border border-[#31363F] rounded-[4px] px-3 py-2 text-white focus:outline-none focus:border-[#FF6A1A]"
              />
            </div>
            <div>
              <span className="text-zinc-400 block mb-1">Subhead Description</span>
              <textarea
                rows={2}
                value={client.subTagline}
                onChange={(e) => onUpdateClient({ ...client, subTagline: e.target.value })}
                className="w-full bg-[#121417] border border-[#31363F] rounded-[4px] px-3 py-2 text-white focus:outline-none focus:border-[#FF6A1A] resize-none"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <label className="block font-display font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#FF6A1A]" /> Contact &amp; Hours
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-zinc-400 block mb-1">Phone Number</span>
                <input
                  type="text"
                  value={client.phone}
                  onChange={(e) => onUpdateClient({ ...client, phone: e.target.value })}
                  className="w-full bg-[#121417] border border-[#31363F] rounded-[4px] px-3 py-2 text-white focus:outline-none focus:border-[#FF6A1A]"
                />
              </div>
              <div>
                <span className="text-zinc-400 block mb-1">Founded Year</span>
                <input
                  type="number"
                  value={client.foundedYear}
                  onChange={(e) => onUpdateClient({ ...client, foundedYear: Number(e.target.value) })}
                  className="w-full bg-[#121417] border border-[#31363F] rounded-[4px] px-3 py-2 text-white focus:outline-none focus:border-[#FF6A1A]"
                />
              </div>
            </div>
            <div>
              <span className="text-zinc-400 block mb-1">Shop Address</span>
              <input
                type="text"
                value={client.address}
                onChange={(e) => onUpdateClient({ ...client, address: e.target.value })}
                className="w-full bg-[#121417] border border-[#31363F] rounded-[4px] px-3 py-2 text-white focus:outline-none focus:border-[#FF6A1A]"
              />
            </div>
            <div>
              <span className="text-zinc-400 block mb-1">City, State, Zip</span>
              <input
                type="text"
                value={client.cityStateZip}
                onChange={(e) => onUpdateClient({ ...client, cityStateZip: e.target.value })}
                className="w-full bg-[#121417] border border-[#31363F] rounded-[4px] px-3 py-2 text-white focus:outline-none focus:border-[#FF6A1A]"
              />
            </div>
          </div>

          {/* Warranty & Stats */}
          <div className="space-y-3">
            <label className="block font-display font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF6A1A]" /> Warranty &amp; Reviews
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-zinc-400 block mb-1">Warranty (Months)</span>
                <input
                  type="number"
                  value={client.warrantyMonths}
                  onChange={(e) => onUpdateClient({ ...client, warrantyMonths: Number(e.target.value) })}
                  className="w-full bg-[#121417] border border-[#31363F] rounded-[4px] px-3 py-2 text-white focus:outline-none focus:border-[#FF6A1A]"
                />
              </div>
              <div>
                <span className="text-zinc-400 block mb-1">Warranty (Miles)</span>
                <input
                  type="number"
                  value={client.warrantyMiles}
                  onChange={(e) => onUpdateClient({ ...client, warrantyMiles: Number(e.target.value) })}
                  className="w-full bg-[#121417] border border-[#31363F] rounded-[4px] px-3 py-2 text-white focus:outline-none focus:border-[#FF6A1A]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-zinc-400 block mb-1">Google Rating</span>
                <input
                  type="number"
                  step="0.1"
                  value={client.rating}
                  onChange={(e) => onUpdateClient({ ...client, rating: Number(e.target.value) })}
                  className="w-full bg-[#121417] border border-[#31363F] rounded-[4px] px-3 py-2 text-white focus:outline-none focus:border-[#FF6A1A]"
                />
              </div>
              <div>
                <span className="text-zinc-400 block mb-1">Review Count</span>
                <input
                  type="number"
                  value={client.reviewsCount}
                  onChange={(e) => onUpdateClient({ ...client, reviewsCount: Number(e.target.value) })}
                  className="w-full bg-[#121417] border border-[#31363F] rounded-[4px] px-3 py-2 text-white focus:outline-none focus:border-[#FF6A1A]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#31363F] bg-[#121417] space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyJson}
              className="flex-1 py-2 px-3 rounded-[4px] bg-[#21252C] hover:bg-[#2A2F37] text-white font-display uppercase tracking-wider text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#31363F]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#2FBF71]" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Config JSON'}
            </button>
            <button
              onClick={handleDownloadJson}
              className="flex-1 py-2 px-3 rounded-[4px] bg-[#21252C] hover:bg-[#2A2F37] text-white font-display uppercase tracking-wider text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#31363F]"
            >
              <Download className="w-3.5 h-3.5" /> Download .JSON
            </button>
          </div>
          <button
            onClick={onResetClient}
            className="w-full py-2 px-3 rounded-[4px] text-[#8C96A4] hover:text-white font-display uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Reset to Original Preset
          </button>
        </div>
      </div>
    </div>
  );
};
