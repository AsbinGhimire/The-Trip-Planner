const { trips, tripImages, reviews, users } = require("../model")

exports.addTrip = (req,res)=>{
    const [message] = req.flash('success')
    res.render('addTrip',{message})
}


exports.handleAddTrip = async (req,res)=>{
    const {name,location,description,famousFor} = req.body 
    const images = req.files
   const createdTrip = await trips.create({
        name,
        location,
        description,
        famousFor,
        latitude : 98.2,
        longitude : 23.3,
        userId : req.userId
    })
    for(let i = 0 ; i < images.length ; i++){
        await tripImages.create({
            imageUrl : images[i].filename,
            tripId : createdTrip.id
        })
    }
    req.flash("success","Hotel added sucessfully")
    res.redirect("/")

}

exports.handleSingleTrip = async(req,res)=>{
    const {id} = req.params 
    const data =await trips.findAll({
        where : {
            id
        },
        include : {
            model : tripImages
        }
    })
    const data2 = await reviews.findAll({
        where : {
            tripId : id
        },
        include : {
            model : users
        }
    })
    console.log(data2)
    res.render("singleTrip",{trip:data[0],reviews:data2})
}

exports.deleteTrip = async(req,res)=>{
    const {id} = req.params 
    await trips.destroy({
        where : {
            id : id
        }
    })
    res.redirect("/profile")
}


exports.addReview = async(req,res)=>{
    const {rating,message} = req.body 
    const {id} = req.params

    const userId = req.userId
    await reviews.create({
        tripId : id, 
        rating,
        message,
        userId
    })

    res.redirect("/trip/" + id)
}