const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Friends extends Model {};

 Friends.init({
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
 },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'friend',
 })

 module.exports = Friends;