var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');


module.exports = function(io) {
  router.post('/submit', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    var tweetArr = tweetBank.add(name, text);
    console.log(tweetArr[tweetArr.length - 1].tweetAndId.text);
    console.log('this is io: ' + io);
    io.sockets.emit('new_tweet', { tweet: tweetArr[tweetArr.length - 1].tweetAndId.text });
    res.redirect('/');
  });

  router.get('/', function (req, res) {
    var tweets = tweetBank.list();
    res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find( {name: name} );
    res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: list, showForm: true, name: name } );

  });

  router.get('/users/:name/tweets/:id', function(req, res) {
    var name = req.params.name;
    var id = req.params.id;
    var list = tweetBank.find( {id: id} );
    res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: list } );
  });
  return router;
// module.exports = router;
}