const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const log = require("lighthouse-logger");

const customConfig = require("./custom-config");

module.exports = (url, opts, config = customConfig) => {
  return chromeLauncher
    .launch({ chromeFlags: opts.chromeFlags })
    .then(chrome => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config).then(results =>
        chrome.kill().then(() => {
            return results;
        })
      );
    });
};
