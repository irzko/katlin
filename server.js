const express = require("express");

require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server listening on port ${process.env.PORT || 8000}`);
});
