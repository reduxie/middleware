import middleware from '../src/index';
import Dexie from 'dexie';
import Reduxie from '../src/Reduxie';

Reduxie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');
Reduxie.dependencies.indexedDB = require('fake-indexeddb');



describe('Testing addition to IDB', () => {
    it('it should return IDB', (done) => {
        const db = new Dexie("my database");
        db.version(1).stores({
            state: '++id, snapshot',
        });
        db.open();
        db.table('state').add({'roy': 'jay'})
        db.table('state')
        .toCollection()
        .count()
        .then((count) => {
            expect(count).toBe(1);
            done();
        })
        .catch(err => {
        console.log(err);
        });
    });
});

describe('Testing deletion from IDB', () => {
    it('it should delete from IDB properly', (done) => {
        const db = new Dexie("my database");
        db.version(1).stores({
            state: '++id, snapshot',
        });
        db.open()
        .then(() => {
            for(let i = 0; i < 5; i += 1) {
                db.table('state').add({i: i});
            }
        })
        .then(() => {
        db.table('state').clear()
        db.table('state').toCollection().count()
        .then((count) => {
            expect(count).toBe(0)
            done()
        })
        .catch(err => {
            console.log(err);
        });
    })
    });
})

describe('Testing next function', () => {
    it('it should delete from IDB properly', done => {
      const db = new Reduxie('test');
      const create = () => {
        const store = {
          getState: jest.fn(() => ({})),
          dispatch: jest.fn(),
        };
        const next = jest.fn();
        const invoke = (action: any) =>
          middleware.Middleware('test', {
            throttleTime: 0,
            deleteCount: 4,
          })(store)(next)(action);

        return { store, next, invoke };
      };
      let { next, invoke } = create();
      let action = { type: 'TEST' };
      invoke(action);
      expect(next).toHaveBeenCalledWith(action);
      done();
    });
  });
