import express from 'express'
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import db from './config/database.config'
import cors from "cors"


import userRouter from './routes/user';


db.sync().then(()=>{
  console.log('Database connected succcesfully')
}).catch(err=>{
  console.log(err)
})

const app = express();



// view engine setup
app.set('views', path.join(__dirname, "..",'views'));
app.set('view engine', 'ejs');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', userRouter);



app.listen(3000, ()=>{ console.log("server connected on port 3000")})

export default app;
