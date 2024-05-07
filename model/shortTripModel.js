module.exports = (sequelize, DataTypes) => {
    const ShortTrip = sequelize.define("shortTrip", {
      startDate: {
        type: DataTypes.STRING,
      
      },
      endDate: {
        type: DataTypes.TEXT,
        
      },

     from : {
        type : DataTypes.STRING
     },
     to : {
        type : DataTypes.STRING
     },
     fromLatitude : {
        type: DataTypes.FLOAT
     },
     fromLongitude : {
        type: DataTypes.FLOAT
     },
     toLatitude : {
        type: DataTypes.FLOAT
     },
     toLongitude : {
        type: DataTypes.FLOAT
     },

 
      
    
    });
    return ShortTrip;
  };