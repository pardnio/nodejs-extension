"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isZH = exports.isYT = exports.isPhone = exports.isLink = exports.isEmail = void 0;
var regexLink = /http(s)?\:\/\/([\w-]+\.)+[\w-]+(\/[\w-\ \.\/\?\%\&\=]*)?/;
var regexYT = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/;
var regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var regexZH = /[\u4e00-\u9fa5\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]{1,}/;
var regexPhone = /^\(?\+?(0|886)(-|\))?9[0-9]{2}-?[0-9]{3}-?[0-9]{3}$/;
function CheckType(regex, str) {
    if (str.trim().length < 1) {
        return false;
    }
    ;
    return regex.test(str);
}
;
var isLink = function (str) { return CheckType(regexLink, str); };
exports.isLink = isLink;
var isYT = function (str) { return CheckType(regexYT, str); };
exports.isYT = isYT;
var isEmail = function (str) { return CheckType(regexEmail, str); };
exports.isEmail = isEmail;
var isZH = function (str) { return CheckType(regexZH, str); };
exports.isZH = isZH;
var isPhone = function (str) { return CheckType(regexPhone, str); };
exports.isPhone = isPhone;
