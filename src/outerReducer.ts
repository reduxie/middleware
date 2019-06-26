import { Reducer, AnyAction } from "redux";

export default function outerReducer(appReducer: Reducer) {
  return function(state: any, action: AnyAction) {
    if (action.type === 'REDUXIE_STATE_LOADING_DONE') {
      //console.log('\n\nloading state done\n\n');
      return appReducer(action.payload.state, action);
    }
    return appReducer(state, action);
  };
}
