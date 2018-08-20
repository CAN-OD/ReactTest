// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

//当不同的模块需要同一个变量时，
// 该变量以往是设置成全局变量，但这样非常危险
// 因为任何人都可以随意修改它
let appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}
//=============================================
//所以，我们必须制定一个约定，当设置并修改全局变量的时候，
//按照某一规范去修改它，并且你还要告诉其他人

//dispatch即这一规范，**只能通过dispatch函数去修改全局变量，别无他法**
// function dispatch (action) {
function stateChanger  (state,action) {
  switch (action.type) {
    //告诉其他人，你因为什么而去修改全局变量
      //如：要更新标题文本
    case 'UPDATE_TITLE_TEXT':
      state.title.text = action.text
      break
    //要更新标题颜色
    case 'UPDATE_TITLE_COLOR':
      state.title.color = action.color
      break
    default:
      break
  }
}

//我想修改标题颜色为绿色
// dispatch ({type:"UPDATE_TITLE_COLOR",color:"green"})

// renderApp(appState)


//现在index.js已经有一个appState和dispatch函数了
// 我不仅仅想在index.js里去定义一个appState和dispatch，
//而是 设计一个独立的插件，让其他任何组件来调用该插件，并能创建state和使用dispatch函数
//创建的state和dispatch我们放在 store里，创建store的函数，我们叫做 createStore
/*
function createStore (state, stateChanger) {
  //为什么这里要写成函数，而不是直接state，
  // 因为实际应用中有时仅仅需要state中的某一个属性，而不是整个state
  //所以这里写成函数，当有参数，即开发者想要的某种属性时，返回该属性
  //否则返回state所有属性
  // const getState = () => state
  const getState = (property) => property?state[property]:state
  // const getState =  state
  //比如：调用appState，并通过「UPDATE_TITLE_TEXT」修改appState
  //action一定有个属性type，其他属性 视相应的state而定
  const dispatch = (action) => stateChanger(state, action)
  return { getState, dispatch }
}
let store=createStore(appState,stateChanger)
console.log(store)
renderApp(store.getState())
//每次用dispatch改变state的属性的时候，都得手动执行renderApp()
store.dispatch({type:"UPDATE_TITLE_TEXT",text:"aaa"})
renderApp(store.getState())
console.log(store.getState("title"))

*/
//===============================================
function createStore (state, stateChanger) {
  //监听的数组
  let listenArray=[]
  //将要触发的事件放到 监听队列中去
  let subscribe=(listener)=>listenArray.push(listener)
  const getState = (property) => property?state[property]:state
  const dispatch = (action) => {
    stateChanger(state, action)
    //更改状态后，执行监听队列
    listenArray.forEach(listener=>listener())
  }
  return { getState, dispatch, subscribe }
}
let store=createStore(appState,stateChanger)
store.subscribe(()=>renderApp(store.getState()))
store.dispatch({type:"UPDATE_TITLE_TEXT",text:"bbb"})

//===============================================

//观察者模式
//简单说是：在数据发生改变时，对应的处理函数自动执行。

















function renderApp (newAppState,oldAppState={}) {
  if(newAppState===oldAppState) return
  renderTitle(appState.title)
  renderContent(appState.content)
}

function renderTitle (title) {
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color
}

function renderContent (content) {
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}




