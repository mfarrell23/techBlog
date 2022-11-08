const router = require('express').Router();
const apiRoutes = require('./api');
const frontRoutes = require("./frontRoutes")

// TODO: Setting up the routes
router.use('/api', apiRoutes);
router.use( frontRoutes);

module.exports = router;