
module.exports = (sequelize, DataTypes) => {
    const HotelBook = sequelize.define("hotelbook", {
      
      totalSeats : {
        type : DataTypes.INTEGER
      },
      contactNo : {
        type : DataTypes.STRING
      },
      date : {
        type : DataTypes.STRING
      },
      message : {
        type : DataTypes.TEXT
      },
      paymentType:{
        type : DataTypes.ENUM("cod","khalti"),
        defaultValue: 'cod'
      },
      paymentStatus : {
        type : DataTypes.ENUM("paid","unpaid","pending"),
        defaultValue : 'unpaid'
      },
      paidAmount : {
        type : DataTypes.INTEGER,
        defaultValue : 0
      }
  
      
    
    });
    return HotelBook;
  };