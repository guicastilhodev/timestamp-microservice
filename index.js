// index.js
// where your node app starts
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:input", (req,res) => {

  const inputParam = req.params.input;
  let date;
  let dateType = false;

  const timestamp = Number(inputParam);

  if (!isNaN(timestamp) && timestamp.toString().length === 13) {
    date = new Date (timestamp);
  } else {
    date = new Date (inputParam);
    dateType = true;
  }

  if (isNaN(date.getTime())) {
    return res.json({error: "Invalid Date"});
  }

  const unixTime = date.getTime();
  const gmtTime = date.toUTCString();



  res.json({unix: unixTime, utc: gmtTime});

})

app.get("/api/", (req,res) => {
    let nowDate = new Date();
    nowDateString = nowDate.toUTCString();
    let nowUnixTime = nowDate.getTime();
    return res.json({unix: nowUnixTime, utc: nowDateString})
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
