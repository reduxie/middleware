import Dexie from 'dexie';

export interface IReduxState {
  id?: number;
  snapshot: any;
}

export default class Reduxie extends Dexie {
  state: Dexie.Table<IReduxState, number>;
  constructor(dbName: string) {
    super(dbName);
    this.version(1).stores({
      //state: '++reduxie_id, snapshot',
      state: '++reduxie_id'
    });
    this.state = this.table('state');
  }
}
