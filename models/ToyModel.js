var mongoose = require('mongoose');
var ToySchema = mongoose.Schema({
   model: String,
   price: {
      type: Number,
      require: true,
   },
   height:{
      type: Number,
      require: true,
   },
   category:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categorys'

   },
   image: String,
   color:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'colors'  
   },
   brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands'  
   }
   
})

var ToyModel = mongoose.model('toys', ToySchema); 
module.exports = ToyModel;