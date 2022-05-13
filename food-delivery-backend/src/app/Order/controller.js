const _ = require("lodash")

// const logger = req.bodyuire("../../utilities/logger")
const repository = require("./repository")
const randomTwoChar = require("../../utilities").randomTwoChar

exports.order = async ( req, res ) => {
    try {
        const orders = await repository.findOrders( req.body.store_id )
        const lastOrder = orders[ orders.length - 1 ]

        if ( !lastOrder ) {
            _.assign( req.body, {
                "serial_number": `${ randomTwoChar() }001`
            } )
        }
        else {
            const lastSerial = lastOrder.serial_number
            var nextNumber = parseInt( lastSerial.substr( 2, 4 ) ) + 1
            var nextSerial = lastSerial.substr( 0, 2 )

            switch( nextNumber.toString().length ) {
                case 1:
                    nextSerial += nextNumber.toString().replace( /^/, "00" )
                    break
                case 2:
                    nextSerial += nextNumber.toString().replace( /^/, "0" )
                case 3:
                    nextSerial += nextNumber.toString()
            }

            _.assign( req.body, {
                "serial_number": nextSerial,
                "status": "CREATED"
            } )
        }

        const createdOrder = await repository.createOrder( req.body )
        res.success( _.pick( createdOrder, [ "status", "serial_number", "request_time" ] ) );
    } catch ( err ) {
        console.log( err )
    }
}

exports.update = async ( req, res ) => {
    const order = await repository.findOrder( req.body._id )
    const editedOrder = await repository.editOrder( order, req.body )
    res.success( _.pick( editedOrder, [ "status", "request_time" ] ) )
}

exports.info = async ( req, res ) => {
    try {
        const order = await repository.findOrder( req.body._id )
        await repository.populateOrder( order, ["store_id", "user_id"] )
        res.success( order )
    } catch ( err ) {
        console.error( err )
    }
}