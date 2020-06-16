var express = require("express");
const router = express.Router();
var burger = require("../models/burger");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

router.get("/burgers", function(req, res) {
  burger.all(function(data) {
    res.json({ burgers: data });
  });
});

router.post("/burgers", function(req, res) {
    burger.insertOne(["burger", "eaten"], 
    [req.body.burger, req.body.eaten],
     function(result) {
    res.json({ id: result.insertId });
  });
});

router.put("/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({
    eaten: req.body.eaten
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.json({ id: req.params.id });
    }
  });
});

router.delete("/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
