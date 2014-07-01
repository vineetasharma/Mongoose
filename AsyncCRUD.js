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
    var sampleEmployee=new newEmployee({
        name:'sari',
        designation:'programmer',
        contact_Number:8823154891

    });
    sampleEmployee.save(function(err){
        if(err){
            console.log('error while saving data...');
        }
        else{
            console.log('data saved......');
        }
        findData();
    });



function findData(){
    newEmployee.find({}).exec(function(err,result){
        if(err){
            console.log('error while fetching data....'+ err);
        }
        else{
            console.log('Result  :\n'+result);
        }
    });

}