const adminModel=require('../models/admin.model')

exports.getUserRegisterController=(req,res,next)=>{
    res.render('userRegister',{message:req.flash('error')[0]})
}
 
exports.userRegisterController=(req,res,next)=>{
    adminModel.registerUser(req.body.firstName,req.body.lastName,req.body.email,req.body.password).then((id)=>{
    
            adminModel.sendEmailToMe(req.body.email,req.body.password).then(()=>{
                
                res.redirect('/userRegister') 
            }).catch((err)=>{
                console.log(err)
            })
       
    }).catch((err)=>{
        
        req.flash('error',err)
        res.redirect('/userRegister')
    })
}

exports.getUserLoginController=(req,res,next)=>{
    res.render('userLogin',{message:req.flash('error')[0]})
}


exports.userLoginRegister=(req,res,next)=>{
    adminModel.loginForUser(req.body.email,req.body.password).then((user)=>{
        req.session.userId = user._id
        
        res.redirect('/dash')
    }).catch((err)=>{
       console.log(err)
        req.flash('error',err)
        
        res.redirect('/userLogin')
    })
    
  
}


exports.adminRegisterController=(req,res,next)=>{
    adminModel.registerAdmin(req.body.name,req.body.job,req.body.email,req.body.password).then((id)=>{
        res.redirect('/adminLogin')
    }).catch((err)=>{
        
    })
}

exports.loginAdminController=(req,res,next)=>{
    adminModel.loginForAdmin(req.body.email,req.body.password).then((id)=>{
        console.log(id)
        req.session.adminId = id
       res.render('dashboardAdmin',{verifAdmin:req.session.adminId})
    }).catch((err)=>{
        console.log(err)
        res.redirect('/adminLogin')
    })
}

exports.getAdminRegisterController=(req,res,next)=>{
    res.render('adminRegister')
}

exports.getAdminLoginController=(req,res,next)=>{
   res.render('adminLogin')
}



exports.getAdminLoginController=(req,res,next)=>{
    res.render('adminLogin')
}

exports.logoutController=(req,res,next)=>{
    req.session.adminId = null 
    res.render('adminLogin')
}

exports.getAdminPage=(req,res,next)=>{
    res.render('dashboardAdmin')
}


exports.chatController=(req,res,next)=>{

    adminModel.chat(req.session.userId,req.session.name,req.body.message).then((id)=>{
        
       res.redirect('/chat/'+req.body.userId+'/'+req.body.userName)
    }).catch((err)=>{
        console.log(err)
        res.redirect('/chat')
    })
}

exports.findChatController=(req,res,next)=>{

    adminModel.findChat().then((data)=>{
  
       res.render('chat',{data:data})
    }).catch((err)=>{
        console.log(err)
        res.redirect('/chat')
    })
}


