const {Router} = require ("express")
const router = Router();
const librosCtrl = require("../controller/libros.controller")



router.get("/libro",librosCtrl.getLibro)

router.post("/libro",librosCtrl.postLibro)

router.put("/libro",librosCtrl.putLibro)

router.delete("/libro",librosCtrl.deleteLibro)


module.exports = router;