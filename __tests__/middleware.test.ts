import middleware from '../src/middleware';
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

describe('Middleware Dispatches Next Action and Caches State', () => {
    // scoped variables for tests in this describe
    const create = () => {
      const store = {
        getState: jest.fn(() => ({'turtleReducer': {'turtles' : 'i liek them'}})),
        dispatch: jest.fn(),
      };
      const next = jest.fn();
      const invoke = (action: any) =>
        middleware('test', { // middleware using 'test' db
          throttleTime: -1, // time is frozen in jest tests
          deleteCount: 4,
        })(store)(next)(action);

      return { store, next, invoke };
    };

    // initialize reduxie db
    const db = new Reduxie('test');
    db.open();

    beforeEach(async () => {

      for(let i = 0; i < 5; i += 1) {
          await db.table('state').add({i: i});
          console.log(i);
      }

    })

    afterEach( async (done) => {

      await db.table('state').toCollection().toArray().then(rec => console.log("last record: ", rec));
      // clear between tests does not appear to be working
      setTimeout(() => {
        db.delete().then(() => db.open()
          .then(() => console.log('finished clearing'))
          .then(() => done())
        )
      }, 1000)

      })

    it('it should dispatch next action', async done => {

      let { next, invoke } = create();
      let action = { type: 'TEST' };
      await invoke(action);
      expect(next).toHaveBeenCalledWith(action);
      done();
    });

    it('it should cache state as last ', async done => {
      let {next, invoke } = create();
      let action = {type: 'TEST'}
      await invoke(action);
      setTimeout(() => {
        db.table('state').toCollection().last(rec => {
          expect(rec).toHaveProperty('turtleReducer', {'turtles' : 'i liek them'});
          done();
        });
      }, 2000);

    });

  });
