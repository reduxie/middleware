"use strict";
exports.__esModule = true;
var Reduxie_1 = require("./Reduxie");
var middleware = function (dbName) {
    return function (_a) {
        var getState = _a.getState;
        return function (next) { return function (action) {
            // Initialize IDB database by dbName
            var db = new Reduxie_1["default"](dbName);
            // Continue to dispatch action
            next(action);
            // After action, cache state to IDB
            var state = getState();
            db.table('state').add(state);
        }; };
    };
};
exports["default"] = middleware;
