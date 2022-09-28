const express = require("express");
const bodyParser = require("body-parser");
const User = require('../models/user')

const router = new express.Router();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.use(urlEncodedParser);

router.post("/api/users", (req, res) => {
    console.log(req.body);
  });


module.exports = router
