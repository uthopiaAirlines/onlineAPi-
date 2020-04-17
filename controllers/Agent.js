'use strict';

var utils = require('../utils/writer.js');
var Agent = require('../service/AgentService');

module.exports.agentsAgentIdAgentDELETE = function agentsAgentIdAgentDELETE (req, res, next, agentId, client) {
  Agent.agentsAgentIdAgentDELETE(agentId, client)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.agentsAgentIdAgentPOST = function agentsAgentIdAgentPOST (req, res, next, agentId, client) {
  Agent.agentsAgentIdAgentPOST(agentId, client)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.agentsGET = function agentsGET (req, res, next) {
  Agent.agentsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
