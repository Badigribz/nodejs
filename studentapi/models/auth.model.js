const bcrypt = require('bcryptjs')

module.exports=(sequelize, DataTypes)=>{

    const user = sequelize.define("user",{
      user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            
            },
          email:{
                type: DataTypes.STRING,
                allowNull: false
            },
            
            password:{
                type: DataTypes.STRING,
                allowNull: false
            },
            
});

// Function to hash passsword before saving...........
user.beforeCreate(async (user) => {
    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPwd = await bcrypt.hash(user.password, salt);
        user.password = hashedPwd;
    }   catch (error) {
        throw new Error('Error encrypting passwsword')
    }
});

// Function to compare the entered password with the saved hased password
user.prototype.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error ;
    }
};


    
    return user
    
}