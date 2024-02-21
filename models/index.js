const User = require('./User');
const Profile = require('./Profile');

//association between the user and profile models. 
User.hasOne(Profile, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Profile.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Profile };
