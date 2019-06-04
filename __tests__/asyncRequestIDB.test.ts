import Reduxie from '../src/Reduxie';
import asyncRequestIDB from '../src/asyncRequestIDB';
Reduxie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange')
Reduxie.dependencies.indexedDB = require('fake-indexeddb')


describe('Testing getState function', () => {
    beforeEach(async () => {
        const db = new Reduxie('mock');
        await db.open()
        .then( () =>
              db.table('state')
              .add({'test': 'tester1'})
        );
    })

    it('asyncRequestIDB should get state', async (done) => {
        const dispatch = jest.fn();
        let getReduxieState = asyncRequestIDB('mock', dispatch)
        await getReduxieState();
        expect(dispatch).toHaveBeenCalledWith({ type: 'REDUXIE_STATE_LOADING_DONE', payload: { state: {'reduxie_id': 1, 'test': 'tester1'} } });
        done();
    })
})
