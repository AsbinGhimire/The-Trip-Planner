const bcrypt = require("bcryptjs")

const seedAdmin =  async (users)=>{
   await users.findOrCreate({
    where : {
        email : 'admin@gmail.com'
    },
    defaults : {
        email : "admin@gmail.com",
        password : bcrypt.hashSync("password",10),
        role : 'admin',
        username : 'admin'
    }})
    console.log("Admin seeded successfully")
}

module.exports = seedAdmin