const express = require('express');
const cors = require('cors')
require('dotenv').config();

const app = express();

var corOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corOptions));
const studentRoute = require('./routes/studentRoutes')
const courseRoute = require('./routes/courseRoutes')
const authRoute = require('./routes/authRoute')

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/Student', studentRoute);
app.use('/Course', courseRoute);
app.use('/auth', authRoute);

const PORT = process.env.PORT || 5000







app.use((err, req, res, next)=>{
     res.status(err.status || 500)
     res.send({
         error:{
            status: err.status || 500,
            message: err.message
         }
     })

})

app.listen(PORT, ()=>{
     console.log(`Server is running on port : ${PORT}`);
})