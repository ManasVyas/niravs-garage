const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

require("./config/passport");
app.use(passport.initialize());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});
mongoose.set("returnOriginal", false);

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
