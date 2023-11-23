const ApiClient = require("./api_client");

function ApiClientInstance(settings) {
    // Create an instance of ApiClient
    const apiClient = new ApiClient(settings);

    this.fetchBuilds = async function(params) {
        return await apiClient.makeRequest('GET', '/builds', null, params);
    };

    this.fetchBuildById = async function(buildId) {
        if(!buildId) {
            throw new Error('buildId is not found');
        }
        return await apiClient.makeRequest('GET', `/builds/${buildId}`);
    };

    this.deleteBuildById =  async function(buildId) {
        if(!buildId) {
            throw new Error('buildId is not found');
        }
        return await apiClient.makeRequest('DELETE', `/builds/${buildId}`);
    };

    this.updateBuildById =  async function(buildId, requestBody) {
        if(!buildId || !requestBody) {
            throw new Error('buildId || requestBody is not found');
        }
        return await apiClient.makeRequest('PATCH', `/builds/${buildId}`, requestBody);
    };

    this.fetchSessions = async function(params) {
        return await apiClient.makeRequest('GET', '/sessions', null, params);
    };

    this.fetchSessionById =  async function(sessionId) {
        if(!sessionId) {
            throw new Error('session Id not correct');
        }
        return await apiClient.makeRequest('GET', `/sessions/${sessionId}`);
    };

    this.deleteSessionById =  async function(sessionId) {
        if(!sessionId) {
            throw new Error('session Id not correct');
        }
        return await apiClient.makeRequest('DELETE', `/sessions/${sessionId}`);
    };

    this.updateSessionById =  async function(sessionId, requestBody) {
        if(!sessionId || !requestBody) {
            throw new Error('session Id || requestBody not correct');
        }
        return await apiClient.makeRequest('PATCH', `/sessions/${sessionId}`, requestBody);
    };

    this.fetchSessionScreenshot =  async function(sessionId) {
        if(!sessionId) {
            throw new Error('session Id not correct');
        }
        return await apiClient.makeRequest('GET', `/sessions/${sessionId}/screenshots`);
    };

    this.fetchSessionVideo =  async function(sessionId) {
        if(!sessionId) {
            throw new Error('session Id not correct');
        }
        return await apiClient.makeRequest( 'GET', `/sessions/${sessionId}/video`);
    };

    this.fetchSessionCommandLogs = async function(sessionId) {
        if(!sessionId) {
            throw new Error('session Id not correct');
        }
        return await apiClient.makeRequest('GET', `/sessions/${sessionId}/log/command`);
    };

    this.fetchSessionSeleniumLogs = async function(sessionId) {
        if(!sessionId) {
            throw new Error('session Id not correct');
        }
        return await apiClient.makeRequest( 'GET', `/sessions/${sessionId}/log/selenium`);
    };

    this.fetchSessionNetworkLogs = async function(sessionId) {
        if(!sessionId) {
            throw new Error('session Id not correct');
        }
        return await apiClient.makeRequest('GET', `/sessions/${sessionId}/log/network`);
    };

    this.fetchSessionConsoleLogs = async function(sessionId) {
        if(!sessionId) {
            throw new Error('session Id not correct');
        }
        return await apiClient.makeRequest('GET', `/sessions/${sessionId}/log/console`);
    };

    this.fetchTunnels= async function() {
        return await apiClient.makeRequest('GET', '/tunnels');
    };

    this.deleteTunnelById = async function(tunnelId) {
        if(!tunnelId) {
            throw new Error('tunnel Id not correct');
        }
        return await apiClient.makeRequest('DELETE', `/tunnels/${tunnelId}`);
    };

    this.fetchPlatforms= async function() {
        return await apiClient.makeRequest('GET', '/platforms');
    };

}

module.exports = {
    AutomationClient: function (settings) {
        return new ApiClientInstance(settings);
    },
};
