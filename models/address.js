const mongoose = require('mongoose');

const NameSchema = require('./name-schema');
const {Schema} = mongoose;
const AddressSchema = new mongoose.Schema({
  street: String,
  street_number: Number,
  city: String,
  state: String,
  country: String,
  zip: Number,
  contact: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  }

});
AddressSchema.virtual('contacts', {
  ref: 'Contact',
  localField: '_id',
  foreignField: 'contact'
});
module.exports = mongoose.model('Address', AddressSchema);
