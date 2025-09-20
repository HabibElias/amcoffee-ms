import db from "~~/lib/db";
import { insertOrderSchema, order, orderItem } from "~~/lib/db/schema";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      status: 401,
      statusMessage: "Unauthorized",
    }));
  }

  const result = await readValidatedBody(event, insertOrderSchema.safeParse);

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

  const [createdOrder] = await db.insert(order).values({ userId: event.context.user.id }).returning();

  // Insert all order items
  const orderItemsToInsert = result.data.orderItems.map(item => ({
    ...item,
    orderId: createdOrder.id,
  }));
  const createdItems = await db.insert(orderItem).values(orderItemsToInsert).returning();
  return createdItems;
});
