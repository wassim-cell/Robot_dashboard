const { render } = require('ejs')
const dashModel = require('../models/admin.model')





exports.someDataController=(req,res,next)=>{
    dashModel.getSomeData().then(data=>{
        dashModel.getAllData().then(allData=>{
            dashModel.getDataPerDay(req.body.date).then(dataPerDay=>{ 
                dashModel.getTemperature().then(temp=>{
                    dashModel.getH(req.body.heigth).then(heigth=>{
                        dashModel.getUser(req.session.userId).then((dataUser)=>{
                          
                        res.render("dashboard1",{heigth:heigth,dataUser:dataUser,data:data,allData:allData,dataPerDay:dataPerDay,verifAdmin:req.session.adminId,temp:temp})

                   
                    
                    })      
                })
            }) 
                   
               
                
              
            })
       
             
                        
        }) 
       
    })
}

exports.logoutFunction=(req,res,next)=>{
    req.session.userId = null 
        res.redirect('/userLogin')


}

exports.getSettings=(req,res,next)=>{
    dashModel.getUser(req.session.userId).then((dataUser)=>{
      
        res.render('settings',{dataUser:dataUser})
    })

}
exports.getMap=(req,res,next)=>{
    dashModel.getUser(req.session.userId).then((dataUser)=>{
      
        res.render('map',{dataUser:dataUser})
    })

}
exports.getPhotos=(req,res,next)=>{
    dashModel.getUser(req.session.userId).then((dataUser)=>{
      
        res.render('photos',{dataUser:dataUser})
    })

}

exports.getPageNotFoundController=(req,res,next)=>{
    dashModel.getUser(req.session.userId).then((dataUser)=>{
       
        res.render('pageNotFound',{dataUser:dataUser})
    })

}

exports.postSettings=(req,res,next)=>{

    if (req.file) {
        dashModel.updateUser(req.session.userId,req.body.firstName,req.body.lastName,req.body.country,req.body.phoneNumber,req.body.language,req.body.company,req.file.filename).then((data)=>{
            res.redirect("/settings")  
            
        }).catch((err)=>{
            console.log(err)
            
        })
      } else {
        dashModel.updateUser(req.session.userId,req.body.firstName,req.body.lastName,req.body.country,req.body.phoneNumber,req.body.language,req.body.company,req.body.oldImage).then((data)=>{
            res.redirect("/settings")  
            
        }).catch((err)=>{
            console.log(err)
            
        })
      }
}





exports.passForget=(req,res,next)=>{
        message = req.flash('errors')
        if (message) {
            msg = "true" 
        }
        res.render('passwordForget',{message:message,msg:msg})


}

exports.sendEmailController=(req,res,next)=>{
        
    dashModel.sendEmail(req.body.email).then(()=>{
        res.redirect("/pass")   
    }).catch((err)=>{
        req.flash('errors',err)
        res.redirect('/pass')
        
    })
}

exports.getResetPasswordController=(req,res,next)=>{
        id = req.params.id 
        res.render("resetPassword",{id:id})   
  
}

exports.updatePasswordController=(req,res,next)=>{
    id = req.params.id 
    dashModel.updatePassword(id,req.body.password).then(()=>{
        res.redirect("/userLogin")   
    })
}

exports.getUsersTableController=(req,res,next)=>{
    dashModel.getUsersTable().then(data=>{
        console.log(data)
        res.render('usersTable',{data:data})
    })

}


