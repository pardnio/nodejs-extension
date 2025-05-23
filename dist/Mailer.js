"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = require("nodemailer");
var service = (process.env.MAIL_SERVICE || "").trim();
var host = (process.env.MAIL_HOST || "").trim();
var user = (process.env.MAIL_SERVICE_USER || "").trim();
var password = (process.env.MAIL_SERVICE_PASSWORD || "");
var secure = Boolean(parseInt(process.env.MAIL_SECURE || "0") || 0);
var port = parseInt(process.env.MAIL_PORT || "25") || 25;
var regex_host = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
var mailer = {
    cloud: createTransport({
        service: service,
        auth: {
            user: user,
            pass: password
        }
    }),
    host: createTransport({
        host: host,
        secure: secure,
        port: port,
        auth: {
            user: user,
            pass: password
        },
        tls: {
            rejectUnauthorized: false
        }
    })
};
function createTransport(config) {
    var is_service = (config.service || "").length > 0;
    var is_host = regex_host.test(config.host);
    var transport;
    if (((config.service || "").length > 0 || regex_host.test(config.host)) &&
        config.auth.user.length > 0 &&
        config.auth.pass.length > 0) {
        transport = nodemailer_1.default.createTransport(config);
    }
    ;
    if (is_service && transport == null) {
        console.error("請檢查 .env 中的 MAIL_SERVICE 的資料是否正確。");
    }
    else if (is_host && transport == null) {
        console.error("請檢查 .env 中的 MAIL_HOST 的資料是否正確。");
    }
    ;
    return transport;
}
;
exports.default = mailer;
