var request = require("request"),
  logger,
  Config = require("./config");

/**
 * Operates on an instance of ApiClient and returns latest version and list of supported versions.
 * @param {!AutomationApiClient} settings An object that for lambda user credentials
 *     explanation that spans multiple lines.
 * @param {number} retries for max attemt to fetch
 * @param {Function} fnCallback is callback function.
 * @return {Function|Error} return version that is supported by lambdaTest Rest Client e.g. v1, v2 etc.
 */
var fetchApiVersions_ = function(settings, retries, fnCallback) {
  /** Check left retries */
  if (retries >= 0) {
    request(Config.httpApiVersionPath, function(e, response, body) {
      if (e) {
        logger.error("Error while fetching version from server path ", e);
        fetchApiVersions_(settings, retries - 1, fnCallback);
      } else {
        /** use try-catch Possibly Error due to json parse of non-parseable */
        try {
          body = JSON.parse(body);
          /** Check for supportedVersions list is there */
          if (body.supportedVersions && body.supportedVersions.length) {
            /** Check Requester request for version and exist in supportedVersions list  */
            if (settings.version) {
              if (body.supportedVersions.indexOf(settings.version) === -1) {
                return fnCallback(true, null);
              } else {
                return fnCallback(false, settings.version);
              }
            } else {
              return fnCallback(false, body.latestVersion);
            }
          } else {
            fetchApiVersions_(settings, retries - 1, fnCallback);
          }
        } catch (e) {
          logger.error(
            "Error while parse to json of output response of versions json path ",
            e
          );
          /** Re-Attemp to fetch If getting Error */
          fetchApiVersions_(settings, retries - 1, fnCallback);
        }
      }
    });
  } else {
    return fnCallback(true, null);
  }
};

/**
 * ApiClient is a function based Class.
 * @param {!AutomationApiClient} settings An object that for lambda user credentials
 */
var ApiClient = function(settings) {
  settings = settings || { };
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
  if(!logger) {
    logger = require("./logger")(settings.logFile);
  }
  logger.info("Imported ApiClient and User Credenetials", settings);
  ApiClient.authHeader =
    "Basic " +
    Buffer.from(settings.username + ":" + settings.accessKey).toString(
      "base64"
    );
  ApiClient.settings = settings;
};

/**
 * Extends ApiClient Class with static method for all Api Request.
 * @param {!ApiClient} options An object that determine the Request payload
 * @param {Function} fnCallback is callback function.
 * @return {Function|Error} return response to Callable method or throw Error.
 */
ApiClient.request = function(options, fnCallback) {
  /** Initialize Callback function is not there */
  fnCallback = fnCallback || function() {};
  /** Check baseUrl is on ApiClient */
  if (ApiClient.baseUrl === undefined) {
    /** Calling method for Update baseUrl and Request pass to Server for Getting Response
     * @return {Function|Error} return response to Callable method or throw Error.
     */
    fetchApiVersions_(ApiClient.settings, 5, function(e, response) {
      if (e) {
        logger.error("Error while fetching Versions", e);
        throw new Error("Invalid Api version");
      } else {
        ApiClient.baseUrl = Config.baseUrl + response;
        ApiClient.request(options, fnCallback);
      }
    });
  } else {
    /** Update Options with User Credential If It is object */
    if (typeof options === "object") {
      options.headers = {
        Authorization: ApiClient.authHeader,
        "Content-Type": "application/json",
        Accept: "application/json"
      };
      options.url = ApiClient.baseUrl + options.url;
    }
    /** For Debbuging purpose log Request Payload */
    logger.info("Api request options ", options);
    request(options, function(e, response, body) {
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
