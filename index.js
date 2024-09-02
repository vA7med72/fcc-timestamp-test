var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/", function (req, res) {
    let date = new Date().toUTCString();
    let now = Date.now();
    res.json({"unix": now, "utc": date});
});
app.get("/api/:date?", (req, res) => {
  
  if(req.params.date){
    let input = req.params.date;
    let date = new Date(input)
    if(date == 'Invalid Date'){
      date = new Date(Number(input))
    }
    let unix = date.getTime();
    let utc = date.toUTCString();
    if(date != 'Invalid Date'){
    res.json({"unix": unix, "utc": utc});
    } else {
      res.json({ error : "Invalid Date" });
    }
  } 
})

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});