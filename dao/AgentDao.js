agentsDao = {
    // findAll(conn){
    //     return conn.execute('SELECT * FROM ')
    // }
    detachClient(conn, agentId, clientId) {
        return conn.execute('DELETE FROM agentRegistration WHERE agent = ? AND client = ? ;', [agentId, clientId]);
    },
    attachClient(conn, agentId, clientId) {
        return conn.execute('INSERT INTO agentRegistration (agent, client) VALUES (?,?);', [agentId, clientId]);
    }

};

module.exports = agentsDao;