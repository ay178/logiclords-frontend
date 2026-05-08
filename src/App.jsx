import { useState, useEffect, useCallback, useRef } from "react";
import {
  Github, Linkedin, Search, Plus, X, Check, Trophy, Users, LogIn, LogOut,
  Shield, Award, Calendar, Zap, Folder, Rocket, BarChart3, Trash2,
  Sparkles, Eye, EyeOff, Flag, ChevronUp, ChevronRight, ChevronDown,
  BarChart2, Layers, Info, Terminal, GitBranch, ExternalLink, RefreshCw,
  MessageSquare, Send, Hash
} from "lucide-react";

const API_BASE  = 'https://logiclords-backend.onrender.com/api';
const SOCK_URL  = 'https://logiclords-backend.onrender.com';

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Outfit:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Outfit',sans-serif;background:#030b1a;color:#dde6f0;overflow-x:hidden;min-height:100vh}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#020810}::-webkit-scrollbar-thumb{background:linear-gradient(#00f5d4,#3b82f6);border-radius:4px}
@keyframes glitch{0%,90%,100%{clip-path:none;transform:none}91%{clip-path:inset(10% 0 80% 0);transform:translate(-3px)}92%{clip-path:inset(70% 0 5% 0);transform:translate(3px)}93%{clip-path:none;transform:translate(-1px)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes toastIn{from{opacity:0;transform:translateX(110%)}to{opacity:1;transform:translateX(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes scan{from{top:-60px}to{top:calc(100% + 60px)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes typingBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}
.glitch-text{animation:glitch 5s infinite}
.float-anim{animation:float 4s ease-in-out infinite}
.spin-anim{display:inline-block;animation:spin .9s linear infinite;border-radius:50%;width:14px;height:14px;border:2px solid currentColor;border-top-color:transparent}
.fade-up{animation:fadeUp .45s ease both}
.pulse-dot{animation:pulse 2s ease-in-out infinite}
.typing-dot{animation:typingBounce 1.2s ease-in-out infinite}
.grid-bg{background-image:linear-gradient(rgba(0,245,212,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,212,.03) 1px,transparent 1px);background-size:55px 55px}
.card{background:rgba(8,18,38,.8);border:1px solid rgba(255,255,255,.07);border-radius:14px;transition:all .3s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden;backdrop-filter:blur(8px)}
.card:hover{border-color:rgba(0,245,212,.22);box-shadow:0 0 0 1px rgba(0,245,212,.06),0 20px 44px rgba(0,0,0,.5);transform:translateY(-3px)}
.card::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#00f5d4,#3b82f6,#8b5cf6);opacity:0;transition:opacity .3s}
.card:hover::after{opacity:1}
.btn-primary{background:linear-gradient(135deg,#00f5d4,#3b82f6);color:#030b1a;font-weight:700;padding:11px 26px;border:none;border-radius:8px;cursor:pointer;font-family:'Outfit',sans-serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;transition:all .3s;display:inline-flex;align-items:center;gap:7px}
.btn-primary:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,245,212,.3)}
.btn-primary:disabled{opacity:.55;cursor:not-allowed}
.btn-outline{background:transparent;color:#00f5d4;font-weight:600;padding:11px 26px;border:1px solid rgba(0,245,212,.3);border-radius:8px;cursor:pointer;font-family:'Outfit',sans-serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;transition:all .3s;display:inline-flex;align-items:center;gap:7px}
.btn-outline:hover:not(:disabled){background:rgba(0,245,212,.07);border-color:#00f5d4}
.btn-outline:disabled{opacity:.5;cursor:not-allowed}
.btn-sm{padding:6px 14px;border-radius:6px;font-size:11px;font-family:'Outfit',sans-serif;cursor:pointer;font-weight:600;transition:all .2s;border:1px solid;display:inline-flex;align-items:center;gap:5px;white-space:nowrap}
.input{background:rgba(4,10,28,.9);border:1px solid rgba(255,255,255,.08);color:#dde6f0;padding:11px 15px;border-radius:8px;font-family:'Outfit',sans-serif;font-size:14px;width:100%;outline:none;transition:border-color .3s,box-shadow .3s}
.input:focus{border-color:#00f5d4;box-shadow:0 0 0 3px rgba(0,245,212,.08)}
.input::placeholder{color:#2d4060}
.input option{background:#040a1c}
.label{font-size:11px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:#4a6080;margin-bottom:7px;display:block}
.tag{display:inline-flex;align-items:center;padding:3px 9px;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:.6px;text-transform:uppercase}
.task-card{background:rgba(4,10,28,.8);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:13px;margin-bottom:9px;cursor:pointer;transition:all .2s}
.task-card:hover{border-color:rgba(0,245,212,.28);transform:translateX(2px)}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.87);backdrop-filter:blur(8px);z-index:900;display:flex;align-items:center;justify-content:center;padding:20px}
.modal{background:#050e22;border:1px solid rgba(0,245,212,.12);border-radius:18px;padding:32px;max-width:520px;width:100%;max-height:90vh;overflow-y:auto;animation:fadeUp .28s ease}
.progress-bg{background:rgba(255,255,255,.06);border-radius:999px;height:5px;overflow:hidden}
.progress-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#00f5d4,#3b82f6);transition:width .7s ease}
.nav-link{background:none;border:none;cursor:pointer;color:#6b87a8;font-size:13px;font-weight:500;padding:7px 11px;border-radius:6px;font-family:'Outfit',sans-serif;transition:all .2s}
.nav-link:hover,.nav-link.active{color:#00f5d4;background:rgba(0,245,212,.07)}
.member-card{background:rgba(8,18,38,.85);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:24px;transition:all .3s;position:relative;overflow:hidden}
.member-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#00f5d4,#3b82f6);opacity:0;transition:opacity .3s}
.member-card:hover::before{opacity:1}
.member-card:hover{border-color:rgba(0,245,212,.22);transform:translateY(-4px);box-shadow:0 18px 44px rgba(0,0,0,.4)}
.toast{animation:toastIn .32s ease;background:#060f24;border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:12px;min-width:280px;box-shadow:0 20px 40px rgba(0,0,0,.6)}
.hero-scan{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,245,212,.45),transparent);animation:scan 7s linear infinite;pointer-events:none}
.stat-card{background:rgba(6,15,35,.7);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:20px 24px;text-align:center;transition:all .25s}
.kanban-col{background:rgba(4,10,28,.7);border:1px solid rgba(255,255,255,.05);border-radius:12px;overflow:hidden;display:flex;flex-direction:column}
.kanban-drop-zone{min-height:200px;flex:1;padding:10px}
.priority-critical{border-left:3px solid #ef4444}
.priority-high{border-left:3px solid #f59e0b}
.priority-medium{border-left:3px solid #3b82f6}
.priority-low{border-left:3px solid #6b7280}
.chat-messages::-webkit-scrollbar{width:3px}
.chat-messages::-webkit-scrollbar-thumb{background:rgba(0,245,212,.2);border-radius:3px}
@media(max-width:900px){.hide-mobile{display:none!important}}
@media(max-width:640px){.stack-sm{flex-direction:column!important}}
`;

/* ── Constants ── */
const RC = {
  'Frontend':   {bg:'rgba(99,102,241,.15)',  text:'#818cf8', border:'rgba(99,102,241,.3)'},
  'Backend':    {bg:'rgba(16,185,129,.15)',  text:'#34d399', border:'rgba(16,185,129,.3)'},
  'AI/ML':      {bg:'rgba(245,158,11,.15)',  text:'#fbbf24', border:'rgba(245,158,11,.3)'},
  'Designer':   {bg:'rgba(236,72,153,.15)',  text:'#f472b6', border:'rgba(236,72,153,.3)'},
  'DevOps':     {bg:'rgba(0,245,212,.12)',   text:'#00f5d4', border:'rgba(0,245,212,.3)'},
  'Full Stack': {bg:'rgba(239,68,68,.15)',   text:'#f87171', border:'rgba(239,68,68,.3)'},
  'Mobile':     {bg:'rgba(168,85,247,.15)',  text:'#c084fc', border:'rgba(168,85,247,.3)'},
};
const ROLE_TEXT = {
  'Frontend':'#818cf8','Backend':'#34d399','AI/ML':'#fbbf24',
  'Designer':'#f472b6','DevOps':'#00f5d4','Full Stack':'#f87171','Mobile':'#c084fc',
};
const PRIORITY_META = {
  critical:{color:'#ef4444',label:'Critical'},
  high:    {color:'#f59e0b',label:'High'},
  medium:  {color:'#3b82f6',label:'Medium'},
  low:     {color:'#6b7280',label:'Low'},
};
const ROLES  = ['Frontend','Backend','AI/ML','Designer','DevOps','Full Stack','Mobile'];
const AVC    = ['#6366f1','#ec4899','#f59e0b','#10b981','#00f5d4','#f87171','#8b5cf6','#c084fc'];
const COLORS = ['#00f5d4','#3b82f6','#8b5cf6','#f472b6','#fbbf24','#f87171','#10b981','#ec4899'];
const getAC  = n=>{let h=0;for(let c of n||'?')h=c.charCodeAt(0)+((h<<5)-h);return AVC[Math.abs(h)%AVC.length];};
const initls = n=>(n||'??').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
const fmtTime = date=>{
  const d=new Date(date),now=new Date(),diff=now-d;
  if(diff<60000)return 'just now';
  if(diff<3600000)return `${Math.floor(diff/60000)}m ago`;
  if(d.toDateString()===now.toDateString())return d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  return d.toLocaleDateString('en-IN',{day:'numeric',month:'short'})+' '+d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
};

const ACHIEVEMENTS=[
  {id:1,year:2025,title:'Smart India Hackathon',sub:'National Finals',desc:'Reached the national finals with our AI-powered campus management system.',rank:'Top 5 Nationally',color:'#00f5d4',icon:'🏆'},
  {id:2,year:2025,title:'HackIndia Grand Finale',sub:'Regional Round',desc:'Won regional round with our AI Resume Parser beating 200+ teams.',rank:'1st Place 🥇',color:'#fbbf24',icon:'⚡'},
  {id:3,year:2024,title:'HackBIT 4.0',sub:'NIT Durgapur',desc:'Best Innovative Product for a fintech solution enabling rural banking.',rank:'Best Innovation',color:'#818cf8',icon:'💡'},
  {id:4,year:2024,title:'DevHacks 2024',sub:'24-Hour Sprint',desc:'Built an AR campus navigation app with crowd density heatmaps.',rank:'2nd Place 🥈',color:'#f472b6',icon:'🚀'},
  {id:5,year:2023,title:'TechFest IIT Mumbai',sub:'Debut Hackathon',desc:'Built a mental health support chatbot in 36 hours.',rank:'Recognition Award',color:'#34d399',icon:'🌱'},
];

/* ── API helper ── */
const apiFetch=async(path,options={})=>{
  const token=localStorage.getItem('ll_token');
  const headers={'Content-Type':'application/json',...(token&&{Authorization:`Bearer ${token}`}),...options.headers};
  const res=await fetch(`${API_BASE}${path}`,{...options,headers});
  const data=await res.json().catch(()=>({}));
  if(!res.ok)throw new Error(data.error||`HTTP ${res.status}`);
  return data;
};

/* ── Atoms ── */
const Av=({name='?',size=44,src=null})=>{
  const c=getAC(name);
  if(src)return<img src={src} alt={name} style={{width:size,height:size,borderRadius:'50%',objectFit:'cover',border:`2px solid ${c}40`,flexShrink:0}}/>;
  return<div style={{width:size,height:size,borderRadius:'50%',background:`${c}16`,border:`2px solid ${c}35`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:size*.33,fontWeight:700,color:c,fontFamily:'Orbitron,monospace',flexShrink:0,letterSpacing:'-1px'}}>{initls(name)}</div>;
};
const RoleBadge=({role})=>{const c=RC[role]||{bg:'rgba(100,116,139,.15)',text:'#94a3b8',border:'rgba(100,116,139,.3)'};return<span className="tag" style={{background:c.bg,color:c.text,border:`1px solid ${c.border}`}}>{role}</span>;};
const Chip=({label})=><span style={{background:'rgba(0,245,212,.06)',border:'1px solid rgba(0,245,212,.15)',color:'#6b87a8',padding:'2px 8px',borderRadius:4,fontSize:10,fontFamily:'Fira Code,monospace'}}>{label}</span>;
const PBar=({value=0,color='#00f5d4'})=><div className="progress-bg"><div className="progress-fill" style={{width:`${Math.min(100,Math.max(0,value))}%`,background:`linear-gradient(90deg,${color},#3b82f6)`}}/></div>;
const SecHead=({pre,title,sub,center=true})=>(
  <div style={{textAlign:center?'center':'left',marginBottom:48}}>
    <div style={{fontFamily:'Fira Code,monospace',fontSize:11,color:'#00f5d4',letterSpacing:4,textTransform:'uppercase',marginBottom:10}}>{'// '}{pre}</div>
    <h2 style={{fontFamily:'Orbitron,monospace',fontWeight:900,fontSize:'clamp(24px,4vw,40px)',color:'#dde6f0',letterSpacing:-1}}>{title}</h2>
    {sub&&<p style={{color:'#6b87a8',fontSize:14,marginTop:10,lineHeight:1.7,maxWidth:520,margin:center?'10px auto 0':'10px 0 0'}}>{sub}</p>}
    <div style={{width:54,height:3,background:'linear-gradient(90deg,#00f5d4,#3b82f6)',margin:center?'14px auto 0':'14px 0 0',borderRadius:999}}/>
  </div>
);
const Spinner=()=><div style={{minHeight:'50vh',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:40,height:40,borderRadius:'50%',border:'3px solid rgba(0,245,212,.2)',borderTopColor:'#00f5d4',animation:'spin .8s linear infinite'}}/></div>;

/* ── Toast ── */
const ToastCtx=({toasts,remove})=>(
  <div style={{position:'fixed',bottom:28,right:28,zIndex:9999,display:'flex',flexDirection:'column',gap:8}}>
    {toasts.map(t=>{
      const cols={success:['#00f5d4','rgba(0,245,212,.2)'],error:['#f87171','rgba(239,68,68,.2)'],info:['#fbbf24','rgba(251,191,36,.15)']};
      const [tc,bc]=cols[t.type]||cols.info;
      const Icon=t.type==='success'?Check:t.type==='error'?X:Info;
      return(
        <div key={t.id} className="toast" style={{border:`1px solid ${bc}`}}>
          <div style={{width:26,height:26,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,background:`${tc}12`,color:tc}}><Icon size={12}/></div>
          <span style={{fontSize:13,color:'#dde6f0',flex:1}}>{t.msg}</span>
          <button onClick={()=>remove(t.id)} style={{background:'none',border:'none',cursor:'pointer',color:'#4a6080',display:'flex'}}><X size={12}/></button>
        </div>
      );
    })}
  </div>
);

/* ── Nav ── */
const Nav=({page,setPage,auth,setAuth,setShowLogin})=>{
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>8);window.addEventListener('scroll',fn);return()=>window.removeEventListener('scroll',fn);},[]);
  const links=[{id:'home',label:'Home'},{id:'team',label:'Team'},{id:'register',label:'Register'},{id:'achievements',label:'Achievements'},{id:'projects',label:'Projects'},{id:'management',label:'Portal 🧠'}];
  return(
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:500,background:scrolled?'rgba(3,11,26,.96)':'transparent',backdropFilter:scrolled?'blur(20px)':'none',borderBottom:scrolled?'1px solid rgba(255,255,255,.05)':'none',transition:'all .3s'}}>
      <div style={{maxWidth:1300,margin:'0 auto',height:62,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px'}}>
        <div onClick={()=>setPage('home')} style={{cursor:'pointer',display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:30,height:30,borderRadius:8,background:'linear-gradient(135deg,#00f5d4,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center'}}><Zap size={15} color="#030b1a" strokeWidth={2.5}/></div>
          <span style={{fontFamily:'Orbitron,monospace',fontSize:14,fontWeight:900,color:'#00f5d4',letterSpacing:1}}>LogicLords</span>
        </div>
        <div className="hide-mobile" style={{display:'flex',alignItems:'center',gap:2}}>
          {links.map(l=><button key={l.id} className={`nav-link${page===l.id?' active':''}`} onClick={()=>setPage(l.id)}>{l.label}</button>)}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          {auth?(
            <>
              <div className="hide-mobile" style={{display:'flex',alignItems:'center',gap:8}}>
                <Av name={auth.name} size={26}/>
                <div>
                  <div style={{fontSize:12,fontWeight:600,color:'#dde6f0',lineHeight:1.2}}>{auth.name.split(' ')[0]}</div>
                  {auth.isAdmin&&<div style={{fontSize:9,color:'#00f5d4',fontFamily:'Fira Code,monospace',letterSpacing:1}}>ADMIN</div>}
                </div>
              </div>
              <button onClick={()=>{localStorage.removeItem('ll_token');setAuth(null);}} className="btn-sm" style={{background:'transparent',borderColor:'rgba(248,113,113,.25)',color:'#f87171'}}><LogOut size={10}/></button>
            </>
          ):(
            <button onClick={()=>setShowLogin(true)} className="btn-primary" style={{padding:'8px 16px',fontSize:11}}><LogIn size={12}/>Login</button>
          )}
        </div>
      </div>
    </nav>
  );
};

/* ── Home ── */
const HomePage=({setPage,members,projects})=>{
  const stats=[
    {label:'Team Members',value:members.length,icon:<Users size={16}/>,color:'#00f5d4'},
    {label:'Active Projects',value:projects.length,icon:<Folder size={16}/>,color:'#3b82f6'},
    {label:'Hackathons Won',value:2,icon:<Trophy size={16}/>,color:'#fbbf24'},
    {label:'Lines of Code',value:'50K+',icon:<Terminal size={16}/>,color:'#8b5cf6'},
  ];
  return(
    <div>
      <div className="grid-bg" style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden',padding:'120px 24px 80px',background:'radial-gradient(ellipse 80% 60% at 50% -10%,rgba(0,245,212,.07),transparent 60%)'}}>
        <div className="hero-scan"/>
        <div style={{textAlign:'center',maxWidth:880,position:'relative',zIndex:1}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(0,245,212,.07)',border:'1px solid rgba(0,245,212,.18)',borderRadius:999,padding:'6px 16px',marginBottom:28}}>
            <Sparkles size={11} color="#00f5d4"/>
            <span style={{fontSize:10,color:'#00f5d4',fontFamily:'Fira Code,monospace',letterSpacing:2.5}}>HACKATHON TEAM · INDIA · EST. 2023</span>
          </div>
          <h1 className="glitch-text" style={{fontFamily:'Orbitron,monospace',fontWeight:900,fontSize:'clamp(52px,9vw,108px)',lineHeight:.95,letterSpacing:-3,color:'#00f5d4',textShadow:'0 0 80px rgba(0,245,212,.35)',marginBottom:4}}>Logic<span style={{color:'#dde6f0'}}>Lords</span></h1>
          <div style={{fontFamily:'Fira Code,monospace',fontSize:'clamp(12px,1.8vw,16px)',color:'rgba(0,245,212,.55)',letterSpacing:5,marginBottom:28,textTransform:'uppercase'}}>Where Logic Meets Innovation</div>
          <p style={{fontSize:'clamp(14px,1.7vw,17px)',color:'#6b87a8',maxWidth:560,margin:'0 auto 44px',lineHeight:1.85}}>An elite hackathon team driven by curiosity and caffeine. We build AI-powered solutions to real-world problems.</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:48}}>
            <button onClick={()=>setPage('team')} className="btn-primary"><Users size={13}/>Meet Team</button>
            <button onClick={()=>setPage('projects')} className="btn-outline"><Folder size={13}/>View Projects</button>
            <button onClick={()=>setPage('register')} className="btn-outline" style={{borderColor:'rgba(139,92,246,.35)',color:'#c084fc'}}><Plus size={13}/>Register</button>
          </div>
          <div style={{display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap'}}>
            {stats.map((s,i)=>(
              <div key={i} className="stat-card fade-up" style={{animationDelay:`${i*.1}s`,minWidth:130}}>
                <div style={{color:s.color,marginBottom:8,display:'flex',justifyContent:'center'}}>{s.icon}</div>
                <div style={{fontFamily:'Orbitron,monospace',fontSize:28,fontWeight:900,color:'#dde6f0',lineHeight:1}}>{s.value}</div>
                <div style={{fontSize:11,color:'#4a6080',marginTop:6}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'0 24px 80px'}}>
        <SecHead pre="the builders" title="Meet the Crew"/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:14,marginBottom:32}}>
          {members.slice(0,4).map(m=>(
            <div key={m._id||m.id} className="card" style={{padding:18,display:'flex',alignItems:'center',gap:12}}>
              <Av name={m.name} size={40} src={m.avatar}/>
              <div><div style={{fontWeight:600,fontSize:13,color:'#dde6f0',marginBottom:4}}>{m.name}</div><RoleBadge role={m.role}/></div>
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

/* ── Team ── */
const TeamPage=({members,loading})=>{
  const [q,setQ]=useState('');
  const [role,setRole]=useState('All');
  const [selected,setSelected]=useState(null);
  const filtered=members.filter(m=>(role==='All'||m.role===role)&&(m.name||'').toLowerCase().includes(q.toLowerCase()));
  if(loading)return<div style={{paddingTop:100}}><Spinner/></div>;
  return(
    <div style={{paddingTop:100,paddingBottom:80,minHeight:'100vh'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px'}}>
        <SecHead pre="the builders" title="Our Team" center={false}/>
        <div style={{display:'flex',gap:12,marginBottom:28,flexWrap:'wrap'}}>
          <div style={{position:'relative',flex:'1 1 240px',maxWidth:320}}>
            <Search size={13} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#4a6080'}}/>
            <input className="input" placeholder="Search members..." style={{paddingLeft:34}} value={q} onChange={e=>setQ(e.target.value)}/>
          </div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
            {['All',...ROLES].map(r=>(
              <button key={r} onClick={()=>setRole(r)} className="btn-sm" style={{background:role===r?'rgba(0,245,212,.1)':'transparent',borderColor:role===r?'rgba(0,245,212,.45)':'rgba(255,255,255,.07)',color:role===r?'#00f5d4':'#6b87a8'}}>
                {r==='All'?`All (${members.length})`:r}
              </button>
            ))}
          </div>
        </div>
        {filtered.length===0?(
          <div style={{textAlign:'center',padding:'60px 0',color:'#4a6080'}}><Users size={32} style={{marginBottom:12,opacity:.25}}/><p>No members found.</p></div>
        ):(
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(285px,1fr))',gap:16}}>
            {filtered.map((m,i)=>(
              <div key={m._id||m.id} className="member-card fade-up" style={{animationDelay:`${i*.07}s`,cursor:'pointer'}} onClick={()=>setSelected(m)}>
                {m.isAdmin&&<div style={{position:'absolute',top:12,right:12}}><span className="tag" style={{background:'rgba(0,245,212,.09)',color:'#00f5d4',border:'1px solid rgba(0,245,212,.22)'}}><Shield size={8} style={{marginRight:3}}/>Admin</span></div>}
                <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16}}>
                  <Av name={m.name} size={50} src={m.avatar}/>
                  <div><div style={{fontWeight:700,fontSize:15,color:'#dde6f0',marginBottom:5}}>{m.name}</div><RoleBadge role={m.role}/></div>
                </div>
                {m.bio&&<p style={{fontSize:12,color:'#6b87a8',marginBottom:14,lineHeight:1.6,overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical'}}>{m.bio}</p>}
                <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:14}}>{(m.skills||[]).slice(0,5).map(s=><Chip key={s} label={s}/>)}</div>
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
        )}
      </div>
      {selected&&(
        <div className="modal-overlay" onClick={()=>setSelected(null)}>
          <div className="modal" style={{maxWidth:480}} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setSelected(null)} style={{position:'absolute',top:16,right:16,background:'none',border:'none',cursor:'pointer',color:'#6b87a8'}}><X size={18}/></button>
            <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:20}}>
              <Av name={selected.name} size={64} src={selected.avatar}/>
              <div><div style={{fontFamily:'Orbitron,monospace',fontWeight:700,fontSize:18,color:'#dde6f0',marginBottom:6}}>{selected.name}</div><RoleBadge role={selected.role}/>{selected.isAdmin&&<span className="tag" style={{marginLeft:6,background:'rgba(0,245,212,.08)',color:'#00f5d4',border:'1px solid rgba(0,245,212,.2)'}}><Shield size={8} style={{marginRight:3}}/>Admin</span>}</div>
            </div>
            {selected.bio&&<p style={{fontSize:13,color:'#8a9bb8',lineHeight:1.75,marginBottom:18,background:'rgba(0,245,212,.03)',border:'1px solid rgba(0,245,212,.08)',borderRadius:8,padding:'12px 14px'}}>{selected.bio}</p>}
            <div style={{marginBottom:18}}><label className="label">Skills</label><div style={{display:'flex',flexWrap:'wrap',gap:6}}>{(selected.skills||[]).map(s=><Chip key={s} label={s}/>)}</div></div>
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

/* ── Register ── */
const RegisterPage=({refreshMembers,addToast})=>{
  const [form,setForm]=useState({name:'',email:'',role:'Frontend',skills:'',github:'',linkedin:'',bio:'',password:''});
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState(null);
  const [showPass,setShowPass]=useState(false);
  const submit=useCallback(async()=>{
    if(!form.name.trim()||!form.email.trim()||!form.password){addToast('Name, email & password are required','error');return;}
    if(form.password.length<6){addToast('Password must be at least 6 characters','error');return;}
    if(!/\S+@\S+\.\S+/.test(form.email)){addToast('Please enter a valid email address','error');return;}
    setLoading(true);
    try{
      const data=await apiFetch('/auth/signup',{method:'POST',body:JSON.stringify({name:form.name.trim(),email:form.email.trim(),password:form.password,role:form.role,skills:form.skills.split(',').map(s=>s.trim()).filter(Boolean),github:form.github,linkedin:form.linkedin,bio:form.bio.trim()})});
      if(data.token){
        localStorage.setItem('ll_token',data.token);
        refreshMembers();
        setDone({type:'approved',name:form.name.trim()});
        addToast('Welcome to LogicLords! 🎉','success');
      } else {
        setDone({type:'pending',email:form.email.trim(),name:form.name.trim()});
        addToast('Registration submitted! Check your email.','info');
      }
    }catch(e){addToast(e.message||'Registration failed','error');}
    setLoading(false);
  },[form,addToast,refreshMembers]);
  return(
    <div style={{paddingTop:100,paddingBottom:80,minHeight:'100vh'}}>
      <div style={{maxWidth:620,margin:'0 auto',padding:'0 24px'}}>
        <SecHead pre="join the team" title="Register" sub="Fill in your details to join LogicLords. Your profile will appear on the team page instantly!"/>
        <div className="card" style={{padding:'34px 30px',border:'1px solid rgba(0,245,212,.1)'}}>
          {done?(
            <div style={{textAlign:'center',padding:'28px 0'}}>
              {done.type==='approved'?(
                <>
                  <div className="float-anim" style={{fontSize:52,marginBottom:16}}>🎉</div>
                  <div style={{fontFamily:'Orbitron,monospace',fontSize:19,fontWeight:700,color:'#00f5d4',marginBottom:10}}>Welcome, {done.name?.split(' ')[0]}!</div>
                  <p style={{color:'#6b87a8',fontSize:13,marginBottom:20}}>You are now an official LogicLords member!</p>
                  <button onClick={()=>setDone(null)} className="btn-outline" style={{padding:'9px 20px',fontSize:11}}><Plus size={12}/>Register Another</button>
                </>
              ):(
                <>
                  <div style={{fontSize:52,marginBottom:16}}>📧</div>
                  <div style={{fontFamily:'Orbitron,monospace',fontSize:18,fontWeight:700,color:'#fbbf24',marginBottom:14}}>Check Your Email!</div>
                  <div style={{background:'rgba(251,191,36,.06)',border:'1px solid rgba(251,191,36,.2)',borderRadius:12,padding:'20px',marginBottom:20,textAlign:'left'}}>
                    <p style={{color:'#dde6f0',fontSize:13,marginBottom:12,fontWeight:600}}>What happens next:</p>
                    <div style={{display:'flex',flexDirection:'column',gap:10}}>
                      {[
                        {icon:'1️⃣',text:`Verification email sent to ${done.email}`},
                        {icon:'2️⃣',text:'Click the link in the email to verify your account'},
                        {icon:'3️⃣',text:'Admin will review your application'},
                        {icon:'4️⃣',text:'You will get an approval email — then login!'},
                      ].map((s,i)=>(
                        <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                          <span style={{fontSize:15,flexShrink:0}}>{s.icon}</span>
                          <span style={{fontSize:12,color:'#6b87a8',lineHeight:1.6}}>{s.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={()=>setDone(null)} className="btn-outline" style={{padding:'9px 20px',fontSize:11}}><Plus size={12}/>Register Another</button>
                </>
              )}
            </div>
          ):(
            <div style={{display:'flex',flexDirection:'column',gap:18}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}} className="stack-sm">
                <div><label className="label">Full Name *</label><input className="input" placeholder="Your Name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
                <div><label className="label">Email *</label><input className="input" type="email" placeholder="you@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}} className="stack-sm">
                <div><label className="label">Password *</label>
                  <div style={{position:'relative'}}>
                    <input className="input" type={showPass?'text':'password'} placeholder="Min. 6 characters" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} style={{paddingRight:40}}/>
                    <button onClick={()=>setShowPass(o=>!o)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#4a6080',display:'flex'}}>{showPass?<EyeOff size={14}/>:<Eye size={14}/>}</button>
                  </div>
                </div>
                <div><label className="label">Role</label>
                  <select className="input" value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))}>
                    {ROLES.map(r=><option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div><label className="label">Skills (comma-separated)</label><input className="input" placeholder="React, Node.js, Python..." value={form.skills} onChange={e=>setForm(f=>({...f,skills:e.target.value}))}/></div>
              <div><label className="label">Bio</label><textarea className="input" rows={2} placeholder="Tell us about yourself..." value={form.bio} onChange={e=>setForm(f=>({...f,bio:e.target.value}))} style={{resize:'vertical'}}/></div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}} className="stack-sm">
                <div><label className="label">GitHub URL</label><div style={{position:'relative'}}><Github size={13} style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',color:'#4a6080'}}/><input className="input" style={{paddingLeft:32}} placeholder="github.com/you" value={form.github} onChange={e=>setForm(f=>({...f,github:e.target.value}))}/></div></div>
                <div><label className="label">LinkedIn URL</label><div style={{position:'relative'}}><Linkedin size={13} style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',color:'#4a6080'}}/><input className="input" style={{paddingLeft:32}} placeholder="linkedin.com/in/you" value={form.linkedin} onChange={e=>setForm(f=>({...f,linkedin:e.target.value}))}/></div></div>
              </div>
              <button onClick={submit} className="btn-primary" style={{justifyContent:'center',padding:'13px'}} disabled={loading}>
                {loading?<><span className="spin-anim"/>Registering...</>:<><Plus size={14}/>Join LogicLords</>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Achievements ── */
const AchievementsPage=()=>(
  <div style={{paddingTop:100,paddingBottom:80,minHeight:'100vh'}}>
    <div style={{maxWidth:1060,margin:'0 auto',padding:'0 24px'}}>
      <SecHead pre="our journey" title="Achievements"/>
      <div style={{position:'relative',paddingLeft:44}}>
        <div style={{position:'absolute',left:16,top:10,bottom:10,width:2,background:'linear-gradient(180deg,#00f5d4,rgba(0,245,212,.02))',borderRadius:2}}/>
        {ACHIEVEMENTS.map((a,i)=>(
          <div key={a.id} className="fade-up" style={{animationDelay:`${i*.11}s`,marginBottom:28,position:'relative'}}>
            <div style={{position:'absolute',left:-34,top:22,width:14,height:14,borderRadius:'50%',background:a.color,border:'3px solid #030b1a',boxShadow:`0 0 14px ${a.color}55`,zIndex:1}}/>
            <div className="card" style={{padding:22}}>
              <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:10,marginBottom:10}}>
                <div><div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:'#4a6080',letterSpacing:2,marginBottom:4}}>{a.year} · {a.sub}</div><div style={{fontWeight:700,fontSize:16,color:'#dde6f0'}}>{a.icon} {a.title}</div></div>
                <span className="tag" style={{background:`${a.color}12`,color:a.color,border:`1px solid ${a.color}28`,fontSize:10}}>{a.rank}</span>
              </div>
              <p style={{color:'#6b87a8',fontSize:13,lineHeight:1.7}}>{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Projects ── */
const ProjectsPage=({projects,loading})=>{
  const [sel,setSel]=useState(0);
  if(loading)return<div style={{paddingTop:100}}><Spinner/></div>;
  if(projects.length===0)return(
    <div style={{paddingTop:100,paddingBottom:80,minHeight:'100vh'}}>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'0 24px'}}>
        <SecHead pre="what we build" title="Project Showcase"/>
        <div style={{textAlign:'center',padding:'60px 0',color:'#4a6080'}}><Folder size={40} style={{marginBottom:14,opacity:.22}}/><p>No projects yet. Create one in the Portal!</p></div>
      </div>
    </div>
  );
  const p=projects[Math.min(sel,projects.length-1)];
  return(
    <div style={{paddingTop:100,paddingBottom:80,minHeight:'100vh'}}>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'0 24px'}}>
        <SecHead pre="what we build" title="Project Showcase"/>
        <div style={{display:'flex',gap:10,marginBottom:34,flexWrap:'wrap'}}>
          {projects.map((s,i)=>(
            <button key={s._id||i} onClick={()=>setSel(i)} className="btn-sm" style={{background:sel===i?`${s.color||'#00f5d4'}12`:'transparent',borderColor:sel===i?`${s.color||'#00f5d4'}45`:'rgba(255,255,255,.07)',color:sel===i?s.color||'#00f5d4':'#6b87a8',padding:'9px 18px',fontSize:12}}>{s.title}</button>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
          <div className="card" style={{padding:28}}>
            <h3 style={{fontFamily:'Orbitron,monospace',fontWeight:700,fontSize:17,color:'#dde6f0',marginBottom:16}}>{p.title}</h3>
            <div style={{marginBottom:18}}><div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:p.color||'#00f5d4',letterSpacing:2,marginBottom:8}}>// DESCRIPTION</div><p style={{fontSize:13,color:'#6b87a8',lineHeight:1.75}}>{p.description||'No description yet.'}</p></div>
            {p.problem&&<div><div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:p.color||'#00f5d4',letterSpacing:2,marginBottom:8}}>// PROBLEM STATEMENT</div><p style={{fontSize:13,color:'#6b87a8',lineHeight:1.75}}>{p.problem}</p></div>}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div className="card" style={{padding:22}}><div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:p.color||'#00f5d4',letterSpacing:2,marginBottom:14}}>// TECH STACK</div><div style={{display:'flex',flexWrap:'wrap',gap:7}}>{(p.tags||[]).map(t=><span key={t} style={{background:`${p.color||'#00f5d4'}0e`,border:`1px solid ${p.color||'#00f5d4'}22`,color:p.color||'#00f5d4',padding:'4px 10px',borderRadius:5,fontSize:11,fontFamily:'Fira Code,monospace'}}>{t}</span>)}</div></div>
            <div className="card" style={{padding:22}}><div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:'#4a6080',letterSpacing:2,marginBottom:14}}>// TEAM MEMBERS</div><div style={{display:'flex',flexWrap:'wrap',gap:8}}>{(p.members||[]).map(m=><div key={m._id||m.id} style={{display:'flex',alignItems:'center',gap:6}}><Av name={m.name} size={24} src={m.avatar}/><span style={{fontSize:12,color:'#dde6f0'}}>{m.name}</span></div>)}</div></div>
            <div className="card" style={{padding:22}}><div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:'#4a6080',letterSpacing:2,marginBottom:10}}>// DEADLINE</div><div style={{display:'flex',alignItems:'center',gap:8}}><Calendar size={14} color="#4a6080"/><span style={{fontSize:13,color:'#dde6f0'}}>{p.deadline?new Date(p.deadline).toLocaleDateString('en-IN'):'TBD'}</span></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   CHAT VIEW
══════════════════════════════════════════════════ */
const ChatView=({auth,addToast})=>{
  const [messages,    setMessages]    = useState([]);
  const [input,       setInput]       = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [connected,   setConnected]   = useState(false);
  const [showOnline,  setShowOnline]  = useState(true);
  const socketRef   = useRef(null);
  const bottomRef   = useRef(null);
  const typingTimer = useRef(null);
  const isTyping    = useRef(false);

  const loadHistory=useCallback(async()=>{
    if(!auth)return;
    try{
      const token=localStorage.getItem('ll_token');
      const res=await fetch(`${API_BASE}/chat/messages?room=general&limit=60`,{headers:{Authorization:`Bearer ${token}`}});
      const data=await res.json();
      setMessages(data.messages||[]);
    }catch(e){addToast('Could not load chat history','error');}
    finally{setLoading(false);}
  },[auth,addToast]);

  useEffect(()=>{
    if(!auth){setLoading(false);return;}
    loadHistory();
    import('socket.io-client').then(({io})=>{
      const token=localStorage.getItem('ll_token');
      const socket=io(SOCK_URL,{auth:{token},transports:['websocket','polling']});
      socket.on('connect',()=>setConnected(true));
      socket.on('disconnect',()=>setConnected(false));
      socket.on('new_message',msg=>{
        setMessages(prev=>{
          if(prev.find(m=>m._id===msg._id))return prev;
          return[...prev,msg];
        });
      });
      socket.on('message_deleted',({messageId})=>setMessages(prev=>prev.filter(m=>m._id!==messageId)));
      socket.on('online_users',users=>setOnlineUsers(users));
      socket.on('user_typing',({name,isTyping:t})=>{
        setTypingUsers(prev=>t?prev.includes(name)?prev:[...prev,name]:prev.filter(u=>u!==name));
      });
      socket.on('user_joined',({user})=>setMessages(prev=>[...prev,{_id:`sys-${Date.now()}`,type:'system',text:`${user.name} joined the chat`,createdAt:new Date()}]));
      socket.on('user_left',({user})=>setMessages(prev=>[...prev,{_id:`sys-${Date.now()}-l`,type:'system',text:`${user.name} left the chat`,createdAt:new Date()}]));
      socketRef.current=socket;
    }).catch(()=>addToast('Chat connection failed — make sure socket.io-client is installed','error'));
    return()=>socketRef.current?.disconnect();
  },[auth,loadHistory,addToast]);

  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:'smooth'});},[messages]);

  const stopTyping=()=>{
    if(isTyping.current){isTyping.current=false;socketRef.current?.emit('typing_stop',{room:'general'});}
    clearTimeout(typingTimer.current);
  };
  const startTyping=()=>{
    if(!isTyping.current){isTyping.current=true;socketRef.current?.emit('typing_start',{room:'general'});}
    clearTimeout(typingTimer.current);
    typingTimer.current=setTimeout(stopTyping,2000);
  };
  const sendMessage=useCallback(()=>{
    const text=input.trim();
    if(!text||!socketRef.current?.connected)return;
    socketRef.current.emit('send_message',{text,room:'general'});
    setInput('');stopTyping();
  },[input]);

  const deleteMsg=id=>socketRef.current?.emit('delete_message',{messageId:id,room:'general'});

  if(!auth)return(
    <div style={{textAlign:'center',padding:'80px 20px',color:'#4a6080'}}>
      <MessageSquare size={40} style={{marginBottom:14,opacity:.2}}/>
      <p style={{fontSize:14,marginBottom:8}}>Login to access Team Chat</p>
      <p style={{fontSize:12,opacity:.6}}>Real-time messaging for all team members</p>
    </div>
  );

  return(
    <div style={{display:'grid',gridTemplateColumns:showOnline?'1fr 220px':'1fr',gap:16,height:'70vh',minHeight:500}}>
      {/* Main chat */}
      <div style={{display:'flex',flexDirection:'column',background:'rgba(4,10,28,.8)',border:'1px solid rgba(255,255,255,.07)',borderRadius:14,overflow:'hidden'}}>
        {/* Header */}
        <div style={{padding:'13px 18px',borderBottom:'1px solid rgba(255,255,255,.06)',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(0,0,0,.2)'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:32,height:32,borderRadius:8,background:'rgba(0,245,212,.1)',border:'1px solid rgba(0,245,212,.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Hash size={15} color="#00f5d4"/>
            </div>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:'#dde6f0'}}>general</div>
              <div style={{fontSize:10,color:'#4a6080',fontFamily:'Fira Code,monospace'}}>Team chat room</div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{display:'flex',alignItems:'center',gap:5}}>
              <div style={{width:7,height:7,borderRadius:'50%',background:connected?'#10b981':'#f87171',boxShadow:connected?'0 0 6px #10b981':'none'}}/>
              <span style={{fontSize:10,color:connected?'#10b981':'#f87171',fontFamily:'Fira Code,monospace'}}>{connected?'Live':'Offline'}</span>
            </div>
            <button onClick={()=>setShowOnline(o=>!o)} style={{background:'rgba(0,245,212,.07)',border:'1px solid rgba(0,245,212,.15)',borderRadius:6,padding:'5px 10px',cursor:'pointer',color:'#00f5d4',fontSize:10,fontFamily:'Outfit,sans-serif',display:'flex',alignItems:'center',gap:5}}>
              <Users size={11}/>{onlineUsers.length} online
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages" style={{flex:1,overflowY:'auto',padding:'16px',display:'flex',flexDirection:'column',gap:2}}>
          {loading?(
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',flex:1,color:'#4a6080',fontSize:12}}>
              <div style={{width:22,height:22,borderRadius:'50%',border:'2px solid rgba(0,245,212,.2)',borderTopColor:'#00f5d4',animation:'spin .8s linear infinite',marginRight:10}}/>Loading messages...
            </div>
          ):messages.length===0?(
            <div style={{textAlign:'center',margin:'auto',color:'#4a6080'}}><MessageSquare size={32} style={{marginBottom:10,opacity:.2}}/><p style={{fontSize:13}}>No messages yet. Say hello! 👋</p></div>
          ):(
            messages.map((msg,idx)=>{
              if(msg.type==='system')return(
                <div key={msg._id} style={{textAlign:'center',margin:'8px 0'}}>
                  <span style={{fontSize:10,color:'#4a6080',background:'rgba(255,255,255,.03)',padding:'3px 12px',borderRadius:999,fontFamily:'Fira Code,monospace'}}>{msg.text}</span>
                </div>
              );
              const isMe=String(msg.sender?._id)===String(auth._id);
              const prevMsg=messages[idx-1];
              const sameSender=prevMsg&&prevMsg.type!=='system'&&String(prevMsg.sender?._id)===String(msg.sender?._id);
              return(
                <div key={msg._id} style={{display:'flex',gap:9,alignItems:'flex-end',flexDirection:isMe?'row-reverse':'row',marginTop:sameSender?2:10}}>
                  <div style={{width:32,flexShrink:0,marginBottom:2}}>
                    {!sameSender&&<Av name={msg.sender?.name||'?'} size={30} src={msg.sender?.avatar}/>}
                  </div>
                  <div style={{maxWidth:'68%',position:'relative'}}>
                    {!sameSender&&!isMe&&(
                      <div style={{fontSize:10,color:ROLE_TEXT[msg.sender?.role]||'#6b87a8',marginBottom:3,fontWeight:600,paddingLeft:4}}>
                        {msg.sender?.name}
                        {msg.sender?.isAdmin&&<span style={{marginLeft:5,fontSize:9,background:'rgba(0,245,212,.1)',color:'#00f5d4',padding:'1px 5px',borderRadius:3}}>admin</span>}
                      </div>
                    )}
                    <div style={{background:isMe?'linear-gradient(135deg,rgba(0,245,212,.18),rgba(59,130,246,.18))':'rgba(255,255,255,.05)',border:isMe?'1px solid rgba(0,245,212,.2)':'1px solid rgba(255,255,255,.06)',borderRadius:isMe?'14px 4px 14px 14px':'4px 14px 14px 14px',padding:'10px 14px',wordBreak:'break-word'}}>
                      <p style={{fontSize:13,color:'#dde6f0',lineHeight:1.5,whiteSpace:'pre-wrap'}}>{msg.text}</p>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',gap:8,marginTop:4}}>
                        <span style={{fontSize:9,color:'#4a6080',fontFamily:'Fira Code,monospace'}}>{fmtTime(msg.createdAt)}</span>
                        {(isMe||auth?.isAdmin)&&(
                          <button onClick={()=>deleteMsg(msg._id)} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(248,113,113,.3)',padding:0,display:'flex',transition:'color .2s'}} onMouseEnter={e=>e.currentTarget.style.color='#f87171'} onMouseLeave={e=>e.currentTarget.style.color='rgba(248,113,113,.3)'}><Trash2 size={10}/></button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          {typingUsers.length>0&&(
            <div style={{display:'flex',alignItems:'center',gap:8,padding:'4px 0 4px 42px',marginTop:4}}>
              <div style={{display:'flex',gap:3,alignItems:'center'}}>
                {[0,1,2].map(i=><div key={i} className="typing-dot" style={{width:6,height:6,borderRadius:'50%',background:'#00f5d4',animationDelay:`${i*0.15}s`}}/>)}
              </div>
              <span style={{fontSize:11,color:'#4a6080',fontFamily:'Fira Code,monospace'}}>{typingUsers.join(', ')} {typingUsers.length===1?'is':'are'} typing...</span>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* Input */}
        <div style={{padding:'12px 16px',borderTop:'1px solid rgba(255,255,255,.06)',background:'rgba(0,0,0,.15)'}}>
          <div style={{display:'flex',gap:10,alignItems:'flex-end'}}>
            <Av name={auth.name} size={32} src={auth.avatar}/>
            <div style={{flex:1}}>
              <textarea
                value={input}
                onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage();}else startTyping();}}
                placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
                rows={1}
                style={{width:'100%',background:'rgba(4,10,28,.9)',border:'1px solid rgba(255,255,255,.08)',color:'#dde6f0',padding:'10px 14px',borderRadius:10,fontFamily:'Outfit,sans-serif',fontSize:13,outline:'none',resize:'none',lineHeight:1.5,transition:'border-color .3s',maxHeight:120}}
                onFocus={e=>e.target.style.borderColor='#00f5d4'}
                onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.08)'}
              />
            </div>
            <button onClick={sendMessage} disabled={!input.trim()||!connected} style={{width:40,height:40,borderRadius:10,flexShrink:0,background:input.trim()&&connected?'linear-gradient(135deg,#00f5d4,#3b82f6)':'rgba(255,255,255,.05)',border:'none',cursor:input.trim()&&connected?'pointer':'not-allowed',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .2s'}}>
              <Send size={15} color={input.trim()&&connected?'#030b1a':'#4a6080'}/>
            </button>
          </div>
        </div>
      </div>

      {/* Online users panel */}
      {showOnline&&(
        <div style={{background:'rgba(4,10,28,.8)',border:'1px solid rgba(255,255,255,.07)',borderRadius:14,overflow:'hidden',display:'flex',flexDirection:'column'}}>
          <div style={{padding:'13px 16px',borderBottom:'1px solid rgba(255,255,255,.06)',background:'rgba(0,0,0,.2)'}}>
            <div style={{fontSize:11,fontWeight:700,color:'#00f5d4',fontFamily:'Fira Code,monospace',letterSpacing:2,textTransform:'uppercase'}}>Online — {onlineUsers.length}</div>
          </div>
          <div style={{flex:1,overflowY:'auto',padding:'10px 12px',display:'flex',flexDirection:'column',gap:6}}>
            {onlineUsers.length===0?(
              <div style={{textAlign:'center',padding:'20px 0',color:'#4a6080',fontSize:12}}>No one online yet</div>
            ):(
              onlineUsers.map((u,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 8px',borderRadius:8,background:'rgba(0,245,212,.03)',border:'1px solid rgba(0,245,212,.06)'}}>
                  <div style={{position:'relative',flexShrink:0}}>
                    <Av name={u.name} size={28} src={u.avatar}/>
                    <div style={{position:'absolute',bottom:0,right:0,width:8,height:8,borderRadius:'50%',background:'#10b981',border:'2px solid #040a1c'}}/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:11,fontWeight:600,color:'#dde6f0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                      {u.name.split(' ')[0]}{u.isAdmin&&<span style={{marginLeft:4,fontSize:8,color:'#00f5d4'}}>★</span>}
                    </div>
                    <div style={{fontSize:9,color:ROLE_TEXT[u.role]||'#6b87a8',fontWeight:600}}>{u.role}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   GITHUB VIEW
══════════════════════════════════════════════════ */
const GitHubView=({auth,addToast,members})=>{
  const [repoInput,setRepoInput]=useState('');
  const [repo,setRepo]=useState('');
  const [branches,setBranches]=useState([]);
  const [loading,setLoading]=useState(false);
  const [filter,setFilter]=useState('all');
  const STATUS_META={
    'available':  {color:'#6b7280',label:'Available',  bg:'rgba(107,114,128,.12)'},
    'in-progress':{color:'#fbbf24',label:'In Progress',bg:'rgba(251,191,36,.12)'},
    'merged':     {color:'#10b981',label:'Merged',     bg:'rgba(16,185,129,.12)'},
  };
  const fetchBranches=async(r)=>{
    if(!r.trim())return;
    setLoading(true);
    try{
      let rp=r.trim();
      if(rp.includes('github.com'))rp=rp.split('github.com/')[1]?.replace('.git','')?.replace(/\/$/,'');
      const data=await apiFetch(`/github/branches?repo=${rp}`);
      setBranches(data.branches||[]);setRepo(rp);
      addToast(`${data.branches.length} branches found!`,'success');
    }catch(e){addToast(e.message||'Could not fetch branches','error');}
    setLoading(false);
  };
  const assignBranch=async(branchName)=>{
    if(!auth){addToast('Please login first','error');return;}
    try{await apiFetch('/github/assign',{method:'POST',body:JSON.stringify({repoUrl:repo,branchName,status:'in-progress'})});addToast(`"${branchName}" assigned to you!`,'success');fetchBranches(repo);}
    catch(e){addToast(e.message,'error');}
  };
  const unassignBranch=async(branchName)=>{
    try{await apiFetch('/github/unassign',{method:'DELETE',body:JSON.stringify({repoUrl:repo,branchName})});addToast('Branch released','info');fetchBranches(repo);}
    catch(e){addToast(e.message,'error');}
  };
  const updateStatus=async(branchName,status)=>{
    if(status==='available'){unassignBranch(branchName);return;}
    try{await apiFetch('/github/status',{method:'PATCH',body:JSON.stringify({repoUrl:repo,branchName,status})});fetchBranches(repo);}
    catch(e){addToast(e.message,'error');}
  };
  const filtered=branches.filter(b=>filter==='all'||b.status===filter);
  return(
    <div>
      <div className="card" style={{padding:22,marginBottom:20}}>
        <div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:'#00f5d4',letterSpacing:2,marginBottom:14}}>// ADD YOUR GITHUB REPOSITORY</div>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          <div style={{position:'relative',flex:'1 1 300px'}}>
            <Github size={13} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#4a6080'}}/>
            <input className="input" style={{paddingLeft:34}} placeholder="github.com/username/repo  or  username/repo" value={repoInput} onChange={e=>setRepoInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&fetchBranches(repoInput)}/>
          </div>
          <button onClick={()=>fetchBranches(repoInput)} className="btn-primary" disabled={loading} style={{padding:'11px 20px',fontSize:11}}>
            {loading?<><span className="spin-anim"/>Loading...</>:<><Search size={12}/>Fetch Branches</>}
          </button>
        </div>
        {repo&&<div style={{marginTop:12,display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:11,color:'#4a6080',fontFamily:'Fira Code,monospace'}}>Repo:</span><a href={`https://github.com/${repo}`} target="_blank" rel="noreferrer" style={{fontSize:11,color:'#00f5d4',fontFamily:'Fira Code,monospace',display:'flex',alignItems:'center',gap:4}}>github.com/{repo} <ExternalLink size={10}/></a></div>}
      </div>
      {branches.length>0&&(
        <>
          <div style={{display:'flex',gap:12,marginBottom:18,flexWrap:'wrap',alignItems:'center'}}>
            {Object.entries(STATUS_META).map(([key,val])=>{
              const count=branches.filter(b=>b.status===key).length;
              return(<div key={key} style={{background:val.bg,border:`1px solid ${val.color}25`,borderRadius:8,padding:'10px 18px',display:'flex',alignItems:'center',gap:8}}><span style={{width:7,height:7,borderRadius:'50%',background:val.color}}/><span style={{fontSize:12,color:val.color,fontWeight:600}}>{val.label}</span><span style={{fontSize:16,fontWeight:700,color:'#dde6f0',fontFamily:'Orbitron,monospace'}}>{count}</span></div>);
            })}
            <button onClick={()=>fetchBranches(repo)} style={{background:'transparent',border:'1px solid rgba(255,255,255,.07)',borderRadius:8,padding:'10px 14px',cursor:'pointer',color:'#6b87a8',display:'flex',alignItems:'center',gap:5,fontSize:11,fontFamily:'Outfit,sans-serif'}}><RefreshCw size={11}/>Refresh</button>
          </div>
          <div style={{display:'flex',gap:6,marginBottom:16,flexWrap:'wrap'}}>
            {[{id:'all',label:`All (${branches.length})`},...Object.entries(STATUS_META).map(([k,v])=>({id:k,label:v.label}))].map(f=>(
              <button key={f.id} onClick={()=>setFilter(f.id)} className="btn-sm" style={{background:filter===f.id?'rgba(0,245,212,.1)':'transparent',borderColor:filter===f.id?'rgba(0,245,212,.45)':'rgba(255,255,255,.07)',color:filter===f.id?'#00f5d4':'#6b87a8'}}>{f.label}</button>
            ))}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {filtered.map(branch=>{
              const sm=STATUS_META[branch.status]||STATUS_META.available;
              const isMyBranch=auth&&branch.assignedTo&&String(branch.assignedTo._id)===String(auth._id);
              const isMain=['main','master','develop'].includes(branch.name);
              return(
                <div key={branch.name} className="card" style={{padding:18,borderColor:isMyBranch?'rgba(0,245,212,.3)':'rgba(255,255,255,.07)',background:isMyBranch?'rgba(0,245,212,.03)':'rgba(8,18,38,.8)'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
                    <div style={{display:'flex',alignItems:'center',gap:12,flex:1,minWidth:200}}>
                      <div style={{width:36,height:36,borderRadius:9,background:isMyBranch?'rgba(0,245,212,.12)':'rgba(0,245,212,.06)',border:`1px solid ${isMyBranch?'rgba(0,245,212,.3)':'rgba(0,245,212,.12)'}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                        <GitBranch size={16} color={isMyBranch?'#00f5d4':'#4a6080'}/>
                      </div>
                      <div>
                        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:5,flexWrap:'wrap'}}>
                          <span style={{fontSize:13,fontWeight:700,color:'#dde6f0',fontFamily:'Fira Code,monospace'}}>{branch.name}</span>
                          {isMain&&<span className="tag" style={{background:'rgba(59,130,246,.12)',color:'#3b82f6',border:'1px solid rgba(59,130,246,.25)',fontSize:9}}>DEFAULT</span>}
                          {isMyBranch&&<span className="tag" style={{background:'rgba(0,245,212,.1)',color:'#00f5d4',border:'1px solid rgba(0,245,212,.25)',fontSize:9}}>★ MY BRANCH</span>}
                        </div>
                        <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
                          <span style={{fontSize:10,color:sm.color,background:sm.bg,padding:'2px 8px',borderRadius:4,fontWeight:600}}>{sm.label}</span>
                          {branch.assignedTo&&<div style={{display:'flex',alignItems:'center',gap:5}}><Av name={branch.assignedTo.name} size={16} src={branch.assignedTo.avatar}/><span style={{fontSize:11,color:'#6b87a8'}}>{branch.assignedTo.name}</span></div>}
                        </div>
                      </div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
                      {isMyBranch&&<select value={branch.status} onChange={e=>updateStatus(branch.name,e.target.value)} style={{background:'rgba(4,10,28,.9)',border:'1px solid rgba(255,255,255,.1)',color:'#dde6f0',padding:'7px 10px',borderRadius:7,fontSize:11,fontFamily:'Outfit,sans-serif',cursor:'pointer',outline:'none'}}>
                        <option value="in-progress">🟡 In Progress</option>
                        <option value="merged">🟢 Merged</option>
                        <option value="available">⚪ Release</option>
                      </select>}
                      {auth&&!isMain&&(isMyBranch?(
                        <button onClick={()=>unassignBranch(branch.name)} className="btn-sm" style={{background:'rgba(239,68,68,.08)',borderColor:'rgba(239,68,68,.25)',color:'#f87171'}}><X size={10}/>Release</button>
                      ):branch.assignedTo?(
                        <span style={{fontSize:11,color:'#4a6080',padding:'6px 10px',fontStyle:'italic'}}>Taken</span>
                      ):(
                        <button onClick={()=>assignBranch(branch.name)} className="btn-sm" style={{background:'rgba(0,245,212,.08)',borderColor:'rgba(0,245,212,.3)',color:'#00f5d4'}}><Check size={10}/>Assign to Me</button>
                      ))}
                      <a href={branch.url} target="_blank" rel="noreferrer" className="btn-sm" style={{background:'transparent',borderColor:'rgba(255,255,255,.1)',color:'#6b87a8',textDecoration:'none'}}><Github size={11}/>Open</a>
                      {!isMain&&<a href={branch.compareUrl} target="_blank" rel="noreferrer" className="btn-sm" style={{background:'transparent',borderColor:'rgba(139,92,246,.25)',color:'#c084fc',textDecoration:'none'}}><GitBranch size={11}/>Compare</a>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {!loading&&repo&&branches.length===0&&<div style={{textAlign:'center',padding:'60px 0',color:'#4a6080'}}><GitBranch size={32} style={{marginBottom:12,opacity:.25}}/><p>No branches found.</p></div>}
      {!repo&&<div style={{textAlign:'center',padding:'60px 0',color:'#4a6080'}}><Github size={40} style={{marginBottom:14,opacity:.2}}/><p style={{fontSize:14,marginBottom:8}}>Enter your GitHub repo URL above</p><p style={{fontSize:12,opacity:.6}}>Example: github.com/ay178/collegeerp</p></div>}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   MANAGEMENT PAGE
══════════════════════════════════════════════════ */
const ManagementPage=({projects,setProjects,tasks,setTasks,members,setMembers,auth,addToast})=>{
  const [selPid,setSelPid]=useState(null);
  const [view,setView]=useState('kanban');
  const [showAddProj,setShowAddProj]=useState(false);
  const [showAddTask,setShowAddTask]=useState(false);
  const [delPid,setDelPid]=useState(null);
  useEffect(()=>{if(!selPid&&projects.length>0)setSelPid(projects[0]._id||projects[0].id);},[projects,selPid]);
  const proj=projects.find(p=>(p._id||p.id)===selPid);
  const pid=proj?._id||proj?.id;
  const pTasks=tasks.filter(t=>t.pid===pid||t.project===pid||(t.project&&(t.project._id||t.project)===pid));
  const todo=pTasks.filter(t=>t.status==='todo');
  const inp=pTasks.filter(t=>t.status==='inprogress');
  const done=pTasks.filter(t=>t.status==='done');
  const pct=pTasks.length?Math.round((done.length/pTasks.length)*100):0;
  const cycleStatus=async(task)=>{
    if(!auth){addToast('Please login to manage tasks','error');return;}
    const next={todo:'inprogress',inprogress:'done',done:'todo'}[task.status];
    const tid=task._id||task.id;
    setTasks(prev=>prev.map(t=>(t._id||t.id)===tid?{...t,status:next}:t));
    try{await apiFetch(`/tasks/${tid}/status`,{method:'PATCH',body:JSON.stringify({status:next})});}
    catch(e){addToast('Update failed','error');}
  };
  const deleteProj=async(id)=>{
    try{
      await apiFetch(`/projects/${id}`,{method:'DELETE'});
      setProjects(prev=>prev.filter(p=>(p._id||p.id)!==id));
      setTasks(prev=>prev.filter(t=>t.pid!==id&&t.project!==id));
      setSelPid(projects.find(p=>(p._id||p.id)!==id)?._id||null);
      addToast('Project deleted','info');
    }catch(e){addToast('Delete failed','error');}
    setDelPid(null);
  };
  const COLS=[
    {key:'todo',label:'To Do',tasks:todo,color:'#6366f1'},
    {key:'inprogress',label:'In Progress',tasks:inp,color:'#fbbf24'},
    {key:'done',label:'Completed',tasks:done,color:'#10b981'},
  ];
  const VIEW_TABS=[
    {id:'kanban',   icon:<Layers size={12}/>,      label:'Kanban'},
    {id:'analytics',icon:<BarChart2 size={12}/>,   label:'Analytics'},
    {id:'github',   icon:<GitBranch size={12}/>,   label:'GitHub 🌿'},
    {id:'chat',     icon:<MessageSquare size={12}/>,label:'Chat 💬'},
    ...(auth?.isAdmin?[{id:'approvals',icon:<Shield size={12}/>,label:'Approvals 🔔'}]:[]),
  ];
  const isProjectView = view==='kanban'||view==='analytics';
  return(
    <div style={{paddingTop:100,paddingBottom:80,minHeight:'100vh'}}>
      <div style={{maxWidth:1340,margin:'0 auto',padding:'0 24px'}}>
        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:32,flexWrap:'wrap',gap:14}}>
          <div>
            <div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:'#00f5d4',letterSpacing:4,marginBottom:8,textTransform:'uppercase'}}>// project portal</div>
            <h2 style={{fontFamily:'Orbitron,monospace',fontWeight:900,fontSize:'clamp(20px,3vw,32px)',color:'#dde6f0',letterSpacing:-1}}>Management Dashboard</h2>
          </div>
          <div style={{display:'flex',gap:9,flexWrap:'wrap',alignItems:'center'}}>
            {/* View tabs */}
            <div style={{display:'flex',background:'rgba(4,10,28,.8)',border:'1px solid rgba(255,255,255,.07)',borderRadius:8,overflow:'hidden'}}>
              {VIEW_TABS.map(v=>(
                <button key={v.id} onClick={()=>setView(v.id)} style={{padding:'8px 14px',background:view===v.id?'rgba(0,245,212,.1)':'transparent',border:'none',cursor:'pointer',color:view===v.id?'#00f5d4':'#6b87a8',fontFamily:'Outfit,sans-serif',fontSize:11,fontWeight:600,display:'flex',alignItems:'center',gap:5,transition:'all .2s'}}>
                  {v.icon}{v.label}
                </button>
              ))}
            </div>
            {auth&&isProjectView&&<><button onClick={()=>setShowAddProj(true)} className="btn-primary" style={{padding:'8px 16px',fontSize:11}}><Plus size={12}/>New Project</button>{proj&&<button onClick={()=>setShowAddTask(true)} className="btn-outline" style={{padding:'8px 16px',fontSize:11}}><Plus size={12}/>Add Task</button>}</>}
            {!auth&&<div style={{background:'rgba(251,191,36,.07)',border:'1px solid rgba(251,191,36,.18)',borderRadius:7,padding:'8px 14px',display:'flex',alignItems:'center',gap:7}}><Shield size={12} color="#fbbf24"/><span style={{fontSize:11,color:'#fbbf24'}}>Login to manage</span></div>}
          </div>
        </div>

        {/* GitHub tab */}
        {view==='github'&&<GitHubView auth={auth} addToast={addToast} members={members}/>}

        {/* Chat tab */}
        {view==='chat'&&<ChatView auth={auth} addToast={addToast}/>}

        {/* Admin Approvals tab */}
        {view==='approvals'&&<AdminApprovalPanel auth={auth} addToast={addToast} setMembers={setMembers}/>}

        {/* Kanban / Analytics tabs */}
        {isProjectView&&(
          <>
            {/* Project selector tabs */}
            <div style={{display:'flex',gap:8,marginBottom:22,flexWrap:'wrap'}}>
              {projects.map(p=>{
                const pid2=p._id||p.id;const isSel=selPid===pid2;
                const ptasks=tasks.filter(t=>t.pid===pid2||t.project===pid2);
                const ppct=ptasks.length?Math.round((ptasks.filter(t=>t.status==='done').length/ptasks.length)*100):0;
                return(
                  <button key={pid2} onClick={()=>setSelPid(pid2)} style={{padding:'9px 16px',borderRadius:9,cursor:'pointer',border:`1px solid ${isSel?p.color+'55':'rgba(255,255,255,.07)'}`,background:isSel?`${p.color}0f`:'transparent',color:isSel?p.color:'#6b87a8',fontFamily:'Outfit,sans-serif',fontSize:12,fontWeight:600,display:'flex',alignItems:'center',gap:8,transition:'all .2s'}}>
                    <span style={{width:7,height:7,borderRadius:'50%',background:p.color,flexShrink:0}}/>
                    {p.title}
                    <span style={{fontSize:10,opacity:.7,fontFamily:'Fira Code,monospace'}}>{ppct}%</span>
                    {auth?.isAdmin&&isSel&&<span onClick={e=>{e.stopPropagation();setDelPid(pid2)}} style={{marginLeft:2,color:'rgba(248,113,113,.45)',cursor:'pointer',display:'flex'}} onMouseEnter={e=>e.currentTarget.style.color='#f87171'} onMouseLeave={e=>e.currentTarget.style.color='rgba(248,113,113,.45)'}><Trash2 size={10}/></span>}
                  </button>
                );
              })}
              {projects.length===0&&<span style={{fontSize:13,color:'#4a6080'}}>{auth?'No projects yet — create one!':'Login to manage projects.'}</span>}
            </div>

            {proj?(
              <>
                {/* Project header card */}
                <div className="card" style={{padding:22,marginBottom:20,borderColor:`${proj.color}22`}}>
                  <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:16,marginBottom:14}}>
                    <div style={{flex:1,minWidth:200}}>
                      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}><span style={{width:10,height:10,borderRadius:'50%',background:proj.color,boxShadow:`0 0 10px ${proj.color}`}}/><h3 style={{fontWeight:700,fontSize:16,color:'#dde6f0'}}>{proj.title}</h3></div>
                      <p style={{fontSize:12,color:'#6b87a8',lineHeight:1.6}}>{proj.description}</p>
                    </div>
                    <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
                      {[{val:`${pct}%`,label:'COMPLETE',color:proj.color},{val:pTasks.length,label:'TASKS',color:'#dde6f0'},{val:done.length,label:'DONE',color:'#10b981'}].map((s,i)=>(
                        <div key={i} style={{textAlign:'center'}}><div style={{fontFamily:'Orbitron,monospace',fontSize:22,fontWeight:900,color:s.color,lineHeight:1}}>{s.val}</div><div style={{fontSize:9,color:'#4a6080',letterSpacing:1.5,marginTop:4}}>{s.label}</div></div>
                      ))}
                    </div>
                  </div>
                  <PBar value={proj.githubProgress||pct} color={proj.color}/>
                  <div style={{marginTop:12,display:'flex',alignItems:'center',gap:12,flexWrap:'wrap'}}>
                    {(proj.tags||[]).map(t=><span key={t} style={{background:`${proj.color}0d`,border:`1px solid ${proj.color}22`,color:proj.color,padding:'2px 9px',borderRadius:4,fontSize:10,fontFamily:'Fira Code,monospace'}}>{t}</span>)}
                    <span style={{marginLeft:'auto',fontSize:11,color:'#4a6080',display:'flex',alignItems:'center',gap:4}}><Calendar size={11}/>{proj.deadline?new Date(proj.deadline).toLocaleDateString('en-IN'):'TBD'}</span>
                  </div>
                  {/* GitHub Stats Row */}
                  {proj.githubRepo&&(
                    <div style={{marginTop:12,paddingTop:12,borderTop:'1px solid rgba(255,255,255,.05)',display:'flex',gap:16,flexWrap:'wrap',alignItems:'center'}}>
                      <a href={proj.githubUrl||`https://github.com/${proj.githubRepo}`} target="_blank" rel="noreferrer" style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:'#00f5d4',fontFamily:'Fira Code,monospace',textDecoration:'none'}}>
                        <Github size={11}/>{proj.githubRepo}
                      </a>
                      {proj.githubData?.stars>0&&<span style={{fontSize:11,color:'#fbbf24',fontFamily:'Fira Code,monospace'}}>⭐ {proj.githubData.stars}</span>}
                      {proj.githubData?.openPRs>0&&<span style={{fontSize:11,color:'#818cf8',fontFamily:'Fira Code,monospace'}}>🔀 {proj.githubData.openPRs} PRs</span>}
                      {proj.githubData?.openIssues>0&&<span style={{fontSize:11,color:'#f87171',fontFamily:'Fira Code,monospace'}}>🐛 {proj.githubData.openIssues} issues</span>}
                      {proj.githubData?.lastCommit&&<span style={{fontSize:10,color:'#6b87a8',fontFamily:'Fira Code,monospace',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:200}}>💾 {proj.githubData.lastCommit}</span>}
                      {proj.githubProgress===100&&<span style={{fontSize:11,color:'#10b981',fontWeight:700}}>✅ Completed!</span>}
                    </div>
                  )}
                  {/* Recent Activity */}
                  {proj.recentActivity&&proj.recentActivity.length>0&&(
                    <div style={{marginTop:10}}>
                      {proj.recentActivity.slice(0,3).map((act,i)=>(
                        <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'4px 0',borderBottom:i<2?'1px solid rgba(255,255,255,.03)':'none'}}>
                          <span style={{fontSize:10,color:act.type==='push'?'#3b82f6':act.type==='merged'?'#10b981':'#fbbf24'}}>
                            {act.type==='push'?'↑':act.type==='merged'?'✓':'•'}
                          </span>
                          <span style={{fontSize:11,color:'#6b87a8',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',flex:1}}>{act.title}</span>
                          <span style={{fontSize:9,color:'#4a6080',fontFamily:'Fira Code,monospace',flexShrink:0}}>{act.author}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Kanban board */}
                {view==='kanban'?(
                  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
                    {COLS.map(col=>(
                      <div key={col.key} className="kanban-col">
                        <div style={{padding:'13px 15px',borderBottom:`2px solid ${col.color}`,background:`${col.color}07`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                          <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{width:7,height:7,borderRadius:'50%',background:col.color,boxShadow:`0 0 8px ${col.color}`}}/><span style={{fontSize:11,fontWeight:700,color:col.color,letterSpacing:1,textTransform:'uppercase'}}>{col.label}</span></div>
                          <span style={{background:`${col.color}15`,color:col.color,padding:'1px 8px',borderRadius:999,fontSize:11,fontWeight:700}}>{col.tasks.length}</span>
                        </div>
                        <div className="kanban-drop-zone">
                          {col.tasks.map(task=>{
                            const assignee=task.assignee&&typeof task.assignee==='object'?task.assignee:members.find(m=>(m._id||m.id)===task.assignee);
                            const pm=PRIORITY_META[task.priority||'medium'];
                            return(
                              <div key={task._id||task.id} className={`task-card priority-${task.priority||'medium'}`} onClick={()=>cycleStatus(task)}>
                                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:5}}>
                                  <div style={{fontSize:12,fontWeight:600,color:'#dde6f0',lineHeight:1.35,flex:1,marginRight:8}}>{task.title}</div>
                                  <span style={{background:`${pm.color}14`,color:pm.color,padding:'2px 7px',borderRadius:4,fontSize:9,fontWeight:700,flexShrink:0}}>{pm.label}</span>
                                </div>
                                {task.description&&<div style={{fontSize:11,color:'#4a6080',marginBottom:9,lineHeight:1.5}}>{task.description}</div>}
                                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                  {assignee?<div style={{display:'flex',alignItems:'center',gap:6}}><Av name={assignee.name} size={18} src={assignee.avatar}/><span style={{fontSize:10,color:'#6b87a8'}}>{(assignee.name||'').split(' ')[0]}</span></div>:<span style={{fontSize:10,color:'rgba(74,96,128,.5)'}}>Unassigned</span>}
                                  {auth&&<span style={{fontSize:9,color:`${col.color}60`,fontFamily:'Fira Code,monospace'}}>click</span>}
                                </div>
                              </div>
                            );
                          })}
                          {col.tasks.length===0&&<div style={{textAlign:'center',padding:'28px 0',color:'rgba(74,96,128,.35)',fontSize:12,fontStyle:'italic'}}>Empty</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                ):(
                  /* Analytics view */
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18}}>
                    <div className="card" style={{padding:22}}>
                      <div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:'#00f5d4',letterSpacing:2,marginBottom:18}}>// TASK STATUS</div>
                      {COLS.map(col=>(
                        <div key={col.key} style={{marginBottom:14}}>
                          <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span style={{fontSize:12,color:'#dde6f0'}}>{col.label}</span><span style={{fontSize:12,color:col.color,fontFamily:'Fira Code,monospace'}}>{col.tasks.length}/{pTasks.length}</span></div>
                          <div className="progress-bg"><div style={{height:5,borderRadius:999,background:col.color,width:`${pTasks.length?Math.round((col.tasks.length/pTasks.length)*100):0}%`,transition:'width .8s ease'}}/></div>
                        </div>
                      ))}
                    </div>
                    <div className="card" style={{padding:22}}>
                      <div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:'#00f5d4',letterSpacing:2,marginBottom:18}}>// MEMBER CONTRIBUTIONS</div>
                      {(proj.members||[]).map(m=>{
                        const mid=m._id||m.id;
                        const n=pTasks.filter(t=>(t.assignee?._id||t.assignee?.id||t.assignee)===mid).length;
                        return(
                          <div key={mid} style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
                            <Av name={m.name} size={28} src={m.avatar}/>
                            <div style={{flex:1}}>
                              <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontSize:12,color:'#dde6f0'}}>{m.name}</span><span style={{fontSize:11,color:'#00f5d4',fontFamily:'Fira Code,monospace'}}>{n} tasks</span></div>
                              <div className="progress-bg"><div style={{height:4,borderRadius:999,background:`linear-gradient(90deg,${getAC(m.name)},#3b82f6)`,width:`${pTasks.length?Math.round((n/pTasks.length)*100):0}%`,transition:'width .8s ease'}}/></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ):(
              <div style={{textAlign:'center',padding:'80px 0',color:'#4a6080'}}><Folder size={40} style={{marginBottom:14,opacity:.22}}/><p>{auth?'Create your first project!':'Login to manage projects.'}</p></div>
            )}
          </>
        )}
      </div>

      {showAddProj&&auth&&<AddProjectModal members={members} setProjects={setProjects} close={()=>setShowAddProj(false)} addToast={addToast} onSuccess={p=>setSelPid(p._id||p.id)}/>}
      {showAddTask&&auth&&proj&&<AddTaskModal members={(proj.members||[]).length>0?proj.members:members} projectId={pid} setTasks={setTasks} close={()=>setShowAddTask(false)} addToast={addToast}/>}
      {delPid&&(
        <div className="modal-overlay" onClick={()=>setDelPid(null)}>
          <div className="modal" style={{maxWidth:360}} onClick={e=>e.stopPropagation()}>
            <div style={{textAlign:'center',marginBottom:24}}><Trash2 size={30} color="#f87171" style={{marginBottom:12}}/><div style={{fontWeight:700,fontSize:15,color:'#dde6f0',marginBottom:8}}>Delete Project?</div><p style={{fontSize:12,color:'#6b87a8'}}>This will permanently delete the project and all its tasks.</p></div>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setDelPid(null)} className="btn-outline" style={{flex:1,justifyContent:'center',padding:'10px'}}>Cancel</button>
              <button onClick={()=>deleteProj(delPid)} style={{flex:1,padding:'10px',background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.28)',color:'#f87171',borderRadius:8,cursor:'pointer',fontFamily:'Outfit,sans-serif',fontSize:12,fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center',gap:6}}><Trash2 size={12}/>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Add Project Modal ── */
const AddProjectModal=({members,setProjects,close,addToast,onSuccess})=>{
  const [f,setF]=useState({title:'',desc:'',deadline:'',memberIds:[],tags:'',color:'#00f5d4',githubUrl:''});
  const [loading,setLoading]=useState(false);
  const [syncing,setSyncing]=useState(false);
  const [repoPreview,setRepoPreview]=useState(null);

  const previewRepo=async()=>{
    let url=f.githubUrl.trim();
    if(!url)return;
    if(url.includes('github.com'))url=url.split('github.com/')[1]?.replace('.git','')?.replace(/\/$/,'');
    setSyncing(true);
    try{
      const data=await apiFetch(`/github/repo-data?repo=${url}`);
      setRepoPreview(data.repo);
      addToast(`Connected: ${data.repo.fullName}`,'success');
    }catch(e){addToast('Could not fetch repo — check URL','error');}
    setSyncing(false);
  };

  const submit=async()=>{
    if(!f.title.trim()){addToast('Project title is required','error');return;}
    setLoading(true);
    try{
      let repoPath='';
      if(f.githubUrl.trim()){
        repoPath=f.githubUrl.trim();
        if(repoPath.includes('github.com'))repoPath=repoPath.split('github.com/')[1]?.replace('.git','')?.replace(/\/$/,'')||'';
      }
      const data=await apiFetch('/projects',{method:'POST',body:JSON.stringify({
        title:f.title.trim(),description:f.desc.trim(),
        deadline:f.deadline||undefined,members:f.memberIds,
        tags:f.tags.split(',').map(s=>s.trim()).filter(Boolean),
        color:f.color,
        githubUrl:f.githubUrl.trim(),
        githubRepo:repoPath,
      })});
      setProjects(prev=>[...prev,data.project]);
      addToast(`"${data.project.title}" created!`,'success');
      onSuccess&&onSuccess(data.project);close();
    }catch(e){addToast(e.message||'Failed to create project','error');}
    setLoading(false);
  };

  return(
    <div className="modal-overlay" onClick={close}><div className="modal" onClick={e=>e.stopPropagation()}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:22}}><div style={{fontFamily:'Orbitron,monospace',fontWeight:700,fontSize:15,color:'#dde6f0'}}>New Project</div><button onClick={close} style={{background:'none',border:'none',cursor:'pointer',color:'#6b87a8'}}><X size={17}/></button></div>
      <div style={{display:'flex',flexDirection:'column',gap:15}}>
        <div><label className="label">Title *</label><input className="input" placeholder="Project name" value={f.title} onChange={e=>setF(v=>({...v,title:e.target.value}))}/></div>
        <div><label className="label">Description</label><textarea className="input" rows={2} placeholder="What are you building?" value={f.desc} onChange={e=>setF(v=>({...v,desc:e.target.value}))} style={{resize:'vertical'}}/></div>
        {/* GitHub URL */}
        <div>
          <label className="label">GitHub Repository URL</label>
          <div style={{display:'flex',gap:8}}>
            <div style={{position:'relative',flex:1}}>
              <Github size={13} style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',color:'#4a6080'}}/>
              <input className="input" style={{paddingLeft:32}} placeholder="github.com/username/repo" value={f.githubUrl} onChange={e=>setF(v=>({...v,githubUrl:e.target.value})) }/>
            </div>
            <button onClick={previewRepo} disabled={syncing||!f.githubUrl.trim()} className="btn-sm" style={{background:'rgba(0,245,212,.08)',borderColor:'rgba(0,245,212,.25)',color:'#00f5d4',padding:'0 12px'}}>
              {syncing?<span className="spin-anim"/>:<Check size={12}/>}
            </button>
          </div>
          {repoPreview&&(
            <div style={{marginTop:8,background:'rgba(0,245,212,.05)',border:'1px solid rgba(0,245,212,.15)',borderRadius:8,padding:'10px 12px',display:'flex',gap:14,flexWrap:'wrap'}}>
              <span style={{fontSize:11,color:'#00f5d4',fontFamily:'Fira Code,monospace'}}>⭐ {repoPreview.stars}</span>
              <span style={{fontSize:11,color:'#6b87a8',fontFamily:'Fira Code,monospace'}}>🍴 {repoPreview.forks}</span>
              <span style={{fontSize:11,color:'#6b87a8',fontFamily:'Fira Code,monospace'}}>🔤 {repoPreview.language||'—'}</span>
              <span style={{fontSize:11,color:'#34d399',fontFamily:'Fira Code,monospace'}}>✅ Connected!</span>
            </div>
          )}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div><label className="label">Deadline</label><input className="input" type="date" value={f.deadline} onChange={e=>setF(v=>({...v,deadline:e.target.value}))}/></div>
          <div><label className="label">Tags</label><input className="input" placeholder="React, Python..." value={f.tags} onChange={e=>setF(v=>({...v,tags:e.target.value}))}/></div>
        </div>
        <div><label className="label">Accent Color</label><div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{COLORS.map(c=><button key={c} onClick={()=>setF(v=>({...v,color:c}))} style={{width:26,height:26,borderRadius:'50%',background:c,border:'none',cursor:'pointer',outline:f.color===c?`3px solid ${c}`:'3px solid transparent',outlineOffset:2}}/>)}</div></div>
        <div><label className="label">Assign Members</label><div style={{display:'flex',flexWrap:'wrap',gap:7}}>{members.map(m=>{const id=m._id||m.id;const sel=f.memberIds.includes(id);return(<button key={id} onClick={()=>setF(v=>({...v,memberIds:sel?v.memberIds.filter(i=>i!==id):[...v.memberIds,id]}))} className="btn-sm" style={{background:sel?'rgba(0,245,212,.1)':'transparent',borderColor:sel?'rgba(0,245,212,.4)':'rgba(255,255,255,.07)',color:sel?'#00f5d4':'#6b87a8'}}>{sel&&<Check size={10}/>}{m.name.split(' ')[0]}</button>);})}</div></div>
        <button onClick={submit} className="btn-primary" style={{justifyContent:'center'}} disabled={loading}>{loading?<><span className="spin-anim"/>Creating...</>:<><Plus size={13}/>Create Project</>}</button>
      </div>
    </div></div>
  );
};

/* ── Add Task Modal ── */
const AddTaskModal=({members,projectId,setTasks,close,addToast})=>{
  const [f,setF]=useState({title:'',desc:'',assignee:'',status:'todo',priority:'medium',dueDate:''});
  const [loading,setLoading]=useState(false);
  const submit=async()=>{
    if(!f.title.trim()){addToast('Task title is required','error');return;}
    setLoading(true);
    try{
      const data=await apiFetch('/tasks',{method:'POST',body:JSON.stringify({title:f.title.trim(),description:f.desc.trim(),project:projectId,assignee:f.assignee||undefined,status:f.status,priority:f.priority,dueDate:f.dueDate||undefined})});
      setTasks(prev=>[...prev,{...data.task,pid:projectId}]);
      addToast('Task added successfully!','success');close();
    }catch(e){addToast(e.message||'Failed to create task','error');}
    setLoading(false);
  };
  return(
    <div className="modal-overlay" onClick={close}><div className="modal" onClick={e=>e.stopPropagation()}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:22}}><div style={{fontFamily:'Orbitron,monospace',fontWeight:700,fontSize:15,color:'#dde6f0'}}>Add Task</div><button onClick={close} style={{background:'none',border:'none',cursor:'pointer',color:'#6b87a8'}}><X size={17}/></button></div>
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        <div><label className="label">Title *</label><input className="input" placeholder="What needs to be done?" value={f.title} onChange={e=>setF(v=>({...v,title:e.target.value}))}/></div>
        <div><label className="label">Description</label><textarea className="input" rows={2} placeholder="Details..." value={f.desc} onChange={e=>setF(v=>({...v,desc:e.target.value}))} style={{resize:'vertical'}}/></div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div><label className="label">Assign To</label><select className="input" value={f.assignee} onChange={e=>setF(v=>({...v,assignee:e.target.value}))}><option value="">Unassigned</option>{members.map(m=><option key={m._id||m.id} value={m._id||m.id}>{m.name}</option>)}</select></div>
          <div><label className="label">Priority</label><select className="input" value={f.priority} onChange={e=>setF(v=>({...v,priority:e.target.value}))}><option value="critical">🔴 Critical</option><option value="high">🟠 High</option><option value="medium">🔵 Medium</option><option value="low">⚪ Low</option></select></div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div><label className="label">Status</label><select className="input" value={f.status} onChange={e=>setF(v=>({...v,status:e.target.value}))}><option value="todo">To Do</option><option value="inprogress">In Progress</option><option value="done">Done</option></select></div>
          <div><label className="label">Due Date</label><input className="input" type="date" value={f.dueDate} onChange={e=>setF(v=>({...v,dueDate:e.target.value}))}/></div>
        </div>
        <button onClick={submit} className="btn-primary" style={{justifyContent:'center'}} disabled={loading}>{loading?<><span className="spin-anim"/>Adding...</>:<><Plus size={13}/>Add Task</>}</button>
      </div>
    </div></div>
  );
};

/* ── Login Modal ── */
const LoginModal=({close,setAuth,addToast})=>{
  const [creds,setCreds]=useState({email:'',pass:''});
  const [err,setErr]=useState('');
  const [loading,setLoading]=useState(false);
  const [showPass,setShowPass]=useState(false);
  const login=useCallback(async()=>{
    setErr('');
    if(!creds.email||!creds.pass){setErr('Please enter email and password');return;}
    setLoading(true);
    try{
      const res=await fetch(`${API_BASE}/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:creds.email,password:creds.pass})});
      const data=await res.json();
      if(!res.ok)throw new Error(data.error||'Login failed');
      localStorage.setItem('ll_token',data.token);
      setAuth(data.member);
      addToast(`Welcome back, ${data.member.name.split(' ')[0]}!`,'success');
      close();
    }catch(e){setErr(e.message||'Invalid credentials');}
    setLoading(false);
  },[creds,setAuth,addToast,close]);
  return(
    <div className="modal-overlay" onClick={close}><div className="modal" style={{maxWidth:400}} onClick={e=>e.stopPropagation()}>
      <div style={{textAlign:'center',marginBottom:26}}>
        <div style={{width:50,height:50,borderRadius:13,background:'linear-gradient(135deg,#00f5d4,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px'}}><Zap size={20} color="#030b1a" strokeWidth={2.5}/></div>
        <div style={{fontFamily:'Orbitron,monospace',fontWeight:700,fontSize:17,color:'#dde6f0'}}>LogicLords Login</div>
        <div style={{fontSize:11,color:'#4a6080',marginTop:3}}>Sign in to access all features</div>
      </div>
      {err&&<div style={{background:'rgba(239,68,68,.07)',border:'1px solid rgba(239,68,68,.18)',borderRadius:7,padding:'9px 13px',marginBottom:14,fontSize:12,color:'#f87171'}}>{err}</div>}
      <div style={{display:'flex',flexDirection:'column',gap:13,marginBottom:18}}>
        <div><label className="label">Email</label><input className="input" type="email" placeholder="your@email.com" value={creds.email} onChange={e=>setCreds(c=>({...c,email:e.target.value}))}/></div>
        <div><label className="label">Password</label>
          <div style={{position:'relative'}}>
            <input className="input" type={showPass?'text':'password'} placeholder="Your password" value={creds.pass} onChange={e=>setCreds(c=>({...c,pass:e.target.value}))} onKeyDown={e=>e.key==='Enter'&&login()} style={{paddingRight:40}}/>
            <button onClick={()=>setShowPass(o=>!o)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#4a6080',display:'flex'}}>{showPass?<EyeOff size={14}/>:<Eye size={14}/>}</button>
          </div>
        </div>
      </div>
      <button onClick={login} className="btn-primary" style={{width:'100%',justifyContent:'center',padding:'12px'}} disabled={loading}>
        {loading?<><span className="spin-anim"/>Signing in...</>:<><LogIn size={13}/>Login</>}
      </button>
    </div></div>
  );
};

/* ── Footer ── */
const Footer=({setPage})=>(
  <footer style={{background:'rgba(2,6,18,.98)',borderTop:'1px solid rgba(255,255,255,.04)',padding:'36px 24px'}}>
    <div style={{maxWidth:1100,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
      <div style={{display:'flex',alignItems:'center',gap:9}}><div style={{width:24,height:24,borderRadius:6,background:'linear-gradient(135deg,#00f5d4,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center'}}><Zap size={12} color="#030b1a" strokeWidth={2.5}/></div><span style={{fontFamily:'Orbitron,monospace',fontSize:12,fontWeight:700,color:'#00f5d4'}}>LogicLords</span></div>
      <span style={{fontSize:11,color:'#4a6080',fontFamily:'Fira Code,monospace'}}>© 2025 LogicLords · Where Logic Meets Innovation</span>
      <div style={{display:'flex',gap:14}}>{['home','team','projects','achievements','management'].map(p=>(<button key={p} onClick={()=>setPage(p)} style={{background:'none',border:'none',cursor:'pointer',color:'#4a6080',fontSize:11,fontFamily:'Outfit,sans-serif',textTransform:'capitalize',transition:'color .2s'}} onMouseEnter={e=>e.target.style.color='#00f5d4'} onMouseLeave={e=>e.target.style.color='#4a6080'}>{p}</button>))}</div>
    </div>
  </footer>
);


/* ══════════════════════════════════════════════════
   EMAIL VERIFY PAGE
══════════════════════════════════════════════════ */
const EmailVerifyPage=({addToast})=>{
  const [status,setStatus]=useState('loading'); // loading | success | error | resend
  const [msg,setMsg]=useState('');
  const [resendEmail,setResendEmail]=useState('');
  const [resending,setResending]=useState(false);

  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    const token=params.get('token');
    if(!token){setStatus('resend');return;}
    apiFetch(`/auth/verify?token=${token}`)
      .then(d=>{setStatus('success');setMsg(d.message||'Email verified!');})
      .catch(e=>{setStatus('error');setMsg(e.message||'Invalid or expired link.');});
  },[]);

  const resend=async()=>{
    if(!resendEmail.trim()){addToast('Enter your email','error');return;}
    setResending(true);
    try{
      const d=await apiFetch('/auth/resend-verification',{method:'POST',body:JSON.stringify({email:resendEmail.trim()})});
      addToast(d.message||'Verification email sent!','success');
      setResendEmail('');
    }catch(e){addToast(e.message||'Failed to resend','error');}
    setResending(false);
  };

  return(
    <div style={{paddingTop:120,paddingBottom:80,minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{maxWidth:480,width:'100%',padding:'0 24px'}}>
        <div className="card" style={{padding:'40px 32px',textAlign:'center',border:'1px solid rgba(0,245,212,.12)'}}>
          {status==='loading'&&(
            <>
              <div style={{width:44,height:44,borderRadius:'50%',border:'3px solid rgba(0,245,212,.2)',borderTopColor:'#00f5d4',animation:'spin .8s linear infinite',margin:'0 auto 20px'}}/>
              <p style={{color:'#6b87a8'}}>Verifying your email...</p>
            </>
          )}
          {status==='success'&&(
            <>
              <div style={{fontSize:56,marginBottom:16}}>✅</div>
              <div style={{fontFamily:'Orbitron,monospace',fontSize:20,fontWeight:700,color:'#10b981',marginBottom:12}}>Email Verified!</div>
              <p style={{color:'#6b87a8',fontSize:13,lineHeight:1.7,marginBottom:24}}>{msg}</p>
              <div style={{background:'rgba(251,191,36,.06)',border:'1px solid rgba(251,191,36,.2)',borderRadius:10,padding:'16px',marginBottom:20}}>
                <p style={{color:'#fbbf24',fontSize:12,fontWeight:600,marginBottom:6}}>⏳ Pending Admin Approval</p>
                <p style={{color:'#6b87a8',fontSize:12,lineHeight:1.6}}>Your application is now in the queue. The admin will review it and you will receive an email once approved.</p>
              </div>
            </>
          )}
          {status==='error'&&(
            <>
              <div style={{fontSize:56,marginBottom:16}}>❌</div>
              <div style={{fontFamily:'Orbitron,monospace',fontSize:18,fontWeight:700,color:'#f87171',marginBottom:12}}>Verification Failed</div>
              <p style={{color:'#6b87a8',fontSize:13,marginBottom:24}}>{msg}</p>
              <p style={{color:'#4a6080',fontSize:12,marginBottom:16}}>Request a new verification link below:</p>
              <div style={{display:'flex',gap:8}}>
                <input className="input" placeholder="your@email.com" value={resendEmail} onChange={e=>setResendEmail(e.target.value)}/>
                <button onClick={resend} className="btn-primary" style={{padding:'11px 16px',fontSize:11,flexShrink:0}} disabled={resending}>
                  {resending?<span className="spin-anim"/>:'Send'}
                </button>
              </div>
            </>
          )}
          {status==='resend'&&(
            <>
              <div style={{fontSize:56,marginBottom:16}}>📧</div>
              <div style={{fontFamily:'Orbitron,monospace',fontSize:18,fontWeight:700,color:'#fbbf24',marginBottom:12}}>Resend Verification</div>
              <p style={{color:'#6b87a8',fontSize:13,marginBottom:20}}>Enter your email to get a new verification link.</p>
              <div style={{display:'flex',gap:8}}>
                <input className="input" placeholder="your@email.com" value={resendEmail} onChange={e=>setResendEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&resend()}/>
                <button onClick={resend} className="btn-primary" style={{padding:'11px 16px',fontSize:11,flexShrink:0}} disabled={resending}>
                  {resending?<span className="spin-anim"/>:'Send'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   ADMIN APPROVAL PANEL
   Shows pending applications for admin to approve/reject
══════════════════════════════════════════════════ */
const AdminApprovalPanel=({auth,addToast,setMembers})=>{
  const [pending,setPending]=useState([]);
  const [loading,setLoading]=useState(true);
  const [rejectModal,setRejectModal]=useState(null);
  const [rejectReason,setRejectReason]=useState('');
  const [processing,setProcessing]=useState(null);

  const loadPending=useCallback(async()=>{
    try{
      const data=await apiFetch('/members/pending');
      setPending(data.members||[]);
    }catch(e){addToast('Could not load pending applications','error');}
    setLoading(false);
  },[addToast]);

  useEffect(()=>{loadPending();},[loadPending]);

  // Real-time: listen for new registrations
  useEffect(()=>{
    import('socket.io-client').then(({io})=>{
      const token=localStorage.getItem('ll_token');
      if(!token)return;
      const socket=io(SOCK_URL,{auth:{token},transports:['websocket','polling']});
      socket.on('new_registration',()=>{
        loadPending();
        addToast('New registration request received!','info');
      });
      socket.on('member_approved',()=>loadPending());
      return()=>socket.disconnect();
    }).catch(()=>{});
  },[loadPending,addToast]);

  const approve=async(id,name)=>{
    setProcessing(id);
    try{
      await apiFetch(`/members/${id}/approve`,{method:'PATCH'});
      setPending(prev=>prev.filter(m=>m._id!==id));
      addToast(`✅ ${name} approved! Approval email sent.`,'success');
      // Refresh global members list
      try{const d=await apiFetch('/members');setMembers(d.members||[]);}catch(e){}
    }catch(e){addToast(e.message||'Approval failed','error');}
    setProcessing(null);
  };

  const reject=async()=>{
    if(!rejectModal)return;
    setProcessing(rejectModal._id);
    try{
      await apiFetch(`/members/${rejectModal._id}/reject`,{method:'PATCH',body:JSON.stringify({reason:rejectReason.trim()})});
      setPending(prev=>prev.filter(m=>m._id!==rejectModal._id));
      addToast(`${rejectModal.name}'s application rejected.`,'info');
      setRejectModal(null);setRejectReason('');
    }catch(e){addToast(e.message||'Rejection failed','error');}
    setProcessing(null);
  };

  if(!auth?.isAdmin)return(
    <div style={{textAlign:'center',padding:'60px 0',color:'#4a6080'}}>
      <Shield size={32} style={{marginBottom:12,opacity:.25}}/>
      <p>Admin access required.</p>
    </div>
  );

  return(
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20,flexWrap:'wrap',gap:12}}>
        <div>
          <div style={{fontFamily:'Fira Code,monospace',fontSize:10,color:'#fbbf24',letterSpacing:3,marginBottom:4}}>// ADMIN PANEL</div>
          <h3 style={{fontFamily:'Orbitron,monospace',fontWeight:700,fontSize:18,color:'#dde6f0'}}>Pending Applications</h3>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          {pending.length>0&&<span style={{background:'rgba(251,191,36,.12)',border:'1px solid rgba(251,191,36,.25)',color:'#fbbf24',padding:'4px 12px',borderRadius:999,fontSize:12,fontWeight:700}}>{pending.length} pending</span>}
          <button onClick={loadPending} style={{background:'transparent',border:'1px solid rgba(255,255,255,.08)',borderRadius:7,padding:'7px 12px',cursor:'pointer',color:'#6b87a8',display:'flex',alignItems:'center',gap:5,fontSize:11,fontFamily:'Outfit,sans-serif'}}><RefreshCw size={11}/>Refresh</button>
        </div>
      </div>

      {loading?(
        <div style={{textAlign:'center',padding:'40px 0'}}><div style={{width:32,height:32,borderRadius:'50%',border:'2px solid rgba(0,245,212,.2)',borderTopColor:'#00f5d4',animation:'spin .8s linear infinite',margin:'0 auto'}}/></div>
      ):pending.length===0?(
        <div style={{textAlign:'center',padding:'60px 0',color:'#4a6080',background:'rgba(0,245,212,.02)',border:'1px dashed rgba(0,245,212,.1)',borderRadius:12}}>
          <Check size={32} style={{marginBottom:12,opacity:.3,color:'#10b981'}}/>
          <p style={{fontSize:13}}>No pending applications. All caught up! ✅</p>
        </div>
      ):(
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {pending.map(m=>(
            <div key={m._id} className="card" style={{padding:20,borderColor:'rgba(251,191,36,.15)'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:14}}>
                {/* Member info */}
                <div style={{display:'flex',alignItems:'center',gap:14,flex:1,minWidth:200}}>
                  <Av name={m.name} size={46} src={m.avatar}/>
                  <div>
                    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:5,flexWrap:'wrap'}}>
                      <span style={{fontSize:14,fontWeight:700,color:'#dde6f0'}}>{m.name}</span>
                      <RoleBadge role={m.role}/>
                      {m.isEmailVerified
                        ? <span style={{fontSize:10,color:'#10b981',background:'rgba(16,185,129,.1)',padding:'2px 7px',borderRadius:4,fontWeight:600}}>✅ Email Verified</span>
                        : <span style={{fontSize:10,color:'#f87171',background:'rgba(239,68,68,.1)',padding:'2px 7px',borderRadius:4,fontWeight:600}}>⚠️ Email Not Verified</span>
                      }
                    </div>
                    <div style={{fontSize:11,color:'#4a6080',fontFamily:'Fira Code,monospace',marginBottom:4}}>{m.email}</div>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                      {(m.skills||[]).slice(0,4).map(s=><span key={s} style={{fontSize:9,color:'#6b87a8',background:'rgba(0,245,212,.05)',border:'1px solid rgba(0,245,212,.1)',padding:'1px 6px',borderRadius:3,fontFamily:'Fira Code,monospace'}}>{s}</span>)}
                    </div>
                    {m.bio&&<p style={{fontSize:11,color:'#6b87a8',marginTop:5,lineHeight:1.5,maxWidth:400}}>{m.bio}</p>}
                    <div style={{fontSize:10,color:'#4a6080',marginTop:5,fontFamily:'Fira Code,monospace'}}>
                      Applied: {new Date(m.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{display:'flex',gap:9,alignItems:'center',flexShrink:0}}>
                  {m.github&&<a href={m.github} target="_blank" rel="noreferrer" className="btn-sm" style={{background:'transparent',borderColor:'rgba(255,255,255,.1)',color:'#6b87a8',textDecoration:'none'}}><Github size={11}/>Profile</a>}
                  <button
                    onClick={()=>{setRejectModal(m);setRejectReason('');}}
                    className="btn-sm"
                    style={{background:'rgba(239,68,68,.08)',borderColor:'rgba(239,68,68,.25)',color:'#f87171'}}
                    disabled={processing===m._id}
                  >
                    <X size={11}/>Reject
                  </button>
                  <button
                    onClick={()=>approve(m._id,m.name)}
                    className="btn-sm"
                    style={{background:'rgba(16,185,129,.1)',borderColor:'rgba(16,185,129,.3)',color:'#10b981'}}
                    disabled={processing===m._id}
                  >
                    {processing===m._id?<span className="spin-anim"/>:<Check size={11}/>}
                    Approve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {rejectModal&&(
        <div className="modal-overlay" onClick={()=>setRejectModal(null)}>
          <div className="modal" style={{maxWidth:420}} onClick={e=>e.stopPropagation()}>
            <div style={{marginBottom:20}}>
              <div style={{fontFamily:'Orbitron,monospace',fontWeight:700,fontSize:15,color:'#f87171',marginBottom:6}}>Reject Application</div>
              <p style={{fontSize:13,color:'#6b87a8'}}>Rejecting <strong style={{color:'#dde6f0'}}>{rejectModal.name}</strong>'s application. A rejection email will be sent to them.</p>
            </div>
            <div style={{marginBottom:16}}>
              <label className="label">Reason (optional)</label>
              <textarea className="input" rows={3} placeholder="e.g. We are not looking for this role at the moment..." value={rejectReason} onChange={e=>setRejectReason(e.target.value)} style={{resize:'vertical'}}/>
            </div>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setRejectModal(null)} className="btn-outline" style={{flex:1,justifyContent:'center',padding:'10px'}}>Cancel</button>
              <button onClick={reject} style={{flex:1,padding:'10px',background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.28)',color:'#f87171',borderRadius:8,cursor:'pointer',fontFamily:'Outfit,sans-serif',fontSize:12,fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center',gap:6}} disabled={processing===rejectModal._id}>
                {processing===rejectModal._id?<span className="spin-anim"/>:<X size={12}/>}Reject & Notify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════════════ */
export default function App(){
  const [page,setPage]           = useState('home');
  const [members,setMembers]     = useState([]);
  const [projects,setProjects]   = useState([]);
  const [tasks,setTasks]         = useState([]);
  const [auth,setAuth]           = useState(null);
  const [showLogin,setShowLogin] = useState(false);
  const [toasts,setToasts]       = useState([]);
  const [loading,setLoading]     = useState(true);

  const addToast=useCallback((msg,type='success')=>{
    const id=Date.now();
    setToasts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),4200);
  },[]);
  const rmToast=useCallback(id=>setToasts(p=>p.filter(t=>t.id!==id)),[]);

  const fetchAll=useCallback(async()=>{
    setLoading(true);
    try{
      const [mRes,pRes,tRes]=await Promise.all([
        fetch(`${API_BASE}/members`),
        fetch(`${API_BASE}/projects`),
        fetch(`${API_BASE}/tasks`),
      ]);
      const [mData,pData,tData]=await Promise.all([mRes.json(),pRes.json(),tRes.json()]);
      setMembers(mData.members||[]);
      setProjects(pData.projects||[]);
      setTasks(tData.tasks||[]);
    }catch(e){addToast('Could not connect to backend','error');}
    setLoading(false);
  },[addToast]);

  useEffect(()=>{
    const token=localStorage.getItem('ll_token');
    if(token){
      fetch(`${API_BASE}/auth/me`,{headers:{Authorization:`Bearer ${token}`}})
        .then(r=>r.json())
        .then(d=>{if(d.member)setAuth(d.member);else localStorage.removeItem('ll_token');})
        .catch(()=>localStorage.removeItem('ll_token'));
    }
    fetchAll();

    /* ── Real-time GitHub updates via Socket.io ── */
    import('socket.io-client').then(({io})=>{
      const token=localStorage.getItem('ll_token');
      if(!token)return;
      const socket=io(SOCK_URL,{auth:{token},transports:['websocket','polling']});

      /* GitHub webhook triggered update */
      socket.on('project_github_updated',(data)=>{
        setProjects(prev=>prev.map(p=>{
          if(String(p._id||p.id)===String(data.projectId)){
            return{
              ...p,
              githubData:     data.githubData,
              githubProgress: data.githubProgress,
              status:         data.status||p.status,
              recentActivity: data.recentActivity||p.recentActivity,
            };
          }
          return p;
        }));
        if(data.activity?.type==='merged'){
          addToast(`🎉 PR Merged: ${data.activity.title||''}`, 'success');
        } else if(data.activity?.type==='push'){
          addToast(`📦 New push by ${data.activity.author||'someone'}`, 'info');
        }
      });

      /* Also refresh tasks when github updates (PRs may close tasks) */
      socket.on('project_github_updated',async()=>{
        try{
          const res=await fetch(`${API_BASE}/tasks`);
          const d=await res.json();
          setTasks(d.tasks||[]);
        }catch(e){}
      });

      return()=>socket.disconnect();
    }).catch(()=>{});
  },[fetchAll]);

  useEffect(()=>{window.scrollTo({top:0,behavior:'smooth'});},[page]);

  // Handle /verify URL on page load
  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    if(params.get('token'))setPage('verify');
    // Handle admin approve/reject from email link
    const action=params.get('action');
    const id=params.get('id');
    if(action&&id&&auth?.isAdmin){setPage('management');}
  },[auth]);

  const refreshMembers=useCallback(async()=>{
    try{const d=await apiFetch('/members');setMembers(d.members||[]);}catch(e){}
  },[]);

  const pages={
    home:         <HomePage     setPage={setPage} members={members} projects={projects}/>,
    team:         <TeamPage     members={members} loading={loading}/>,
    register:     <RegisterPage refreshMembers={refreshMembers} addToast={addToast}/>,
    achievements: <AchievementsPage/>,
    projects:     <ProjectsPage projects={projects} loading={loading}/>,
    management:   <ManagementPage projects={projects} setProjects={setProjects} tasks={tasks} setTasks={setTasks} members={members} auth={auth} addToast={addToast} setMembers={setMembers}/>,
    verify:       <EmailVerifyPage addToast={addToast}/>,
  };

  return(
    <>
      <style>{STYLES}</style>
      <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
        <Nav page={page} setPage={setPage} auth={auth} setAuth={setAuth} setShowLogin={setShowLogin}/>
        <main style={{flex:1}}>{pages[page]||pages.home}</main>
        <Footer setPage={setPage}/>
      </div>
      {showLogin&&<LoginModal close={()=>setShowLogin(false)} setAuth={setAuth} addToast={addToast}/>}
      <ToastCtx toasts={toasts} remove={rmToast}/>
    </>
  );
}
