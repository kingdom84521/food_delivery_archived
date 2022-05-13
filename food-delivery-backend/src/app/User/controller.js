const _ = require("lodash")

// const logger = req.require("../../utilities/logger")
const repository = require("./repository")
const directory = require("./directory")

exports.register = async ( req, res ) => {
    if ( !repository.findUser( req.body.id ) ) {
        
        // logger.error( "User already exists" );
        res.preconditionFailed( "existing_user" );
        return;
    }
    //console.log( req.body )
    try {
        _.assign( req.user, {
            "id": await directory.createDefaultAvatar(),
            "auth": ["USER"]
        } )
        const savedUser = await repository.saveUser( req.user );
        // console.log( savedUser );
        res.success( _.pick( savedUser, [ "id", "account" ] ) );
    } catch ( err ) {
        res.send( err );
    }
};

exports.edit = async ( req, res ) => {
    try {
        const user = await repository.findUser( req.body.id );
        const editedUser = await repository.editUser( user, req.body );
        res.success( _.pick( editedUser, [ "id", "account" ] ) );
    } catch ( err ) {
        res.send( err );
    }
};

exports.delete = async ( req, res ) => {
    try {
        const user = await repository.findUser( req.user._id );
        const deletedUser = await repository.deleteUser( user );
        console.log( deletedUser );
        res.success( _.pick( deletedUser, [ "id", "account" ] ) );
    } catch ( err ) {
        console.log( err );
        res.send( err );
    }
};

exports.info = async ( req, res ) => {
    try {
        // const field = [ "name", "email", "phone", "birth" ]
        // const id = req.params.id || req.query.id || req.body.id
        // const targetUser = await repository.findUser( id )
        // targetUser.birth = new Date( targetUser.birth )

        res.success( req.user )
    } catch ( err ) {
        console.log( err ) ;
        res.send( err )
    }
}