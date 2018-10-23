const mongoose = require('mongoose');

const NewSchema = require('./name-schema');

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
})
