// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.get('/api/whoami', (req, res) => {
  var IP = req.headers['x-forwarded-for'].split(', ').pop() || req.connection.remoteAddress;
  var languages = req.acceptsLanguages();
  var userAgent = req.get('user-agent');
  
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    ipaddress: IP,
    language: languages[0],
    software: userAgent.substring(userAgent.indexOf('(') + 1, userAgent.indexOf(')'))
  }));
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
