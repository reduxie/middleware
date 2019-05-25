import Reduxie from './Reduxie';

const middleware = (dbName: string) => {
  let date: number = Date.now();
  return ({ getState }: any) => (next: any) => (action: any) => {
    let current: number = Date.now();
    if (current - date > 2500) {
      console.log('writing to database every 2.5 seconds');
      date = Date.now();
      // Initialize IDB database by dbName
      const db = new Reduxie(dbName);
      // Continue to dispatch action
      next(action);
      // After action, cache state to IDB
      const state = getState();
      db.table('state').add(state);
      db.table('state')
        .count()
        .then(count => {
          if (count >= 20) {
            db.table('state').clear();
            db.table('state').add(state);
          }
        });
    } else {
      console.log('not writing to db, just wait');
      next(action);
    }
  };
};

export default middleware;
