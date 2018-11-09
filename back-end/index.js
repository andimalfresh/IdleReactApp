const express = require("express");
const data = require("./data.json");
const port = 3001;
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send({ data });
});
app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port);
