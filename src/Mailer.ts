import nodemailer from "nodemailer";

const service = (process.env.MAIL_SERVICE || "").trim();
const host = (process.env.MAIL_HOST || "").trim();
const user = (process.env.MAIL_SERVICE_USER || "").trim();
const password = (process.env.MAIL_SERVICE_PASSWORD || "");
const secure = Boolean(parseInt(process.env.MAIL_SECURE || "0") || 0);
const port = parseInt(process.env.MAIL_PORT || "25") || 25;

const regex_host = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

let mailer = {
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

function createTransport(config: any) {
  const is_service = (config.service || "").length > 0;
  const is_host = regex_host.test(config.host);

  let transport: any;

  if (
    ((config.service || "").length > 0 || regex_host.test(config.host)) &&
    config.auth.user.length > 0 &&
    config.auth.pass.length > 0
  ) {
    transport = nodemailer.createTransport(config);
  };

  if (is_service && transport == null) {
    console.error("請檢查 .env 中的 MAIL_SERVICE 的資料是否正確。");
  }
  else if (is_host && transport == null) {
    console.error("請檢查 .env 中的 MAIL_HOST 的資料是否正確。");
  };

  return transport;
};

export default mailer;