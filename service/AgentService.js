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
    let result = await awsAccess.findAllAgents();
    return formatAgents(result);
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

exports.agentsGetByUser = async (clientId) => {
  let conn = await factory.conn();
  try {
    let [result] = await agentsDao.findAgentsByUsers(conn, clientId);
    return result;
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

let formatAgents = (agents) => {
  try {
    let formatedAgents = new Array;
    agents.Users.forEach(agent => {
      let formatted = { username: agent.Username };
      agent.Attributes.forEach(attribute => {
        if (attribute.Name == "sub")
          formatted.sub = attribute.Value;
        if (attribute.Name == "email")
          formatted.email = attribute.Value;
        if (attribute.Name == "phone_number")
          formatted.phone = attribute.Value;
      });
      formatedAgents.push(formatted);
    });
    return formatedAgents;

  } catch (err) {
    throw {
      message: "Unable To Process Agents",
      code: "#E369"
    };
  }
}

