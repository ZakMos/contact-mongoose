const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact-mongoose', { useNewUrlParser: true });

const db = mongoose.connection;
const contact = require('../models/contact');


db.on('error', console.error);

class ContactService {
  static async create(data){
    const newContact = new Contact(data);

    return await newContact.save();
  }

  static async retrive({id, addressid}){
    let data;

    if (id){
      data = await Contact.findById(id)
      .populate('address')
      .exec();
    } else if(addressid){
      data = await Contact.find({address: addressid}).exec();
    } else {
      data = await Contact.find().exec();
    }

    if(!data){
      throw new Error('Cannot retrive data');
    }

    return data;
    }

    static async update(id, data){
      const updated = await Contact.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
      });

      if (!updated){
        throw new Error('Cannot update data');
      }

      return updated;
    }

    static async delete(id){
      const deleted = await Contact.findByIdAndDelete(id);

      if (!deleted){
        throw new Error('Cannot delete data');
      }

      return deleted;
  }
}

module.exports = ContactService;
