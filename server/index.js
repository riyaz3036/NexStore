const express= require('express');
const dotenv= require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose= require('mongoose');
const cors= require('cors');
const path = require('path');
const categoryRoute = require('./routes/category');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/user.js');
const orderRoute = require('./routes/order.js');
const cartRoute = require('./routes/cart.js');
const favoraitesRoute = require('./routes/favoraites.js');
const productRoute = require('./routes/product.js');
const variantRoute = require('./routes/variant.js');


dotenv.config();

const app= express();
const port =  8000;

const corsOptions={
    origin: true,
    methods: ["POST", "GET" ,"PUT", "DELETE"],
    credentials: true
}

//Database connection 
const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('connected to Mongodb');


    }catch(err){
        console.log('Mongodb connection failed',err.message);
    }
}


//Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());


// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/category', categoryRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/order', orderRoute);
app.use('/cart', cartRoute);
app.use('/favoraites', favoraitesRoute);
app.use('/product', productRoute);
app.use('/variant', variantRoute);

app.listen(port,()=>{
    connect();  
    console.log('server listening on port',port);
})