const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
require("dotenv").config();
const axios = require("axios");
var bodyParser = require("body-parser");
var cors = require("cors");

let TOKEN = "bfb2309a70ec57683df4cb422f18d672725854bb" || process.env.TOKEN;
let PORT = 3002 || process.env.PORT;

console.log(TOKEN);
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/questions", (req, res) => {
  axios
    .get(
      "https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions?product_id=11048",
      { headers: { Authorization: TOKEN } }
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => console.log(err));
});

//update helfpulness counter
// app.put("/questions", async (req, res) => {
//   try {
//     const data = await axios.put(
//       `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions/${req.body.id}/helpful`,
//       {},
//       {
//         headers: { Authorization: process.env.TOKEN },
//       }
//     );

//     res.send("updated");
//   } catch (e) {
//     console.error(e);
//   }
// });
//update helpfulness
app.put("/api/questions/:id", (req, res) => {
  console.log(req.params);
  axios
    .put(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions/${req.params.id}/helpful`,
      {},
      {
        headers: { Authorization: TOKEN },
      }
    )
    .then((response) => {
      res.send("updated");
    })
    .catch((err) => {
      console.error(err);
    });
});

//report a question

app.put("api/questions/report/:id", (req, res) => {
  axios
    .put(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions/${req.params.id}/report`,
      {},
      {
        headers: { Authorization: TOKEN },
      }
    )
    .then((response) => {
      res.send("reported");
    })
    .catch((err) => {
      console.log(err);
    });
});

//update helfpulness counter for answers
app.put("/api/questions/answers/:id", (req, res) => {
  console.log(req.params);
  axios
    .put(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/answers/${req.params.id}/helpful`,
      {},
      {
        headers: { Authorization: TOKEN },
      }
    )
    .then((response) => {
      res.send("updated");
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`server running at: http://localhost:${PORT}`);
});
