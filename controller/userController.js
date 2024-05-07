const { users, hotels, hotelImages, hotelReviews, hotelBooks } = require("../model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../services/sendEmail")
exports.renderRegisterUser = (req,res)=>{
    res.render("registerUser")
}

exports.registerUser = async(req,res)=>{
    const {username,email,password} = req.body 
    await users.create({
        username,
        email,
        password : bcrypt.hashSync(password,8)
    })
    res.redirect("/login")
}
exports.loginUser = async(req,res)=>{
    const {email,password}= req.body
    // SERVER SIDE VALIDATION 
    if(!email || !password){
        return res.send("Email and password are required")
    }

//    findByPk -> {} ,findAll -> [{}]
    // check if that email exists or not
   const associatedDataWithEmail =  await users.findAll({
       where : {
        email
       }
    })
    if(associatedDataWithEmail.length == 0){
         req.flash("error","User with that email doesn't exists")
         res.redirect('/login')
         return
    }else{
          // check if password also matches
    const associatedEmailPassword = associatedDataWithEmail[0].password
    console.log(associatedDataWithEmail)
       const isMatched =  bcrypt.compareSync(password,associatedEmailPassword) // true or false return
       if(isMatched){
        // GENERATE TOKEN HERE 

        const token = jwt.sign({id:associatedDataWithEmail[0].id,role : associatedDataWithEmail[0].role},process.env.SECRET_KEY,{
            expiresIn : '30d'
        })

       
        res.cookie('token',token) // browser ma application tab vitra cookie vanney ma save hunchha

        if(associatedDataWithEmail[0].role === 'admin'){
            res.redirect('/profile')
            return;
        }
        res.redirect("/")
       }else{
        req.flash("error", "Invalid Email or Password")
        res.redirect("/login")
       }

    }
}
exports.renderLoginUser = (req,res)=>{
    const [message]= req.flash('error')
    res.render("loginUser",{message})
}
exports.renderForgotPassword = (req,res)=>{
    res.render("forgotPassword")
}

exports.forgotPassword = async(req,res)=>{
    const {email} = req.body 
    const [result] = await users.findAll({
        where : {
            email 
        }
    })
    if(!result) return res.send("User doesnot exist with that email")
    const generatedOtp = Math.floor(10000 * Math.random(99999))
    // tyo email ma otp pathauney
  await  sendEmail({
        email : email,
        subject : "Forgot Password OTP",
        otp : generatedOtp
    })
    result.otp = generatedOtp ; 
    await result.save()
    res.redirect('/verifyOtp')
}

exports.renderVerifyOtp = (req,res)=>{
    res.render("verifyOtp")
}


exports.verifyOtp = async(req,res)=>{
    const {otp} = req.body 
    if(!otp) return res.send("No otp was provided")
 const [result] =    await users.findAll({
where : {
    otp
}})

if(!result) return res.redirect("/verifyOtp")
res.redirect("/resetPassword?otp=" + otp)
}

exports.renderResetPassword = (req,res)=>{
    const otp = req.query.otp
    res.render("resetPassword",{otp})

}

exports.resetPassword  = async(req,res)=>{
    const {otp} = req.params
    if(!otp) return res.send("Otp should be provided")
    const {newPassword,newPasswordConfirm} = req.body 
if(!newPassword || !newPasswordConfirm) return res.send("Please provide newPassword and newPasswordConfirm")
if(newPassword != newPasswordConfirm) return res.send("newPassword and confirmPassword doesn't matched")
   
    
    const [result] =    await users.findAll({
        where : {
            otp
        }})
    result.password = bcrypt.hashSync(newPassword,8)
        await result.save()
        res.redirect("/login")
}

exports.logout = (req,res)=>{
    res.clearCookie('token')
    res.redirect("/login")
}

exports.renderHotels = async (req,res)=>{
    const datas = await hotels.findAll(
      {
        include : {
            model : hotelImages
        }
      }
    )
    res.render("hotels",{datas})
}


exports.getSingleHotel = async (req,res)=>{
    // const [message] = req.flash('success')
    const {id} = req.params
    const data = await hotels.findAll({
        where : {
            id : id
        },
        include : {
            model : hotelImages
        }
    })

    const data2 = await hotelReviews.findAll({
        where : {
            hotelId : id
        },
        include : {
            model : users
        }
    })
    res.render("singleHotel",{hotel:data[0],reviews:data2})
}

const axios = require('axios')
exports.bookHotel = async(req,res)=>{
    const userId = req.userId 
    const hotelId = req.params.id 
    const {seats,phoneNo,phoneNumber,date,message,paymentType} = req.body 
    const hotelData = await hotels.findByPk(hotelId)
    console.log(req.body)
    if(paymentType == 'cod'){
        await hotelBooks.create({
            hotelId,
            userId,
            totalSeats:seats,
            contactNo:phoneNo,
            phoneNumber,
            date,
            message
        })
        console.log(req.body)
        // req.flash('success','booked successfully')
        res.redirect('/hotel/' + hotelId)
    }else{
   
    let hotel = await hotels.findByPk(hotelId)
    if(!hotel){
        return res.status(404).json({
            message : "hotels not Found with that id"
        })
    }

        const data = {
            return_url : "http://localhost:3000/hotel/" + hotelId,
            purchase_order_id : hotelId,
            amount : hotelData?.hotelPrice * 100,
            website_url : "http://localhost:3000/",
            purchase_order_name : "hotelName_" + hotelId
        }
    const response =     await axios.post("https://a.khalti.com/api/v2/epayment/initiate/",data,{
            headers : {
                'Authorization' : 'key 503d66b404944ee787dd041aff687c5b'
            }
        })

        console.log(response,response.status)
        if(response.status == 200){
            await hotelBooks.create({
                hotelId,
                userId,
                totalSeats:seats,
                contactNo:phoneNo,
                phoneNumber,
                date,
                message,
                paymentStatus : 'paid',
                paymentType : 'khalti',
                paidAmount : hotelData.hotelPrice
            })
            res.redirect(response.data.payment_url)
        }else{
            res.send("Something went wrong")
        }
       

    }
 
 
}

exports.getMyBooks = async(req,res)=>{
    const userId = req.userId 
    const data = await hotelBooks.findAll({
        where : {
            userId
        },
        include : {
            model : hotels
        }
    })
    console.log(data)
    res.render('bookings',{data})
}

exports.deleteBooking = async(req,res)=>{
    const id = req.params.id 
    await hotelBooks.destroy({
        where : {
            id
        }
    })
    res.redirect("/bookings")
}