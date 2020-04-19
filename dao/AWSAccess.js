const aws = require('aws-sdk');

aws.config = {
    region: "us-east-1",
    accessKeyId: 'AKIATROZW5KTV5NWVG6E',
    secretAccessKey: '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',
    apiVersions: {
        cognitoidentityserviceprovider: '2016-04-18'
    }
};

const poolData = {
    UserPoolId: 'us-east-1_iPhgdkopW',
    ClientId: '2dlb0mog85rvn43g5inhnqb111'
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