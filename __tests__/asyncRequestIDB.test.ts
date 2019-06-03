import Reduxie from '../src/Reduxie';
import asyncRequestIDB from '../src/asyncRequestIDB';
Reduxie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange')
Reduxie.dependencies.indexedDB = require('fake-indexeddb')


describe('Testing getState function', () => {
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
