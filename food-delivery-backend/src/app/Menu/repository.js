require("../Dish/model");
const mongoose = require("mongoose");

const Menu = mongoose.model("Menu");
const Store = mongoose.model("Store");
const Dish = mongoose.model("Dish");

const saveMenu = async ( restaurant_id, data ) => {
  const menu = new Menu( data );
  const store = await Store.findById( restaurant_id );
  store.menus.push( menu );
  store.save();
  
  menu.restaurant_id = store._id;
  return menu.save();
};

const editMenu = ( menu, data ) => {
  const { name, intro } = data;
  const currentMenu = menu;

  currentMenu.name = name ||　currentMenu.name;
  currentMenu.intro = intro || currentMenu.intro;
  return menu.save();
};

const deleteMenu =  async ( menu ) => { 
  menu.dishes.forEach( async dish_id => {
    await Dish.remove( { _id: dish_id } );
  });
  const store = await Store.findById( menu.restaurant_id );
  const menuIndex = store.menus.findIndex( menu_id => menu_id == menu._id.toString());
  console.log( menuIndex );
  store.menus.splice( menuIndex, 1 );
  store.save();
  return menu.remove();
};

const findMenu = ( menu_id ) => Menu.findById( menu_id );
const findMenuByRestaurant = async ( restaurant_id ) => Menu.find( { restaurant_id } );

module.exports = {
  saveMenu,
  editMenu,
  deleteMenu,
  findMenu,
  findMenuByRestaurant
};