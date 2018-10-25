const mongoose    = require('mongoose');
// const idValidator = require('mongoose-id-validator');
const {Schema}    = mongoose;

const NameSchema  = require('./name-schema');

const ContactSchema = new mongoose.Schema({
  name: {
      first: String,
      last: String

    // type: NameSchema,
    // required: true
  },
  phone_number: [String],
  email: [String],
  birth_date: Date
  // address: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Address'
  //   // required: true
  // }
});
// }, {toJSON: {virtuals: true}});
// ContactSchema.virtual('address', {
//   ref: 'Address',
//   localField: '_id',
//   foreignField: 'address'
// });
// ContactSchema.plugin(idValidator);

module.exports = mongoose.model('Contact', ContactSchema);
