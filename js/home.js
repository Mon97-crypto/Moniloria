// Landing page: draws the collection cards.
(function () {
  const collections = [
    { name: "World Secrets", hook: "The Bermuda Triangle, lost cities, and the unexplained.", books: ["The Bermuda Triangle Files", "Lost Cities", "Unsolved", "Forbidden Places"] },
    { name: "Suspense Stories", hook: "Stories you finish at 3 a.m.", books: ["The Last Guest", "Room 13", "Don’t Answer the Door", "The Quiet Neighbour"] },
    { name: "Beauty Secrets", hook: "What actually works, and what it costs.", books: ["Glass Skin on a Budget", "The 5-Minute Face", "Hair Rituals", "What Dermatologists Use"] },
    { name: "Fitness Secrets", hook: "Stronger in less time than you think.", books: ["The 20-Minute Shred", "Eat More, Weigh Less", "Lazy Body Recomp", "Mobility Secrets"] },
    { name: "Cooking Secrets", hook: "Restaurant tricks for a home kitchen.", books: ["Restaurant Tricks at Home", "15-Minute Dinners", "The Spice Code", "Bake Like a Pro"] },
    { name: "Leadership Secrets", hook: "How quiet people end up running the room.", books: ["How Quiet People Lead", "The First 90 Days", "Influence Without Authority", "Hard Conversations"] },
    { name: "Alternate Reality", hook: "Interactive stories where you choose the ending.", books: ["How to Survive a Zombie Apocalypse", "The Bermuda Signal", "Blackwood Manor", "The Heist"], href: "story.html" },
  ];

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  const grid = document.getElementById("collection-grid");
  collections.forEach(function (c, i) {
    const li = el("li", "collection" + (c.href ? " collection-live" : ""));
    li.appendChild(el("span", "collection-number", String(i + 1).padStart(2, "0")));
    li.appendChild(el("h3", "", c.name));
    li.appendChild(el("p", "collection-hook", c.hook));
    const titles = el("ul", "collection-titles");
    c.books.forEach((b) => titles.appendChild(el("li", "", b)));
    li.appendChild(titles);
    if (c.href) {
      const link = el("a", "collection-link", "Play now");
      link.href = c.href;
      li.appendChild(link);
    }
    grid.appendChild(li);
  });
})();
