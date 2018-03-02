const launchChromeAndRunLighthouse = require("../runLighthouse");

const opts = {
  logLevel: "info",
  output: "json",
  chromeFlags: ["--headless"]
};

jest.setTimeout(100000);

describe("launchChromeAndRunLighthouse function", () => {
  test("should not return a falsy value", () => {
    return launchChromeAndRunLighthouse("https://www.telus.com", opts).then(
      res => expect(res).toBeTruthy()
    );
  });

  test("should return results of datalayer audit", () => {
    return Promise.all([
      launchChromeAndRunLighthouse("https://www.telus.com", opts).then(res => {
        expect(res.audits["datalayer-audit"]).toHaveProperty("score");
        expect(res.audits["datalayer-audit"]).toHaveProperty("rawValue");
      }),
      launchChromeAndRunLighthouse(
        "https://www.telus.com/en/on/mobility/plans",
        opts
      ).then(res => {
        expect(res.audits["datalayer-audit"]).toHaveProperty("score");
        expect(res.audits["datalayer-audit"]).toHaveProperty("rawValue");
      })
    ]);
  });

  test("should fail the datalayer audit for [https://www.google.com, https://www.twitter.com, https://www.facebook.com]", () => {
    let urls = [
      "https://www.google.com",
      "https://www.twitter.com",
      "https://www.facebook.com"
    ];
    return Promise.all(
      urls.map(url => {
        return launchChromeAndRunLighthouse(url, opts).then(res => {
          expect(res.audits["datalayer-audit"]).toHaveProperty("score");
          expect(res.audits["datalayer-audit"]).toHaveProperty("rawValue");
          expect(res.audits["datalayer-audit"].score).toBeFalsy();
          expect(res.audits["datalayer-audit"].rawValue).toBeFalsy();
        });
      })
    );
  });

  test("should pass the datalayer audit for https://www.telus.com/en/on/mobility/phones/samsung-galaxy-note-8", () => {
    return launchChromeAndRunLighthouse(
      "https://www.telus.com/en/on/mobility/phones/samsung-galaxy-note-8",
      opts
    ).then(res => {
      expect(res.audits["datalayer-audit"]).toHaveProperty("score");
      expect(res.audits["datalayer-audit"]).toHaveProperty("rawValue");
      expect(res.audits["datalayer-audit"].score).toBeTruthy();
      expect(res.audits["datalayer-audit"].rawValue).toBeTruthy();
    });
  });
});
