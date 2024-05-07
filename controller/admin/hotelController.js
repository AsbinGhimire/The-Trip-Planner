const { hotels, hotelImages, hotelReviews } = require("../../model")

exports.addHotel = async (req,res)=>{
    const {hotelName,hotelPrice,hotelAddress,hotelDescription} = req.body 
    const images  = req.files
  const createdHotel =  await hotels.create({
        hotelName,
        hotelAddress,
        hotelPrice,
        latitude : 98.2,
        longitude : 23.3,
        hotelDescription
    })
    for(let i = 0 ; i < images.length ; i++){
        await hotelImages.create({
            imageUrl : images[i].filename,
            hotelId : createdHotel.id
        })
    }
    req.flash("success","Hotel added sucessfully")
    res.redirect("/admin/hotel")
}

exports.renderAddHotel = (req,res)=>{
    const [message] = req.flash('success')
    console.log(message)
    res.render("admin/addHotel",{message})
}

exports.addHotelReview = async(req,res)=>{
    const {rating,message} = req.body 
    const {id} = req.params

    const userId = req.userId
    await hotelReviews.create({
        hotelId : id, 
        rating,
        message,
        userId
    })

    res.redirect("/hotel/" + id)
}