# Introvert Universe

An immersive, atmospheric single-page sanctuary built with pure HTML, CSS and vanilla JavaScript. Designed especially for introverts — quiet, personal, and deeply customizable.

## Features

- **MBTI Welcome Experience** — Choose one of 16 personality types. Each type applies a unique color palette, glow, and atmosphere. Choice is stored in `localStorage` and becomes permanent for this browser.
- **3D Immersive Background** — Layered stars, particles, distant nebulae and soft glowing orbs with mouse parallax.
- **Persistent Global Music Player** — Continues playing while you navigate sections. Demo tracks use freely available SoundHelix sample MP3s (replace with your own licensed audio in `script.js`).
- **Music Discovery** — Filter by mood (Calm, Sad, Dreamy, Rainy Night, Focus, Ambient, Instrumental, Relaxing), search, and MBTI-based recommendations.
- **Sweet Corner** — 12 comforting recipes (cakes, cookies, brownies, cheesecakes, desserts, hot drinks) with ingredients, steps, times and difficulty.
- **My Room** — Interactive 3D-feeling room designer. Drag (or click) furniture and décor into the space, move objects, double-click to remove, save/restore designs via localStorage.
- **Memory Box** — Private digital journal. Titles, dates, moods, text, optional photo uploads (stored as data URLs in localStorage). Edit and delete.
- **Anonymous Letters** — Local demo wall. Messages stay only on your device. Clear notice that real multi-user sharing needs a backend.
- Fully responsive, glassmorphism UI, smooth transitions, no frameworks.

## How to Run

1. Open `index.html` in a modern browser (Chrome, Firefox, Edge, Safari).
2. Or serve the folder with any static server, e.g.:
   ```
   npx serve .
   ```
3. First visit asks for MBTI. After selection the theme is locked for that browser.

## Music Notes

Demo tracks point to SoundHelix example MP3s. Some browsers may block cross-origin audio depending on network/CORS. To use your own music:

1. Place MP3/OGG files in `assets/audio/`.
2. Update the `TRACKS` array in `script.js` with local relative paths (e.g. `url: 'assets/audio/my-track.mp3'`).

Respect copyright — only use tracks you have the right to play.

## Data Storage

Everything is local:

- `iu_mbti` — selected personality
- `iu_memories` — journal entries
- `iu_room` — room layout
- `iu_letters` / `iu_hidden_letters` — letter wall

No server, no accounts, no external analytics.

## File Structure

```
introvert-universe/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── images/
    ├── audio/
    └── icons/
```

## Browser Support

Modern evergreen browsers with support for CSS backdrop-filter, CSS variables, and the Web Audio / HTML5 audio API.

---

Made for quiet evenings and soft light.
