var router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/auth', require('./auth'));

router.use(function(req, res) {
	res.status(404).end();
});