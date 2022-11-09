const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userInfo = require('./userInfo.json');
const blogData = require('./blogData.json');

//seeding database with user and blog data
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userInfo, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
