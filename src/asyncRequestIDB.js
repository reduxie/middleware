"use strict";
exports.__esModule = true;
var Reduxie_1 = require("./Reduxie");
var asyncRequestIDB = function (dbName, dispatch) {
    return function () {
        var db = new Reduxie_1["default"](dbName);
        db.open();
        db.table('state')
            .toCollection()
            .last(function (rec) {
            dispatch({ type: 'REDUXIE_STATE_LOADING_DONE', payload: { state: rec } });
        })["catch"](function (err) {
            console.log(err);
        });
        console.log('IDB created');
    };
};
exports["default"] = asyncRequestIDB;
