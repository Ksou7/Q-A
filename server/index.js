const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
require("dotenv").config();
const axios = require("axios");

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));

app.listen(process.env.PORT, () => {
  console.log(`server running at: http://localhost:${process.env.PORT}`);
});

app.get("/questions", (req, res) => {
  axios
    .get(
      "https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions?product_id=11003",
      { headers: { Authorization: process.env.TOKEN } }
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => console.log(err));
});
