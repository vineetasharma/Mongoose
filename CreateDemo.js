/*DEMO TO CREATE COLLECTION.......
* */
var mongoose=require('mongoose');
var URIString='mongodb://localhost/Assignment_DB';
console.log('Node Js Server started...');
mongoose.connect(URIString,function(err){
    if(err){
        console.log('connection error....');
    }
    else{
        console.log('connected....');
    }
});
var employeeSchema=new mongoose.Schema(
{
    name:String,
    //dob:Date,
    designation:String,
    contact_Number:Number
},{versionKey:false});
var newEmployee=mongoose.model('Employees',employeeSchema);
var sampleEmployee=new newEmployee({
    name:'vini',
    designation:'programmer',
    contact_Number:8826154691

});
sampleEmployee.save(function(err){
    if(err){
        console.log('error while saving data...');
    }
    else{
        console.log('data saved......');
    }
});



