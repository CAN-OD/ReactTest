import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
// import Header from './components/Header'
// import Content from './containers/Content'
import Header from './containers/Header'
import Content from './containers/Content'
// import Provider from './Provider'
import Provider from 'react-redux'
import {createStore} from 'redux'
import './index.css'

/*
function createStore (reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({}) // 初始化 state
  return { getState, dispatch, subscribe }
}
*/

//定义了一个表示主题色的状态themeColor
//并且只能通过CHANGE_COLOR来改变颜色

const themeReducer = (state, action) => {
  if (!state) return {
    themeColor: 'red'
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

const store = createStore(themeReducer)

class Index extends Component {
  /*
  static childContextTypes = {
    store: PropTypes.object
  }

  //将store放到index的context里面
  //这样子组件就能够获取到store了
  getChildContext(){
    return {store}
  }
*/
  render () {
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

ReactDOM.render(
  //把provider作为组件树的根节点
  <Provider store={store}>
    <Index />
  </Provider>
    ,
  document.getElementById('root')
)


