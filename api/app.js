const express = require("express");
const cors = require("cors"); // middleware to perform fetch
const bcrypt = require("bcrypt"); // to encrypt password before sending it in db
const jwt = require("jsonwebtoken"); //jsonwebtoken share data among frontend and backend by converting data into token
const cookies = require("cookie-parser");
const multer = require("multer"); // to parse multiform data especially images
const fs = require("fs");
const uploadMiddleWare = multer({ dest: "uploads/" });

const { default: mongoose } = require("mongoose"); // mongodb connection
const User = require("./model/user"); //user model import
const Post = require("./model/post"); //post model import
const app = express(); //express app
const PORT = 4000;
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json()); //middleware to post data act as a json parser
var salt = bcrypt.genSaltSync(10); // salt gen to encrypt password
const privateKey = "u78453herjuherr873294945hweurh23r";
app.use(cookies());
app.use("/uploads", express.static(__dirname + "/uploads"));
// mongodb connection
mongoose.connect(
  "mongodb+srv://shiwi:shiwi@cluster0.vzbycir.mongodb.net/?retryWrites=true&w=majority"
);

//register and send encrypted data to db
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

// login by matching user data with decrypted db password and username
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      jwt.sign(
        { username, id: userDoc._id },
        privateKey,
        {},
        function (err, token) {
          if (err) throw err;
          else
            res.cookie("token", token).json({
              id: userDoc._id,
              username,
            });
        }
      );
    } else {
      res.status(400).json("Oops,Wrong Credentials");
    }
  } catch (e) {
    res.status(500).json("Something Went Wrong");
  }
});

//check if a user is loggedin

app.get("/profile", (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, privateKey, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
  res.json(req.cookies);
});

//logout
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

//to post createpost-data into the server/database

app.post("/post", uploadMiddleWare.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const format = parts[parts.length - 1];
  const newPath = path + "." + format;
  fs.renameSync(path, newPath);

  const { title, summary, content, file } = req.body;

  const token = req.cookies.token;
  jwt.verify(token, privateKey, {}, async (err, info) => {
    if (err) throw err;
    try {
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json(postDoc);
    } catch (e) {
      res.status(400).json(e);
    }
  });
});

// to fetch post from db and display it on frontend(post list)

app.get("/post", async (req, res) => {
  const postDoc = await Post.find()
    .populate("author", "username")
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(postDoc);
});

// to display particular post

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;

  const postDoc = await Post.findById(id).populate("author", "username");
  res.json(postDoc);
});

// to edit particular post

app.put("/post", uploadMiddleWare.single("file"), async (req, res) => {
  var newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const format = parts[parts.length - 1];
    newPath = path + "." + format;
    fs.renameSync(path, newPath);
  }
  const { id, title, summary, content } = req.body;

  const { token } = req.cookies;

  jwt.verify(token, privateKey, {}, async (err, info) => {
    if (err) throw err;
    try {
      const oldpost = await Post.findById(id);

      const isauthor =
        JSON.stringify(oldpost.author) === JSON.stringify(info.id);

      if (!isauthor) {
        return res.status(400).json("you are not the author");
      }

      oldpost.title = title;
      oldpost.summary = summary;
      oldpost.content = content;
      oldpost.cover = newPath ? newPath : oldpost.cover; // Keep oldpost.cover if newPath is not available

      await oldpost.save();

      res.json(oldpost);
    } catch (e) {
      res.status(400).json(e);
    }
  });
});

//app started on given port
app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
