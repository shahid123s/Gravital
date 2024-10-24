const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const connectMongo = require ('./Config/mongo');
const userRoute = require('./Routes/userRoutes')

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin : 'http://localhost:3000',
    credentials: true,               // Allow credentials (cookies, authorization headers, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],
}))


app.use('/user/api', userRoute)

const port = process.env.PORT 

app.listen(port, async() => {
    await connectMongo();
    console.log(`server lisitng on ${port}`)
})