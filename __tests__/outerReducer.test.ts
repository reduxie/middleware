import outerReducer from '../src/outerReducer';


describe('Testing outer reducer', () => {
    it('it should return function', () => {
      expect(outerReducer).toBeInstanceOf(Function);
    });
});

describe('outer reducer can handle REDUXIE_STATE_LOADING_DONE action', () => {

  it('it should return reducers with new state for REDUXIE action', () => {
    const combinedReducers = jest.fn((state, action) => state);
    const state = {test: 'test'};
    const action = {type: 'REDUXIE_STATE_LOADING_DONE', payload: { state: { test: 'reduxie-test'}}}

    // Currying, Mikey, learn to love it
    const reducerResult = outerReducer(combinedReducers)(state, action);

    expect(reducerResult).toEqual({ test: 'reduxie-test'})

  })

  it('it should return reducers with old state for other actions', () => {
    const combinedReducers = jest.fn((state, action) => state);
    const state = {test: 'test'};
    const action = {type: 'not-reduxie-action', payload: 'not-the-droids-you-are-looking-for'}

    // Currying, Mikey, learn to love it
    const reducerResult = outerReducer(combinedReducers)(state, action);

    expect(reducerResult).toEqual({test: 'test'})

  });
});
