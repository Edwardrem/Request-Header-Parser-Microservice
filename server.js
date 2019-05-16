const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', (req, res) => {
  const ip =
    req.headers['x-forwarded-for'].split(', ').pop() ||
    req.connection.remoteAddress;
  const languages = req.acceptsLanguages();
  const userAgent = req.get('user-agent');

  res.json({
    ipaddress: ip.split(',')[0],
    language: languages.join(','),
    software: userAgent
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
