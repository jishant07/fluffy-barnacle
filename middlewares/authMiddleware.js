const authMiddleware = (req, res, next) =>{
    if(req.session && req.session.isAuth && req.session.email){
        next();
    }else{
        res.json({
            status : "failure",
            message : "Un-authorised or Session Timed Out"
        })
    }
}

module.exports = authMiddleware