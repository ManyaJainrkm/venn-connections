import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

// Local dev writes to a file; production points at Turso (libsql://...) via env.
// The two runtimes need different libSQL entry points:
//   - Node (dev): the default client, which supports file: URLs.
//   - Cloudflare Workers (prod): the web client (pure fetch/HTTP), since the
//     native addon the Node client loads can't run on the Workers runtime.
// We pick by URL scheme so the same schema and queries work in both.
const url = process.env["TURSO_DATABASE_URL"] ?? "file:./.data/venn.db";
const authToken = process.env["TURSO_AUTH_TOKEN"];

const { createClient } = url.startsWith("file:")
  ? await import("@libsql/client")
  : await import("@libsql/client/web");

const client = createClient(authToken ? { url, authToken } : { url });

export const db = drizzle(client, { schema });
export { schema };
