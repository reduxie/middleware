import Reduxie from './Reduxie';

export interface IParams {
  throttleTime: number;
  deleteCount: number;
}
const middleware = (dbName: string, config: IParams = {throttleTime: 500, deleteCount: 20}) => {
  let date: number = Date.now();
  return ({ getState }: any) => (next: any) => (action: any) => {
    next(action);
    const throttleTime = config.throttleTime || 500;
    const deleteCount = config.deleteCount || 20;
    const current: number = Date.now();
    if (current - date > throttleTime) {
      console.log(`allowing client to write to database every ${throttleTime} milliseconds`);
      date = Date.now();
      // Initialize IDB database by dbName
      const db = new Reduxie(dbName);
      // Continue to dispatch action
      // After action, cache state to IDB
      const state = getState();

      db.table('state').add(state);
      db.table('state')
        .count()
        .then(count => {
          if (count >= deleteCount) {
            db.table('state')
              .clear()
              .then(() => db.table('state').add(state));
          }
        });
    }
  };
};

export default middleware;
