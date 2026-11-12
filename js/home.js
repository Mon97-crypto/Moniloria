// Landing page: collection tiles, book cards, collection filter and sample dialog.
(function () {
  const PRICE = "$20";

  // Each collection has its own colours (from, to, accent) and a one-word mood.
  const collections = [
    {
      id: "world", name: "World Secrets", mood: "Unexplained",
      hook: "The Bermuda Triangle, lost cities, and what nobody could explain.",
      from: "#12505f", to: "#04161c", accent: "#5fe0d2",
      books: [
        { title: "The Bermuda Triangle Files", hook: "Five planes flew in. None flew out.", sample: "On 5 December 1945, five Navy bombers left Fort Lauderdale on a routine training flight. Ninety minutes later the flight leader radioed that his compasses had failed and he could not tell which way was west. Then the radio went quiet." },
        { title: "Lost Cities", hook: "Whole civilisations, erased from the map.", sample: "For centuries Troy was only a poem. Scholars agreed it had never existed. Then a man with a spade and a copy of Homer started digging into a hill in Turkey, and found not one city, but nine, stacked on top of each other." },
        { title: "Unsolved", hook: "The cases that still have no answer.", sample: "In February 1959, nine experienced hikers pitched their tent on a frozen slope in the Ural Mountains. Searchers later found it cut open from the inside. The hikers had fled into the night without their boots." },
        { title: "Forbidden Places", hook: "Where you are not allowed to go, and why.", sample: "There is an island in the Indian Ocean where landing is forbidden by law. The people who live there have refused contact with the outside world for as long as anyone has tried to make it. This is what we know about them, which is almost nothing." },
      ],
    },
    {
      id: "suspense", name: "Suspense Stories", mood: "Sleepless",
      hook: "Stories you will finish at 3 a.m.",
      from: "#7a1226", to: "#1a0408", accent: "#ff6b81",
      books: [
        { title: "The Last Guest", hook: "Twelve arrived for dinner. Eleven were invited.", sample: "The place cards were handwritten, twelve of them, and Clara had only written eleven. She counted the chairs twice. Then the doorbell rang, and everyone who was supposed to be there was already sitting down." },
        { title: "Room 13", hook: "The hotel has no thirteenth room. You have the key.", sample: "The receptionist slid the key across the desk without looking up. It was brass, heavy, and stamped with a number the hotel brochure insisted did not exist. “Third floor,” she said. “Don’t use the lift after midnight.”" },
        { title: "Don’t Answer the Door", hook: "Three knocks, every night, at 2:17.", sample: "The first night, Maya thought it was the pipes. The second night she checked the peephole and saw an empty hallway. On the third night she found the note on the inside of the door, in her own handwriting: DON’T." },
        { title: "The Quiet Neighbour", hook: "He was always so polite.", sample: "Everyone on Alder Street agreed that Mr. Hale was the perfect neighbour. He took in parcels. He watered plants. He knew, somehow, exactly when each of them left for work, and exactly when they came home." },
      ],
    },
    {
      id: "beauty", name: "Beauty Secrets", mood: "Radiant",
      hook: "What actually works, and what it really costs.",
      from: "#8a2f68", to: "#240a1c", accent: "#ff9fd8",
      books: [
        { title: "Glass Skin on a Budget", hook: "The glow, without the price tag.", sample: "The most expensive thing in most skincare routines is the part that does nothing. Before you buy anything new, we are going to take three things off your shelf. Your skin, and your bank balance, will notice within a month." },
        { title: "The 5-Minute Face", hook: "Polished before your coffee cools.", sample: "Makeup artists have a secret that has nothing to do with products: order. Do the same five steps in the right sequence and you can stop at any point and still look finished. Here is the sequence." },
        { title: "Hair Rituals", hook: "Old traditions from around the world.", sample: "Long before conditioner came in a bottle, people in every culture had a hair ritual passed down through families: oils, rinses, combing routines. Some are folklore. Some are surprisingly sensible. This book sorts one from the other." },
        { title: "What Dermatologists Use", hook: "The short shelf the experts keep.", sample: "Ask a dermatologist what is on their own bathroom shelf and the answer is usually shorter than you would expect. Sunscreen comes first, nearly every time. The interesting part is what they leave out." },
      ],
    },
    {
      id: "fitness", name: "Fitness Secrets", mood: "Relentless",
      hook: "Stronger in less time than you think.",
      from: "#17663a", to: "#04180c", accent: "#6be896",
      books: [
        { title: "The 20-Minute Shred", hook: "No gym. No excuses. Twenty minutes.", sample: "You do not have a time problem. You have a decision problem: by the time you have chosen a workout, the window is gone. So this book makes every decision for you. Day one starts on the next page." },
        { title: "Eat More, Weigh Less", hook: "Fuller plates, smaller numbers.", sample: "Two plates can hold the same calories and look nothing alike. One is a handful of food. The other is a full dinner. Learning to tell them apart is the least miserable way anyone has found to eat less." },
        { title: "Lazy Body Recomp", hook: "The least effort that still works.", sample: "Most fitness plans fail in week three, when life gets busy. This one is built for week three. It asks for the smallest amount of training that still makes a visible difference, and not one minute more." },
        { title: "Mobility Secrets", hook: "Move like you did at nineteen.", sample: "Stand up. Try to sit on the floor and get back up without using your hands. How that went tells you more about the next thirty years than your weight does. The good news is that it is trainable." },
      ],
    },
    {
      id: "cooking", name: "Cooking Secrets", mood: "Indulgent",
      hook: "Restaurant tricks for a home kitchen.",
      from: "#8a4310", to: "#221002", accent: "#ffb95e",
      books: [
        { title: "Restaurant Tricks at Home", hook: "Why theirs tastes better than yours.", sample: "Restaurant food tastes better than yours for three reasons, and none of them is talent. More salt, more butter, and a much hotter pan. Once you know where chefs use each one, your Tuesday dinners change." },
        { title: "15-Minute Dinners", hook: "Faster than the delivery driver.", sample: "The clock starts when you walk into the kitchen and stops when you sit down. Every recipe in this book was timed that way, by a tired person, on a weeknight. Nothing took longer than fifteen minutes." },
        { title: "The Spice Code", hook: "Five jars that change everything.", sample: "You own a shelf of spices and you use two of them. That is normal. This book gives you five jars and a simple rule for combining them, and by the end you will cook without a recipe." },
        { title: "Bake Like a Pro", hook: "Bakery results, ordinary oven.", sample: "Baking fails for boring reasons: cold butter, a hot oven that is not as hot as it says, flour measured in cups. Fix those three and most recipes simply work. We will start with the oven." },
      ],
    },
    {
      id: "leadership", name: "Leadership Secrets", mood: "Commanding",
      hook: "How quiet people end up running the room.",
      from: "#22419c", to: "#070d26", accent: "#9bbcff",
      books: [
        { title: "How Quiet People Lead", hook: "You don’t have to be the loudest.", sample: "Watch any meeting closely and you will see that the person who talks most is rarely the person who decides. The decision usually belongs to someone who spoke twice. This book is about being that person on purpose." },
        { title: "The First 90 Days", hook: "New role. Three months to prove it.", sample: "In a new job you have about ninety days before people stop explaining things to you and start judging you. What you do with those days matters more than anything you do in the following year." },
        { title: "Influence Without Authority", hook: "Get a yes when you’re not the boss.", sample: "You need something from someone who does not report to you, does not owe you, and is busy. This is the most common situation at work, and almost nobody is taught how to handle it." },
        { title: "Hard Conversations", hook: "Say the thing you’ve been avoiding.", sample: "There is a conversation you have been putting off. You already know which one. The cost of avoiding it has been going up every week, and it will take less than ten minutes to have. Here is how to start it." },
      ],
    },
  ];

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const paint = (node, c) => {
    node.style.setProperty("--from", c.from);
    node.style.setProperty("--to", c.to);
    node.style.setProperty("--accent", c.accent);
  };

  // ----- collection tiles -----
  const tiles = document.getElementById("collection-tiles");
  collections.forEach(function (c, i) {
    const li = el("li");
    const tile = el("button", "tile");
    tile.type = "button";
    paint(tile, c);
    tile.appendChild(el("span", "tile-top", String(i + 1).padStart(2, "0") + " · " + c.mood));
    tile.appendChild(el("span", "tile-name", c.name));
    tile.appendChild(el("span", "tile-hook", c.hook));
    tile.appendChild(el("span", "tile-foot", c.books.length + " books · " + PRICE + " each"));
    tile.addEventListener("click", function () {
      setFilter(c.id);
      document.getElementById("books").scrollIntoView({ behavior: "smooth" });
    });
    li.appendChild(tile);
    tiles.appendChild(li);
  });

  // ----- book cards -----
  const grid = document.getElementById("book-grid");
  const cards = [];
  collections.forEach(function (c) {
    c.books.forEach(function (b) {
      const li = el("li", "book-card");
      paint(li, c);

      const stage = el("div", "book3d");
      const book = el("div", "book3d-body");
      const face = el("div", "book3d-face");
      face.appendChild(el("span", "book3d-kicker", c.name));
      face.appendChild(el("span", "book3d-title", b.title));
      book.appendChild(face);
      stage.appendChild(book);
      li.appendChild(stage);

      li.appendChild(el("p", "book-collection", c.name));
      li.appendChild(el("h3", "book-title", b.title));
      li.appendChild(el("p", "book-hook", b.hook));

      const row = el("div", "book-row");
      row.appendChild(el("span", "book-price", PRICE));
      const sample = el("button", "book-sample", "Read a sample");
      sample.type = "button";
      sample.addEventListener("click", function () {
        openSample(c, b);
      });
      row.appendChild(sample);
      li.appendChild(row);

      grid.appendChild(li);
      cards.push({ node: li, collection: c.id });
    });
  });

  // ----- filter -----
  const filters = document.getElementById("book-filters");
  const chips = [];
  function addChip(id, label) {
    const chip = el("button", "chip", label);
    chip.type = "button";
    chip.addEventListener("click", function () {
      setFilter(id);
    });
    filters.appendChild(chip);
    chips.push({ node: chip, id: id });
  }
  addChip("all", "All books");
  collections.forEach((c) => addChip(c.id, c.name));

  function setFilter(id) {
    chips.forEach(function (ch) {
      const on = ch.id === id;
      ch.node.classList.toggle("on", on);
      ch.node.setAttribute("aria-pressed", String(on));
    });
    cards.forEach(function (card) {
      card.node.hidden = id !== "all" && card.collection !== id;
    });
  }
  setFilter("all");

  // ----- sample dialog -----
  const dialog = document.getElementById("sample");
  function openSample(c, b) {
    paint(dialog, c);
    document.getElementById("sample-collection").textContent = c.name;
    document.getElementById("sample-title").textContent = b.title;
    document.getElementById("sample-text").textContent = b.sample;
    dialog.showModal();
  }
  document.getElementById("sample-close").addEventListener("click", function () {
    dialog.close();
  });
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) dialog.close(); // click on the backdrop
  });
})();
