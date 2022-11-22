import { AzureFunction, Context } from "@azure/functions";
import { CosmosDBService } from "../services/cosmosDBService";

const timerTrigger: AzureFunction = async function (
    context: Context,
    myTimer: any
): Promise<void> {
    try {
        context.log.info("Timer triggered. Getting orders from Cosmos DB");
        const cosmosDBService: CosmosDBService = new CosmosDBService();
        const orders = await cosmosDBService.getOrders();
        context.log.info(JSON.stringify(orders)); // TODO: Do something with the orders
    } catch (error) {
        context.log.error(error);
        // TODO: Handle error
    }
};

export default timerTrigger;
