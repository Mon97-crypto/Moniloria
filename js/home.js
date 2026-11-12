// Landing page: typewriter intro, the shelf of books, and the collection list.
(function () {
  const collections = [
    { name: "World Secrets", color: "#1d1a1a", ink: "#f1f0ed", hook: "The Bermuda Triangle, lost cities, and the unexplained.", books: ["The Bermuda Triangle Files", "Lost Cities", "Unsolved", "Forbidden Places"] },
    { name: "Suspense Stories", color: "#c22a1f", ink: "#fff", hook: "Stories you finish at 3 a.m.", books: ["The Last Guest", "Room 13", "Don’t Answer the Door", "The Quiet Neighbour"] },
    { name: "Beauty Secrets", color: "#f45bab", ink: "#fff", hook: "What actually works, and what it costs.", books: ["Glass Skin on a Budget", "The 5-Minute Face", "Hair Rituals", "What Dermatologists Use"] },
    { name: "Fitness Secrets", color: "#34963b", ink: "#fff", hook: "Stronger in less time than you think.", books: ["The 20-Minute Shred", "Eat More, Weigh Less", "Lazy Body Recomp", "Mobility Secrets"] },
    { name: "Cooking Secrets", color: "#f2641a", ink: "#fff", hook: "Restaurant tricks for a home kitchen.", books: ["Restaurant Tricks at Home", "15-Minute Dinners", "The Spice Code", "Bake Like a Pro"] },
    { name: "Leadership Secrets", color: "#69bdf7", ink: "#12202b", hook: "How quiet people end up running the room.", books: ["How Quiet People Lead", "The First 90 Days", "Influence Without Authority", "Hard Conversations"] },
    { name: "Alternate Reality", color: "#a57bea", ink: "#fff", hook: "Interactive stories where you choose the ending.", books: ["How to Survive a Zombie Apocalypse", "The Bermuda Signal", "Blackwood Manor", "The Heist"] },
  ];

  // ----- shelf: one leaning book per title -----
  const shelf = document.getElementById("shelf");
  const spines = [];
  for (let i = 0; i < 4; i++) {
    collections.forEach(function (c) {
      spines.push({ title: c.books[i], color: c.color, ink: c.ink });
    });
  }
  spines.forEach(function (s) {
    const book = document.createElement("span");
    book.className = "book";
    book.style.setProperty("--cover", s.color);
    book.style.setProperty("--ink", s.ink);
    const label = document.createElement("span");
    label.textContent = s.title;
    book.appendChild(label);
    shelf.appendChild(book);
  });

  // ----- collection list -----
  const list = document.getElementById("collection-list");
  collections.forEach(function (c) {
    const li = document.createElement("li");
    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.style.background = c.color;
    const name = document.createElement("span");
    name.className = "collection-name";
    name.textContent = c.name;
    const hook = document.createElement("span");
    hook.className = "collection-hook";
    hook.textContent = c.hook;
    li.appendChild(swatch);
    li.appendChild(name);
    li.appendChild(hook);
    list.appendChild(li);
  });

  // ----- typewriter intro, once per visit -----
  const intro = document.getElementById("intro");
  const line = "In 1945, five planes flew into the Bermuda Triangle. None of them came back.";
  let seen = false;
  try {
    seen = sessionStorage.getItem("moniloria.intro") === "1";
  } catch (e) {}
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function closeIntro() {
    intro.classList.add("done");
    try {
      sessionStorage.setItem("moniloria.intro", "1");
    } catch (e) {}
    setTimeout(function () {
      intro.hidden = true;
    }, 600);
  }

  if (!seen && !reduced) {
    intro.hidden = false;
    const out = document.getElementById("intro-text");
    let i = 0;
    const tick = setInterval(function () {
      out.textContent = line.slice(0, ++i);
      if (i >= line.length) {
        clearInterval(tick);
        setTimeout(closeIntro, 1400);
      }
    }, 45);
    document.getElementById("intro-skip").addEventListener("click", function () {
      clearInterval(tick);
      closeIntro();
    });
  }
})();
