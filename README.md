# Reduxie
---
Asynchronous Redux state initialization and offline caching using the Dexie `IndexedDB` API wrapper.

### Install

```npm install reduxie```

### Use
Import statement:<br>
```import Reduxie from 'reduxie';```

Wrap your reducers by passing the combined reducers to Reduxie's OuterReducer: `Reduxie.OuterReducer(reducers)`

*store.js*
```javascript
const store = createStore(
  Reduxie.OuterReducer(reducers),
  composeWithDevTools(applyMiddleware(thunk, Reduxie.Middleware('dbname')))
);
```
Implement the state fetch by adding `Reduxie.GetReduxieState(dbname, dispatch)` to the component where you would like the fetch to originate from (typically your app's landing page container). In this example, we've attached the fetch state method to a React hook:

*ReactComponent.js*
```javascript
//...

const mapDispatchToProps = (dispatch) => ({
  getIDBState: Reduxie.GetReduxieState('dbname', dispatch),
});

const ReactFunctionalComponent => {
  React.useEffect(props.getIDBState, []);
  
  return (
  //...Display elements
  )
}
```

