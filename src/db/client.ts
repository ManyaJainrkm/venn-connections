import { createClient, type Config } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

// Local dev writes to a file; production points at Turso (libsql://...) via env.
// Same driver and queries either way, so nothing in the app changes on deploy.
function resolveConfig(): Config {
  const url = process.env["TURSO_DATABASE_URL"] ?? "file:./.data/venn.db";
  const authToken = process.env["TURSO_AUTH_TOKEN"];
  return authToken ? { url, authToken } : { url };
}

const client = createClient(resolveConfig());

export const db = drizzle(client, { schema });
export { schema };
