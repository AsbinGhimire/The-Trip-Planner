
module.exports = (sequelize, DataTypes) => {
    const Hotel = sequelize.define("hotel", {
      hotelName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hotelAddress: {
        type: DataTypes.STRING,
        allowNull : false
      },
  
       latitude : {
        type : DataTypes.FLOAT,
        
      },
      longitude : {
        type : DataTypes.FLOAT
      },
      hotelPrice : {
        type : DataTypes.INTEGER
      },
      hotelDescription : {
        type : DataTypes.TEXT
      },
      paymentStatus : {
        type : DataTypes.ENUM('paid','unpaid'),
        defaultValue : 'unpaid'
      }
  
      
    
    });
    return Hotel;
  };