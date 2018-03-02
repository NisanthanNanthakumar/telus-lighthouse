const Gatherer = require("lighthouse").Gatherer;

/**
 * @fileoverview Extracts `window.myLoadMetrics` from the test page.
 */

class DataLayer extends Gatherer {
  afterPass(options) {
    const driver = options.driver;

    return (
      driver
        .evaluateAsync("dataLayer")
        // Ensure returned value is what we expect.
        .then(metrics => {
          if (!metrics || metrics === undefined || metrics === null) {
            // Throw if page didn't provide the metrics we expect. This isn't
            // fatal -- the Lighthouse run will continue, but any audits that
            // depend on this gatherer will show this error string in the report.
            throw new Error("Unable to find dataLayer object in the page");
          }
          return metrics;
        })
    );
  }
}

module.exports = DataLayer;
