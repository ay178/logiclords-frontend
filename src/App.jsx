import { useState, useEffect, useCallback, useRef } from "react";
import {
  Github, Linkedin, Search, Plus, X, Check, Trophy, Users, LogIn, LogOut,
  Star, Code2, Palette, Brain, Server, BarChart3, Clock, ChevronRight,
  Edit2, Trash2, Shield, Award, CheckCircle, Circle, Calendar, User,
  Mail, Menu, ArrowRight, Layers, Target, Zap, Database, ExternalLink,
  Home, Folder, Bell, Settings, GitBranch, Cpu, Rocket, Filter,
  TrendingUp, Globe, Terminal, Briefcase, ChevronDown, MoreHorizontal,
  Hash, Activity, Sparkles, Eye, EyeOff, MessageSquare, Flag, ChevronUp,
  BarChart2, PieChart, CheckSquare, AlertCircle, Info, RefreshCw, Copy,
  Send, Link2
} from "lucide-react";

/* ─────────────────── STYLES ─────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Outfit:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Outfit',sans-serif;background:#030b1a;color:#dde6f0;overflow-x:hidden;min-height:100vh}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#020810}
::-webkit-scrollbar-thumb{background:linear-gradient(#00f5d4,#3b82f6);border-radius:4px}
@keyframes glitch{0%,90%,100%{clip-path:none;transform:none}91%{clip-path:inset(10% 0 80% 0);transform:translate(-3px)}92%{clip-path:inset(70% 0 5% 0);transform:translate(3px)}93%{clip-path:none;transform:translate(-1px)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes toastIn{from{opacity:0;transform:translateX(110%)}to{opacity:1;transform:translateX(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes scan{from{top:-60px}to{top:calc(100%+60px)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes barGrow{from{width:0}to{width:var(--w)}}
@keyframes countUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes ripple{from{transform:scale(1);opacity:.5}to{transform:scale(2.4);opacity:0}}
.glitch-text{animation:glitch 5s infinite}
.float-anim{animation:float 4s ease-in-out infinite}
.spin-anim{display:inline-block;animation:spin .9s linear infinite;border-radius:50%;width:14px;height:14px;border:2px solid currentColor;border-top-color:transparent}
.fade-up{animation:fadeUp .45s ease both}
.pulse-dot{animation:pulse 2s ease-in-out infinite}
.grid-bg{background-image:linear-gradient(rgba(0,245,212,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,212,.03) 1px,transparent 1px);background-size:55px 55px}
.card{background:rgba(8,18,38,.8);border:1px solid rgba(255,255,255,.07);border-radius:14px;transition:all .3s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden;backdrop-filter:blur(8px)}
.card:hover{border-color:rgba(0,245,212,.22);box-shadow:0 0 0 1px rgba(0,245,212,.06),0 20px 44px rgba(0,0,0,.5);transform:translateY(-3px)}
.card::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#00f5d4,#3b82f6,#8b5cf6);opacity:0;transition:opacity .3s}
.card:hover::after{opacity:1}
.btn-primary{background:linear-gradient(135deg,#00f5d4,#3b82f6);color:#030b1a;font-weight:700;padding:11px 26px;border:none;border-radius:8px;cursor:pointer;font-family:'Outfit',sans-serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;transition:all .3s;display:inline-flex;align-items:center;gap:7px}
.btn-primary:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,245,212,.3)}
.btn-primary:disabled{opacity:.55;cursor:not-allowed}
.btn-outline{background:transparent;color:#00f5d4;font-weight:600;padding:11px 26px;border:1px solid rgba(0,245,212,.3);border-radius:8px;cursor:pointer;font-family:'Outfit',sans-serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;transition:all .3s;display:inline-flex;align-items:center;gap:7px}
.btn-outline:hover:not(:disabled){background:rgba(0,245,212,.07);border-color:#00f5d4;box-shadow:0 0 20px rgba(0,245,212,.15)}
.btn-outline:disabled{opacity:.5;cursor:not-allowed}
.btn-sm{padding:6px 14px;border-radius:6px;font-size:11px;font-family:'Outfit',sans-serif;cursor:pointer;font-weight:600;letter-spacing:.4px;transition:all .2s;border:1px solid;display:inline-flex;align-items:center;gap:5px;white-space:nowrap}
.input{background:rgba(4,10,28,.9);border:1px solid rgba(255,255,255,.08);color:#dde6f0;padding:11px 15px;border-radius:8px;font-family:'Outfit',sans-serif;font-size:14px;width:100%;outline:none;transition:border-color .3s,box-shadow .3s}
.input:focus{border-color:#00f5d4;box-shadow:0 0 0 3px rgba(0,245,212,.08)}
.input::placeholder{color:#2d4060}
.input option{background:#040a1c}
.label{font-size:11px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:#4a6080;margin-bottom:7px;display:block}
.tag{display:inline-flex;align-items:center;padding:3px 9px;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:.6px;text-transform:uppercase}
.task-card{background:rgba(4,10,28,.8);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:13px;margin-bottom:9px;cursor:pointer;transition:all .2s}
.task-card:hover{border-color:rgba(0,245,212,.28);background:rgba(0,245,212,.02);transform:translateX(2px)}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.87);backdrop-filter:blur(8px);z-index:900;display:flex;align-items:center;justify-content:center;padding:20px}
.modal{background:#050e22;border:1px solid rgba(0,245,212,.12);border-radius:18px;padding:32px;max-width:520px;width:100%;max-height:90vh;overflow-y:auto;animation:fadeUp .28s ease}
.progress-bg{background:rgba(255,255,255,.06);border-radius:999px;height:5px;overflow:hidden}
.progress-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#00f5d4,#3b82f6);transition:width .7s ease}
.nav-link{background:none;border:none;cursor:pointer;color:#6b87a8;font-size:13px;font-weight:500;padding:7px 11px;border-radius:6px;font-family:'Outfit',sans-serif;letter-spacing:.3px;transition:all .2s}
.nav-link:hover,.nav-link.active{color:#00f5d4;background:rgba(0,245,212,.07)}
.member-card{background:rgba(8,18,38,.85);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:24px;transition:all .3s;position:relative;overflow:hidden}
.member-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#00f5d4,#3b82f6);opacity:0;transition:opacity .3s}
.member-card:hover::before{opacity:1}
.member-card:hover{border-color:rgba(0,245,212,.22);transform:translateY(-4px);box-shadow:0 18px 44px rgba(0,0,0,.4)}
.toast{animation:toastIn .32s ease;background:#060f24;border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:12px;min-width:280px;box-shadow:0 20px 40px rgba(0,0,0,.6)}
.hero-scan{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,245,212,.45),transparent);animation:scan 7s linear infinite;pointer-events:none}
.stat-card{background:rgba(6,15,35,.7);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:20px 24px;text-align:center;transition:all .25s}
.stat-card:hover{border-color:rgba(0,245,212,.15);background:rgba(0,245,212,.03)}
.kanban-col{background:rgba(4,10,28,.7);border:1px solid rgba(255,255,255,.05);border-radius:12px;overflow:hidden;display:flex;flex-direction:column}
.kanban-drop-zone{min-height:200px;flex:1;padding:10px;transition:background .2s}
.kanban-drop-zone.drag-over{background:rgba(0,245,212,.04);border-radius:8px}
.priority-critical{border-left:3px solid #ef4444}
.priority-high{border-left:3px solid #f59e0b}
.priority-medium{border-left:3px solid #3b82f6}
.priority-low{border-left:3px solid #6b7280}
.analytics-bar{height:8px;border-radius:999px;background:var(--color);width:0;animation:barGrow .8s ease forwards;animation-delay:var(--delay)}
.tooltip{position:absolute;bottom:calc(100%+6px);left:50%;transform:translateX(-50%);background:#060f24;border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:5px 10px;font-size:11px;white-space:nowrap;pointer-events:none;z-index:100;opacity:0;transition:opacity .15s}
.has-tooltip:hover .tooltip{opacity:1}
@media(max-width:900px){.hide-mobile{display:none!important}}
@media(max-width:640px){.stack-sm{flex-direction:column!important}.full-sm{width:100%!important}}
`;

/* ─────────────────── CONSTANTS ─────────────────── */
const API = 'http://localhost:5000/api';
const RC = {
  'Frontend':   {bg:'rgba(99,102,241,.15)',  text:'#818cf8', border:'rgba(99,102,241,.3)'},
  'Backend':    {bg:'rgba(16,185,129,.15)',  text:'#34d399', border:'rgba(16,185,129,.3)'},
  'AI/ML':      {bg:'rgba(245,158,11,.15)',  text:'#fbbf24', border:'rgba(245,158,11,.3)'},
  'Designer':   {bg:'rgba(236,72,153,.15)',  text:'#f472b6', border:'rgba(236,72,153,.3)'},
  'DevOps':     {bg:'rgba(0,245,212,.12)',   text:'#00f5d4', border:'rgba(0,245,212,.3)'},
  'Full Stack': {bg:'rgba(239,68,68,.15)',   text:'#f87171', border:'rgba(239,68,68,.3)'},
  'Mobile':     {bg:'rgba(168,85,247,.15)',  text:'#c084fc', border:'rgba(168,85,247,.3)'},
};
const PRIORITY_META = {
  critical: {color:'#ef4444',label:'Critical',icon:<Flag size={10}/>},
  high:     {color:'#f59e0b',label:'High',    icon:<ChevronUp size={10}/>},
  medium:   {color:'#3b82f6',label:'Medium',  icon:<ChevronRight size={10}/>},
  low:      {color:'#6b7280',label:'Low',     icon:<ChevronDown size={10}/>},
};
const ROLES = ['Frontend','Backend','AI/ML','Designer','DevOps','Full Stack','Mobile'];
const AVC   = ['#6366f1','#ec4899','#f59e0b','#10b981','#00f5d4','#f87171','#8b5cf6','#c084fc'];
const getAC  = n => { let h=0; for(let c of n||'?') h=c.charCodeAt(0)+((h<<5)-h); return AVC[Math.abs(h)%AVC.length]; };
const initls = n => (n||'??').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);

/* ─────────────────── API CLIENT ─────────────────── */
const apiFetch = async (path, options = {}, token = null) => {
  const headers = { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }), ...options.headers };
  const res = await fetch(`${API}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
};

/* ─────────────────── SEED DATA (offline fallback) ─────────────────── */
const SEED_MEMBERS = [
  {_id:'1',name:'Arjun Sharma',role:'Frontend',email:'admin@logiclords.com',skills:['React','TypeScript','Figma','TailwindCSS'],github:'https://github.com',linkedin:'https://linkedin.com',isAdmin:true,bio:'Frontend lead & UI wizard.'},
  {_id:'2',name:'Priya Nair',role:'AI/ML',email:'priya@ll.com',skills:['Python','TensorFlow','NLP','PyTorch'],github:'https://github.com',linkedin:'https://linkedin.com',bio:'ML researcher with a soft spot for NLP.'},
  {_id:'3',name:'Rohan Gupta',role:'Backend',email:'rohan@ll.com',skills:['Node.js','MongoDB','Redis','Docker'],github:'https://github.com',linkedin:'https://linkedin.com',bio:'Backend architect. Cache everything.'},
  {_id:'4',name:'Sneha Reddy',role:'Designer',email:'sneha@ll.com',skills:['Figma','Adobe XD','Motion Design'],github:'https://github.com',linkedin:'https://linkedin.com',bio:'Design thinker & motion nerd.'},
  {_id:'5',name:'Dev Patel',role:'DevOps',email:'dev@ll.com',skills:['AWS','Kubernetes','Terraform'],github:'https://github.com',linkedin:'https://linkedin.com',bio:'Infrastructure nerd. Uptime > everything.'},
  {_id:'6',name:'Kavya Singh',role:'Full Stack',email:'kavya@ll.com',skills:['Next.js','GraphQL','Rust'],github:'https://github.com',linkedin:'https://linkedin.com',bio:'Full-stack polyglot.'},
];
const SEED_PROJECTS = [
  {_id:'p1',title:'AI Resume Parser',description:'NLP-powered resume parsing and job matching.',deadline:'2025-08-01',members:SEED_MEMBERS.slice(0,3),tags:['Python','FastAPI','React','OpenAI'],color:'#00f5d4',taskCount:5,completedTasks:2},
  {_id:'p2',title:'LogicLords Platform',description:'Team portfolio and project management system.',deadline:'2025-07-15',members:[SEED_MEMBERS[0],SEED_MEMBERS[3],SEED_MEMBERS[5]],tags:['React','Node.js','MongoDB'],color:'#3b82f6',taskCount:4,completedTasks:2},
  {_id:'p3',title:'Smart Campus IoT',description:'IoT-powered campus management with ML analytics.',deadline:'2025-09-30',members:[SEED_MEMBERS[1],SEED_MEMBERS[2],SEED_MEMBERS[4]],tags:['Flutter','Firebase','ML'],color:'#8b5cf6',taskCount:2,completedTasks:0},
];
const SEED_TASKS = [
  {_id:'t1',pid:'p1',title:'Setup NLP pipeline',description:'spaCy entity extraction',assignee:SEED_MEMBERS[1],status:'done',priority:'high',createdBy:SEED_MEMBERS[0]},
  {_id:'t2',pid:'p1',title:'Build REST API',description:'FastAPI endpoints for upload/parse',assignee:SEED_MEMBERS[2],status:'done',priority:'high',createdBy:SEED_MEMBERS[0]},
  {_id:'t3',pid:'p1',title:'React dashboard',description:'Upload wizard & visualization',assignee:SEED_MEMBERS[0],status:'inprogress',priority:'medium',createdBy:SEED_MEMBERS[0]},
  {_id:'t4',pid:'p1',title:'Job matching algo',description:'Cosine similarity for candidate-job matching',assignee:SEED_MEMBERS[1],status:'inprogress',priority:'critical',createdBy:SEED_MEMBERS[0]},
  {_id:'t5',pid:'p1',title:'Deploy to AWS',description:'EC2 + S3 + CloudFront',assignee:SEED_MEMBERS[4],status:'todo',priority:'medium',createdBy:SEED_MEMBERS[0]},
  {_id:'t6',pid:'p2',title:'Hero animations',description:'GSAP landing page',assignee:SEED_MEMBERS[3],status:'done',priority:'low',createdBy:SEED_MEMBERS[0]},
  {_id:'t7',pid:'p2',title:'Team cards & filters',description:'Member grid with role filter',assignee:SEED_MEMBERS[0],status:'done',priority:'medium',createdBy:SEED_MEMBERS[0]},
  {_id:'t8',pid:'p2',title:'Kanban board',description:'Drag-and-drop task management',assignee:SEED_MEMBERS[5],status:'inprogress',priority:'high',createdBy:SEED_MEMBERS[0]},
  {_id:'t9',pid:'p2',title:'JWT auth system',description:'Login, signup, RBAC',assignee:SEED_MEMBERS[2],status:'todo',priority:'critical',createdBy:SEED_MEMBERS[0]},
  {_id:'t10',pid:'p3',title:'IoT sensor integration',description:'MQTT data ingestion',assignee:SEED_MEMBERS[4],status:'todo',priority:'high',createdBy:SEED_MEMBERS[0]},
  {_id:'t11',pid:'p3',title:'ML anomaly detection',description:'Time-series model',assignee:SEED_MEMBERS[1],status:'todo',priority:'medium',createdBy:SEED_MEMBERS[0]},
];
const ACHIEVEMENTS = [
  {id:1,year:2025,title:'Smart India Hackathon',sub:'National Finals',desc:'Reached the national finals with our AI-powered campus management system competing against 10,000+ teams.',rank:'Top 5 Nationally',color:'#00f5d4',icon:'🏆'},
  {id:2,year:2025,title:'HackIndia Grand Finale',sub:'Regional Round',desc:'Won regional round with our AI Resume Parser — beat 200+ teams and secured a spot in the grand finale.',rank:'1st Place 🥇',color:'#fbbf24',icon:'⚡'},
  {id:3,year:2024,title:'HackBIT 4.0',sub:'NIT Durgapur',desc:'Best Innovative Product award for a fintech solution enabling rural banking access via mobile.',rank:'Best Innovation',color:'#818cf8',icon:'💡'},
  {id:4,year:2024,title:'DevHacks 2024',sub:'24-Hour Sprint',desc:'Built an AR-based campus navigation app with real-time crowd density heatmaps.',rank:'2nd Place 🥈',color:'#f472b6',icon:'🚀'},
  {id:5,year:2023,title:'TechFest IIT Mumbai',sub:'Debut Hackathon',desc:'Our very first hackathon — built a mental health support chatbot in 36 hours from scratch.',rank:'Recognition Award',color:'#34d399',icon:'🌱'},
];
const SHOWCASE = [
  {id:'p1',title:'AI Resume Parser & Job Matcher',problem:'Job seekers waste hours tailoring resumes. Recruiters drown in irrelevant applications costing companies millions.',solution:'NLP-powered platform that auto-parses resumes, extracts structured data, scores ATS compatibility, and intelligently matches candidates to jobs.',features:['Smart entity extraction (name, skills, experience)','ATS compatibility scoring','Job-candidate matching with explainable AI','Skill gap analysis & learning recommendations','Multi-format support (PDF, DOCX, LinkedIn)'],tech:['Python','spaCy','FastAPI','React','OpenAI GPT-4','MongoDB','Redis'],future:['Video interview AI analysis','LinkedIn OAuth','Real-time job board scraping'],color:'#00f5d4',img:'🤖'},
  {id:'p3',title:'Smart Campus IoT System',problem:'Universities waste 30%+ energy and lack real-time data on resource utilization.',solution:'Distributed IoT sensor network with centralized ML-powered analytics dashboard for intelligent campus management.',features:['Real-time space occupancy heatmaps','Predictive energy optimization','Emergency alert & evacuation system','Asset & equipment tracking','Predictive maintenance scheduling'],tech:['Flutter','Firebase','Arduino','Python','TensorFlow','MQTT','Grafana'],future:['AR wayfinding for visitors','Carbon footprint dashboard','Campus ERP integration'],color:'#8b5cf6',img:'🏫'},
];

/* ─────────────────── ATOMS ─────────────────── */
const StyleInjector = () => <style>{STYLES}</style>;

const Av = ({ name='?', size=44, src=null }) => {
  const c = getAC(name);
  if (src) return <img src={src} alt={name} style={{width:size,height:size,borderRadius:'50%',objectFit:'cover',border:`2px solid ${c}40`,flexShrink:0}}/>;
  return (
    <div style={{width:size,height:size,borderRadius:'50%',background:`${c}16`,border:`2px solid ${c}35`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:size*.33,fontWeight:700,color:c,fontFamily:'Orbitron,monospace',flexShrink:0,letterSpacing:'-1px'}}>
      {initls(name)}
    </div>
  );
};

const RoleBadge = ({ role }) => {
  const c = RC[role]||{bg:'rgba(100,116,139,.15)',text:'#94a3b8',border:'rgba(100,116,139,.3)'};
  return <span className="tag" style={{background:c.bg,color:c.text,border:`1px solid ${c.border}`}}>{role}</span>;
};

const Chip = ({ label, color='#00f5d4' }) => (
  <span style={{background:`${color}08`,border:`1px solid ${color}20`,color:'#6b87a8',padding:'2px 8px',borderRadius:4,fontSize:10,fontFamily:'Fira Code,monospace'}}>{label}</span>
);

const PBar = ({ value, color='#00f5d4' }) => (
  <div className="progress-bg">
    <div className="progress-fill" style={{width:`${Math.min(100,Math.max(0,value))}%`,background:`linear-gradient(90deg,${color},#3b82f6)`}}/>
  </div>
);

const SecHead = ({ pre, title, sub, center=true }) => (
  <div style={{textAlign:center?'center':'left',marginBottom:48}}>
    <div style={{fontFamily:'Fira Code,monospace',fontSize:11,color:'#00f5d4',letterSpacing:4,textTransform:'uppercase',marginBottom:10}}>{'// '}{pre}</div>
    <h2 style={{fontFamily:'Orbitron,monospace',fontWeight:900,fontSize:'clamp(24px,4vw,40px)',color:'#dde6f0',letterSpacing:-1}}>{title}</h2>
    {sub && <p style={{color:'#6b87a8',fontSize:14,marginTop:10,lineHeight:1.7,maxWidth:520,margin:center?'10px auto 0':'10px 0 0'}}>{sub}</p>}
    <div style={{width:54,height:3,background:'linear-gradient(90deg,#00f5d4,#3b82f6)',margin:center?'14px auto 0':'14px 0 0',borderRadius:999}}/>
  </div>
);

const LiveCount = ({ count, label, color='#00f5d4' }) => (
  <div style={{display:'flex',alignItems:'center',gap:6}}>
    <span className="pulse-dot" style={{width:6,height:6,borderRadius:'50%',background:color,display:'inline-block'}}/>
    <span style={{fontFamily:'Fira Code,monospace',fontSize:11,color,fontWeight:700}}>{count} {label}</span>
  </div>
);

/* ─────────────────── TOAST ─────────────────── */
const ToastCtx = ({ toasts, remove }) => (
  <div style={{position:'fixed',bottom:28,right:28,zIndex:9999,display:'flex',flexDirection:'column',gap:8}}>
    {toasts.map(t=>(
      <div key={t.id} className="toast" style={{border:`1px solid ${t.type==='success'?'rgba(0,245,212,.2)':t.type==='error'?'rgba(239,68,68,.2)':'rgba(251,191,36,.15)'}`}}>
        <div style={{width:26,height:26,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,background:t.type==='success'?'rgba(0,245,212,.1)':t.type==='error'?'rgba(239,68,68,.1)':'rgba(251,191,36,.1)',color:t.type==='success'?'#00f5d4':t.type==='error'?'#f87171':'#fbbf24'}}>
          {t.type==='success'?<Check size={12}/>:t.type==='error'?<X size={12}/>:<Info size={12}/>}
        </div>
        <span style={{fontSize:13,color:'#dde6f0',flex:1}}>{t.msg}</span>
        <button onClick={()=>remove(t.id)} style={{background:'none',border:'none',cursor:'pointer',color:'#4a6080'}}><X size={12}/></button>
      </div>
    ))}
  </div>
);

/* ─────────────────── NAV ─────────────────── */
const Nav = ({ page, setPage, auth, setAuth, setShowLogin }) => {
  const [scrolled,setScrolled]=useState(false);
  const [mob,setMob]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>8);window.addEventListener('scroll',fn);return()=>window.removeEventListener('scroll',fn);},[]);
  const links=[{id:'home',label:'Home'},{id:'team',label:'Team'},{id:'register',label:'Register'},{id:'achievements',label:'Achievements'},{id:'projects',label:'Projects'},{id:'management',label:'Portal 🧠'}];
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:500,background:scrolled?'rgba(3,11,26,.96)':'transparent',backdropFilter:scrolled?'blur(20px)':'none',borderBottom:scrolled?'1px solid rgba(255,255,255,.05)':'none',transition:'all .3s'}}>
      <div style={{maxWidth:1300,margin:'0 auto',height:62,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px'}}>
        <div onClick={()=>setPage('home')} style={{cursor:'pointer',display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:30,height:30,borderRadius:8,background:'linear-gradient(135deg,#00f5d4,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Zap size={15} color="#030b1a" strokeWidth={2.5}/>
          </div>
          <span style={{fontFamily:'Orbitron,monospace',fontSize:14,fontWeight:900,color:'#00f5d4',letterSpacing:1}}>LogicLords</span>
        </div>
        <div className="hide-mobile" style={{display:'flex',alignItems:'center',gap:2}}>
          {links.map(l=><button key={l.id} className={`nav-link${page===l.id?' active':''}`} onClick={()=>setPage(l.id)}>{l.label}</button>)}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          {auth ? (
            <>
              <div className="hide-mobile" style={{display:'flex',alignItems:'center',gap:8}}>
                <Av name={auth.name} size={26}/>
                <div>
                  <div style={{fontSize:12,fontWeight:600,color:'#dde6f0',lineHeight:1.2}}>{auth.name.split(' ')[0]}</div>
                  {auth.isAdmin&&<div style={{fontSize:9,color:'#00f5d4',fontFamily:'Fira Code,monospace',letterSpacing:1}}>ADMIN</div>}
                </div>
              </div>
              <button onClick={()=>setAuth(null)} className="btn-sm" style={{background:'transparent',borderColor:'rgba(248,113,113,.25)',color:'#f87171'}}><LogOut size={10}/></button>
            </>
          ) : (
            <button onClick={()=>setShowLogin(true)} className="btn-primary" style={{padding:'8px 16px',fontSize:11}}><LogIn size={12}/>Login</button>
          )}
          <button onClick={()=>setMob(o=>!o)} style={{background:'none',border:'none',cursor:'pointer',color:'#6b87a8'}} className="show-mobile"><Menu size={20}/></button>
        </div>
      </div>
    </nav>
  );
};

/* ─────────────────── HOME ─────────────────── */
const HomePage = ({ setPage, members, projects }) => {
  const features=[
    {icon:<Brain size={20}/>,title:'AI-Powered',desc:'ML solutions and intelligent automation at every level',color:'#fbbf24'},
    {icon:<Zap size={20}/>,title:'Hackathon Ready',desc:'Shipping production-grade MVPs in 24–48 hours',color:'#00f5d4'},
    {icon:<Shield size={20}/>,title:'Team-First',desc:'Role-based access, collaboration, and transparency',color:'#818cf8'},
    {icon:<Globe size={20}/>,title:'Full Stack',desc:'From mobile apps to cloud infra — we own the whole stack',color:'#f472b6'},
  ];
  const stats=[
    {label:'Team Members',value:members.length,icon:<Users size={16}/>,color:'#00f5d4'},
    {label:'Active Projects',value:projects.length,icon:<Folder size={16}/>,color:'#3b82f6'},
    {label:'Hackathons Won',value:2,icon:<Trophy size={16}/>,color:'#fbbf24'},
    {label:'Lines of Code',value:'50K+',icon:<Terminal size={16}/>,color:'#8b5cf6'},
  ];
  return (
    <div>
      {/* Hero */}
      <div className="grid-bg" style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden',padding:'120px 24px 80px',background:'radial-gradient(ellipse 80% 60% at 50% -10%,rgba(0,245,212,.07),transparent 60%)'}}>
        <div className="hero-scan"/>
        <div style={{position:'absolute',top:'18%',left:'8%',width:280,height:280,borderRadius:'50%',background:'rgba(0,245,212,.025)',filter:'blur(55px)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',bottom:'18%',right:'6%',width:380,height:380,borderRadius:'50%',background:'rgba(59,130,246,.03)',filter:'blur(70px)',pointerEvents:'none'}}/>
        <div style={{textAlign:'center',maxWidth:880,position:'relative',zIndex:1}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(0,245,212,.07)',border:'1px solid rgba(0,245,212,.18)',borderRadius:999,padding:'6px 16px',marginBottom:28}}>
            <Sparkles size={11} color="#00f5d4"/>
            <span style={{fontSize:10,color:'#00f5d4',fontFamily:'Fira Code,monospace',letterSpacing:2.5}}>HACKATHON TEAM · INDIA · EST. 2023</span>
          </div>
          <h1 className="glitch-text" style={{fontFamily:'Orbitron,monospace',fontWeight:900,fontSize:'clamp(52px,9vw,108px)',lineHeight:.95,letterSpacing:-3,color:'#00f5d4',textShadow:'0 0 80px rgba(0,245,212,.35)',marginBottom:4}}>
            Logic<span style={{color:'#dde6f0'}}>Lords</span>
          </h1>
          <div style={{fontFamily:'Fira Code,monospace',fontSize:'clamp(12px,1.8vw,16px)',color:'rgba(0,245,212,.55)',letterSpacing:5,marginBottom:28,textTransform:'uppercase'}}>
            Where Logic Meets Innovation
          </div>
          <p style={{fontSize:'clamp(14px,1.7vw,17px)',color:'#6b87a8',maxWidth:560,margin:'0 auto 44px',lineHeight:1.85}}>
            An elite hackathon team driven by curiosity and caffeine. We build AI-powered solutions to real-world problems — one hackathon at a time.
          </p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:48}}>
            <button onClick={()=>setPage('team')} className="btn-primary"><Users size={13}/>Meet Team</button>
            <button onClick={()=>setPage('projects')} className="btn-outline"><Folder size={13}/>View Projects</button>
            <button onClick={()=>setPage('register')} className="btn-outline" style={{borderColor:'rgba(139,92,246,.35)',color:'#c084fc'}}><Plus size={13}/>Register</button>
          </div>
          <div style={{display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap'}}>
            {stats.map((s,i)=>(
              <div key={i} className="stat-card fade-up" style={{animationDelay:`${i*.1}s`,minWidth:140}}>
                <div style={{color:s.color,marginBottom:8,display:'flex',justifyContent:'center'}}>{s.icon}</div>
                <div style={{fontFamily:'Orbitron,monospace',fontSize:28,fontWeight:900,color:'#dde6f0',lineHeight:1}}>{s.value}</div>
                <div style={{fontSize:11,color:'#4a6080',marginTop:6,letterSpacing:.5}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{position:'absolute',bottom:28,left:'50%',transform:'translateX(-50%)',opacity:.35,display:'flex',flexDirection:'column',alignItems:'center',gap:5}}>
          <span style={{fontSize:9,fontFamily:'Fira Code,monospace',letterSpacing:3,color:'#00f5d4'}}>SCROLL</span>
          <ChevronDown size={14} color="#00f5d4"/>
        </div>
      </div>

      {/* Features */}
      <div style={{maxWidth:1100,margin:'0 auto',padding:'80px 24px'}}>
        <SecHead pre="why logiclords" title="Built Different"/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))',gap:16}}>
          {features.map((f,i)=>(
            <div key={i} className="card fade-up" style={{padding:24,animationDelay:`${i*.1}s`}}>
              <div style={{color:f.color,marginBottom:14,display:'flex',alignItems:'center',gap:10}}>
                {f.icon}
                <span style={{fontWeight:700,fontSize:15,color:'#dde6f0'}}>{f.title}</span>
              </div>
              <p style={{fontSize:13,color:'#6b87a8',lineHeight:1.7}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team preview */}
      <div style={{maxWidth:1100,margin:'0 auto',padding:'0 24px 80px'}}>
        <SecHead pre="the builders" title="Meet the Crew"/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:14,marginBottom:32}}>
          {members.slice(0,4).map(m=>(
            <div key={m._id||m.id} className="card" style={{padding:18,display:'flex',alignItems:'center',gap:12}}>
              <Av name={m.name} size={40} src={m.avatar}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:600,fontSize:13,color:'#dde6f0',marginBottom:4,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{m.name}</div>
                <RoleBadge role={m.role}/>
              </div>
              {m.isAdmin&&<Shield size={13} color="#00f5d4"/>}
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={()=>setPage('team')} className="btn-outline"><Users size={13}/>All {members.length} Members</button>
          <button onClick={()=>setPage('management')} className="btn-primary"><BarChart3 size={13}/>Open Portal</button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────── TEAM ─────────────────── */
const TeamPage = ({ members, setPage }) => {
  const [q,setQ]=useState('');
  const [role,setRole]=useState('All');
  const [selected,setSelected]=useState(null);
  const filtered = members.filter(m=>(role==='All'||m.role===role)&&(m.name||'').toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={{paddingTop:100,paddingBottom:80,minHeight:'100vh'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:40,flexWrap:'wrap',gap:16}}>
          <SecHead pre="the builders" title="Our Team" center={false}/>
          <LiveCount count={members.length} label="members online"/>
        </div>
        {/* Filters */}
        <div style={{display:'flex',gap:12,marginBottom:28,flexWrap:'wrap'}}>
          <div style={{position:'relative',flex:'1 1 240px',maxWidth:320}}>
            <Search size={13} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#4a6080'}}/>
            <input className="input" placeholder="Search by name or skill…" style={{paddingLeft:34}} value={q} onChange={e=>setQ(e.target.value)}/>
          </div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
            {['All',...ROLES].map(r=>(
              <button key={r} onClick={()=>setRole(r)} className="btn-sm" style={{background:role===r?'rgba(0,245,212,.1)':'transparent',borderColor:role===r?'rgba(0,245,212,.45)':'rgba(255,255,255,.07)',color:role===r?'#00f5d4':'#6b87a8'}}>
                {r==='All'?`All (${members.length})`:r}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(285px,1fr))',gap:16}}>
          {filtered.map((m,i)=>(
            <div key={m._id||m.id} className="member-card fade-up" style={{animationDelay:`${i*.07}s`,cursor:'pointer'}} onClick={()=>setSelected(m)}>
              {m.isAdmin&&<div style={{position:'absolute',top:12,right:12}}><span className="tag" style={{background:'rgba(0,245,212,.09)',color:'#00f5d4',border:'1px solid rgba(0,245,212,.22)'}}><Shield size={8} style={{marginRight:3}}/>Admin</span></div>}
              <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16}}>
                <Av name={m.name} size={50} src={m.avatar}/>
                <div>
                  <div style={{fontWeight:700,fontSize:15,color:'#dde6f0',marginBottom:5}}>{m.name}</div>
                  <RoleBadge role={m.role}/>
                </div>
              </div>
              {m.bio&&<p style={{fontSize:12,color:'#6b87a8',marginBottom:14,lineHeight:1.6,overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical'}}>{m.bio}</p>}
              <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:14}}>
                {(m.skills||[]).slice(0,5).map(s=><Chip key={s} label={s}/>)}
                {(m.skills||[]).length>5&&<Chip label={`+${m.skills.length-5}`}/>}
              </div>
              <div style={{borderTop:'1px solid rgba(255,255,255,.05)',paddingTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontSize:11,color:'#4a6080',fontFamily:'Fira Code,monospace',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:160}}>{m.email}</span>
                <div style={{display:'flex',gap:10}}>
                  {m.github&&<a href={m.github} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{color:'#6b87a8',display:'flex',transition:'color .2s'}} onMouseEnter={e=>e.currentTarget.style.color='#00f5d4'} onMouseLeave={e=>e.currentTarget.style.color='#6b87a8'}><Github size={15}/></a>}
                  {m.linkedin&&<a href={m.linkedin} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{color:'#6b87a8',display:'flex',transition:'color .2s'}} onMouseEnter={e=>e.currentTarget.style.color='#3b82f6'} onMouseLeave={e=>e.currentTarget.style.color='#6b87a8'}><Linkedin size={15}/></a>}
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length===0&&<div style={{textAlign:'center',padding:'60px 0',color:'#4a6080'}}><Users size={32} style={{marginBottom:12,opacity:.25}}/><p>No members match your filters.</p></div>}
      </div>
      {/* Member Profile Modal */}
      {selected&&(
        <div className="modal-overlay" onClick={()=>setSelected(null)}>
          <div className="modal" style={{maxWidth:480}} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setSelected(null)} style={{position:'absolute',top:16,right:16,background:'none',border:'none',cursor:'pointer',color:'#6b87a8'}}><X size={18}/></button>
            <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:20}}>
              <Av name={selected.name} size={64} src={selected.avatar}/>
              <div>
                <div style={{fontFamily:'Orbitron,monospace',fontWeight:700,fontSize:18,color:'#dde6f0',marginBottom:6}}>{selected.name}</div>
                <RoleBadge role={selected.role}/>
                {selected.isAdmin&&<span className="tag" style={{marginLeft:6,background:'rgba(0,245,212,.08)',color:'#00f5d4',border:'1px solid rgba(0,245,212,.2)'}}><Shield size={8} style={{marginRight:3}}/>Admin</span>}
              </div>
            </div>
            {selected.bio&&<p style={{fontSize:13,color:'#8a9bb8',lineHeight:1.75,marginBottom:18,background:'rgba(0,245,212,.03)',border:'1px solid rgba(0,245,212,.08)',borderRadius:8,padding:'12px 14px'}}>{selected.bio}</p>}
            <div style={{marginBottom:18}}>
              <label className="label">Skills</label>
              <div style={{display:'flex',flexWrap:'wrap',gap:6}}>{(selected.skills||[]).map(s=><Chip key={s} label={s} color="#00f5d4"/>)}</div>
            </div>
            <div style={{display:'flex',gap:10,marginBottom:20}}>
              {selected.email&&<div style={{flex:1,background:'rgba(4,10,28,.8)',border:'1px solid rgba(255,255,255,.06)',borderRadius:8,padding:'10px 12px',display:'flex',alignItems:'center',gap:8}}><Mail size={13} color="#4a6080"/><span style={{fontSize:12,color:'#6b87a8',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{selected.email}</span></div>}
            </div>
            <div style={{display:'flex',gap:10}}>
              {selected.github&&<a href={selected.github} target="_blank" rel="noreferrer" className="btn-outline" style={{flex:1,justifyContent:'center',padding:'9px',fontSize:11}}><Github size={13}/>GitHub</a>}
              {selected.linkedin&&<a href={selected.linkedin} target="_blank" rel="noreferrer" className="btn-primary" style={{flex:1,justifyContent:'center',padding:'9px',fontSize:11}}><Linkedin size={13}/>LinkedIn</a>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────── REGISTER ─────────────────── */
const RegisterPage = ({ members, setMembers, addToast }) => {
  const [form,setForm]=useState({name:'',email:'',role:'Frontend',skills:'',github:'',linkedin:'',bio:'',password:''});
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState(null);
  const [showPass,setShowPass]=useState(false);

  const submit = useCallback(async () => {
    if(!form.name.trim()||!form.email.trim()||!form.password) {addToast('Name, email, and password are required','error');return;}
    if(!/\S+@\S+\.\S+/.test(form.email)){addToast('Valid email required','error');return;}
    if(form.password.length<6){addToast('Password must be at least 6 characters','error');return;}
    if(members.find(m=>m.email===form.email)){addToast('Email already registered','error');return;}
    setLoading(true);
    // Try API, fallback to local
    setTimeout(()=>{
      const nm={_id:`local-${Date.now()}`,name:form.name.trim(),email:form.email.trim(),role:form.role,skills:form.skills.split(',').map(s=>s.trim()).filter(Boolean).slice(0,8),github:form.github||'https://github.com',linkedin:form.linkedin||'https://linkedin.com',bio:form.bio.trim(),joinedAt:new Date().toISOString()};
      setMembers(prev=>[...prev,nm]);
      setDone(nm);
      setLoading(false);
      addToast(`Welcome, ${nm.name}! 🎉`,'success');
      setForm({name:'',email:'',role:'Frontend',skills:'',github:'',linkedin:'',bio:'',password:''});
    },1100);
  },[form,members,setMembers,addToast]);

  return (
    <div style={{paddingTop:100,paddingBottom:80,minHeight:'100vh'}}>
      <div style={{maxWidth:620,margin:'0 auto',padding:'0 24px'}}>
        <SecHead pre="join the team" title="Register" sub="Fill in your details to join LogicLords. Your profile will appear on the team page instantly."/>
        <div className="card" style={{padding:'34px 30px',border:'1px solid rgba(0,245,212,.1)'}}>
          {done ? (
            <div style={{textAlign:'center',padding:'32px 0'}}>
              <div className="float-anim" style={{fontSize:56,marginBottom:18}}>🎉</div>
              <div style={{fontFamily:'Orbitron,monospace',fontSize:20,fontWeight:700,color:'#00f5d4',marginBottom:10}}>Welcome aboard, {done.name.split(' ')[0]}!</div>
              <p style={{color:'#6b87a8',fontSize:14,marginBottom:24}}>You're now part of LogicLords. Your profile is live on the Team page.</p>
              <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
                <button onClick={()=>setDone(null)} className="btn-outline" style={{padding:'9px 20px',fontSize:11}}><Plus size={12}/>Register Another</button>
              </div>
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:18}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}} className="stack-sm">
                <div><label className="label">Full Name *</label><input className="input" placeholder="Arjun Sharma" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
                <div><label className="label">Email *</label><input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}} className="stack-sm">
                <div><label className="label">Password *</label>
                  <div style={{position:'relative'}}>
                    <input className="input" type={showPass?'text':'password'} placeholder="Min. 6 characters" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} style={{paddingRight:40}}/>
                    <button onClick={()=>setShowPass(o=>!o)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#4a6080',display:'flex'}}>
                      {showPass?<EyeOff size={14}/>:<Eye size={14}/>}
                    </button>
                  </div>
                </div>
                <div><label className="label">Role</label>
                  <select className="input" value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))}>
                    {ROLES.map(r=><option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div><label className="label">Skills (comma-separated)</label><input className="input" placeholder="React, Node.js, Python, Figma…" value={form.skills} onChange={e=>setForm(f=>({...f,skills:e.target.value}))}/></div>
              <div><label className="label">Bio (optional)</label><textarea className="input" rows={2} placeholder="A short intro about yourself…" value={form.bio} onChange={e=>setForm(f=>({...f,bio:e.target.value}))} style={{resize:'vertical'}}/></div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}} className="stack-sm">
                <div><label className="label">GitHub URL</label>
                  <div style={{position:'relative'}}><Github size={13} style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',color:'#4a6080'}}/>
                  <input className="input" style={{paddingLeft:32}} placeholder="github.com/you" value={form.github} onChange={e=>setForm(f=>({...f,github:e.target.value}))}/></div>
                </div>
                <div><label className="label">LinkedIn URL</label>
                  <div style={{position:'relative'}}><Linkedin size={13} style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',color:'#4a6080'}}/>
                  <input className="input" style={{paddingLeft:32}} placeholder="linkedin.com/in/you" value={form.linkedin} onChange={e=>setForm(f=>({...f,linkedin:e.target.value}))}/></div>
                </div>
              </div>
              <button onClick={submit} className="btn-primary" style={{justifyContent:'center',padding:'13px',marginTop:4}} disabled={loading}>
                {loading?<><span className="spin-anim"/>Registering…</>:<><Plus size={14}/>Join LogicLords</>}
              </button>
              <p style={{textAlign:'center',fontSize:11,color:'#4a6080'}}>{members.length} members already on the team</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────── ACHIEVEMENTS ─────────────────── */
const AchievementsPage = () => {
  const certs=[{label:'SIH 2025 Finalists',color:'#00f5d4'},{label:'HackIndia 2025 Winner',color:'#fbbf24'},{label:'HackBIT 4.0 Innovation',color:'#818cf8'},{label:'DevHacks Runner-up',color:'#f472b6'}];
  return (
    <div style={{paddingTop:100,paddingBottom:80,minHeight:'100vh'}}>
      <div style={{maxWidth:1060,margin:'0 auto',padding:'0 24px'}}>
        <SecHead pre="our journey" title="Achievements" sub="Every win is a proof that logic meets innovation."/>
        <div style={{position:'relative',paddingLeft:44}}>
          <div style={{position:'absolute',left:16,top:10,bottom:10,width:2,background:'linear-gradient(180deg,#00f5d4,rgba(0,245,212,.02))',borderRadius:2}}/>
          {ACHIEVEMENTS.map((a,i)=>(
            <div key={a.id} className="fade-up" style={{animationDelay:`${i*.11}s`,marginBottom:28,position:'relative'}}>
              <div style={{position:'absolute',left:-34,top:22,width:14,height:14,borderRadius:'50%',background:a.color,border:'3px solid #030b1a',boxShadow:`0 0 14px ${a.color}55`,zIndex:1}}/>
              <div className="card" style={{padding:22}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:10,marginBottom:10}}>
                  <div>
                    <div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:'#4a6080',letterSpacing:2,marginBottom:4}}>{a.year} · {a.sub}</div>
                    <div style={{fontWeight:700,fontSize:16,color:'#dde6f0'}}>{a.icon} {a.title}</div>
                  </div>
                  <span className="tag" style={{background:`${a.color}12`,color:a.color,border:`1px solid ${a.color}28`,fontSize:10}}>{a.rank}</span>
                </div>
                <p style={{color:'#6b87a8',fontSize:13,lineHeight:1.7}}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:56}}>
          <SecHead pre="proof of victory" title="Certificates"/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))',gap:12}}>
            {certs.map((c,i)=>(
              <div key={i} className="card" style={{padding:0,overflow:'hidden',aspectRatio:'4/3',display:'flex',flexDirection:'column',cursor:'pointer'}}>
                <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',background:`linear-gradient(135deg,${c.color}0d,${c.color}04)`,position:'relative'}}>
                  <Award size={34} color={`${c.color}50`}/>
                  <div style={{position:'absolute',bottom:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${c.color},transparent)`}}/>
                </div>
                <div style={{padding:'9px 13px',borderTop:'1px solid rgba(255,255,255,.05)'}}>
                  <div style={{fontSize:11,fontWeight:600,color:'#6b87a8'}}>{c.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────── PROJECTS SHOWCASE ─────────────────── */
const ProjectsPage = () => {
  const [sel,setSel]=useState(0);
  const p=SHOWCASE[sel];
  return (
    <div style={{paddingTop:100,paddingBottom:80,minHeight:'100vh'}}>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'0 24px'}}>
        <SecHead pre="what we build" title="Project Showcase"/>
        <div style={{display:'flex',gap:10,marginBottom:34,flexWrap:'wrap'}}>
          {SHOWCASE.map((s,i)=>(
            <button key={i} onClick={()=>setSel(i)} className="btn-sm" style={{background:sel===i?`${s.color}12`:'transparent',borderColor:sel===i?`${s.color}45`:'rgba(255,255,255,.07)',color:sel===i?s.color:'#6b87a8',padding:'9px 18px',fontSize:12}}>
              {s.img} {s.title.split(' ').slice(0,3).join(' ')}
            </button>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
          <div>
            <div className="card" style={{padding:28,marginBottom:18}}>
              <div style={{fontSize:44,marginBottom:14}}>{p.img}</div>
              <h3 style={{fontFamily:'Orbitron,monospace',fontWeight:700,fontSize:17,color:'#dde6f0',marginBottom:16,lineHeight:1.3}}>{p.title}</h3>
              <div style={{marginBottom:18}}>
                <div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:p.color,letterSpacing:2,marginBottom:8}}>// PROBLEM</div>
                <p style={{fontSize:13,color:'#6b87a8',lineHeight:1.75}}>{p.problem}</p>
              </div>
              <div>
                <div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:p.color,letterSpacing:2,marginBottom:8}}>// SOLUTION</div>
                <p style={{fontSize:13,color:'#6b87a8',lineHeight:1.75}}>{p.solution}</p>
              </div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div className="card" style={{padding:22}}>
              <div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:p.color,letterSpacing:2,marginBottom:14}}>// KEY FEATURES</div>
              {p.features.map((f,i)=>(
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:9,marginBottom:9}}>
                  <CheckCircle size={12} color={p.color} style={{marginTop:2,flexShrink:0}}/>
                  <span style={{fontSize:12,color:'#dde6f0'}}>{f}</span>
                </div>
              ))}
            </div>
            <div className="card" style={{padding:22}}>
              <div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:p.color,letterSpacing:2,marginBottom:14}}>// TECH STACK</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
                {p.tech.map(t=>(
                  <span key={t} style={{background:`${p.color}0e`,border:`1px solid ${p.color}22`,color:p.color,padding:'4px 10px',borderRadius:5,fontSize:11,fontFamily:'Fira Code,monospace'}}>{t}</span>
                ))}
              </div>
            </div>
            <div className="card" style={{padding:22}}>
              <div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:'#4a6080',letterSpacing:2,marginBottom:14}}>// FUTURE SCOPE</div>
              {p.future.map((f,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:9,marginBottom:9}}>
                  <Rocket size={11} color="#8b5cf6"/>
                  <span style={{fontSize:12,color:'#6b87a8'}}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────── MANAGEMENT PORTAL ─────────────────── */
const ManagementPage = ({ projects, setProjects, tasks, setTasks, members, auth, addToast }) => {
  const [selPid,setSelPid]      = useState(projects[0]?._id||projects[0]?.id||null);
  const [view,setView]          = useState('kanban'); // kanban | analytics
  const [showAddProj,setShowAddProj] = useState(false);
  const [showAddTask,setShowAddTask] = useState(false);
  const [delPid,setDelPid]      = useState(null);
  const [editingTask,setEditingTask] = useState(null);

  const proj  = projects.find(p=>(p._id||p.id)===selPid);
  const pid   = proj?._id||proj?.id;
  const pTasks= tasks.filter(t=>t.pid===pid||(t.project&&(t.project._id||t.project)===pid));
  const todo  = pTasks.filter(t=>t.status==='todo');
  const inp   = pTasks.filter(t=>t.status==='inprogress');
  const done  = pTasks.filter(t=>t.status==='done');
  const pct   = pTasks.length ? Math.round((done.length/pTasks.length)*100) : 0;

  const cycleStatus = (task) => {
    if(!auth){addToast('Login to manage tasks','error');return;}
    const next={todo:'inprogress',inprogress:'done',done:'todo'}[task.status];
    setTasks(prev=>prev.map(t=>(t._id||t.id)===(task._id||task.id)?{...t,status:next}:t));
    const label={todo:'To Do',inprogress:'In Progress',done:'Done'};
    addToast(`"${task.title}" → ${label[next]}`,'success');
  };

  const deleteProj=(id)=>{
    setProjects(prev=>prev.filter(p=>(p._id||p.id)!==id));
    setTasks(prev=>prev.filter(t=>t.pid!==id));
    const next=projects.find(p=>(p._id||p.id)!==id);
    setSelPid(next?._id||next?.id||null);
    addToast('Project deleted','info');setDelPid(null);
  };

  const COLS=[
    {key:'todo',      label:'To Do',      tasks:todo, color:'#6366f1',num:todo.length},
    {key:'inprogress',label:'In Progress',tasks:inp,  color:'#fbbf24',num:inp.length},
    {key:'done',      label:'Completed',  tasks:done, color:'#10b981',num:done.length},
  ];

  /* Analytics data */
  const totalTasks=pTasks.length;
  const priorityCounts = ['critical','high','medium','low'].map(p=>({p,n:pTasks.filter(t=>t.priority===p).length}));
  const memberContrib  = (proj?.members||[]).map(m=>{
    const id=m._id||m.id;
    const n=pTasks.filter(t=>(t.assignee?._id||t.assignee?.id||t.assignee)===id).length;
    return {...m,taskCount:n};
  }).sort((a,b)=>b.taskCount-a.taskCount);

  return (
    <div style={{paddingTop:100,paddingBottom:80,minHeight:'100vh'}}>
      <div style={{maxWidth:1340,margin:'0 auto',padding:'0 24px'}}>
        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:32,flexWrap:'wrap',gap:14}}>
          <div>
            <div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:'#00f5d4',letterSpacing:4,marginBottom:8,textTransform:'uppercase'}}>// project portal</div>
            <h2 style={{fontFamily:'Orbitron,monospace',fontWeight:900,fontSize:'clamp(20px,3vw,32px)',color:'#dde6f0',letterSpacing:-1}}>Management Dashboard</h2>
          </div>
          <div style={{display:'flex',gap:9,flexWrap:'wrap',alignItems:'center'}}>
            {/* View toggle */}
            <div style={{display:'flex',background:'rgba(4,10,28,.8)',border:'1px solid rgba(255,255,255,.07)',borderRadius:8,overflow:'hidden'}}>
              {[{id:'kanban',icon:<Layers size={12}/>,label:'Kanban'},{id:'analytics',icon:<BarChart2 size={12}/>,label:'Analytics'}].map(v=>(
                <button key={v.id} onClick={()=>setView(v.id)} style={{padding:'8px 14px',background:view===v.id?'rgba(0,245,212,.1)':'transparent',border:'none',cursor:'pointer',color:view===v.id?'#00f5d4':'#6b87a8',fontFamily:'Outfit,sans-serif',fontSize:11,fontWeight:600,display:'flex',alignItems:'center',gap:5,transition:'all .2s'}}>
                  {v.icon}{v.label}
                </button>
              ))}
            </div>
            {auth&&<>
              <button onClick={()=>setShowAddProj(true)} className="btn-primary" style={{padding:'8px 16px',fontSize:11}}><Plus size={12}/>New Project</button>
              {proj&&<button onClick={()=>setShowAddTask(true)} className="btn-outline" style={{padding:'8px 16px',fontSize:11}}><Plus size={12}/>Add Task</button>}
            </>}
            {!auth&&<div style={{background:'rgba(251,191,36,.07)',border:'1px solid rgba(251,191,36,.18)',borderRadius:7,padding:'8px 14px',display:'flex',alignItems:'center',gap:7}}><Shield size={12} color="#fbbf24"/><span style={{fontSize:11,color:'#fbbf24'}}>Login to manage</span></div>}
          </div>
        </div>

        {/* Project tabs */}
        <div style={{display:'flex',gap:8,marginBottom:22,flexWrap:'wrap'}}>
          {projects.map(p=>{
            const pid2=p._id||p.id;
            const isSel=selPid===pid2;
            const ptasks=tasks.filter(t=>t.pid===pid2);
            const ppct=ptasks.length?Math.round((ptasks.filter(t=>t.status==='done').length/ptasks.length)*100):0;
            return (
              <button key={pid2} onClick={()=>setSelPid(pid2)} style={{padding:'9px 16px',borderRadius:9,cursor:'pointer',border:`1px solid ${isSel?p.color+'55':'rgba(255,255,255,.07)'}`,background:isSel?`${p.color}0f`:'transparent',color:isSel?p.color:'#6b87a8',fontFamily:'Outfit,sans-serif',fontSize:12,fontWeight:600,display:'flex',alignItems:'center',gap:8,transition:'all .2s'}}>
                <span style={{width:7,height:7,borderRadius:'50%',background:p.color,flexShrink:0}}/>
                {p.title}
                <span style={{fontSize:10,opacity:.7,fontFamily:'Fira Code,monospace'}}>{ppct}%</span>
                {auth?.isAdmin&&isSel&&(
                  <span onClick={e=>{e.stopPropagation();setDelPid(pid2)}} style={{marginLeft:2,color:'rgba(248,113,113,.45)',cursor:'pointer',display:'flex',transition:'color .2s'}} onMouseEnter={e=>e.currentTarget.style.color='#f87171'} onMouseLeave={e=>e.currentTarget.style.color='rgba(248,113,113,.45)'}>
                    <Trash2 size={10}/>
                  </span>
                )}
              </button>
            );
          })}
          {projects.length===0&&<span style={{fontSize:13,color:'#4a6080'}}>No projects yet{auth?'. Create one!':'. Login to create.'}</span>}
        </div>

        {proj ? (
          <>
            {/* Project header card */}
            <div className="card" style={{padding:22,marginBottom:20,borderColor:`${proj.color}22`}}>
              <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:16,marginBottom:14}}>
                <div style={{flex:1,minWidth:200}}>
                  <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
                    <span style={{width:10,height:10,borderRadius:'50%',background:proj.color,boxShadow:`0 0 10px ${proj.color}`}}/>
                    <h3 style={{fontWeight:700,fontSize:16,color:'#dde6f0'}}>{proj.title}</h3>
                  </div>
                  <p style={{fontSize:12,color:'#6b87a8',lineHeight:1.6}}>{proj.description}</p>
                </div>
                <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
                  {[{val:`${pct}%`,label:'COMPLETE',color:proj.color},{val:pTasks.length,label:'TASKS',color:'#dde6f0'},{val:done.length,label:'DONE',color:'#10b981'},{val:(proj.members||[]).length,label:'MEMBERS',color:'#818cf8'}].map((s,i)=>(
                    <div key={i} style={{textAlign:'center'}}>
                      <div style={{fontFamily:'Orbitron,monospace',fontSize:22,fontWeight:900,color:s.color,lineHeight:1}}>{s.val}</div>
                      <div style={{fontSize:9,color:'#4a6080',letterSpacing:1.5,marginTop:4}}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <PBar value={pct} color={proj.color}/>
              <div style={{marginTop:12,display:'flex',alignItems:'center',gap:12,flexWrap:'wrap'}}>
                {(proj.tags||[]).map(t=>(
                  <span key={t} style={{background:`${proj.color}0d`,border:`1px solid ${proj.color}22`,color:proj.color,padding:'2px 9px',borderRadius:4,fontSize:10,fontFamily:'Fira Code,monospace'}}>{t}</span>
                ))}
                <span style={{marginLeft:'auto',fontSize:11,color:'#4a6080',display:'flex',alignItems:'center',gap:4}}><Calendar size={11}/>{proj.deadline||'TBD'}</span>
              </div>
            </div>

            {/* Kanban / Analytics */}
            {view==='kanban' ? (
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
                {COLS.map(col=>(
                  <div key={col.key} className="kanban-col">
                    {/* Column header */}
                    <div style={{padding:'13px 15px',borderBottom:`2px solid ${col.color}`,background:`${col.color}07`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <span style={{width:7,height:7,borderRadius:'50%',background:col.color,boxShadow:`0 0 8px ${col.color}`}}/>
                        <span style={{fontSize:11,fontWeight:700,color:col.color,letterSpacing:1,textTransform:'uppercase'}}>{col.label}</span>
                      </div>
                      <span style={{background:`${col.color}15`,color:col.color,padding:'1px 8px',borderRadius:999,fontSize:11,fontWeight:700}}>{col.num}</span>
                    </div>
                    <div className="kanban-drop-zone">
                      {col.tasks.map(task=>{
                        const assignee=task.assignee&&typeof task.assignee==='object'?task.assignee:members.find(m=>(m._id||m.id)===task.assignee);
                        const pm=PRIORITY_META[task.priority||'medium'];
                        return (
                          <div key={task._id||task.id} className={`task-card priority-${task.priority||'medium'}`} onClick={()=>cycleStatus(task)}>
                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:5}}>
                              <div style={{fontSize:12,fontWeight:600,color:'#dde6f0',lineHeight:1.35,flex:1,marginRight:8}}>{task.title}</div>
                              <span style={{background:`${pm.color}14`,color:pm.color,padding:'2px 7px',borderRadius:4,fontSize:9,fontWeight:700,display:'flex',alignItems:'center',gap:3,whiteSpace:'nowrap',flexShrink:0}}>
                                {pm.icon}{pm.label}
                              </span>
                            </div>
                            {task.description&&<div style={{fontSize:11,color:'#4a6080',marginBottom:9,lineHeight:1.5,overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical'}}>{task.description}</div>}
                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                              {assignee ? (
                                <div style={{display:'flex',alignItems:'center',gap:6}}>
                                  <Av name={assignee.name} size={18} src={assignee.avatar}/>
                                  <span style={{fontSize:10,color:'#6b87a8'}}>{(assignee.name||'').split(' ')[0]}</span>
                                </div>
                              ) : <span style={{fontSize:10,color:'rgba(74,96,128,.5)'}}>Unassigned</span>}
                              {auth&&<span style={{fontSize:9,color:`${col.color}60`,fontFamily:'Fira Code,monospace'}}>click →</span>}
                            </div>
                          </div>
                        );
                      })}
                      {col.tasks.length===0&&(
                        <div style={{textAlign:'center',padding:'28px 0',color:'rgba(74,96,128,.35)',fontSize:12,fontStyle:'italic'}}>
                          Empty
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Analytics View */
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18}}>
                {/* Task breakdown */}
                <div className="card" style={{padding:22}}>
                  <div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:'#00f5d4',letterSpacing:2,marginBottom:18}}>// TASK STATUS</div>
                  {COLS.map(col=>(
                    <div key={col.key} style={{marginBottom:14}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                        <span style={{fontSize:12,color:'#dde6f0'}}>{col.label}</span>
                        <span style={{fontSize:12,color:col.color,fontFamily:'Fira Code,monospace'}}>{col.num}/{totalTasks}</span>
                      </div>
                      <div className="progress-bg">
                        <div style={{height:5,borderRadius:999,background:col.color,width:`${totalTasks?Math.round((col.num/totalTasks)*100):0}%`,transition:'width .8s ease'}}/>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Priority breakdown */}
                <div className="card" style={{padding:22}}>
                  <div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:'#00f5d4',letterSpacing:2,marginBottom:18}}>// PRIORITY BREAKDOWN</div>
                  {priorityCounts.map(({p:pr,n})=>{
                    const pm=PRIORITY_META[pr];
                    return (
                      <div key={pr} style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
                        <span style={{color:pm.color,display:'flex',alignItems:'center',gap:4,width:64,fontSize:11,fontWeight:600}}>{pm.icon}{pm.label}</span>
                        <div className="progress-bg" style={{flex:1}}>
                          <div style={{height:5,borderRadius:999,background:pm.color,width:`${totalTasks?Math.round((n/totalTasks)*100):0}%`,transition:'width .8s ease'}}/>
                        </div>
                        <span style={{fontSize:11,color:'#6b87a8',fontFamily:'Fira Code,monospace',width:18,textAlign:'right'}}>{n}</span>
                      </div>
                    );
                  })}
                </div>
                {/* Member contribution */}
                <div className="card" style={{padding:22,gridColumn:'1/-1'}}>
                  <div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:'#00f5d4',letterSpacing:2,marginBottom:18}}>// MEMBER CONTRIBUTIONS</div>
                  {memberContrib.length===0&&<p style={{fontSize:12,color:'#4a6080'}}>No members assigned to this project.</p>}
                  {memberContrib.map(m=>(
                    <div key={m._id||m.id} style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
                      <Av name={m.name} size={30} src={m.avatar}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                          <span style={{fontSize:12,color:'#dde6f0',fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{m.name}</span>
                          <span style={{fontSize:11,color:'#00f5d4',fontFamily:'Fira Code,monospace',flexShrink:0}}>{m.taskCount} tasks</span>
                        </div>
                        <div className="progress-bg">
                          <div style={{height:4,borderRadius:999,background:`linear-gradient(90deg,${getAC(m.name)},#3b82f6)`,width:`${totalTasks?Math.round((m.taskCount/totalTasks)*100):0}%`,transition:'width .8s ease'}}/>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{textAlign:'center',padding:'80px 0',color:'#4a6080'}}>
            <Folder size={40} style={{marginBottom:14,opacity:.22}}/>
            <p style={{fontSize:14}}>{auth?'Create your first project to get started!':'Login to create and manage projects.'}</p>
          </div>
        )}
      </div>

      {showAddProj&&auth&&<AddProjectModal members={members} setProjects={setProjects} close={()=>setShowAddProj(false)} addToast={addToast}/>}
      {showAddTask&&auth&&proj&&<AddTaskModal members={(proj.members||[]).length>0?proj.members:members} projectId={pid} setTasks={setTasks} close={()=>setShowAddTask(false)} addToast={addToast}/>}
      {delPid&&(
        <div className="modal-overlay" onClick={()=>setDelPid(null)}>
          <div className="modal" style={{maxWidth:360}} onClick={e=>e.stopPropagation()}>
            <div style={{textAlign:'center',marginBottom:24}}>
              <Trash2 size={30} color="#f87171" style={{marginBottom:12}}/>
              <div style={{fontWeight:700,fontSize:15,color:'#dde6f0',marginBottom:8}}>Delete Project?</div>
              <p style={{fontSize:12,color:'#6b87a8'}}>This will permanently remove the project and all associated tasks.</p>
            </div>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setDelPid(null)} className="btn-outline" style={{flex:1,justifyContent:'center',padding:'10px'}}>Cancel</button>
              <button onClick={()=>deleteProj(delPid)} style={{flex:1,padding:'10px',background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.28)',color:'#f87171',borderRadius:8,cursor:'pointer',fontFamily:'Outfit,sans-serif',fontSize:12,fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
                <Trash2 size={12}/>Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────── MODALS ─────────────────── */
const COLORS=['#00f5d4','#3b82f6','#8b5cf6','#f472b6','#fbbf24','#f87171','#10b981','#ec4899'];

const AddProjectModal = ({ members, setProjects, close, addToast }) => {
  const [f,setF]=useState({title:'',desc:'',deadline:'',memberIds:[],tags:'',color:'#00f5d4'});
  const [loading,setLoading]=useState(false);
  const submit=()=>{
    if(!f.title.trim()){addToast('Project title required','error');return;}
    setLoading(true);
    setTimeout(()=>{
      const proj={_id:`proj-${Date.now()}`,id:`proj-${Date.now()}`,title:f.title.trim(),description:f.desc.trim(),deadline:f.deadline||'TBD',members:members.filter(m=>f.memberIds.includes(m._id||m.id)),tags:f.tags.split(',').map(s=>s.trim()).filter(Boolean),color:f.color,taskCount:0,completedTasks:0};
      setProjects(prev=>[...prev,proj]);
      addToast(`"${proj.title}" created!`,'success');
      setLoading(false);close();
    },700);
  };
  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:22}}>
          <div style={{fontFamily:'Orbitron,monospace',fontWeight:700,fontSize:15,color:'#dde6f0'}}>New Project</div>
          <button onClick={close} style={{background:'none',border:'none',cursor:'pointer',color:'#6b87a8'}}><X size={17}/></button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:15}}>
          <div><label className="label">Title *</label><input className="input" placeholder="e.g. AI Chatbot Platform" value={f.title} onChange={e=>setF(v=>({...v,title:e.target.value}))}/></div>
          <div><label className="label">Description</label><textarea className="input" rows={2} placeholder="What are you building?" value={f.desc} onChange={e=>setF(v=>({...v,desc:e.target.value}))} style={{resize:'vertical'}}/></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div><label className="label">Deadline</label><input className="input" type="date" value={f.deadline} onChange={e=>setF(v=>({...v,deadline:e.target.value}))}/></div>
            <div><label className="label">Tags</label><input className="input" placeholder="React, Python…" value={f.tags} onChange={e=>setF(v=>({...v,tags:e.target.value}))}/></div>
          </div>
          <div>
            <label className="label">Accent Color</label>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {COLORS.map(c=><button key={c} onClick={()=>setF(v=>({...v,color:c}))} style={{width:26,height:26,borderRadius:'50%',background:c,border:'none',cursor:'pointer',outline:f.color===c?`3px solid ${c}`:'3px solid transparent',outlineOffset:2,transition:'outline .15s'}}/>)}
            </div>
          </div>
          <div>
            <label className="label">Assign Members</label>
            <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
              {members.map(m=>{const id=m._id||m.id;const sel=f.memberIds.includes(id);return(
                <button key={id} onClick={()=>setF(v=>({...v,memberIds:sel?v.memberIds.filter(i=>i!==id):[...v.memberIds,id]}))} className="btn-sm" style={{background:sel?'rgba(0,245,212,.1)':'transparent',borderColor:sel?'rgba(0,245,212,.4)':'rgba(255,255,255,.07)',color:sel?'#00f5d4':'#6b87a8'}}>
                  {sel&&<Check size={10}/>}{m.name.split(' ')[0]}
                </button>
              );})}
            </div>
          </div>
          <button onClick={submit} className="btn-primary" style={{justifyContent:'center'}} disabled={loading}>
            {loading?<><span className="spin-anim"/>Creating…</>:<><Plus size={13}/>Create Project</>}
          </button>
        </div>
      </div>
    </div>
  );
};

const AddTaskModal = ({ members, projectId, setTasks, close, addToast }) => {
  const [f,setF]=useState({title:'',desc:'',assignee:'',status:'todo',priority:'medium',dueDate:''});
  const [loading,setLoading]=useState(false);
  const submit=()=>{
    if(!f.title.trim()){addToast('Task title required','error');return;}
    setLoading(true);
    setTimeout(()=>{
      const assigneeMember=f.assignee?members.find(m=>(m._id||m.id)===f.assignee):null;
      const task={_id:`task-${Date.now()}`,id:`task-${Date.now()}`,pid:projectId,title:f.title.trim(),description:f.desc.trim(),assignee:assigneeMember||null,status:f.status,priority:f.priority,dueDate:f.dueDate||null};
      setTasks(prev=>[...prev,task]);
      addToast(`Task "${task.title}" added!`,'success');
      setLoading(false);close();
    },600);
  };
  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:22}}>
          <div style={{fontFamily:'Orbitron,monospace',fontWeight:700,fontSize:15,color:'#dde6f0'}}>Add Task</div>
          <button onClick={close} style={{background:'none',border:'none',cursor:'pointer',color:'#6b87a8'}}><X size={17}/></button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div><label className="label">Title *</label><input className="input" placeholder="e.g. Setup CI/CD pipeline" value={f.title} onChange={e=>setF(v=>({...v,title:e.target.value}))}/></div>
          <div><label className="label">Description</label><textarea className="input" rows={2} placeholder="What needs to be done?" value={f.desc} onChange={e=>setF(v=>({...v,desc:e.target.value}))} style={{resize:'vertical'}}/></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div><label className="label">Assign To</label>
              <select className="input" value={f.assignee} onChange={e=>setF(v=>({...v,assignee:e.target.value}))}>
                <option value="">Unassigned</option>
                {members.map(m=><option key={m._id||m.id} value={m._id||m.id}>{m.name}</option>)}
              </select>
            </div>
            <div><label className="label">Priority</label>
              <select className="input" value={f.priority} onChange={e=>setF(v=>({...v,priority:e.target.value}))}>
                <option value="critical">🔴 Critical</option>
                <option value="high">🟠 High</option>
                <option value="medium">🔵 Medium</option>
                <option value="low">⚪ Low</option>
              </select>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div><label className="label">Status</label>
              <select className="input" value={f.status} onChange={e=>setF(v=>({...v,status:e.target.value}))}>
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div><label className="label">Due Date</label><input className="input" type="date" value={f.dueDate} onChange={e=>setF(v=>({...v,dueDate:e.target.value}))}/></div>
          </div>
          <button onClick={submit} className="btn-primary" style={{justifyContent:'center'}} disabled={loading}>
            {loading?<><span className="spin-anim"/>Adding…</>:<><Plus size={13}/>Add Task</>}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────── LOGIN MODAL ─────────────────── */
const LoginModal = ({ close, setAuth, addToast, members }) => {
  const [creds,setCreds]=useState({email:'',pass:''});
  const [err,setErr]=useState('');
  const [loading,setLoading]=useState(false);
  const [showPass,setShowPass]=useState(false);
  const login=useCallback(()=>{
    setErr('');
    if(!creds.email||!creds.pass){setErr('Enter both email and password');return;}
    setLoading(true);
    setTimeout(()=>{
      if(creds.email==='admin@logiclords.com'&&creds.pass==='admin123'){
        const admin=members.find(m=>m.isAdmin)||members[0];
        setAuth({...admin,isAdmin:true});addToast(`Welcome back, ${(admin?.name||'Admin').split(' ')[0]}!`,'success');close();
      } else {
        const m=members.find(m=>m.email===creds.email);
        if(m&&creds.pass==='member123'){setAuth({...m,isAdmin:false});addToast(`Welcome, ${m.name.split(' ')[0]}!`,'success');close();}
        else{setErr('Invalid credentials. See demo credentials below.');}
      }
      setLoading(false);
    },900);
  },[creds,members,setAuth,addToast,close]);
  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal" style={{maxWidth:400}} onClick={e=>e.stopPropagation()}>
        <div style={{textAlign:'center',marginBottom:26}}>
          <div style={{width:50,height:50,borderRadius:13,background:'linear-gradient(135deg,#00f5d4,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px'}}><Zap size={20} color="#030b1a" strokeWidth={2.5}/></div>
          <div style={{fontFamily:'Orbitron,monospace',fontWeight:700,fontSize:17,color:'#dde6f0'}}>LogicLords Login</div>
          <div style={{fontSize:11,color:'#4a6080',marginTop:3}}>Access the management portal</div>
        </div>
        {err&&<div style={{background:'rgba(239,68,68,.07)',border:'1px solid rgba(239,68,68,.18)',borderRadius:7,padding:'9px 13px',marginBottom:14,fontSize:12,color:'#f87171'}}>{err}</div>}
        <div style={{display:'flex',flexDirection:'column',gap:13,marginBottom:18}}>
          <div><label className="label">Email</label><input className="input" type="email" placeholder="admin@logiclords.com" value={creds.email} onChange={e=>setCreds(c=>({...c,email:e.target.value}))}/></div>
          <div><label className="label">Password</label>
            <div style={{position:'relative'}}>
              <input className="input" type={showPass?'text':'password'} placeholder="••••••••" value={creds.pass} onChange={e=>setCreds(c=>({...c,pass:e.target.value}))} onKeyDown={e=>e.key==='Enter'&&login()} style={{paddingRight:40}}/>
              <button onClick={()=>setShowPass(o=>!o)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#4a6080',display:'flex'}}>{showPass?<EyeOff size={14}/>:<Eye size={14}/>}</button>
            </div>
          </div>
        </div>
        <button onClick={login} className="btn-primary" style={{width:'100%',justifyContent:'center',padding:'12px'}} disabled={loading}>
          {loading?<><span className="spin-anim"/>Authenticating…</>:<><LogIn size={13}/>Login</>}
        </button>
        <div style={{marginTop:14,padding:'12px 14px',background:'rgba(0,245,212,.03)',border:'1px dashed rgba(0,245,212,.12)',borderRadius:8,fontSize:11,color:'#4a6080',lineHeight:1.8}}>
          <strong style={{color:'#00f5d4',display:'block',marginBottom:3}}>Demo Credentials</strong>
          <span style={{fontFamily:'Fira Code,monospace'}}>admin@logiclords.com</span> / admin123<br/>
          <span style={{fontFamily:'Fira Code,monospace'}}>priya@ll.com</span> / member123
        </div>
      </div>
    </div>
  );
};

/* ─────────────────── FOOTER ─────────────────── */
const Footer = ({ setPage }) => (
  <footer style={{background:'rgba(2,6,18,.98)',borderTop:'1px solid rgba(255,255,255,.04)',padding:'36px 24px'}}>
    <div style={{maxWidth:1100,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
      <div style={{display:'flex',alignItems:'center',gap:9}}>
        <div style={{width:24,height:24,borderRadius:6,background:'linear-gradient(135deg,#00f5d4,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center'}}><Zap size={12} color="#030b1a" strokeWidth={2.5}/></div>
        <span style={{fontFamily:'Orbitron,monospace',fontSize:12,fontWeight:700,color:'#00f5d4'}}>LogicLords</span>
      </div>
      <span style={{fontSize:11,color:'#4a6080',fontFamily:'Fira Code,monospace'}}>© 2025 LogicLords · Where Logic Meets Innovation</span>
      <div style={{display:'flex',gap:14}}>
        {['home','team','projects','achievements','management'].map(p=>(
          <button key={p} onClick={()=>setPage(p)} style={{background:'none',border:'none',cursor:'pointer',color:'#4a6080',fontSize:11,fontFamily:'Outfit,sans-serif',textTransform:'capitalize',transition:'color .2s'}} onMouseEnter={e=>e.target.style.color='#00f5d4'} onMouseLeave={e=>e.target.style.color='#4a6080'}>{p}</button>
        ))}
      </div>
    </div>
  </footer>
);

/* ─────────────────── APP ─────────────────── */
export default function App() {
  const [page,setPage]         = useState('home');
  const [members,setMembers]   = useState(SEED_MEMBERS);
  const [projects,setProjects] = useState(SEED_PROJECTS);
  const [tasks,setTasks]       = useState(SEED_TASKS);
  const [auth,setAuth]         = useState(null);
  const [showLogin,setShowLogin]=useState(false);
  const [toasts,setToasts]     = useState([]);

  const addToast = useCallback((msg,type='success')=>{
    const id=Date.now();
    setToasts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),4200);
  },[]);
  const rmToast = useCallback(id=>setToasts(p=>p.filter(t=>t.id!==id)),[]);

  useEffect(()=>{window.scrollTo({top:0,behavior:'smooth'});},[page]);

  const pages={
    home:        <HomePage    setPage={setPage} members={members} projects={projects}/>,
    team:        <TeamPage    members={members} setPage={setPage}/>,
    register:    <RegisterPage members={members} setMembers={setMembers} addToast={addToast}/>,
    achievements:<AchievementsPage/>,
    projects:    <ProjectsPage/>,
    management:  <ManagementPage projects={projects} setProjects={setProjects} tasks={tasks} setTasks={setTasks} members={members} auth={auth} addToast={addToast}/>,
  };

  return (
    <>
      <style>{STYLES}</style>
      <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
        <Nav page={page} setPage={setPage} auth={auth} setAuth={setAuth} setShowLogin={setShowLogin}/>
        <main style={{flex:1}}>{pages[page]||pages.home}</main>
        <Footer setPage={setPage}/>
      </div>
      {showLogin&&<LoginModal close={()=>setShowLogin(false)} setAuth={setAuth} addToast={addToast} members={members}/>}
      <ToastCtx toasts={toasts} remove={rmToast}/>
    </>
  );
}
