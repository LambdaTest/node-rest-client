var ApiClient = require("./api_client");
const _ = require("lodash");

/**
 * AutomationApiClient is a function based Class.
 * @param {!AutomationClient} settings An object that for lambda user credentials
 */
function AutomationApiClient(settings) {
    /**
     * Call ApiClient for Check Required Parameters.
     * @return {Error|null}
     */
    ApiClient.call(this, settings);
}

/**
 * Add this method by Extending ApiClient for fetch builds.
 * @param {!Parameters} params? is Optional queryparams
 * @param {Function} fnCallback is callback function.
 * @return {!<Array>Build|Error} return Builds or Error.
 */
AutomationApiClient.prototype.fetchBuilds = function (params, fnCallback) {
    if (typeof fnCallback === "function") {
        fnCallback = fnCallback || function () {};
        if (typeof params === "function") {
            fnCallback = params;
        }
        params = params || {};

        ApiClient.request(
            {
                url: "/builds",
                qs: params,
            },
            fnCallback
        );
    } else {
        return new Promise((resolve, reject) => {
            params = params || {};
            ApiClient.request(
                {
                    url: "/builds",
                    qs: params,
                },
                function (err, response) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                }
            );
        });
    }
};

/**
 * Add this method by Extending ApiClient for fetch build.
 * @param {!Parameters} buildId Getting details of build by buildId
 * @param {Function} fnCallback is callback function.
 * @return {!Build|Error} return Build or Error.
 */
AutomationApiClient.prototype.fetchBuildById = function (buildId, fnCallback) {
    if (typeof fnCallback === "function") {
        if (typeof buildId === "function") {
            throw new Error("buildId is Required");
        }
        ApiClient.request(
            {
                url: "/builds/" + buildId,
            },
            fnCallback
        );
    } else {
        return new Promise((resolve, reject) => {
            ApiClient.request(
                {
                    url: "/builds/" + buildId,
                },
                function (err, response) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                }
            );
        });
    }
};

/**
 * Add this method by Extending ApiClient for delete build.
 * @param {!Parameters} buildId Delete build by buildId
 * @param {Function} fnCallback is callback function.
 * @return {boolean} If build is deleted successfully then return true otherwise false.
 */
AutomationApiClient.prototype.deleteBuildById = function (buildId, fnCallback) {
    if (typeof fnCallback === "function") {
        if (typeof buildId === "function") {
            throw new Error("buildId is Required");
        }
        ApiClient.request(
            {
                url: "/builds/" + buildId,
                method: "DELETE",
            },
            fnCallback
        );
    } else {
        return new Promise((resolve, reject) => {
            ApiClient.request(
                {
                    url: "/builds/" + buildId,
                    method: "DELETE",
                },
                function (err, response) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                }
            );
        });
    }
};

/**
 * Add this method by Extending ApiClient for update build.
 * @param {string} buildId is Id of Updated build.
 * @param {!Parameters} requestBody Update build with passed requestBody Payload.
 *        For more info of requestBody Payload goto readme.md
 * @param {Function} fnCallback is callback function.
 * @return {boolean} If build is deleted successfully then return true otherwise false.
 */
AutomationApiClient.prototype.updateBuildById = function (buildId, requestBody, fnCallback) {
    if (typeof fnCallback === "function") {
        if (typeof buildId === "function" || typeof buildId === "object") {
            throw new Error("buildId is Required");
        }
        /**
         * Checking validity of requestBody payload.
         * @return {Error|null}
         */
        if (typeof requestBody === "object") {
            // use try-catch Error possible due to json stringify
            try {
                requestBody = JSON.stringify(requestBody);
                ApiClient.request(
                    {
                        url: "/builds/" + buildId,
                        body: requestBody,
                        method: "PATCH",
                    },
                    fnCallback
                );
            } catch (error) {
                return fnCallback(error, null);
            }
        } else {
            throw new Error("It's look like your requestBody Payload is Invalid");
        }
    } else {
        return new Promise((resolve, reject) => {
            if (typeof buildId === "function" || typeof buildId === "object") {
                throw new Error("buildId is Required");
            }
            /**
             * Checking validity of requestBody payload.
             * @return {Error|null}
             */
            if (typeof requestBody === "object") {
                // use try-catch Error possible due to json stringify
                try {
                    requestBody = JSON.stringify(requestBody);
                    ApiClient.request(
                        {
                            url: "/builds/" + buildId,
                            body: requestBody,
                            method: "PATCH",
                        },
                        function (err, response) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(response);
                            }
                        }
                    );
                } catch (err) {
                    reject(err);
                }
            } else {
                throw new Error("It's look like your requestBody Payload is Invalid");
            }
        });
    }
};

/**
 * Add this method by Extending ApiClient for fetch Sessions.
 * @param params? is Optional queryparams
 * @param {Function} fnCallback is callback function.
 * @return {!<Array>Session|Error} return Sessions or Error.
 */
AutomationApiClient.prototype.fetchSessions = function (params, fnCallback) {
    if (typeof params !== "function" && typeof fnCallback !== "function") {
        return new Promise((resolve, reject) => {
            if (typeof params !== "object") {
                params = {};
            }
            ApiClient.request(
                {
                    url: "/sessions",
                    qs: params,
                },
                function (err, response) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                }
            );
        });
    } else if (typeof params === "object" && typeof fnCallback === "function") {
        ApiClient.request(
            {
                url: "/sessions",
                qs: params,
            },
            fnCallback
        );
    } else if (typeof params === "function") {
        fnCallback = params;
        ApiClient.request(
            {
                url: "/sessions",
                qs: {},
            },
            fnCallback
        );
    } else {
        return new Promise((resolve, reject) => {
            params = {};
            ApiClient.request(
                {
                    url: "/sessions",
                    qs: params,
                },
                function (err, response) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                }
            );
        });
    }
};

/**
 * Add this method by Extending ApiClient for fetch Session.
 * @param {!Parameters} sessionId Getting details of session by sessionId
 * @param {Function} fnCallback is callback function.
 * @return {!Session|Error} return Session or Error.
 */
AutomationApiClient.prototype.fetchSessionById = function (sessionId, fnCallback) {
    if (typeof sessionId === "function" || typeof sessionId === "object") {
        throw new Error("sessionId is Required");
    }
    if (typeof fnCallback === "function") {
        ApiClient.request(
            {
                url: "/sessions/" + sessionId,
            },
            fnCallback
        );
    } else {
        return new Promise((resolve, reject) => {
            ApiClient.request(
                {
                    url: "/sessions/" + sessionId,
                },
                function (err, response) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                }
            );
        });
    }
};

/**
 * Add this method by Extending ApiClient for delete session.
 * @param {!Parameters} sessionId Required
 * @param {Function} fnCallback is callback function.
 * @return {boolean} If session is deleted successfully then return true otherwise false.
 */
AutomationApiClient.prototype.deleteSessionById = function (sessionId, fnCallback) {
    if (typeof sessionId === "function" || typeof sessionId === "object") {
        throw new Error("sessionId is Required");
    }
    if (typeof fnCallback === "function") {
        ApiClient.request(
            {
                url: "/sessions/" + sessionId,
                method: "DELETE",
            },
            fnCallback
        );
    } else {
        return new Promise((resolve, reject) => {
            ApiClient.request(
                {
                    url: "/sessions/" + sessionId,
                    method: "DELETE",
                },
                function (err, response) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                }
            );
        });
    }
};

/**
 * Add this method by Extending ApiClient for Update session.
 * @param {!Parameters} sessionId Update session by sessionId with passed requestBody Payload.
 *        For more info of requestBody Payload goto readme.md
 * @param {Function} fnCallback is callback function.
 * @return {boolean} If session is deleted successfully then return true otherwise false.
 */
AutomationApiClient.prototype.updateSessionById = function (sessionId, requestBody, fnCallback) {
    if (typeof sessionId === "function" || typeof sessionId === "object") {
        throw new Error("sessionId is Required");
    }
    /**
     * Checking validity of requestBody payload.
     * @return {Error|null}
     */
    if (requestBody === null || requestBody === undefined) {
        throw new Error("It's look like your requestBody Payload is Invalid");
    }
    if (typeof fnCallback === "function") {
        try {
            requestBody = JSON.stringify(requestBody);
            ApiClient.request(
                {
                    url: "/sessions/" + sessionId,
                    body: requestBody,
                    method: "PATCH",
                },
                fnCallback
            );
        } catch (error) {
            return fnCallback(error, null);
        }
    } else {
        return new Promise((resolve, reject) => {
            // use try-catch Error possible due to json stringify
            try {
                requestBody = JSON.stringify(requestBody);
                ApiClient.request(
                    {
                        url: "/builds/" + buildId,
                        body: requestBody,
                        method: "PATCH",
                    },
                    function (err, response) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(response);
                        }
                    }
                );
            } catch (err) {
                reject(err);
            }
        });
    }
};

/**
 * Add this method by Extending ApiClient for fetch Screenshots of Session.
 * @param {string} sessionId Getting Screenshots of session by sessionId
 * @param {Function} fnCallback is callback function.
 * @return {!<Array>Screenshot|Error} return Screenshots or Error.
 */
AutomationApiClient.prototype.fetchSessionScreenshot = function (sessionId, fnCallback) {
    fnCallback = fnCallback || function () {};
    if (typeof sessionId === "function" || typeof sessionId === "object") {
        throw new Error("sessionId is Required");
    }
    ApiClient.request(
        {
            url: "/sessions/" + sessionId + "/screenshots",
        },
        fnCallback
    );
};

/**
 * Add this method by Extending ApiClient for fetch Videos of Session.
 * @param {string} sessionId Getting Video of session by sessionId
 * @param {Function} fnCallback is callback function.
 * @return {!<Array>Video|Error} return Videos or Error.
 */
AutomationApiClient.prototype.fetchSessionVideo = function (sessionId, fnCallback) {
    fnCallback = fnCallback || function () {};
    if (typeof sessionId === "function" || typeof sessionId === "object") {
        throw new Error("sessionId is Required");
    }
    ApiClient.request(
        {
            url: "/sessions/" + sessionId + "/video",
        },
        fnCallback
    );
};

/**
 * Add this method by Extending ApiClient for fetch Command Logs of Session.
 * @param {string} sessionId Getting Command Logs of session by sessionId
 * @param {Function} fnCallback is callback function.
 * @return {!<Array>CommandLog|Error} return CommandLogs or Error.
 */
AutomationApiClient.prototype.fetchSessionCommandLogs = function (sessionId, fnCallback) {
    fnCallback = fnCallback || function () {};
    if (typeof sessionId === "function" || typeof sessionId === "object") {
        throw new Error("sessionId is Required");
    }
    ApiClient.request(
        {
            url: "/sessions/" + sessionId + "/log/command",
        },
        fnCallback
    );
};

/**
 * Add this method by Extending ApiClient for fetch Selenium Logs of Session.
 * @param {string} sessionId Getting Selenium Logs of session by sessionId
 * @param {Function} fnCallback is callback function.
 * @return {!<Array>SeleniumLog|Error} return Selenium Logs or Error.
 */
AutomationApiClient.prototype.fetchSessionSeleniumLogs = function (sessionId, fnCallback) {
    fnCallback = fnCallback || function () {};
    if (typeof sessionId === "function" || typeof sessionId === "object") {
        throw new Error("sessionId is Required");
    }
    ApiClient.request(
        {
            url: "/sessions/" + sessionId + "/log/selenium",
        },
        fnCallback
    );
};

/**
 * Add this method by Extending ApiClient for fetch Network Logs of Session.
 * @param {string} sessionId Getting Network Logs of session by sessionId
 * @param {Function} fnCallback is callback function.
 * @return {!<Array>NetworkLog|Error} return Network Logs or Error.
 */
AutomationApiClient.prototype.fetchSessionNetworkLogs = function (sessionId, fnCallback) {
    fnCallback = fnCallback || function () {};
    if (typeof sessionId === "function" || typeof sessionId === "object") {
        throw new Error("sessionId is Required");
    }
    ApiClient.request(
        {
            url: "/sessions/" + sessionId + "/log/network",
        },
        fnCallback
    );
};

/**
 * Add this method by Extending ApiClient for fetch Console Logs of Session.
 * @param {string} sessionId Getting Console Logs of session by sessionId
 * @param {Function} fnCallback is callback function.
 * @return {!<Array>ConsoleLog|Error} return Console Logs or Error.
 */
AutomationApiClient.prototype.fetchSessionConsoleLogs = function (sessionId, fnCallback) {
    fnCallback = fnCallback || function () {};
    if (typeof sessionId === "function" || typeof sessionId === "object") {
        throw new Error("sessionId is Required");
    }
    ApiClient.request(
        {
            url: "/sessions/" + sessionId + "/log/console",
        },
        fnCallback
    );
};

/**
 * Add this method by Extending ApiClient for fetch running Tunnels.
 * @param {Function} fnCallback is callback function.
 * @return {!<Array>Tunnel|Error} return Tunnels or Error.
 */
AutomationApiClient.prototype.fetchTunnels = function (fnCallback) {
    fnCallback = fnCallback || function () {};
    ApiClient.request(
        {
            url: "/tunnels",
        },
        fnCallback
    );
};

/**
 * Add this method by Extending ApiClient for delete tunnel.
 * @param {!Parameters} tunnelId Required
 * @param {Function} fnCallback is callback function.
 * @return {boolean} If tunnel is deleted successfully then return true otherwise false.
 */
AutomationApiClient.prototype.deleteTunnelById = function (tunnelId, fnCallback) {
    fnCallback = fnCallback || function () {};
    if (typeof tunnelId === "function" || typeof tunnelId === "object") {
        throw new Error("tunnelId is Required");
    }
    ApiClient.request(
        {
            url: "/tunnels/" + tunnelId,
            method: "DELETE",
        },
        fnCallback
    );
};

/**
 * Add this method by Extending ApiClient for fetch Platforms.
 * @param {Function} fnCallback is callback function.
 * @return {!<Array>Platform|Error} return Platforms or Error.
 */
AutomationApiClient.prototype.fetchPlatforms = function (fnCallback) {
    fnCallback = fnCallback || function () {};
    ApiClient.request(
        {
            url: "/platforms",
        },
        fnCallback
    );
};

/**
 * Add this method by Extending ApiClient for fetch sessions of latest build.
 * @param {params} params is an object.
 * @return {Object} return object of session listing.
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
    if (!params) {
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
        var sessionData = await this.fetchSessions(sessionParams);
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
 * @return {!<Array>ConsoleLog|Error} return Console Logs or Error.
 */
AutomationApiClient.prototype.fetchCyEnhancedReport = function (testID, fnCallback) {
    if (typeof testID === "function" || typeof testID === "object") {
        throw new Error("testID is Required");
    }
    if (typeof fnCallback === "function") {
        ApiClient.request(
            {
                url: "/cypress/mochawesome/enhanced/" + testID,
                method: "GET",
            },
            fnCallback
        );
    } else {
        return new Promise((resolve, reject) => {
            ApiClient.request(
                {
                    url: "/cypress/mochawesome/enhanced/" + testID,
                    method: "GET",
                },
                function (err, response) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                }
            );
        });
    }
};

module.exports = {
    AutomationClient: function (settings) {
        return new AutomationApiClient(settings);
    },
};
