const mongoose = require("mongoose")
const _ = require("lodash")

const Order = mongoose.model( "Order" )
const Store = mongoose.model( "Store" )

const createOrder = data => {
    const order = new Order( data )
    // process
    return order.save()
}

const editOrder = ( order, data ) => {
    const { status, request_time, maked_time, deliver_time, receive_time } = data
    const current = order

    _.assign( order, {
        "status": status || current.status,
        "request_time": request_time || current.request_time,
        "maked_time": maked_time || current.maked_time,
        "deliver_time": deliver_time || current.deliver_time,
        "receive_time": receive_time || current.receive_time
    } )

    return order.save()
}

const findOrders = store_id => Order.find( { store_id } )

const findOrder = id => Order.findById( id )

const populateOrder = async ( order, field ) => {
    const available = [ "store_id", "user_id", "employee_id", "address_id", "dishes" ]
    if ( _.includes( available, ...field ) ) {
        for ( element of field ) {
            await order.populate( element ).execPopulate()
        }
        return false
    }
    else {
        return false
    }
}

module.exports = {
    createOrder,
    editOrder,
    findOrders,
    findOrder,
    populateOrder
}