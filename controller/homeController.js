// Importing the 'trips' and 'tripImages' models from the '../model' file
const { trips, tripImages } = require("../model")

// Exporting a function named 'renderHomePage' as part of this module
exports.renderHomePage = async (req, res) => {
    // Using 'await' to asynchronously fetch all trip data from the 'trips' model
    const datas = await trips.findAll({
        // Including associated trip images using the 'tripImages' model
        include: {
            model: tripImages
        }
    })

    // Logging the fetched data to the console for debugging purposes
    console.log(datas)

    // Rendering the 'home' view with the fetched trip data
    res.render("home", { trips: datas })
}
