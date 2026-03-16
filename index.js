const express = require('express');
const app = express();
require('dotenv').config();
const cors=require('cors')
const port = process.env.PORT || 5000;
let isConnected=false;
async function connectToMonngoDB(){
  try{ 
    await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser:true,
      useUnifiedTopology:true
    }); 
    isConnected=true;
    console.log('Connected to MongoDB');
  } catch(error){
    console.error('Error connecting to MongoDB:',error);
  }
}
// Middleware
app.use(cors())
app.use(express.json());
app.use((req,res,next)=>{
    if(!isConnected){
      connectToMongoDB();
    }
    next();
})

// Connect to DB
const connectDB = require('./config/db');
connectDB();

// Routes
app.use("/uploads", express.static("uploads"));

app.use('/api/products', require('./routes/product.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use("/api/orders", require('./routes/order.routes'));
// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
  
});
app.get("/favicon.ico", (req, res) => res.status(204));
// Start server
// app.listen(port, () => {
  //console.log(`Server running on port ${port}`);
//});
module.exports=app
