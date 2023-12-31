var express = require('express');
var router = express.Router();
var ColorModel = require('../models/ColorModel');

router.get('/', async (req, res) => {
   var colors = await ColorModel.find({});
   res.render('color/index', { colors });
})

router.get('/add', (req, res) => {
   res.render('color/add');
})

router.post('/add', async (req, res) => {
   var color = req.body;
   await ColorModel.create(color);
   res.redirect('/color');
})


router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   //cách 1
   try {
      //SQL: DELETE FROM brands WHERE brand = id
      await ColorModel.findByIdAndDelete(id);
      console.log('Delete brand succeed !');
   } catch (err) {
      console.log('Delete brand fail. Error: ' + err);
   };

   res.redirect('/color');
})

router.get('/deleteall', async (req, res) => {
   //SQL: DELETE FROM brands
   //     TRUNCATE TABLE brands
   await ColorModel.deleteMany();
   console.log('Delete all brand succeed !');
   res.redirect('/color');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var color = await ColorModel.findById(id);
   res.render('color/edit', { color });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var color = req.body;
   try {
      //SQL: UPDATE brands SET A = B WHERE id = 'id'
      await ColorModel.findByIdAndUpdate(id, color);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/color');
})

module.exports = router;