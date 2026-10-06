export interface ThemeStyles {
  primaryBg: string;
  primaryHover: string;
  primaryText: string;
  primaryHex: string;
  accentBorder: string;
  badgeBg: string;
  glow: string;
  ring: string;
  buttonClass: string;
  outlineButtonClass: string;
  accentText: string;
}

export const THEMES: Record<string, ThemeStyles> = {
  orange: {
    primaryBg: 'bg-[#FF6A1A]',
    primaryHover: 'hover:bg-[#EA5A0B]',
    primaryText: 'text-[#FF6A1A]',
    primaryHex: '#FF6A1A',
    accentBorder: 'border-[#FF6A1A]',
    badgeBg: 'bg-[#FF6A1A]/15 text-[#FF6A1A] border border-[#FF6A1A]/40',
    glow: 'shadow-[#FF6A1A]/20',
    ring: 'ring-[#FF6A1A]',
    buttonClass: 'bg-[#FF6A1A] hover:bg-[#EA5A0B] text-white shadow-lg shadow-[#FF6A1A]/25',
    outlineButtonClass: 'border-[#FF6A1A] text-[#FF6A1A] hover:bg-[#FF6A1A] hover:text-white',
    accentText: 'text-[#FF6A1A]',
  },
  red: {
    primaryBg: 'bg-red-600',
    primaryHover: 'hover:bg-red-500',
    primaryText: 'text-red-500',
    primaryHex: '#dc2626',
    accentBorder: 'border-red-600',
    badgeBg: 'bg-red-950/40 text-red-400 border border-red-800/60',
    glow: 'shadow-red-600/20',
    ring: 'ring-red-500',
    buttonClass: 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/50',
    outlineButtonClass: 'border-red-600 text-red-400 hover:bg-red-600 hover:text-white',
    accentText: 'text-red-400',
  },
  blue: {
    primaryBg: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-500',
    primaryText: 'text-blue-500',
    primaryHex: '#2563eb',
    accentBorder: 'border-blue-600',
    badgeBg: 'bg-blue-950/40 text-blue-400 border border-blue-800/60',
    glow: 'shadow-blue-600/20',
    ring: 'ring-blue-500',
    buttonClass: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-950/50',
    outlineButtonClass: 'border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white',
    accentText: 'text-blue-400',
  },
  green: {
    primaryBg: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-500',
    primaryText: 'text-emerald-500',
    primaryHex: '#059669',
    accentBorder: 'border-emerald-600',
    badgeBg: 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/60',
    glow: 'shadow-emerald-600/20',
    ring: 'ring-emerald-500',
    buttonClass: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50',
    outlineButtonClass: 'border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white',
    accentText: 'text-emerald-400',
  },
  amber: {
    primaryBg: 'bg-amber-500',
    primaryHover: 'hover:bg-amber-400',
    primaryText: 'text-amber-500',
    primaryHex: '#f59e0b',
    accentBorder: 'border-amber-500',
    badgeBg: 'bg-amber-950/40 text-amber-300 border border-amber-800/60',
    glow: 'shadow-amber-500/20',
    ring: 'ring-amber-400',
    buttonClass: 'bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-950/50',
    outlineButtonClass: 'border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-zinc-950',
    accentText: 'text-amber-400',
  },
};

export function getTheme(themeKey: string): ThemeStyles {
  return THEMES[themeKey] || THEMES.orange;
}
