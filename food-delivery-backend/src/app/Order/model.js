const mongoose = require("mongoose")

const Schema = mongoose.Schema

const orderSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User", default: new mongoose.Types.ObjectId() },
    store_id: { type: Schema.Types.ObjectId, ref: "Store", default: new mongoose.Types.ObjectId() },
    employee_id: { type: Schema.Types.ObjectId, ref: "Employee", default: new mongoose.Types.ObjectId() },
    address_id: { type: Schema.Types.ObjectId, ref: "Address", default: new mongoose.Types.ObjectId() },
    request_time: { type: Date, default: Date.now() },
    maked_time: { type: Date, default: Date.now() },
    deliver_time: { type: Date, default: Date.now() },
    receive_time: { type: Date, default: Date.now() },
    status: {
        type: String,
        default: "CREATED",
        enum: ["CREATED", "MAKING", "DELIVERING", "FINISHED"]
    },
    subtotal: { type: Number, default: 0 },
    service_fee: { type: Number, default: 0 },
    dishes: [{ type: Schema.Types.ObjectId, default: [], ref: "Dish" }],
    serial_number: String
}, { 
    timestamps: true
})

module.exports = mongoose.model( "Order", orderSchema )

