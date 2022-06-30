authModel = {}
const md5 = require("md5")
const User = require("../schemas/userSchema")
const globalModel = require("../models/globalModel")

authModel.login = (email, password) =>{
    return new Promise((resolve,reject) =>{
        User.findOne({
            email, password : md5(password)
        }).then(user =>{
            if(user){
                resolve({
                    ...user['_doc'],
                    OTP : globalModel.OTPGen()
                })
            }else{
                reject("No User Found")
            }
        }).catch(err =>{
            reject(err)
        })
    })
}

authModel.signup = (body) =>{
    return new Promise((resolve, reject) =>{
        User.findOne(
            {email : body.email}
        ).then(user =>{
            if(!user){
                User.create({
                    email : body.email,
                    password : md5(body.password)
                }).then(createdUser =>{
                    resolve(createdUser)
                })
            }else{
                reject("User with Same Email Already Exists")
            }
        }).catch(err =>{
            reject(err)
        })
    })
}

authModel.verifyOTP = (req,otp) =>{
    return new Promise((resolve, reject) =>{
        if(req.session.OTP && req.session.OTP == otp){
            req.session.isAuth = true
            delete req.session.OTP
            resolve(true)
        }else{
            reject(false)
        }
    })
}

module.exports = authModel