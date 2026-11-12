# Moniloria

An ebook store of secrets, with **Alternate Reality**: interactive stories that use the
reader's name and change with every choice.

This is a static site (plain HTML, CSS and JavaScript, no build step).

## Run it

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## What's here

| File | What it is |
|---|---|
| `index.html` | Landing page: hero, collections, Alternate Reality, pricing |
| `story.html` | The interactive story reader |
| `js/stories/zombie.js` | "How to Survive a Zombie Apocalypse": 6 endings, one secret |
| `js/engine.js` | Runs any story file: choices, timer, saved progress, endings |
| `js/auth.js` | Sign-in (Google or guest name) |
| `js/i18n.js` | Language switch and the Kannada text for both pages |
| `js/catalog.kn.js` | Kannada names, hooks and samples for the 24 books |
| `js/stories/zombie.kn.js` | Kannada text for the zombie story |
| `js/config.js` | Put your Google client ID here to turn on Google sign-in |

## Turning on Google sign-in

Follow the steps at the top of `js/config.js`. Until a client ID is set, readers type their
first name instead.

## Not built yet

- Payments and checkout
- Reader accounts on a server (progress is saved in the browser for now)
- The downloadable ebooks themselves
