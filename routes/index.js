var express = require('express');
var router = express.Router();

var HomeController = require("../app/controllers/home_controller");


router.get("/",HomeController.index);


module.exports = router;
