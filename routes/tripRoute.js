const { addCampground } = require("../controller/camgroundController")
const { addTrip, handleAddTrip, handleSingleTrip, deleteTrip, addReview } = require("../controller/tripController")
const { isAuthenticated } = require("../middleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()
const {multer,storage} = require("./../middleware/multerConfig")
const upload = multer({storage : storage})

router.route("/addtrip").get(addTrip).post(upload.array('images'),isAuthenticated, catchAsync(handleAddTrip))
router.route("/trip/:id/review").post(isAuthenticated,catchAsync(addReview))
router.route("/trip/:id").get(handleSingleTrip)
router.route("/tripdelete/:id").get(catchAsync(deleteTrip))



module.exports = router