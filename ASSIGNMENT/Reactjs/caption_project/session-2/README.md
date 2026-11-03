# Session 2: Interactive Design Lab

This React project collects the five requested design exercises in one local prototype. Use the left navigation on desktop or the horizontal navigation on mobile to switch between screens.

## Included Deliverables

1. **Food delivery low-fidelity wireframe:** Search, categories, featured restaurants, and a delivery tracker are shown in grayscale to keep attention on layout and hierarchy. Restaurant search filters the sample cards.
2. **Music playlist dashboard:** A high-fidelity Spotify-inspired dashboard includes playlist navigation, playlist cards, a queue, profile area, and a currently playing bar. The play controls update the prototype state.
3. **Movie booking journey:** Six selectable steps map the path from opening the app through ticket confirmation. The progress bar and previous/next controls are interactive.
4. **Shopping cart prototype:** Product list, quantity controls, delivery fee, savings, total, promo-code entry point, and checkout state are included.
5. **Rewards dashboard redesign:** A rewards-focused screen replaces job-profile content with points, milestones, reward categories, partner offers, and a profile area.

## Journey Map

Open app and choose a city -> browse or search films -> select a film -> choose a cinema and showtime -> choose seats -> review price and apply an offer -> pay -> receive booking confirmation with a QR ticket.

## Figma and Uizard Prompts

The requested screens are implemented as local browser prototypes; they have not been created or published in Figma or Uizard because those require access to the user's accounts. Prompts to reproduce the screens in those tools:

- **Figma playlist dashboard:** "Create a high-fidelity music playlist dashboard with a playlist sidebar, playlist cards, a currently playing song and playback controls, a song queue, and a user profile area. Use a dark forest-green base with restrained lime and warm coral accents."
- **Uizard shopping cart:** "Create a clean shopping cart dashboard with two product rows, quantity controls, delivery progress, a clear price summary, savings, and a prominent checkout button. Make total payable the strongest item in the hierarchy."
- **Figma AI rewards redesign:** Start with the prompt "Generate layout for job profile dashboard." Then replace job-search sections with a reward points balance, progress milestone, reward categories, partner offers, and redemption actions; use a premium charcoal, olive, and muted lime palette.

## Run Locally

```bash
npm install
npm run dev
```