/* ══════════════════════════════════════════════════
   CHAT COMPONENT — Real-time Team Chat
   Uses Socket.io for live messaging
══════════════════════════════════════════════════ */

/* Add this to your package.json dependencies:
   "socket.io-client": "^4.7.5"
   Then run: npm install
*/

import { useState, useEffect, useRef, useCallback } from 'react';
import { Send, X, Trash2, Users, Circle, MessageSquare, Hash } from 'lucide-react';

const API_BASE  = 'https://logiclords-backend.onrender.com/api';
const SOCK_URL  = 'https://logiclords-backend.onrender.com';

/* ── Role badge colors ── */
const RC = {
  'Frontend':   '#818cf8',
  'Backend':    '#34d399',
  'AI/ML':      '#fbbf24',
  'Designer':   '#f472b6',
  'DevOps':     '#00f5d4',
  'Full Stack': '#f87171',
  'Mobile':     '#c084fc',
};

const AVC = ['#6366f1','#ec4899','#f59e0b','#10b981','#00f5d4','#f87171','#8b5cf6','#c084fc'];
const getAC = n => { let h=0; for(let c of n||'?') h=c.charCodeAt(0)+((h<<5)-h); return AVC[Math.abs(h)%AVC.length]; };
const initls = n => (n||'??').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);

const Av = ({ name='?', size=32, src=null }) => {
  const c = getAC(name);
  if (src) return <img src={src} alt={name} style={{width:size,height:size,borderRadius:'50%',objectFit:'cover',border:`2px solid ${c}40`,flexShrink:0}}/>;
  return (
    <div style={{width:size,height:size,borderRadius:'50%',background:`${c}18`,border:`2px solid ${c}35`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:size*.33,fontWeight:700,color:c,fontFamily:'Orbitron,monospace',flexShrink:0,letterSpacing:'-1px'}}>
      {initls(name)}
    </div>
  );
};

const formatTime = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000) return 'just now';
  if (diff < 3600000) return `${Math.floor(diff/60000)}m ago`;
  if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'});
  return d.toLocaleDateString('en-IN', {day:'numeric',month:'short'}) + ' ' + d.toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'});
};

export default function ChatView({ auth, addToast }) {
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

  /* ── Load message history ── */
  const loadHistory = useCallback(async () => {
    if (!auth) return;
    try {
      const token = localStorage.getItem('ll_token');
      const res   = await fetch(`${API_BASE}/chat/messages?room=general&limit=60`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (e) {
      addToast('Could not load chat history', 'error');
    } finally {
      setLoading(false);
    }
  }, [auth, addToast]);

  /* ── Init Socket.io ── */
  useEffect(() => {
    if (!auth) { setLoading(false); return; }

    loadHistory();

    /* Dynamic import socket.io-client */
    import('socket.io-client').then(({ io }) => {
      const token  = localStorage.getItem('ll_token');
      const socket = io(SOCK_URL, {
        auth:      { token },
        transports: ['websocket', 'polling'],
      });

      socket.on('connect', () => {
        setConnected(true);
        console.log('Chat connected!');
      });

      socket.on('disconnect', () => setConnected(false));

      socket.on('new_message', (msg) => {
        setMessages(prev => {
          if (prev.find(m => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
      });

      socket.on('message_deleted', ({ messageId }) => {
        setMessages(prev => prev.filter(m => m._id !== messageId));
      });

      socket.on('online_users', (users) => setOnlineUsers(users));

      socket.on('user_typing', ({ name, isTyping: typing }) => {
        setTypingUsers(prev => {
          if (typing) return prev.includes(name) ? prev : [...prev, name];
          return prev.filter(u => u !== name);
        });
      });

      socket.on('user_joined', ({ user }) => {
        setMessages(prev => [...prev, {
          _id:       `sys-${Date.now()}`,
          type:      'system',
          text:      `${user.name} joined the chat`,
          createdAt: new Date(),
        }]);
      });

      socket.on('user_left', ({ user }) => {
        setMessages(prev => [...prev, {
          _id:       `sys-${Date.now()}-left`,
          type:      'system',
          text:      `${user.name} left the chat`,
          createdAt: new Date(),
        }]);
      });

      socketRef.current = socket;
    }).catch(() => addToast('Chat connection failed', 'error'));

    return () => {
      socketRef.current?.disconnect();
    };
  }, [auth, loadHistory, addToast]);

  /* ── Auto scroll ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* ── Send message ── */
  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text || !socketRef.current?.connected) return;

    socketRef.current.emit('send_message', { text, room: 'general' });
    setInput('');
    stopTyping();
  }, [input]);

  /* ── Typing indicators ── */
  const startTyping = () => {
    if (!isTyping.current) {
      isTyping.current = true;
      socketRef.current?.emit('typing_start', { room: 'general' });
    }
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(stopTyping, 2000);
  };

  const stopTyping = () => {
    if (isTyping.current) {
      isTyping.current = false;
      socketRef.current?.emit('typing_stop', { room: 'general' });
    }
    clearTimeout(typingTimer.current);
  };

  /* ── Delete message ── */
  const deleteMsg = (messageId) => {
    socketRef.current?.emit('delete_message', { messageId, room: 'general' });
  };

  /* ── Handle input key ── */
  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    else startTyping();
  };

  /* ── Not logged in ── */
  if (!auth) {
    return (
      <div style={{textAlign:'center',padding:'80px 20px',color:'#4a6080'}}>
        <MessageSquare size={40} style={{marginBottom:14,opacity:.2}}/>
        <p style={{fontSize:14,marginBottom:8}}>Login to access Team Chat</p>
        <p style={{fontSize:12,opacity:.6}}>Real-time messaging for all team members</p>
      </div>
    );
  }

  return (
    <div style={{display:'grid',gridTemplateColumns:showOnline?'1fr 220px':'1fr',gap:16,height:'70vh',minHeight:500}}>

      {/* ── Main Chat Panel ── */}
      <div style={{display:'flex',flexDirection:'column',background:'rgba(4,10,28,.8)',border:'1px solid rgba(255,255,255,.07)',borderRadius:14,overflow:'hidden'}}>

        {/* Chat header */}
        <div style={{padding:'14px 18px',borderBottom:'1px solid rgba(255,255,255,.06)',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(0,0,0,.2)'}}>
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
            {/* Connection status */}
            <div style={{display:'flex',alignItems:'center',gap:5}}>
              <div style={{width:7,height:7,borderRadius:'50%',background:connected?'#10b981':'#f87171',boxShadow:connected?'0 0 6px #10b981':'none'}}/>
              <span style={{fontSize:10,color:connected?'#10b981':'#f87171',fontFamily:'Fira Code,monospace'}}>
                {connected ? 'Live' : 'Offline'}
              </span>
            </div>
            {/* Toggle online panel */}
            <button onClick={()=>setShowOnline(o=>!o)} style={{background:'rgba(0,245,212,.07)',border:'1px solid rgba(0,245,212,.15)',borderRadius:6,padding:'5px 10px',cursor:'pointer',color:'#00f5d4',fontSize:10,fontFamily:'Outfit,sans-serif',display:'flex',alignItems:'center',gap:5}}>
              <Users size={11}/>{onlineUsers.length} online
            </button>
          </div>
        </div>

        {/* Messages */}
        <div style={{flex:1,overflowY:'auto',padding:'16px',display:'flex',flexDirection:'column',gap:2}}>
          {loading ? (
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',flex:1,color:'#4a6080',fontSize:12}}>
              <div style={{width:24,height:24,borderRadius:'50%',border:'2px solid rgba(0,245,212,.2)',borderTopColor:'#00f5d4',animation:'spin .8s linear infinite',marginRight:10}}/>
              Loading messages...
            </div>
          ) : messages.length === 0 ? (
            <div style={{textAlign:'center',margin:'auto',color:'#4a6080'}}>
              <MessageSquare size={32} style={{marginBottom:10,opacity:.2}}/>
              <p style={{fontSize:13}}>No messages yet. Say hello! 👋</p>
            </div>
          ) : (
            messages.map((msg, idx) => {
              /* System message */
              if (msg.type === 'system') {
                return (
                  <div key={msg._id} style={{textAlign:'center',margin:'8px 0'}}>
                    <span style={{fontSize:10,color:'#4a6080',background:'rgba(255,255,255,.03)',padding:'3px 12px',borderRadius:999,fontFamily:'Fira Code,monospace'}}>
                      {msg.text}
                    </span>
                  </div>
                );
              }

              const isMe     = String(msg.sender?._id) === String(auth._id);
              const prevMsg  = messages[idx - 1];
              const sameSender = prevMsg && prevMsg.type !== 'system' && String(prevMsg.sender?._id) === String(msg.sender?._id);
              const showAvatar = !sameSender;

              return (
                <div key={msg._id} style={{display:'flex',gap:9,alignItems:'flex-end',flexDirection:isMe?'row-reverse':'row',marginTop:sameSender?2:10}}>
                  {/* Avatar */}
                  <div style={{width:32,flexShrink:0,marginBottom:2}}>
                    {showAvatar && <Av name={msg.sender?.name||'?'} size={30} src={msg.sender?.avatar}/>}
                  </div>
                  {/* Bubble */}
                  <div style={{maxWidth:'68%',position:'relative'}} className="msg-group">
                    {showAvatar && !isMe && (
                      <div style={{fontSize:10,color:RC[msg.sender?.role]||'#6b87a8',marginBottom:3,fontWeight:600,paddingLeft:4}}>
                        {msg.sender?.name}
                        {msg.sender?.isAdmin && <span style={{marginLeft:5,fontSize:9,background:'rgba(0,245,212,.1)',color:'#00f5d4',padding:'1px 5px',borderRadius:3}}>admin</span>}
                      </div>
                    )}
                    <div style={{
                      background: isMe ? 'linear-gradient(135deg,rgba(0,245,212,.18),rgba(59,130,246,.18))' : 'rgba(255,255,255,.05)',
                      border: isMe ? '1px solid rgba(0,245,212,.2)' : '1px solid rgba(255,255,255,.06)',
                      borderRadius: isMe ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
                      padding:'10px 14px',
                      position:'relative',
                      wordBreak:'break-word',
                    }}>
                      <p style={{fontSize:13,color:'#dde6f0',lineHeight:1.5,whiteSpace:'pre-wrap'}}>{msg.text}</p>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',gap:8,marginTop:4}}>
                        <span style={{fontSize:9,color:'#4a6080',fontFamily:'Fira Code,monospace'}}>{formatTime(msg.createdAt)}</span>
                        {(isMe || auth?.isAdmin) && (
                          <button onClick={()=>deleteMsg(msg._id)} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(248,113,113,.3)',padding:0,display:'flex',transition:'color .2s'}} onMouseEnter={e=>e.currentTarget.style.color='#f87171'} onMouseLeave={e=>e.currentTarget.style.color='rgba(248,113,113,.3)'}>
                            <Trash2 size={10}/>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Typing indicator */}
          {typingUsers.length > 0 && (
            <div style={{display:'flex',alignItems:'center',gap:8,padding:'4px 0',marginTop:4}}>
              <div style={{display:'flex',gap:3,alignItems:'center'}}>
                {[0,1,2].map(i=>(
                  <div key={i} style={{width:6,height:6,borderRadius:'50%',background:'#00f5d4',animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite`}}/>
                ))}
              </div>
              <span style={{fontSize:11,color:'#4a6080',fontFamily:'Fira Code,monospace'}}>
                {typingUsers.join(', ')} {typingUsers.length===1?'is':'are'} typing...
              </span>
            </div>
          )}

          <div ref={bottomRef}/>
        </div>

        {/* Input area */}
        <div style={{padding:'12px 16px',borderTop:'1px solid rgba(255,255,255,.06)',background:'rgba(0,0,0,.15)'}}>
          <div style={{display:'flex',gap:10,alignItems:'flex-end'}}>
            <Av name={auth.name} size={32} src={auth.avatar}/>
            <div style={{flex:1,position:'relative'}}>
              <textarea
                value={input}
                onChange={e=>setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message... (Enter to send)"
                rows={1}
                style={{
                  width:'100%',background:'rgba(4,10,28,.9)',border:'1px solid rgba(255,255,255,.08)',
                  color:'#dde6f0',padding:'10px 14px',borderRadius:10,fontFamily:'Outfit,sans-serif',
                  fontSize:13,outline:'none',resize:'none',lineHeight:1.5,
                  transition:'border-color .3s',maxHeight:120,
                }}
                onFocus={e=>e.target.style.borderColor='#00f5d4'}
                onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.08)'}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || !connected}
              style={{
                width:40,height:40,borderRadius:10,flexShrink:0,
                background:input.trim()&&connected?'linear-gradient(135deg,#00f5d4,#3b82f6)':'rgba(255,255,255,.05)',
                border:'none',cursor:input.trim()&&connected?'pointer':'not-allowed',
                display:'flex',alignItems:'center',justifyContent:'center',transition:'all .2s',
              }}
            >
              <Send size={15} color={input.trim()&&connected?'#030b1a':'#4a6080'}/>
            </button>
          </div>
          <div style={{marginTop:6,paddingLeft:42}}>
            <span style={{fontSize:10,color:'#2d4060',fontFamily:'Fira Code,monospace'}}>
              Enter to send · Shift+Enter for new line
            </span>
          </div>
        </div>
      </div>

      {/* ── Online Users Panel ── */}
      {showOnline && (
        <div style={{background:'rgba(4,10,28,.8)',border:'1px solid rgba(255,255,255,.07)',borderRadius:14,overflow:'hidden',display:'flex',flexDirection:'column'}}>
          <div style={{padding:'14px 16px',borderBottom:'1px solid rgba(255,255,255,.06)',background:'rgba(0,0,0,.2)'}}>
            <div style={{fontSize:11,fontWeight:700,color:'#00f5d4',fontFamily:'Fira Code,monospace',letterSpacing:2,textTransform:'uppercase'}}>
              Online — {onlineUsers.length}
            </div>
          </div>
          <div style={{flex:1,overflowY:'auto',padding:'10px 12px',display:'flex',flexDirection:'column',gap:6}}>
            {onlineUsers.length === 0 ? (
              <div style={{textAlign:'center',padding:'20px 0',color:'#4a6080',fontSize:12}}>No one online</div>
            ) : (
              onlineUsers.map((u,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 8px',borderRadius:8,background:'rgba(0,245,212,.03)',border:'1px solid rgba(0,245,212,.06)'}}>
                  <div style={{position:'relative',flexShrink:0}}>
                    <Av name={u.name} size={28} src={u.avatar}/>
                    <div style={{position:'absolute',bottom:0,right:0,width:8,height:8,borderRadius:'50%',background:'#10b981',border:'2px solid #040a1c'}}/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:11,fontWeight:600,color:'#dde6f0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                      {u.name.split(' ')[0]}
                      {u.isAdmin && <span style={{marginLeft:4,fontSize:8,color:'#00f5d4'}}>★</span>}
                    </div>
                    <div style={{fontSize:9,color:RC[u.role]||'#6b87a8',fontWeight:600}}>{u.role}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
