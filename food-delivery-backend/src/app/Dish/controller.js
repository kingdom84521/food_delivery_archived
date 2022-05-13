const repository = require("./repository");

const extraObject = (obj, keys) => {
  const returnObj = {};
  keys.forEach(key => {
    if ( key == "_id" ) {
      returnObj["dish_id"] = obj[key]; 
      return; 
    }
    returnObj[key] = obj[key];  
  });

  return returnObj;
};

exports.create = async ( req, res ) => {
  const menu_id = req.headers.menu_id;

  try {
    const saveDish = await repository.saveDish( menu_id, req.body );
    res.success(extraObject(
      saveDish,
      ["_id", "name"]
    ));
  } catch ( err ) {
    console.log( err );
    res.send( err );
  }
};

exports.edit = async ( req, res ) => {
  try {
    const dish = await repository.findDish( req.headers.dish_id );
    const editDish = await repository.editDish( dish, req.body );
    res.success(extraObject(
      editDish,
      ["_id", "name"]
    ));
  } catch ( err ) {
    console.log( err );
    res.send( err );
  }
};

exports.findOne = async ( req, res ) => {
  try {
    const dish = await repository.findDish( req.headers.dish_id );
    res.success( { dish } );
  } catch ( err ) {
    console.error( err );
    res.send( err );
  }
};

exports.findAll = async ( req, res ) => {
  try {
    const dishes = await repository.findDishBymenu( req.headers.menu_id );
    res.success( { dishes } );
  } catch ( err ) {
    console.error( err );
    res.send( err );
  }
};
  
exports.delete = async ( req, res ) => {
  try {
    const dish = await repository.findDish( req.headers.dish_id );
    const deleteDish = await repository.deleteDish( dish );
    res.success(extraObject(
      deleteDish,
      ["_id", "name"]
    ));
  } catch ( err ) {
    console.error( err );
    res.send( err );
  }
};