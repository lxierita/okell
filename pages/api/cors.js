import { NextResponse } from 'next/server'
import initMiddleware from "../../libs/middleware";
import Cors from "cors";

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        methods: ['GET', 'POST', 'OPTIONS'],
        origin: "*"
    })
)
