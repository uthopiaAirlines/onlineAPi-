agentsDao = {
    detachClient(conn, agentId, clientId) {
        return conn.execute('DELETE FROM agentRegistration WHERE agent = ? AND client = ? ;', [agentId, clientId]);
    },
    attachClient(conn, agentId, clientId) {
        return conn.execute('INSERT INTO agentRegistration (agent, client) VALUES (?,?);', [agentId, clientId]);
    },
    findAgentsByUsers(conn, clientId) {
        return conn.execute('SELECT agent FROM agentRegistration where client = ? ;', [clientId]);
    }
};

module.exports = agentsDao;