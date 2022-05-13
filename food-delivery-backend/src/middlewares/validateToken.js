const jwt = require("jsonwebtoken")

//const logger = require("")

const SECRET = require("../config").secret

module.exports = function( req, res, next ) {
    const token = req.body.token || req.query.token || req.headers["x-access-token"]

    if ( token ) {
        return jwt.verify( token, SECRET, function( err, decoded ) {
            if ( err ) {
                // logger.error( err );
                return res.authenticationFailed()
            }
            req.user = decoded;
            return next();
        } );
    }
}