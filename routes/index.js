var express = require('express');
var router = express.Router();

var HomeController = require("../app/controllers/home_controller");
var AcoesUsuariosController = require("../app/controllers/acoes_usuarios_controller")


router.get("/",HomeController.index);
router.get("/acoes-usuarios.json",AcoesUsuariosController.index)
router.post("/acoes-usuarios.json",AcoesUsuariosController.create)


module.exports = router;
