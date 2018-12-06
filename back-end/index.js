const express = require("express");
let data = require("./data.json");
const port = 3001;
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ data });
});
app.get("/:id", (req, res) => {
  var { id } = req.params;
  var filtered = data.filter(obj => {
    return obj.id == id;
  });
  res.send({ data: filtered });
});

app.post("/", (req, res) => {
  var { body } = req;
  var obj = {
    id: data.length + 1,
    spirit: body.spirit,
    product: body.product,
    retail: body.retail,
    price: body.price,
    tag: body.tag
  };
  data.push(obj);
  res.send({ data: obj });
});

app.put("/:id", (req, res) => {
  var { body } = req;
  var { id } = req.params;

  var mapped = data.map(obj => {
    if (id == obj.id) {
      return obj = {
        id: obj.id,
        ...body
      };
    }
    return obj;
  });
  data = mapped;
  res.send({ data });
});

app.delete("/:id", (req, res) => {
  var { id } = req.params;
  var mapped = data.filter(obj => {
    return obj.id != id;
  });
  data = mapped;
  res.send({ data });
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something is BUSTED , better get into the fixin!");
});

app.listen(port);
