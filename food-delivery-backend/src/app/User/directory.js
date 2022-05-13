const fs = require("fs")
const path = require("path")
const uuid = require("uuid").v4

const pictureDirectory = path.resolve( "./src/assets/image/userAvatar" ) ;

const createPicture = async picture => {
    let id = uuid() ;
    let imageBuffer = new Buffer.from( picture.replace(/^data:image\/(jpeg|jpg|png);base64,/, "" ), "base64" )

    await fs.promises.writeFile( `${ pictureDirectory }/${ id }.png`, imageBuffer, "base64", err => {
        if ( err ) {
            throw err
        }

        console.log( `${ id }.png sucessfully create.` )
    } )

    return id
}

const updatePicture = async ( id, picture ) => {
    let imageBuffer = new Buffer.from( picture.replace(/^data:image\/(jpeg|jpg|png);base64,/, "" ), "base64" )

    await fs.promises.writeFile( `${ pictureDirectory }/${ id }.png`, imageBuffer, "base64", err => {
        if ( err ) {
            throw err
        }

        console.log( `${ id }.png sucessfully update.` )
    } )
}

const createDefaultAvatar = async () => {
    var base64FormData = await fs.promises.readFile( `${ pictureDirectory }/default_0.png`, "base64", err => {
        if ( err ) {
            throw err
        }
    } )

    return createPicture( base64FormData )
}

module.exports = {
    createPicture,
    updatePicture,
    createDefaultAvatar
}