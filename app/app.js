/* =========================================================
   Deck Review – main app logic
   ---------------------------------------------------------
   The whole app is one page. Each "screen" is a function in
   SCREENS that returns the HTML for that screen.
   go()   opens a new screen
   back() returns to the previous screen
   tab()  switches bottom tabs (Home, Mistakes, Favorites, Progress)
   Progress is saved in the browser (localStorage).
   ========================================================= */

// ---------- Settings (safe to change) ----------
const PASS_MARK = 70;               // % needed to pass a mock exam
const SECONDS_PER_QUESTION = 60;    // mock exam time allowed per question
const STORAGE_KEY = "deckReview.v1";
const LETTERS = ["A", "B", "C", "D", "E", "F"];

// ---------- Question lookups ----------
const QMAP = {};
QUESTIONS.forEach(q => { QMAP[q.id] = q; });
const SUBJECT_MAP = {};
SUBJECTS.forEach(s => { SUBJECT_MAP[s.id] = s; });

function questionsFor(subjectId) {
  return QUESTIONS.filter(q => !subjectId || q.subject === subjectId).map(q => q.id);
}
function subjectLabel(id) {
  const s = SUBJECT_MAP[id];
  return s ? s.level + " – " + s.name : id;
}

// ---------- Saved progress ----------
function emptyProgress() {
  return {
    stats: {},          // per question: { right, wrong, streak }
    mistakes: [],       // question ids answered wrongly (until right twice in a row)
    favorites: [],      // starred question ids
    lastPos: {},        // per subject: last question number in Sequential Practice
    lastSubject: null,  // for the "Continue" card
    exams: []           // mock exam history
  };
}
function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) return Object.assign(emptyProgress(), saved);
  } catch (e) { /* storage not available: start fresh */ }
  return emptyProgress();
}
function saveProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (e) { /* ignore */ }
}
let progress = loadProgress();

function recordAnswer(qid, isCorrect) {
  const s = progress.stats[qid] || { right: 0, wrong: 0, streak: 0 };
  if (isCorrect) { s.right++; s.streak++; } else { s.wrong++; s.streak = 0; }
  progress.stats[qid] = s;
  if (!isCorrect && !progress.mistakes.includes(qid)) progress.mistakes.push(qid);
  if (isCorrect && s.streak >= 2) progress.mistakes = progress.mistakes.filter(id => id !== qid);
  saveProgress();
}

function toggleFavorite(qid) {
  if (progress.favorites.includes(qid)) progress.favorites = progress.favorites.filter(id => id !== qid);
  else progress.favorites.push(qid);
  saveProgress();
  render(false);
}

function subjectStats(subjectId) {
  const ids = questionsFor(subjectId);
  let answered = 0, right = 0, wrong = 0;
  ids.forEach(id => {
    const s = progress.stats[id];
    if (s) { answered++; right += s.right; wrong += s.wrong; }
  });
  return {
    total: ids.length,
    answered, right, wrong,
    accuracy: right + wrong ? Math.round(right * 100 / (right + wrong)) : null,
    mistakes: progress.mistakes.filter(id => ids.includes(id)).length,
    favorites: progress.favorites.filter(id => ids.includes(id)).length
  };
}

// ---------- Small helpers ----------
function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function fmtTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return m + ":" + String(s).padStart(2, "0");
}

// ---------- Screen switching ----------
const appEl = document.getElementById("app");
const modalEl = document.getElementById("modal");
let stack = [];
let current = { screen: "home", params: {} };

function go(screen, params = {}, replace = false) {
  stopTimer(); closeModal();
  if (!replace) stack.push(current);
  current = { screen, params };
  render(true);
}
function back() {
  stopTimer(); closeModal();
  current = stack.pop() || { screen: "home", params: {} };
  render(true);
}
function tab(screen) {
  stopTimer(); closeModal();
  stack = [];
  current = { screen, params: {} };
  render(true);
}
function render(toTop) {
  appEl.innerHTML = SCREENS[current.screen](current.params);
  if (current.screen === "exam") startTimer();
  if (toTop) window.scrollTo(0, 0);
}

// ---------- Pop-up box ----------
function showModal(html) {
  modalEl.innerHTML = '<div class="modal-box">' + html + "</div>";
  modalEl.classList.remove("hidden");
}
function closeModal() {
  modalEl.classList.add("hidden");
  modalEl.innerHTML = "";
}
modalEl.addEventListener("click", e => { if (e.target === modalEl) closeModal(); });

// ---------- Shared pieces of screens ----------
function topbar(title, opts = {}) {
  return '<header class="topbar">' +
    (opts.back ? `<button class="icon-btn" onclick="${opts.back}" aria-label="Back">‹</button>` : "") +
    `<h1>${title}</h1>` + (opts.right || "") +
    "</header>";
}
function tabBar(active) {
  const tabs = [
    ["home", "⚓", "Home"],
    ["mistakes", "❗", "Mistakes"],
    ["favorites", "★", "Favorites"],
    ["progress", "📊", "Progress"]
  ];
  return '<nav class="bottom tabs"><div class="bottom-inner">' +
    tabs.map(([id, ic, label]) =>
      `<button class="tab ${id === active ? "active" : ""}" onclick="tab('${id}')"><span class="ic">${ic}</span>${label}</button>`
    ).join("") +
    "</div></nav>";
}

// ---------- Starting practice ----------
const MODE_TITLES = {
  sequential: "Sequential Practice",
  random: "Random Practice",
  mistakes: "Mistakes",
  favorites: "Favorites",
  view: "View Questions",
  retry: "Retry Wrong Answers"
};

function startPractice(subjectId, mode, ids) {
  if (!ids) {
    ids = questionsFor(subjectId);
    if (mode === "mistakes") ids = ids.filter(id => progress.mistakes.includes(id));
    if (mode === "favorites") ids = ids.filter(id => progress.favorites.includes(id));
    if (mode === "random") ids = shuffle(ids);
  }
  if (!ids.length) return;
  let index = 0;
  if (mode === "sequential") {
    index = Math.min(progress.lastPos[subjectId] || 0, ids.length - 1);
    progress.lastSubject = subjectId;
    saveProgress();
  }
  go("practice", { subjectId, mode, ids, index, picked: {}, title: MODE_TITLES[mode] });
}

function pickAnswer(choice) {
  const p = current.params;
  const q = QMAP[p.ids[p.index]];
  if (current.screen === "exam") {
    p.answers[q.id] = choice;
    render(false);
    return;
  }
  if (p.mode === "view" || p.picked[q.id] !== undefined) return;
  p.picked[q.id] = choice;
  recordAnswer(q.id, choice === q.answer);
  render(false);
}

function move(step) {
  const p = current.params;
  const next = p.index + step;
  if (next < 0 || next >= p.ids.length) return;
  p.index = next;
  if (current.screen === "practice" && p.mode === "sequential") {
    progress.lastPos[p.subjectId] = next;
    saveProgress();
  }
  render(true);
}

// ---------- Mock exam ----------
let timerId = null;

function startExam() {
  const p = current.params;
  const ids = shuffle(questionsFor(p.id)).slice(0, p.count);
  const now = Date.now();
  go("exam", {
    subjectId: p.id, ids, index: 0, answers: {},
    startedAt: now, endsAt: now + ids.length * SECONDS_PER_QUESTION * 1000
  }, true);
}
function secondsLeft() {
  return Math.max(0, Math.round((current.params.endsAt - Date.now()) / 1000));
}
function startTimer() {
  stopTimer();
  timerId = setInterval(() => {
    if (current.screen !== "exam") { stopTimer(); return; }
    const left = secondsLeft();
    const el = document.getElementById("timer");
    if (el) {
      el.textContent = fmtTime(left);
      el.classList.toggle("warn", left <= 60);
    }
    if (left <= 0) submitExam(true);
  }, 1000);
}
function stopTimer() {
  if (timerId) { clearInterval(timerId); timerId = null; }
}
function confirmQuitExam() {
  showModal(`<h3>Quit exam?</h3><p class="muted">Your answers will be lost.</p>
    <div class="modal-actions"><button class="btn" onclick="closeModal()">Keep going</button>
    <button class="btn danger" onclick="back()">Quit</button></div>`);
}
function confirmSubmit() {
  const p = current.params;
  const unanswered = p.ids.filter(id => p.answers[id] === undefined).length;
  showModal(`<h3>Submit exam?</h3>
    <p class="muted">${unanswered ? `You have <b>${unanswered}</b> unanswered question${unanswered > 1 ? "s" : ""}. Unanswered questions count as wrong.` : "All questions answered."}</p>
    <div class="modal-actions"><button class="btn" onclick="closeModal()">Cancel</button>
    <button class="btn primary" onclick="submitExam(false)">Submit</button></div>`);
}
function showExamMap() {
  const p = current.params;
  showModal(`<h3>Question map</h3><p class="muted">Blue = answered. Tap a number to jump to it.</p>
    <div class="map">${p.ids.map((id, i) =>
      `<button class="${p.answers[id] !== undefined ? "done" : ""} ${i === p.index ? "here" : ""}" onclick="jumpTo(${i})">${i + 1}</button>`
    ).join("")}</div>
    <button class="btn block" onclick="closeModal()">Close</button>`);
}
function jumpTo(i) {
  closeModal();
  current.params.index = i;
  render(true);
}
function submitExam(timeUp) {
  stopTimer(); closeModal();
  const p = current.params;
  let correct = 0;
  p.ids.forEach(id => {
    const a = p.answers[id];
    if (a === undefined) return;
    const ok = a === QMAP[id].answer;
    if (ok) correct++;
    recordAnswer(id, ok);
  });
  const total = p.ids.length;
  const pct = Math.round(correct * 100 / total);
  const secs = Math.min(Math.round((Date.now() - p.startedAt) / 1000), total * SECONDS_PER_QUESTION);
  const result = { date: new Date().toISOString(), subject: p.subjectId, total, correct, pct, passed: pct >= PASS_MARK, secs };
  progress.exams.push(result);
  saveProgress();
  go("results", Object.assign({}, result, { ids: p.ids, answers: p.answers, timeUp }), true);
}
function retryWrong() {
  const r = current.params;
  const ids = r.ids.filter(id => r.answers[id] !== QMAP[id].answer);
  startPractice(r.subject, "retry", ids);
}

// ---------- Reset ----------
function confirmReset() {
  showModal(`<h3>Reset all progress?</h3>
    <p class="muted">This deletes your answer history, mistakes, favorites and exam results on this device. It cannot be undone.</p>
    <div class="modal-actions"><button class="btn" onclick="closeModal()">Cancel</button>
    <button class="btn danger" onclick="resetProgress()">Reset</button></div>`);
}
function resetProgress() {
  progress = emptyProgress();
  saveProgress();
  closeModal();
  render(true);
}

// =========================================================
//   SCREENS
// =========================================================
const SCREENS = {

  // ----- Home: subject list -----
  home() {
    let cont = "";
    const ls = progress.lastSubject;
    if (ls && SUBJECT_MAP[ls] && questionsFor(ls).length) {
      const n = questionsFor(ls).length;
      const pos = Math.min((progress.lastPos[ls] || 0) + 1, n);
      cont = `<button class="card tap continue" onclick="startPractice('${ls}','sequential')">
        <div class="muted">Continue where you left off</div>
        <div class="subject-name">${esc(subjectLabel(ls))}</div>
        <div class="muted">Question ${pos} of ${n}</div>
      </button>`;
    }
    const list = SUBJECTS.map(s => {
      const st = subjectStats(s.id);
      const pct = st.total ? Math.round(st.answered * 100 / st.total) : 0;
      return `<button class="card tap" onclick="go('subject',{id:'${s.id}'})">
        <div class="muted">${esc(s.level)}</div>
        <div class="subject-name">${esc(s.name)}</div>
        <div class="muted">${st.total} questions · ${pct}% answered</div>
        <div class="bar"><span style="width:${pct}%"></span></div>
      </button>`;
    }).join("");
    return topbar("Deck Review") +
      `<main class="page">${cont}<div class="section-title">Subjects</div>${list}</main>` +
      tabBar("home");
  },

  // ----- Subject detail: counters + practice modes -----
  subject(p) {
    const s = SUBJECT_MAP[p.id];
    const st = subjectStats(p.id);
    const tiles = [
      ["📖", "Sequential Practice", `startPractice('${p.id}','sequential')`, st.total, ""],
      ["🔀", "Random Practice", `startPractice('${p.id}','random')`, st.total, ""],
      ["⏱", "Mock Exam", `go('examSetup',{id:'${p.id}',count:0})`, st.total, "exam"],
      ["❗", "Review Mistakes", `startPractice('${p.id}','mistakes')`, st.mistakes, ""],
      ["★", "Favorites", `startPractice('${p.id}','favorites')`, st.favorites, ""],
      ["👁", "View Questions", `startPractice('${p.id}','view')`, st.total, ""]
    ];
    return topbar(esc(s.level), { back: "back()" }) +
      `<main class="page">
        <h2 class="title">${esc(s.name)}</h2>
        <div class="muted">${st.total} questions</div>
        <div class="counters">
          <div><b class="red">${st.mistakes}</b><span>Mistakes</span></div>
          <div><b>${st.favorites}</b><span>Favorites</span></div>
          <div><b>${st.answered}</b><span>Answered</span></div>
          <div><b>${st.accuracy === null ? "–" : st.accuracy + "%"}</b><span>Accuracy</span></div>
        </div>
        <div class="grid">${tiles.map(([ic, label, action, count, cls]) =>
          `<button class="tile ${cls}" onclick="${action}" ${count ? "" : "disabled"}><span class="ic">${ic}</span>${label}</button>`
        ).join("")}</div>
      </main>`;
  },

  // ----- Practice question -----
  practice(p) {
    const q = QMAP[p.ids[p.index]];
    const picked = p.picked[q.id];
    const revealed = p.mode === "view" || picked !== undefined;
    const fav = progress.favorites.includes(q.id);

    const choices = q.choices.map((c, i) => {
      let cls = "choice";
      if (revealed) {
        if (i === q.answer) cls += " correct";
        else if (i === picked) cls += " wrong";
      }
      return `<button class="${cls}" onclick="pickAnswer(${i})" ${revealed ? "disabled" : ""}>
        <span class="letter">${LETTERS[i]}</span><span>${esc(c)}</span></button>`;
    }).join("");

    let feedback = "";
    if (revealed) {
      const ok = p.mode === "view" || picked === q.answer;
      const head = p.mode === "view" ? `Answer: ${LETTERS[q.answer]}`
        : ok ? "✓ Correct!" : `✗ Wrong – the answer is ${LETTERS[q.answer]}`;
      const st = progress.stats[q.id];
      feedback = `<div class="feedback ${ok ? "ok" : "bad"}"><h3>${head}</h3>
        ${q.explanation ? esc(q.explanation) : '<span class="muted">No explanation yet.</span>'}</div>
        ${st ? `<p class="muted">Your record on this question: correct ${st.right}×, wrong ${st.wrong}×</p>` : ""}`;
    }

    const last = p.index === p.ids.length - 1;
    const star = fav ? '<span class="star-on">★</span>' : "☆";
    return topbar(esc(p.title), {
        back: "back()",
        right: `<span class="counter">${p.index + 1}/${p.ids.length}</span>
          <button class="icon-btn" onclick="toggleFavorite('${q.id}')" aria-label="Favorite">${star}</button>`
      }) +
      `<main class="page">
        ${q.sample ? '<span class="sample-tag">SAMPLE QUESTION – to be replaced</span>' : ""}
        <div class="muted">${esc(subjectLabel(q.subject))}</div>
        <p class="qtext">${esc(q.question)}</p>
        ${choices}${feedback}
      </main>
      <nav class="bottom"><div class="bottom-inner">
        <button class="btn" onclick="move(-1)" ${p.index === 0 ? "disabled" : ""}>‹ Previous</button>
        <button class="btn primary" onclick="${last ? "back()" : "move(1)"}">${last ? "Finish" : "Next ›"}</button>
      </div></nav>`;
  },

  // ----- Mock exam setup -----
  examSetup(p) {
    const total = questionsFor(p.id).length;
    const opts = [10, 25, 50, 100].filter(n => n < total).concat([total]);
    if (!p.count) p.count = opts.includes(50) ? 50 : total;
    const mins = Math.ceil(p.count * SECONDS_PER_QUESTION / 60);
    return topbar("Mock Exam", { back: "back()" }) +
      `<main class="page">
        <h2 class="title">${esc(SUBJECT_MAP[p.id].name)}</h2>
        <div class="muted">${total} questions available</div>
        <div class="section-title">Number of questions</div>
        <div class="chips">${opts.map(n =>
          `<button class="chip ${n === p.count ? "on" : ""}" onclick="current.params.count=${n};render(false)">${n === total ? "All (" + n + ")" : n}</button>`
        ).join("")}</div>
        <div class="card" style="margin-top:20px">
          <div class="info-line">⏱ Time limit: <b>${mins} min</b></div>
          <div class="info-line">✓ Passing score: <b>${PASS_MARK}%</b></div>
          <div class="muted" style="margin-top:8px">Questions are shuffled. Answers are shown only after you submit. The exam submits automatically when time runs out.</div>
        </div>
        <button class="btn primary block" onclick="startExam()">Start Exam</button>
      </main>`;
  },

  // ----- Mock exam question -----
  exam(p) {
    const q = QMAP[p.ids[p.index]];
    const a = p.answers[q.id];
    const left = secondsLeft();
    const choices = q.choices.map((c, i) =>
      `<button class="choice ${a === i ? "selected" : ""}" onclick="pickAnswer(${i})">
        <span class="letter">${LETTERS[i]}</span><span>${esc(c)}</span></button>`
    ).join("");
    const last = p.index === p.ids.length - 1;
    return topbar(`<span class="timer ${left <= 60 ? "warn" : ""}" id="timer">${fmtTime(left)}</span>`, {
        back: "confirmQuitExam()",
        right: `<span class="counter">${p.index + 1}/${p.ids.length}</span>
          <button class="icon-btn" onclick="showExamMap()" aria-label="Question map">▦</button>`
      }) +
      `<main class="page">
        <p class="qtext">${esc(q.question)}</p>
        ${choices}
        <button class="btn danger block" style="margin-top:24px" onclick="confirmSubmit()">Submit Exam</button>
      </main>
      <nav class="bottom"><div class="bottom-inner">
        <button class="btn" onclick="move(-1)" ${p.index === 0 ? "disabled" : ""}>‹ Previous</button>
        <button class="btn primary" onclick="move(1)" ${last ? "disabled" : ""}>Next ›</button>
      </div></nav>`;
  },

  // ----- Exam results -----
  results(r) {
    const wrongCount = r.total - r.correct;
    const items = r.ids.map((id, n) => {
      const q = QMAP[id];
      const a = r.answers[id];
      const ok = a === q.answer;
      return `<details class="review">
        <summary><span class="mark ${ok ? "ok" : "bad"}">${ok ? "✓" : "✗"}</span><span>${n + 1}. ${esc(q.question)}</span></summary>
        <p class="review-line">Your answer: <b>${a === undefined ? "(not answered)" : LETTERS[a] + ". " + esc(q.choices[a])}</b></p>
        <p class="review-line">Correct answer: <b>${LETTERS[q.answer]}. ${esc(q.choices[q.answer])}</b></p>
        ${q.explanation ? `<p class="review-line muted">${esc(q.explanation)}</p>` : ""}
      </details>`;
    }).join("");
    return topbar("Results", { back: "back()" }) +
      `<main class="page">
        <div class="card score">
          ${r.timeUp ? '<div class="muted">Time is up!</div>' : ""}
          <div class="big">${r.correct} / ${r.total}</div>
          <div style="font-size:20px;margin-bottom:12px">${r.pct}%</div>
          <span class="badge ${r.passed ? "pass" : "fail"}">${r.passed ? "PASSED" : "FAILED"}</span>
          <div class="muted" style="margin-top:12px">Pass mark ${PASS_MARK}% · Time used ${fmtTime(r.secs)}</div>
        </div>
        ${wrongCount ? `<button class="btn primary block" onclick="retryWrong()">Retry wrong answers (${wrongCount})</button>` : ""}
        <button class="btn block" onclick="back()">Back to subject</button>
        <div class="section-title">Review answers (tap to open)</div>
        ${items}
      </main>`;
  },

  // ----- Mistakes tab -----
  mistakes() { return listScreen("mistakes"); },

  // ----- Favorites tab -----
  favorites() { return listScreen("favorites"); },

  // ----- Progress tab -----
  progress() {
    const all = subjectStats(null);
    const perSubject = SUBJECTS.map(s => {
      const st = subjectStats(s.id);
      const pct = st.total ? Math.round(st.answered * 100 / st.total) : 0;
      return `<div class="card">
        <div class="subject-name">${esc(s.name)}</div>
        <div class="muted">${st.answered} of ${st.total} answered · accuracy ${st.accuracy === null ? "–" : st.accuracy + "%"}</div>
        <div class="bar"><span style="width:${pct}%"></span></div>
      </div>`;
    }).join("");
    const exams = progress.exams.slice().reverse();
    const history = exams.length
      ? `<div class="card"><table class="history">
          <tr><th>Date</th><th>Subject</th><th>Score</th><th>Result</th></tr>
          ${exams.map(e => `<tr>
            <td>${new Date(e.date).toLocaleDateString()}</td>
            <td>${esc(e.subject)}</td>
            <td>${e.correct}/${e.total} (${e.pct}%)</td>
            <td class="${e.passed ? "pass-text" : "fail-text"}">${e.passed ? "PASS" : "FAIL"}</td>
          </tr>`).join("")}
        </table></div>`
      : '<p class="muted" style="margin-left:4px">No mock exams taken yet.</p>';
    return topbar("Progress") +
      `<main class="page">
        <div class="card">
          <div class="counters" style="grid-template-columns:repeat(3,1fr);margin:4px 0">
            <div><b>${all.answered}/${all.total}</b><span>Answered</span></div>
            <div><b>${all.accuracy === null ? "–" : all.accuracy + "%"}</b><span>Accuracy</span></div>
            <div><b>${progress.exams.length}</b><span>Mock exams</span></div>
          </div>
        </div>
        <div class="section-title">By subject</div>
        ${perSubject}
        <div class="section-title">Mock exam history</div>
        ${history}
        <button class="btn block" style="margin-top:28px;border-color:var(--red);color:var(--red)" onclick="confirmReset()">Reset all progress</button>
      </main>` +
      tabBar("progress");
  }
};

// Shared layout for the Mistakes and Favorites tabs
function listScreen(kind) {
  const ids = progress[kind].filter(id => QMAP[id]);
  const title = kind === "mistakes" ? "Mistakes" : "Favorites";
  let body;
  if (!ids.length) {
    body = `<div class="empty">${kind === "mistakes"
      ? "No mistakes yet.<br>Questions you answer wrongly appear here. A question leaves this list after you answer it correctly twice in a row."
      : "No favorites yet.<br>Tap the ☆ star on any question to save it here."}</div>`;
  } else {
    const groups = SUBJECTS
      .map(s => ({ s, n: ids.filter(id => QMAP[id].subject === s.id).length }))
      .filter(g => g.n);
    body = `<button class="btn primary block" style="margin-top:0" onclick="startPractice(null,'${kind}')">Practise all ${title.toLowerCase()} (${ids.length})</button>
      <div class="section-title">By subject</div>` +
      groups.map(g => `<button class="card tap" onclick="startPractice('${g.s.id}','${kind}')">
        <div class="muted">${esc(g.s.level)}</div>
        <div class="subject-name">${esc(g.s.name)}</div>
        <div class="muted">${g.n} question${g.n > 1 ? "s" : ""} · tap to practise</div>
      </button>`).join("");
  }
  return topbar(title) + `<main class="page">${body}</main>` + tabBar(kind);
}

// ---------- Swipe left/right and keyboard arrows to change question ----------
let touchX = null, touchY = null;
document.addEventListener("touchstart", e => {
  touchX = e.touches[0].clientX;
  touchY = e.touches[0].clientY;
}, { passive: true });
document.addEventListener("touchend", e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  const dy = e.changedTouches[0].clientY - touchY;
  touchX = null;
  if (!modalEl.classList.contains("hidden")) return;
  if ((current.screen === "practice" || current.screen === "exam") &&
      Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    move(dx < 0 ? 1 : -1);
  }
});
document.addEventListener("keydown", e => {
  if (current.screen !== "practice" && current.screen !== "exam") return;
  if (!modalEl.classList.contains("hidden")) return;
  if (e.key === "ArrowRight") move(1);
  if (e.key === "ArrowLeft") move(-1);
});

// ---------- Start the app ----------
render(true);
