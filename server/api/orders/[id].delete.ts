import db from "~~/lib/db";
import { order } from "~~/lib/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "UnAuthorized",
    }));
  }

  if (!event.context.params || typeof event.context.params.id === "undefined") {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing menu ID parameter",
    });
  }
  const id = Number.parseInt(event.context.params.id) as number;

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID should be an integer",
    });
  }

  // before deleting check if the to be deleted order is the one created by the user.
  const [toBeDeletedOrder] = await db.select().from(order).where(eq(order.id, id));

  if (toBeDeletedOrder.userId !== event.context.user.id) {
    return sendError(event, createError({
      statusCode: 403,
      statusMessage: "User did not create this order, user can not delete this order",
      statusText: "Forbidden",
    }));
  }

  const [deletedOrder] = await db.delete(order).where(eq(order.id, id)).returning();

  return deletedOrder;
});
