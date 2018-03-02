module.exports = {
  // 1. Run your custom tests along with all the default Lighthouse tests.
  extends: "lighthouse:default",

  // 2. Add gatherer to the default Lighthouse load ('pass') of the page.
  passes: [
    {
      passName: "defaultPass",
      gatherers: ["datalayer-gatherer"]
    }
  ],

  // 3. Add custom audit to the list of audits 'lighthouse:default' will run.
  audits: ["datalayer-audit"],

  // 4. Create a new 'My site metrics' section in the default report for our results.
  categories: {
    mysite: {
      name: "DataLayer metrics",
      description: "Checks for the dataLayer object on the page.",
      audits: [
        // When we add more custom audits, `weight` controls how they're averaged together.
        { id: "datalayer-audit", weight: 1 }
      ]
    }
  }
};
