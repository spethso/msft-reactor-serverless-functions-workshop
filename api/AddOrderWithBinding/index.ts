import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Order } from "../models/order";

/**
 * Add an order to the Cosmos DB database.
 * The order is passed in the request body and validated using a binding to the order schema.
 * The order is added to the database using a binding to the database.
 * Finally, if valid, the order is returned in the response body with HTTP status code 201, else an HTTP status code 404 is returned.
 *
 * The order looks like this: {id: string, name: string, quantity: number, price: number}
 * Example: {"id": "1", "name": "Cookies", "quantity": 10, "price": 2.5}
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

    context.log.info(
        `Order item ${req.body.name} with quantity ${req.body.quantity}`
    );

    const order = req.body as Order;
    context.bindings.order = JSON.stringify({
        itemName: "Noodles",
        quantity: 5,
        price: 7,
    });

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "responseMessage",
    };
};

export default httpTrigger;
