var express = require('express');
var router = express.Router();
var Product=require("../models/product")

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err,docs){
    if (err) {
      console.log(err)
    } else {
      var productChunks=[];
      var chunkSize=3;
      for (var i = 0; i < docs.length; i+=chunkSize) {
        productChunks.push(docs.slice(i,i+chunkSize));
      }
      console.log(productChunks);
      res.render('shop/index', { title: 'Shopping Cart',products:productChunks}); 
    }
  });
});

module.exports = router;