require('dotenv').config();

const express=require('express');
const mongoose=require('mongoose');

const app=express();
const workoutRoutes=require('./routes/workouts');


const userRoutes=require('./routes/user');


app.use(express.json());
//Middleware fonksiyonları, uygulamanın istek-yanıt döngüsündeki istek objesi (req), 
//yanıt objesi (res), ve bir sonraki ara yazılım fonksiyonuna erişebilen fonksiyonlardır.
app.use((req,res,next)=>{
    next();
})
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`on port n connected to db port: ${process.env.PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    })


