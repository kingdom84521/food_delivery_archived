const repository = require("./repository");

const extraObject = (obj, keys) => {
  const returnObj = {};
  keys.forEach(key => {
    if ( key == "_id" ) {
      returnObj["menu_id"] = obj[key]; 
      return; 
    }
    returnObj[key] = obj[key];  
  });

  return returnObj;
};

exports.create = async ( req, res ) => {
  const restaurant_id = req.headers.restaurant_id;

  try {
    const saveMenu = await repository.saveMenu( restaurant_id, req.body );
    res.success(extraObject(
      saveMenu,
      ["_id", "name", "intro"]
    ));
  } catch ( err ) {
    console.log( err );
    res.send( err );
  }
};

exports.edit = async ( req, res ) => {
  try {
    const menu = await repository.findMenu( req.headers.menu_id );
    const editMenu = await repository.editMenu( menu, req.body );
    res.success(extraObject(
      editMenu,
      ["_id", "name", "intro"]
    ));
  } catch ( err ) {
    console.log( err );
    res.send( err );
  }
};

exports.findOne = async ( req, res ) => {
  try {
    const menu = await repository.findMenu( req.headers.menu_id );
    res.success(extraObject(
      menu,
      ["_id", "name", "intro"]
    ));
  } catch ( err ) {
    console.error( err );
    res.send( err );
  }
};

exports.findAll = async ( req, res ) => {
  try {
    const menu = await repository.findMenuByRestaurant( req.headers.restaurant_id );
    res.success(extraObject(
      menu,
      ["_id", "name", "intro"]
    ));
  } catch ( err ) {
    console.error( err );
    res.send( err );
  }
};
  
exports.delete = async ( req, res ) => {
  try {
    const menu = await repository.findMenu( req.headers.menu_id );
    const deleteMenu = await repository.deleteMenu( menu );
    res.success(extraObject(
      menu,
      ["_id", "name"]
    ));
  } catch ( err ) {
    console.error( err );
    res.send( err );
  }
};