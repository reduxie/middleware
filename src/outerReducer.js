"use strict";
exports.__esModule = true;
function outerReducer(appReducer) {
    return function (state, action) {
        if (action.type === 'REDUXIE_STATE_LOADING_DONE') {
            console.log('\n\nloading state done\n\n');
            return appReducer(action.payload.state, action);
        }
        return appReducer(state, action);
    };
}
exports["default"] = outerReducer;
