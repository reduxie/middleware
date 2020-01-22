import Reduxie from './Reduxie';
import { MiddlewareAPI, Dispatch, AnyAction, Action } from "redux";

export interface IParams {
  throttleTime: number;
  deleteCount: number;
}

const middleware = (dbName: string, config: IParams = {throttleTime: 500, deleteCount: 20}) => {
  let date: number = Date.now();
  return ({ getState }: MiddlewareAPI<Dispatch<Action>, any>) => (next: Dispatch<Action>) => (action: Action) => {

    // Immediately dispatch action to middleware/reducers
    next(action);

    // Handle optional params
    const throttleTime = config.throttleTime || 500;
    const deleteCount = config.deleteCount || 20;
    const current: number = Date.now();

    // Only cache to IDB if throttle time has passed to prevent excessive db transactions
    if (current - date > throttleTime) {
      date = Date.now();
      // Initialize IDB database by dbName
      const db = new Reduxie(dbName);
      const state = getState();
      console.log(state, " after getState")
      db.table('state')
        .count()
        .then(count => {
          if (count >= deleteCount) { // check if IDB storage has reached limit
            console.log('going to clear then add');
            db.table('state')
              .clear()
              .then(() => db.table('state').add(state));
          } else {
            db.table('state').add(state);
          }
        });
    }
  };
};

export default middleware;
