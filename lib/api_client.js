const { version, appVersion, baseUrl, baseUrlApp } = require("./config");

const request = require("request");
const packageVersion = require("../package.json").version;
let logger;

/**
 * ApiClient is a function based Class.
 * @param {Object} settings An object that for lambda user credentials
 * @param {string} settings.username LambdaTest Username
 * @param {string} settings.accessKey LambdaTest Access Key
 * @param {string=} settings.logFile Path to log file
 * @param {boolean=} settings.isApp
 */
const ApiClient = function (settings) {
    settings = settings || {};
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
    logger.info("Imported ApiClient and User Credenetials", settings);
    ApiClient.authHeader =
        "Basic " + Buffer.from(settings.username + ":" + settings.accessKey).toString("base64");
    ApiClient.settings = settings;

    if (settings.isApp) {
        ApiClient.baseUrl = baseUrlApp + appVersion.latestVersion;
    }
};

/**
 * Extends ApiClient Class with static method for all Api Request.
 * @param {request.OptionsWithUrl} options An object that determine the Request payload
 * @param {Function} fnCallback is callback function.
 * @return return response to Callable method or throw Error.
 */
ApiClient.request = function (options, fnCallback) {
    /** Initialize Callback function is not there */
    fnCallback = fnCallback || function () {};
    /** Check baseUrl is on ApiClient */
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
        logger.info("Api request options ", options);
        request(options, function (e, response, body) {
            if (e) {
                logger.error("Error while Api call of ", e);
            } else if (response.statusCode === 200) {
                // use try-catch Error possible due to json parse of non-parseable
                try {
                    body = JSON.parse(body);
                    logger.info("Api response json : ", body);
                    return fnCallback(e, body);
                } catch (e) {
                    logger.error("Error while parse to json of output response ", e);
                }
            }
            return fnCallback(new Error(e || body), null);
        });
    }
};

module.exports = ApiClient;
