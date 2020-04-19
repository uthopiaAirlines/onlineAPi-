const aws = require('aws-sdk');

aws.config = {
    region: "#####################",
    accessKeyId: '################################',
    secretAccessKey: '######################################',
    apiVersions: {
        cognitoidentityserviceprovider: '2016-04-18'
    }
};

const poolData = {
    UserPoolId: '############################',
    ClientId: '#########################################'
}

module.exports.findAllAgents = async () => {
    let cognitoidentityserviceprovider;
    try {
        let agentGroup = {
            GroupName: "Agent",
            UserPoolId: poolData.UserPoolId
        }
        cognitoidentityserviceprovider = await new aws.CognitoIdentityServiceProvider(poolData);
        return await cognitoidentityserviceprovider.listUsersInGroup(agentGroup).promise();
    } catch (err) {
        console.log(err);
        throw {
            code: "#E451",
            message: "Error Connecting With AWS Cognito Server"
        }
    } finally {
        try {
            await cognitoidentityserviceprovider.deleteIdentityProvider().promise();
        } catch (err) {
            console.log(err);
        }
    }
}
