const route=require("express").Router()
const adminController=require("../controllers/admin.controller")
const body=require("express").urlencoded({extended:true})
const gardAuth = require('../rootes/gardauth')
const gardAdmin = require('../rootes/gardAdmin')


route.get('/userRegister',gardAdmin.isAdmin,adminController.getUserRegisterController)
route.post('/userRegister',body,adminController.userRegisterController)

route.get('/userLogin',gardAuth.verifAuth,adminController.getUserLoginController)
route.post('/userLogin',body,adminController.userLoginRegister)


route.get('/adminRegister',gardAdmin.isAdmin,adminController.getAdminRegisterController)
route.post('/adminRegister',body,adminController.adminRegisterController)

route.get('/adminLogin',adminController.getAdminLoginController)
route.post('/adminLogin',body,adminController.loginAdminController)

route.get('/dashboardAdmin',gardAdmin.isAdmin,adminController.getAdminPage)

route.post('/chatRegister',body,adminController.chatController)
route.get('/chat/:name/:id',adminController.findChatController)



route.get('/adminLogout',adminController.logoutController)


module.exports=route