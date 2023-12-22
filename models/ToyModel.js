var mongoose = require('mongoose');
var ToySchema = mongoose.Schema({
   model: String,
   price: String,
   height:String,
   image: String,
   brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands'  // 'brands': collection
   }
});
//Relationship : mobiles (many) - brands (one)

var ToyModel = mongoose.model('toys', ToySchema); // 'mobiles' : collection
module.exports = ToyModel;