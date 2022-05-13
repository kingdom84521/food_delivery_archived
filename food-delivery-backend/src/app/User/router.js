require("./model");
const validateToken = require("../../middlewares/validateToken");
const controller = require("./controller");

const express = require("express");
const cors = require("cors")

const router = express.Router();

router.use( function( req, res, next ) {
    const user = req.body

    console.log( `Request Type: USER\nRequest Method: ${ req.method }` )
    req.user = user

    next()
} )

// use apiDoc to generate documentation for API routes
// Details on how to use on: http://apidocjs.com/
// install apidoc globally: npm install apidoc -g
// Generate documentation: apidoc -i src/ -o apidoc/

/**
*    @apiGroup User
*    @api {post} /registration Adding an user to the db.
*    @apiParam {String} id  User ID required.
*    @apiParam {String} name  Mandatory name.
*    @apiParam {Number} age  Mandatory age. Minimum 18.
*    @apiParam {String} sex  Mandatory sex.
*    @apiExample {response} Example response:
*       {
*         "user": {
*            "id": 123456789,
*            "username": "user123"
*            "password": "pass123"
*            "name": "Ana",
*            "sex": "female",
*            "age": 30
*           }
*      }
*/
router.post( "/register", controller.register );

/**
*    @apiGroup User
*    @api {put} /edit Edit the profile and filtering options.
*    @apiDescription Useful to change profile information
*    @apiParam {String} id  User ID required.
*    @apiParam {String} name  Mandatory name.
*    @apiParam {Number} age  Mandatory age. Minimum 18.
*    @apiParam {String} sex  Mandatory sex.
*/
router.put( "/edit", validateToken, controller.edit );

/**
*    @apiGroup User
*    @api {delete} /delete Delete an user.
*    @apiParam {String} id  User ID required.
*    @apiHeaderExample Example header
*       {
*           id:123456789
*       }
*/
router.delete( "/delete", controller.delete );

/**
*    @apiGroup User
*    @api {get} / Get particular user info.
*    @apiParam {String} id  User ID required.
*    @apiHeaderExample Example header
*       {
*           id:123456789
*       }
*/
router.post("/", validateToken, controller.info )

router.post( "/:id", validateToken, controller.info )

module.exports = router;