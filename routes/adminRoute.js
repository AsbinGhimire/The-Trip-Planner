const { renderAdminDashboard } = require("../controller/admin/adminController")
const { renderAddHotel, addHotel } = require("../controller/admin/hotelController")
const { isAuthenticated } = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")
const catchAsync = require("../services/catchAsync")
const {multer,storage} = require("./../middleware/multerConfig")
const upload = multer({storage : storage})

const router = require("express").Router()


router.route("/admin").get(isAuthenticated, catchAsync(restrictTo('admin')), renderAdminDashboard)
router.route("/admin/hotel").get(isAuthenticated,restrictTo('admin'), renderAddHotel).post(isAuthenticated,restrictTo('admin'), upload.array('images') ,catchAsync(addHotel))

module.exports = router 