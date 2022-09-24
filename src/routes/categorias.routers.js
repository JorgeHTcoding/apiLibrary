const {Router} = require ("express")
const router = Router();
const categoriasCtrl = require("../controller/categorias.controller")



router.get("/categoria",categoriasCtrl.getCategoria)

router.post("/categoria",categoriasCtrl.postCategoria)

router.put("/categoria",categoriasCtrl.putCategoria)

router.delete("/categoria",categoriasCtrl.deleteCategoria)


module.exports = router;