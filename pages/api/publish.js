import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import {CookieID} from "./auth";
import initMiddleware from "../../libs/middleware";
import Cors from "cors";


const client = new S3Client({
    region: "eu-west-2"
    }
);

function convertToName(str){
    const regex = new RegExp("[^a-zA-Z\\d\\s:]");
    return str.split(regex).join("-");
}

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        methods: ['GET', 'POST', 'OPTIONS'],
        origin: "*"
    })
)

export default async function handler(req, res) {
    await cors(req, res);

    const name = convertToName(req.body.title);
    const fileName = `/articles/${name}`;
    const uploadParams = {
        Bucket: "okell",
        Key: fileName,
        Body: res.body,
    };

    const cookie = req.cookies[CookieID];
    if (cookie) {
        client.credentials = cookie;
        client.send(new PutObjectCommand(uploadParams)).then((data) => {
            res.status(200).json("Success!");
            res.end();
        }, (err) => {
            console.log(err);
            res.status(400).json({err});
            res.end();
        });
    } else {
        res.redirect("/login");
    }
}


