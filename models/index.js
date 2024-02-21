const User = require('./User');
const Profile = require('./Profile');
const Friends = require('./friends')

//association between the user and profile models. 
User.hasOne(Profile, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Profile.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(User, {
    through: 'friends_id',
    foreignKey: 'id',
    as: 'friends'
});

// user has many songs and songs belongs to user 
// the user model will track songs 
// use that to track song data

module.exports = { User, Profile };
