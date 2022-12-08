const ApiClient = require("./api_client");
const _ = require("lodash");
const fetch = require("./fetch");

/**
 * AutomationApiClient is a function based Class.
 * @param {Parameters<typeof ApiClient>} settings An object that for lambda user credentials
 */
function AutomationApiClient(settings) {
    /**
     * Call ApiClient for Check Required *.
     * @return {Error|null}
     */
    ApiClient.call(this, settings);
}

/**
 * Add this method by Extending ApiClient for fetch builds.
 * @param {*=} params Optional queryparams
 * @param {Function=} fnCallback is callback function.
 * @return {!Array<any>|Error} return Builds or Error.
 */
AutomationApiClient.prototype.fetchBuilds = function (params, fnCallback) {
    if (typeof params !== "object") {
        params = {};
    }
    const options = { url: "/builds", qs: params };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for fetch build.
 * @param {*} buildId Getting details of build by buildId
 * @param {Function} fnCallback is callback function.
 * @return {any|Error} return Build or Error.
 */
AutomationApiClient.prototype.fetchBuildById = function (buildId, fnCallback) {
    if (typeof buildId !== "string") {
        throw new Error("buildId is Required");
    }
    const options = { path: "builds", id: buildId };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for delete build.
 * @param {*} buildId Delete build by buildId
 * @param {Function} fnCallback is callback function.
 * @return {boolean} If build is deleted successfully then return true otherwise false.
 */
AutomationApiClient.prototype.deleteBuildById = function (buildId, fnCallback) {
    if (typeof buildId !== "string") {
        throw new Error("buildId is Required");
    }
    const options = {
        id: buildId,
        path: "builds",
        method: "DELETE",
    };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for update build.
 * @param {string} buildId is Id of Updated build.
 * @param {*} requestBody Update build with passed requestBody Payload.
 *        For more info of requestBody Payload goto readme.md
 * @param {Function} fnCallback is callback function.
 * @return {void|Promise<boolean>} If build is deleted successfully then return true otherwise false.
 */
AutomationApiClient.prototype.updateBuildById = function (buildId, requestBody, fnCallback) {
    if (typeof buildId !== "string") {
        throw new Error("buildId is Required");
    }
    if (typeof requestBody !== "object") {
        throw new Error("It's look like your requestBody Payload is Invalid");
    }
    let body;
    try {
        body = JSON.stringify(requestBody);
    } catch (error) {
        if (typeof fnCallback === "function") {
            return fnCallback(error);
        }
        throw error;
    }
    const options = {
        id: buildId,
        path: "builds",
        method: "PATCH",
        body,
    };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for fetch Sessions.
 * @param params? is Optional queryparams
 * @param {Function=} fnCallback is callback function.
 * @return {!Array<any>|Error} return Sessions or Error.
 */
AutomationApiClient.prototype.fetchSessions = function (params, fnCallback) {
    if (typeof params !== "object") {
        params = {};
    }
    const options = { url: "/sessions", qs: params };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for fetch Session.
 * @param {string} sessionId Getting details of session by sessionId
 * @param {Function} fnCallback is callback function.
 * @return {any|Error} return Session or Error.
 */
AutomationApiClient.prototype.fetchSessionById = function (sessionId, fnCallback) {
    if (typeof sessionId !== "string") {
        throw new Error("sessionId is Required");
    }
    const options = { id: sessionId, path: "sessions" };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for delete session.
 * @param {*} sessionId Required
 * @param {Function} fnCallback is callback function.
 * @return {boolean} If session is deleted successfully then return true otherwise false.
 */
AutomationApiClient.prototype.deleteSessionById = function (sessionId, fnCallback) {
    if (typeof sessionId !== "string") {
        throw new Error("sessionId is Required");
    }
    const options = {
        id: sessionId,
        path: "sessions",
        method: "DELETE"
    };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for Update session.
 * @param {*} sessionId Update session by sessionId with passed requestBody Payload.
 *        For more info of requestBody Payload goto readme.md
 * @param {Function} fnCallback is callback function.
 * @return {boolean} If session is deleted successfully then return true otherwise false.
 */
AutomationApiClient.prototype.updateSessionById = function (sessionId, requestBody, fnCallback) {
    if (typeof sessionId !== "string") {
        throw new Error("sessionId is Required");
    }
    if (typeof requestBody !== "object") {
        throw new Error("It's look like your requestBody Payload is Invalid");
    }
    let body;
    try {
        body = JSON.stringify(requestBody);
    } catch (error) {
        if (typeof fnCallback === "function") {
            return fnCallback(error);
        }
        throw error;
    }
    const options = {
        id: sessionId,
        path: "sessions",
        method: "PATCH",
        body,
    };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for fetch Screenshots of Session.
 * @param {string} sessionId Getting Screenshots of session by sessionId
 * @param {Function} fnCallback is callback function.
 * @return {!Array<any>|Error} return Screenshots or Error.
 */
AutomationApiClient.prototype.fetchSessionScreenshot = function (sessionId, fnCallback) {
    if (typeof sessionId !== "string") {
        throw new Error("sessionId is Required");
    }
    const options = { url: `/sessions/${sessionId}/screenshots` };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for fetch Videos of Session.
 * @param {string} sessionId Getting Video of session by sessionId
 * @param {Function} fnCallback is callback function.
 * @return {!Array<any>|Error} return Videos or Error.
 */
AutomationApiClient.prototype.fetchSessionVideo = function (sessionId, fnCallback) {
    if (typeof sessionId !== "string") {
        throw new Error("sessionId is Required");
    }
    const options = { url: `/sessions/${sessionId}/video` };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for fetch Command Logs of Session.
 * @param {string} sessionId Getting Command Logs of session by sessionId
 * @param {Function} fnCallback is callback function.
 * @return {!Array<string>|Error} return CommandLogs or Error.
 */
AutomationApiClient.prototype.fetchSessionCommandLogs = function (sessionId, fnCallback) {
    if (typeof sessionId !== "string") {
        throw new Error("sessionId is Required");
    }
    const options = { url: `/sessions/${sessionId}/log/command` };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for fetch Selenium Logs of Session.
 * @param {string} sessionId Getting Selenium Logs of session by sessionId
 * @param {Function} fnCallback is callback function.
 * @return {!Array<string>|Error} return Selenium Logs or Error.
 */
AutomationApiClient.prototype.fetchSessionSeleniumLogs = function (sessionId, fnCallback) {
    if (typeof sessionId !== "string") {
        throw new Error("sessionId is Required");
    }
    const options = { url: `/sessions/${sessionId}/log/selenium` };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for fetch Network Logs of Session.
 * @param {string} sessionId Getting Network Logs of session by sessionId
 * @param {Function} fnCallback is callback function.
 * @return {!Array<string>|Error} return Network Logs or Error.
 */
AutomationApiClient.prototype.fetchSessionNetworkLogs = function (sessionId, fnCallback) {
    if (typeof sessionId !== "string") {
        throw new Error("sessionId is Required");
    }
    const options = { url: `/sessions/${sessionId}/log/network` };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for fetch Console Logs of Session.
 * @param {string} sessionId Getting Console Logs of session by sessionId
 * @param {Function} fnCallback is callback function.
 * @return {!Array<string>|Error} return Console Logs or Error.
 */
AutomationApiClient.prototype.fetchSessionConsoleLogs = function (sessionId, fnCallback) {
    if (typeof sessionId !== "string") {
        throw new Error("sessionId is Required");
    }
    const options = { url: `/sessions/${sessionId}/log/console` };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for fetch running Tunnels.
 * @param {Function} fnCallback is callback function.
 * @return {!Array<any>|Error} return Tunnels or Error.
 */
AutomationApiClient.prototype.fetchTunnels = function (fnCallback) {
    const options = { url: "/sessions" };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for delete tunnel.
 * @param {*} tunnelId Required
 * @param {Function} fnCallback is callback function.
 * @return {boolean} If tunnel is deleted successfully then return true otherwise false.
 */
AutomationApiClient.prototype.deleteTunnelById = function (tunnelId, fnCallback) {
    if (typeof tunnelId !== "string") {
        throw new Error("tunnelId is Required");
    }
    const options = {
        id: tunnelId,
        path: "tunnels",
        method: "DELETE"
    };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for fetch Platforms.
 * @param {Function} fnCallback is callback function.
 * @return {!Array<any>|Error} return Platforms or Error.
 */
AutomationApiClient.prototype.fetchPlatforms = function (fnCallback) {
    const options = { url: "/platforms" };
    return fetch(options, fnCallback);
};

/**
 * Add this method by Extending ApiClient for fetch sessions of latest build.
 * @param {*} params is an object.
 * @return {Promise<Object>} return object of session listing.
 */
AutomationApiClient.prototype.getSessionsOfBuild = async function (params) {
    // structure of response
    // const data = {
    //     success,
    //     error,
    //     msg
    //     data,
    // };

    // fetching top builds sorted by descending order of their build ids
    if (typeof params !== "object") {
        return {
            success: false,
            error: "Build/Session params are required",
            msg: "",
            data: {},
        };
    }

    // check for mandatory parameters
    if (!params.buildName) {
        return {
            success: false,
            error: "Build name is required",
            msg: "",
            data: {},
        };
    }

    let buildParams = {
        limit: params.buildLimit || 20,
        sort: "desc.build_id",
    };

    let builds = {};
    try {
        builds = await this.fetchBuilds(buildParams);
    } catch (error) {
        console.error("Error fetching listing of builds --> ", error);
        return {
            success: false,
            error: "Unable to fetch build listing",
            msg: "",
            data: {},
        };
    }

    if (!builds.data || _.isEmpty(builds.data)) {
        return {
            success: false,
            error: "No build data found",
            msg: "",
            data: {},
        };
    }

    // fetch the build based on the build name passed
    const buildDetails = builds.data.filter((elem) => {
        return elem.name === params.buildName;
    });

    if (_.isEmpty(buildDetails)) {
        return {
            success: true,
            error: "",
            msg: `No build found with ${params.buildName} as name`,
            data: {},
        };
    }

    // session params
    let sessionParams = {
        build_id: buildDetails[0].build_id,
        limit: 1000,
    };

    if (params.sessionParams && _.isObject(params.sessionParams)) {
        sessionParams = {
            ...sessionParams,
            ...params.sessionParams,
        };
    }

    // fetch session details
    try {
        const sessionData = await this.fetchSessions(sessionParams);
        return {
            success: true,
            error: "",
            msg: "session listing retrieved",
            data: sessionData,
        };
    } catch (err) {
        console.error("Error fetching listing of sessions --> ", err);
        return {
            success: false,
            error: `Unable to fetch session listing for build id ${sessionParams.build_id}`,
            msg: "",
            data: {},
        };
    }
};
/**
 * Add this method by Extending ApiClient for fetching enhanced cypress test report.
 * @param {string} testID Test ID whose report is to be found
 * @param {Function} fnCallback is callback function.
 * @return {!Array<string>|Error} return Console Logs or Error.
 */
AutomationApiClient.prototype.fetchCyEnhancedReport = function (testID, fnCallback) {
    if (typeof testID !== "string") {
        throw new Error("testID is Required");
    }
    const options = {
        url: "/cypress/mochawesome/enhanced/" + testID,
        method: "GET",
    };
    return fetch(options, fnCallback);
};

module.exports = {
    AutomationClient: function (settings) {
        return new AutomationApiClient(settings);
    },
};
