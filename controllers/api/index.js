const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');

// getting routes
router.use('/users', userRoutes);
router.use('/blogs',blogRoutes);

module.exports = router;
