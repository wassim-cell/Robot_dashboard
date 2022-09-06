const mongo=require('mongoose')
const bcrypt=require('bcrypt')


url="mongodb://localhost:27017/blog3"


var userModel = mongo.Schema({
    firstName:String ,
    lastName:String ,
    country:String ,
    phoneNumber:String ,
    language:String ,
    company:String ,
    image:String ,
    email:String ,
    password:String
})

var users = mongo.model('user',userModel)


exports.registerUser=(firstName,lastName,email,password)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            return users.findOne({email:email}).then((admin)=>{
                if(admin){
                    mongo.disconnect()
                    
                    reject("email is already used !")
                } else {
                    return password
                   
                }
           }).then(password=> {
                  Admin = new users({
                     firstName:firstName ,
                     lastName:lastName ,
                     email:email ,
                     password:password 
                  }) 
                  return Admin.save()
            }).then((admin)=>{
                resolve(admin._id)
                mongo.disconnect()
            })
            
        }).catch((err)=>{
            mongo.disconnect()
            reject(err)
        })
    })
}


exports.loginForUser=((email,pass)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            
              return users.findOne({email:email}).then(user=>{
                  if  (user) {                                
                        if (user.password == pass) {
                            resolve(user)
                            mongo.disconnect()
                        }else{
                            mongo.disconnect()
                            reject("Your password is not correct !")
                        }
               
                  } else {
                    mongo.disconnect()
                    reject("Your email is not found !")
                  }        
               
            }).catch((err)=>{
                mongo.disconnect()
                reject(err)
            })
        })
    })
})  


var adminModel = mongo.Schema({
    name:String ,
    job:String ,
    email:String ,
    password:String
})

var admins = mongo.model('admin',adminModel)


exports.registerAdmin=(name,job,email,password)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            return admins.findOne({email:email}).then((admin)=>{
                if(admin){
                    mongo.disconnect()
                    
                    resolve("email is already used !")
                } else {
                    return password
                   
                }
           }).then(password=> {
                  Admin = new admins({
                     name:name ,
                     job:job ,
                     email:email ,
                     password:password 
                  }) 
                  return Admin.save()
            }).then((admin)=>{
                resolve(admin._id)
                mongo.disconnect()
            })
            
        }).catch((err)=>{
            reject(err)
        })
    })
}


exports.loginForAdmin=((email,pass)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
           
              return admins.findOne({email:email}).then(admin=>{
                  if  (admin) {                  
                        if (admin.password == pass) {
                            resolve(admin._id)
                           
                            mongo.disconnect()
                        }else{
                            mongo.disconnect()
                            reject("Your password is not correct !")
                         
                        }
              
                  } else {
                    mongo.disconnect()
                    reject("Your email is not correct !")
                  }        
               
            }).catch((err)=>{
                reject(err)
            })
        })
    })
})  
 


const nodemailer = require('nodemailer')  




url="mongodb://localhost:27017/blog3"



var tempSchema = mongo.Schema({
    temperature:String ,
    pression:String ,
    he:String ,
    date:String
 
})

var temps = mongo.model("temp",tempSchema)



exports.getSomeData=()=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
           
            return temps.find({}).sort({_id:-1}).limit(8).then((data)=>{
                
                mongo.disconnect()
                resolve(data)
            }).catch((err)=>{
                mongo.disconnect()
                reject("error")
            })
      })
    })   
}

exports.getAllData=()=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
           
            return temps.find({}).then((data)=>{
                
                mongo.disconnect()
                resolve(data)
            }).catch((err)=>{
                mongo.disconnect()
                reject("error")
            })
      })
    })   
}

exports.getDataPerDay=(date)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
           
            return temps.find({date:date}).then((data)=>{
              
                mongo.disconnect()
                resolve(data)
            }).catch((err)=>{
                mongo.disconnect()
                reject("error")
            })
      })
    })   
}

exports.getTemperature=()=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
           
            return temps.findOne({}).sort({_id:-1}).limit(1).then((data)=>{
                
                mongo.disconnect()
                resolve(data)
            }).catch((err)=>{
                mongo.disconnect()
                reject("error")
            })
      })
    })   
}

exports.getPression=()=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
           
            return temps.find({}).sort({_id:-1}).limit(1).then((data)=>{
               
                mongo.disconnect()
                resolve(data)
            }).catch((err)=>{
                mongo.disconnect()
                reject("error")
            })
      })
    })   
}



exports.sendEmail=(email)=>{
  return new Promise((resolve,reject)=>{
    mongo.connect(url).then(()=>{
          
        return users.findOne({email:email}).then((data)=>{
          
          if ((data == '' ) || ( data == null )) { 
            mongo.disconnect()
            console.log("That address is either invalid !")
            reject("That address is either invalid !")
           } else {
    
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'challoufwassim40@gmail.com',
            pass: 'vzuplunwgqjswxur'
        } ,
        tls: {
            rejectUnauthorized: false
          }
        
    })
   
    var  from = "MakeSense <challoufwassim40@gmail.com>"
    var myMail =  '<h2 > Reset Your Password </h2> <p class="font-size: 15px;" > We heard that you lost your MakeSense password. Sorry about that! But don’t worry ! <br> You can use the following button to reset your password: </p> , <a href="http://localhost:4500/reset/'+data._id+'" ><button style="background-color: #4CAF50; border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;">click me</button> </a> <br><br> Thanks <br> The MakeSense Teams .' 
    var mailOptions = {
        from: from ,
        to: email ,
        subject: 'Reset Your Password',
        text: 'That was easy!' ,
        html: myMail
    }
            
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          reject('Email sent !')
          resolve(' sent !')
         
        }
      }) 
    }    
  })
})
})
}

exports.getResetPassword=()=>{
    return new Promise((resolve,reject)=>{

    })
}

exports.updatePassword=(id,password)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
        
            return users.updateOne({_id:id},{password:password}).then((data)=>{
               
                mongo.disconnect()
                resolve(data)
            }).catch((err)=>{
                mongo.disconnect()
                reject("error")
            })
      })
    })   
}
exports.getH=(he)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
           
            return temps.findOne({he:he}).then((data)=>{
                
                mongo.disconnect()
                resolve(data)
            }).catch((err)=>{
                mongo.disconnect()
                reject("error")
            })
      })
    })   
}

exports.getUsersTable=()=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
        
            return users.find().then((data)=>{
               
                mongo.disconnect()
                resolve(data)
            }).catch((err)=>{
                mongo.disconnect()
                reject("error")
            })
      })
    })   
}



var messangerModel = mongo.Schema({
    id:String ,
    name:String ,
    message:String
})

var messanger = mongo.model('chat',messangerModel)




exports.chat=(id,name,message)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
                  message = new messanger({
                    id:id ,
                    name:name ,
                    message:message
                  }) 
                  return message.save()
            }).then(()=>{
                resolve("sent !")
                mongo.disconnect()
            })
            
        }).catch((err)=>{
            mongo.disconnect()
            reject(err)
        })
 
}

exports.findChat=()=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
        
            return messanger.find().then((data)=>{
               
                mongo.disconnect()
                resolve(data)
            }).catch((err)=>{
                mongo.disconnect()
                reject("error")
            })
      })
    })   
}

exports.updateUser=(_id,firstName,lastName,country,phoneNumber,language,company,image)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
            
            return users.updateOne({_id:_id},{firstName:firstName,lastName:lastName,country:country,phoneNumber:phoneNumber,language:language,company:company,image:image}).then((data)=>{
               
                mongo.disconnect()
                resolve(data)
            }).catch((err)=>{
                mongo.disconnect()
                reject("error")
            })
      })
    })   
}

exports.getUser=(id)=>{
    return new Promise((resolve,reject)=>{
        mongo.connect(url).then(()=>{
           
            return users.findOne({_id:id}).then((data)=>{
                
                mongo.disconnect()
                resolve(data)
            }).catch((err)=>{
                mongo.disconnect()
                reject("error")
            })
      })
    })   
}



exports.sendEmailToMe=(email,password)=>{
   
    const path = require("path")
    const ejs = require("ejs")

      var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: 'challoufwassim40@gmail.com',
              pass: 'vzuplunwgqjswxur'
          } ,
          tls: {
              rejectUnauthorized: false
            }
          
      })

     
    var templatePath = path.join(__dirname , "../views/mail.ejs")

    var  from = "MakeSense <challoufwassim40@gmail.com>"

ejs.renderFile(templatePath , { email : email , password : password}, function (err, data) { 

      var mailOptions = {
          from: from ,
          to: email ,
          subject: 'Welcome to Your New account',
          text: 'welcome' ,
          html: data
        
      }
              
      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            reject('Email sent !')
            resolve(' sent !')
            console.log("email sent !")
           
          }
        }) 
    }) 
 } 
    
