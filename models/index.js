const User = require('./User');
const Friends = require('./friends');

User.hasMany(Friends, {
    foreignKey: 'user_id',
});

Friends.blongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Friends };
