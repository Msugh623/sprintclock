const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

const operators = {
  "-": (a, b) => a - b,
  "+": (a, b) => a + b,
};

app.get("/datetime", async (req, res) => {
  const tz = req.query.tz || "GMT";
  const operator = tz.split("GMT")[0] || "+";
  const tzUtc = tz.split("GMT")[1];
  const hr = 60 * 60 * 1000 * Number(tzUtc);
  const utc = new Date();
  const diff = Number(operators[operator](Number(utc), hr));
  const prsDate = new Date(diff);
  res.json(Number(prsDate));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
  console.log("server listening @3000");
});

module.exports = { app };
