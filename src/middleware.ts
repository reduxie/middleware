import Reduxie from './Reduxie';

const middleware = (dbName: string) => {
  return ({ getState }: any) => (next: any) => (action: any) => {
    // Initialize IDB database by dbName
    const db = new Reduxie(dbName);
    // Continue to dispatch action
    next(action);
    // After action, cache state to IDB
    const state = getState();
    db.table('state').add(state);
  };
};

export default middleware;
