const DbConnect = require("./config/dbconnect");
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const router = require("./routes/userrouter");
const cartrouter = require("./routes/cartrouter");

app.use("/user", router);
app.use("/cart",cartrouter)

app.listen(PORT, () => {
  console.log(`start listning onport->${PORT}....`);
  DbConnect();
});