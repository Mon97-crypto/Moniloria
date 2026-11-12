// The Alternate Reality reader: sign-in gate, scenes, choices, timer, endings.
(function () {
  const Auth = window.MoniloriaAuth;
  const story = window.MONILORIA_STORIES.zombie;
  const $ = (id) => document.getElementById(id);

  let reader = null;
  let state = null;
  let timerId = null;

  // ---------- saved progress (per reader, in this browser) ----------
  const store = {
    get(key, fallback) {
      try {
        const v = JSON.parse(localStorage.getItem(key));
        return v == null ? fallback : v;
      } catch (e) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {}
    },
  };
  const endingsKey = () => `moniloria.endings.${story.id}.${reader.id}`;
  const progressKey = () => `moniloria.progress.${story.id}.${reader.id}`;
  const foundEndings = () => store.get(endingsKey(), []);

  // ---------- views ----------
  function show(view) {
    ["gate-view", "scene-view", "ending-view"].forEach((id) => {
      $(id).hidden = id !== view;
    });
    window.scrollTo(0, 0);
  }

  // ---------- sign-in ----------
  function showGate() {
    show("gate-view");
    $("reader-chip").hidden = true;
    const hasGoogle = Auth.renderGoogleButton($("google-button"), start);
    $("google-block").hidden = !hasGoogle;
    $("guest-label").textContent = hasGoogle
      ? "Or continue as a guest"
      : "What should we call you?";
  }

  $("guest-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const r = Auth.signInAsGuest($("guest-name").value);
    if (!r) {
      $("guest-error").textContent = "Please enter your first name.";
      return;
    }
    start(r);
  });

  $("sign-out").addEventListener("click", function () {
    stopTimer();
    Auth.signOut();
    reader = null;
    showGate();
  });

  // ---------- story ----------
  function start(r) {
    reader = r;
    $("reader-name").textContent = reader.name;
    $("reader-chip").hidden = false;
    const saved = store.get(progressKey(), null);
    if (saved && story.nodes[saved.node] && !story.nodes[saved.node].ending) {
      state = saved;
    } else {
      newGame();
    }
    renderScene();
  }

  function newGame() {
    state = Object.assign({ node: story.start, step: 1 }, story.initialState);
  }

  const resolve = (value) => (typeof value === "function" ? value(state) : value);
  const personalise = (text) => text.replace(/\{name\}/g, reader.name);

  function renderParagraphs(el, paragraphs) {
    el.innerHTML = "";
    paragraphs.forEach(function (text, i) {
      const p = document.createElement("p");
      p.textContent = personalise(text); // textContent keeps the reader's name safe
      p.style.animationDelay = i * 0.35 + "s";
      el.appendChild(p);
    });
  }

  function renderStats() {
    const who = [state.rosa && "Rosa", state.kai && "Kai"].filter(Boolean);
    $("stat-supplies").textContent = state.supplies;
    $("stat-trust").textContent = state.trust;
    $("stat-with").textContent = who.length ? who.join(" & ") : "No one";
  }

  function renderScene() {
    stopTimer();
    const node = story.nodes[state.node];
    if (node.ending) return renderEnding(node);

    store.set(progressKey(), state);
    show("scene-view");
    $("chapter").textContent = node.chapter;
    renderParagraphs($("scene-text"), resolve(node.text));
    renderStats();

    const box = $("choices");
    box.innerHTML = "";
    const isChoice = node.choices.length > 1;
    box.className = isChoice ? "choices two" : "choices";
    $("choice-prompt").hidden = !isChoice;

    node.choices.forEach(function (choice) {
      const b = document.createElement("button");
      b.className = isChoice ? "choice" : "continue";
      b.textContent = choice.label;
      b.addEventListener("click", function () {
        choose(choice);
      });
      box.appendChild(b);
    });

    if (node.timer) startTimer(node);
  }

  function choose(choice) {
    stopTimer();
    if (choice.effect) choice.effect(state);
    state.node = resolve(choice.next);
    state.step += 1;
    renderScene();
  }

  // ---------- timed choices ----------
  function startTimer(node) {
    const bar = $("timer");
    const fill = $("timer-fill");
    const total = node.timer * 1000;
    const began = Date.now();
    bar.hidden = false;
    timerId = setInterval(function () {
      const left = Math.max(0, total - (Date.now() - began));
      fill.style.width = (left / total) * 100 + "%";
      if (left === 0) {
        stopTimer();
        state.node = node.timeoutNext;
        state.step += 1;
        renderScene();
      }
    }, 50);
  }

  function stopTimer() {
    if (timerId) clearInterval(timerId);
    timerId = null;
    $("timer").hidden = true;
    $("timer-fill").style.width = "100%";
  }

  // ---------- endings ----------
  function renderEnding(node) {
    const found = foundEndings();
    const isNew = found.indexOf(node.ending) === -1;
    if (isNew) {
      found.push(node.ending);
      store.set(endingsKey(), found);
    }
    store.set(progressKey(), null);

    const ending = story.endings.find((e) => e.id === node.ending);
    const number = story.endings.indexOf(ending) + 1;

    show("ending-view");
    $("ending-chapter").textContent = node.chapter;
    renderParagraphs($("ending-text"), resolve(node.text));
    $("ending-kind").textContent = ending.kind + (isNew ? " · New ending found" : "");
    $("ending-title").textContent = ending.title;
    $("ending-count").textContent =
      `${reader.name}, you have found ${found.length} of ${story.endings.length} endings.`;

    const grid = $("ending-grid");
    grid.innerHTML = "";
    story.endings.forEach(function (e, i) {
      const unlocked = found.indexOf(e.id) !== -1;
      const card = document.createElement("li");
      card.className = "ending-card" + (unlocked ? " unlocked" : "") + (e.id === node.ending ? " current" : "");
      const n = document.createElement("span");
      n.className = "ending-number";
      n.textContent = "Ending " + (i + 1);
      const t = document.createElement("span");
      t.className = "ending-name";
      t.textContent = unlocked ? e.title : "Not found yet";
      card.appendChild(n);
      card.appendChild(t);
      grid.appendChild(card);
    });

    $("share").onclick = function () {
      const text = `I got “${ending.title}” (ending ${number} of ${story.endings.length}) in ${story.title} on Moniloria. Can you survive?`;
      const done = () => ($("share").textContent = "Copied to clipboard");
      if (navigator.share) {
        navigator.share({ text: text }).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(done, function () {});
      }
    };
  }

  $("play-again").addEventListener("click", function () {
    $("share").textContent = "Share your ending";
    newGame();
    renderScene();
  });

  // ---------- go ----------
  reader = Auth.current();
  if (reader) start(reader);
  else showGate();
})();
