import middleware from './index';
import Dexie from 'dexie';
// import indexedDB from 'fake-indexeddb';
Dexie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange')
Dexie.dependencies.indexedDB = require('fake-indexeddb')
// Dexie.dependencies.indexedDB = indexedDB;

describe('Testing outer reducer', () => {
    it('it should return function', () => {
        expect(middleware.OuterReducer('this can be anything')).toBeInstanceOf(Function);
    });
});

describe('Testing IDB', () => {
    it('it should return IDB', (done) => {
        const db = new Dexie("my database");
        // console.log('this is the db', db);
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




