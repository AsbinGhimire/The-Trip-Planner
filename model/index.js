const seedAdmin = require("../adminSeeder.js");
const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

// la sequelize yo config haru lag ani database connect gardey vaneko hae 
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port : 3306, 
  // port : 7013,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing model files 
db.trips = require("./tripModel.js")(sequelize, DataTypes);
db.tripImages = require("./tripImagesModel.js")(sequelize, DataTypes);
db.users = require("./userModel.js")(sequelize,DataTypes)
db.hotels = require("./hotelModel.js")(sequelize,DataTypes)
db.hotelImages = require("./hotelImagesModel.js")(sequelize,DataTypes)
db.reviews = require("./reviewModel.js")(sequelize,DataTypes)
db.hotelReviews = require("./hotelReviewModel.js")(sequelize,DataTypes)
db.hotelBooks = require("./hotelBookModel.js")(sequelize,DataTypes)
db.shortTrips = require("./shortTripModel.js")(sequelize,DataTypes)
db.locations = require('./locationReviewModel.js')(sequelize,DataTypes)

sequelize
  .authenticate()
  .then(async () => {
    console.log("CONNECTED!!");
    await seedAdmin(db.users)
   // check if admin exists or not
  })
  .catch((err) => {
    console.log("Error" + err);
  });
//RELATIONSHIPS

db.users.hasOne(db.locations)
db.locations.belongsTo(db.users)

db.users.hasMany(db.trips)
db.trips.belongsTo(db.users)
db.users.hasMany(db.shortTrips)
db.shortTrips.belongsTo(db.users)
db.hotels.hasMany(db.hotelImages)
db.hotelImages.belongsTo(db.hotels)

db.trips.hasMany(db.tripImages)
db.tripImages.belongsTo(db.trips)


db.trips.hasMany(db.reviews)
db.reviews.belongsTo(db.trips)

db.users.hasMany(db.reviews)
db.reviews.belongsTo(db.users)

db.hotels.hasMany(db.hotelReviews)
db.hotelReviews.belongsTo(db.hotels)

db.users.hasMany(db.hotelReviews)
db.hotelReviews.belongsTo(db.users)


db.users.hasMany(db.hotelBooks)
db.hotelBooks.belongsTo(db.users)

db.hotels.hasMany(db.hotelBooks)
db.hotelBooks.belongsTo(db.hotels)



db.sequelize.sync({ force: 0}).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;