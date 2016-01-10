var router = require('express').Router();
module.exports = router;

router.get('/', function(req, res, next) {
	res.send('lalalalala')
})

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/auth', require('./auth'));

router.use(function(req, res) {
	res.status(404).end();
});