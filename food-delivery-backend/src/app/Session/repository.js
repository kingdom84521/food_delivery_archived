const mongoose = require("mongoose")
const _ = require("lodash");

const User = mongoose.model( "User" )
const Store = mongoose.model( "Store" )

const findUser = account => User.findOne( { account } )

const findStore = async condition => {
    const user = condition.latlng.split(",");
    const allStore = await Store.find({
        location: {
            $near: {
                $geometry : { 
                    type: "Point", 
                    coordinates: [ Number(user[1]), Number(user[0]) ] 
                },
                $maxDistance : 3000
            }
        }
    })
    .select("image name rating _id")
    .populate({
        path: "menus",
        select: { name: 1, _id: 0 },
        populate: {
            path: "dishes",
            select: { tag: 1, _id: 0 }
        }
    });

    const returnObj = {
        target: [],
        all: []
    };

    const storeObj = store => {
        let newStore = _.pick( store, ["name", "image", "rating"] );
        newStore[ "restaurant_id" ] = store._id;
        return newStore;
    };

    _.forEach(allStore, store => {
        returnObj.all.push( storeObj(store) );

        let menus = store.menus;
        let isTarget = false;
        _.forEach( menus, menu => {
            _.forEach( menu.dishes, dish => {
                _.forEach( dish.tag, tag => {
                    isTarget = isTarget || tag.indexOf( condition.keyword ) !== -1;
                });
            });
        });
        if ( isTarget ) {
            returnObj.target.push( storeObj(store) );
        }
    });
    return returnObj;
}

module.exports = {
    findUser,
    findStore
}