/**
 * LogicLords — Reusable UI Components
 * Import what you need: import { Av, RoleBadge, PBar } from './components/ui';
 */
import { useEffect, useState } from 'react';
import { Github, Linkedin, Check, X, Info, Bell, Shield } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://logiclords-backend.onrender.com/api';
const API_ORIGIN = API_BASE.replace(/\/api\/?$/, '');

const resolveAvatarUrl = src => {
  if (!src) return null;
  if (/^(blob:|data:|https?:\/\/)/i.test(src)) return src;
  return `${API_ORIGIN}${src.startsWith('/') ? src : `/${src}`}`;
};

/* ── Colour maps ── */
export const ROLE_COLORS = {
  'Frontend':   { bg:'rgba(99,102,241,.15)',  text:'#818cf8', border:'rgba(99,102,241,.3)'  },
  'Backend':    { bg:'rgba(16,185,129,.15)',  text:'#34d399', border:'rgba(16,185,129,.3)'  },
  'AI/ML':      { bg:'rgba(245,158,11,.15)',  text:'#fbbf24', border:'rgba(245,158,11,.3)'  },
  'Designer':   { bg:'rgba(236,72,153,.15)',  text:'#f472b6', border:'rgba(236,72,153,.3)'  },
  'DevOps':     { bg:'rgba(0,245,212,.12)',   text:'#00f5d4', border:'rgba(0,245,212,.3)'   },
  'Full Stack': { bg:'rgba(239,68,68,.15)',   text:'#f87171', border:'rgba(239,68,68,.3)'   },
  'Mobile':     { bg:'rgba(168,85,247,.15)',  text:'#c084fc', border:'rgba(168,85,247,.3)'  },
};

export const AVATAR_COLORS = ['#6366f1','#ec4899','#f59e0b','#10b981','#00f5d4','#f87171','#8b5cf6','#c084fc'];

export const getAvatarColor = (name = '') => {
  let h = 0;
  for (const c of name) h = c.charCodeAt(0) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
};

export const getInitials = (name = '') =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '??';

/* ── Avatar ── */
export const Av = ({ name = '?', size = 44, src = null, style = {} }) => {
  const c = getAvatarColor(name);
  const [imgError, setImgError] = useState(false);
  const avatarSrc = resolveAvatarUrl(src);
  useEffect(() => setImgError(false), [avatarSrc]);
  if (avatarSrc && !imgError) return (
    <img src={avatarSrc} alt={name} onError={() => setImgError(true)} style={{ width:size, height:size, borderRadius:'50%', objectFit:'cover', border:`2px solid ${c}40`, flexShrink:0, ...style }}/>
  );
  return (
    <div style={{
      width:size, height:size, borderRadius:'50%', background:`${c}16`, border:`2px solid ${c}35`,
      display:'flex', alignItems:'center', justifyContent:'center', fontSize:size*.33,
      fontWeight:700, color:c, fontFamily:'Orbitron,monospace', flexShrink:0, letterSpacing:'-1px', ...style
    }}>
      {getInitials(name)}
    </div>
  );
};

/* ── Role Badge ── */
export const RoleBadge = ({ role }) => {
  const c = ROLE_COLORS[role] || { bg:'rgba(100,116,139,.15)', text:'#94a3b8', border:'rgba(100,116,139,.3)' };
  return (
    <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 9px', borderRadius:999,
      fontSize:10, fontWeight:700, letterSpacing:'.6px', textTransform:'uppercase',
      background:c.bg, color:c.text, border:`1px solid ${c.border}` }}>
      {role}
    </span>
  );
};

/* ── Skill Chip ── */
export const Chip = ({ label, color = '#00f5d4' }) => (
  <span style={{ background:`${color}08`, border:`1px solid ${color}20`, color:'#6b87a8',
    padding:'2px 8px', borderRadius:4, fontSize:10, fontFamily:'Fira Code,monospace' }}>
    {label}
  </span>
);

/* ── Progress Bar ── */
export const PBar = ({ value = 0, color = '#00f5d4', height = 5 }) => (
  <div style={{ background:'rgba(255,255,255,.06)', borderRadius:999, height, overflow:'hidden' }}>
    <div style={{
      height:'100%', borderRadius:999, transition:'width .7s ease',
      background:`linear-gradient(90deg,${color},#3b82f6)`,
      width:`${Math.min(100, Math.max(0, value))}%`,
    }}/>
  </div>
);

/* ── Section Heading ── */
export const SecHead = ({ pre, title, sub, center = true }) => (
  <div style={{ textAlign:center?'center':'left', marginBottom:48 }}>
    <div style={{ fontFamily:'Fira Code,monospace', fontSize:11, color:'#00f5d4', letterSpacing:4, textTransform:'uppercase', marginBottom:10 }}>
      {'// '}{pre}
    </div>
    <h2 style={{ fontFamily:'Orbitron,monospace', fontWeight:900, fontSize:'clamp(24px,4vw,40px)', color:'#dde6f0', letterSpacing:-1 }}>
      {title}
    </h2>
    {sub && <p style={{ color:'#6b87a8', fontSize:14, marginTop:10, lineHeight:1.7, maxWidth:520, margin:center?'10px auto 0':'10px 0 0' }}>{sub}</p>}
    <div style={{ width:54, height:3, background:'linear-gradient(90deg,#00f5d4,#3b82f6)', margin:center?'14px auto 0':'14px 0 0', borderRadius:999 }}/>
  </div>
);

/* ── Toast Container ── */
export const ToastContainer = ({ toasts, remove }) => (
  <div style={{ position:'fixed', bottom:28, right:28, zIndex:9999, display:'flex', flexDirection:'column', gap:8 }}>
    {toasts.map(t => {
      const colors = { success:['#00f5d4','rgba(0,245,212,.2)'], error:['#f87171','rgba(239,68,68,.2)'], info:['#fbbf24','rgba(251,191,36,.15)'] };
      const [tc, bc] = colors[t.type] || colors.info;
      const Icon = t.type === 'success' ? Check : t.type === 'error' ? X : Info;
      return (
        <div key={t.id} style={{
          animation:'toastIn .32s ease', background:'#060f24', borderRadius:12,
          padding:'13px 17px', display:'flex', alignItems:'center', gap:12,
          minWidth:280, boxShadow:'0 20px 40px rgba(0,0,0,.6)', border:`1px solid ${bc}`,
        }}>
          <div style={{ width:26, height:26, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, background:`${tc}12`, color:tc }}>
            <Icon size={12}/>
          </div>
          <span style={{ fontSize:13, color:'#dde6f0', flex:1 }}>{t.msg}</span>
          <button onClick={() => remove(t.id)} style={{ background:'none', border:'none', cursor:'pointer', color:'#4a6080', display:'flex' }}><X size={12}/></button>
        </div>
      );
    })}
  </div>
);

/* ── Spinner ── */
export const Spinner = ({ size = 20, color = '#00f5d4' }) => (
  <span style={{ display:'inline-block', width:size, height:size, borderRadius:'50%',
    border:`2px solid ${color}30`, borderTopColor:color, animation:'spin .8s linear infinite' }}/>
);

/* ── Empty State ── */
export const Empty = ({ icon, title, desc }) => (
  <div style={{ textAlign:'center', padding:'60px 20px', color:'#4a6080' }}>
    <div style={{ marginBottom:14, opacity:.25, display:'flex', justifyContent:'center' }}>{icon}</div>
    <div style={{ fontSize:15, fontWeight:600, color:'#6b87a8', marginBottom:6 }}>{title}</div>
    {desc && <p style={{ fontSize:13, color:'#4a6080' }}>{desc}</p>}
  </div>
);

/* ── Admin Only Badge ── */
export const AdminBadge = () => (
  <span style={{
    display:'inline-flex', alignItems:'center', gap:4, padding:'3px 9px', borderRadius:999,
    fontSize:10, fontWeight:700, letterSpacing:'.6px', textTransform:'uppercase',
    background:'rgba(0,245,212,.09)', color:'#00f5d4', border:'1px solid rgba(0,245,212,.22)',
  }}>
    <Shield size={8}/> Admin
  </span>
);

/* ── Input ── */
export const Input = ({ label, error, ...props }) => (
  <div>
    {label && <label style={{ fontSize:11, fontWeight:600, letterSpacing:'1.2px', textTransform:'uppercase', color:'#4a6080', marginBottom:7, display:'block' }}>{label}</label>}
    <input
      style={{
        background:'rgba(4,10,28,.9)', border:`1px solid ${error ? 'rgba(239,68,68,.4)' : 'rgba(255,255,255,.08)'}`,
        color:'#dde6f0', padding:'11px 15px', borderRadius:8, fontFamily:'Outfit,sans-serif',
        fontSize:14, width:'100%', outline:'none',
      }}
      {...props}
    />
    {error && <p style={{ fontSize:11, color:'#f87171', marginTop:5 }}>{error}</p>}
  </div>
);

/* ── Modal wrapper ── */
export const Modal = ({ children, onClose, maxWidth = 520 }) => (
  <div
    style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.87)', backdropFilter:'blur(8px)', zIndex:900, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}
    onClick={onClose}
  >
    <div
      style={{ background:'#050e22', border:'1px solid rgba(0,245,212,.12)', borderRadius:18, padding:32, maxWidth, width:'100%', maxHeight:'90vh', overflowY:'auto', animation:'fadeUp .28s ease', position:'relative' }}
      onClick={e => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

/* ── Card ── */
export const Card = ({ children, style = {}, hover = true, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background:'rgba(8,18,38,.8)', border:'1px solid rgba(255,255,255,.07)', borderRadius:14,
      position:'relative', overflow:'hidden', backdropFilter:'blur(8px)',
      transition:'all .3s cubic-bezier(.4,0,.2,1)', cursor:onClick?'pointer':'default', ...style,
    }}
    className={hover ? 'card' : ''}
  >
    {children}
  </div>
);

/* ── Social Links ── */
export const SocialLinks = ({ github, linkedin, size = 16 }) => (
  <div style={{ display:'flex', gap:10 }}>
    {github && (
      <a href={github} target="_blank" rel="noreferrer" style={{ color:'#6b87a8', display:'flex', transition:'color .2s' }}
        onMouseEnter={e => e.currentTarget.style.color = '#00f5d4'}
        onMouseLeave={e => e.currentTarget.style.color = '#6b87a8'}>
        <Github size={size}/>
      </a>
    )}
    {linkedin && (
      <a href={linkedin} target="_blank" rel="noreferrer" style={{ color:'#6b87a8', display:'flex', transition:'color .2s' }}
        onMouseEnter={e => e.currentTarget.style.color = '#3b82f6'}
        onMouseLeave={e => e.currentTarget.style.color = '#6b87a8'}>
        <Linkedin size={size}/>
      </a>
    )}
  </div>
);
