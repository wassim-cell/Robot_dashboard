



exports.isFirstAdmin=(req,res,next)=>{
        if(req.session.adminId) {     
        next()
        }else {
            res.redirect("/adminLogin")
        }
}

exports.isAdmin=(req,res,next)=>{
        if(req.session.adminId) {     
        next()
        }else {
            res.redirect("/adminLogin")
        }
}