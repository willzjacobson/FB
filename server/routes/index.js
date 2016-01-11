var router = require('express').Router();
module.exports = router;

router.get('/', function(req, res, next) {
	res.send('lalalalala')
})

router.use('/api/users', require('./users'));
router.use('/api/posts', require('./posts'));
router.use('/auth', require('./auth'));

router.use(function(req, res) {
	res.status(404).end();
});