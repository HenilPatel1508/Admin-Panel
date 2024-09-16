const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'henilpatel1508@gmail.com',
        pass:'ukjl zmpc gvlp icjr'
    }
})

function sendMailer(to,subject,html){
    const options = {
        from:'henilpatel1508@gmail.com',
        to:to,
        subject:subject,
        html:html
    }
    transporter.sendMail(options,(err,info)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("send mail");
        }
    })

}

module.exports=sendMailer

