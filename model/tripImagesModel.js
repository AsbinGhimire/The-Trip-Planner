
module.exports = (sequelize, DataTypes) => {
    const TripImage = sequelize.define("tripImage", {
      imageUrl : {
        type : DataTypes.STRING,
        defaultValue : 'https://i1.sndcdn.com/avatars-000812665324-tbg3oh-t500x500.jpg'
      },

      
    
    });
    return TripImage;
  };