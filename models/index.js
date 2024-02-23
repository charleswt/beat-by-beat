const User = require('./User');
const Profile = require('./Profile');
const Friends = require('./friends');

//association between the user and profile models. 
User.hasOne(Profile, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Profile.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(User, {
    through: Friends,
    as: 'friends',
    foreignKey: 'user_id'
    
});

module.exports = { User, Profile, Friends };
