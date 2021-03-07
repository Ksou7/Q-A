const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
require("dotenv").config();
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const TOKEN = "5af747e9a9a19faea88e99edf62d545f93e41c71" || process.env.TOKEN;
const PORT = 3002 || process.env.PORT;

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/questions", (req, res) => {
  axios
    .get(
      "https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions?product_id=11005",
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
app.put("/questions/:id", (req, res) => {
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

app.put("/questions/report/:id", (req, res) => {
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
app.put("/questions/answers/:id", (req, res) => {
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

// add a question functionality
app.post("/questions", (req, res) => {
  console.log(req.body);
  axios
    .post(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions`,
      {
        body: req.body.body,
        name: req.body.name,
        email: req.body.email,
        product_id: req.body.product_id,
      },
      {
        headers: { Authorization: TOKEN },
      }
    )
    .then((response) => res.send("created"))
    .catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => {
  console.log(`server running at: http://localhost:${PORT}`);
});
