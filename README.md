# Venn Connections

What Venn is. Most apps match people by category: your major, your job title, your hometown. Venn matches on how you actually write about yourself. You answer three open questions in your own words, and the system compares the texture of your answers to everyone else's. The result is one list of people, and one slider that decides what kind of connection you're looking for. Slide it left and you get people to study or build with. Slide it right and you get people who share your sense of humor. The list re-sorts live as you drag. It's for students whose schedules don't leave room for meeting people by chance.

Build a single-page React prototype. Frontend only, no backend, no auth, no API calls. All data hardcoded in the file.

The slider is the centerpiece. Horizontal, labeled Work on the left and Personal on the right, value 0 to 100. Every match carries two pre-computed scores. The displayed compatibility is a weighted blend based on slider position, so dragging visibly reorders who sits at the top. Animate the reordering smoothly. This should feel tactile and immediate.

Three screens in one flow:

Onboarding. Three prompts, each a textarea with a decorative microphone button that shows a recording state. Helper text under each box: "a couple of sentences is plenty." The prompts: What's something you've changed your mind about? What are you working on right now, and what part of it is annoying you? What could you talk about for an hour with zero preparation?

Matches. Slider pinned at top. Below it, eight match cards showing a name, a one-line descriptor, the blended score as a percentage, and both component scores small as "Work 82 / Personal 41". Each card has a short "why you matched" line that changes depending on which side of the slider dominates. A Connect button that toggles to "Request sent."

Match detail. Clicking a card opens a panel with that person's three answers, with the phrases that drove the match subtly highlighted.

Mock data. Eight fictional people with specific, realistic answers that sound like genuinely different individuals, varied in voice and length. Give each distinctly different work and personal scores so the re-ranking is obvious. At least two should rank very high on one axis and low on the other.

Visual direction. I've attached mood references. They're for feel, not layout. The register is contemporary college-artsy: paper and print textures, cutout shapes and torn edges, warm saturated color, mixed type with serif headings against clean sans body, a hand-made collage sensibility rather than a clean SaaS template.

Apply that to the frame, not the content. Collage treatment belongs in page backgrounds, headers, section edges, empty states and the logo mark. Match cards and the slider must stay clean and highly readable, sitting on top of the texture like white paper on a pinboard. Generous whitespace inside the cards. Do not put busy imagery behind text.

Logo: two overlapping circles, treated as cut paper.

Do not build: login, settings, chat, profile editing, or a marketing landing page. Do not simulate an API. One file, React state only.

## How this was built

Venn is my own idea. The concept — matching people on how they write about themselves rather than on categories, with a single Work/Personal slider that re-ranks the list live — is original, and the layout is mine, shaped with references from the sources below.

It was built with a mix of AI tools and references rather than a single platform:

- **[Fetch.ai](https://fetch.ai)** — agent and matching ideas.
- **[Devin](https://devin.ai)** — autonomous coding assistance.
- **[Claude Code](https://claude.com/claude-code)** — pair-programming and implementation.
- **[GitHub](https://github.com)** — open-source code references.
- **[Google Summer of Code](https://summerofcode.withgoogle.com)** — project and documentation references.

The code is mine to own: push to `main` on GitHub to keep it in sync.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run db:setup   # creates the local SQLite DB and seeds the people
npm run dev
```

## Backend

Venn is a **TanStack Start** app, so the backend lives in this same project — no
separate server. Data is persisted in SQLite via **Drizzle ORM** and the
**libSQL** driver.

- **Schema** — `src/db/schema.ts` (`people`, `person_answers`, `submissions`,
  `submission_answers`, `connection_requests`).
- **Server functions** — `src/api/venn.ts`:
  - `getPeople` — reads every person + their answers (called by the route loader).
  - `submitOnboarding` — saves a visitor's three answers, blend, and activity picks.
  - `setConnection` — records/toggles a "Connect" request.
- **Seed data** — `src/db/seed.ts` loads the eight starter people.

Useful scripts:

```sh
npm run db:push    # apply the schema to the database
npm run db:seed    # insert the starter people (idempotent)
npm run db:setup   # push + seed in one step
```

**Local vs. production.** Local dev writes to `./.data/venn.db` (gitignored).
For a deployed build (the Cloudflare Workers target), point it at a hosted
libSQL database such as [Turso](https://turso.tech) by setting:

```sh
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-token
```

No application code changes between the two — same Drizzle schema and queries.
