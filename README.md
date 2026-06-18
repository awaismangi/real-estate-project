# NexHome — Real Estate Frontend

A Zameen.com-style property portal, rebuilt with a light grey/white, futuristic
visual identity (Space Grotesk + Inter + IBM Plex Mono, soft gradients,
glassy cards, glowing search console).

## Setup

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    Header.jsx        Logo, nav links, sign-in dropdown, mobile menu, Add Property button
    Navbar.jsx         Slim top utility bar (help, become an agent, language)
    Footer.jsx         Newsletter signup, link columns, social icons
    PropertyCard.jsx   Reusable card used on Home, Listings, Property Details
    SearchPanel.jsx    Signature glowing search console (Buy/Rent tabs + filters)
    PageWrapper.jsx    Adds the fade/slide page transition to every route
  pages/
    Home.jsx              Hero, search, stats, categories, featured listings, CTA
    Listings.jsx           Filter sidebar, sort, grid/list toggle, pagination
    PropertyDetails.jsx    Gallery, stats, description, amenities, agent contact form
    Contact.jsx             Validated contact form + office cards
    AdminDashboard.jsx     Overview stats, manage table (edit/delete/feature), add/edit form
    Agents.jsx              Agent directory derived from listings, filterable by city
    AreaGuides.jsx          City guide cards linking into filtered listings
    About.jsx                Company story, values, team, careers CTA
    Careers.jsx              Open roles with a working "Apply" interaction
    NotFound.jsx             404 page
  data/
    properties.js      Mock property dataset + helpers (formatPKR, getPropertyById)
  App.jsx               Routes everything together, scroll-to-top on navigation
  main.jsx              React + BrowserRouter entry point
  index.css             Design tokens, base styles, transition/animation utilities
```

## Why these extra pages were added

Your file list covered the core experience, but a real property portal like
Zameen needs a few more destinations to make every nav link and footer link
actually go somewhere:

- **Agents.jsx** — Zameen has a dedicated agents directory; your Header/Footer
  already link to "Agents," so this gives that link a real destination.
- **AreaGuides.jsx** — mirrors Zameen's "Area Guides," with cards that link
  into pre-filtered listings per city.
- **About.jsx** and **Careers.jsx** — standard footer destinations
  ("About Us," "Careers") that every real business site needs, and Careers
  has a working "Apply" button.
- **NotFound.jsx** — catches any broken or future link so the site never
  shows a blank screen.

## Design system

- **Colors:** base `#FAFBFC`, panel `#F1F2F5`, border `#E1E4E9`, ink `#14161B`,
  accent blue `#2F6FED`, cyan `#0EA5A8` (used together for the gradient
  "futuristic" accent), success `#16A34A`, danger `#DC2626`.
- **Type:** Space Grotesk for headings (geometric, technical feel), Inter for
  body copy, IBM Plex Mono for prices/stats (gives that data-driven,
  futuristic touch without being a cliché terminal font).
- **Signature element:** the animated gradient-ring search console
  (`SearchPanel.jsx` + `.glow-ring` in `index.css`) — a slowly shifting
  blue-to-cyan border that frames the most important action on the site.
- **Motion:** page-level fade/slide on route change, staggered fade-up on the
  hero, card lift on hover, smooth 0.3–0.4s cubic-bezier transitions
  throughout. `prefers-reduced-motion` is respected globally.

## Connecting a real backend later

Everything currently reads from `src/data/properties.js`. To wire up an API:

1. Replace the `properties` array with a fetch call (e.g. in a `useEffect` in
   `Listings.jsx` and `Home.jsx`, or better, lift it into a context/provider).
2. `AdminDashboard.jsx`'s add/edit/delete handlers currently mutate local
   state — swap those for POST/PUT/DELETE calls to your API.
3. `Contact.jsx` and the contact form in `PropertyDetails.jsx` currently just
   show a success message — point their `handleSubmit` at your email/CRM
   endpoint.
4. The sign-in dropdown in `Header.jsx` is UI-only — wire it to your auth
   provider when ready.

## Notes

- All images currently come from Unsplash as placeholders — swap
  `src/data/properties.js` image URLs for your real listing photos.
- Tailwind is configured with custom tokens in `tailwind.config.js` — change
  colors there to retheme the whole site in one place.
