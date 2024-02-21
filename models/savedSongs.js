const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class savedSongs extends Model {}

savedSongs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      },
      savedSong: {
        type: DataTypes.INTEGER,
      }
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'profile',
  }
);

module.exports = savedSongs;