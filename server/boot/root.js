module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();

	var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
  router.get('/', server.loopback.status());
  router.get('/auth/account', ensureLoggedIn('/fail'), function(req, res, next) {
	  res.status(200).json({user: req.user});
	});
	router.get('/auth/logout', function(req, res, next) {
	  req.logout();
	  res.redirect('/');
	});
	router.get('/fail', function(req, res, next) {
	  res.status(200).json({ message: 'you are not logged in.' });
	});
  server.use(router);
};
