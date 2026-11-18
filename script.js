
// ---------- Ajustes personales (se pueden cambiar) ----------
const NOMBRE = "";                                   // por ejemplo "Abuelo" o su nombre: sale en los mensajes de felicitación
const FICHAS = "emoji";                              // "emoji" (dibujos: sol, luna, barco, cerveza...) o "chino" (puntos tipo dominó y símbolos chinos)
const FAVORITOS = ["🍺","🍷","🐶","⛵","☀️","🌙"];      // (solo con emoji) estos emoticonos salen siempre en los tableros
const DESCANSO_MIN = 30;                             // cada cuántos minutos se le sugiere descansar (solo al terminar un nivel)

// ---------- Fichas ----------
// Dos juegos de fichas: "emoji" (dibujos) o "chino" (puntos tipo dominó y símbolos chinos).
// Se elige con FICHAS (arriba) o abriendo el juego con ?fichas=chino  /  ?fichas=emoji
const MODO = (typeof location !== "undefined" && new URLSearchParams(location.search).get("fichas")) || FICHAS;
const CHINO = MODO === "chino";

// Emoticonos (los más reconocibles primero; cada pareja del tablero usa uno distinto)
// Un "!" al final añade el selector de emoji (para que salga en color y no como letra negra)
const EMOJIS = ("☀! 🌙 ⛵ 🍺 🍷 🐶 🍕 ⭐ 🌈 ❤! 🍎 🐱 🚗 🎂 ☕ 🌹 🐟 🏠 🔔 🎁 " +
  "🍔 🍦 🍌 🍇 🍉 🍊 🍓 🐴 🐮 🐷 🐑 🐔 🦆 🐦 🦋 🐝 🌻 🌷 🌴 🍀 " +
  "🍄 🌲 🍁 🌊 ⛰! 🔥 💧 ❄! ☁! ⚡ 🥂 🍸 🍹 🍾 🥛 🍵 " +
  "🍟 🌭 🥪 🌮 🍝 🍣 🍤 🍗 🥩 🥓 🍳 🥐 🍞 🧀 🥗 🍰 🍩 🍪 🍫 🍿 " +
  "🥖 🍜 🍚 🍒 🍑 🍐 🍍 🥝 🍋 🥕 🌽 🍅 🥑 🥔 🍆 🥒 🥜 🌰 🍯 🥚 " +
  "🐢 🐘 🦁 🐯 🐻 🐼 🐵 🐸 🐰 🦊 🐌 🐙 🦀 🐬 🐳 🦉 🐧 🐨 🐭 🐞 🐍 🐊 🦈 🦅 🐿! 🐪 " +
  "🚢 🚲 🚂 ✈! 🚜 ⚓ 🚌 🚀 🛵 🚁 🚒 🛶 🏰 ⛪ " +
  "⚽ 🎣 🎲 🎵 🎸 🎺 🎈 🔑 📻 📺 ☎! ⌚ 👓 🎩 👑 💎 🏆 ⏰ 🕯! ✂! 🔨 📖 🎯 🃏 🔭 🏀 🎾 🎳 ⛳ 🥁 🎻 🎹 " +
  "💡 📷 ☂! 🎒 👟 👜 💍 🔦 🔒 💰 ✏! 📎 🏺 🥞 🍭 🍬 🥫 🍈 🌵 🌺 🌼 ⛄ 🍂 🐠 🌍 🥃")
  .split(/\s+/).map(e => e.endsWith("!") ? e.slice(0,-1) + "\uFE0F" : e);

// Fichas chinas: 36 de puntos (estilo dominó: 1-6 puntos en 6 colores) + 114 símbolos chinos = 150 tipos
const DOTS = [[[30,40]],[[30,22],[30,58]],[[16,20],[30,40],[44,60]],[[18,24],[42,24],[18,56],[42,56]],
  [[18,24],[42,24],[30,40],[18,56],[42,56]],[[18,18],[42,18],[18,40],[42,40],[18,62],[42,62]]];
const DCOL = ["#d62828","#1f5fbf","#1e8e3e","#8e44ad","#e08a00","#0e9aa7"];
const FULL = "一二三四五六七八九十東南西北中發白福祿壽喜財梅蘭菊竹春夏秋冬金木水火土山川日月星雲風雨雪花龍鳳虎龜魚馬牛羊鳥象人口手心耳足女子大小天地愛和平安樂美王光門車田米石力寶左右上下前後內外年時分半多少長高家國學書友老新紅黃綠藍黑開關飛笑";
const SIMPLE = "一二三四五六七八九十人口大小土山川日月木水火手心子女天中王力北白田石米左右上下外半友耳足車門光平安和美年分少多前後內金東南西雲雨風雪花星地";
const CHARS = [...SIMPLE, ...[...FULL].filter(c => !SIMPLE.includes(c))];      // de los más sencillos a los más complicados
const CCOL = ["#c62828","#1f5fbf","#1e8e3e","#8e44ad","#d35400","#222"];
function faceChino(i){
  if (i < 36){
    const c = DCOL[Math.floor(i/6)], d = DOTS[i%6], r = d.length === 1 ? 15 : 9;
    return `<svg viewBox="0 0 60 80" style="width:66%;height:auto">` + d.map(p =>
      `<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${c}"/><circle cx="${p[0]}" cy="${p[1]}" r="${r*.45}" fill="#fffdf5" opacity=".6"/>`).join("") + `</svg>`;
  }
  const k = i - 36;
  return `<b style="color:${CCOL[k%6]}">${CHARS[k]}</b>`;
}

const NTYPES = CHINO ? 150 : EMOJIS.length;
function face(i){ return CHINO ? faceChino(i) : `<b class="em">${EMOJIS[i]}</b>`; }
const norm = e => e.replace(/\uFE0F/g, "");
const FAV = CHINO ? [] : FAVORITOS.map(f => EMOJIS.findIndex(e => norm(e) === norm(f))).filter(i => i >= 0);
// Orden de preferencia de los tipos: los más fáciles de reconocer primero (los favoritos, si hay, los primeros)
const ORDER = [];
if (CHINO){ const dots = [...Array(36).keys()].sort((a,b) => a%6 - b%6 || a-b); let d = 0, c = 0;     // puntos y símbolos mezclados, de sencillos a complicados
  for (let i=0;i<NTYPES;i++) ORDER.push(d < 36 && d*NTYPES <= i*36 ? dots[d++] : 36 + c++); }
else ORDER.push(...FAV, ...[...Array(NTYPES).keys()].filter(i => !FAV.includes(i)));

// ---------- Formas ----------
// Cada forma = lista de piezas ["h", filas, ox, oy] o ["p", filas, ox, oy, capas]
//  "h" (alturas): cada dígito = cuántas fichas se apilan en ese hueco; "." vacío; ">" al principio = fila desplazada media ficha
//  "p" (pirámide): capas que se apoyan a medias sobre 4 fichas de la capa de abajo
//  ox, oy = posición de la pieza en fichas (admite .5). Varias piezas separadas = "islas".
const R = (w,h) => Array(h).fill("#".repeat(w));
const H = (rows,ox=0,oy=0) => ["h",rows,ox,oy,0];
const P = (rows,depth,ox=0,oy=0) => ["p",rows,ox,oy,depth];
const MUNDO = ["..###..",".#####.","#######","#######","#######",".#####.","..###.."];
const CORAZON = [".##.##.","#######","#######",".#####.","..###..","...#..."];
const FLOR = [".2.","232",".2."];
const TORRE = ["333","333","333"];
const ANILLO = ["22222222","2......2","2......2","2......2","2......2","2......2","2......2","2......2","22222222"];
const PATS = [
 ["Cuatro islas",[H(["11.11","11.11",".....","11.11","11.11"])]],
 ["Cruz",[H(["..1..","..2..","12321","..2..","..1.."])]],
 ["Escalera",[H(["1","21","321","4321"])]],
 ["Rombo",[H(["...1...","..111..",".11111.","1111111",".11111.","..111..","...1..."])]],
 ["Dos torres",[H(["22..22","22..22","22..22"])]],
 ["Fortaleza",[H(["1111111","1.....1","1.222.1","1.222.1","1.....1","1111111"])]],
 ["Tres piramides",[P(R(3,3),3,0,0),P(R(3,3),3,4,0),P(R(3,3),3,2,3.5)]],
 ["Serpiente",[H(["222222",".....2","222222","2.....","222222"])]],
 ["Cuatro flores",[H(FLOR,0,0),H(FLOR,4,0),H(FLOR,0,4),H(FLOR,4,4)]],
 ["Corazon",[P(CORAZON,3)]],
 ["Mariposa",[P(R(3,4),2,0,.5),P(R(3,4),2,4,.5),H(["1","2","3","2","1"],3,0)]],
 ["Abeto",[H(["...2...","..232..",".23432.","2345432","...2...","...2..."])]],
 ["Ajedrez",[H(["212121","121212","212121","121212","212121","121212"])]],
 ["Castillo",[H(["33.11.33","33....33","1......1","1......1","33....33","33.11.33"])]],
 ["Muro",[H(["22222",">22222","22222",">22222","22222",">22222"])]],
 ["Hongo",[H([".12321.","1234321","1234321",".12321.","...2...","...2...","...2..."])]],
 ["Reloj de arena",[H(["2222222",".22222.","..222..","...2...","..222..",".22222.","2222222"])]],
 ["Muralla",[H(["2222222","2.....2","2.....2","2.....2","2.....2","2.....2","2222222"]),P(R(3,3),3,2,2)]],
 ["Piramide alta",[P(R(5,6),5)]],
 ["Mundo",[P(MUNDO,4)]],
 ["Cuatro piramides",[P(R(3,4),3,0,0),P(R(3,4),3,4,0),P(R(3,4),3,0,5),P(R(3,4),3,4,5)]],
 ["Piramide ancha",[P(R(6,7),3)]],
 ["Gran muralla",[H(ANILLO),P(R(4,5),3,2,2)]],
 ["Gran piramide",[P(R(6,8),3)]],
 ["Ajedrez alto",[H(["323232","232323","323232","232323","323232","232323","323232","232323"])]],
 ["Cuatro torres altas",[H(TORRE,0,0),H(TORRE,4,0),H(TORRE,0,4),H(TORRE,4,4)]],
 ["Bloque alto",[H(Array(7).fill("3333333"))]],
 ["Piramide gigante",[P(R(7,8),4)]],
 ["Bloque muy alto",[H(Array(6).fill("4444444"))]]
];

function stackP(mask, depth){
  let cur = [];
  mask.forEach((row,r) => [...row].forEach((ch,c) => { if (ch === "#") cur.push([2*c, 2*r]); }));
  const all = [];
  for (let z=0; z<depth && cur.length; z++){
    cur.forEach(p => all.push({x:p[0], y:p[1], z, alive:true}));
    const set = new Set(cur.map(p => p[0]+","+p[1]));
    cur = cur.filter(p => set.has((p[0]+2)+","+p[1]) && set.has(p[0]+","+(p[1]+2)) && set.has((p[0]+2)+","+(p[1]+2))).map(p => [p[0]+1, p[1]+1]);
  }
  return all;
}
function patTiles(pat){
  const out = [];
  for (const [k,rows,ox,oy,depth] of pat[1]){
    const X = Math.round(2*ox), Y = Math.round(2*oy);
    if (k === "h") rows.forEach((row,r) => {
      let sh = 0, str = row; if (str[0] === ">"){ sh = 1; str = str.slice(1); }
      [...str].forEach((ch,c) => { if (ch >= "1" && ch <= "9") for (let z=0; z<+ch; z++) out.push({x:X+2*c+sh, y:Y+2*r, z, alive:true}); });
    });
    else stackP(rows,depth).forEach(t => out.push({x:t.x+X, y:t.y+Y, z:t.z, alive:true}));
  }
  return out;
}
const PSTAT = PATS.map(p => {
  const t = patTiles(p), mx = Math.max(...t.map(q => q.x)), my = Math.max(...t.map(q => q.y));
  return {n: t.length - t.length%2, mx, my, w:(mx+2)/2, h:(my+2)/2};
});

// ---------- Formas nuevas: 24 figuras que se adaptan al tamaño + 26 letras (A-Z) ----------
// Se desbloquean más adelante: grupo 1 desde el nivel 30, grupo 2 desde el 100 y las letras desde el 200.
const FONT = {
 A:".###.|#...#|#...#|#####|#...#|#...#|#...#", B:"####.|#...#|#...#|####.|#...#|#...#|####.",
 C:".###.|#...#|#....|#....|#....|#...#|.###.", D:"####.|#...#|#...#|#...#|#...#|#...#|####.",
 E:"#####|#....|#....|####.|#....|#....|#####", F:"#####|#....|#....|####.|#....|#....|#....",
 G:".###.|#...#|#....|#.###|#...#|#...#|.####", H:"#...#|#...#|#...#|#####|#...#|#...#|#...#",
 I:"#####|..#..|..#..|..#..|..#..|..#..|#####", J:"..###|...#.|...#.|...#.|...#.|#..#.|.##..",
 K:"#...#|#..#.|#.#..|##...|#.#..|#..#.|#...#", L:"#....|#....|#....|#....|#....|#....|#####",
 M:"#...#|##.##|#.#.#|#.#.#|#...#|#...#|#...#", N:"#...#|##..#|#.#.#|#..##|#...#|#...#|#...#",
 O:".###.|#...#|#...#|#...#|#...#|#...#|.###.", P:"####.|#...#|#...#|####.|#....|#....|#....",
 Q:".###.|#...#|#...#|#...#|#.#.#|#..#.|.##.#", R:"####.|#...#|#...#|####.|#.#..|#..#.|#...#",
 S:".####|#....|#....|.###.|....#|....#|####.", T:"#####|..#..|..#..|..#..|..#..|..#..|..#..",
 U:"#...#|#...#|#...#|#...#|#...#|#...#|.###.", V:"#...#|#...#|#...#|#...#|#...#|.#.#.|..#..",
 W:"#...#|#...#|#...#|#.#.#|#.#.#|##.##|#...#", X:"#...#|#...#|.#.#.|..#..|.#.#.|#...#|#...#",
 Y:"#...#|#...#|.#.#.|..#..|..#..|..#..|..#..", Z:"#####|....#|...#.|..#..|.#...|#....|#####"
};
// Figuras definidas por una fórmula: u, v van de -1 a 1 (v=-1 arriba); x, y = columna y fila
const MOTIF = {
 "Disco":(u,v)=>u*u+v*v<=1, "Diamante":(u,v)=>Math.abs(u)+Math.abs(v)<=1, "Cojin":(u,v)=>u**4+v**4<=1,
 "Octogono":(u,v)=>Math.abs(u)+Math.abs(v)<=1.5, "Cuadrado":()=>true,
 "Marco":(u,v)=>Math.max(Math.abs(u),Math.abs(v))>=.5, "Cruz ancha":(u,v)=>Math.abs(u)<=.4||Math.abs(v)<=.4,
 "Anillo":(u,v)=>{const r=Math.hypot(u,v);return r<=1&&r>=.5}, "Reloj":(u,v)=>Math.abs(u)<=.15+.85*Math.abs(v),
 "Triangulo":(u,v)=>Math.abs(u)<=(v+1)/2, "Arco":(u,v)=>v>=-.2||u*u+((v+.2)/.8)**2<=1,
 "Casa":(u,v)=>v>=-.1?Math.abs(u)<=.85:Math.abs(u)<=(v+1)/.9,
 "Estrella":(u,v)=>Math.abs(u)**.6+Math.abs(v)**.6<=1, "Aspa":(u,v)=>Math.abs(Math.abs(u)-Math.abs(v))<=.3,
 "Diana":(u,v)=>{const r=Math.hypot(u,v);return r<=.3||(r>=.55&&r<=.8)}, "Pajarita":(u,v)=>Math.abs(v)<=.15+.85*Math.abs(u),
 "Corazon grande":(u,v)=>{const x=u*1.2,y=-v*1.1+.2;return (x*x+y*y-1)**3-x*x*y**3<=0},
 "Arbol":(u,v)=>v<.45?u*u+((v+.2)/.8)**2<=1:Math.abs(u)<=.16, "Luna":(u,v)=>u*u+v*v<=1&&(u-.5)**2+v*v>.55,
 "Flor":(u,v)=>[[.5,0],[-.5,0],[0,.5],[0,-.5],[0,0]].some(([a,b])=>(u-a)**2+(v-b)**2<=.28),
 "Rayas":(u,v,x)=>x%3!==2, "Archipielago":(u,v,x,y)=>x%4!==3&&y%4!==3,
 "Chevron":(u,v,x,y,W)=>Math.floor(y+Math.abs(x-(W-1)/2))%4<3, "Triangulo invertido":(u,v)=>Math.abs(u)<=(1-v)/2
};
const GROUP1 = ["Disco","Diamante","Cojin","Octogono","Cuadrado","Marco","Cruz ancha","Anillo","Reloj","Triangulo","Arco","Casa"];
const GROUP2 = ["Estrella","Aspa","Diana","Pajarita","Corazon grande","Arbol","Luna","Flor","Rayas","Archipielago","Chevron","Triangulo invertido"];
const maskOf = (name, W, Hh) => { const f = MOTIF[name], rows = [];
  for (let y=0;y<Hh;y++){ let r = ""; for (let x=0;x<W;x++) r += f((x-(W-1)/2)/(W/2), (y-(Hh-1)/2)/(Hh/2), x, y, W) ? "#" : "."; rows.push(r); }
  return rows; };
// Terrazas: cada hueco sube un escalón por cada "anillo" que hay hasta el borde de la figura (queda una pirámide escalonada simétrica)
function terrace(mask, maxH){
  const cur0 = new Set(); mask.forEach((row,y) => [...row].forEach((c,x) => { if (c === "#") cur0.add(x+","+y); }));
  const h = new Map(); let cur = cur0;
  for (let i=1; i<=maxH && cur.size; i++){
    cur.forEach(k => h.set(k, i));
    const nxt = new Set();
    cur.forEach(k => { const [x,y] = k.split(",").map(Number); let ok = true;
      for (let dx=-1; dx<=1 && ok; dx++) for (let dy=-1; dy<=1; dy++) if (!cur.has((x+dx)+","+(y+dy))){ ok = false; break; }
      if (ok) nxt.add(k); });
    cur = nxt;
  }
  return mask.map((row,y) => [...row].map((c,x) => c === "#" ? String(h.get(x+","+y) || 1) : ".").join(""));
}
let CATALOG = null;
function catalog(asp){
  if (CATALOG) return CATALOG;
  const list = [];
  const add = (name, group, w, h, layers, n, get) => list.push({name, group, w, h, layers, n: n - n%2, get});
  // Pirámide escalonada a partir de una silueta: cada capa nueva se coloca a medias sobre 4 fichas de la de abajo,
  // así de cada capa de abajo se sigue viendo una parte (el aro de fuera) y se va "conquistando" hacia abajo
  const pyr = (name, group, mask, W, Hh) => {
    const cnt = []; stackP(mask, 14).forEach(t => cnt[t.z] = (cnt[t.z] || 0) + 1);
    let n = 0;
    for (let k=1; k<=cnt.length; k++){ n += cnt[k-1]; if (k >= 2) add(name, group, W, Hh, k, n, () => [P(mask, k)]); }
  };
  [[1,GROUP1],[2,GROUP2]].forEach(([g,names]) => names.forEach(m => { for (let W=4; W<=11; W++){
    const Hh = Math.max(4, Math.round(W*asp)), mask = maskOf(m, W, Hh);
    if (mask.join("").split("#").length - 1 < 8) continue;
    pyr(m, g, mask, W, Hh);
  } }));
  Object.keys(FONT).forEach(ch => { const bm = FONT[ch].split("|");
    const big = bm.flatMap(row => { const r = row.replace(/./g, c => c.repeat(2)); return [r, r]; });      // letra a doble tamaño (trazo de 2)
    pyr("Letra " + ch, 3, big, 10, 14);
    for (const [sc,hs] of [[1,[2,3,4,5]],[2,[2,3,4]]]) for (const hh of hs){
      const rows = bm.flatMap(row => { const r = [...row].map(c => c === "#" ? String(hh) : ".").join("").replace(/./g, c => c.repeat(sc)); return Array(sc).fill(r); });
      add("Letra " + ch, 3, 5*sc, 7*sc, hh, [...rows.join("")].reduce((a,c) => a + (c === "." ? 0 : +c), 0), () => [H(rows)]);
    }
  });
  return CATALOG = list;
}

// ---------- Curva de dificultad ----------
// Fichas: +2 por nivel hasta el 60 (134 fichas); después sube cada vez más despacio hasta el tope de 300 (hacia el nivel 1000)
const MAXTILES = 300;
const target = L => { const t = L <= 60 ? 16 + 2*(L-1) : Math.round(134 + (MAXTILES-134)*(1 - Math.exp(-(L-60)/204))); return Math.min(MAXTILES, t - t%2); };
// Dificultad (0-100) = 30% nº de fichas + 25% nº de tipos (todos distintos) + 45% estructura (fichas enterradas y capas)
const Dof = (n, nt, S) => 30*n/MAXTILES + 25*nt/(MAXTILES/2) + 45*S;
// Estructura "de referencia" de cada nivel (ajustada midiendo las formas disponibles en cada tramo)
const SREF = [[1,.3],[10,.5],[20,.62],[45,.7],[80,.77],[150,.85],[300,.92],[1000,.95]];
function Sref(L){ let i = 0; while (i < SREF.length-2 && L > SREF[i+1][0]) i++;
  const [a,sa] = SREF[i], [b,sb] = SREF[i+1]; return sa + (sb-sa)*Math.max(0, Math.min(1, (L-a)/(b-a))); }
// Capas que se buscan en cada nivel: muchas capas y un tablero pequeño (fichas grandes) mejor que un tablero enorme y plano
const layersTarget = L => Math.min(9, Math.round(1 + 2*Math.log(1 + L/8)));
const Dtarget = L => { const T = target(L); return Dof(T, Math.min(T/2, NTYPES), Sref(L)); };

// Prepara una forma con el nº de fichas del nivel y mide su estructura.
// Para quitar fichas sobrantes se quitan las de más afuera que no tapan a nadie, de dos en dos (simétrico): la figura y sus capas se mantienen.
function evalRecipe(rec, T){
  const ts = patTiles([rec.name, rec.get()]);
  if (ts.length % 2) ts.pop();
  link(ts);
  const mx = Math.max(...ts.map(t => t.x)), my = Math.max(...ts.map(t => t.y));
  const at = new Map(ts.map(t => [t.x+","+t.y+","+t.z, t]));
  const far = t => ((t.x-mx/2)/(mx/2+2))**2 + ((t.y-my/2)/(my/2+2))**2;
  for (let n = ts.length; n > T;){
    const cand = ts.filter(t => t.alive && t.up.every(o => !o.alive));
    const top = cand.sort((a,b) => far(b) - far(a) + (Math.random()-.5)*1e-6);   // se quitan las de más afuera (así se conservan todas las capas)
    const a = top[0], m = at.get((mx-a.x)+","+a.y+","+a.z);
    a.alive = false; n--;
    if (m && m !== a && m.alive && n > T && m.up.every(o => !o.alive)){ m.alive = false; n--; }
  }
  const keep = ts.filter(t => t.alive), free = keep.filter(t => isFree(t)).length, mz = Math.max(...keep.map(t => t.z));
  const burial = 1 - free/keep.length;
  const cw = (Math.max(...keep.map(t => t.x)) + 2)/2, ch = (Math.max(...keep.map(t => t.y)) + 2)/2;
  const tw = Math.min(110, (board.clientWidth-12)/(cw+.1), (board.clientHeight-12)/(ch*1.25 + .15 + Math.min(.5, mz*.1)));   // tamaño de ficha que saldría
  return {ts:keep, name:rec.name, idx:rec.idx, burial, layers:mz+1, tw, S: .5*burial + .5*Math.min(1, mz/8)};
}
// Formas candidatas para un nivel: las de siempre (si tienen tamaño parecido) + las nuevas ya desbloqueadas
function recipesFor(T, L){
  const w = board.clientWidth - 12, h = board.clientHeight - 12, asp = h/(1.25*w) || 1.15;
  let rec = PATS.map((p,i) => ({name:p[0], idx:i, get:() => p[1]})).filter(q => PSTAT[q.idx].n >= T && PSTAT[q.idx].n <= T*2+12);
  const maxG = L >= 150 ? 3 : L >= 50 ? 2 : L >= 10 ? 1 : 0;
  if (maxG){
    let es = catalog(asp).filter(e => e.group <= maxG && e.n >= T && e.n <= T*1.5+10);
    const lt = layersTarget(L), deep = es.filter(e => e.layers >= lt - 1);       // se prefieren las figuras con las capas que tocan
    if (deep.length >= 6) es = deep;
    rec = rec.concat(es.map(e => ({name:e.name, idx:-1, get:e.get})));
  }
  return rec;
}
// ---------- Estado ----------
const $ = id => document.getElementById(id);
const board = $("board");
let field, level = 1, tiles = [], raised = [], hist = [], cols, rows, maxz, hintPair = null, hintStep = 0;
let lastName = "", recent = [], prevD = null, prevLevel = 0, info = null;
let hints = 0, combo = 0, lastPair = 0, lastBreak = Date.now(), lastPraise = "";
const reduceMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const load = (key, def) => { try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? def : v; } catch(e){ return def; } };
const save = (key, v) => { try { localStorage.setItem(key, JSON.stringify(v)); } catch(e){} };
const stars = load("mj-estrellas", {});             // mejores estrellas por nivel
const esc = t => String(t).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
try { level = parseInt(localStorage.getItem("mj-nivel1")) || 1; } catch(e){}

const shuf = a => { for (let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];} return a; };
const alive = () => tiles.filter(t => t.alive);

// Vecinos de cada ficha (para saber rápido si está libre)
function link(ts){
  ts.forEach(t => { t.up = []; t.lf = []; t.rt = []; });
  for (const t of ts) for (const o of ts){
    if (o === t || Math.abs(o.y - t.y) >= 2) continue;
    if (o.z === t.z+1 && Math.abs(o.x - t.x) < 2) t.up.push(o);
    else if (o.z === t.z){ if (o.x === t.x-2) t.lf.push(o); else if (o.x === t.x+2) t.rt.push(o); }
  }
}
// Libre = nada encima Y (lado izquierdo libre O lado derecho libre). k = marca de "sigue puesta" (alive en juego, al en pruebas)
function isFree(t, k = "alive"){
  return t[k] && t.up.every(o => !o[k]) && (t.lf.every(o => !o[k]) || t.rt.every(o => !o[k]));
}

// Reparte las parejas "al revés" (quitando fichas libres), así el tablero SIEMPRE tiene solución.
// Devuelve el orden de resolución (lista de parejas) o null si no ha podido.
function assign(ts, pairTypes){
  for (let k=0;k<40;k++){
    tiles.forEach(t => t.al = false); ts.forEach(t => t.al = true);
    const pt = shuf(pairTypes.slice()), order = []; let left = ts.length, ok = true;
    while (left){
      const fr = ts.filter(t => isFree(t, "al"));
      if (fr.length < 2){ ok = false; break; }
      const a = fr.splice(Math.random()*fr.length|0, 1)[0], b = fr[Math.random()*fr.length|0];
      a.type = b.type = pt.pop(); a.al = b.al = false; left -= 2; order.push([a,b]);
    }
    tiles.forEach(t => t.al = t.alive);
    if (ok) return order;
  }
  return null;
}
// Comprobación 1: repetir el orden de resolución con las reglas del juego tiene que dejar el tablero vacío
function verify(ts, order){
  ts.forEach(t => t.al = true);
  let ok = true;
  for (const [a,b] of order){ if (a.type !== b.type || !isFree(a,"al") || !isFree(b,"al")){ ok = false; break; } a.al = b.al = false; }
  ok = ok && ts.every(t => !t.al);
  ts.forEach(t => t.al = true);
  return ok;
}
// Comprobación 2 (independiente): un "jugador" que va quitando cualquier pareja libre también tiene que dejarlo vacío
function greedySolve(ts){
  ts.forEach(t => t.al = true);
  let left = ts.length;
  while (left){ const g = pairsAvailable(ts.filter(t => isFree(t,"al"))); if (!g.length) break; g[0][0].al = g[0][1].al = false; left -= 2; }
  ts.forEach(t => t.al = true);
  return left === 0;
}

function paint(t){ t.el.innerHTML = face(t.type); }

function build(){
  const T = target(level);
  // Dificultad que toca en este nivel; nunca por debajo de la del nivel anterior (si venimos de él)
  let goal = Dtarget(level);
  if (prevD !== null && prevLevel === level-1) goal = Math.max(goal, prevD + Math.max(.01, .004*(96 - prevD)));   // sube un poquito cada nivel, sin pasarse del máximo
  const bad = new Set();                                                                       // formas que no se han podido repartir (se descartan)
  for (;;){
    let rec = recipesFor(T, level).filter(q => !recent.includes(q.name));
    if (!rec.length) rec = recipesFor(T, level);
    if (!rec.length) rec = PATS.map((p,i) => ({name:p[0], idx:i, get:() => p[1]})).filter(q => PSTAT[q.idx].n >= T);
    if (!rec.length) rec = [{name:PATS[PATS.length-1][0], idx:PATS.length-1, get:() => PATS[PATS.length-1][1]}];
    shuf(rec);
    const lt = layersTarget(level);
    // Se miran formas por tandas hasta tener varias que no bajen la dificultad respecto al nivel anterior
    const evs = []; let ok = [];
    for (let i=0; i<rec.length && (i < 40 || ok.length < 5) && i < 400; i += 40){
      rec.slice(i, i+40).forEach(q => { const e = evalRecipe(q, T); e.key = e.name + "|" + e.ts.length + "|" + e.layers; if (!bad.has(e.key)) evs.push(e); });
      evs.forEach(e => { e.D = Dof(e.ts.length, Math.min(e.ts.length/2, NTYPES), e.S); });
      ok = evs.filter(e => e.D >= goal - .3);
    }
    if (!ok.length){            // si solo las formas que se acaban de usar sirven, es mejor repetir forma que bajar la dificultad
      recipesFor(T, level).filter(q => recent.includes(q.name)).slice(0, 120).forEach(q => { const e = evalRecipe(q, T); e.key = e.name + "|" + e.ts.length + "|" + e.layers; if (!bad.has(e.key)){ e.D = Dof(e.ts.length, Math.min(e.ts.length/2, NTYPES), e.S); evs.push(e); } });
      ok = evs.filter(e => e.D >= goal - .3);
    }
    if (!evs.length){ bad.clear(); recent.length = 0; continue; }
    const bestTw = Math.max(...evs.map(e => e.tw));
    if (!ok.length) ok = [evs.reduce((p,q) => q.D > p.D ? q : p)];                                 // si ninguna llega, la más difícil
    ok.forEach(e => {
      const lay = e.layers < lt ? 2*(lt - e.layers) : .6*(e.layers - lt);                         // se buscan las capas que tocan (mejor de más que de menos)
      e.cost = (e.D - goal) + lay + 4*(1 - e.tw/bestTw);                                          // y fichas lo más grandes posible
    });
    ok.sort((p,q) => p.cost - q.cost);
    const near = ok.filter(e => e.cost <= ok[0].cost + .4), best = near[Math.random()*near.length|0];
    const ts = best.ts;
    if (Math.random() < .5){ const mx = Math.max(...ts.map(t => t.x)); ts.forEach(t => t.x = mx - t.x); }   // a veces en espejo
    tiles = ts;
    // Cada pareja lleva un tipo de ficha distinto (no se repite ninguno mientras no haga falta)
    const pairs = tiles.length/2;
    const pool = ORDER.slice(0, Math.min(NTYPES, pairs + 20)), favs = FAV.filter(i => pool.includes(i));
    const kinds = shuf([...favs, ...shuf(pool.filter(i => !favs.includes(i)))].slice(0, pairs));       // los favoritos siempre salen
    const order = assign(tiles, kinds);
    // Solo se acepta un tablero si se ha comprobado que se puede limpiar al 100% (si no, se descarta y se crea otro)
    if (!(order && verify(tiles, order) && greedySolve(tiles))){ bad.add(best.key); continue; }
    {
      lastName = best.name; recent.push(best.name); if (recent.length > 4) recent.shift();
      prevD = best.D; prevLevel = level; info = best; break;
    }
  }
  tiles.forEach(t => t.type0 = t.type);
  const mx = Math.max(...tiles.map(t => t.x)), my = Math.max(...tiles.map(t => t.y));
  cols = (mx+2)/2; rows = (my+2)/2; maxz = Math.max(...tiles.map(t => t.z));
  board.innerHTML = '<div id="field"></div>'; field = $("field");
  tiles.forEach((t,i) => {
    t.el = document.createElement("div");
    t.el.className = "t";
    t.el.style.animationDelay = (t.z*100 + Math.min(i*4, 700)) + "ms";
    t.el.addEventListener("pointerdown", e => { e.preventDefault(); tap(t); });
    paint(t);
    field.appendChild(t.el);
  });
}

// Fichas lo más grandes posible: el tablero siempre cabe entero en pantalla (cuantas más fichas, más pequeñas)
function place(){
  if (!tiles.length) return;
  const w = board.clientWidth, h = board.clientHeight;
  const raise = Math.min(.1, .5/Math.max(1, maxz));          // cuánto sube cada capa (en fichas); entre todas nunca más de media ficha
  const tw = Math.min(110, (w-12)/(cols+.1), (h-12)/(rows*1.25+.15+maxz*raise));
  const th = tw*1.25, dz = tw*raise, e = tw*.06;
  field.style.height = h + "px";
  const ox = (w - cols*tw)/2, oy = (h - rows*th)/2 + maxz*dz/2;
  board.style.setProperty("--tw", tw + "px");
  board.style.setProperty("--e", e + "px");
  const bw = tw - 4, bh = th - e - 3;     // cuerpo de la ficha (igual para todas, centrado en su hueco)
  tiles.forEach(t => {
    const c = t.x/2, r = t.y/2, s = t.el.style;
    s.width = bw + "px"; s.height = bh + "px";
    s.left = (ox + c*tw + (tw-bw)/2) + "px"; s.top = (oy + r*th - t.z*dz + 1) + "px";
    s.zIndex = t.z*10000 + t.y*100 + t.x;
  });
}

function pairsAvailable(fr){
  const by = {};
  fr.forEach(t => (by[t.type] = by[t.type] || []).push(t));
  return Object.values(by).filter(g => g.length >= 2);
}

function update(){
  const a = alive(), fr = a.filter(t => isFree(t));
  tiles.forEach(t => t.el.classList.toggle("lock", t.alive && !fr.includes(t)));
  $("pairs").textContent = "Parejas: " + a.length/2;
  $("barfill").style.width = (tiles.length ? 100*(1 - a.length/tiles.length) : 0) + "%";
  return {a, fr};
}

function clearHint(){ tiles.forEach(t => t.el.classList.remove("hint")); hintPair = null; hintStep = 0; }

function showTile(t){ t.el.classList.add("hint"); }

// Fichas "levantadas": al tocar una ficha libre se queda arriba esperando a su pareja. Se pueden tener hasta 3 levantadas a la vez;
// cuando se toca la pareja de cualquiera de ellas, se van las dos. No hace falta "des-seleccionar" nunca:
// tocar otra vez una levantada no hace nada y, si levanta una cuarta, la más antigua baja sola.
const MAXRAISED = 3;
function lowerAll(){ raised.forEach(r => r.el.classList.remove("sel")); raised = []; }
function buzz(ms){ try { if (navigator.vibrate) navigator.vibrate(ms); } catch(e){} }

// ---------- Premios visuales (sin sonido) ----------
const SPARK = ["#ffd54a","#ff9800","#ffffff","#7cf2a8","#ff6b6b"];
const tileCenter = t => [parseFloat(t.el.style.left) + parseFloat(t.el.style.width)/2, parseFloat(t.el.style.top) + parseFloat(t.el.style.height)/2];
function sparkle(t){                                   // chispitas al irse una pareja
  if (reduceMotion) return;
  const [cx, cy] = tileCenter(t);
  for (let i=0; i<9; i++){
    const p = document.createElement("i"), a = Math.random()*6.283, d = 30 + Math.random()*40;
    p.className = "spark";
    p.style.cssText = `left:${cx-5}px;top:${cy-5}px;background:${SPARK[i%SPARK.length]};--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d}px`;
    field.appendChild(p); setTimeout(() => p.remove(), 750);
  }
}
function comboPop(a, b){                               // "¡Combo x3!" si quita parejas seguidas (en menos de 5 segundos)
  const now = Date.now(); combo = now - lastPair < 5000 ? combo + 1 : 1; lastPair = now;
  if (combo < 2 || reduceMotion) return;
  const [x1,y1] = tileCenter(a), [x2,y2] = tileCenter(b), el = document.createElement("div");
  el.className = "combo"; el.textContent = "¡Combo x" + combo + "!";
  el.style.left = Math.max(80, Math.min(board.clientWidth - 80, (x1+x2)/2)) + "px"; el.style.top = Math.max(40, (y1+y2)/2) + "px";
  field.appendChild(el); setTimeout(() => el.remove(), 1150);
}
function confetti(){
  if (reduceMotion) return;
  const box = document.createElement("div"), cs = ["#ffd54a","#ff6b6b","#4dd0a1","#5aa9ff","#ff9f43","#d980fa"];
  for (let i=0; i<70; i++){
    const c = document.createElement("i"); c.className = "confetti";
    c.style.cssText = `left:${Math.random()*100}vw;background:${cs[i%cs.length]};--dx:${(Math.random()-.5)*160}px;--r:${Math.random()*720}deg;animation-duration:${2.2+Math.random()*1.8}s;animation-delay:${Math.random()*.5}s`;
    box.appendChild(c);
  }
  document.body.appendChild(box); setTimeout(() => box.remove(), 4800);
}

function tap(t){
  if (!t.alive) return;
  clearHint();
  if (!isFree(t)){                               // bloqueada: se sacude y listo (las levantadas siguen como estaban)
    t.el.classList.add("no");
    setTimeout(() => t.el.classList.remove("no"), 300);
    return;
  }
  if (raised.includes(t)) return;                // ya está levantada: no pasa nada
  const mate = raised.find(r => r.alive && r.type === t.type);
  if (mate){                                     // ¡pareja!
    [mate, t].forEach(p => { p.alive = false; p.el.classList.remove("sel"); p.el.classList.add("gone"); });
    raised = raised.filter(r => r !== mate);
    hist.push([mate, t]); buzz(25);
    sparkle(mate); sparkle(t); comboPop(mate, t);
    const {a:rest, fr} = update();
    if (!rest.length) setTimeout(win, 700);
    else if (!pairsAvailable(fr).length) setTimeout(stuck, 600);
    return;
  }
  raised.push(t); t.el.classList.add("sel"); buzz(10);
  if (raised.length > MAXRAISED) raised.shift().el.classList.remove("sel");
}

function ov(title, text, buttons){
  $("ovt").textContent = title; $("ovp").innerHTML = text;
  const box = $("ovb"); box.innerHTML = "";
  buttons.forEach(([label, fn, alt]) => {
    const b = document.createElement("button");
    b.textContent = label; if (alt) b.className = "alt";
    b.onclick = () => { $("ov").classList.add("hidden"); fn(); };
    box.appendChild(b);
  });
  $("ov").classList.remove("hidden");
}

function win(){
  level++;
  try { localStorage.setItem("mj-nivel1", level); } catch(e){}
  const done = level - 1, n = hints === 0 ? 3 : hints <= 3 ? 2 : 1;           // estrellas: 3 sin pistas, 2 con pocas, 1 con muchas (nunca resta nada)
  if (!(stars[done] >= n)){ stars[done] = n; save("mj-estrellas", stars); }
  const PRAISE = ["Muy bien","Genial","Fantástico","Qué bien lo haces","Excelente","Bravo"];
  lastPraise = "¡" + PRAISE[Math.random()*PRAISE.length|0] + (NOMBRE ? ", " + esc(NOMBRE) : "") + "!";
  confetti();
  winOverlay(done, n, Date.now() - lastBreak > DESCANSO_MIN*60000);
}
function winOverlay(done, n, tired){
  const total = Object.values(stars).reduce((p,q) => p + q, 0);
  const btns = [["Siguiente nivel ▶", start]];
  if (tired){ lastBreak = Date.now(); btns.push(["😴 Descansar un rato", rest, true]); }
  btns.push(["🔁 Repetir este nivel", () => { level--; start(); }, true]);
  ov(lastPraise, `<div class="stars">${"⭐".repeat(n)}${"☆".repeat(3-n)}</div>Nivel ${done} completado<small>Estrellas: ${total}</small>` +
    (tired ? "<br>☕ Llevas un buen rato jugando. ¿Descansamos un poco?" : ""), btns);
}
function rest(){ ov("Descansa un rato 😊", "Tu nivel está guardado. Cuando quieras, aquí seguirá esperándote.", [["▶ Seguir jugando", start]]); }

function stuck(){
  ov("No quedan parejas", "No pasa nada. Puedes mezclar las fichas, empezar de nuevo o volver atrás.", [
    ["🔀 Mezclar fichas", shuffleLeft],
    ["🔁 Empezar de nuevo", restart],
    ["↩️ Volver atrás", undo, true]
  ]);
}

// Mezcla las fichas que quedan, otra vez de forma que se puedan limpiar todas
function shuffleLeft(){
  clearHint();
  const a = alive(), pairTypes = a.map(t => t.type).sort((p,q) => p-q).filter((_,i) => i%2 === 0);
  const old = a.map(t => t.type), order = assign(a, pairTypes);
  if (!order || !verify(a, order)){
    a.forEach((t,i) => t.type = old[i]);
    ov("No se puede mezclar", "Con las fichas que quedan no hay solución. Empieza de nuevo o vuelve atrás.", [
      ["🔁 Empezar de nuevo", restart], ["↩️ Volver atrás", undo, true]]);
    return;
  }
  a.forEach(paint);
  lowerAll();
  const {fr} = update();
  if (!pairsAvailable(fr).length) setTimeout(stuck, 300);
}

// Vuelve a poner todas las fichas como estaban al empezar el tablero
function restart(){
  clearHint(); lowerAll(); hist = [];
  tiles.forEach(t => { t.alive = true; t.type = t.type0; paint(t); t.el.classList.remove("gone","sel"); });
  update();
}

function undo(){
  clearHint();
  lowerAll();
  const pair = hist.pop(); if (!pair) return;
  pair.forEach(p => { p.alive = true; p.el.classList.remove("gone"); });
  update();
}

// Pista: 1ª pulsación = una ficha que se puede quitar; 2ª = su pareja; 3ª = otra pareja distinta
$("hint").onclick = () => {
  const {a, fr} = update();
  if (!a.length) return;
  hints++;
  const lit = [...raised].reverse().map(r => fr.find(t => t !== r && t.type === r.type)).find(Boolean);
  if (lit){ clearHint(); showTile(lit); return; }        // si ya levantó una ficha, le enseñamos su pareja
  if (hintPair && hintStep === 1 && hintPair.every(t => t.alive)){
    showTile(hintPair[1]); hintStep = 2; return;
  }
  clearHint();
  const g = pairsAvailable(fr);
  if (!g.length) return stuck();
  hintPair = shuf(g[Math.random()*g.length|0].slice(0,2));
  hintStep = 1;
  showTile(hintPair[0]);
};
$("undo").onclick = undo;

function start(){
  raised = []; hist = []; hints = 0; combo = 0;
  $("lvl").textContent = "Nivel " + level;
  build(); place(); update();
}

{ const im = new Image(); im.onload = () => document.body.classList.add("foto"); im.src = "fondo.jpg"; }   // si subes una foto llamada fondo.jpg, sale de fondo
board.addEventListener("pointerdown", e => { if (e.target === board || e.target.id === "field") lowerAll(); });   // tocar el fondo: bajan todas
document.addEventListener("contextmenu", e => e.preventDefault());                                                  // sin menú al mantener pulsado
window.addEventListener("resize", place);
start();

// Permite instalarlo en la pantalla de inicio y abrirlo sin internet
if ("serviceWorker" in navigator) navigator.serviceWorker.register("service-worker.js").catch(() => {});
