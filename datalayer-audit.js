const Audit = require("lighthouse").Audit;

class LoadAudit extends Audit {
  static get meta() {
    return {
      name: "datalayer-audit",
      description: "The dataLayer object exists on the page",
      failureDescription: "The dataLayer object does not exist on the page",
      helpText: "The dataLayer object is used for Adobe Analytics.",

      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ["DataLayer"]
    };
  }

  static audit(artifacts) {
    const metrics = artifacts.DataLayer;
    
    // This score will be binary, so will get a red ✘ or green ✓ in the report.

    // dataLayer can be both array and object
    const metricsExist =
      !!metrics ||
      (Array.isArray(metrics)
        ? metrics.length > 0
        : Object.keys(metrics).length > 0);

    console.log(metrics, "metrics");
    console.log(metricsExist, "metricsExist");
    return {
      rawValue: metricsExist,
      score: metricsExist
    };
  }
}

module.exports = LoadAudit;
