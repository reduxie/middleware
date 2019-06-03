import outerReducer from '../src/outerReducer';
import Reduxie from '../src/Reduxie';
Reduxie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange')
Reduxie.dependencies.indexedDB = require('fake-indexeddb')


describe('Testing outer reducer', () => {
    it('it should return function', () => {
      expect(outerReducer).toBeInstanceOf(Function);
    });
});
