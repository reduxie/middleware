"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var dexie_1 = require("dexie");
var Reduxie = /** @class */ (function (_super) {
    __extends(Reduxie, _super);
    function Reduxie(dbName) {
        var _this = _super.call(this, dbName) || this;
        _this.version(1).stores({
            state: '++id, snapshot'
        });
        _this.state = _this.table('state');
        return _this;
    }
    return Reduxie;
}(dexie_1["default"]));
exports["default"] = Reduxie;
