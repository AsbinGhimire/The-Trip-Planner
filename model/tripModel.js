module.exports = (sequelize, DataTypes) => {
    const Trip = sequelize.define("trip", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull : false
      },

     location : {
        type : DataTypes.STRING
     },
     latitude : {
        type: DataTypes.FLOAT
     },
     longitude : {
        type: DataTypes.FLOAT
     },
     famousFor : {
      type : DataTypes.STRING
   },
    
    });
    return Trip;
  };