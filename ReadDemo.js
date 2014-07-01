var mongoose=require('mongoose');
var URIString='mongodb://localhost/Assignment_DB';
console.log('Node Js sever started.....');
mongoose.connect(URIString,function(err){
    if(err){
        console.log('error in connection....'+err);
    }
    else{
        console.log('Connected successfully..');
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
console.log('connected to collection');
console.log(newEmployee);
newEmployee.find({}).exec(function(err,result){
    console.log('inside find');
    if(err){
        console.log('error while fetching data....'+ err);
    }
    else{
        console.log('Result  :\n'+result);
    }
});

