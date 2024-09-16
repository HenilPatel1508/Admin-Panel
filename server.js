const express = require('express')
const app = express()
const PORT =process.env.PORT || 5000;
require('dotenv').config()

const pageRouter = require('./routes/pageRoutes');
const userRoute = require('./routes/userRoutes')
const { default: mongoose } = require('mongoose');

//db connect
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("database connected");
})
.catch(()=>{
    console.log("db not connect");
})

app.set('view engine','ejs')
app.use(express.static('views'))
app.use(express.static('public'))


app.use(express.json()) // body -> row
app.use(express.urlencoded({ extended: true })) // body-> form.urlencoded


app.use('/',pageRouter)
app.use('/api/user',userRoute)

app.listen(PORT, () => console.log(`listen port number ${PORT}`));

