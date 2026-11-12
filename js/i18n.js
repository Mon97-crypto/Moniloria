// Language support: English (default) and Kannada.
//
// - English text lives in the HTML. Kannada text lives in the `kn` table below.
// - Any element with data-i18n="key" gets its text swapped when Kannada is on.
// - The reader's choice is remembered in the browser.
(function () {
  const KEY = "moniloria.lang";

  let lang = "en";
  try {
    if (localStorage.getItem(KEY) === "kn") lang = "kn";
  } catch (e) {}

  // English strings that JavaScript needs (everything else is in the HTML).
  const en = {
    "books.all": "All books",
    "tile.foot": "{n} books · $20 each",
    "book.sample": "Read a sample",
    "story.prompt": "What do you do?",
    "story.noone": "No one",
    "story.and": " & ",
    "story.rosa": "Rosa",
    "story.kai": "Kai",
    "gate.guestLabel": "What should we call you?",
    "gate.guestLabelAlt": "Or continue as a guest",
    "gate.error": "Please enter your first name.",
    "ending.new": "New ending found",
    "ending.count": "{name}, you have found {found} of {total} endings.",
    "ending.number": "Ending {n}",
    "ending.locked": "Not found yet",
    "ending.share": "Share your ending",
    "ending.copied": "Copied to clipboard",
    "ending.shareText":
      "I got “{ending}” (ending {n} of {total}) in {story} on Moniloria. Can you survive?",
  };

  const kn = {
    // ----- shared -----
    "nav.collections": "ಸಂಗ್ರಹಗಳು",
    "nav.ar": "ಪರ್ಯಾಯ ವಾಸ್ತವ",
    "nav.pricing": "ಬೆಲೆ",
    "nav.cta": "ಓದಲು ಆರಂಭಿಸಿ",
    "footer.tagline": "ಯಾರೂ ನಿಮಗೆ ಹೇಳದ ಎಲ್ಲವೂ.",
    "footer.legal": "© 2026 Moniloria. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",

    // ----- landing page -----
    "page.title": "Moniloria | ಯಾರೂ ನಿಮಗೆ ಹೇಳದ ಎಲ್ಲವೂ",
    "hero.eyebrow": "ರಹಸ್ಯಗಳ ಗ್ರಂಥಾಲಯ",
    "hero.h1": "ಯಾರೂ ನಿಮಗೆ <em>ಹೇಳದ</em> ಎಲ್ಲವೂ.",
    "hero.lede":
      "ಸೌಂದರ್ಯ, ಶಕ್ತಿ, ಅಡುಗೆ, ನಾಯಕತ್ವ, ಮತ್ತು ಯಾರಿಗೂ ವಿವರಿಸಲಾಗದ ನಿಗೂಢಗಳು. ರಹಸ್ಯಗಳ ಆರು ಸಂಗ್ರಹಗಳು, ಮತ್ತು ನಿಮ್ಮ ಪ್ರತಿ ಆಯ್ಕೆಯೊಂದಿಗೆ ಬದಲಾಗುವ ಕಥೆಗಳು.",
    "hero.play": "ಒಂದು ಕಥೆಯನ್ನು ಉಚಿತವಾಗಿ ಆಡಿ",
    "hero.browse": "ಸಂಗ್ರಹಗಳನ್ನು ನೋಡಿ",
    "stack.world": "ಜಗತ್ತಿನ ರಹಸ್ಯಗಳು",
    "stack.worldTitle": "ಬರ್ಮುಡಾ ತ್ರಿಕೋನದ ಕಡತಗಳು",
    "stack.suspense": "ಸಸ್ಪೆನ್ಸ್",
    "stack.suspenseTitle": "ಬಾಗಿಲು ತೆರೆಯಬೇಡಿ",
    "stack.ar": "ಪರ್ಯಾಯ ವಾಸ್ತವ",
    "zombie.title": "ಜೊಂಬಿ ಮಹಾವಿಪತ್ತಿನಲ್ಲಿ ಬದುಕುಳಿಯುವುದು ಹೇಗೆ",
    "zombie.endings": "6 ಅಂತ್ಯಗಳು",
    "collections.eyebrow": "ಆರು ಸಂಗ್ರಹಗಳು",
    "collections.h2": "ನಿಮ್ಮ ರಹಸ್ಯವನ್ನು ಆರಿಸಿ.",
    "books.eyebrow": "ಗ್ರಂಥಾಲಯ",
    "books.h2": "ಪ್ರತಿ ಪುಸ್ತಕ, $20.",
    "books.all": "ಎಲ್ಲಾ ಪುಸ್ತಕಗಳು",
    "tile.foot": "{n} ಪುಸ್ತಕಗಳು · ತಲಾ $20",
    "book.sample": "ಮಾದರಿ ಓದಿ",
    "sample.label": "ಮೊದಲ ಪುಟದಿಂದ",
    "sample.note": "ಪೂರ್ಣ ಮೊದಲ ಅಧ್ಯಾಯ ಬಿಡುಗಡೆಯ ದಿನ ಉಚಿತವಾಗಿ ಓದಲು ಸಿಗುತ್ತದೆ.",
    "sample.close": "ಮುಚ್ಚಿ",
    "ar.eyebrow": "ಹೊಸದು · ಸಂವಾದಾತ್ಮಕ",
    "ar.h2": "ಪರ್ಯಾಯ ವಾಸ್ತವ",
    "ar.lede":
      "ಇವು ನಿಮ್ಮದೇ ಕಥೆಗಳು. ಇವು ನಿಮ್ಮ ಹೆಸರನ್ನು ಬಳಸುತ್ತವೆ. ಪ್ರತಿ ತಿರುವಿನಲ್ಲೂ ಮುಂದೇನಾಗಬೇಕು ಎಂದು ನೀವೇ ಆರಿಸುತ್ತೀರಿ, ಮತ್ತು ನೀವು ತಲುಪುವ ಅಂತ್ಯ ನಿಮ್ಮ ಆಯ್ಕೆಗಳ ಫಲ.",
    "ar.point1": "ಆಯ್ಕೆಗಳು, ಪ್ರತಿ ರೋಚಕ ತಿರುವಿನಲ್ಲಿ",
    "ar.point2": "ಅಂತ್ಯಗಳು ಹುಡುಕಲು, ಅದರಲ್ಲಿ ಒಂದು ರಹಸ್ಯ",
    "ar.point3": "ಸೆಕೆಂಡುಗಳು, ಅತಿ ಮುಖ್ಯ ಕ್ಷಣದಲ್ಲಿ ನಿರ್ಧರಿಸಲು",
    "ar.begin": "ಮೊದಲ ಅಧ್ಯಾಯ ಉಚಿತವಾಗಿ ಆರಂಭಿಸಿ",
    "ar.coverKicker": "ಪರ್ಯಾಯ ವಾಸ್ತವ · ಸಂ. 1",
    "ar.soon": "ಶೀಘ್ರದಲ್ಲೇ",
    "ar.up1": "ಬರ್ಮುಡಾ ಸಂಕೇತ",
    "ar.up2": "ಬ್ಲ್ಯಾಕ್‌ವುಡ್ ಮನೆಯ ಕೊನೆಯ ರಾತ್ರಿ",
    "ar.up3": "ದರೋಡೆ",
    "ar.up4": "ಶೂನ್ಯ ದಿನ: ದೀಪಗಳು ಆರಿದಾಗ",
    "pricing.eyebrow": "ಬೆಲೆ",
    "pricing.h2": "ಹೆಚ್ಚು ಪಡೆದಷ್ಟೂ, ಪ್ರತಿಯೊಂದರ ಬೆಲೆ ಕಡಿಮೆ.",
    "plan1.name": "ಒಂದು ಇ-ಪುಸ್ತಕ",
    "plan1.text": "ಒಂದು ಪುಸ್ತಕ, ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ ನಿಮ್ಮದಾಗಿಸಿಕೊಳ್ಳಿ.",
    "plan2.badge": "ಅತ್ಯಂತ ಜನಪ್ರಿಯ",
    "plan2.name": "ತ್ರಿವಳಿ",
    "plan2.text": "ಯಾವುದೇ ಮೂರು ಪುಸ್ತಕಗಳು. ಬೇರೆ ಬೇರೆ ಸಂಗ್ರಹಗಳಿಂದ ಆರಿಸಬಹುದು.",
    "plan3.name": "ಸಂಗ್ರಹ ಖಜಾನೆ",
    "plan3.text": "ಒಂದು ಸಂಗ್ರಹದ ಎಲ್ಲಾ ಪುಸ್ತಕಗಳು.",
    "plan4.name": "ಸಂಪೂರ್ಣ ಗ್ರಂಥಾಲಯ",
    "plan4.text": "ಎಲ್ಲಾ ಇ-ಪುಸ್ತಕಗಳು, ಜೊತೆಗೆ ಒಂದು ವರ್ಷದ ಹೊಸ ಬಿಡುಗಡೆಗಳು.",
    "plan5.name": "ಪರ್ಯಾಯ ವಾಸ್ತವ ಪಾಸ್",
    "plan5.per": "/ತಿಂಗಳಿಗೆ",
    "plan5.text": "ಎಲ್ಲಾ ಸಂವಾದಾತ್ಮಕ ಕಥೆಗಳು, ಪ್ರತಿ ವಾರ ಹೊಸವು.",
    "pricing.note": "ಬಿಡುಗಡೆಯ ದಿನ ಖರೀದಿ ಆರಂಭವಾಗುತ್ತದೆ.",

    // ----- story reader -----
    "story.pageTitle": "ಜೊಂಬಿ ಮಹಾವಿಪತ್ತಿನಲ್ಲಿ ಬದುಕುಳಿಯುವುದು ಹೇಗೆ | Moniloria",
    "story.signout": "ಸೈನ್ ಔಟ್",
    "gate.lede":
      "ಈ ಕಥೆ ನಿಮ್ಮದೇ. ಸೈನ್ ಇನ್ ಮಾಡಿ; ಕಥೆ ನಿಮ್ಮ ಹೆಸರನ್ನು ಬಳಸುತ್ತದೆ, ನಿಮ್ಮ ಆಯ್ಕೆಗಳನ್ನು ನೆನಪಿಡುತ್ತದೆ, ಮತ್ತು ನೀವು ಕಂಡುಕೊಂಡ ಪ್ರತಿ ಅಂತ್ಯವನ್ನು ಉಳಿಸುತ್ತದೆ.",
    "gate.guestLabel": "ನಿಮ್ಮನ್ನು ಏನೆಂದು ಕರೆಯಲಿ?",
    "gate.guestLabelAlt": "ಅಥವಾ ಅತಿಥಿಯಾಗಿ ಮುಂದುವರಿಯಿರಿ",
    "gate.placeholder": "ನಿಮ್ಮ ಹೆಸರು",
    "gate.begin": "ಆರಂಭಿಸಿ",
    "gate.error": "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
    "story.prompt": "ನೀವೇನು ಮಾಡುತ್ತೀರಿ?",
    "story.supplies": "ಸಾಮಗ್ರಿ",
    "story.trust": "ವಿಶ್ವಾಸ",
    "story.with": "ನಿಮ್ಮ ಜೊತೆ",
    "story.noone": "ಯಾರೂ ಇಲ್ಲ",
    "story.and": " ಮತ್ತು ",
    "story.rosa": "ರೋಸಾ",
    "story.kai": "ಕಾಯ್",
    "ending.again": "ಮತ್ತೆ ಆಡಿ",
    "ending.share": "ನಿಮ್ಮ ಅಂತ್ಯವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
    "ending.copied": "ನಕಲಿಸಲಾಗಿದೆ",
    "ending.new": "ಹೊಸ ಅಂತ್ಯ ಸಿಕ್ಕಿತು",
    "ending.count": "{name}, ನೀವು {total} ಅಂತ್ಯಗಳಲ್ಲಿ {found} ಕಂಡುಕೊಂಡಿದ್ದೀರಿ.",
    "ending.number": "ಅಂತ್ಯ {n}",
    "ending.locked": "ಇನ್ನೂ ಸಿಕ್ಕಿಲ್ಲ",
    "ending.shareText":
      "Moniloria ದಲ್ಲಿ “{story}” ಕಥೆಯಲ್ಲಿ ನನಗೆ “{ending}” ಅಂತ್ಯ ಸಿಕ್ಕಿತು ({total} ರಲ್ಲಿ {n}ನೇ ಅಂತ್ಯ). ನೀವು ಬದುಕುಳಿಯಬಲ್ಲಿರಾ?",
  };

  function t(key, vars) {
    let text = (lang === "kn" && kn[key]) || en[key] || "";
    Object.keys(vars || {}).forEach(function (name) {
      text = text.replace("{" + name + "}", vars[name]);
    });
    return text;
  }

  function apply() {
    document.documentElement.lang = lang;
    if (lang === "kn") {
      document.querySelectorAll("[data-i18n]").forEach(function (node) {
        const text = kn[node.dataset.i18n];
        if (text) node.textContent = text;
      });
      // Only for our own fixed strings above that contain markup.
      document.querySelectorAll("[data-i18n-html]").forEach(function (node) {
        const html = kn[node.dataset.i18nHtml];
        if (html) node.innerHTML = html;
      });
      document.querySelectorAll("[data-i18n-placeholder]").forEach(function (node) {
        const text = kn[node.dataset.i18nPlaceholder];
        if (text) node.placeholder = text;
      });
      const title = kn[document.documentElement.dataset.i18nTitle];
      if (title) document.title = title;
    }

    // The switch always shows the language you can change to.
    document.querySelectorAll(".lang-toggle").forEach(function (button) {
      button.textContent = lang === "kn" ? "English" : "ಕನ್ನಡ";
      button.setAttribute("lang", lang === "kn" ? "en" : "kn");
      button.addEventListener("click", function () {
        try {
          localStorage.setItem(KEY, lang === "kn" ? "en" : "kn");
        } catch (e) {}
        location.reload();
      });
    });
  }

  window.MoniloriaI18n = { lang: lang, t: t };
  apply();
})();
