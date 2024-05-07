
module.exports = (sequelize, DataTypes) => {
    const review = sequelize.define("review", {
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
    return review;
  };