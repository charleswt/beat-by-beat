const User = require('./User');
const Friends = require('./friends');

User.hasMany(Friends, {
    foreignKey: 'friends_id',
});

Friends.belongsTo(User, {
    foreignKey: 'friends_id'
});

module.exports = { User, Friends };
