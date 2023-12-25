var mongoose = require('mongoose');
var ColorSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
   });
   var ColorModel = mongoose.model('colors', ColorSchema); 
   module.exports = ColorModel;