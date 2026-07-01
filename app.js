// ============================================================
// LIFE CONTROL — app.js
// ============================================================

const STORAGE_KEY = 'life-control-diego-v2';
const HISTORY_KEY = 'life-control-history-v2';

// ── HELPERS ──────────────────────────────────────────────────
function getTodayStr(){
  const d=new Date();
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}
function daysBetween(dateStr1, dateStr2){
  const parse=s=>{const[d,m,y]=s.split('/');return new Date(y,m-1,d);};
  return Math.floor((parse(dateStr2)-parse(dateStr1))/(1000*60*60*24));
}
function daysUntil(dateStr){
  const[d,m,y]=dateStr.split('/');
  const target=new Date(new Date().getFullYear(),m-1,d);
  const now=new Date();now.setHours(0,0,0,0);
  if(target<now)target.setFullYear(target.getFullYear()+1);
  return Math.ceil((target-now)/(1000*60*60*24));
}

// ── DAILY LOL TRAINING PLANS ─────────────────────────────────
const LOL_TREINOS = [
  ['🔄 Revisão da semana — assista 2 replays','📊 Analise suas estatísticas semanais','🎯 Defina o foco da próxima semana'],
  ['🌊 Wave Management — Freeze & Slowpush','🌾 Farm: meta de 7+ CS/min','📐 Posicionamento no Lane Phase'],
  ['🏃 Kiting & Spacing — Orb Walking perfeito','⚡ Combo da Jinx: timing de Q e R','🎯 Custom game — farm puro 20 min'],
  ['🗺️ Map Awareness — warding & vision control','📣 Comunicação com suporte','🔭 Jogar 1 partida focando só em visão'],
  ['⚔️ Team Fight — posicionamento back line','🛡️ Peel vs. poke: quando fazer cada um','📹 Assistir 1 vídeo de pro ADC (YT)'],
  ['🏆 Dia de Ranked — foco máximo','🧠 Mentalidade: 1 partida de cada vez','🚫 Regra: máx 2 derrotas seguidas → parar'],
  ['🎮 Jogo livre — sem pressão','🌾 Custom: 200 CS em 20 min','📹 1 replay crítico da semana'],
];

// ── MOTIVATIONAL QUOTES ──────────────────────────────────────
const QUOTES=[
  'A disciplina constrói o futuro que a motivação apenas imagina.',
  'Cada dia é uma nova oportunidade de ser melhor que ontem.',
  'Consistência é o caminho. Paciência é a velocidade.',
  'Quem planta hoje colhe amanhã. Plante com intenção.',
  'O progresso lento ainda é progresso. Continue.',
  'Sua rotina é a soma de quem você está se tornando.',
  'Feito é melhor que perfeito — mas ótimo é melhor que ambos.',
  'A sua atenção é o seu ativo mais valioso. Invista-a bem.',
  'Disciplina é liberdade. Caos é prisão.',
  'O extraordinário nasce de hábitos ordinários praticados com excelência.',
  'Não espere motivação. Crie momentum.',
  'Pequenas vitórias diárias vencem batalhas grandes.',
  'Você não eleva seu nível no grande momento. Você o revela.',
];

// ── DEFAULT STATE ────────────────────────────────────────────
function defaultState(){
  return {
    theme:'dark',
    lastDate:'',
    score:0,
    streak:0,
    habitos:[
      {id:1,label:'🛏 Arrumar a cama',done:false,pts:5},
      {id:2,label:'💧 Beber 2L de água',done:false,pts:10},
      {id:3,label:'📖 Devocional',done:false,pts:15},
      {id:4,label:'🙏 Oração',done:false,pts:15},
      {id:5,label:'💼 Trabalho focado (Pomodoro)',done:false,pts:10},
      {id:6,label:'📚 Estudo (1h+)',done:false,pts:15},
      {id:7,label:'🏋️ Academia ou caminhada',done:false,pts:10},
      {id:8,label:'💑 Conversar com esposa',done:false,pts:10},
      {id:9,label:'😴 Dormir antes das 23h',done:false,pts:10},
    ],
    rotina:[
      {hora:'06:30',titulo:'Acordar',obs:'Sem snooze. Levante com intenção.',done:false},
      {hora:'07:00',titulo:'Devocional & Oração',obs:'Bíblia + oração + gratidão',done:false},
      {hora:'08:00',titulo:'Trabalho',obs:'Foco total. Pomodoro 50/10.',done:false},
      {hora:'12:00',titulo:'Almoço & Pausa',obs:'Longe do computador.',done:false},
      {hora:'13:00',titulo:'Trabalho — Tarde',obs:'Projetos e tarefas principais.',done:false},
      {hora:'17:30',titulo:'Exercício',obs:'Academia ou caminhada 40 min.',done:false},
      {hora:'18:30',titulo:'Família & Esposa',obs:'Tempo de qualidade.',done:false},
      {hora:'19:30',titulo:'Estudos',obs:'Curso / leitura técnica.',done:false},
      {hora:'20:10',titulo:'League of Legends',obs:'Máximo 2 partidas. Sem tilt.',done:false},
      {hora:'22:00',titulo:'Desligar o computador',obs:'Sem exceções.',done:false},
      {hora:'22:30',titulo:'Higiene & Wind-down',obs:'Ler livro físico.',done:false},
      {hora:'22:45',titulo:'Dormir',obs:'8h de sono = alta performance.',done:false},
    ],
    espiritual:{
      startDate:'01/07/2026',
      diaAtual:1,
      livro:'Gênesis',
      cap:'Capítulo 1',
      versiculo:'"No princípio criou Deus os céus e a terra." — Gn 1:1',
      oracoes:['Família e casamento','Crescimento profissional','Saúde dos pais'],
      gratidao:['Minha esposa','Saúde','Trabalho que amo'],
      checklist:[
        {id:'bib',label:'📖 Leitura da Bíblia',done:false},
        {id:'ora',label:'🙏 Oração',done:false},
        {id:'sab',label:'📝 Lição da Escola Sabatina',done:false},
        {id:'med',label:'🧘 Meditação/Reflexão',done:false},
      ],
    },
    trabalho:{
      horasHoje:0,
      metaDiaria:8,
      estudosHoje:0,
      metaEstudo:2,
    },
    lol:{
      partidas:[],
      daysTilt:0,
    },
    casamento:{
      dataNamero:'18/10/2025',
      dataCivil:'09/02/2018',
      dataCerimonia:'18/02/2018',
      checklist:[
        {id:'c1',label:'💬 Conversa significativa',done:false},
        {id:'c2',label:'🍽 Refeição juntos',done:false},
        {id:'c3',label:'🙏 Orar juntos',done:false},
        {id:'c4',label:'❤️ Afeto físico intencional',done:false},
        {id:'c5',label:'🎯 Planejar semana juntos',done:false},
        {id:'c6',label:'🎭 Momento de lazer juntos',done:false},
      ],
      momentos:[],
    },
    saude:{peso:'',agua:'',sono:'',exercicio:'',passos:'',humor:'',pesoMeta:90},
    metas:[
      {area:'🙏 Espiritual',titulo:'Ler a Bíblia em 1 ano',meta:'Dez 2026',prioridade:'alta',
        checklist:[{l:'Ler todo dia',d:false},{l:'Anotar reflexões',d:false},{l:'Compartilhar aprendizados',d:false}]},
      {area:'💼 Profissional',titulo:'Dominar Google Planilhas Avançado',meta:'Dez 2026',prioridade:'alta',
        checklist:[{l:'Curso completo',d:false},{l:'3 projetos reais',d:false},{l:'Criar template público',d:false}]},
      {area:'💰 Financeira',titulo:'Reserva de emergência 6 meses',meta:'Dez 2026',prioridade:'alta',
        checklist:[{l:'Controle mensal',d:false},{l:'Investir 20%',d:false},{l:'Eliminar dívidas',d:false}]},
      {area:'🎮 LoL',titulo:'Alcançar Diamante III',meta:'Dez 2026',prioridade:'media',
        checklist:[{l:'60% WR consistente',d:false},{l:'8+ CS/min',d:false},{l:'Rotas limpas',d:false}]},
      {area:'👨‍👩‍👧 Família',titulo:'Viagem de casal',meta:'Dez 2026',prioridade:'media',
        checklist:[{l:'Escolher destino',d:false},{l:'Reservar hotel',d:false},{l:'Separar orçamento',d:false}]},
      {area:'🏋️ Saúde',titulo:'Atingir 90kg com definição',meta:'Dez 2026',prioridade:'media',
        checklist:[{l:'Treinar 5x/semana',d:false},{l:'Dieta hipercalórica limpa',d:false},{l:'Monitorar semanalmente',d:false}]},
    ],
    projetos:[
      {nome:'Dashboard SSP29',desc:'Sistema completo de indicadores para a SSP de Gestão.',cor:'var(--blue)',
        checklist:[{l:'Conectar API Sheets',d:false},{l:'Automatizar relatório diário',d:false},{l:'Dashboard Looker finalizado',d:false},{l:'Apresentar para gestores',d:false}],
        notas:'Em sprint ativo. Prazo: 30/07'},
      {nome:'Sistema de Controle de Gaiolas',desc:'Controle de estoque e rastreamento via planilha.',cor:'var(--gold)',
        checklist:[{l:'Mapeamento de processo',d:false},{l:'Formulário entrada/saída',d:false},{l:'Dashboard de status',d:false}],
        notas:'Aguardando validação do cliente'},
      {nome:'Curso Google Planilhas',desc:'Criação de curso completo do zero ao avançado.',cor:'var(--purple)',
        checklist:[{l:'Gravar módulo 1-5',d:false},{l:'Editar vídeos',d:false},{l:'Criar materiais PDF',d:false},{l:'Publicar na plataforma',d:false}],
        notas:'Módulos 1-3 gravados'},
      {nome:'Sistema Igreja Adventista',desc:'Gestão de membros, dízimos e eventos da igreja.',cor:'var(--cyan)',
        checklist:[{l:'Levantamento de requisitos',d:false},{l:'Protótipo no Sheets',d:false},{l:'Automatizar relatórios mensais',d:false}],
        notas:'Fase inicial'},
      {nome:'Sistema de Psicanálise',desc:'Gestão de pacientes, sessões e pagamentos.',cor:'var(--rose)',
        checklist:[{l:'Definir campos necessários',d:false},{l:'Criar estrutura de dados',d:false},{l:'Interface do usuário',d:false}],
        notas:'Em planejamento'},
    ],
    cursos:[
      {nome:'Google Planilhas Avançado',plataforma:'Udemy',prog:0,horas:'0/30h'},
      {nome:'React do Zero ao Avançado',plataforma:'Rocketseat',prog:0,horas:'0/40h'},
      {nome:'Power BI Completo',plataforma:'Alura',prog:0,horas:'0/30h'},
    ],
  };
}

let state = defaultState();
let history = [];

// ── STORAGE ──────────────────────────────────────────────────
function loadState(){
  try{
    const s=localStorage.getItem(STORAGE_KEY);
    if(s){ const loaded=JSON.parse(s); state={...defaultState(),...loaded}; }
    const h=localStorage.getItem(HISTORY_KEY);
    if(h) history=JSON.parse(h);
  }catch(e){console.warn('loadState error',e);}
}
function saveState(){
  try{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
    localStorage.setItem(HISTORY_KEY,JSON.stringify(history));
  }catch(e){}
}

// ── DAY RESET ────────────────────────────────────────────────
function checkDayReset(){
  const today=getTodayStr();
  if(state.lastDate && state.lastDate!==today){
    saveSnapshot(state.lastDate); // snapshot do dia anterior
    resetDailyFields();
    showNotif('🌅','Novo dia!','Campos zerados para hoje.','var(--blue)');
  }
  state.lastDate=today;
  saveState();
}

function saveSnapshot(dateStr){
  const snap={
    date: dateStr||getTodayStr(),
    score: state.score,
    habitsDone: state.habitos.filter(h=>h.done).length,
    habitsTotal: state.habitos.length,
    rotinaDone: state.rotina.filter(r=>r.done).length,
    espiritual: state.espiritual.checklist.filter(c=>c.done).length,
    peso: state.saude.peso||'',
    agua: state.saude.agua||0,
    sono: state.saude.sono||0,
    exercicio: state.saude.exercicio||0,
    passos: state.saude.passos||0,
    humor: state.saude.humor||0,
    horasTrab: state.trabalho.horasHoje||0,
    horasEstudo: state.trabalho.estudosHoje||0,
    lolPartidas: state.lol.partidas.filter(p=>p.date===dateStr).length,
    lolWins: state.lol.partidas.filter(p=>p.date===dateStr&&p.result==='win').length,
  };
  const idx=history.findIndex(h=>h.date===snap.date);
  if(idx>=0) history[idx]=snap; else history.unshift(snap);
  history=history.slice(0,365);
}

function resetDailyFields(){
  state.habitos.forEach(h=>h.done=false);
  state.rotina.forEach(r=>r.done=false);
  state.espiritual.checklist.forEach(c=>c.done=false);
  state.casamento.checklist.forEach(c=>c.done=false);
  const pesoMeta=state.saude.pesoMeta||90;
  state.saude={peso:'',agua:'',sono:'',exercicio:'',passos:'',humor:'',pesoMeta};
  state.trabalho.horasHoje=0;
  state.trabalho.estudosHoje=0;
  // increment Bible day
  state.espiritual.diaAtual=Math.min(365,(state.espiritual.diaAtual||1)+1);
  updateBibleDay();
}

// ── BIBLE PLAN ───────────────────────────────────────────────
const BIBLE_BOOKS=[
  {b:'Gênesis',c:50},{b:'Êxodo',c:40},{b:'Levítico',c:27},{b:'Números',c:36},
  {b:'Deuteronômio',c:34},{b:'Josué',c:24},{b:'Juízes',c:21},{b:'Rute',c:4},
  {b:'1 Samuel',c:31},{b:'2 Samuel',c:24},{b:'1 Reis',c:22},{b:'2 Reis',c:25},
  {b:'1 Crônicas',c:29},{b:'2 Crônicas',c:36},{b:'Esdras',c:10},{b:'Neemias',c:13},
  {b:'Ester',c:10},{b:'Jó',c:42},{b:'Salmos',c:150},{b:'Provérbios',c:31},
  {b:'Eclesiastes',c:12},{b:'Cantares',c:8},{b:'Isaías',c:66},{b:'Jeremias',c:52},
  {b:'Lamentações',c:5},{b:'Ezequiel',c:48},{b:'Daniel',c:12},{b:'Oséias',c:14},
  {b:'Joel',c:3},{b:'Amós',c:9},{b:'Obadias',c:1},{b:'Jonas',c:4},{b:'Miqueias',c:7},
  {b:'Naum',c:3},{b:'Habacuque',c:3},{b:'Sofonias',c:3},{b:'Ageu',c:2},
  {b:'Zacarias',c:14},{b:'Malaquias',c:4},{b:'Mateus',c:28},{b:'Marcos',c:16},
  {b:'Lucas',c:24},{b:'João',c:21},{b:'Atos',c:28},{b:'Romanos',c:16},
  {b:'1 Coríntios',c:16},{b:'2 Coríntios',c:13},{b:'Gálatas',c:6},{b:'Efésios',c:6},
  {b:'Filipenses',c:4},{b:'Colossenses',c:4},{b:'1 Tessalonicenses',c:5},
  {b:'2 Tessalonicenses',c:3},{b:'1 Timóteo',c:6},{b:'2 Timóteo',c:4},
  {b:'Tito',c:3},{b:'Filemom',c:1},{b:'Hebreus',c:13},{b:'Tiago',c:5},
  {b:'1 Pedro',c:5},{b:'2 Pedro',c:3},{b:'1 João',c:5},{b:'2 João',c:1},
  {b:'3 João',c:1},{b:'Judas',c:1},{b:'Apocalipse',c:22},
];
const TOTAL_CHAPTERS=BIBLE_BOOKS.reduce((a,b)=>a+b.c,0); // 1189

function updateBibleDay(){
  const day=state.espiritual.diaAtual||1;
  const chapsPerDay=TOTAL_CHAPTERS/365;
  const chapsDone=Math.floor(day*chapsPerDay);
  let acc=0;
  for(const bk of BIBLE_BOOKS){
    if(acc+bk.c>chapsDone){
      const capInBook=chapsDone-acc+1;
      state.espiritual.livro=bk.b;
      state.espiritual.cap=`Capítulo ${capInBook}`;
      break;
    }
    acc+=bk.c;
  }
}

// ── THEME ────────────────────────────────────────────────────
function toggleTheme(){
  state.theme=state.theme==='dark'?'light':'dark';
  applyTheme();
  saveState();
}
function applyTheme(){
  document.documentElement.setAttribute('data-theme',state.theme);
  const btn=document.getElementById('theme-btn');
  if(btn) btn.textContent=state.theme==='dark'?'☀️':'🌙';
}

// ── NAVIGATION ───────────────────────────────────────────────
const NAV_LABELS={home:'Dashboard',rotina:'Rotina',habitos:'Hábitos',
  espiritual:'Vida Espiritual',casamento:'Casamento',saude:'Saúde',
  trabalho:'Trabalho & Estudos',projetos:'Projetos',estudos:'Estudos',
  lol:'League of Legends',metas:'Metas 2026',relatorios:'Relatórios',config:'Configurações'};

let chartsInited={};
function nav(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(i=>i.classList.remove('active'));
  const sec=document.getElementById('section-'+id);
  if(sec){
    sec.classList.add('active');
    sec.querySelectorAll('.fade-up-d1,.fade-up-d2,.fade-up-d3,.fade-up-d4').forEach(el=>{el.style.animation='none';el.offsetHeight;el.style.animation='';});
  }
  const navItem=document.querySelector(`.nav-item[onclick="nav('${id}')"]`);
  if(navItem) navItem.classList.add('active');
  document.getElementById('topbar-breadcrumb').textContent=NAV_LABELS[id]||id;
  if(!chartsInited[id]){
    if(id==='home')initDashboardCharts();
    if(id==='habitos')initHabitosChart();
    if(id==='espiritual')initEspiritualChart();
    if(id==='estudos')initEstudosChart();
    if(id==='saude')initSaudeChart();
    if(id==='relatorios')initRelatoriosCharts();
    chartsInited[id]=true;
  }
}
function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('collapsed');
  document.getElementById('main').classList.toggle('collapsed');
}

// ── GREETING ─────────────────────────────────────────────────
function initGreeting(){
  const h=new Date().getHours();
  let g='Bom dia, Diego ☀️';
  if(h>=12&&h<18) g='Boa tarde, Diego 🌤️';
  else if(h>=18) g='Boa noite, Diego 🌙';
  document.getElementById('greeting-text').textContent=g;
  const d=new Date();
  const dias=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
  const meses=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  document.getElementById('greeting-date').textContent=`${dias[d.getDay()]}, ${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
  updateClock();
  const idx=d.getDate()%QUOTES.length;
  document.getElementById('motivational').textContent=QUOTES[idx];
}
function updateClock(){
  const d=new Date();
  const str=`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} — ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  const el=document.getElementById('topbar-date');
  if(el) el.textContent=str;
}

// ── SCORE ────────────────────────────────────────────────────
function updateScore(){
  const done=state.habitos.filter(h=>h.done).length;
  const total=state.habitos.length;
  const pct=Math.round((done/total)*100);
  state.score=pct;
  const valEl=document.getElementById('score-val');
  if(valEl) valEl.textContent=pct+'%';
  const circle=document.getElementById('score-circle');
  if(circle) circle.style.strokeDashoffset=314-(314*pct/100);
  const bar=document.getElementById('score-bar');
  if(bar) bar.style.width=pct+'%';
  const habEl=document.getElementById('stat-habitos');
  if(habEl) habEl.textContent=`${done}/${total}`;
}

// ── EDITABLE FIELDS ──────────────────────────────────────────
function makeEditable(el, onSave){
  el.setAttribute('contenteditable','true');
  el.focus();
  const sel=window.getSelection();
  const range=document.createRange();
  range.selectNodeContents(el);
  sel.removeAllRanges();
  sel.addRange(range);
  const finish=()=>{
    el.removeAttribute('contenteditable');
    onSave(el.textContent.trim());
    saveState();
  };
  el.addEventListener('blur',finish,{once:true});
  el.addEventListener('keydown',e=>{
    if(e.key==='Enter'){e.preventDefault();el.blur();}
    if(e.key==='Escape'){el.blur();}
  },{once:true});
}

// ── ROTINA ───────────────────────────────────────────────────
function renderRotina(){
  const el=document.getElementById('rotina-timeline');
  if(!el) return;
  el.innerHTML=state.rotina.map((item,i)=>`
    <div class="tl-item">
      <div class="tl-dot ${item.done?'done':''}"></div>
      <div class="tl-card">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
          <div style="flex:1;">
            <span id="rot-hora-${i}" class="tl-time">${item.hora}</span>
            <div id="rot-titulo-${i}" class="tl-title" style="text-decoration:${item.done?'line-through':''};opacity:${item.done?.6:1};">${item.titulo}</div>
            <div id="rot-obs-${i}" class="tl-obs">${item.obs}</div>
          </div>
          <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
            <button onclick="editRotinaPrompt(${i})" style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:12px;padding:2px 4px;" title="Editar">✏️</button>
            <button onclick="deleteRotina(${i})" style="background:none;border:none;cursor:pointer;color:var(--rose);font-size:15px;padding:2px 4px;line-height:1;" title="Excluir">&times;</button>
            <div onclick="toggleRotina(${i})" style="width:28px;height:28px;border-radius:8px;border:2px solid ${item.done?'var(--green)':'var(--border2)'};background:${item.done?'var(--green)':'transparent'};display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;">
              ${item.done?'<svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':''}
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('')+`
  <div class="tl-item" style="margin-top:8px;">
    <div class="tl-dot" style="background:var(--border2);border-color:var(--border2);"></div>
    <div class="tl-card" style="display:flex;flex-direction:column;gap:8px;">
      <div style="font-size:12px;font-weight:600;color:var(--text2);">+ Adicionar horário</div>
      <div style="display:grid;grid-template-columns:80px 1fr 1fr;gap:8px;">
        <input class="inp" id="rot-new-hora" placeholder="09:00" style="font-size:12px;padding:7px 10px;">
        <input class="inp" id="rot-new-titulo" placeholder="Título..." style="font-size:12px;padding:7px 10px;">
        <input class="inp" id="rot-new-obs" placeholder="Observação..." style="font-size:12px;padding:7px 10px;">
      </div>
      <button class="btn btn-blue btn-sm" onclick="addRotina()" style="align-self:flex-start;">+ Adicionar</button>
    </div>
  </div>`;
  renderRotinaPreview();
}
function editRotinaPrompt(i){
  // editar inline clicando nos campos
  const hora=document.getElementById('rot-hora-'+i);
  const titulo=document.getElementById('rot-titulo-'+i);
  const obs=document.getElementById('rot-obs-'+i);
  if(hora) makeEditable(hora,v=>state.rotina[i].hora=v);
  setTimeout(()=>{
    if(titulo) makeEditable(titulo,v=>state.rotina[i].titulo=v);
  },100);
  setTimeout(()=>{
    if(obs) makeEditable(obs,v=>state.rotina[i].obs=v);
  },200);
}
function deleteRotina(i){state.rotina.splice(i,1);saveState();renderRotina();}
function addRotina(){
  const hora=document.getElementById('rot-new-hora');
  const titulo=document.getElementById('rot-new-titulo');
  const obs=document.getElementById('rot-new-obs');
  if(!titulo||!titulo.value.trim()){showNotif('⚠️','Preencha o título!','','var(--gold)');return;}
  state.rotina.push({hora:hora?.value||'00:00',titulo:titulo.value.trim(),obs:obs?.value||'',done:false});
  if(hora)hora.value='';if(titulo)titulo.value='';if(obs)obs.value='';
  saveState();renderRotina();
}
function toggleRotina(i){state.rotina[i].done=!state.rotina[i].done;saveState();renderRotina();}
function renderRotinaPreview(){
  const el=document.getElementById('home-rotina-preview');
  if(!el) return;
  const upcoming=state.rotina.filter(r=>!r.done).slice(0,4);
  el.innerHTML=upcoming.length?upcoming.map(r=>`
    <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);">
      <span style="font-size:11px;font-weight:600;color:var(--blue2);min-width:42px;">${r.hora}</span>
      <span style="font-size:13px;">${r.titulo}</span>
    </div>`).join(''):'<div style="color:var(--text3);font-size:13px;">Rotina completa hoje! 🎉</div>';
}

// ── HÁBITOS ──────────────────────────────────────────────────
function renderHabitos(){
  const el=document.getElementById('habitos-list');
  if(!el) return;
  el.innerHTML=state.habitos.map((h,i)=>`
    <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:${h.done?'rgba(34,197,94,0.06)':'var(--card)'};border:1px solid ${h.done?'rgba(34,197,94,0.25)':'var(--border)'};border-radius:12px;transition:all .2s;">
      <div onclick="toggleHabito(${i})" class="habit-check ${h.done?'done':''}" style="cursor:pointer;flex-shrink:0;">${h.done?'<svg width="12" height="12" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':''}</div>
      <span id="hab-lbl-${i}" style="flex:1;font-size:14px;font-weight:500;text-decoration:${h.done?'line-through':''};opacity:${h.done?.6:1};">${h.label}</span>
      <div class="badge ${h.done?'badge-green':'badge-blue'}">+${h.pts}pts</div>
      <button onclick="editHabito(${i})" style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:13px;padding:2px 4px;" title="Editar">✏️</button>
      <button onclick="deleteHabito(${i})" style="background:none;border:none;cursor:pointer;color:var(--rose);font-size:16px;padding:2px 4px;line-height:1;" title="Excluir">&times;</button>
    </div>
  `).join('')+`
  <div style="display:flex;gap:8px;margin-top:8px;">
    <input class="inp" id="hab-new-label" placeholder="Novo hábito..." style="flex:1;" onkeydown="if(event.key==='Enter')addHabito()">
    <input class="inp" id="hab-new-pts" type="number" placeholder="pts" style="width:70px;" value="10">
    <button class="btn btn-blue btn-sm" onclick="addHabito()">+ Adicionar</button>
  </div>`;
  renderHabitosPreview();
  updateScore();
  const sd=document.getElementById('streak-display');
  if(sd) sd.textContent='🔥 '+state.streak;
}
function editHabito(i){
  const el=document.getElementById('hab-lbl-'+i);
  if(!el) return;
  makeEditable(el,v=>state.habitos[i].label=v);
}
function deleteHabito(i){state.habitos.splice(i,1);saveState();renderHabitos();}
function addHabito(){
  const lbl=document.getElementById('hab-new-label');
  const pts=document.getElementById('hab-new-pts');
  if(lbl&&lbl.value.trim()){
    state.habitos.push({id:Date.now(),label:lbl.value.trim(),done:false,pts:parseInt(pts?.value)||10});
    lbl.value='';if(pts)pts.value='10';
    saveState();renderHabitos();
  }
}
function toggleHabito(i){
  state.habitos[i].done=!state.habitos[i].done;
  saveState();renderHabitos();
  if(state.habitos[i].done) showNotif('✅','Hábito concluído!',`+${state.habitos[i].pts} pontos`,'var(--green)');
}
function renderHabitosPreview(){
  const el=document.getElementById('home-habitos-preview');
  if(!el) return;
  el.innerHTML=state.habitos.slice(0,5).map((h,i)=>`
    <div onclick="toggleHabito(${i})" style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer;">
      <div class="habit-check ${h.done?'done':''}" style="width:16px;height:16px;border-radius:4px;">${h.done?'<svg width="10" height="10" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':''}</div>
      <span style="font-size:13px;text-decoration:${h.done?'line-through':''};opacity:${h.done?.6:1};">${h.label}</span>
    </div>`).join('');
}

// ── ESPIRITUAL ───────────────────────────────────────────────
function renderEspiritual(){
  const c=state.espiritual;
  const pct=Math.round(((c.diaAtual-1)/365)*100);
  const livroEl=document.getElementById('biblia-livro');
  const capEl=document.getElementById('biblia-cap');
  const pctEl=document.getElementById('biblia-pct');
  const barEl=document.getElementById('biblia-bar');
  const dayEl=document.getElementById('biblia-dia');
  const verEl=document.getElementById('versiculo-fav');
  if(livroEl) livroEl.textContent=c.livro;
  if(capEl) capEl.textContent=c.cap;
  if(pctEl) pctEl.textContent=pct+'%';
  if(barEl) barEl.style.width=pct+'%';
  if(dayEl) dayEl.textContent=`Dia ${c.diaAtual} de 365`;
  if(verEl) verEl.textContent=c.versiculo;

  // Checklist espiritual — checkbox + texto + editar + excluir separados
  const cel=document.getElementById('espiritual-checklist');
  if(cel) cel.innerHTML=c.checklist.map((item,i)=>`
    <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:${item.done?'rgba(139,92,246,0.08)':'rgba(255,255,255,0.02)'};border:1px solid ${item.done?'rgba(139,92,246,0.25)':'var(--border)'};border-radius:10px;transition:all .2s;">
      <div onclick="toggleEspiritual(${i})" class="habit-check ${item.done?'done':''}" style="${item.done?'background:var(--purple);border-color:var(--purple);':''};cursor:pointer;flex-shrink:0;">${item.done?'<svg width="12" height="12" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':''}</div>
      <span id="esp-lbl-${i}" style="flex:1;font-size:13px;font-weight:500;text-decoration:${item.done?'line-through':''};opacity:${item.done?.6:1};">${item.label}</span>
      <button onclick="editEspChecklist(${i})" style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:13px;padding:2px 4px;" title="Editar">✏️</button>
      <button onclick="deleteEspChecklist(${i})" style="background:none;border:none;cursor:pointer;color:var(--rose);font-size:16px;padding:2px 4px;line-height:1;" title="Excluir">&times;</button>
    </div>`).join('')+`
    <div style="display:flex;gap:8px;margin-top:8px;">
      <input class="inp" id="esp-new-item" placeholder="Nova tarefa espiritual..." style="flex:1;font-size:13px;" onkeydown="if(event.key==='Enter')addEspChecklistItem()">
      <button class="btn btn-blue btn-sm" onclick="addEspChecklistItem()">+ Adicionar</button>
    </div>`;

  const oel=document.getElementById('oracao-list');
  if(oel) oel.innerHTML=c.oracoes.map((o,i)=>`
    <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:8px;">
      <span style="flex:1;font-size:13px;">🙏 <span id="ora-${i}">${o}</span></span>
      <button onclick="editOracao(${i})" style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:13px;padding:2px 4px;" title="Editar">✏️</button>
      <button onclick="removeOracao(${i})" style="background:none;border:none;cursor:pointer;color:var(--rose);font-size:16px;padding:2px 4px;line-height:1;" title="Excluir">&times;</button>
    </div>`).join('');

  const gel=document.getElementById('gratidao-list');
  if(gel) gel.innerHTML=c.gratidao.map((g,i)=>`
    <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:8px;">
      <span style="flex:1;font-size:13px;">🌟 <span id="gra-${i}">${g}</span></span>
      <button onclick="editGratidao(${i})" style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:13px;padding:2px 4px;" title="Editar">✏️</button>
      <button onclick="removeGratidao(${i})" style="background:none;border:none;cursor:pointer;color:var(--rose);font-size:16px;padding:2px 4px;line-height:1;" title="Excluir">&times;</button>
    </div>`).join('');
}
function toggleEspiritual(i){state.espiritual.checklist[i].done=!state.espiritual.checklist[i].done;saveState();renderEspiritual();}
function editEspChecklist(i){
  const lbl=document.getElementById('esp-lbl-'+i);
  if(!lbl) return;
  makeEditable(lbl,v=>{state.espiritual.checklist[i].label=v;});
}
function deleteEspChecklist(i){state.espiritual.checklist.splice(i,1);saveState();renderEspiritual();}
function addEspChecklistItem(){
  const inp=document.getElementById('esp-new-item');
  if(inp&&inp.value.trim()){
    const id='esp_'+Date.now();
    state.espiritual.checklist.push({id,label:inp.value.trim(),done:false});
    inp.value='';saveState();renderEspiritual();
  }
}
function editOracao(i){
  const el=document.getElementById('ora-'+i);
  if(!el) return;
  makeEditable(el,v=>state.espiritual.oracoes[i]=v);
}
function editGratidao(i){
  const el=document.getElementById('gra-'+i);
  if(!el) return;
  makeEditable(el,v=>state.espiritual.gratidao[i]=v);
}
function addOracao(){const inp=document.getElementById('oracao-input');if(inp&&inp.value.trim()){state.espiritual.oracoes.push(inp.value.trim());inp.value='';saveState();renderEspiritual();}}
function removeOracao(i){state.espiritual.oracoes.splice(i,1);saveState();renderEspiritual();}
function addGratidao(){const inp=document.getElementById('gratidao-input');if(inp&&inp.value.trim()){state.espiritual.gratidao.push(inp.value.trim());inp.value='';saveState();renderEspiritual();}}
function removeGratidao(i){state.espiritual.gratidao.splice(i,1);saveState();renderEspiritual();}
function avancarBiblia(){
  state.espiritual.diaAtual=Math.min(365,(state.espiritual.diaAtual||1)+1);
  updateBibleDay();saveState();renderEspiritual();
  showNotif('📖','Leitura registrada!',`Dia ${state.espiritual.diaAtual} de 365`,'var(--purple)');
}

// ── TRABALHO & ESTUDOS ───────────────────────────────────────
function renderTrabalho(){
  const t=state.trabalho;
  const wPct=Math.min(100,Math.round((t.horasHoje/t.metaDiaria)*100));
  const ePct=Math.min(100,Math.round((t.estudosHoje/t.metaEstudo)*100));
  const wpEl=document.getElementById('trab-work-pct');if(wpEl)wpEl.textContent=t.horasHoje+'h';
  const wbEl=document.getElementById('trab-work-bar');if(wbEl)wbEl.style.width=wPct+'%';
  const epEl=document.getElementById('trab-est-pct');if(epEl)epEl.textContent=t.estudosHoje+'h';
  const ebEl=document.getElementById('trab-est-bar');if(ebEl)ebEl.style.width=ePct+'%';
  const hwEl=document.getElementById('input-horas-trab');if(hwEl)hwEl.value=t.horasHoje||'';
  const heEl=document.getElementById('input-horas-est');if(heEl)heEl.value=t.estudosHoje||'';
}
function salvarTrabalho(){
  const hw=document.getElementById('input-horas-trab');
  const he=document.getElementById('input-horas-est');
  if(hw) state.trabalho.horasHoje=parseFloat(hw.value)||0;
  if(he) state.trabalho.estudosHoje=parseFloat(he.value)||0;
  saveState();renderTrabalho();showNotif('⏱','Horas registradas!','','var(--blue)');
}

// ── PROJETOS ─────────────────────────────────────────────────
function renderProjetos(){
  const el=document.getElementById('projetos-grid');
  if(!el) return;
  el.innerHTML=state.projetos.map((p,pi)=>{
    const done=p.checklist.filter(c=>c.d).length;
    const prog=Math.round((done/p.checklist.length)*100);
    return `<div class="card" style="border-color:${p.cor}22;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px;">
        <div style="flex:1;">
          <div class="editable" style="font-weight:700;font-size:15px;margin-bottom:4px;" onclick="editProjeto(${pi},'nome',this)">${p.nome}</div>
          <div class="editable" style="font-size:12px;color:var(--text2);" onclick="editProjeto(${pi},'desc',this)">${p.desc}</div>
        </div>
        <div style="font-size:20px;font-weight:800;color:${p.cor};margin-left:12px;flex-shrink:0;">${prog}%</div>
      </div>
      <div class="progress-track" style="margin-bottom:14px;"><div class="progress-fill" style="background:${p.cor};width:${prog}%;"></div></div>
      <div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;">Checklist</div>
      <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:12px;">
        ${p.checklist.map((c,ci)=>`
          <div onclick="toggleProjetoCheck(${pi},${ci})" style="display:flex;align-items:center;gap:8px;cursor:pointer;">
            <div style="width:14px;height:14px;border-radius:4px;border:2px solid ${p.cor};flex-shrink:0;background:${c.d?p.cor:'transparent'};display:flex;align-items:center;justify-content:center;">${c.d?'<svg width="10" height="10" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':''}</div>
            <span class="editable" style="font-size:12px;color:var(--text2);text-decoration:${c.d?'line-through':''};" onclick="event.stopPropagation();editProjetoCheck(${pi},${ci},this)">${c.l}</span>
          </div>`).join('')}
      </div>
      <div class="editable" style="font-size:11px;color:var(--text3);padding:8px;background:rgba(255,255,255,0.02);border-radius:8px;" onclick="editProjeto(${pi},'notas',this)">📝 ${p.notas}</div>
    </div>`;
  }).join('');
}
function editProjeto(pi,field,el){makeEditable(el,v=>state.projetos[pi][field]=v.replace(/^📝\s*/,''));}
function editProjetoCheck(pi,ci,el){makeEditable(el,v=>state.projetos[pi].checklist[ci].l=v);}
function toggleProjetoCheck(pi,ci){state.projetos[pi].checklist[ci].d=!state.projetos[pi].checklist[ci].d;saveState();renderProjetos();}

// ── ESTUDOS ──────────────────────────────────────────────────
function renderCursos(){
  const el=document.getElementById('cursos-list');
  if(!el) return;
  el.innerHTML=state.cursos.map((c,ci)=>`
    <div style="padding:12px 14px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:10px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">
        <div>
          <div class="editable" style="font-size:13px;font-weight:600;" onclick="editCurso(${ci},'nome',this)">${c.nome}</div>
          <div class="editable" style="font-size:11px;color:var(--text3);" onclick="editCurso(${ci},'plataforma',this)">${c.plataforma} • <span onclick="event.stopPropagation();editCurso(${ci},'horas',this)" class="editable">${c.horas}</span></div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <input type="number" min="0" max="100" value="${c.prog}" onchange="state.cursos[${ci}].prog=parseInt(this.value);saveState();renderCursos();" style="width:52px;padding:4px 6px;background:var(--card);border:1px solid var(--border);border-radius:6px;color:var(--text);font-size:12px;outline:none;">
          <span style="font-size:11px;color:var(--text3);">%</span>
        </div>
      </div>
      <div class="progress-track"><div class="progress-fill" style="background:linear-gradient(90deg,var(--purple),var(--blue));width:${c.prog}%;"></div></div>
    </div>`).join('');
}
function editCurso(ci,field,el){makeEditable(el,v=>state.cursos[ci][field]=v);}

// ── LOL ──────────────────────────────────────────────────────
function renderLolTreino(){
  const el=document.getElementById('lol-treino-list');
  if(!el) return;
  const dow=new Date().getDay();
  const treinos=LOL_TREINOS[dow];
  el.innerHTML=treinos.map((t,i)=>`
    <div onclick="this.querySelector('.habit-check').classList.toggle('done')" style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;cursor:pointer;">
      <div class="habit-check"></div>
      <span style="font-size:13px;">${t}</span>
    </div>`).join('');
  const dias=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
  const lbl=document.getElementById('lol-treino-label');
  if(lbl) lbl.textContent=`Treino de ${dias[dow]}`;
}
function registrarPartida(){
  const result=document.getElementById('lol-result').value;
  const kda=document.getElementById('lol-kda').value;
  const cs=document.getElementById('lol-cs').value;
  const dano=document.getElementById('lol-dano').value;
  const tempo=document.getElementById('lol-tempo').value;
  const certo=document.getElementById('lol-certo').value;
  const melhorar=document.getElementById('lol-melhorar').value;
  if(!kda){showNotif('⚠️','Preencha o KDA!','','var(--gold)');return;}
  const today=getTodayStr();
  const hojeCount=state.lol.partidas.filter(p=>p.date===today).length;
  const partida={result,kda,cs,dano,tempo,certo,melhorar,date:today};
  state.lol.partidas.unshift(partida);
  ['lol-kda','lol-cs','lol-dano','lol-tempo','lol-certo','lol-melhorar'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  saveState();renderLolHistorico();updateLolStats();
  if(hojeCount+1>=2) showNotif('🛑','Treino encerrado!','Evolução vem da consistência.','var(--rose)');
  else showNotif(result==='win'?'🏆':'😤',result==='win'?'Vitória!':'Derrota registrada.','Partida salva.',result==='win'?'var(--green)':'var(--rose)');
}
function renderLolHistorico(){
  const el=document.getElementById('lol-historico');
  if(!el) return;
  if(!state.lol.partidas.length){el.innerHTML='<div style="color:var(--text3);font-size:13px;text-align:center;padding:20px;">Nenhuma partida registrada ainda.</div>';return;}
  el.innerHTML=state.lol.partidas.slice(0,15).map(p=>`
    <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--border);">
      <div style="width:32px;height:32px;border-radius:8px;background:${p.result==='win'?'rgba(34,197,94,0.15)':'rgba(244,63,94,0.15)'};display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">${p.result==='win'?'🏆':'💀'}</div>
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:600;color:${p.result==='win'?'var(--green)':'var(--rose)'};">${p.result==='win'?'Vitória':'Derrota'} — ${p.kda} KDA</div>
        <div style="font-size:11px;color:var(--text3);">${p.cs?p.cs+' CS/min':''} ${p.tempo?'• '+p.tempo:''} • ${p.date}</div>
        ${p.certo?`<div style="font-size:11px;color:var(--green);margin-top:2px;">✓ ${p.certo}</div>`:''}
        ${p.melhorar?`<div style="font-size:11px;color:var(--gold);margin-top:1px;">⚠ ${p.melhorar}</div>`:''}
      </div>
    </div>`).join('');
}
function updateLolStats(){
  const today=getTodayStr();
  const hojePartidas=state.lol.partidas.filter(p=>p.date===today);
  const allP=state.lol.partidas;
  const pw=document.getElementById('lol-partidas-semana');if(pw)pw.textContent=allP.length;
  const wins=allP.filter(x=>x.result==='win').length;
  const wr=document.getElementById('lol-wr');if(wr)wr.textContent=allP.length?Math.round(wins/allP.length*100)+'%':'--';
  const csVals=allP.filter(x=>x.cs).map(x=>parseFloat(x.cs));
  const fm=document.getElementById('lol-farm');if(fm)fm.textContent=csVals.length?(csVals.reduce((a,b)=>a+b,0)/csVals.length).toFixed(1):'0';
  const tiltEl=document.getElementById('lol-days-tilt');if(tiltEl)tiltEl.textContent=`🧘 ${state.lol.daysTilt} dias sem tilt`;
}

// ── CASAMENTO ────────────────────────────────────────────────
function renderCasamento(){
  const c=state.casamento;
  const today=getTodayStr();
  const diasJuntos=daysBetween(c.dataNamero,today);
  const djEl=document.getElementById('cas-dias-juntos');if(djEl)djEl.textContent=diasJuntos+' dias';

  // próximo aniversário de namoro
  const dn=daysUntil(c.dataNamero);
  const dnEl=document.getElementById('cas-prox-aniv');if(dnEl)dnEl.textContent=dn===0?'Hoje! 🎉':dn+' dias';

  const datas=[
    {data:c.dataNamero,desc:'Aniversário de namoro',emoji:'💕'},
    {data:'14/02',desc:'Dia dos Namorados',emoji:'💝'},
    {data:c.dataCivil,desc:'Casamento civil',emoji:'💍'},
    {data:c.dataCerimonia,desc:'Cerimônia de casamento',emoji:'👰'},
  ];
  const del=document.getElementById('casamento-datas');
  if(del) del.innerHTML=datas.map(d=>{
    const dd=d.data.length===5?d.data:d.data.substring(0,5);
    const dias=daysUntil(dd+'/'+new Date().getFullYear());
    return `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:10px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:18px;">${d.emoji}</span>
        <div><div style="font-size:13px;font-weight:500;">${d.desc}</div><div style="font-size:11px;color:var(--text3);">${d.data}</div></div>
      </div>
      <div class="badge badge-rose">${dias===0?'Hoje!':dias+' dias'}</div>
    </div>`;}).join('');

  const el=document.getElementById('casamento-checklist');
  if(el) el.innerHTML=c.checklist.map((item,i)=>`
    <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:${item.done?'rgba(244,114,182,0.06)':'rgba(255,255,255,0.02)'};border:1px solid ${item.done?'rgba(244,114,182,0.25)':'var(--border)'};border-radius:10px;transition:all .2s;">
      <div onclick="toggleCasamento(${i})" class="habit-check ${item.done?'done':''}" style="${item.done?'background:#f472b6;border-color:#f472b6;':''};cursor:pointer;flex-shrink:0;">${item.done?'<svg width="12" height="12" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':''}</div>
      <span id="cas-lbl-${i}" style="flex:1;font-size:13px;text-decoration:${item.done?'line-through':''};opacity:${item.done?.6:1};">${item.label}</span>
      <button onclick="editCasCheck(${i})" style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:13px;padding:2px 4px;" title="Editar">✏️</button>
      <button onclick="deleteCasCheck(${i})" style="background:none;border:none;cursor:pointer;color:var(--rose);font-size:16px;padding:2px 4px;line-height:1;" title="Excluir">&times;</button>
    </div>`).join('')+`
    <div style="display:flex;gap:8px;margin-top:8px;">
      <input class="inp" id="cas-new-item" placeholder="Nova tarefa do casal..." style="flex:1;font-size:13px;" onkeydown="if(event.key==='Enter')addCasCheck()">
      <button class="btn btn-ghost btn-sm" onclick="addCasCheck()" style="border-color:rgba(244,114,182,0.3);color:#f472b6;">+ Adicionar</button>
    </div>`;

  const mel=document.getElementById('momentos-list');
  if(mel) mel.innerHTML=c.momentos.slice(0,5).map(m=>`
    <div style="padding:10px 14px;background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:10px;">
      <div style="font-size:12px;color:var(--text3);margin-bottom:4px;">${m.date}</div>
      <div style="font-size:13px;">${m.text}</div>
    </div>`).join('');
}
function editCasCheck(i){
  const lbl=document.getElementById('cas-lbl-'+i);
  if(!lbl) return;
  makeEditable(lbl,v=>state.casamento.checklist[i].label=v);
}
function deleteCasCheck(i){state.casamento.checklist.splice(i,1);saveState();renderCasamento();}
function addCasCheck(){
  const inp=document.getElementById('cas-new-item');
  if(inp&&inp.value.trim()){
    const id='c'+Date.now();
    state.casamento.checklist.push({id,label:inp.value.trim(),done:false});
    inp.value='';saveState();renderCasamento();
  }
}
function toggleCasamento(i){state.casamento.checklist[i].done=!state.casamento.checklist[i].done;saveState();renderCasamento();}
function salvarMomento(){
  const t=document.getElementById('momentos-text');
  if(!t||!t.value.trim()) return;
  state.casamento.momentos.unshift({text:t.value.trim(),date:getTodayStr()});
  t.value='';saveState();renderCasamento();showNotif('💝','Momento salvo!','','#f472b6');
}

// ── SAÚDE ────────────────────────────────────────────────────
function salvarSaude(){
  ['peso','agua','sono','exercicio','passos','humor'].forEach(k=>{
    const v=document.getElementById('saude-'+k);
    if(v&&v.value) state.saude[k]=v.value;
  });
  saveState();renderSaudeMetas();
}
function renderSaudeMetas(){
  const s=state.saude;
  const pesoMeta=s.pesoMeta||90;
  const metas=[
    {label:'⚖️ Peso',val:parseFloat(s.peso)||0,meta:pesoMeta,unidade:'kg',cor:'var(--blue2)',invert:false},
    {label:'💧 Água',val:parseFloat(s.agua)||0,meta:2000,unidade:'ml',cor:'var(--cyan)',invert:false},
    {label:'😴 Sono',val:parseFloat(s.sono)||0,meta:8,unidade:'h',cor:'var(--purple2)',invert:false},
    {label:'🏋️ Exercício',val:parseFloat(s.exercicio)||0,meta:45,unidade:'min',cor:'var(--green)',invert:false},
    {label:'👟 Passos',val:parseFloat(s.passos)||0,meta:10000,unidade:'',cor:'var(--gold)',invert:false},
    {label:'😊 Humor',val:parseFloat(s.humor)||0,meta:10,unidade:'/10',cor:'var(--rose)',invert:false},
  ];
  const el=document.getElementById('saude-metas');
  if(!el) return;
  el.innerHTML=metas.map(m=>`
    <div>
      <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;">
        <span>${m.label}</span>
        <span style="color:var(--text2);">${m.val}${m.unidade} / ${m.meta}${m.unidade}</span>
      </div>
      <div class="progress-track"><div class="progress-fill" style="background:${m.cor};width:${Math.min(100,Math.round(m.val/m.meta*100))}%;"></div></div>
    </div>`).join('');
}
function loadSaudeInputs(){
  ['peso','agua','sono','exercicio','passos','humor'].forEach(k=>{
    const el=document.getElementById('saude-'+k);
    if(el&&state.saude[k]) el.value=state.saude[k];
  });
  const pm=document.getElementById('saude-peso-meta');
  if(pm) pm.value=state.saude.pesoMeta||90;
}
function salvarPesoMeta(){
  const pm=document.getElementById('saude-peso-meta');
  if(pm) state.saude.pesoMeta=parseFloat(pm.value)||90;
  saveState();renderSaudeMetas();showNotif('🎯','Meta de peso atualizada!','','var(--blue)');
}

// ── METAS (checklist-driven progress) ────────────────────────
function calcMetaPct(meta){
  if(!meta.checklist||!meta.checklist.length) return 0;
  return Math.round(meta.checklist.filter(c=>c.d).length/meta.checklist.length*100);
}
function renderMetas(){
  const el=document.getElementById('metas-grid');
  if(!el) return;
  el.innerHTML=state.metas.map((m,mi)=>{
    const pct=calcMetaPct(m);
    return `<div class="card">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;gap:8px;">
        <div style="flex:1;">
          <div id="meta-area-${mi}" style="font-size:11px;color:var(--text3);font-weight:600;letter-spacing:.05em;margin-bottom:4px;">${m.area}</div>
          <div id="meta-titulo-${mi}" style="font-size:15px;font-weight:700;">${m.titulo}</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
          <div class="badge ${m.prioridade==='alta'?'badge-rose':m.prioridade==='media'?'badge-gold':'badge-blue'}">${m.prioridade}</div>
          <button onclick="editMetaField(${mi},'titulo','meta-titulo-${mi}')" style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:12px;padding:2px;" title="Editar título">✏️</button>
          <button onclick="deleteMeta(${mi})" style="background:none;border:none;cursor:pointer;color:var(--rose);font-size:15px;padding:2px;line-height:1;" title="Excluir meta">&times;</button>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <div style="flex:1;"><div class="progress-track"><div class="progress-fill" style="background:linear-gradient(90deg,var(--blue),var(--purple));width:${pct}%;"></div></div></div>
        <div style="font-size:14px;font-weight:700;color:var(--blue2);min-width:36px;">${pct}%</div>
      </div>
      <div style="font-size:11px;color:var(--text3);margin-bottom:10px;display:flex;align-items:center;gap:4px;">
        📅 <span id="meta-prazo-${mi}">${m.meta}</span>
        <button onclick="editMetaField(${mi},'meta','meta-prazo-${mi}')" style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:11px;padding:1px 3px;" title="Editar prazo">✏️</button>
      </div>
      <div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;">Checklist</div>
      <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;" id="meta-checks-${mi}">
        ${m.checklist.map((c,ci)=>`
          <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:8px;background:${c.d?'rgba(59,130,246,0.06)':'transparent'};border:1px solid ${c.d?'rgba(59,130,246,0.2)':'transparent'};transition:all .2s;">
            <div onclick="toggleMetaCheck(${mi},${ci})" class="habit-check ${c.d?'done':''}" style="width:16px;height:16px;border-radius:4px;cursor:pointer;flex-shrink:0;">${c.d?'<svg width="10" height="10" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':''}</div>
            <span id="meta-c-${mi}-${ci}" style="flex:1;font-size:12px;color:var(--text2);text-decoration:${c.d?'line-through':''};">${c.l}</span>
            <button onclick="editMetaCheck(${mi},${ci})" style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:11px;padding:1px 3px;" title="Editar">✏️</button>
            <button onclick="deleteMetaCheck(${mi},${ci})" style="background:none;border:none;cursor:pointer;color:var(--rose);font-size:14px;padding:1px 3px;line-height:1;" title="Excluir">&times;</button>
          </div>`).join('')}
      </div>
      <div style="display:flex;gap:6px;">
        <input class="inp" id="meta-new-${mi}" placeholder="Novo item..." style="flex:1;font-size:12px;padding:7px 10px;" onkeydown="if(event.key==='Enter')addMetaCheck(${mi})">
        <button class="btn btn-ghost btn-sm" onclick="addMetaCheck(${mi})">+</button>
      </div>
    </div>`;
  }).join('')+`
  <div class="card" style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;border-style:dashed;">
    <div style="font-weight:600;font-size:14px;color:var(--text2);">+ Nova Meta</div>
    <input class="inp" id="nova-meta-area" placeholder="Área (ex: 💼 Profissional)">
    <input class="inp" id="nova-meta-titulo" placeholder="Título da meta">
    <input class="inp" id="nova-meta-prazo" placeholder="Prazo (ex: Dez 2026)">
    <select class="inp" id="nova-meta-prior">
      <option value="alta">🔴 Alta prioridade</option>
      <option value="media">🟡 Média prioridade</option>
      <option value="baixa">🟢 Baixa prioridade</option>
    </select>
    <button class="btn btn-blue" onclick="adicionarMeta()">Criar Meta</button>
  </div>`;
}
function editMetaField(mi, field, elId){
  const el=document.getElementById(elId);
  if(!el) return;
  makeEditable(el,v=>state.metas[mi][field]=v);
}
function editMetaCheck(mi,ci){
  const el=document.getElementById(`meta-c-${mi}-${ci}`);
  if(!el) return;
  makeEditable(el,v=>state.metas[mi].checklist[ci].l=v);
}
function toggleMetaCheck(mi,ci){
  state.metas[mi].checklist[ci].d=!state.metas[mi].checklist[ci].d;
  saveState();renderMetas();
}
function deleteMetaCheck(mi,ci){
  state.metas[mi].checklist.splice(ci,1);
  saveState();renderMetas();
}
function addMetaCheck(mi){
  const inp=document.getElementById('meta-new-'+mi);
  if(inp&&inp.value.trim()){
    state.metas[mi].checklist.push({l:inp.value.trim(),d:false});
    inp.value='';saveState();renderMetas();
  }
}
function deleteMeta(mi){
  if(confirm('Excluir esta meta?')){state.metas.splice(mi,1);saveState();renderMetas();}
}
function adicionarMeta(){
  const area=document.getElementById('nova-meta-area').value.trim();
  const titulo=document.getElementById('nova-meta-titulo').value.trim();
  const prazo=document.getElementById('nova-meta-prazo').value.trim();
  const prior=document.getElementById('nova-meta-prior').value;
  if(!titulo){showNotif('⚠️','Preencha o título!','','var(--gold)');return;}
  state.metas.push({area:area||'🎯 Geral',titulo,meta:prazo||'Dez 2026',prioridade:prior,checklist:[]});
  saveState();renderMetas();showNotif('🎯','Meta criada!','','var(--blue)');
}

// ── RELATÓRIOS ───────────────────────────────────────────────
function renderRelatorios(){
  const last7=history.slice(0,7).reverse();
  const last30=history.slice(0,30);
  const avgScore=last30.length?Math.round(last30.reduce((a,h)=>a+h.score,0)/last30.length):0;
  const avgHabits=last30.length?Math.round(last30.reduce((a,h)=>a+(h.habitsDone/h.habitsTotal*100),0)/last30.length):0;
  const totalTrab=last30.reduce((a,h)=>a+(h.horasTrab||0),0);
  const totalEst=last30.reduce((a,h)=>a+(h.horasEstudo||0),0);
  const s1=document.getElementById('rel-score');if(s1)s1.textContent=avgScore+'%';
  const s2=document.getElementById('rel-habitos');if(s2)s2.textContent=avgHabits+'%';
  const s3=document.getElementById('rel-trab');if(s3)s3.textContent=totalTrab.toFixed(0)+'h';
  const s4=document.getElementById('rel-est');if(s4)s4.textContent=totalEst.toFixed(0)+'h';

  const htEl=document.getElementById('hist-table-body');
  if(htEl) htEl.innerHTML=history.slice(0,14).map(h=>`
    <tr>
      <td>${h.date}</td>
      <td>${h.score}%</td>
      <td>${h.habitsDone}/${h.habitsTotal}</td>
      <td>${h.horasTrab||0}h</td>
      <td>${h.horasEstudo||0}h</td>
      <td>${h.lolPartidas||0} (${h.lolWins||0}V)</td>
      <td>${h.peso||'—'}</td>
    </tr>`).join('')||'<tr><td colspan="7" style="text-align:center;color:var(--text3);padding:20px;">Sem histórico ainda — os dados aparecem após o primeiro reset de dia.</td></tr>';
}

// ── NOTIFICAÇÕES ─────────────────────────────────────────────
function showNotif(icon,title,msg,color='var(--blue)'){
  document.getElementById('notif-icon').innerHTML=`<div style="font-size:20px;">${icon}</div>`;
  document.getElementById('notif-title').textContent=title;
  document.getElementById('notif-msg').textContent=msg;
  const n=document.getElementById('notif');
  n.classList.add('show');
  setTimeout(()=>n.classList.remove('show'),3200);
}

// ── CHARTS ───────────────────────────────────────────────────
const CD={plugins:{legend:{labels:{color:'#94a3b8',font:{family:'Inter',size:11}}}},scales:{x:{ticks:{color:'#64748b',font:{size:10}},grid:{color:'rgba(255,255,255,0.04)'}},y:{ticks:{color:'#64748b',font:{size:10}},grid:{color:'rgba(255,255,255,0.04)'}}}};
let charts={};
function mkChart(id,type,data,opts={}){
  if(charts[id]){try{charts[id].destroy();}catch(e){}}
  const ctx=document.getElementById(id);
  if(!ctx) return;
  charts[id]=new Chart(ctx,{type,data,options:{responsive:true,maintainAspectRatio:false,...CD,...opts}});
}
function initDashboardCharts(){
  const last7=history.slice(0,7).reverse();
  const labels=last7.length?last7.map(h=>h.date.substring(0,5)):['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
  const scores=last7.length?last7.map(h=>h.score):[0,0,0,0,0,0,0];
  mkChart('chart-semana','line',{labels,datasets:[{label:'Score Diário',data:scores,borderColor:'rgba(139,92,246,0.8)',backgroundColor:'rgba(139,92,246,0.1)',fill:true,tension:.4,pointBackgroundColor:'#8b5cf6'}]});
  mkChart('chart-pizza','doughnut',{
    labels:['Trabalho','Estudo','LoL','Família','Espiritual','Exercício'],
    datasets:[{data:[38,12,8,18,8,7],backgroundColor:['rgba(59,130,246,0.8)','rgba(139,92,246,0.8)','rgba(245,158,11,0.8)','rgba(244,114,182,0.8)','rgba(168,85,247,0.8)','rgba(34,197,94,0.8)'],borderWidth:0,hoverOffset:6}]
  },{plugins:{legend:{position:'right',...CD.plugins.legend}},cutout:'65%'});
}
function initHabitosChart(){
  const last7=history.slice(0,7).reverse();
  const labels=last7.length?last7.map(h=>h.date.substring(0,5)):['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
  const data=last7.length?last7.map(h=>h.habitsDone):[0,0,0,0,0,0,0];
  mkChart('chart-habitos-semana','bar',{labels,datasets:[{label:'Hábitos',data,backgroundColor:'rgba(34,197,94,0.7)',borderRadius:6}]},{scales:{...CD.scales,y:{...CD.scales.y,max:9}}});
}
function initEspiritualChart(){
  const last7=history.slice(0,7).reverse();
  const data=last7.length?last7.map(h=>h.espiritual||0):[0,0,0,0,0,0,0];
  const labels=last7.length?last7.map(h=>h.date.substring(0,5)):['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
  mkChart('chart-espiritual','line',{labels,datasets:[{label:'Itens espirituais',data,borderColor:'rgba(139,92,246,0.8)',backgroundColor:'rgba(139,92,246,0.1)',fill:true,tension:.4,pointBackgroundColor:'#8b5cf6'}]},{scales:{...CD.scales,y:{...CD.scales.y,max:4}}});
}
function initEstudosChart(){
  const last7=history.slice(0,7).reverse();
  const labels=last7.length?last7.map(h=>h.date.substring(0,5)):['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
  const data=last7.length?last7.map(h=>h.horasEstudo||0):[0,0,0,0,0,0,0];
  mkChart('chart-estudos','bar',{labels,datasets:[{label:'Horas estudadas',data,backgroundColor:'rgba(139,92,246,0.7)',borderRadius:6}]});
}
function initSaudeChart(){
  const last7=history.slice(0,7).reverse();
  const labels=last7.length?last7.map(h=>h.date.substring(0,5)):['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
  mkChart('chart-saude','line',{labels,datasets:[
    {label:'Sono (h)',data:last7.map(h=>h.sono||0),borderColor:'rgba(139,92,246,0.8)',backgroundColor:'rgba(139,92,246,0.08)',fill:true,tension:.4,yAxisID:'y'},
    {label:'Peso (kg)',data:last7.map(h=>parseFloat(h.peso)||null),borderColor:'rgba(34,197,94,0.8)',backgroundColor:'transparent',tension:.4,yAxisID:'y1'},
  ]},{scales:{x:{ticks:{color:'#64748b'},grid:{color:'rgba(255,255,255,0.04)'}},y:{ticks:{color:'#64748b'},grid:{color:'rgba(255,255,255,0.04)'},position:'left'},y1:{ticks:{color:'#64748b'},grid:{display:false},position:'right'}}});
}
function initRelatoriosCharts(){
  renderRelatorios();
  const last30=history.slice(0,30).reverse();
  const labels=last30.length?last30.map(h=>h.date.substring(0,5)):[];
  mkChart('chart-mensal','line',{labels,datasets:[
    {label:'Score',data:last30.map(h=>h.score),borderColor:'rgba(139,92,246,0.8)',backgroundColor:'rgba(139,92,246,0.08)',fill:true,tension:.4},
    {label:'Hábitos %',data:last30.map(h=>Math.round(h.habitsDone/h.habitsTotal*100)),borderColor:'rgba(34,197,94,0.8)',backgroundColor:'rgba(34,197,94,0.08)',fill:true,tension:.4},
  ]});
  mkChart('chart-radar','radar',{
    labels:['Espiritual','Profissional','Família','Saúde','LoL','Estudo'],
    datasets:[{label:'Você',data:[
      state.espiritual.checklist.filter(c=>c.done).length/4*100,
      calcMetaPct(state.metas[1]),
      state.casamento.checklist.filter(c=>c.done).length/state.casamento.checklist.length*100,
      parseFloat(state.saude.humor||0)*10,
      state.lol.partidas.length>0?Math.round(state.lol.partidas.filter(p=>p.result==='win').length/state.lol.partidas.length*100):0,
      calcMetaPct(state.metas[0]),
    ],borderColor:'rgba(139,92,246,0.8)',backgroundColor:'rgba(139,92,246,0.15)',pointBackgroundColor:'#8b5cf6'}]
  },{plugins:{legend:{position:'bottom',...CD.plugins.legend}},scales:{r:{ticks:{color:'#64748b',backdropColor:'transparent'},grid:{color:'rgba(255,255,255,0.06)'},pointLabels:{color:'#94a3b8',font:{size:11}}}}});
  renderHeatMap();
}
function renderHeatMap(){
  const el=document.getElementById('heatmap');
  if(!el) return;
  const weeks=13;
  let html='<div style="display:flex;gap:3px;">';
  for(let w=0;w<weeks;w++){
    html+='<div style="display:flex;flex-direction:column;gap:3px;">';
    for(let d=0;d<7;d++){
      const daysAgo=(weeks-1-w)*7+(6-d);
      const dateTarget=new Date();dateTarget.setDate(dateTarget.getDate()-daysAgo);
      const ds=`${String(dateTarget.getDate()).padStart(2,'0')}/${String(dateTarget.getMonth()+1).padStart(2,'0')}/${dateTarget.getFullYear()}`;
      const snap=history.find(h=>h.date===ds);
      let bg='rgba(255,255,255,0.06)';
      if(snap){
        const pct=snap.score/100;
        if(pct>=.8) bg='rgba(34,197,94,0.9)';
        else if(pct>=.5) bg='rgba(34,197,94,0.5)';
        else if(pct>0) bg='rgba(34,197,94,0.2)';
      }
      html+=`<div style="width:14px;height:14px;border-radius:3px;background:${bg};" data-tip="${ds}: ${snap?snap.score+'%':'sem dados'}"></div>`;
    }
    html+='</div>';
  }
  html+='</div>';
  el.innerHTML=html;
}

// ── CONFIG ───────────────────────────────────────────────────
function exportarDados(){
  const blob=new Blob([JSON.stringify({state,history},null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='life-control-backup.json';a.click();
}
function limparDados(){if(confirm('Tem certeza? Todos os dados serão apagados.')){localStorage.removeItem(STORAGE_KEY);localStorage.removeItem(HISTORY_KEY);location.reload();}}

// ── INIT ─────────────────────────────────────────────────────
function init(){
  loadState();
  checkDayReset();
  applyTheme();
  updateBibleDay();
  initGreeting();
  renderRotina();
  renderHabitos();
  renderEspiritual();
  renderTrabalho();
  renderProjetos();
  renderCursos();
  renderLolTreino();
  renderLolHistorico();
  updateLolStats();
  renderCasamento();
  renderSaudeMetas();
  loadSaudeInputs();
  renderMetas();
  updateScore();
  setTimeout(initDashboardCharts,100);
  setInterval(updateClock,30000);
  setInterval(()=>{
    const t=getTodayStr();
    if(state.lastDate&&state.lastDate!==t){checkDayReset();location.reload();}
  },60000);
}
document.addEventListener('DOMContentLoaded',init);
