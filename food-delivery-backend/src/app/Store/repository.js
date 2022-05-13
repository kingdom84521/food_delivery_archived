const mongoose = require("mongoose");

const Store = mongoose.model("Store");
const User = mongoose.model("User");

const saveStore = async ( user_id, data ) => {
  const store = new Store( data );
  const user = await User.findOne({ id: user_id });
  user.auth.push("STORE");
  user.save();

  store.owner_id = user._id;
  store.setLocation( data.location );
  return store.save();
};

const editStore = ( store, data ) => {
  const { name, image, intro, work_time } = data;
  const currentStore = store;

  currentStore.name = name || currentStore.name;
  currentStore.image = image || currentStore.image;
  currentStore.intro = intro || currentStore.intro;
  currentStore.work_time = work_time || currentStore.work_time;
  return store.save();
};

const deleteStore = async ( store ) => { 
  const user = await User.findById( store.owner_id );
  const storeIndex = user.auth.findIndex( "STORE" );
  user.auth.splice( storeIndex, 1 );
  user.save();
  return store.remove();
};

const findStoreById = async ( id ) => {
  const store = await Store.findById( id ).populate({
    path: "menus",
    select: "name intro _id",
    populate: { 
      path: "dishes",
      select: "image grains greens protiens dairies fruits nuts tag price name _id"
    }
  });
  return store;
};
const findStoreByOwner = async ( owner_id ) => {
  const user = await User.findOne({ id: owner_id });
  const store = Store.findOne( { owner_id: user._id } );
  return store;
};

module.exports = {
  saveStore,
  editStore,
  deleteStore,
  findStoreById,
  findStoreByOwner
};