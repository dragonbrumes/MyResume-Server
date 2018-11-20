var express = require("express");
var router = express.Router();

// Import experiences controller
var experiencesController = require("../controllers/experiencesController");

/* GET experiences listing. */
router
  .route("/experiences")
  .get(experiencesController.index)
  .post(experiencesController.new);

router
  .route("/experiences/:id")
  .put(experiencesController.update)
  .delete(experiencesController.delete);

module.exports = router;
