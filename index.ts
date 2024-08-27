
import { ShoheiAPI } from "./src";
import express from "express"

function NotFound( req : express.Request, res : express.Response, next: express.NextFunction ){
    return res.status(404).json({
        status : "error",
        message : "Not Found"
    })
}

function ServerError( err : express.Errback, req : express.Request, res : express.Response, next: express.NextFunction ){
    console.error(err);
    return res.status(500).json({
        status : "error",
        message : "Server Error"
    })
}


new ShoheiAPI()
    .registerPlugin('404', NotFound)
    // @ts-ignore - サーバーエラーのハンドリングには必要。
    .registerPlugin('500', ServerError)
    .startServer(3032);