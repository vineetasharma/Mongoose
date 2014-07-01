var mongoose=require('mongoose');
var URIString='mongodb://localhost/Assignment_DB';
mongoose.connect(URIString,function(err){
    if(err){
        console.log('error in connection...'+err);
    }
    else{
        console.log('connected...');
    }
});
var employeeSchema=new mongoose.Schema({
    name:String,
    //dob:Date,
    designation:String,
    contact_Number:Number
},{versionKey:false});
var newEmployee=mongoose.model('Employees',employeeSchema);
newEmployee.update({name:'vineeta'},{name:'vini',designation:'Software Engineer',contact_Number:8377006463}).exec(function(err){
   if(err){
       console.log('error in update...'+err);
   }
});