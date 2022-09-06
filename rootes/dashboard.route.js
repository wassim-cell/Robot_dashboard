const DashController = require("../controllers/dashboard.controller")
const route = require('express').Router()
const body = require('express').urlencoded()
const gardAuth = require('../rootes/gardauth')
const gardAdmin = require('../rootes/gardAdmin')
const multer=require("multer")


route.all('/dash',gardAuth.isAuth,body,DashController.someDataController)

route.get('/settings',gardAuth.isAuth,DashController.getSettings)
route.post('/settings',multer({
    storage : multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'assets/uploads')
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '-' +file.originalname )
        }
      })
}).single('image'),DashController.postSettings)



route.get('/map',gardAuth.isAuth,DashController.getMap)
route.get('/photos',gardAuth.isAuth,DashController.getPhotos)
route.get('/logout',DashController.logoutFunction)

route.get('/pass',DashController.passForget)
route.post('/pass',body,DashController.sendEmailController)

route.get('/reset/:id',DashController.getResetPasswordController)
route.post('/reset/pass/:id',body,DashController.updatePasswordController)

route.get('/usersTable',gardAdmin.isAdmin,DashController.getUsersTableController)


module.exports=route