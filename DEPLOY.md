# Deploying Venn (free public URL)

Everything below is done in a web browser. The only terminal step is optional.

You'll end up with a free URL like `https://venn-connections.<you>.workers.dev`
that automatically redeploys every time you push to `main` on GitHub.

Two free services do the work:

- **Turso** — hosts the database (people, answers, connection requests).
- **Cloudflare Workers** — runs the app and gives it the public URL.

---

## Part 1 — Database on Turso (about 5 minutes)

1. Go to <https://turso.tech> and **Sign up** (signing in with GitHub is easiest).
2. Click **Create Database**. Name it `venn-connections`. Pick the region
   closest to you. Create it.
3. Open the database and find its **SQL console / shell** (a text box where
   you can run SQL).
4. Open the file [`deploy/turso-setup.sql`](deploy/turso-setup.sql) from this
   repo, **copy the entire contents**, paste it into the console, and run it.
   This creates every table and loads the 8 starter people.
5. Still in the database page, grab two values — you'll need them in Part 2:
   - **Database URL** — looks like `libsql://venn-connections-<you>.turso.io`
   - **Auth token** — click **Create token** (or "Generate token"). Copy it
     somewhere safe; it's only shown once.

---

## Part 2 — App on Cloudflare (about 5 minutes)

1. Go to <https://dash.cloudflare.com> and **Sign up** (free plan is fine).
2. In the left sidebar open **Workers & Pages** and click **Create**.
3. Choose to **import / connect a Git repository** (the "Connect to Git" or
   "Import a repository" option). Authorize Cloudflare to see your GitHub,
   then pick **`venn-connections`**.
4. On the build settings screen enter exactly:

   | Setting            | Value                                                  |
   | ------------------ | ------------------------------------------------------ |
   | **Build command**  | `npm run build`                                        |
   | **Deploy command** | `npx wrangler deploy -c .output/server/wrangler.json`  |
   | **Root directory** | `/` (leave as default)                                 |

   Node version is picked up automatically from the repo's `.nvmrc`.

5. Click **Save and Deploy**. The first build takes 1–3 minutes.
6. When it finishes, open the Worker and go to **Settings → Variables and
   Secrets**. Add two entries, each with the type set to **Secret**:

   | Name                 | Value                                 |
   | -------------------- | ------------------------------------- |
   | `TURSO_DATABASE_URL` | the Database URL from Part 1, step 5  |
   | `TURSO_AUTH_TOKEN`   | the Auth token from Part 1, step 5    |

7. Save. Open your public URL (shown at the top of the Worker page, ending in
   `.workers.dev`). The matches screen and `/connections` page should load
   with the 8 people.

> If the site loads but shows no people, the secrets haven't been picked up
> yet — click **Deploy** / "Retry deployment" once more so the Worker restarts
> with them.

---

## After that

- **Every `git push` to `main` redeploys automatically.** Nothing else to do.
- The secrets are stored on the Worker, so they survive redeploys.
- Local development is unchanged: `npm run dev` still uses the local file
  database in `.data/`.

## Optional: deploy from your laptop instead

If you'd rather not connect Git, you can deploy by hand. Requires Node 20+
(`nvm use 22` if your shell picks an older one):

```sh
npx wrangler login
npm run deploy
```

Then add the two Turso secrets in the Cloudflare dashboard as in Part 2 step 6.
