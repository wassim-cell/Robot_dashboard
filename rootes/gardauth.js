


exports.isAuth=(req,res,next)=>{
    if(req.session.userId){
        next()
    }else {
        res.redirect('/userLogin')
     }
}

exports.verifAuth=(req,res,next)=>{
    if(req.session.userId){
        res.redirect('/dash')
    }else {
       next()
    }
}

exports.verifDash=(req,res,next)=>{
    if (req.session.userId == req.params.id){
       next()
    } else {
        res.redirect('/')
    }
}
