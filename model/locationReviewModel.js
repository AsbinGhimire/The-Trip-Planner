
module.exports = (sequelize, DataTypes) => {
    const location = sequelize.define("location", {
    
      message: {
        type: DataTypes.STRING,
        allowNull : false
      },
      imageUrl : {
        type : DataTypes.STRING
      },
      location : {
        type : DataTypes.STRING
      }
  
    });
    return location;
  };