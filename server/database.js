"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const realfin_1 = require("./realfin");
var Database;
(function (Database) {
    function GetUrls(obj) {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                const urls = (0, realfin_1.getRealFin)().split('\n');
                resolve(urls);
            }, 500);
        });
    }
    Database.GetUrls = GetUrls;
})(Database = exports.Database || (exports.Database = {}));
//# sourceMappingURL=database.js.map