var mongoose=require('mongoose');
var async=require('async');
var sourceConnection=mongoose.createConnection('mongodb://localhost/SourceDB');
var destinationConnection=mongoose.createConnection('mongodb://localhost/DestinationDB');
var UserSchema, UserModel,PersonModel,personData=[];
// USER Schema...
UserSchema=new mongoose.Schema(
    {
        name:String,
        designation:String,
        contact_Number:Number
    },{versionKey:false});
UserModel=sourceConnection.model('Users',UserSchema);
PersonModel=destinationConnection.model('persons',UserSchema);

// REad data from user and save in Person..
function findData(callback){
    UserModel.find({}).exec(function(err,result){
        if(err){
            console.log('error while fetching data....'+ err);
            callback(err);
        }
        else{
            personData=result;
            console.log(personData);
            callback(null);
        }
    });
}
   function saveData(callback){
       // INSERTING DATA INTO PERSON..
       var person;
       var personSaveArray=[];

       personData.forEach(function(pd){
           personSaveArray.push(function(callback){
               person=new PersonModel(pd);
               person.save(function(err){
                   if(err){
                       console.log('error while saving data...in person'+err);
                       callback(err);
                   }
                   else
                   {
                       callback(null);
                   }
               });
           })

       });


       async.series(personSaveArray,function(err){
               if(err){
                   console.log("Error in async..."+err);
               }
           else
               {
                   console.log('data copied from users to PERSONS');
                   callback(null);
               }
           });

   }



async.series([findData,saveData],function(err){
    if(err){
        console.log("Error in async..."+err);
    }
});