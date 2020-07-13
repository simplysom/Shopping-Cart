
var Product=require("../models/product");
//const { exists } = require("../models/product");
var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://som:som12345@cluster0.udaht.mongodb.net/<dbname>?retryWrites=true&w=majority",{useNewUrlParser:true});
var products=[new Product({
    imagePath:'C:\Users\soumyaprakash\Pictures\nfs.jpg',
    title:'Need for Speed',
    description:'Superb game',
    price:10
}),new Product({
    imagePath:'C:\Users\soumyaprakash\Pictures\fifa.jpg',
    title:'Fifa',
    description:'Excellent game !!!',
    price:20
}),new Product({
    imagePath:'C:\Users\soumyaprakash\Pictures\nba.jpg',
    title:'Basketball',
    description:'Mamba Forever',
    price:30
})]
var done=0
for(var i=0;i<products.length;i++){
    products[i].save(function(err,result){
        done++;
        if(done === products.length) {
            exit();
    }
    })
}

function exit(){
    mongoose.disconnect();
}
