const regexLink = /http(s)?\:\/\/([\w-]+\.)+[\w-]+(\/[\w-\ \.\/\?\%\&\=]*)?/;
const regexYT = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/;
const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const regexZH = /[\u4e00-\u9fa5\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]{1,}/;
const regexPhone = /^\(?\+?(0|886)(-|\))?9[0-9]{2}-?[0-9]{3}-?[0-9]{3}$/;

function CheckType(regex: RegExp, str: string) {
  if (str.trim().length < 1) {
    return false;
  };
  return regex.test(str);
};

const isLink = (str: string) => CheckType(regexLink, str);
const isYT = (str: string) => CheckType(regexYT, str);
const isEmail = (str: string) => CheckType(regexEmail, str);
const isZH = (str: string) => CheckType(regexZH, str);
const isPhone = (str: string) => CheckType(regexPhone, str);

export {
  isEmail, isLink, isPhone, isYT, isZH
};

