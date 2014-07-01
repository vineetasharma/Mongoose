var mongoose=require('mongoose');
var URIString='mongodb://localhost/Assignment_DB';
mongoose.connect(URIString,function(err){
    if(err){
        console.log('error....'+err);
    }
    else{
        console.log('connected.........');
    }
});
var employeeSchema=new mongoose.Schema({
    name:String,
    //dob:Date,
    designation:String,
    contact_Number:Number
},{versionKey:false});
var newEmployee=mongoose.model('Employees',employeeSchema);
newEmployee.remove({name:'vini'}).exec(function(err){
    if(err){
        console.log('error in deletion....'+err);
    }
    else{
        console.log('data deleted successfully..');
    }
});