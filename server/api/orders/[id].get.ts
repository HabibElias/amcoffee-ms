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
  const orderData = await db.query.order.findFirst({
    with: {
      orderItem: true,
      user: true,
    },
    where: eq(order.id, id),
  });

  if (!orderData) {
    throw createError({
      statusCode: 404,
      statusMessage: "Order not found",
    });
  }

  return orderData;
});
