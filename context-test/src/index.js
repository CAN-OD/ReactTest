//创建store包含state定义内容和dispatch修改内容
function createStore(state,stateChanger){
  //使用观察者模式
  let listeners=[]
  //我们可以通过
  // store.subscribe(() => renderApp(store.getState()))
  //给subscribe传一个监听函数,该函数renderApp会被push到数组中
  let subscribe=(listener)=>listeners.push(listener)

  let getState= ()=> state

  //每次调用dispatch的时候都会进行数据的修改
  //同时会遍历listeners里的函数并去调用 ()
  const dispatch=(action)=>{
    //数据修改
    stateChanger(state,action)
    //遍历listeners数组里面的函数
    listeners.forEach((listener)=>listener())
  }
  return {getState,dispatch,subscribe}
}


function renderApp (appState) {
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

const appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}
//定义一个函数，专门负责数据的修改
// function dispatch (action) {
//   switch (action.type) {
//     case 'UPDATE_TITLE_TEXT':
//       appState.title.text = action.text
//       break
//     case 'UPDATE_TITLE_COLOR':
//       appState.title.color = action.color
//       break
//     default:
//       break
//   }
// }

function stateChanger(state,action){
  switch(action.type){
    case 'UPDATE_TITLE_TEXT':
      state.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      state.title.color = action.color
      break
    default:
      break
  }
}
//想要修改text，必须使用dispatch函数
/*
dispatch({
  type: 'UPDATE_TITLE_TEXT',
  text: '《React.js 小书》' }) // 修改标题文本
dispatch({
  type: 'UPDATE_TITLE_COLOR',
  color: 'blue' }) // 修改标题颜色
*/

//1.你必须通过dispatch来修改数据
//2.你只能修改title.text和title.color
//3.只需在dispath的switch的第一个case内部打个
//断点就可以调试出来了

let store=createStore(appState,stateChanger)
store.subscribe(()=>renderApp(store.getState()))
// renderApp(appState)
renderApp(store.getState())
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js a小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
//由于添加了手动监听，所以就不需要再重新调用了
// renderApp(store.getState()) // 把新的数据渲染到页面上