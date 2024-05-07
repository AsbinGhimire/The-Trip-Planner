
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull : false
      },
 
      password : {
        type : DataTypes.STRING,
        allowNull : false
        
      },
      otp : {
        type : DataTypes.INTEGER
      },
      avatar : {
        type : DataTypes.STRING,
        defaultValue : 'https://i1.sndcdn.com/avatars-000812665324-tbg3oh-t500x500.jpg'
      },
      role : {
        type : DataTypes.ENUM('user','admin'),
        defaultValue : 'user'
      }

      
    
    });
    return User;
  };