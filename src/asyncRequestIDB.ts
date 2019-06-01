import Reduxie from './Reduxie';

const asyncRequestIDB = (dbName: string, dispatch: any) => {
  return () => {
    let db = new Reduxie(dbName);
    return db.open()
    .then( () => {
      return db.table('state')
        .toCollection()
        .last(rec => {
          return dispatch({ type: 'REDUXIE_STATE_LOADING_DONE', payload: { state: rec } });
        })
        .catch(err => {
          console.log(err);
        })
      }
    )
    .catch(err => console.log(err));
  };
};

export default asyncRequestIDB;
