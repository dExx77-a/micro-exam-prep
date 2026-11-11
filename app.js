(function () {
  "use strict";
  const CH = (window.CHAPTERS || []).slice().sort((a, b) => a.id - b.id);
  const QS = window.QUESTIONS || [];
  const app = document.getElementById("app");
  const L = "ABCDE";

  // ---------- storage (safe) ----------
  function load(k, d) { try { const v = localStorage.getItem("micro." + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem("micro." + k, JSON.stringify(v)); } catch (e) {} }
  // fcMissed: {"1-3": true} ; qLast: {"1-3": true/false} ; qMist: {"1-3": true}
  let fcMissed = load("fcMissed", {}), qLast = load("qLast", {}), qMist = load("qMist", {});
  const persist = () => { save("fcMissed", fcMissed); save("qLast", qLast); save("qMist", qMist); };

  // ---------- helpers ----------
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const h = (html) => { app.innerHTML = `<div class="fade">${html}</div>`; window.scrollTo(0, 0); };
  const setCh = v => { document.body.dataset.ch = v; };
  function ring(frac, color) {
    const r = 23, c = 2 * Math.PI * r, d = c * Math.max(0, Math.min(1, frac));
    return `<svg viewBox="0 0 54 54" width="54" height="54" aria-hidden="true"><circle cx="27" cy="27" r="${r}" fill="none" stroke="var(--bg2)" stroke-width="6"/>${d > 0 ? "" : "<!--"}<circle cx="27" cy="27" r="${r}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${d} ${c}" transform="rotate(-90 27 27)"/>${d > 0 ? "" : "-->"}</svg>`;
  }
  const chapter = id => CH.find(c => c.id === +id);
  function bullets(list) {
    return "<ul>" + list.map(b => Array.isArray(b) ? `<li>${md(b[0])}${bullets(b[1])}</li>` : `<li>${md(b)}</li>`).join("") + "</ul>";
  }
  function table(t) {
    return `<div class="card"><h3>${md(t.title)}</h3><div class="table-wrap"><table><thead><tr>${t.head.map(x => `<th>${md(x)}</th>`).join("")}</tr></thead><tbody>${t.rows.map(r => `<tr>${r.map(x => `<td>${md(x)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${t.note ? `<p class="small muted">${md(t.note)}</p>` : ""}${t.notes ? bullets(t.notes) : ""}</div>`;
  }
  function graphsFor(place) {
    const keys = (window.GRAPH_PLACES || {})[place] || [];
    return keys.map(k => { const g = (window.GRAPHS || {})[k]; if (!g) return ""; return `<figure class="card g"><div class="tag">Graph</div><h3>${esc(g.title)}</h3>${g.svg()}<figcaption>${md(g.caption)}</figcaption></figure>`; }).join("");
  }
  let keyHandler = null;
  document.addEventListener("keydown", e => { if (keyHandler && !e.ctrlKey && !e.metaKey && !e.altKey) keyHandler(e); });

  // ---------- router ----------
  function route() {
    keyHandler = null;
    const r = (location.hash || "#home").slice(1);
    document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("on", r === a.dataset.r || r.startsWith(a.dataset.r + "/")));
    const p = r.split("/");
    if (p[0] === "ch" && chapter(p[1])) { setCh(p[1]); return chapterPage(chapter(p[1]), p[2] || "notes"); }
    if (p[0] === "quiz") { setCh("q"); return quizSetup(); }
    if (p[0] === "mistakes") { setCh("m"); return mistakesPage(); }
    setCh("home"); home();
  }
  window.addEventListener("hashchange", route);

  // ---------- home ----------
  function chStats(id) {
    const qs = QS.filter(q => q.ch === id);
    const right = qs.filter(q => qLast[q.id] === true).length;
    const mist = qs.filter(q => qMist[q.id]).length;
    const fcm = Object.keys(fcMissed).filter(k => k.startsWith(id + "-")).length;
    return { total: qs.length, right, mist, fcm };
  }
  function home() {
    const totalMist = Object.keys(qMist).length, totalFc = Object.keys(fcMissed).length;
    const answered = Object.keys(qLast).length, right = Object.values(qLast).filter(Boolean).length;
    h(`<section class="hero home-hero">
        <div class="shapes"><i style="background:var(--c1)"></i><i style="background:var(--c2);border-radius:50%"></i><i style="background:var(--c3)"></i><i style="background:var(--c4);border-radius:50%"></i></div>
        <div class="eyebrow">Mankiw · Principles of Microeconomics</div>
        <h1 style="max-width:none">Exam prep, <span style="white-space:nowrap">chapters 1–4</span></h1>
        <p>Read the notes, drill the flashcards, then beat the teacher's 80 questions until your mistakes list is empty.</p>
      </section>
      <div class="stats">
        <div class="stat"><div class="k">Answered</div><div class="v">${answered}<span class="muted" style="font-size:18px">/80</span></div></div>
        <div class="stat"><div class="k">Correct</div><div class="v" style="color:var(--good)">${right}</div></div>
        <div class="stat"><div class="k">Mistakes</div><div class="v" style="color:var(--bad)">${totalMist}</div></div>
        <div class="stat"><div class="k">Cards to review</div><div class="v" style="color:var(--c4)">${totalFc}</div></div>
      </div>
      <div class="grid">${CH.map(c => { const s = chStats(c.id); const col = `var(--c${c.id})`; return `
        <a class="chcard" style="--acc:${col}" href="#ch/${c.id}">
        <div class="ring">${ring(s.total ? s.right / s.total : 0, col)}<span>${s.right}/${s.total}</span></div>
        <div class="big">0${c.id}</div>
        <div class="t">${esc(c.title)}</div>
        <div class="n">${c.flashcards.length} flashcards · 20 questions</div>
        <div class="n" style="margin-top:6px">${s.mist ? `<span class="pill">${s.mist} wrong</span> ` : ""}${s.fcm ? `<span class="pill">${s.fcm} cards</span>` : ""}${!s.mist && !s.fcm ? `<span class="pill g">nothing to review</span>` : ""}</div></a>`; }).join("")}
      </div>
      <div class="quick" style="margin-top:14px">
        <a class="chcard" style="--acc:var(--cq)" href="#quiz"><div class="big" style="font-size:40px">?</div><div class="t">Teacher's 80 questions</div><div class="n">Practice by chapter or take a 50-question mock exam</div></a>
        <a class="chcard" style="--acc:var(--cm)" href="#mistakes"><div class="big" style="font-size:40px">✗</div><div class="t">My mistakes</div><div class="n">${totalMist} questions · ${totalFc} flashcards to fix</div></a>
      </div>
      <div class="card"><h3>Study plan</h3>
        <ol class="steps">
          <li>For each chapter: read <b>Notes</b> → <b>Summary</b> → do the <b>Flashcards</b>, then "Review missed" until none are left.</li>
          <li>Do the <a href="#quiz">teacher's questions</a> for that chapter. Every wrong answer goes to <a href="#mistakes">Mistakes</a>.</li>
          <li>Retry mistakes until the list is empty. Answering right removes a question from the list.</li>
          <li>The day before: a mock exam of 50 random questions from all 80.</li>
        </ol>
        <p class="small muted">Progress is saved in this browser.</p>
        <button class="btn" id="reset">Reset all progress</button>
      </div>`);
    document.getElementById("reset").onclick = () => { if (confirm("Erase all saved progress?")) { fcMissed = {}; qLast = {}; qMist = {}; persist(); home(); } };
  }

  // ---------- chapter page ----------
  function chapterPage(c, tab) {
    const tabs = [["notes", "Notes"], ["summary", "Summary"], ["cards", "Flashcards"], ["questions", "Questions"]];
    h(`<section class="hero"><div class="num">0${c.id}</div><div class="eyebrow">Chapter ${c.id}</div><h1>${esc(c.title)}</h1><p>${md(c.intro)}</p></section>
      <div class="tabs">${tabs.map(([k, n]) => `<button data-t="${k}" class="${k === tab ? "on" : ""}">${n}</button>`).join("")}</div>
      <div id="tab"></div>`);
    app.querySelectorAll(".tabs button").forEach(b => b.onclick = () => { location.hash = `#ch/${c.id}/${b.dataset.t}`; });
    const box = document.getElementById("tab");
    if (tab === "summary") {
      const allG = Object.keys(window.GRAPH_PLACES || {}).filter(k => k.startsWith(c.id + "-")).map(graphsFor).join("");
      box.innerHTML = `<div class="card"><h3>Chapter ${c.id} in a nutshell</h3>${bullets(c.summary)}</div>${allG ? `<h2 style="margin-top:26px">Key graphs</h2>${allG}` : ""}${(c.tables || []).map(table).join("")}`;
    } else if (tab === "cards") {
      flashcards(c, box);
    } else if (tab === "questions") {
      const s = chStats(c.id);
      box.innerHTML = `<div class="card"><h3>Teacher's questions — Chapter ${c.id}</h3>
        <p>${s.total} questions · right last time: ${s.right} · mistakes: ${s.mist}</p>
        <div class="row"><button class="btn primary" id="go">Practice all ${s.total}</button>
        <button class="btn" id="goM" ${s.mist ? "" : "disabled"}>Retry ${s.mist} mistakes</button></div></div>`;
      document.getElementById("go").onclick = () => runQuiz(QS.filter(q => q.ch === c.id), `Chapter ${c.id}`, false);
      document.getElementById("goM").onclick = () => runQuiz(QS.filter(q => q.ch === c.id && qMist[q.id]), `Chapter ${c.id} — mistakes`, false);
    } else {
      let html = c.sections.map((s, k) => { const mm = s.title.match(/^(\d-\d)\s+(.*)$/); return `<div class="card section"><div class="tag">${mm ? "Section " + mm[1] : "Part " + (k + 1)}</div><h2>${md(mm ? mm[2] : s.title)}</h2>${bullets(s.bullets)}</div>${graphsFor(c.id + "-" + k)}`; }).join("");
      if (c.method) {
        const m = c.method;
        html += `<div class="card section"><div class="tag">Method</div><h2>${md(m.title)}</h2><ol class="steps">${m.steps.map(s => `<li>${md(s)}</li>`).join("")}</ol></div>`;
        if (m.example) html += table(m.example);
      }
      html += (c.tables || []).map(table).join("");
      html += `<div class="row"><a class="btn primary" href="#ch/${c.id}/summary">Next: Summary →</a></div>`;
      box.innerHTML = html;
    }
  }

  // ---------- flashcards ----------
  function flashcards(c, box) {
    const all = c.flashcards.map((f, i) => ({ ...f, key: c.id + "-" + i }));
    const missedNow = () => all.filter(f => fcMissed[f.key]);
    function menu() {
      keyHandler = null;
      const m = missedNow().length;
      box.innerHTML = `<div class="card"><h3>Flashcards — ${all.length} cards</h3>
        <p class="muted">Click the card (or press Space) to flip. Then mark it <b>Got it</b> (→ / 1) or <b>Missed</b> (← / 2). Missed cards are saved so you can review only them.</p>
        <div class="row"><button class="btn primary" id="a">Study all (shuffled)</button>
        <button class="btn" id="m" ${m ? "" : "disabled"}>Review missed (${m})</button></div></div>`;
      box.querySelector("#a").onclick = () => run(shuffle(all), false);
      box.querySelector("#m").onclick = () => run(shuffle(missedNow()), true);
    }
    function run(deck, review) {
      let i = 0, got = 0, miss = 0, flipped = false;
      function show() {
        if (i >= deck.length) return done();
        const f = deck[i]; flipped = false;
        box.innerHTML = `<div class="q-head"><span>${review ? "Reviewing missed" : "All cards"} · ${i + 1}/${deck.length}</span><span>✓ ${got} · ✗ ${miss}</span></div>
          <div class="progress"><i style="width:${100 * i / deck.length}%"></i></div>
          <div class="fc" id="fc"><div class="fc-inner">
            <div class="fc-face"><span class="lbl">Question</span>${md(f.q)}<span class="hint">tap to flip</span></div>
            <div class="fc-face back"><span class="lbl">Answer</span>${md(f.a)}</div></div></div>
          <div class="row" style="justify-content:center"><button class="btn bad" id="no">✗ Missed</button><button class="btn" id="flip">Flip</button><button class="btn good" id="yes">✓ Got it</button></div>
          <p class="kbd" style="text-align:center">Space = flip · 1 / → = got it · 2 / ← = missed · Esc = stop</p>`;
        const fc = box.querySelector("#fc");
        const flip = () => { flipped = !flipped; fc.classList.toggle("flipped", flipped); };
        fc.onclick = flip; box.querySelector("#flip").onclick = flip;
        box.querySelector("#yes").onclick = () => mark(true);
        box.querySelector("#no").onclick = () => mark(false);
      }
      function mark(ok) {
        const f = deck[i];
        if (ok) { got++; delete fcMissed[f.key]; } else { miss++; fcMissed[f.key] = true; }
        persist(); i++; show();
      }
      function done() {
        keyHandler = null;
        const left = missedNow().length;
        box.innerHTML = `<div class="card"><h3>Done! ✓ ${got} · ✗ ${miss}</h3>
          <p>${left ? `${left} card(s) of this chapter are still in your missed pile.` : "No missed cards left in this chapter 🎉"}</p>
          <div class="row"><button class="btn primary" id="m" ${left ? "" : "disabled"}>Review missed (${left})</button><button class="btn" id="a">Study all again</button></div></div>`;
        box.querySelector("#m").onclick = () => run(shuffle(missedNow()), true);
        box.querySelector("#a").onclick = () => run(shuffle(all), false);
      }
      keyHandler = e => {
        if (e.key === " ") { e.preventDefault(); box.querySelector("#flip")?.click(); }
        else if (e.key === "1" || e.key === "ArrowRight") box.querySelector("#yes")?.click();
        else if (e.key === "2" || e.key === "ArrowLeft") box.querySelector("#no")?.click();
        else if (e.key === "Escape") menu();
      };
      show();
    }
    menu();
  }

  // ---------- quiz ----------
  const AU_TABLE = { title: "Output a worker can produce per month", head: ["Country", "Food", "Electrical appliances"], rows: [["Australia", "20", "5"], ["South Korea", "8", "4"]] };

  function quizSetup() {
    const mist = Object.keys(qMist).length;
    h(`<section class="hero"><div class="num">80</div><div class="eyebrow">Question bank</div><h1>Teacher's questions</h1><p>80 multiple-choice questions, 20 per chapter. Pick an answer to see if it's right and why. Wrong answers go to your Mistakes list.</p></section>
      <div class="card"><h3>Practice</h3>
        <div class="row"><select id="ch"><option value="0">All chapters (80)</option>${CH.map(c => `<option value="${c.id}">Chapter ${c.id} (20)</option>`).join("")}</select>
        <select id="ord"><option value="seq">In order</option><option value="rand">Shuffled</option></select>
        <button class="btn primary" id="go">Start</button></div></div>
      <div class="card"><h3>Mock exam</h3><p class="muted">50 random questions from all 80 — like the real exam. Score at the end.</p>
        <button class="btn primary" id="mock">Start mock exam</button></div>
      <div class="card"><h3>Mistakes</h3><p>${mist} question(s) in your mistakes list.</p>
        <button class="btn" id="mis" ${mist ? "" : "disabled"}>Retry mistakes</button></div>`);
    document.getElementById("go").onclick = () => {
      const ch = +document.getElementById("ch").value, rand = document.getElementById("ord").value === "rand";
      let list = QS.filter(q => !ch || q.ch === ch);
      runQuiz(rand ? shuffle(list) : list, ch ? `Chapter ${ch}` : "All chapters", false);
    };
    document.getElementById("mock").onclick = () => runQuiz(shuffle(QS).slice(0, 50), "Mock exam", true);
    document.getElementById("mis").onclick = () => runQuiz(shuffle(QS.filter(q => qMist[q.id])), "Mistakes", false);
  }

  function runQuiz(list, label, mock) {
    if (!list.length) return quizSetup();
    let i = 0, score = 0, answered = false; const wrong = [];
    function show() {
      if (i >= list.length) return done();
      const q = list[i]; answered = false;
      h(`<div class="q-head"><span>${esc(label)} · ${i + 1}/${list.length}</span><span>Score ${score}/${i}</span></div>
        <div class="progress"><i style="width:${100 * i / list.length}%"></i></div>
        <div class="card" style="--acc:var(--c${q.ch})"><span class="qbadge">Chapter ${q.ch} · Q${q.n}</span>
          ${q.table ? table(AU_TABLE) : ""}
          <div class="q-text">${esc(q.q)}</div>
          <div id="opts">${q.opts.map((o, k) => `<button class="opt" data-k="${k}"><span class="L">${L[k]}</span><span>${esc(o)}</span></button>`).join("")}</div>
          <div id="fb"></div></div>
        <div class="row"><button class="btn primary" id="next" disabled>Next →</button><a class="btn" href="#quiz">Quit</a></div>
        <p class="kbd">Keys: A–E to answer · Enter = next</p>`);
      app.querySelectorAll(".opt").forEach(b => b.onclick = () => pick(+b.dataset.k));
      document.getElementById("next").onclick = () => { i++; show(); };
    }
    function pick(k) {
      if (answered) return; answered = true;
      const q = list[i], ok = k === q.ans;
      if (ok) { score++; delete qMist[q.id]; } else { qMist[q.id] = true; wrong.push(q); }
      qLast[q.id] = ok; persist();
      app.querySelectorAll(".opt").forEach(b => { const kk = +b.dataset.k; b.disabled = true; if (kk === q.ans) b.classList.add("right"); else if (kk === k) b.classList.add("wrong"); });
      document.getElementById("fb").innerHTML = `<div class="why ${ok ? "ok" : "no"}"><b>${ok ? "Correct" : "Wrong — answer " + L[q.ans]}.</b> ${esc(q.why)}</div>${q.flag ? `<div class="flag">⚠ ${esc(q.flag)}</div>` : ""}`;
      const n = document.getElementById("next"); n.disabled = false; n.focus();
      if (i === list.length - 1) n.textContent = "See results";
    }
    function done() {
      keyHandler = null;
      const pct = Math.round(100 * score / list.length);
      h(`<h1>${esc(label)} — results</h1>
        <div class="card"><div class="score-big">${pct}%</div><p style="font-size:18px;margin:6px 0 0">${score} / ${list.length} correct${pct >= 90 ? " — excellent! 🎉" : pct >= 70 ? " — good, keep going" : " — review the notes and retry"}</p>
        <p class="muted">${wrong.length ? `${wrong.length} wrong answer(s) were added to your Mistakes list.` : "Perfect — no mistakes!"}</p>
        <div class="row">${wrong.length ? `<button class="btn primary" id="rw">Retry these ${wrong.length}</button>` : ""}<a class="btn" href="#quiz">Back</a><a class="btn" href="#mistakes">All mistakes</a></div></div>
        ${wrong.length ? `<div class="card"><h3>Review</h3>${wrong.map(q => `<p class="review-item"><b>Ch${q.ch} Q${q.n}.</b> ${esc(q.q)}<br><span class="pill g">${L[q.ans]}. ${esc(q.opts[q.ans])}</span><br><span class="small muted">${esc(q.why)}</span></p>`).join("")}</div>` : ""}`);
      const rw = document.getElementById("rw"); if (rw) rw.onclick = () => runQuiz(shuffle(wrong), "Retry", false);
    }
    keyHandler = e => {
      const k = L.indexOf(e.key.toUpperCase());
      if (!answered && k >= 0 && k < (list[i]?.opts.length || 0)) pick(k);
      else if (e.key === "Enter" && answered) { e.preventDefault(); i++; show(); }
    };
    show();
  }

  // ---------- mistakes ----------
  function mistakesPage() {
    const qm = QS.filter(q => qMist[q.id]);
    const fc = CH.map(c => ({ c, cards: c.flashcards.map((f, i) => ({ ...f, key: c.id + "-" + i })).filter(f => fcMissed[f.key]) })).filter(x => x.cards.length);
    h(`<section class="hero"><div class="num">✗</div><div class="eyebrow">Fix these</div><h1>My mistakes</h1><p>Everything you got wrong. Get them right to remove them.</p></section>
      <div class="card"><h3>Questions (${qm.length})</h3>
        ${qm.length ? `<button class="btn primary" id="rq">Retry all ${qm.length}</button>
        ${qm.map(q => `<p class="review-item"><b>Ch${q.ch} Q${q.n}.</b> ${esc(q.q)}<br><span class="pill g">${L[q.ans]}. ${esc(q.opts[q.ans])}</span><br><span class="small muted">${esc(q.why)}</span></p>`).join("")}` : `<p class="muted">No question mistakes. 🎉</p>`}</div>
      <div class="card"><h3>Flashcards to review (${fc.reduce((s, x) => s + x.cards.length, 0)})</h3>
        ${fc.length ? fc.map(x => `<h3>Ch ${x.c.id} — <a href="#ch/${x.c.id}/cards">review these</a></h3><ul>${x.cards.map(f => `<li><b>${md(f.q)}</b> — ${md(f.a)}</li>`).join("")}</ul>`).join("") : `<p class="muted">No missed flashcards.</p>`}</div>`);
    const rq = document.getElementById("rq"); if (rq) rq.onclick = () => runQuiz(shuffle(qm), "Mistakes", false);
  }

  route();
})();
