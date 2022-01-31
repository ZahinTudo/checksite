const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const http = require("http");
const https = require("https");
require("./checking");

app.use(cors());
app.use(express.json());

const checkWebsite = async (url, callback) => {
  https
    .get(url, function (res) {
      console.log(url, res.statusCode, res.statusMessage);
      return callback(res.statusCode === 200, res.statusMessage);
    })
    .on("error", function (e) {
    //   console.log(e.message);
      return callback(false, e.message);
    });
};

const Run = async () => {
  try {
    app.get("/check", async (req, res) => {
      var check = await checkWebsite(req.query.Website, (status, message) => {
        // console.log(status);
        res.send({ site: req.query.Website, status, message });
      });
    });
  } finally {
  }
};
Run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Runing the api to check website");
});

app.listen(port, () => {
  console.log("listening on port ", port);
});
