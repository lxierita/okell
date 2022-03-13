import { CognitoIdentityClient, GetIdCommand, GetCredentialsForIdentityCommand} from "@aws-sdk/client-cognito-identity";

const IDENTITY_POOL_ID = "eu-west-2:f8d32c5b-e4f9-400b-8a67-c350db51995d";
export const CookieID = "IDENTITY_POOL_CRED";

export default function(req, res) {
    const cookie = req.cookies[CookieID];
    if (cookie) {
        res.status(200).json("Logged In");
        res.end();
    }
    console.log("path", req.url);

    const token = req.query["access-token"] || "";

    if (token === "") {
        res.status("500").json({message: "Authentication error"});
        res.end();
    }

    const client = new CognitoIdentityClient({region: "eu-west-2"});
    const input = new GetIdCommand({
        AccountId: "380149379140",
        IdentityPoolId: IDENTITY_POOL_ID,
        Logins: {
            "eu-west-2:380149379140:userpool/eu-west-2_q7Z7cnvJb": token
        }
    })

    client.send(input).then((dt) => {
       if (dt.IdentityId) {
           const input = new GetCredentialsForIdentityCommand({
               CustomRoleArn: "arn:aws:iam::380149379140:role/Cognito_okellrainforestAuth_Role",
               IdentityId: dt.IdentityId
           })sss
           client.send(input).then((dt) => {
               if (dt.Credentials) {
                   res.cookie("IDENTITY_POOL_CRED", dt.Credentials)
                   res.status("200").json("Success!");
                   res.end();
               }

           }, (err) => {
               res.status("500").json({message: "Authentication error", err});
               res.end()
           })
       }
    }, (err) => {
        res.status("500").json({message: "Authentication error", err});
        res.end();
    })
}