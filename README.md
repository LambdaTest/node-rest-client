![LambdaTest Logo](https://www.lambdatest.com/static/images/logo.svg)

# Node LambdaTest

[![npm version](https://badge.fury.io/js/%40lambdatest%2Fnode-rest-client.svg)](https://badge.fury.io/js/%40lambdatest%2Fnode-rest-client)

A Node.js JavaScript client for working with [LambdaTest](https://www.lambdatest.com) through [Automation API](https://www.lambdatest.com/support/docs/api-doc).

## Installation

```
npm i @lambdatest/node-rest-client
```

## Example

```js
var lambdaRestClient = require("@lambdatest/node-rest-client");
var lambdaCredentials = {
    username: process.env.LT_USERNAME || "<Your username>",
    accessKey: process.env.LT_ACCESS_KEY || "<Your access key>",
};

// Automation APIs
var lambdaAutomationClient = lambdaRestClient.AutomationClient(lambdaCredentials);

lambdaAutomationClient.fetchBuilds(function (error, builds) {
    if (!error) {
        console.log(builds);
    }
});
```

## API

### Automation API v1

#### lambdaRestClient.AutomationClient(lambdaCredentials)

Creates a new automation client instance.

-   `lambdaCredentials`: credentials for all requests.
    -   `username`: The username for the LambdaTest account.
    -   `accessKey`: The accessKey for the LambdaTest account.
    -   `logFile`: You can provide a specific path to log file.If you won't provide a path then the logs would be saved in your present working directory by the filename: lambda_api.log

Build Object
This object is dedicated to help you perform any operation on your test builds.

#### lambdaAutomationClient.fetchBuilds(params?, callback)

Fetch all the details regarding test builds.

-   (optional) `params`: Parameters(offset, limit, status, fromdate, todate, sort)
    -   `offset` - used to limit the number of lists. For example: offset=10
    -   `limit` - used to limit the number of records. For example: limit=10
    -   `status` - used to extract the status for list of builds in comma separated format. For example: "running,queued,completed,timeout and error"
    -   `fromdate` - to fetch all the builds executed past a particular date in the (YYYY-MM-DD) date format.
    -   `todate` - to fetch all the builds executed till a particular date in the (YYYY-MM-DD) date format.
    -   `sort` - to sort the list in ascending or descending order using multiple keys. For example: "asc.user_id,desc.org_id"
-   `callback` (`function(error, builds)`): A callback to invoke when the API call is complete.

#### lambdaAutomationClient.fetchBuildById(buildId, callback)

Fetch all the details of a particular test build by ID. Details would include:

1. Status of the build
2. Number of tests executed
3. User who executed the build

-   `buildId` - a unique ID for the build type you wish to fetch.
-   `callback` (`function(error, build)`) - A callback to invoke when the API call is complete.

#### lambdaAutomationClient.deleteBuildById(buildId, callback)

To delete a particular build from your automation dashboard.

-   `buildId` - ID of the particular build you wish to delete.
-   `callback` (`function(error, build)`): A callback to invoke when the API call is complete.

#### lambdaAutomationClient.updateBuildById(buildId, requestBody, callback)

To rename a test build.

-   `buildId` - ID of the particular build you wish to rename.
-   `requestBody` - Object(name).
-   `name`- Changed name
-   `callback` (`function(error, build)`) - A callback to invoke when the API call is complete.

Session Object
This object is dedicated to help you perform any operation related to your test sessions.

#### lambdaAutomationClient.fetchSessions(params?, callback)

Fetch all the details regarding test sessions.

-   (optional) `params`: Parameters(build_id, username, offset, limit, status, fromdate, todate, sort)
    -   `build_id` - to filter sessions executed in a particular build.
    -   `username` - to filter sessions executed by a particular user.
    -   `offset` - used to limit the number of lists. For example: offset=10
    -   `limit` - used to limit the number of records. For example: limit=10
    -   `status` - used to extract the status for list of builds in comma separated format. For example: "running,queued,completed,timeout and error"
    -   `fromdate` - to fetch all the builds executed past a particular date in the (YYYY-MM-DD) date format.
    -   `todate` - to fetch all the builds executed till a particular date in the (YYYY-MM-DD) date format.
    -   `sort` - to sort the list in ascending or descending order using multiple keys. For example: "asc.user_id,desc.org_id"
-   `callback` (`function(error, sessions)`): A callback to invoke when the API call is complete.

#### lambdaAutomationClient.fetchSessionById(sessionId, callback)

Fetch all the details of a particular test session by ID. Details that are fetched would include:

1. Name of the session
2. Status of the session
3. Operating system
4. Browser name
5. Browser version
6. All generated logs endpoint

-   `sessionId` - a unique ID for the build type you wish to fetch.
-   `callback` (`function(error, session)`): A callback to invoke when the API call is complete.

#### lambdaAutomationClient.deleteSessionById(sessionId, callback)

To delete a particular session from your automation dashboard.

-   `sessionId` - ID of the particular session you wish to delete.
-   `callback` (`function(error, session)`): A callback to invoke when the API call is complete.

#### lambdaAutomationClient.updateSessionById(sessionId, requestBody, callback)

To rename a test session or to update a test session as "passed" or "failed".

-   `sessionId` - ID of the particular session you wish to rename.
-   `requestBody` - Object(name, status_ind).
-   `name`- Changed name
-   `status_ind`- Updated status(passed/failed)
-   `callback` (`function(error, session)`): A callback to invoke when the API call is complete.

#### lambdaAutomationClient.fetchSessionScreenshot(sessionId, callback)

To extract step-by-step screenshot of a particular test session. The screenshots would be fetched in the zip format.

-   `sessionId` - ID of the particular session for which you wish to fetch step-by-step screenshots.
-   `callback` (`function(error, screenshots)`): A callback to invoke when the API call is complete.

#### lambdaAutomationClient.fetchSessionVideo(sessionId, callback)

To fetch a recorded video of your test session.

-   `sessionId` - ID of the particular session for which you wish to fetch the recorded video.
-   `callback` (`function(error, video)`): A callback to invoke when the API call is complete.

#### lambdaAutomationClient.fetchSessionCommandLogs(sessionId, callback)

To fetch the entire command logs of a test session in plain JSON text.

-   `sessionId` - ID of the particular session for which you wish to fetch the command logs.
-   `callback` (`function(error, commandLogs)`): A callback to invoke when the API call is complete.

#### lambdaAutomationClient.fetchSessionNetworkLogs(sessionId, callback)

To fetch every response and request recieved by the Selenium Grid for a particular test session in plain JSON text.

-   `sessionId` - ID of the particular session for which you wish to fetch the Selenium logs.
-   `callback` (`function(error, networkLogs)`): A callback to invoke when the API call is complete.

#### lambdaAutomationClient.fetchSessionConsoleLogs(sessionId, callback)

To fetch all of the console errors thrown throughout interation between web-application and Selenium script for a particular test session in plain JSON text.
To fetch all of the console errors for a particular test session in plain JSON text.

-   `sessionId` - ID of the particular session for which you wish to fetch the console logs.
-   `callback` (`function(error, consoleLogs)`): A callback to invoke when the API call is complete.

Tunnel Object
This object is dedicated to represent information regarding the Lambda Tunnel for performing automated cross browser testing of your locally hosted web-apps.

#### lambdaAutomationClient.fetchTunnels(callback)

To fetch the entire list of active tunnels in your account.

-   `callback` (`function(error, tunnels)`): A callback to invoke when the API call is complete.

#### lambdaAutomationClient.deleteTunnelById(tunnelId, callback)

To delete a particular Lambda Tunnel running in your account.

-   `tunnelId` - ID of the particular Tunnel for which you wish to delete.
-   `callback` (`function(error, tunnel)`): A callback to invoke when the API call is complete.

Platform Object

#### lambdaAutomationClient.fetchPlatforms(callback)

To fetch syntax for every browser and browser version offered by LambdaTest.

-   `callback` (`function(error, platforms)`): A callback to invoke when the API call is complete.

#### lambdaAutomationClient.fetchCyEnhancedReport(testID, callback)

To fetch enhanced cypress report.

-   `testID` - Test ID of the particular test whose detailed report is to be fetched.
-   `callback` (`function(error, report)`): A callback to invoke when the API call is complete.

## About LambdaTest

[LambdaTest](https://www.lambdatest.com/) is a cloud based selenium grid infrastructure that can help you run automated cross browser compatibility tests on 2000+ different browser and operating system environments. LambdaTest supports all programming languages and frameworks that are supported with Selenium, and have easy integrations with all popular CI/CD platforms. It's a perfect solution to bring your [selenium automation testing](https://www.lambdatest.com/selenium-automation) to cloud based infrastructure that not only helps you increase your test coverage over multiple desktop and mobile browsers, but also allows you to cut down your test execution time by running tests on parallel.
