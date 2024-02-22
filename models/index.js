const User = require('./User');
const Profile = require('./Profile');
const savedSong = require('./savedSongs')

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

User.hasMany(savedSong, {
    foreignKey: 'user_id',
})

module.exports = { User, Profile, savedSong };
