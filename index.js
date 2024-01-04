var lambdaAutomationClient = require("./lib/automation_client");
var lambdaAutomationClientV2 = require("./lib/automation_client_v2");
module.exports = {
    AutomationClient: lambdaAutomationClient.AutomationClient,
    AutomationClientV2: lambdaAutomationClientV2.AutomationClient,
};