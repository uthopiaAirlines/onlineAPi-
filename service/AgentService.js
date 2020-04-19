'use strict';

const agentsDao = require('../dao/AgentDao'),
  awsAccess = require('../dao/AWSAccess'),
  factory = require('../utils/dbConnectionFactory');


/**
 * Detach customer from agent
 *
 * agentId Integer 
 * client Integer  (optional)
 * no response value expected for this operation
 **/
exports.agentsAgentIdAgentDELETE = async (agentId, clientId) => {
  let conn = await factory.conn();
  try {
    await agentsDao.detachClient(conn, agentId, clientId);
  } catch (err) {
    if (!err.hasOwnProperty("code"))
      throw {
        message: err.message,
        code: "#E999"
      }
    else
      throw err;
  } finally {
    await conn.end();
  }
}


/**
 *
 * agentId Integer 
 * client Integer  (optional)
 * no response value expected for this operation
 **/
exports.agentsAgentIdAgentPOST = async (agentId, clientId) => {
  let conn = await factory.conn();
  try {
    await agentsDao.attachClient(conn, agentId, clientId);
  } catch (err) {
    if (!err.hasOwnProperty("code"))
      throw {
        message: err.message,
        code: "#E999"
      }
    else
      throw err;
  } finally {
    await conn.end();
  }
}


/**
 * Show all agents
 *
 * returns User
 **/
exports.agentsGET = async () => {
  try {
    return await awsAccess.findAllAgents();
  } catch (err) {
    if (!err.hasOwnProperty("code"))
      throw {
        message: err.message,
        code: "#E999"
      }
    else
      throw err;
  }
}

