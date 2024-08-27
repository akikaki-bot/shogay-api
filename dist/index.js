"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("./src");
function NotFound(req, res, next) {
    return res.status(404).json({
        status: "error",
        message: "Not Found"
    });
}
function ServerError(err, req, res, next) {
    console.error(err);
    return res.status(500).json({
        status: "error",
        message: "Server Error"
    });
}
new src_1.ShoheiAPI()
    .registerPlugin('404', NotFound)
    // @ts-ignore - サーバーエラーのハンドリングには必要。
    .registerPlugin('500', ServerError)
    .startServer(3032);
