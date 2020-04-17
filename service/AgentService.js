'use strict';


/**
 * Detach customer from agent
 *
 * agentId Integer 
 * client Integer  (optional)
 * no response value expected for this operation
 **/
exports.agentsAgentIdAgentDELETE = function(agentId,client) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * agentId Integer 
 * client Integer  (optional)
 * no response value expected for this operation
 **/
exports.agentsAgentIdAgentPOST = function(agentId,client) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Show all agents
 *
 * returns User
 **/
exports.agentsGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "",
  "address" : "address",
  "phone" : "phone",
  "name" : "name",
  "userRole" : "Customer",
  "userId" : 0,
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

