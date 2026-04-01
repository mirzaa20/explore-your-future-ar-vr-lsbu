# LSBU VR Campus Tour

A browser-based WebVR application built for LSBU Open Day events.  
Prospective students can explore 4 campus sites via immersive 360° videos and photos — no installation required.

**Module:** CSI_6_ART — AR/VR Technologies  
**Framework:** A-Frame 1.5 · HTML5 · CSS3 · Vanilla JavaScript  
**Hosting:** GitHub Pages

---

## Running locally

```bash
npx serve .
```

Then open `http://localhost:3000` in Chrome or Firefox.

> Do NOT open index.html directly as a file:// URL — browser autoplay and CORS policies block 360° video playback. Always use a local server.

---

## Swapping in real assets

All asset paths are controlled from a single place — the `SITES` array in `js/main.js`.

For each site, update:
- `video` — path to the 360° MP4 file (e.g. `"../assets/videos/site1.mp4"`)
- `photos` — array of 4 equirectangular JPG paths
- `voiceover` — path to the MP3 audio file (e.g. `"../assets/audio/site1.mp3"`)

---

## File structure

```
lsbu-vr-openday/
├── index.html              Landing page
├── menu.html               Site selection (4 cards)
├── scenes/
│   ├── video.html          360° video player (serves all 4 sites via ?site=)
│   └── photos.html         360° photo viewer (serves all 4 sites via ?site=)
├── assets/
│   ├── videos/             Place .mp4 files here
│   ├── photos/             Place equirectangular .jpg files here
│   └── audio/              Place voiceover .mp3 files here
├── css/
│   └── styles.css          Global styles
└── js/
    └── main.js             SITES config + scene logic
```

---

## Controls

| Device | Look around | Navigate photos |
|--------|-------------|-----------------|
| Desktop | Mouse drag | Arrow keys or on-screen buttons |
| Mobile | Drag / gyroscope | On-screen buttons |
| VR Headset | Head movement | On-screen gaze cursor |
