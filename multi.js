/*
* Copy data from one database to another.....
* */
var mongoose=require('mongoose');
var async=require('async');
var sourceConnection=mongoose.createConnection('mongodb://localhost/SourceDB');
var destinationConnection=mongoose.createConnection('mongodb://localhost/DestinationDB');
var UserSchema, UserModel,personData=[],companyData=[],CompanyModel,OrganizationSchema;
// USER Schema...
UserSchema=new mongoose.Schema(
    {
        name:String,
        designation:String,
        contact_Number:Number
    },{versionKey:false});
UserModel=sourceConnection.model('Users',UserSchema);
PersonModel=destinationConnection.model('persons1',UserSchema);
// company Schema..
OrganizationSchema=new mongoose.Schema(
    {
        name:String,
        location:String,
        contact_Number:Number
    },{versionKey:false});
CompanyModel=sourceConnection.model('company',OrganizationSchema);
OrganizationModel=destinationConnection.model('organization',OrganizationSchema);

// REad data from user and save in Person..
function findData(callback){
    UserModel.find({}).exec(function(err,result){
        if(err){
            console.log('error while fetching data....'+ err);
            callback(err);
        }
        else{
            console.log(result)
            personData=result;
            callback(null);
        }
    });
}
function saveData(callback){
    // INSERTING DATA INTO PERSON..
    var person,personSaveArray=[];
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
           // callback(null);
        }
    });
}
function findData1(callback){
    CompanyModel.find({}).exec(function(err,result){
        if(err){
            console.log('error while fetching data....'+ err);
            callback(err);
        }
        else{
            companyData=result;
            callback(null);
        }
    });
}
function saveData1(callback){
    // INSERTING DATA INTO Orgnization....
    var orgnization,orgnizationSaveArray=[];
    companyData.forEach(function(cd){
        orgnizationSaveArray.push(function(callback){
            orgnization=new OrganizationModel(cd);
            orgnization.save(function(err){
                if(err){
                    console.log('error while saving data...in orgnization'+err);
                    callback(err);
                }
                else{
                    callback(null);
                }
            });
        });

    })
    async.series(orgnizationSaveArray,function(err){
        if(err){
            console.log("error while coping data in orgnization..."+err);
        }
        else{
            console.log('data copied from company to Organization');
        }
    });
}
function first(callback){
    console.log("In First")
    async.series([findData,saveData],function(err){
        if(err){
            console.log("Error in async..person"+err);
            //callback(err);
        }
    });
    callback(null);

}
function second(callback){
    async.series([findData1,saveData1],function(err){
        if(err){
            console.log("Error in async..orgnization"+err);
           // callback(err);
        }
    });
    callback(null);

}
async.parallel([first,second],function(err){
    if(err)
    {
        console.log("error"+err);
    }
});
