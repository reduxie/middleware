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
Implement the state fetch by adding `Reduxie.GetReduxieState(dbname, dispatch)` to the component where you would like the fetch to originate from (typically your app's landing page container). 

Function should be called from React's componentDidMount class method (or useEffect for functional components utilizing hooks):

*ReactComponent.js*
```javascript
//...

const mapDispatchToProps = (dispatch) => ({
  getIDBState: Reduxie.GetReduxieState('dbname', dispatch),
});

const ReactFunctionalComponent = (props) => {
  React.useEffect(props.getIDBState, []);
  
  return (
  //...Display elements
  )
}
```

### How It Works
Reduxie will cache your state to IndexedDB on every state update by using a Redux middleware function specific to your app.

To retrieve your state use the Reduxie GetReduxieState method parametrized by your Redux dispatch from the connected mapDispatchToProps function. This will return a function to be called from your React app's ComponentDidMount (useEffect) lifecycle methods.



