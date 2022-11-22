import { ObjectId } from "mongodb";

export class Order {
    _id: ObjectId;
    itemName: string;
    quantity: number;
    price: number;
}
