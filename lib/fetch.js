const ApiClient = require("./api_client");

/**
 * @param {*} options
 * @param {Function=} fnCallback
 * @returns {any | Promise<any>}
 */
function fetch(options, fnCallback) {
    if (!options) {
        throw new Error("First argument must be an options object");
    }
    const { id, path, method, body, qs, url: requestUrl } = options;
    if (!(requestUrl || (path && id))) {
        throw new Error("Missing required parameters: url or path & id");
    }
    const url = requestUrl ?? `/${path}/${id}`;
    if (typeof fnCallback === "function") {
        ApiClient.request({ url, method, body, qs }, fnCallback);
    } else {
        return new Promise((resolve, reject) => {
            ApiClient.request({ url, method, body, qs }, (err, response) => {
                if (err) return reject(err);
                return resolve(response);
            });
        });
    }
}

module.exports = fetch;
