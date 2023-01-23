const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const multer=require("multer");
const path = require("path");
const cors=require("cors");

dotenv.config();
const PORT=process.env.PORT||3001
//connection with mongoDB Atlas

const connectDB=async()=>{
    try {
    await  mongoose.connect(
        process.env.MONGO_URL,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => {
          console.log("Connected to MongoDB");
        }
      )
    } catch (error) {
      console.log(error);
    }
}


//middleware
app.use("/images",express.static(path.join(__dirname,"public/images")))
app.use(express.json());
app.use(cors())
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);

//serving frontend to backend
if (process.env.NODE_ENV === 'production') {
  //*Set static folder
  app.use(express.static('frontend/build'));
  
  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build','index.html')));
}

//uploading an image
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"public/images");
  },
  filename:(req,file,cb)=>{
    cb(null,req.body.name);
  }
})
const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
  try {
    return res.status(200).json("file uploaded")
  } catch (error) {
    console.log(error)
  }
})
connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log("Backend server is running!"+PORT);
  });
})


