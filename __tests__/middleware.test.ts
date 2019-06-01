import middleware from '../src/index';
import Dexie from 'dexie';
import Reduxie from '../src/Reduxie';
import asyncRequestIDB from '../src/asyncRequestIDB';
Reduxie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange')
Reduxie.dependencies.indexedDB = require('fake-indexeddb')

describe('Testing outer reducer', () => {
    it('it should return function', () => {
        expect(middleware.OuterReducer('this can be anything')).toBeInstanceOf(Function);
    });
});

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

describe('Check getState function', () => {
    beforeEach(() => {
        const db = new Reduxie('mock');
        db.open().then( () =>
        db.table('state')
        .add({'test': 'tester1'})
        );
    })
    it('asyncRequestIDB should get state', async (done) => {
        const dispatch = jest.fn();
        let getState = asyncRequestIDB('mock', dispatch)
        await getState();
        expect(dispatch).toHaveBeenCalled();
        done();
    })
})








