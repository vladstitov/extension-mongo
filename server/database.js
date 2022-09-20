"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var Database;
(function (Database) {
    function GetUrls(obj) {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                resolve({ ooop: 'kkkk' });
            }, 500);
        });
    }
    Database.GetUrls = GetUrls;
})(Database = exports.Database || (exports.Database = {}));
//# sourceMappingURL=database.js.map