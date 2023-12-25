var express = require('express');
var router = express.Router();
var CategoryModel = require('../models/CategoryModel');

router.get('/', async (req, res) => {
   var categorys = await CategoryModel.find({});
   res.render('category/index', { categorys });
})

router.get('/add', (req, res) => {
   res.render('category/add');
})

router.post('/add', async (req, res) => {
   var category = req.body;
   await CategoryModel.create(category);
   res.redirect('/category');
})


router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   //cách 1
   try {
      //SQL: DELETE FROM brands WHERE brand = id
      await CategoryModel.findByIdAndDelete(id);
      console.log('Delete brand succeed !');
   } catch (err) {
      console.log('Delete brand fail. Error: ' + err);
   };

   res.redirect('/category');
})

router.get('/deleteall', async (req, res) => {
   //SQL: DELETE FROM brands
   //     TRUNCATE TABLE brands
   await CategoryModel.deleteMany();
   console.log('Delete all brand succeed !');
   res.redirect('/category');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var category = await CategoryModel.findById(id);
   res.render('category/edit', { category });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var category = req.body;
   try {
      //SQL: UPDATE brands SET A = B WHERE id = 'id'
      await CategoryModel.findByIdAndUpdate(id, category);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/category');
})

module.exports = router;