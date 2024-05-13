import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    itemName: String,
    itemPrice: Number,
    orderDate: {
        type: Date,
        default: Date.now,
    },
});

export const orderModel = model("Order", orderSchema);
