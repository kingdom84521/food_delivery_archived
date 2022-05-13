const _ = require("lodash")
const jwt = require("jsonwebtoken")

const config = require("../../config")

const repository = require("./repository")

exports.login = async ( req, res ) => {
    if ( !req.body.account || !req.body.password ) {
        res.preconditionFailed( "Credentials_missing" )
    }

    try {
        const user = await repository.findUser( req.body.account )

        if ( !user || !await user.checkPassword( req.body.password ) ) {
            res.authenticationFailed()
        }
        else {
            const token = jwt.sign( user.toObject(), config.secret, { expiresIn: "1h" } )
            res.success( token )
        }

    } catch ( err ) {
        // res.send( err )
        console.error( err )
    }
}

exports.search = async ( req, res ) => {
    try {
        const store = await repository.findStore( req.query )

        res.success( store )

    } catch ( err ) {
        // res.send( err )
        console.error( err )
    }
}
