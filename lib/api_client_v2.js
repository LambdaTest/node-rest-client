const axios = require('axios');
const packageVersion = require("../package.json").version;
let logger;

var ApiClient = function (settings) {
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

    const region = settings.region || "us";

    /**
    * Region validation
    * @return {Error|null}
    */
    if (!["us", "eu"].includes(region)) {
        throw new Error("Region is invalid.");
    }

    const { version, appVersion, baseUrl, baseUrlApp } = require(`./ config.${region}`);

    logger.info("Imported ApiClient and User Credenetials", settings);
    ApiClient.basicAuth = "Basic " + Buffer.from(settings.username + ":" + settings.accessKey).toString("base64");

    ApiClient.apiBaseUrl = settings.isApp ? baseUrlApp + appVersion.latestVersion : baseUrl + version.latestVersion;

    this.makeRequest = async function (method, path, body = null, params = {}) {
        // Validate path
        if (!path) {
            throw new Error('Path is required');
        }

        // Use instance-specific baseUrl
        const url = `${ApiClient.apiBaseUrl}${path}`;

        // Prepare request options
        const options = {
            method: method,
            headers: { Authorization: ApiClient.basicAuth },
            url: url,
        };


        if (body) options.data = JSON.stringify(body);
        if (Object.keys(params).length) options.params = params;

        logger.info("Api request options ", options);
        // Axios request
        try {
            const response = await axios(options);
            return response.data;
        } catch (error) {
            logger.error("Error ", error);
            throw error;
        }
    };

};
module.exports = ApiClient;

