import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

//Including Routes
import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'

//Express Initialization
const app = express();

//Get ENV Variables
dotenv.config();

//Body Parser Initialization
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));

//Cors
app.use(cors());
//Mongo DB databas
// const CONNECTION_URL = "mongodb+srv://username:password@socialmediacluster.zhd3h31.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;


//Mongo db connection
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`)))
  .catch((error) => console.log(error.message));
//   mongoose.set('useFindAndModify', false);



//Post routes
app.use('/posts', postRoutes);
app.use('/user', authRoutes);


