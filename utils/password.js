const bcrypt = require('bcrypt')
exports.hashpass = async(password)=>{
    const hashpassword = await bcrypt.hash(password,10)
    return hashpassword
}

exports.comparePass = async(hashpass,password)=>{
    return await bcrypt.compare(password,hashpass)
}