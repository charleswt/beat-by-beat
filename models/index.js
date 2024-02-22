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

User.belongsToMany(User, {
    through: 'friends_id',
    foreignKey: 'id',
    as: 'friends'
});

module.exports = { User, Profile };
