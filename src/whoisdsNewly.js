"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.updateWhoisDsNewlyRegisteredDomains = void 0;
// https://www.whoisds.com/newly-registered-domains
// sample download url = https://www.whoisds.com//whois-database/newly-registered-domains/MjAyMi0wNy0yNy56aXA=/nrd
var axios_1 = require("axios");
var utils_1 = require("./utils");
var luxon_1 = require("luxon");
var downloadFile_1 = require("./downloadFile");
var base_url = "https://www.whoisds.com/newly-registered-domains";
var content_url_match = "whois-database/newly-registered-domains/";
var output_folder = "data/";
var updateWhoisDsNewlyRegisteredDomains = function () { return __awaiter(void 0, void 0, void 0, function () {
    var today, mainPage, downloadLinks, promises;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                today = luxon_1.DateTime.local();
                console.log("Updating WhoisDs Newly Registered Domains from:\n", base_url);
                return [4 /*yield*/, axios_1["default"].get(base_url)];
            case 1:
                mainPage = _a.sent();
                downloadLinks = (0, utils_1.getLinks)(mainPage.data).filter(function (link) { return link.includes(content_url_match); });
                console.log('Download links:\n', downloadLinks);
                promises = downloadLinks.map(function (cLink, index) { return __awaiter(void 0, void 0, void 0, function () {
                    var day;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                day = today.minus({ days: index });
                                return [4 /*yield*/, (0, downloadFile_1.downloadFile)(cLink.trim(), output_folder + day.toFormat('yyyy-MM-dd') + ".zip")];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); });
                Promise.allSettled(promises).then(function (results) {
                    console.log("All downloads completed");
                })["catch"](function (err) {
                    console.log("Error downloading files", err);
                });
                return [2 /*return*/];
        }
    });
}); };
exports.updateWhoisDsNewlyRegisteredDomains = updateWhoisDsNewlyRegisteredDomains;
