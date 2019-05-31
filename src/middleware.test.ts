import middleware from './index';

describe('Testing outer reducer', () => {
    it('it should return function', () => {
        expect(middleware.OuterReducer('this can be anything')).toBeInstanceOf(Function);
    });
});

