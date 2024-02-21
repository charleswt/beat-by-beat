const sequelize = require('../config/connection');
const { User } = require('../models');
const { Profile } = require('../models');

const userData = require('./userData.json');
const profileData = require('./profileData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Since Profile data includes JSON fields, ensure to stringify them if not already
  const formattedProfileData = profileData.map(profile => ({
    ...profile,
    favArtists: JSON.stringify(profile.favArtists),
    friends: JSON.stringify(profile.friends),
  }));

  await Profile.bulkCreate(formattedProfileData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

seedDatabase();
