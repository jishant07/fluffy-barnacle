authController = {}
var authModel = require("../models/authModel")
var globalModel = require("../models/globalModel")


authController.login = (req,res) => {
    var {email, password} = req.body
    if(email && password){
        authModel.login(email, password).then(user =>{
            req.session.email = user.email
            req.session.OTP = user.OTP
            req.session.userId = user._id
            console.log(req.session)
            delete user.password
            res.json(globalModel.success(user))
        }).catch(err =>{
            console.log(err)
            res.json(globalModel.failure(err))
        })
    }else{
        res.json(globalModel.failure("Incomplete Request"))
    }
}

authController.signup = (req,res) =>{
    if(req.body.email && req.body.password){
        authModel.signup(req.body).then(createdUser =>{
            res.json(globalModel.success("User created successfully."))
        }).catch(err =>{
            res.json(globalModel.failure(err))
        })
    }else{
        res.json(globalModel.failure("Incomplete Request"))
    }
}

authController.verifyOTP = (req,res) =>{
    if(req.body.OTP){
        if(req.session.email){
            authModel.verifyOTP(req,req.body.OTP).then(verification =>{
                res.json(globalModel.success(verification))
            }).catch(err =>{
                delete req.session.OTP
                console.log(err)
                res.json(globalModel.failure(err))
            })
        }else{
            res.json(globalModel.failure("Trigger Login API successfully first"))
        }
    }else{
        res.json(globalModel.failure("Incomplete Request"))
    }
}

authController.logout = (req,res) =>{
    delete req.session.isAuth
    req.session.destroy((err) =>{
        if(err){
            res.json(globalModel.failure(err))
        }else{
            res.json(globalModel.success("Logout Successfull"))
        }
    });
}

module.exports = authController