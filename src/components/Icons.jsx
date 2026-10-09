const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const BellLogo = ({ size = 30, accent = '#E8B92E' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M10 6h12l3 16H7z" fill={accent} />
    <path d="M7 22h18" stroke="#1B1B18" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="25.5" r="2.5" fill="#1B1B18" />
    <path d="M13 6V4h6v2" stroke="#1B1B18" strokeWidth="2" />
  </svg>
);

export const Grass = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2.2}>
    <path d="M4 21c1-6 1-10 0-14" /><path d="M9 21c0-7 2-11 4-15" /><path d="M14 21c1-5 3-8 6-10" /><path d="M2 21h20" />
  </svg>
);
export const Search = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
);
export const Plus = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2.4}><path d="M12 5v14M5 12h14" /></svg>
);
export const Cowbell = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}><path d="M8 4h8l2 12H6z" /><path d="M10 20h4" /></svg>
);
export const Horn = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}><path d="M3 15c4 0 6-2 9-6s5-5 9-5" /><path d="M3 15v4" /><path d="M21 4l-1 4" /></svg>
);
export const Chat = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
);
export const Cow = ({ size = 26, filled }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M3 5c0 3 2 5 5 5" /><path d="M21 5c0 3-2 5-5 5" />
    <path d="M8 9h8v6a4 4 0 0 1-8 0z" fill={filled ? 'currentColor' : 'none'} />
    <circle cx="10.5" cy="16" r="0.7" fill={filled ? '#F6F1E4' : 'currentColor'} />
    <circle cx="13.5" cy="16" r="0.7" fill={filled ? '#F6F1E4' : 'currentColor'} />
  </svg>
);
export const Comment = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}><path d="M4 5h16v11H9l-5 4z" /></svg>
);
export const Send = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}><path d="M21 3L10 14" /><path d="M21 3l-7 18-4-7-7-4z" /></svg>
);
export const Bookmark = ({ size = 22, filled }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}><path d="M6 3h12v18l-6-4-6 4z" fill={filled ? 'currentColor' : 'none'} /></svg>
);
export const Back = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}><path d="M15 5l-7 7 7 7" /></svg>
);
export const Close = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Menu = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Shield = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
);
export const External = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}><path d="M14 4h6v6" /><path d="M20 4l-9 9" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
);
