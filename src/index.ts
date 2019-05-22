import middleware from './middleware';
import outerReducer from './outerReducer';
import asyncRequestIDB from './asyncRequestIDB'

export default {
  Middleware: middleware,
  OuterReducer: outerReducer,
  GetReduxieState: asyncRequestIDB
}
