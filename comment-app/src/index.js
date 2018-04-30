import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import CommentApp from './containers/CommentApp'
import commentsReducer from './reducers/comments'
import './index.css'

const store = createStore(commentsReducer)

ReactDOM.render(
  //provide（提供）了store
  //store就给CommentApp去使用
  <Provider store={store}>
    <CommentApp />
  </Provider>,
  document.getElementById('root')
);

