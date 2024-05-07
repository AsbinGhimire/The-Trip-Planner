const { renderProfile, editProfileAvatar } = require("../controller/profileController")
const { isAuthenticated } = require("../middleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")
const {multer,storage} = require("./../middleware/multerConfig")
const upload = multer({storage : storage})

const router = require("express").Router()

router.route("/profile").get(isAuthenticated, catchAsync(renderProfile))
router.route("/editProfile").post(isAuthenticated, upload.single('image'),catchAsync(editProfileAvatar))


module.exports = router