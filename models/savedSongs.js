const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class savedSong extends Model {}

savedSong.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      },
      savedSong: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'savedSongs',
  }
);

module.exports = savedSong;