import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_UyZ4dCS3y',
    userPoolWebClientId: '6jatj9hu0vfq15mfvlqdmna4p6',
    mandatorySignIn: true,
    authenticationFlowType: 'USER_SRP_AUTH'
  }
});
