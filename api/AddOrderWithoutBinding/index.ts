import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Order } from "../models/order";
import { CosmosDBService } from "../services/cosmosDBService";

/**
 * Adds an order provided in the request body to the Cosmos DB database.
 * If valid, the order including its ID is returned in the response body with HTTP status code 201, else an HTTP status code 400 is returned.
 *
 * The order looks like this: {itemName: string, quantity: number, price: number}
 * Example: {"itemName": "Cookies", "quantity": 10, "price": 2.5}
 *
 * @param context passed from the Azure Functions runtime.
 * @param req is the http request for this endpoint which should contain an {@link Order} in the body.
 * @returns the added item in the response body and status 201. Or status 400 and an error mesage in body.message.
 */
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log.info("AddOrderWithBinding function processed a request.");
  if (!req.body) {
    context.log.warn("No body in request");
    context.res = {
      status: 400,
      body: { message: "Invalid input" },
    };
    return;
  }

  try {
    const order = req.body as Order;
    const cosmosService: CosmosDBService = new CosmosDBService();
    const orderAddedID = await cosmosService.addOrder(order);
    order._id = orderAddedID.insertedId;
    context.log.info(`Order added with ID: ${order._id}`);

    context.log.info(
      `Order item ${order.itemName} with quantity ${order.quantity}.`
    );

    context.res = {
      status: 201,
      body: order,
    };
  } catch (error) {
    context.res = {
      status: 400,
      body: { message: error.message },
    };
  }
};

export default httpTrigger;
