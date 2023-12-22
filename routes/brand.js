var express = require('express');
var router = express.Router();
var BrandModel = require('../models/BrandModel');
var toyModel = require('../models/ToyModel');

router.get('/', async (req, res) => {
   var brands = await BrandModel.find({});
   res.render('brand/index', { brands });
})

router.get('/add', (req, res) => {
   res.render('brand/add');
})

router.post('/add', async (req, res) => {
   var brands = req.body;
   await BrandModel.create(brands);
   res.redirect('/brand');
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   //SQL: SELECT * FROM toys WHERE brand = "id"
   var toys = await toyModel.find({ brands : id }).populate('brand');
   res.render('brand/detail', { toys })
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   //cách 1
   try {
      //SQL: DELETE FROM brands WHERE brand = id
      await BrandModel.findByIdAndDelete(id);
      console.log('Delete brand succeed !');
   } catch (err) {
      console.log('Delete brand fail. Error: ' + err);
   };

   //cách 2
   var brands = await BrandModel.findById(id);
   await BrandModel.deleteOne(brands);

   res.redirect('/brand');
})

router.get('/deleteall', async (req, res) => {
   //SQL: DELETE FROM brands
   //     TRUNCATE TABLE brands
   await BrandModel.deleteMany();
   console.log('Delete all brand succeed !');
   res.redirect('/brand');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var brands = await BrandModel.findById(id);
   res.render('brand/edit', { brands });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var brands = req.body;
   try {
      //SQL: UPDATE brands SET A = B WHERE id = 'id'
      await BrandModel.findByIdAndUpdate(id, brands);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/brand');
})

module.exports = router;