// Importing the 'users', 'trips', and 'tripImages' models from the '../model' file
const { users, trips, tripImages } = require("../model")

// Exporting a function named 'renderProfile' as part of this module
exports.renderProfile = async (req, res) => {
    // Fetching all user data from the 'users' model
    const userData = await users.findAll()
    console.log(userData)

    // Fetching trip data associated with the current user from the 'trips' model
    const userTrips = await trips.findAll({
        // Specifying the condition for fetching trips belonging to the current user
        where: {
            userId: req.userId
        },
        // Including associated trip images using the 'tripImages' model
        include: {
            model: tripImages
        }
    })
   
    // Rendering the 'profile/index' view with user data and trip data
    res.render("profile/index", { userData: req.user, datas: userData, trips: userTrips })
}

// Exporting a function named 'editProfileAvatar' as part of this module
exports.editProfileAvatar = async (req, res) => {
    // Extracting the filename of the uploaded avatar image
    const filename = req.file.filename
    console.log(req.file)

    // Extracting the user ID from the request
    const userId = req.userId
    
    // Finding the user by their primary key (ID)
    const user = await users.findByPk(userId)
    
    // Updating the user's avatar field with the URL of the uploaded image
    user.avatar = process.env.BACKEND_URL + filename
    
    // Saving the updated user data to the database
    await user.save()
    
    // Redirecting the user to the '/profile' route after avatar update
    res.redirect("/profile")
}
