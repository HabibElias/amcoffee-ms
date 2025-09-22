import db from "~~/lib/db";
import { insertOrderItemSchema, orderItem } from "~~/lib/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      status: 401,
      statusMessage: "Unauthorized",
    }));
  }

  const result = await readValidatedBody(event, insertOrderItemSchema.safeParse);

  if (!result.success) {
    const statusMessage = result.error.issues.map(issue => `${issue.path.join("")}: ${issue.message}`).join("; ");

    const data = result.error.issues.reduce((error, issue) => {
      error[issue.path.join("")] = issue.message;
      return error;
    }, {} as Record<string, string>);

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
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

  // Delete old order items for this order
  await db.delete(orderItem).where(eq(orderItem.orderId, id));

  // Insert new order items
  const orderItemsToInsert = result.data.orderItems.map(item => ({
    ...item,
    orderId: id,
  }));

  const createdItems = await db.insert(orderItem).values(orderItemsToInsert).returning();
  return createdItems;
});
