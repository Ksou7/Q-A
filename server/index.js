const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
require("dotenv").config();
const axios = require("axios");
var bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));

console.log(process.env.TOKEN);

app.get("/questions", (req, res) => {
  axios
    .get(
      "https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions?product_id=11005",
      { headers: { Authorization: process.env.TOKEN } }
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => console.log(err));
});

//update helfpulness counter
app.put("/questions", async (req, res) => {
  try {
    console.log("body ==>", req.body);
    const data = await axios.put(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions/${req.body.id}/helpful`,
      {},
      {
        headers: { Authorization: process.env.TOKEN },
      }
    );
    console.log("data ==>", data);
    res.send("updated");
  } catch (e) {
    console.error(e);
  }

  // axios
  //   .put(
  //     `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions/${req.body.id}/helpful`,
  //     {},
  //     {
  //       headers: { Authorization: process.env.TOKEN },
  //     }
  //   )
  //   .then((response) => {
  //     res.send("updated");
  //   })
  //   .catch((err) => {
  //     console.log("====================================");
  //     console.log(err);
  //   });
});

app.listen(process.env.PORT, () => {
  console.log(`server running at: http://localhost:${process.env.PORT}`);
});
