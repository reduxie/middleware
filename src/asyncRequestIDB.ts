import Reduxie from './Reduxie';

const asyncRequestIDB = (dbName: string, dispatch: any) => {
  return () => {
    let db = new Reduxie(dbName);
    db.open();
    db.table('state')
      .toCollection()
      .last(rec => {
        dispatch({ type: 'REDUXIE_STATE_LOADING_DONE', payload: { state: rec } });
      })
      .catch(err => {
        console.log(err);
      });
    console.log('IDB created');
  };
};

export default asyncRequestIDB;
