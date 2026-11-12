// Sign-in for Moniloria: Google (when a client ID is configured) or a guest name.
// The reader's first name is what personalises every story.
//
// NOTE: this demo reads the Google sign-in result in the browser only. Before
// taking payments, verify the Google credential on a server and keep reader
// accounts there instead of in localStorage.
(function () {
  const KEY = "moniloria.reader";

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || null;
    } catch (e) {
      return null;
    }
  }

  function save(reader) {
    try {
      localStorage.setItem(KEY, JSON.stringify(reader));
    } catch (e) {
      /* private browsing: the session simply won't persist */
    }
  }

  function clear() {
    try {
      localStorage.removeItem(KEY);
    } catch (e) {}
  }

  function cleanName(raw) {
    const name = String(raw || "").trim().replace(/\s+/g, " ").slice(0, 24);
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
  }

  // Google returns a signed token; its middle part holds the profile.
  function decodeCredential(token) {
    const part = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(part)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  }

  function clientId() {
    return (window.MONILORIA_CONFIG && window.MONILORIA_CONFIG.googleClientId) || "";
  }

  // Draws the Google button into `el`. Calls onReader once signed in.
  function renderGoogleButton(el, onReader) {
    if (!clientId()) return false;
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = function () {
      google.accounts.id.initialize({
        client_id: clientId(),
        callback: function (response) {
          const profile = decodeCredential(response.credential);
          const reader = {
            id: "google:" + profile.sub,
            name: cleanName(profile.given_name || profile.name),
            via: "google",
          };
          save(reader);
          onReader(reader);
        },
      });
      google.accounts.id.renderButton(el, {
        theme: "filled_black",
        size: "large",
        shape: "pill",
        text: "continue_with",
      });
    };
    document.head.appendChild(script);
    return true;
  }

  function signInAsGuest(rawName) {
    const name = cleanName(rawName);
    if (!name) return null;
    const reader = { id: "guest:" + name.toLowerCase(), name: name, via: "guest" };
    save(reader);
    return reader;
  }

  window.MoniloriaAuth = {
    current: load,
    signOut: clear,
    signInAsGuest: signInAsGuest,
    renderGoogleButton: renderGoogleButton,
    hasGoogle: function () {
      return Boolean(clientId());
    },
  };
})();
