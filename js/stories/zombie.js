// "How to Survive a Zombie Apocalypse" — an Alternate Reality story.
//
// How a story file works:
//   - `nodes` are scenes. Each has a `chapter` label, `text` (paragraphs) and `choices`.
//   - `{name}` in any text is replaced with the reader's first name.
//   - `text` and a choice's `next` can be functions of the reader's state `s`,
//     which is how earlier choices change later scenes and the ending.
//   - A choice's `effect(s)` updates the state (supplies, trust, companions...).
//   - A node with `ending` finishes the story and unlocks that ending.
//
// Structure is "branch and rejoin": paths split at each choice and meet again at
// the supermarket and the signal, while the state remembers what the reader did.
(function () {
  const companion = (s) => (s.rosa ? "Rosa" : s.kai ? "Kai" : "");
  const companions = (s) =>
    s.rosa && s.kai ? "Rosa and Kai" : companion(s);

  window.MONILORIA_STORIES = window.MONILORIA_STORIES || {};
  window.MONILORIA_STORIES.zombie = {
    id: "zombie",
    title: "How to Survive a Zombie Apocalypse",
    start: "door",
    initialState: { supplies: 0, trust: 0, rosa: false, kai: false, radio: false },

    endings: [
      { id: "boat", title: "The Last Boat", kind: "Rescued" },
      { id: "fortress", title: "Keeper of Dock Street", kind: "Survived" },
      { id: "quarantine", title: "Quarantine", kind: "Unknown" },
      { id: "starved", title: "Starved Out", kind: "Lost" },
      { id: "bait", title: "Garrett's Bait", kind: "Betrayed" },
      { id: "cure", title: "The Cure", kind: "Secret ending" },
    ],

    nodes: {
      door: {
        chapter: "Day 1 · 6:47 a.m.",
        text: [
          "{name}, your phone screams you awake at 6:47 a.m.",
          "EMERGENCY ALERT. SHELTER IN PLACE. DO NOT APPROACH INFECTED INDIVIDUALS.",
          "Outside, a car alarm. Then another. Then a sound you have never heard a human being make.",
          "Someone is pounding on your front door. “Please! It’s Rosa, from 4B! They’re in the stairwell!”",
          "Rosa is the night-shift nurse from down the hall. You’ve exchanged maybe ten words in two years. Behind her voice, through the door, you can hear footsteps. Slow ones. Dragging.",
        ],
        choices: [
          {
            label: "Open the door",
            effect: (s) => {
              s.rosa = true;
              s.trust += 1;
            },
            next: "rosa_in",
          },
          { label: "Stay silent", next: "silent" },
        ],
      },

      rosa_in: {
        chapter: "Day 1 · 6:49 a.m.",
        text: [
          "You yank Rosa inside and slam the deadbolt. A second later something hits the door hard enough to rattle the frame.",
          "Rosa is shaking, but her hands are steady as she checks you both for wounds. “It’s the bite,” she says. “Twelve minutes from bite to turn. I watched it happen in the ER all night.”",
          "She looks at you properly for the first time. “You opened the door, {name}. Nobody else on this floor did.”",
        ],
        choices: [{ label: "Continue", next: "pack" }],
      },

      silent: {
        chapter: "Day 1 · 6:49 a.m.",
        text: [
          "You hold your breath. The pounding stops. Rosa’s voice rises into a scream, and then cuts off.",
          "Silence. Then scratching, low on the door, where no living person would scratch.",
          "You’re on your own, {name}. That might keep you alive. It might not.",
        ],
        choices: [{ label: "Continue", next: "pack" }],
      },

      pack: {
        chapter: "Day 1 · 7:02 a.m.",
        text: (s) => [
          "The door won’t hold. You have one backpack and maybe three minutes before the hinges give.",
          s.rosa
            ? "Rosa is already at the window, checking the fire escape. “Whatever you’re taking, {name}, take it now.”"
            : "The fire escape outside your window is the only way out.",
          "You can’t carry everything.",
        ],
        choices: [
          {
            label: "Pack food and water",
            effect: (s) => {
              s.supplies += 2;
            },
            next: "street",
          },
          {
            label: "Pack the flashlight and the hand-crank radio",
            effect: (s) => {
              s.radio = true;
            },
            next: "street",
          },
        ],
      },

      street: {
        chapter: "Day 1 · 7:20 a.m.",
        text: [
          "You drop from the fire escape into the parking lot. The city sounds wrong. No traffic. Just alarms, and distant screaming carried on the wind.",
          "Your car is twenty steps away, keys already in your hand. Past it, a narrow alley runs toward the harbour district, dark and quiet.",
        ],
        choices: [
          {
            label: "Take the car",
            effect: (s) => {
              s.supplies = Math.max(0, s.supplies - 1);
            },
            next: "car",
          },
          { label: "Go on foot through the alleys", next: "alley" },
        ],
      },

      car: {
        chapter: "Day 1 · 7:31 a.m.",
        text: [
          "The engine roars, and every head in the parking lot turns toward the sound.",
          "You floor it. For four glorious blocks, it works. Then the Harbour Bridge comes into view: a wall of abandoned cars with their doors hanging open, and between them, movement. Hundreds of them, walking toward your engine.",
          "You swerve, clip a delivery truck, and the airbag punches you in the face. You crawl out with your bag torn open and half of what you packed scattered across the road.",
          "You run, {name}. You don’t look back.",
        ],
        choices: [{ label: "Continue", next: "market" }],
      },

      alley: {
        chapter: "Day 1 · 7:44 a.m.",
        text: [
          "The alley swallows the noise of the city. You move slowly and stay low.",
          "Behind a dumpster, something shifts. You raise your hand to strike —",
          "It’s a boy. Ten years old, maybe, holding a skateboard like a shield. “Are you one of them?” he whispers. “I’m Kai. I can’t find my mom.”",
          "Taking him means another mouth to feed and another person to keep quiet. Leaving him means leaving him.",
        ],
        choices: [
          {
            label: "Take Kai with you",
            effect: (s) => {
              s.kai = true;
              s.trust += 1;
            },
            next: "market",
          },
          { label: "Tell him to stay hidden, and move on", next: "market" },
        ],
      },

      market: {
        chapter: "Day 1 · 8:40 p.m.",
        text: (s) => [
          "By nightfall you reach the FreshMart on Dock Street. The front windows are smashed, but the side shutters are down. Someone is inside.",
          "A flashlight hits your face. A man in a red cap steps out of the dark with a hunting rifle. Behind him, five survivors watch you with hollow eyes.",
          "“Name’s Garrett. This is my store now. You want in, you hand over your bag. Everything gets shared.”",
          s.rosa
            ? "Rosa’s hand tightens on your arm."
            : s.kai
            ? "Kai presses himself behind you."
            : "Nobody is standing next to you to tell you what they think.",
          "Garrett smiles. It doesn’t reach his eyes.",
        ],
        choices: [
          {
            label: "Hand over your bag and join Garrett",
            effect: (s) => {
              s.supplies = 0;
            },
            next: (s) => (companion(s) ? "garrett_escape" : "end_bait"),
          },
          {
            label: "Refuse, and slip into the stockroom",
            effect: (s) => {
              s.supplies += 1;
            },
            next: "stockroom",
          },
        ],
      },

      garrett_escape: {
        chapter: "Day 2 · 3:05 a.m.",
        text: (s) => [
          "Garrett’s people eat your food by lantern light while you sit with nothing.",
          `Around three in the morning, ${companion(s)} shakes you awake. “{name}. They’re leaving. They took everything, and they’ve chained the front doors from the outside. With us in here.”`,
          "Through the glass you can see shapes gathering, drawn by the noise of Garrett’s trucks pulling away. You weren’t part of the group. You were the bait.",
          "You find a gap in the loading dock and squeeze through, empty-handed but breathing. If you had been alone, you would never have woken up in time.",
        ],
        choices: [{ label: "Continue", next: "signal" }],
      },

      stockroom: {
        chapter: "Day 1 · 9:15 p.m.",
        text: [
          "You back away slowly and slip through a side door into the stockroom. Garrett doesn’t follow. Not tonight.",
          "Behind a collapsed shelf you find a forgotten pallet: canned peaches, bottled water, a box of protein bars. You fill your bag and barricade the door.",
          "Somewhere out front, Garrett is laughing. You don’t sleep.",
        ],
        choices: [{ label: "Continue", next: "signal" }],
      },

      signal: {
        chapter: "Day 2 · 5:10 a.m.",
        text: (s) => [
          s.radio
            ? "You crank the radio. It hisses, and then a voice breaks through: “This is the Coast Guard. Evacuation vessel at Pier 9, departing at sunrise. Uninfected survivors only. I repeat —” Static."
            : "Through a crack in the wall you see it: a red flare arcing over the harbour. Then a second. Someone out there is signalling. Someone organised.",
          "Pier 9 is a mile away, through open streets, in the grey light before dawn.",
          "Or you could stay. Barricade this place, ration what you have, and wait for the city to burn itself out.",
        ],
        choices: [
          { label: "Run for the harbour", next: "gate" },
          {
            label: "Stay and fortify",
            next: (s) => (s.supplies >= 2 ? "end_fortress" : "end_starved"),
          },
        ],
      },

      gate: {
        chapter: "Day 2 · 6:01 a.m.",
        timer: 12,
        timeoutNext: "end_quarantine",
        text: [
          "You make it. Pier 9 is a chain-link gate, floodlights, and soldiers in gas masks. Beyond them: a grey ship, and the most beautiful sunrise you have ever seen.",
          "“Arms out!” a soldier shouts. “Any bites, any scratches, you stay behind!”",
          "You look down. On your forearm is a thin red line from the fence you climbed an hour ago. It’s not a bite. You’re almost sure it’s not a bite.",
          "The soldier’s flashlight is moving down the line toward you, {name}. Decide.",
        ],
        choices: [
          {
            label: "Show them the scratch",
            next: (s) => (s.rosa && s.radio ? "end_cure" : "end_boat"),
          },
          { label: "Hide your arm", next: "end_quarantine" },
        ],
      },

      end_boat: {
        ending: "boat",
        chapter: "Day 2 · 6:20 a.m.",
        text: (s) => [
          "You hold out your arm. The soldier stares at the scratch for a long, long second.",
          "A medic swabs it, shines a light in your eyes, and waves you through. “Fence wire. You’re clean.”",
          companions(s)
            ? `${companions(s)} ${s.rosa && s.kai ? "follow" : "follows"} you up the gangway. Nobody says anything. Nobody needs to.`
            : "You walk up the gangway alone, past families holding on to each other, and find a place at the rail.",
          "As the ship pulls away from the burning city, you realise you are still holding your breath. You let it go.",
          "You survived, {name}.",
        ],
      },

      end_cure: {
        ending: "cure",
        chapter: "Day 2 · 6:20 a.m.",
        text: [
          "You hold out your arm. Before the soldier can speak, Rosa steps forward.",
          "“It’s a fence scratch. Look at the edges. I’m an ER nurse, and I’ve seen two hundred bites since yesterday.”",
          "The officer in charge turns around slowly. “Two hundred. Did you record how long each one took to turn?”",
          "Rosa pulls a folded chart from her jacket, then nods at your radio. “Every one. And we’ve been logging the broadcasts all night. We know which district went dark first.”",
          "An hour later you and Rosa are aboard, not as refugees but as the newest members of the research team. Somewhere in her notes is the beginning of a cure.",
          "It started with one decision, {name}. You opened the door.",
        ],
      },

      end_quarantine: {
        ending: "quarantine",
        chapter: "Day 2 · 6:20 a.m.",
        text: [
          "You keep your arm pressed against your side. The flashlight stops on your face. Then on your sleeve. Then on the dark spot soaking through it.",
          "“Sleeve up. Now.”",
          "The scratch is nothing. Fence wire. But you hid it, and that makes it something. Two soldiers walk you to the white tents at the far end of the pier.",
          "The ship sails without you. Quarantine is fourteen days.",
          "On the third day, {name}, the generators fail.",
        ],
      },

      end_fortress: {
        ending: "fortress",
        chapter: "Day 31",
        text: (s) => [
          "You decide the city can burn without you. You brace the shutters, count every can, and paint one word on the roof in white: ALIVE.",
          s.rosa
            ? "Rosa turns the pharmacy counter into a clinic."
            : s.kai
            ? "Kai learns every rooftop route in the district on his skateboard, and becomes your lookout."
            : "The first week is the loneliest of your life.",
          "Thirty days later you are still here, and you are not alone. Eleven survivors have found their way to the light in your window.",
          "They have a name for you now, {name}. They call you the Keeper of Dock Street.",
        ],
      },

      end_starved: {
        ending: "starved",
        chapter: "Day 9",
        text: [
          "You barricade the doors and wait. It feels like the safe choice.",
          "By the fourth day you are rationing by the spoonful. By the seventh, you are drinking the water from the freezer trays.",
          "On the ninth day there is nothing left, and the street outside is fuller than it has ever been.",
          "A fortress needs more than walls, {name}. You open the door because you have to.",
        ],
      },

      end_bait: {
        ending: "bait",
        chapter: "Day 2 · 3:05 a.m.",
        text: [
          "You wake to the sound of engines. Garrett’s trucks are pulling out, loaded with your bag, your food, everything.",
          "The front doors are chained from the outside. Through the glass, shapes are gathering, drawn by the noise.",
          "You were never part of the group, {name}. You were the bait.",
          "Nobody was beside you to wake you in time.",
        ],
      },
    },
  };
})();
