const express =require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
const dbConnect = require('./config/db/dbConnect');
const userRoutes = require('./route/users/usersRoute');
const { errorHandler, notFound } = require('./middlewares/error/errorHandler');
const postRoute = require('./route/posts/postRoute');
const app =express();
const commentRoute = require('./route/comments/commentRoute');
const emailMsgRoute = require('./route/emailMsg/emailMsgRoute');
const categoryRoute = require('./route/category/categoryRoute');

//port
const PORT=process.env.PORT || 4000;
app.listen(PORT,console.log(`server is running on port  ${PORT}`));
//cors
app.use(cors())
//middleware
app.use(express.json())

//users route
app.use('/api/users',userRoutes)

//post route
app.use("/api/posts",postRoute);

//comment route
app.use("/api/comments",commentRoute);

//send email route
app.use("/api/email", emailMsgRoute);

//category route
app.use("/api/category",categoryRoute)

//error handler
app.use(notFound)
app.use(errorHandler)


