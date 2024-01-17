var request = require("request"),
    logger,
    packageVersion = require("../package.json").version;

var ApiClient = function (settings) {
    settings = settings || {};

    // Set default region if not provided and validate
    const region = settings.region || "us";
    if (!["us", "eu"].includes(region)) {
        throw new Error("Region is invalid.");
    }

    // Load region-specific config and attach it to ApiClient
    ApiClient.config = require(`./config.${region}`);

    // Required check for username
    if (!settings.username) {
        throw new Error("Username is required.");
    }

    // Required check for accessKey
    if (!settings.accessKey) {
        throw new Error("Access Key is required.");
    }

    if (!logger) {
        logger = require("./logger")(settings.logFile);
    }

    logger.info("Imported ApiClient and User Credentials", settings);
    ApiClient.authHeader =
        "Basic " + Buffer.from(settings.username + ":" + settings.accessKey).toString("base64");
    ApiClient.settings = settings;

    // Set base URL depending on the app flag
    if (settings.isApp) {
        ApiClient.baseUrl = ApiClient.config.baseUrlApp + ApiClient.config.appVersion.latestVersion;
    }
};

ApiClient.request = function (options, fnCallback) {
    fnCallback = fnCallback || function () {};

    // Access the configuration from ApiClient
    const { baseUrl, version } = ApiClient.config;

    // Check and set the baseUrl if it's undefined
    if (ApiClient.baseUrl === undefined) {
        ApiClient.baseUrl = baseUrl + version.latestVersion;
        ApiClient.request(options, fnCallback);
    } else {
        if (typeof options === "object") {
            options.headers = {
                Authorization: ApiClient.authHeader,
                "Content-Type": "application/json",
                Accept: "application/json",
                client: "npm-rest-client",
                version: packageVersion,
            };
            options.url = ApiClient.baseUrl + options.url;
        }

        logger.info("Api request options", options);
        request(options, function (e, response, body) {
            if (e) {
                logger.error("Error while Api call", e);
            } else if (response.statusCode === 200) {
                try {
                    body = JSON.parse(body);
                    logger.info("Api response json", body);
                    return fnCallback(e, body);
                } catch (e) {
                    logger.error("Error while parsing to json of output response", e);
                }
            }
            return fnCallback(new Error(e || body), null);
        });
    }
};

module.exports = ApiClient;
