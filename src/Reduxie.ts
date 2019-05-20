import Dexie from 'dexie'


export interface IReduxState {
 id?: number;
 snapshot: any;
}

export default class Reduxie extends Dexie {
  state: Dexie.Table<IReduxState, number>;

  constructor(dbName: string) {
    // Create Dexie with dbName
    super(dbName);

    // Set Version
    this.version(1).stores({
      state: '++id, snapshot'
    });

    // Initialize state table to this object
    this.state = this.table("state");
  }


}
