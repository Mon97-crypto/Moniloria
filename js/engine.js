// The Alternate Reality reader: sign-in gate, scenes, choices, timer, endings.
(function () {
  const Auth = window.MoniloriaAuth;
  const I18n = window.MoniloriaI18n;
  const t = I18n.t;
  const story = window.MONILORIA_STORIES.zombie;
  // Translated words for the story, when the reader has chosen that language.
  const words = (I18n.lang !== "en" && story[I18n.lang]) || null;
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

  // ---------- story text in the reader's language ----------
  const resolve = (value) => (typeof value === "function" ? value(state) : value);
  const personalise = (text) => text.replace(/\{name\}/g, reader.name);
  const storyTitle = () => (words ? words.title : story.title);
  const chapterOf = (id) => (words ? words.nodes[id].chapter : story.nodes[id].chapter);
  const textOf = (id) => resolve(words ? words.nodes[id].text : story.nodes[id].text);
  const labelOf = (id, i) => (words ? words.nodes[id].choices[i] : story.nodes[id].choices[i].label);
  const endingWords = (e) => (words ? words.endings[e.id] : e);

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
    $("gate-title").textContent = storyTitle();
    const hasGoogle = Auth.renderGoogleButton($("google-button"), start);
    $("google-block").hidden = !hasGoogle;
    $("guest-label").textContent = t(hasGoogle ? "gate.guestLabelAlt" : "gate.guestLabel");
  }

  $("guest-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const r = Auth.signInAsGuest($("guest-name").value);
    if (!r) {
      $("guest-error").textContent = t("gate.error");
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
    const who = [state.rosa && t("story.rosa"), state.kai && t("story.kai")].filter(Boolean);
    $("stat-supplies").textContent = state.supplies;
    $("stat-trust").textContent = state.trust;
    $("stat-with").textContent = who.length ? who.join(t("story.and")) : t("story.noone");
  }

  function renderScene() {
    stopTimer();
    const id = state.node;
    const node = story.nodes[id];
    if (node.ending) return renderEnding(id, node);

    store.set(progressKey(), state);
    show("scene-view");
    $("chapter").textContent = chapterOf(id);
    renderParagraphs($("scene-text"), textOf(id));
    renderStats();

    const box = $("choices");
    box.innerHTML = "";
    const isChoice = node.choices.length > 1;
    box.className = isChoice ? "choices two" : "choices";
    $("choice-prompt").hidden = !isChoice;

    node.choices.forEach(function (choice, i) {
      const b = document.createElement("button");
      b.className = isChoice ? "choice" : "continue";
      b.textContent = labelOf(id, i);
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
  function renderEnding(id, node) {
    const found = foundEndings();
    const isNew = found.indexOf(node.ending) === -1;
    if (isNew) {
      found.push(node.ending);
      store.set(endingsKey(), found);
    }
    store.set(progressKey(), null);

    const ending = story.endings.find((e) => e.id === node.ending);
    const number = story.endings.indexOf(ending) + 1;
    const total = story.endings.length;
    const shown = endingWords(ending);

    show("ending-view");
    $("ending-chapter").textContent = chapterOf(id);
    renderParagraphs($("ending-text"), textOf(id));
    $("ending-kind").textContent = shown.kind + (isNew ? " · " + t("ending.new") : "");
    $("ending-title").textContent = shown.title;
    $("ending-count").textContent = t("ending.count", {
      name: reader.name,
      found: found.length,
      total: total,
    });

    const grid = $("ending-grid");
    grid.innerHTML = "";
    story.endings.forEach(function (e, i) {
      const unlocked = found.indexOf(e.id) !== -1;
      const card = document.createElement("li");
      card.className = "ending-card" + (unlocked ? " unlocked" : "") + (e.id === node.ending ? " current" : "");
      const n = document.createElement("span");
      n.className = "ending-number";
      n.textContent = t("ending.number", { n: i + 1 });
      const name = document.createElement("span");
      name.className = "ending-name";
      name.textContent = unlocked ? endingWords(e).title : t("ending.locked");
      card.appendChild(n);
      card.appendChild(name);
      grid.appendChild(card);
    });

    $("share").textContent = t("ending.share");
    $("share").onclick = function () {
      const text = t("ending.shareText", {
        ending: shown.title,
        n: number,
        total: total,
        story: storyTitle(),
      });
      const done = () => ($("share").textContent = t("ending.copied"));
      if (navigator.share) {
        navigator.share({ text: text }).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(done, function () {});
      }
    };
  }

  $("play-again").addEventListener("click", function () {
    newGame();
    renderScene();
  });

  // ---------- go ----------
  reader = Auth.current();
  if (reader) start(reader);
  else showGate();
})();
