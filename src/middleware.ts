import Reduxie from './Reduxie';

interface IConfig {
  throttleTime: number;
  count: number;
}

const middleware = (dbName: string, config: IConfig = { throttleTime: 500, count: 20 }) => {
  let date: number = Date.now();
  return ({ getState }: any) => (next: any) => (action: any) => {
    next(action);
    let current: number = Date.now();
    if (config.throttleTime === undefined || config.count === undefined) {
      throw 'Must define throttleTime and count when using second parameter.';
    }
    if (current - date > config.throttleTime) {
      console.log('writing to database every 2.5 seconds');
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
          if (count >= config.count) {
            db.table('state')
              .clear()
              .then(() => db.table('state').add(state));
          }
        });
    } else {
      console.log('not writing to db, just wait');
    }
  };
};

export default middleware;
