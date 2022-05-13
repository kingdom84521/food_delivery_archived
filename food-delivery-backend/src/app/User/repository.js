const mongoose = require("mongoose")
const _ = require("lodash")

const User = mongoose.model("User")

const saveUser = async data => {
    const user = new User( data );
    await user.setPassword( data.password );
    return user.save();
}

const editUser = ( user, data ) => {
    const { name, auth, email, phone, birth, address } = data ;
    const current = user ;

    // if ( Object.keys( data ).includes( "image" ) ) {

    // }
    // else if (  )
    
    _.assign( current, {
        "name": name || current.name,
        "auth": auth || current.auth,
        "email": email || current.email,
        "phone": phone || current.phone,
        "birth": birth || current.birth,
        "address": address || current.address
    } )
    // console.log( current )
    // console.log( data )


    return user.save()
}

const deleteUser = user => user.remove()

const findUser = async id => {
    var result = await User.findOne( { id } )
    console.log( result )
    return !_.isEmpty( result ) ? result : await User.findById( id )
}
module.exports = {
    saveUser,
    editUser,
    deleteUser,
    findUser
}

