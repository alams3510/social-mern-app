const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const multer=require("multer");
const path = require("path");

dotenv.config();
//connection with mongoDB Atlas
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

//middleware
app.use("/images",express.static(path.join(__dirname,"public/images")))
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);

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


app.listen(3001, () => {
  console.log("Backend server is running!");
});
