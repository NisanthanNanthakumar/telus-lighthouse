const express = require("express");
const fs = require("fs");
const app = express();

const ReportGenerator = require("lighthouse/lighthouse-core/report/v2/report-generator");

const launchChromeAndRunLighthouse = require("./runLighthouse");

const opts = {
  logLevel: "info",
  output: "json",
  chromeFlags: ["--headless"]
};

app.get("/", (req, res) => {
  const { q } = req.query;
  let url =
    !q || q === ""
      ? "https://www.telus.com/en/on/mobility/phones/samsung-galaxy-note-8"
      : q;

  launchChromeAndRunLighthouse(url, opts)
    .then(results => new ReportGenerator().generateReportHtml(results))
    .then(results => {
      return new Promise((resolve, reject) => {
        fs.writeFile("report.html", results, err => {
          if (err) reject(err);
          else resolve(results);
        });
      });
    })
    .then(file => res.status(200).sendFile("report.html", { root: __dirname }))
    .catch(err => {
      console.log(err);
      res.status(400).send({
        message: "Bad Request",
        description: err
      });
    });
});

app.all("*", (req, res) => {
  res.status(404).send({
    message: "Not Found",
    description: "The requested resource doesn't exist."
  });
});

module.exports = app;
