const router = require("express").Router();
const Controller = require("./controller");
const { uploadImages, resizeImages } = require("../util/file-upload");
router.route("/").post(uploadImages, resizeImages, Controller.addNew);
router.route("/").get(Controller.getAll);
router.route("/:id").get(Controller.getOne);
router.route("/:id").put(Controller.updateOne);
router.route("/:id").delete(Controller.deleteOne);

module.exports = router;
