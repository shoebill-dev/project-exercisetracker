const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path')
const userRouter = require('../src/routers/users')

app.use(cors());
app.use(express.static("public"));
app.use(userRouter)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
