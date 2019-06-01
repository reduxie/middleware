import Reduxie from './Reduxie';

const asyncRequestIDB = (dbName: string, dispatch: any) => {
  return () => {
    let db = new Reduxie(dbName);
    return db.open()
    .then(() => {
      return db.table('state')
      .toCollection()
      .last(rec => {
        // delete rec['reduxie_id'];
        return dispatch({ type: 'REDUXIE_STATE_LOADING_DONE', payload: { state: rec } });
      })
      .catch(err => {
        console.log(err);
      });
    });
  }
};

export default asyncRequestIDB;
