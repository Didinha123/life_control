// ============================================================
// STATE
// ============================================================
const STORAGE_KEY = 'life-control-diego-v1';
let state = {
  score: 78,
  streak: 12,
  habitos: [
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
  rotina: [
    {hora:'06:30',titulo:'Acordar',obs:'Sem snooze. Levante com intenção.',done:false},
    {hora:'07:00',titulo:'Devocional & Oração',obs:'Bíblia + oração + gratidão',done:false},
    {hora:'08:00',titulo:'Trabalho — Mercado Livre',obs:'Foco total. Pomodoro 50/10.',done:false},
    {hora:'12:00',titulo:'Almoço & Pausa',obs:'Longe do computador.',done:false},
    {hora:'13:00',titulo:'Trabalho — Projetos',obs:'Desenvolvimento e automações.',done:false},
    {hora:'17:30',titulo:'Exercício',obs:'Academia ou caminhada 40min.',done:false},
    {hora:'18:30',titulo:'Família & Esposa',obs:'Tempo de qualidade.',done:false},
    {hora:'19:30',titulo:'Estudos',obs:'Curso Google Planilhas / React.',done:false},
    {hora:'20:10',titulo:'League of Legends',obs:'Máximo 2 partidas. Sem tilt.',done:false},
    {hora:'22:00',titulo:'Desligar o computador',obs:'Sem exceções.',done:false},
    {hora:'22:30',titulo:'Higiene & Wind-down',obs:'Ler livro físico.',done:false},
    {hora:'22:45',titulo:'Dormir',obs:'8h de sono = alta performance.',done:false},
  ],
  espiritual:{
    oracoes:['Família e casamento','Crescimento profissional','Saúde dos pais'],
    gratidao:['Minha esposa','Saúde','Trabalho que amo'],
    checklist:[
      {id:'bib',label:'📖 Leitura da Bíblia',done:false},
      {id:'ora',label:'🙏 Oração',done:false},
      {id:'sab',label:'📝 Lição da Escola Sabatina',done:false},
      {id:'med',label:'🧘 Meditação/Reflexão',done:false},
    ],
    versiculo:'"O Senhor é o meu pastor, nada me faltará." — Sl 23:1',
    livro:'Salmos',cap:'Capítulo 23',pct:34,
  },
  lol:{
    partidas:[],
    daysTilt:5,
  },
  casamento:{
    checklist:[
      {id:'c1',label:'💬 Conversa significativa',done:false},
      {id:'c2',label:'🍽 Refeição juntos',done:false},
      {id:'c3',label:'🙏 Orar juntos',done:false},
      {id:'c4',label:'❤️ Afeto físico intencional',done:false},
      {id:'c5',label:'🎯 Planejar semana juntos',done:false},
      {id:'c6',label:'🎭 Momento de lazer juntos',done:false},
    ],
    datas:[
      {data:'15 Jan',desc:'Aniversário de namoro'},
      {data:'14 Fev',desc:'Dia dos Namorados'},
      {data:'22 Mar',desc:'Aniversário de casamento'},
      {data:'18 Jun',desc:'Aniversário dela'},
    ],
    momentos:[],
  },
  saude:{peso:'',agua:'',sono:'',exercicio:'',passos:'',humor:''},
  metas:[
    {area:'🙏 Espiritual',titulo:'Ler a Bíblia em 1 ano',progresso:34,meta:'365 dias',prioridade:'alta',checklist:['Ler todo dia','Anotar reflexões','Compartilhar aprendizados']},
    {area:'💼 Profissional',titulo:'Dominar Google Planilhas Avançado',progresso:60,meta:'Dez 2026',prioridade:'alta',checklist:['Curso completo','3 projetos reais','Criar template público']},
    {area:'💰 Financeira',titulo:'Reserva de emergência 6 meses',progresso:45,meta:'Dez 2026',prioridade:'alta',checklist:['Controle mensal','Investir 20%','Eliminar dívidas']},
    {area:'🎮 LoL',titulo:'Alcançar Diamante III',progresso:25,meta:'Jun 2026',prioridade:'media',checklist:['60% WR consistente','8+ CS/min','Rotas limpas']},
    {area:'👨‍👩‍👧 Família',titulo:'Viagem de casal',progresso:20,meta:'Jul 2026',prioridade:'media',checklist:['Escolher destino','Reservar hotel','Separar orçamento']},
    {area:'🏋️ Saúde',titulo:'Atingir 75kg com definição',progresso:50,meta:'Set 2026',prioridade:'media',checklist:['Treinar 5x/semana','Dieta proteica','Monitorar semanalmente']},
  ],
  projetos:[
    {nome:'Dashboard SSP29',desc:'Sistema completo de indicadores para a SSP de Gestão.',prog:70,cor:'var(--blue)',checklist:['Conectar API Sheets','Automatizar relatório diário','Dashboard Looker finalizado','Apresentar para gestores'],notas:'Em sprint ativo. Prazo: 30/07'},
    {nome:'Sistema de Controle de Gaiolas',desc:'Controle de estoque e rastreamento de gaiolas via planilha.',prog:45,cor:'var(--gold)',checklist:['Mapeamento de processo','Formulário de entrada/saída','Dashboard de status'],notas:'Aguardando validação do cliente'},
    {nome:'Curso Google Planilhas',desc:'Criação de curso completo do zero ao avançado.',prog:60,cor:'var(--purple)',checklist:['Gravar módulo 1-5','Editar vídeos','Criar materiais PDF','Publicar na plataforma'],notas:'Módulos 1-3 gravados'},
    {nome:'Sistema Igreja Adventista',desc:'Gestão de membros, dízimos e eventos da igreja.',prog:20,cor:'var(--cyan)',checklist:['Levantamento de requisitos','Protótipo no Sheets','Automatizar relatórios mensais'],notas:'Fase inicial'},
    {nome:'Sistema de Psicanálise',desc:'Gestão de pacientes, sessões e pagamentos.',prog:15,cor:'var(--rose)',checklist:['Definir campos necessários','Criar estrutura de dados','Interface do usuário'],notas:'Em planejamento'},
  ],
  cursos:[
    {nome:'Google Planilhas Avançado',plataforma:'Udemy',prog:60,horas:'18/30h'},
    {nome:'React do Zero ao Avançado',plataforma:'Rocketseat',prog:35,horas:'14/40h'},
    {nome:'Power BI Completo',plataforma:'Alura',prog:20,horas:'6/30h'},
  ],
};

function loadState(){
  try{const s=localStorage.getItem(STORAGE_KEY);if(s)state={...state,...JSON.parse(s)};}catch(e){}
}
function saveState(){
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch(e){}
}

// ============================================================
// NAVIGATION
// ============================================================
function nav(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(i=>i.classList.remove('active'));
  const sec=document.getElementById('section-'+id);
  if(sec){sec.classList.add('active');sec.querySelectorAll('.fade-up-d1,.fade-up-d2,.fade-up-d3,.fade-up-d4').forEach(el=>{el.style.animation='none';el.offsetHeight;el.style.animation='';});}
  const navItem=document.querySelector(`.nav-item[onclick="nav('${id}')"]`);
  if(navItem)navItem.classList.add('active');
  const labels={home:'Dashboard',rotina:'Rotina',habitos:'Hábitos',espiritual:'Vida Espiritual',casamento:'Casamento',saude:'Saúde',mercadolivre:'Mercado Livre',projetos:'Projetos',estudos:'Estudos',lol:'League of Legends',metas:'Metas 2026',relatorios:'Relatórios',config:'Configurações'};
  document.getElementById('topbar-breadcrumb').textContent=labels[id]||id;
  // init charts on first visit
  if(id==='dashboard')initDashboardCharts();
  if(id==='habitos')initHabitosChart();
  if(id==='espiritual')initEspiritualChart();
  if(id==='estudos')initEstudosChart();
  if(id==='saude')initSaudeChart();
  if(id==='relatorios')initRelatoriosCharts();
}

function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('collapsed');
  document.getElementById('main').classList.toggle('collapsed');
}

// ============================================================
// GREETING + TIME
// ============================================================
const quotes=[
  "A disciplina constrói o futuro que a motivação apenas imagina.",
  "Cada dia é uma nova oportunidade de ser melhor que ontem.",
  "Consistência é o caminho. Paciência é a velocidade.",
  "Quem planta hoje colhe amanhã. Plante com intenção.",
  "O progresso lento ainda é progresso. Continue.",
  "Sua rotina é a soma de quem você está se tornando.",
  "Feito é melhor que perfeito — mas ótimo é melhor que ambos.",
  "A sua atenção é o seu ativo mais valioso. Invista-a bem.",
  "Disciplina é liberdade. Caos é prisão.",
  "O extraordinário nasce de hábitos ordinários praticados com excelência.",
  "Não espere motivação. Crie momentum.",
  "Pequenas vitórias diárias vencem batalhas grandes.",
  "Você não eleva seu nível no grande momento. Você o revela.",
];

function initGreeting(){
  const h=new Date().getHours();
  let g='Bom dia, Diego ☀️';
  if(h>=12&&h<18)g='Boa tarde, Diego 🌤️';
  else if(h>=18)g='Boa noite, Diego 🌙';
  document.getElementById('greeting-text').textContent=g;
  const d=new Date();
  const dias=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
  const meses=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  document.getElementById('greeting-date').textContent=`${dias[d.getDay()]}, ${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
  document.getElementById('topbar-date').textContent=`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} — ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  const idx=d.getDate()%quotes.length;
  document.getElementById('motivational').textContent=quotes[idx];
}

function updateScore(){
  const done=state.habitos.filter(h=>h.done).length;
  const total=state.habitos.length;
  const pct=Math.round((done/total)*100);
  state.score=pct;
  document.getElementById('score-val').textContent=pct+'%';
  const circle=document.getElementById('score-circle');
  circle.style.strokeDashoffset=314-(314*pct/100);
  document.getElementById('score-bar').style.width=pct+'%';
  document.getElementById('stat-habitos').textContent=`${done}/${total}`;
}

// ============================================================
// ROTINA
// ============================================================
function renderRotina(){
  const el=document.getElementById('rotina-timeline');
  el.innerHTML=state.rotina.map((item,i)=>`
    <div class="tl-item">
      <div class="tl-dot ${item.done?'done':''}"></div>
      <div class="tl-card">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
          <div style="flex:1;">
            <div class="tl-time">${item.hora}</div>
            <div class="tl-title" style="text-decoration:${item.done?'line-through':''};opacity:${item.done?.6:1};">${item.titulo}</div>
            <div class="tl-obs">${item.obs}</div>
          </div>
          <div onclick="toggleRotina(${i})" style="width:28px;height:28px;border-radius:8px;border:2px solid ${item.done?'var(--green)':'var(--border2)'};background:${item.done?'var(--green)':'transparent'};display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:all .2s;">
            ${item.done?'<svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':''}
          </div>
        </div>
      </div>
    </div>
  `).join('');
  renderRotinaPreview();
}

function toggleRotina(i){
  state.rotina[i].done=!state.rotina[i].done;
  saveState();renderRotina();
}

function renderRotinaPreview(){
  const el=document.getElementById('home-rotina-preview');
  if(!el)return;
  const upcoming=state.rotina.filter(r=>!r.done).slice(0,4);
  el.innerHTML=upcoming.map(r=>`
    <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);">
      <span style="font-size:11px;font-weight:600;color:var(--blue2);min-width:42px;">${r.hora}</span>
      <span style="font-size:13px;">${r.titulo}</span>
    </div>
  `).join('')||(upcoming.length===0?'<div style="color:var(--text3);font-size:13px;">Rotina completa hoje! 🎉</div>':'');
}

// ============================================================
// HÁBITOS
// ============================================================
function renderHabitos(){
  const el=document.getElementById('habitos-list');
  el.innerHTML=state.habitos.map((h,i)=>`
    <div onclick="toggleHabito(${i})" style="display:flex;align-items:center;gap:14px;padding:14px 18px;background:${h.done?'rgba(34,197,94,0.06)':'var(--card)'};border:1px solid ${h.done?'rgba(34,197,94,0.25)':'var(--border)'};border-radius:12px;cursor:pointer;transition:all .2s;" onmouseenter="this.style.background='${h.done?'rgba(34,197,94,0.1)':'var(--cardhover)'}'" onmouseleave="this.style.background='${h.done?'rgba(34,197,94,0.06)':'var(--card)'}'">
      <div class="habit-check ${h.done?'done':''}">${h.done?'<svg width="12" height="12" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':''}</div>
      <div style="flex:1;font-size:14px;font-weight:500;text-decoration:${h.done?'line-through':''};opacity:${h.done?.6:1};">${h.label}</div>
      <div class="badge ${h.done?'badge-green':'badge-blue'}">+${h.pts}pts</div>
    </div>
  `).join('');
  renderHabitosPreview();
  updateScore();
  document.getElementById('streak-display').textContent='🔥 '+state.streak;
}

function toggleHabito(i){
  state.habitos[i].done=!state.habitos[i].done;
  saveState();renderHabitos();
  if(state.habitos[i].done)showNotif('✅',`Hábito concluído!`,`+${state.habitos[i].pts} pontos`,'var(--green)');
}

function renderHabitosPreview(){
  const el=document.getElementById('home-habitos-preview');
  if(!el)return;
  el.innerHTML=state.habitos.slice(0,5).map((h,i)=>`
    <div onclick="toggleHabito(${i})" style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer;">
      <div class="habit-check ${h.done?'done':''}" style="width:16px;height:16px;border-radius:4px;">${h.done?'<svg width="10" height="10" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':''}</div>
      <span style="font-size:13px;text-decoration:${h.done?'line-through':''};opacity:${h.done?.6:1};">${h.label}</span>
    </div>
  `).join('');
}

// ============================================================
// ESPIRITUAL
// ============================================================
function renderEspiritual(){
  const c=state.espiritual;
  document.getElementById('biblia-livro').textContent=c.livro;
  document.getElementById('biblia-cap').textContent=c.cap;
  document.getElementById('biblia-pct').textContent=c.pct+'%';
  document.getElementById('biblia-bar').style.width=c.pct+'%';
  document.getElementById('versiculo-fav').textContent=c.versiculo;
  // checklist
  const el=document.getElementById('espiritual-checklist');
  el.innerHTML=c.checklist.map((item,i)=>`
    <div onclick="toggleEspiritual(${i})" style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:${item.done?'rgba(139,92,246,0.08)':'rgba(255,255,255,0.02)'};border:1px solid ${item.done?'rgba(139,92,246,0.25)':'var(--border)'};border-radius:10px;cursor:pointer;transition:all .2s;">
      <div class="habit-check ${item.done?'done':''}" style="${item.done?'background:var(--purple);border-color:var(--purple);':''}">${item.done?'<svg width="12" height="12" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':''}</div>
      <span style="font-size:13px;font-weight:500;text-decoration:${item.done?'line-through':''};opacity:${item.done?.6:1};">${item.label}</span>
    </div>
  `).join('');
  // orações
  const oel=document.getElementById('oracao-list');
  oel.innerHTML=c.oracoes.map((o,i)=>`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:8px;">
      <span style="font-size:13px;">🙏 ${o}</span>
      <span onclick="removeOracao(${i})" style="cursor:pointer;color:var(--text3);font-size:18px;line-height:1;">&times;</span>
    </div>
  `).join('');
  // gratidão
  const gel=document.getElementById('gratidao-list');
  gel.innerHTML=c.gratidao.map((g,i)=>`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:8px;">
      <span style="font-size:13px;">🌟 ${g}</span>
      <span onclick="removeGratidao(${i})" style="cursor:pointer;color:var(--text3);font-size:18px;line-height:1;">&times;</span>
    </div>
  `).join('');
}

function toggleEspiritual(i){state.espiritual.checklist[i].done=!state.espiritual.checklist[i].done;saveState();renderEspiritual();}
function addOracao(){const inp=document.getElementById('oracao-input');if(inp.value.trim()){state.espiritual.oracoes.push(inp.value.trim());inp.value='';saveState();renderEspiritual();}}
function removeOracao(i){state.espiritual.oracoes.splice(i,1);saveState();renderEspiritual();}
function addGratidao(){const inp=document.getElementById('gratidao-input');if(inp.value.trim()){state.espiritual.gratidao.push(inp.value.trim());inp.value='';saveState();renderEspiritual();}}
function removeGratidao(i){state.espiritual.gratidao.splice(i,1);saveState();renderEspiritual();}

// ============================================================
// MERCADO LIVRE KANBAN
// ============================================================
const mlKanban=[
  {col:'📋 Backlog',cor:'var(--text3)',cards:['Atualizar dashboard SSP29','Pesquisar nova automação GAS','Documentar fluxo de gaiolas']},
  {col:'⚡ Em Progresso',cor:'var(--gold)',cards:['Dashboard Looker — SSP29','Script automação relatório diário']},
  {col:'👀 Revisão',cor:'var(--blue)',cards:['Validar dados do mês anterior','Testar formulário de entrada']},
  {col:'✅ Concluído',cor:'var(--green)',cards:['Conectar API Sheets','Criar estrutura base Kanban','Reunião de alinhamento gestores']},
];
function renderMLKanban(){
  const el=document.getElementById('ml-kanban');
  el.innerHTML=mlKanban.map(col=>`
    <div class="kanban-col">
      <div class="kanban-header"><span style="color:${col.cor};">●</span> ${col.col} <span class="badge badge-blue">${col.cards.length}</span></div>
      ${col.cards.map(c=>`<div class="kanban-card"><div style="font-size:13px;">${c}</div></div>`).join('')}
    </div>
  `).join('');
}

// ============================================================
// PROJETOS
// ============================================================
function renderProjetos(){
  const el=document.getElementById('projetos-grid');
  el.innerHTML=state.projetos.map((p,pi)=>`
    <div class="card" style="border-color:${p.cor}22;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px;">
        <div>
          <div style="font-weight:700;font-size:15px;margin-bottom:4px;">${p.nome}</div>
          <div style="font-size:12px;color:var(--text2);">${p.desc}</div>
        </div>
        <div style="font-size:20px;font-weight:800;color:${p.cor};margin-left:12px;flex-shrink:0;">${p.prog}%</div>
      </div>
      <div class="progress-track" style="margin-bottom:14px;"><div class="progress-fill" style="background:${p.cor};width:${p.prog}%;"></div></div>
      <div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;">Checklist</div>
      <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:12px;">
        ${p.checklist.map((c,ci)=>`<div onclick="toggleProjetoCheck(${pi},${ci})" style="display:flex;align-items:center;gap:8px;cursor:pointer;"><div style="width:14px;height:14px;border-radius:4px;border:2px solid ${p.cor};flex-shrink:0;display:flex;align-items:center;justify-content:center;"><svg width="10" height="10" fill="none" stroke="${p.cor}" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span style="font-size:12px;color:var(--text2);">${c}</span></div>`).join('')}
      </div>
      <div style="font-size:11px;color:var(--text3);padding:8px;background:rgba(255,255,255,0.02);border-radius:8px;">📝 ${p.notas}</div>
    </div>
  `).join('');
}
function toggleProjetoCheck(pi,ci){/* just visual feedback */showNotif('✅','Item marcado!','Progresso atualizado','var(--blue)');}

// ============================================================
// CURSOS / ESTUDOS
// ============================================================
function renderCursos(){
  const el=document.getElementById('cursos-list');
  el.innerHTML=state.cursos.map(c=>`
    <div style="padding:12px 14px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:10px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
        <div><div style="font-size:13px;font-weight:600;">${c.nome}</div><div style="font-size:11px;color:var(--text3);">${c.plataforma} • ${c.horas}</div></div>
        <div style="font-weight:700;color:var(--blue2);">${c.prog}%</div>
      </div>
      <div class="progress-track"><div class="progress-fill" style="background:linear-gradient(90deg,var(--purple),var(--blue));width:${c.prog}%;"></div></div>
    </div>
  `).join('');
}

// ============================================================
// LEAGUE OF LEGENDS
// ============================================================
function renderLolTreino(){
  const treinos=[
    {label:'🌾 Farm — CS/min >7',done:false},
    {label:'🌊 Wave Control — Freezar/Slowpush',done:false},
    {label:'🎯 Posicionamento em Team Fight',done:false},
    {label:'🏃 Spacing — Kiting perfeito',done:false},
    {label:'📹 Assistir 1 replay',done:false},
  ];
  const el=document.getElementById('lol-treino-list');
  el.innerHTML=treinos.map((t,i)=>`
    <div onclick="this.querySelector('.habit-check').classList.toggle('done')" style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;cursor:pointer;">
      <div class="habit-check"></div>
      <span style="font-size:13px;">${t.label}</span>
    </div>
  `).join('');
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
  const partida={result,kda,cs,dano,tempo,certo,melhorar,date:new Date().toLocaleDateString('pt-BR')};
  state.lol.partidas.unshift(partida);
  ['lol-kda','lol-cs','lol-dano','lol-tempo','lol-certo','lol-melhorar'].forEach(id=>document.getElementById(id).value='');
  saveState();renderLolHistorico();updateLolStats();
  const msg=state.lol.partidas.filter(p=>p.date===partida.date).length>=2?'Treino encerrado. Evolução vem da consistência.':'Partida registrada!';
  showNotif(result==='win'?'🏆':'😤',result==='win'?'Vitória!':'Derrota registrada.',msg,result==='win'?'var(--green)':'var(--rose)');
}

function renderLolHistorico(){
  const el=document.getElementById('lol-historico');
  if(!state.lol.partidas.length){el.innerHTML='<div style="color:var(--text3);font-size:13px;text-align:center;padding:20px;">Nenhuma partida registrada ainda.</div>';return;}
  el.innerHTML=state.lol.partidas.slice(0,10).map(p=>`
    <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--border);">
      <div style="width:32px;height:32px;border-radius:8px;background:${p.result==='win'?'rgba(34,197,94,0.15)':'rgba(244,63,94,0.15)'};display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">${p.result==='win'?'🏆':'💀'}</div>
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:600;color:${p.result==='win'?'var(--green)':'var(--rose)'};">${p.result==='win'?'Vitória':'Derrota'} — ${p.kda} KDA</div>
        <div style="font-size:11px;color:var(--text3);">${p.cs?p.cs+' CS/min':''} ${p.tempo?'• '+p.tempo:''} • ${p.date}</div>
        ${p.certo?`<div style="font-size:11px;color:var(--green);margin-top:2px;">✓ ${p.certo}</div>`:''}
        ${p.melhorar?`<div style="font-size:11px;color:var(--gold);margin-top:1px;">⚠ ${p.melhorar}</div>`:''}
      </div>
    </div>
  `).join('');
}

function updateLolStats(){
  const p=state.lol.partidas;
  document.getElementById('lol-partidas-semana').textContent=p.length;
  const wins=p.filter(x=>x.result==='win').length;
  document.getElementById('lol-wr').textContent=p.length?Math.round(wins/p.length*100)+'%':'--';
  const csVals=p.filter(x=>x.cs).map(x=>parseFloat(x.cs));
  document.getElementById('lol-farm').textContent=csVals.length?(csVals.reduce((a,b)=>a+b,0)/csVals.length).toFixed(1):'0';
}

// ============================================================
// CASAMENTO
// ============================================================
function renderCasamento(){
  const c=state.casamento;
  const el=document.getElementById('casamento-checklist');
  el.innerHTML=c.checklist.map((item,i)=>`
    <div onclick="toggleCasamento(${i})" style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:${item.done?'rgba(244,114,182,0.06)':'rgba(255,255,255,0.02)'};border:1px solid ${item.done?'rgba(244,114,182,0.25)':'var(--border)'};border-radius:10px;cursor:pointer;transition:all .2s;">
      <div class="habit-check ${item.done?'done':''}" style="${item.done?'background:#f472b6;border-color:#f472b6;':''}">${item.done?'<svg width="12" height="12" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':''}</div>
      <span style="font-size:13px;text-decoration:${item.done?'line-through':''};opacity:${item.done?.6:1};">${item.label}</span>
    </div>
  `).join('');
  const del=document.getElementById('casamento-datas');
  del.innerHTML=c.datas.map(d=>`
    <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:10px;">
      <div style="font-size:12px;font-weight:700;color:#f472b6;min-width:48px;">${d.data}</div>
      <div style="font-size:13px;">${d.desc}</div>
    </div>
  `).join('');
  const mel=document.getElementById('momentos-list');
  mel.innerHTML=c.momentos.slice(0,5).map(m=>`
    <div style="padding:10px 14px;background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:10px;">
      <div style="font-size:12px;color:var(--text3);margin-bottom:4px;">${m.date}</div>
      <div style="font-size:13px;">${m.text}</div>
    </div>
  `).join('');
}
function toggleCasamento(i){state.casamento.checklist[i].done=!state.casamento.checklist[i].done;saveState();renderCasamento();}
function salvarMomento(){
  const t=document.getElementById('momentos-text').value.trim();
  if(!t)return;
  state.casamento.momentos.unshift({text:t,date:new Date().toLocaleDateString('pt-BR')});
  document.getElementById('momentos-text').value='';
  saveState();renderCasamento();showNotif('💝','Momento salvo!','','#f472b6');
}

// ============================================================
// SAÚDE
// ============================================================
function salvarSaude(){
  ['peso','agua','sono','exercicio','passos','humor'].forEach(k=>{
    const v=document.getElementById('saude-'+k).value;
    if(v)state.saude[k]=v;
  });
  saveState();renderSaudeMetas();
}

function renderSaudeMetas(){
  const metas=[
    {label:'💧 Água',val:state.saude.agua||0,meta:2000,unidade:'ml',cor:'var(--cyan)'},
    {label:'😴 Sono',val:state.saude.sono||0,meta:8,unidade:'h',cor:'var(--purple2)'},
    {label:'🏋️ Exercício',val:state.saude.exercicio||0,meta:45,unidade:'min',cor:'var(--green)'},
    {label:'👟 Passos',val:state.saude.passos||0,meta:10000,unidade:'',cor:'var(--blue2)'},
  ];
  const el=document.getElementById('saude-metas');
  el.innerHTML=metas.map(m=>`
    <div>
      <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;">
        <span>${m.label}</span>
        <span style="color:var(--text2);">${m.val}${m.unidade} / ${m.meta}${m.unidade}</span>
      </div>
      <div class="progress-track"><div class="progress-fill" style="background:${m.cor};width:${Math.min(100,Math.round(m.val/m.meta*100))}%;"></div></div>
    </div>
  `).join('');
}

function loadSaudeInputs(){
  ['peso','agua','sono','exercicio','passos','humor'].forEach(k=>{
    const el=document.getElementById('saude-'+k);
    if(el&&state.saude[k])el.value=state.saude[k];
  });
}

// ============================================================
// METAS
// ============================================================
function renderMetas(){
  const el=document.getElementById('metas-grid');
  el.innerHTML=state.metas.map((m,mi)=>`
    <div class="card">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;">
        <div>
          <div style="font-size:11px;color:var(--text3);font-weight:600;letter-spacing:.05em;margin-bottom:4px;">${m.area}</div>
          <div style="font-size:15px;font-weight:700;">${m.titulo}</div>
        </div>
        <div class="badge ${m.prioridade==='alta'?'badge-rose':m.prioridade==='media'?'badge-gold':'badge-blue'}">${m.prioridade}</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
        <div style="flex:1;"><div class="progress-track"><div class="progress-fill" style="background:linear-gradient(90deg,var(--blue),var(--purple));width:${m.progresso}%;"></div></div></div>
        <div style="font-size:14px;font-weight:700;color:var(--blue2);min-width:36px;">${m.progresso}%</div>
      </div>
      <div style="font-size:11px;color:var(--text3);margin-bottom:8px;">📅 Meta: ${m.meta}</div>
      <div style="display:flex;flex-direction:column;gap:5px;">
        ${m.checklist.map(c=>`<div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text2);"><span style="color:var(--blue);">→</span>${c}</div>`).join('')}
      </div>
    </div>
  `).join('');
}

// ============================================================
// NOTIFICATIONS
// ============================================================
function showNotif(icon,title,msg,color='var(--blue)'){
  document.getElementById('notif-icon').innerHTML=`<div style="font-size:20px;">${icon}</div>`;
  document.getElementById('notif-title').textContent=title;
  document.getElementById('notif-msg').textContent=msg;
  const n=document.getElementById('notif');
  n.classList.add('show');
  setTimeout(()=>n.classList.remove('show'),3000);
}

// ============================================================
// CHARTS
// ============================================================
const chartDefaults={
  plugins:{legend:{labels:{color:'#94a3b8',font:{family:'Inter',size:11}}}},
  scales:{x:{ticks:{color:'#64748b',font:{size:10}},grid:{color:'rgba(255,255,255,0.04)'}},y:{ticks:{color:'#64748b',font:{size:10}},grid:{color:'rgba(255,255,255,0.04)'}}}
};
let charts={};
function mkChart(id,type,data,opts={}){
  if(charts[id])charts[id].destroy();
  const ctx=document.getElementById(id);
  if(!ctx)return;
  charts[id]=new Chart(ctx,{type,data,options:{responsive:true,maintainAspectRatio:false,...chartDefaults,...opts}});
}

function initDashboardCharts(){
  mkChart('chart-semana','bar',{
    labels:['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
    datasets:[
      {label:'Produtivo',data:[7,8,6,9,7,4,2],backgroundColor:'rgba(59,130,246,0.7)',borderRadius:6},
      {label:'Estudo',data:[1.5,2,1,2,2,1,0],backgroundColor:'rgba(139,92,246,0.7)',borderRadius:6},
      {label:'LoL',data:[1,1.5,2,0.5,1,2,1],backgroundColor:'rgba(245,158,11,0.6)',borderRadius:6},
    ]
  },{plugins:{legend:{position:'bottom',...chartDefaults.plugins.legend}}});

  mkChart('chart-pizza','doughnut',{
    labels:['Trabalho','Estudo','LoL','Família','Espiritual','Exercício'],
    datasets:[{data:[38,12,8,18,8,7],backgroundColor:['rgba(59,130,246,0.8)','rgba(139,92,246,0.8)','rgba(245,158,11,0.8)','rgba(244,114,182,0.8)','rgba(168,85,247,0.8)','rgba(34,197,94,0.8)'],borderWidth:0,hoverOffset:6}]
  },{plugins:{legend:{position:'right',...chartDefaults.plugins.legend}},cutout:'65%'});
}

function initHabitosChart(){
  mkChart('chart-habitos-semana','bar',{
    labels:['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
    datasets:[{label:'Hábitos concluídos',data:[9,8,7,9,6,5,8],backgroundColor:'rgba(34,197,94,0.7)',borderRadius:6,borderSkipped:false}]
  },{scales:{...chartDefaults.scales,y:{...chartDefaults.scales.y,max:9}}});
}

function initEspiritualChart(){
  mkChart('chart-espiritual','line',{
    labels:['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
    datasets:[{label:'Itens espirituais',data:[4,3,4,4,3,4,4],borderColor:'rgba(139,92,246,0.8)',backgroundColor:'rgba(139,92,246,0.1)',fill:true,tension:.4,pointBackgroundColor:'#8b5cf6'}]
  },{scales:{...chartDefaults.scales,y:{...chartDefaults.scales.y,max:4}}});
}

function initEstudosChart(){
  mkChart('chart-estudos','bar',{
    labels:['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
    datasets:[{label:'Horas estudadas',data:[1.5,2,1,2,2,1.5,1.5],backgroundColor:'rgba(139,92,246,0.7)',borderRadius:6}]
  });
}

function initSaudeChart(){
  mkChart('chart-saude','line',{
    labels:['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
    datasets:[
      {label:'Sono (h)',data:[7,7.5,6.5,8,7,6,8],borderColor:'rgba(139,92,246,0.8)',backgroundColor:'rgba(139,92,246,0.08)',fill:true,tension:.4,yAxisID:'y'},
      {label:'Peso (kg)',data:[76,75.8,75.9,75.7,75.5,75.6,75.4],borderColor:'rgba(34,197,94,0.8)',backgroundColor:'transparent',tension:.4,yAxisID:'y1'},
    ]
  },{scales:{x:{ticks:{color:'#64748b'},grid:{color:'rgba(255,255,255,0.04)'}},y:{ticks:{color:'#64748b'},grid:{color:'rgba(255,255,255,0.04)'},position:'left'},y1:{ticks:{color:'#64748b'},grid:{display:false},position:'right'}}});
}

function initRelatoriosCharts(){
  mkChart('chart-mensal','line',{
    labels:['Jan','Fev','Mar','Abr','Mai','Jun'],
    datasets:[
      {label:'Estudo',data:[30,38,42,40,48,52],borderColor:'rgba(139,92,246,0.8)',backgroundColor:'rgba(139,92,246,0.08)',fill:true,tension:.4},
      {label:'Produtivo',data:[140,155,160,148,175,180],borderColor:'rgba(59,130,246,0.8)',backgroundColor:'rgba(59,130,246,0.08)',fill:true,tension:.4},
    ]
  });

  mkChart('chart-radar','radar',{
    labels:['Espiritual','Profissional','Família','Saúde','LoL','Estudo'],
    datasets:[{label:'Você',data:[80,75,70,65,60,72],borderColor:'rgba(139,92,246,0.8)',backgroundColor:'rgba(139,92,246,0.15)',pointBackgroundColor:'#8b5cf6'}]
  },{plugins:{legend:{position:'bottom',...chartDefaults.plugins.legend}},scales:{r:{ticks:{color:'#64748b',backdropColor:'transparent'},grid:{color:'rgba(255,255,255,0.06)'},pointLabels:{color:'#94a3b8',font:{size:11}}}}});

  renderHeatMap();
}

function renderHeatMap(){
  const el=document.getElementById('heatmap');
  const weeks=12;
  const days=['D','S','T','Q','Q','S','S'];
  let html='<div style="display:flex;gap:3px;">';
  for(let w=0;w<weeks;w++){
    html+='<div style="display:flex;flex-direction:column;gap:3px;">';
    for(let d=0;d<7;d++){
      const v=Math.random();
      const opacity=v<.3?'.15':v<.6?'.4':v<.85?'.7':'1';
      const color=v<.3?'rgba(255,255,255,'+opacity+')':'rgba(34,197,94,'+opacity+')';
      html+=`<div style="width:14px;height:14px;border-radius:3px;background:${color};cursor:default;" data-tip="Semana ${w+1}, ${days[d]}"></div>`;
    }
    html+='</div>';
  }
  html+='</div>';
  el.innerHTML=html;
}

// ============================================================
// CONFIG UTILS
// ============================================================
function exportarDados(){
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='life-control-backup.json';a.click();
}
function limparDados(){if(confirm('Tem certeza? Todos os dados serão apagados.')){localStorage.removeItem(STORAGE_KEY);location.reload();}}

// ============================================================
// CLOCK
// ============================================================
function updateClock(){
  const d=new Date();
  document.getElementById('topbar-date').textContent=`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} — ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

// ============================================================
// INIT
// ============================================================
function init(){
  loadState();
  initGreeting();
  renderRotina();
  renderHabitos();
  renderEspiritual();
  renderMLKanban();
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
  // init dashboard charts since it's the home
  setTimeout(initDashboardCharts,100);
  setInterval(updateClock,30000);
}
document.addEventListener('DOMContentLoaded',init);
