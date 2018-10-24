const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact-mongoose', { useNewUrlParser: true });

const db = mongoose.connection;
const Address = require('../models/address');

db.on('error', console.error);

class AddressService {
  static async create(data){
    const address = new Address(data);
    return await Address.save();
  }

  static async retrieve(id){
    let data;

    if(id) {
      data = await Address.findById(id)
      .populate('contacts')
      .exec();
      console.log(data.contacts);
    } else {
      data = await Address.find().exec();
    }
    if(!data){
      throw new Error('Cannot retrieve data')
    }
    return data;
  }
  static async update(id, data){
    const address = await Address.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
    if(!contact){
      throw new Error('Cannot update data');
    }
    return Address;
  }
  static async delete(id){
    const deleted = await Address.findByIdAndDelete(id);
    if(!deleted){
      throw new Error ('Cannot delete data');
    }
    return deleted;
  }
}

module.exports = AddressService;
