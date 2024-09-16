const sendMailer = require('../config/mailer');
const User = require('../model/userModel');
const { sendOtpUi } = require('../utils/htmlFormat');
const { hashpass, comparePass } = require('../utils/password');

exports.store = async (req, res) => {
    try {
        const { username, email, password, mobile } = req.body;

        console.log(req.body);
        const newHashpass = await hashpass(password)
        const user = await User.create({
            username, email, password: newHashpass, mobile
        })
        if (user) {
            res.redirect('/signin')
        } else {
            res.json({ error: true, message: "something wrong" })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const user = await User.findOne({ email: email });
        if (!user) {
            res.json({ message: "User not Found" })
        }

        const match = await comparePass(user.password, password);
        if (!match) {
            res.json({ message: "Password not match" })
        }

        const userList = {
            name: user.username,
            email: user.email
        }

        res.cookie('user', userList, { httpOnly: true })
        res.redirect('/')

    } catch (err) {
        console.log(err);
    }
}

exports.sendotp = async (req, res) => {
    console.log("check................")
    console.log(req.body)
    try {
        const { email } = req.body;
        console.log(email);
        const user = await User.findOne({ email: email })
        const otp = Math.floor(Math.random() * 10000)
        console.log(otp);
        if (user) {
            const update = await User.findByIdAndUpdate(
                {
                    _id: user._id
                },
                {
                    otp: otp
                }
            )
            if (update) {
                sendMailer(email, 'Your otp for change password', sendOtpUi(user.username, otp))
                res.redirect('/sendmail')
                // res.json("check your mail")
            }

        } else {
            res.json("user not found")
        }
    } catch (error) {
        console.log(error);
    }
}

exports.changepassword = async (req, res) => {
    try {
        const { email, otp, newPassword, confirmpass } = req.body;
        const exitUser = await User.findOne({ email: email })
        if (!exitUser) {
            res.json("User Not Found")
        }
        if (exitUser.otp !== otp) {
            res.json("otp not match")
        }
        if (newPassword !== confirmpass) {
            res.json("confirm pass not match")
        }
        const hashpass2 = await hashpass(newPassword)
        const updateUser = await User.findByIdAndUpdate(
            { _id: exitUser._id },
            {
                password: hashpass2,
                otp: ""
            }
        )
        if (updateUser) {
            // res.json("your pass is update")
            res.redirect('/signin')
        }
    } catch (error) {
        console.log(error);
    }
}

exports.show = async (req, res) => {
    const user = await User.find({}, { password: 0, otp: 0, __v: 0 })
    if (user) {
        res.json({ user })
    } else {
        res.json("No Record")
    }
}

// use params

exports.singleuser = async (req, res) => {
    const { id } = req.params
    // const existUser = await User.findById({_id:id})
    const existUser = await User.findById(id, { password: 0, otp: 0, __v: 0 })
    if (existUser) {
        res.json(existUser)
    } else {
        res.json("user Not Found")
    }
}

// use query

exports.queryUser = async (req, res) => {
    try {
        const { id } = req.query;
        console.log(id);
        const existUser = await User.findById(id, { password: 0, otp: 0, __v: 0 })
        if (existUser) {
            res.json(existUser)
        } else {
            res.json("user Not Found")
        }

    } catch (error) {
        console.log(error);
    }
}

// single data using other fields
exports.singleUserByEmail = async (req, res) => {
    const { email } = req.params;
    const existUser = await User.findOne({ email: email }, { password: 0, otp: 0, __v: 0 })
    if (existUser) {
        res.json(existUser)
    } else {
        res.json("user Not Found")
    }
}

 //Delete data using other fields

 exports.deletUserByEmail = async (req, res) => {
    const { email } = req.params;
    const existUser = await User.deleteOne({ email: email })
    if (existUser) {
        res.json("deleted")
    } else {
        res.json("user Not Found")
    }
}