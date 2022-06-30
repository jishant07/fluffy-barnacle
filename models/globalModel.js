globalModel = {}

globalModel.OTPGen = () =>{
    var corpus = "0123456789"
    var OTP = ""
    for(var i = 0; i < 6 ; i++){
        OTP += corpus[Math.floor(Math.random() * corpus.length)];
    }
    return OTP
}

globalModel.success = (data) =>{
    return {
        status : "success",
        message : data
    }
}

globalModel.failure = (data) =>{
    return {
        status : "failure",
        message : data
    }
}

module.exports = globalModel