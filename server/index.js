require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json()); // to use req.body

const connectToMongoDB = require("./src/database/config.js");

connectToMongoDB();


// routes
app.use("/api/user/", require("./src/api/user.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});

