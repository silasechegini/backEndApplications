// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
// app.use("/public", express.static(__dirname + "/public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date", (req, res) => {
  let date = req.params.date;
  if (date) {
    if (/^[0-9]+$/.test(date)) {
      date = Number(date);
    }
    const newDate = new Date(date);
    const newDateString = newDate.toString();
    if (newDateString === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }
    return res.json({ unix: newDate.getTime(), utc: newDate.toUTCString() });
  }
});

app.get("/api/", (req, res) => {
  const defDate = new Date();
  res.json({ unix: defDate.getTime(), utc: defDate.toUTCString() });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
