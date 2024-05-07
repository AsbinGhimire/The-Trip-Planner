
module.exports = (sequelize, DataTypes) => {
    const HotelImage = sequelize.define("hotelImage", {
      imageUrl : {
        type : DataTypes.STRING,
        defaultValue : 'https://i1.sndcdn.com/avatars-000812665324-tbg3oh-t500x500.jpg'
      },

      
    
    });
    return HotelImage;
  };