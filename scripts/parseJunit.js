const Parser = require("junitxml-to-javascript");
const path = require("path");
const fg = require("fast-glob");
const { notifyFail, notifyPass } = require("./notifySlack");

const repoName = process.argv[2];
const webhookUrl = process.argv[3];
const username = process.argv[4] || "default user";
console.log({ repoName, webhookUrl, username });

let numSuites = 0;
const passedSuites = [];
const failedSuites = [];

/**
 * Determine how many test files passed and output to console.
 * This can be extended to send the same data elsewhere, ex: slack, LMS
 */

const passed = (suite) => suite.succeeded === suite.tests;

const parseAllFiles = async () => {
  const glob = __dirname + "/../reports/junit/junit-*.xml";
  const fileNames = fg.sync(glob);
  numSuites = fileNames.length;

  for (const file of fileNames) {
    const report = await new Parser().parseXMLFile(file);
    const { testsuites } = report;

    let testFilePassed = testsuites.every((ts) => passed(ts));

    if (testFilePassed) {
      passedSuites.push(testsuites[0].name);
    } else {
      let failed = testsuites.filter((ts) => !passed(ts));
      failedSuites.push(failed[0].name);
    }
  }

  if (passedSuites.length === numSuites) {
    notifyPass({ username, numSuites, repoName, webhookUrl });
  } else {
    notifyFail({
      username,
      numSuites,
      passedSuites,
      failedSuites,
      repoName,
      webhookUrl,
    });
  }
};

parseAllFiles();
