var request = require("request"),
    logger,
    packageVersion = require("../package.json").version;

/**
 * ApiClient is a function based Class.
 * @param {!AutomationApiClient} settings An object that for lambda user credentials
 */
var ApiClient = function (settings) {
    settings = settings || {};

    /**
    * Region validation
    * @return {Error|null}
    */
    const region = (settings.region || "us").toLowerCase();
    if (!["us", "eu"].includes(region)) {
        throw new Error("Region is invalid.");
    }

    // Load region-specific config and attach it to ApiClient
    ApiClient.config = require(`./config.${region}`);

    /**
     * Required check for username.
     * @return {Error|null}
     */
    if (!settings.username) {
        throw new Error("Username is required.");
    }

    /**
     * Required check for accessKey.
     * @return {Error|null}
     */
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

/**
 * Extends ApiClient Class with static method for all Api Request.
 * @param {!ApiClient} options An object that determine the Request payload
 * @param {Function} fnCallback is callback function.
 * @return {Function|Error} return response to Callable method or throw Error.
 */
ApiClient.request = function (options, fnCallback) {
     /** Initialize Callback function is not there */
    fnCallback = fnCallback || function () {};

    // Access the configuration from ApiClient
    const { baseUrl, version } = ApiClient.config;

    // Check and set the baseUrl if it's undefined
    if (ApiClient.baseUrl === undefined) {
        ApiClient.baseUrl = baseUrl + version.latestVersion;
        ApiClient.request(options, fnCallback);
    } else {
        /** Update Options with User Credential If It is object */
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

         /** For Debbuging purpose log Request Payload */
        logger.info("Api request options", options);
        request(options, function (e, response, body) {
            if (e) {
                logger.error("Error while Api call", e);
            } else if (response.statusCode === 200) {
                // use try-catch Error possible due to json parse of non-parseable
                try {
                    body = JSON.parse(body);
                    logger.info("Api response json :", body);
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
