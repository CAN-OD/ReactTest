//创建store包含state定义内容和dispatch修改内容
function createStore(reducer){
  let state=null
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
    // stateChanger(state,action)
    //覆盖原来的对象
    state=reducer(state,action)
    //遍历listeners数组里面的函数
    listeners.forEach((listener)=>listener())
  }
  //初始化state
  dispatch({})
  return {getState,dispatch,subscribe}
}


// function renderApp (appState) {
//   renderTitle(appState.title)
//   renderContent(appState.content)
// }
//在函数执行渲染操作之前先做判断
//判断传入的新数据和旧数据是不是相同，相同就不渲染了
//为防止oldAppState没有传入，所以我们添加一个默认值 {}
function renderApp (newAppState,oldAppState={}) {
  //数据相同就不渲染
  if(newAppState===oldAppState)
  {return}
  renderTitle(newAppState.title,oldAppState.title)
  renderContent(newAppState.content,oldAppState.content)
}



// function renderTitle (title) {
//   const titleDOM = document.getElementById('title')
//   titleDOM.innerHTML = title.text
//   titleDOM.style.color = title.color
// }

function renderTitle (newTitle,oldTitle={}) {
  if (newTitle === oldTitle) return
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

// function renderContent (content) {
//   const contentDOM = document.getElementById('content')
//   contentDOM.innerHTML = content.text
//   contentDOM.style.color = content.color
// }

function renderContent (newContent,oldContent={}) {
  if(newContent===oldContent) return
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}



//新建一个newAppstate，复制appState
let newAppState={
  ...appState,
  title:{...appState.title,text:'《Reactjs小书》'}
}

//同理，修改color
let newAppState1 = { // 新建一个 newAppState1
  ...newAppState, // 复制 newAppState1 里面的内容
  title: { // 用一个新的对象覆盖原来的 title 属性
    ...newAppState.title, // 复制原来 title 对象里面的内容
    color: "blue" // 覆盖 color 属性
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

//将appState合并到stateChanger里去
// const appState = {
//   title: {
//     text: 'React.js 小书',
//     color: 'red',
//   },
//   content: {
//     text: 'React.js 小书内容',
//     color: 'blue'
//   }
// }


//修改stateChanger，让它在修改数据的时候，
// 不会直接修改原来的数据state，
// 而是产生上述的共享结构的对象
function stateChanger(state,action){
  if(!state){
    return{
      title: {
      text: 'React.js 小书',
      color: 'red',
      },
      content: {
      text: 'React.js 小书内容',
      color: 'blue'
      }
    }

  }
  switch(action.type){
    case 'UPDATE_TITLE_TEXT':
      // state.title.text = action.text
      //构建新的对象并返回
      return {
        ...state,
        title:{
          //先复制title里的内容，再去覆盖title的text
          ...state.title,
          text:action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      // state.title.color = action.color
      return{
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
  //    没有修改，返回原来的对象
      return state
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

let store=createStore(stateChanger)
//缓存旧的state
let oldState=store.getState()
//由下面的dispatch可以看到，我们只需要修改title
//但却把renderApp全部都渲染了一遍,不能做到局部刷新
store.subscribe(()=>{
  //数据可能变化，获取新的state
  let newState=store.getState()
    //把新旧的state传进去渲染
    renderApp(newState,oldState)
  //渲染完后，新的newState变成旧的oldState
  //等待下一次数据变化重新渲染
  oldState=newState
  }


  )
// renderApp(appState)
renderApp(store.getState())
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js a小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
//由于添加了手动监听，所以就不需要再重新调用了
// renderApp(store.getState()) // 把新的数据渲染到页面上



