const { addHotelReview } = require("../controller/admin/hotelController")
const { renderRegisterUser, registerUser, renderLoginUser, loginUser, forgotPassword, renderForgotPassword, renderVerifyOtp, verifyOtp, renderResetPassword, resetPassword, logout, renderHotels, getSingleHotel, bookHotel, getMyBooks, deleteBooking } = require("../controller/userController")
const { isAuthenticated } = require("../middleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")

const router = require("express").Router()

router.route("/register").get(renderRegisterUser).post(catchAsync(registerUser))
router.route("/login").get(renderLoginUser).post(catchAsync(loginUser))
router.route("/forgotPassword").get(renderForgotPassword).post(catchAsync(forgotPassword))
router.route("/verifyOtp").get(renderVerifyOtp).post(catchAsync(verifyOtp))
router.route("/resetPassword").get(renderResetPassword)
router.route("/resetPassword/:otp").post(catchAsync(resetPassword))
router.route("/logout").get(logout)
router.route("/hotels").get(catchAsync(renderHotels))
router.route("/hotel/:id/review").post( isAuthenticated, catchAsync(addHotelReview))
router.route("/hotel/:id").get(catchAsync(getSingleHotel))

router.route('/hotelbook/:id').post(isAuthenticated, catchAsync(bookHotel))
router.route("/bookings").get(isAuthenticated,catchAsync(getMyBooks))
router.route("/deletebooking/:id").get(isAuthenticated,catchAsync(deleteBooking))


module.exports = router