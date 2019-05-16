// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.get('/api/whoami', (req, res) => {
  const IP = req.headers['x-forwarded-for'].split(', ').pop() || req.connection.remoteAddress;
  const languages = req.acceptsLanguages();
  const userAgent = req.get('user-agent');
  
  res.json({
    ipaddress: IP.split(',')[0],
    language: languages.join(','),
    software: userAgent.substring(userAgent.indexOf('(') + 1, userAgent.indexOf(')'))
  });
});



// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
