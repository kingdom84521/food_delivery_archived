const _ = require("lodash");
const mongoose = require("mongoose");

const Dish = mongoose.model("Dish");
const Menu = mongoose.model("Menu");

const saveDish = async ( menu_id, data ) => {
  const dish = new Dish( data );
  const menu = await Menu.findById( menu_id );
  menu.dishes.push( dish );
  menu.save();
  
  dish.menu_id = menu._id;
  return dish.save();
};

const editDish = ( dish, data ) => {
  const { name, image,	grains,	greens, protiens, dairies, fruits, nuts, tag, price } = data;
  const currentDish = dish;

  // currentDish.name = name;
  // currentDish.image = image;
  // currentDish.grains = grains;
  // currentDish.greens = greens;
  // currentDish.protiens = protiens;
  // currentDish.dairies = dairies;
  // currentDish.fruits = fruits;
  // currentDish.nuts = nuts;
  // currentDish.tag = tag;
  // currentDish.price = price;

  _.assign( currentDish, {
      "name": name || currentDish.name,
      "image": image || currentDish.image,
      "grains": grains || currentDish.grains,
      "greens": greens || currentDish.greens,
      "protiens": protiens || currentDish.protiens,
      "dairies": dairies || currentDish.dairies,
      "fruits": fruits || currentDish.fruits,
      "nuts": nuts || currentDish.nuts,
      "tag": tag || currentDish.tag,
      "price": price || currentDish.price
  } )
  return dish.save();
};

const deleteDish = async ( dish ) => {
  const menu = await Menu.findById( dish.menu_id );
  const dishIndex = menu.dishes.findIndex( dish_id => dish_id == dish._id.toString());
  menu.dishes.splice( dishIndex, 1 );
  menu.save();
  return dish.remove();
};

const findDish = ( id ) => Dish.findById( id );
const findDishBymenu = ( menu_id ) => Dish.find( { menu_id } ).select({
  __v: 0,
  menu_id: 0
});

module.exports = {
  saveDish,
  editDish,
  deleteDish,
  findDish,
  findDishBymenu
};