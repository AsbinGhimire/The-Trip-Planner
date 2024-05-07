const { renderHomePage } = require("../controller/homeController")

const router = require("express").Router()

router.route("/").get(renderHomePage)


module.exports = router