
module.exports = (sequelize, DataTypes) => {
    const HotelReview = sequelize.define("hotelreview", {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue : 3
      },
      message: {
        type: DataTypes.STRING,
        allowNull : false
      },
  
    });
    return HotelReview;
  };