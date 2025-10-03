import db from "~~/lib/db";
import { withdraw } from "~~/lib/db/schema";
import { and, desc, gte, lt } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "UnAuthorized",
    }));
  }

  if (!event.context.params || typeof event.context.params.date === "undefined") {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing menu ID parameter",
    });
  }
  const date = Number.parseInt(event.context.params.date) as number;

  if (!Number.isInteger(date)) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID should be an integer",
    });
  }

  const then = new Date(date);
  const startOfThen = new Date(then.getFullYear(), then.getMonth(), then.getDate()).getTime();
  const endOfThen = new Date(then.getFullYear(), then.getMonth(), then.getDate() + 1).getTime();

  const withdrawData = await db.query.withdraw.findMany({
    orderBy: [desc(withdraw.createdAt)],
    with: {
      user: true,
    },
    where: and(
      gte(withdraw.createdAt, startOfThen),
      lt(withdraw.createdAt, endOfThen),
    ),
  });

  if (!withdrawData) {
    throw createError({
      statusCode: 404,
      statusMessage: "Order not found",
    });
  }

  return withdrawData;
});
