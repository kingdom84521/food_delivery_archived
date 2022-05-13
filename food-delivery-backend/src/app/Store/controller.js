const repository = require("./repository");

const extraObject = (obj, keys) => {
  const returnObj = {};
  keys.forEach(key => {
    if ( key == "_id" ) {
      returnObj["restaurant_id"] = obj[key]; 
      return; 
    }
    if ( key == "location" ) {
      returnObj[key] = obj[key].coordinates; 
      return; 
    }
    returnObj[key] = obj[key];  
  });

  return returnObj;
};

exports.register = async ( req, res ) => {
  const user_id = req.headers.user_id;

  try {
    const existStore = await repository.findStoreByOwner( user_id );
    if ( existStore ) {
      res.status(412).json({
        success: false,
        error: "existing_store",
      });
      return;
    }

    const saveStore = await repository.saveStore( user_id, req.body );
    // console.log( saveStore );
    res.success(extraObject(
      saveStore,
      ["_id", "name", "image", "intro", "work_time"]
    ));
  } catch( err ) {
    console.error( err );
    res.send( err );
  }
};

exports.edit = async ( req, res ) => {
  try {
    const store = await repository.findStoreByOwner( req.headers.owner_id );
    const editStore = await repository.editStore( store, req.body );
    res.success(extraObject(
      editStore,
      ["name", "image", "intro", "work_time"]
    ));
  } catch ( err ) {
    console.error( err );
    res.send( err );
  }
};

exports.findOne = async ( req, res ) => {
  try {
    let getStore;
    if ( req.headers.restaurant_id ) {
      getStore = await repository.findStoreById( req.headers.restaurant_id );
    } else {
      getStore = await repository.findStoreByOwner( req.headers.owner_id );
    }

    const store = getStore;
    console.log( getStore );
    if ( store ) {
      res.success({
        info: extraObject(
          store,
          ["name", "image", "address", "rating", "intro", "work_time"]
        ),
        menus: store.menus
      });
    } else {
      res.status(412).json({
        success: false,
        error: "restaurant_not_exist",
      });
    }
  } catch ( err ) {
    console.error( err );
    res.send( err );
  }
};
  
exports.delete = async ( req, res ) => {
  try {
    const store = await repository.findStoreByOwner( req.headers.owner_id );
    const deleteStore = await repository.deleteStore( store );
    console.log( deleteStore );
    res.success(extraObject(
      store,
      ["_id", "name"]
    ));
  } catch ( err ) {
    console.error( err );
    res.send( err );
  }
};