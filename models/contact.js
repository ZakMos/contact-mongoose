const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const {Schema} = mongoose;

const NameSchema = require('./name-schema.js');

const ContactSchema = new Schema({
  name: {
    type: NameSchema,
    required: true
  },
  phone_number: [String],
  email: [String],
  birth_date: Date,
  address: {
    type: Schema.Types.ObjectId,
    ref: 'addres',
    required: true
  }
});

ContactSchema.plugin(idValidator);

module.exports = mongoose.model('Contact', ContactSchema);
