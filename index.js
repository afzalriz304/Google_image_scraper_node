
var express=require('express');
var bodyParser = require('body-parser');
var app=express();
var fs = require('fs');
var cors    = require('cors');


//connected to mongoose
var mongoose  = require('mongoose');
mongoose.connect("mongodb://root:root@ds141185.mlab.com:41185/googlesearch")
require('./models/SearchedData')

mongoose.connection.on("connected",function(){
  console.log('connection Successfull')
})
mongoose.connection.on("error",function(err){
  if(err)
    console.log('connection error')
})

var searchedData  = mongoose.model('searchedData');


//image-scraper
var Scraper = require ('images-scraper')
  , google = new Scraper.Google();


//add middleware 
app.use(cors());
app.use(bodyParser.json());





app.post('/getImages',function(req,res){
  console.log("inside of getImages",req.query.image);
  
  google.list({
    keyword: req.query.image,
    num: 15
  })
  .then(function (data) {

    console.log("searchData",data)
    var searchData  = {
      "key":req.query.image,
      "data":data
    }

    var now = new Date();
    var search  = searchedData({
      'keyword':req.query.image,
      'data':data,
      'time':now
    })

    search.save(function(err,search_data){
      console.log("search save",search_data)
      res.send(search_data);
    })

    
  }).catch(function(err) {
      res.send(err)
      console.log('err', err);
  });
})

app.get('/getSearchData',function(req,res){
  searchedData.find({}).exec(function(err,db_data){
    if(err){

    }else{
      res.send(db_data);
    }
  })
})


app.set('port', (process.env.PORT || 5000));


app.get('/', function(request, response) {
  response.send("OK")
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
