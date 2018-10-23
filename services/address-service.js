const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact-mongoose', { useNewUrlParser: true });

const db = mongoose.connection;
const address = require('../models/address');

db.on('error', console.error);

class AddressService {
  static async create(data){
    const address = new Address(data);
    return await address.save();
  }

  static async retrive(id){
    let data;

    if(id){
      data = await Address.findById(id)
      .populate('contacts')
      .exec();
      console.log(data.contacts);
    } else {
      data = await Address.find().exec();
    }
    if(!data){
      throw new Error('Cannot retrive data')
    }
    return data;
  }
  static async update(id, data){
    const team = await Address.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
    if(!contact){
      throw new Error('Cannot update data');
    }
    return address;
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
