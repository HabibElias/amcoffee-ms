import db from "~~/lib/db";
import { menu } from "~~/lib/db/schema";

export default defineEventHandler(async () => {
  const result = await db.select().from(menu);

  return result;
});
