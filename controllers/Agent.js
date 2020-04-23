'use strict';

const routers = require('express').Router(),
  agent = require('../service/AgentService');

routers.delete('/agents/:agentId/client/:clientId', async (req, res) => {
  try {
    let result = await agent.agentsAgentIdAgentDELETE(req.params.agentId, req.params.clientId);
    res.status(200);
    res.send(result);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
})

routers.post('/agents/:agentId/client/:clientId', async (req, res) => {
  try {
    let result = await agent.agentsAgentIdAgentPOST(req.params.agentId, req.params.clientId);
    res.status(200);
    res.send(result);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
})

routers.get('/agents', async (req, res) => {
  try {
    let result = agent.agentsGET();
    res.status(200);
    res.send(result);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
})

module.exports = routers;