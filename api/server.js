var restify = require('restify');
var users = require('./users');
var server = restify.createServer({ name: 'jquery_templates' });

server.pre(restify.CORS());

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse());


server.get('/users', function(req, res, next) {
    res.send(200, users.getAll());
    next();
});

server.post('/users/new', function(req, res, next) {
    var name, email;
    if(req.body && req.body.name && req.body.email) {
        name = req.body.name;
        email = req.body.email;
        users.add(name, email);
        res.send(201);
    } else {
        res.send(400, 'el campo email y name no son correctos o faltan');
    }
    next();
});




module.exports = {
    init: function() {
        server.listen(8080, 'localhost', function() {
            console.log('server corriendo en %s', server.url);
        });
    }
}