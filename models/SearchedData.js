var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var SearchedData	=	new Schema({
	keyword:{
		type:String,
		default:""
	},
	data:{
		type:Array
	},
	time:{
		type:Date
	}

})	

module.exports	=	mongoose.model('searchedData',SearchedData)