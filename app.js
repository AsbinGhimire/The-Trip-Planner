const express = require("express")
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const axios = require("axios")
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended : true}))
// database file 
require("./model/index")
//routes 
const campgroundRoute  = require("./routes/campgroundRoute")
const userRoute  = require("./routes/userRoute")
const profileRoute  = require("./routes/profileRoute")
const homeRoute  = require("./routes/homeRoute")
const adminRoute  = require("./routes/adminRoute")
const tripRoute = require("./routes/tripRoute")

const flash = require("connect-flash")

const session = require('express-session')
const { decodeToken } = require("./services/decodeToken")
const { shortTrips, hotels, hotelReviews, users, hotelImages, tripImages, trips, hotelBooks, locations } = require("./model/index")
const { isAuthenticated } = require("./middleware/isAuthenticated")
app.use(flash())
app.use(session({
    saveUninitialized : false, 
    secret : "this is secret",
    resave : false
}))


app.use(cookieParser())
app.use(async(req,res,next)=>{
    res.locals.currentUser = req.cookies.token

    const token = req.cookies.token 
    res.locals.bookedHotelsId = []

    if(token){
        const decryptedResult = await decodeToken(token,process.env.SECRET_KEY)
        if(decryptedResult && decryptedResult.id){
            const bookedHotelsId = await hotelBooks.findAll({
                where : {
                    userId : decryptedResult.id
                },
                attributes:['hotelId']
            })
            res.locals.currentUserId = decryptedResult.id
            res.locals.currentUserRole = decryptedResult.role
            res.locals.bookedHotelsId = bookedHotelsId
        }
    }

    next()
})

app.use('/',campgroundRoute)
app.use('',userRoute)
app.use('',profileRoute)
app.use("",homeRoute)
app.use("", adminRoute)
app.use("", tripRoute)


app.get("/plan",(req,res)=>{
    res.render("plan.ejs")
})

app.post("/plan",isAuthenticated, async (req,res)=>{
   try {
    const {from,to,startDate,endDate,history} = req.body 

    const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${from}.json?access_token=pk.eyJ1IjoibWFuaXNoYmFzbmV0IiwiYSI6ImNsZjZmeno4aTFtZTczeW56ejdrNDNiNTAifQ.jYh8LZ3edkWkLeGcGdWwDA&country=NP`
      );
      const response2 = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${to}.json?access_token=pk.eyJ1IjoibWFuaXNoYmFzbmV0IiwiYSI6ImNsZjZmeno4aTFtZTczeW56ejdrNDNiNTAifQ.jYh8LZ3edkWkLeGcGdWwDA&country=NP`
      );
      const fromData = response.data.features[0].geometry.coordinates;
      const toData = response2.data.features[0].geometry.coordinates;
      console.log(req.body,fromData,toData,req.userId)
      if(req.userId && history == 'true'){
        await shortTrips.create({
            fromLatitude : fromData[1],
            fromLongitude : fromData[0],
            toLatitude : toData[1],
            toLongitude : toData[0],
            startDate, 
            from:from,
            to:to,
            userId : req.userId,
            endDate : endDate
        })

        res.cookie('mapData',{fromData,toData,to})
  
        res.redirect(`/mapPage`)
      }else{

        res.cookie('mapData',{fromData,toData,to})
    
        res.redirect(`/mapPage`)

      }
   } catch (error) {
    console.log(error)
   }
})

app.get("/mapPage",async (req,res)=>{
    const data = req.cookies.mapData
    const location = data.to 
    const feedbacks = await locations.findAll({
        where : {
            location 
        },
       include : [
        {
            model : users
        }
       ]
    })
  
    const hotel = await hotels.findAll({
        where : {
            hotelAddress : location
        },
        include : [
            
                    {
                        model : hotelImages
                    }
        ]
    })
    let reviews= [] ; 
    if(hotel.length>0){
        for(var i = 0 ; i < hotel.length; i++){
            let review =  await hotelReviews.findAll({
                where : {
                    hotelId : hotel[i].id
                },
                include : [
                    {
                        model : users
                    }
                ],
 
            
            })
           
            reviews.push(review)
            
        }
    }
    const tripsData = await trips.findAll(
        {
            where : {
                location 
            },
          include : {
              model : tripImages
          }
        }
      )
    // const formattedData = new
    res.render("mapPage",{data,reviews:reviews[0],hotels:hotel,trips:tripsData,location,feedbacks})
})

app.get("/shortTrips",isAuthenticated,async (req,res)=>{
    const data = await shortTrips.findAll({
        where : {
            userId : req.userId
        }
    })
    res.render("shortTrips.ejs",{datas:data})
})

app.get('initiatePayment',async(req,res)=>{
    const {hotelId,amount}  = req.body 
    if(!hotelId || !amount){
        return res.status(400).json({
            message : "Please provide hotelId,amount"
        })
    }
let hotel = await hotels.findByPk(hotelId)
if(!hotel){
    return res.status(404).json({
        message : "hotels not Found with that id"
    })
}
// check the coming amount is the totalAmount of hotel 
if(hotel.hotelPrice !== amount){
    return res.status(400).json({
        message : "Amount must be equal to totalAmount"
    })
}
    const data = {
        return_url : "http://localhost:3000/hotel/" + hotelId,
        purchase_hotel_id : hotelId,
        amount : amount * 100,
        website_url : "http://localhost:3000/",
        purchase_hotel_name : "hotelName_" + hotelId
    }
const response =     await axios.post("https://a.khalti.com/api/v2/epayment/initiate/",data,{
        headers : {
            'Authorization' : 'key 503d66b404944ee787dd041aff687c5b'
        }
    })

    if(response.status === 200){
        hotel.paymentStatus = 'paid'
        await hotel.save()
    }


   res.status(200).json({
    message : "Payment successful",
    paymentUrl : response.data.payment_url
   })

})
app.use(express.static("./public/css/"))
app.use(express.static("./uploads/"))
const PORT = process.env.PORT

app.get("/userdelete/:id",async (req,res)=>{
    const id = req.params.id 
    await users.destroy({
        where : {
            id
        }
    })
    res.redirect('/profile')
})
const {multer,storage} = require("./middleware/multerConfig")
const upload = multer({storage : storage})
app.post('/locationreview',upload.single('image'),isAuthenticated,async(req,res)=>{
try {
    const fileName = req.file.filename
    const {message,location} = req.body 
    const userId = req.userId 

    await locations.create({
        message,
        location,
        userId,
        imageUrl : fileName
    })
    res.redirect('/mapPage')
} catch (error) {
    console.log(error)
}

})
app.listen(PORT,()=>{
    console.log("Server has started at port" + PORT)
})