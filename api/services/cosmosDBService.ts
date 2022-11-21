import { MongoClient, ObjectId } from "mongodb";
import { Order } from "../models/order";

export class CosmosDBService {
  private readonly client: MongoClient;

  constructor() {
    this.client = new MongoClient(process.env.ORDERS_COSMOSDB);
  }

  public async addOrder(order: Order) {
    if (
      !order ||
      !order.itemName ||
      order.itemName === "" ||
      !order.quantity ||
      order.quantity <= 0 ||
      !order.price ||
      order.price <= 0
    ) {
      throw new Error("Illegal value for order");
    }
    try {
      const ordersCollection = await this.connectAndGetCollection();
      return await ordersCollection.insertOne(order);
    } finally {
      await this.client.close();
    }
  }

  private async connectAndGetCollection() {
    await this.client.connect();
    return this.client.db("order-db").collection("orders");
  }
}
