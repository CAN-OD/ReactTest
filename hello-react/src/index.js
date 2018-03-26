//导入react
//导入Component
//Component是reactjs的组件父类
//只要写Reactjs的组件，就必须引入这两个东西
import React,{Component} from 'react';
//导入reactDom
//可以帮助我们把React组件渲染到页面上去
import ReactDOM from 'react-dom';
//导入样式文件
import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

//这是标题组件
class Title extends Component{
  //一个函数
  handleClickOnTitle(){
    console.log("点击了标题")
  }

  render(){
    return(
      <h1 style={{cursor:'pointer'}} onClick={this.handleClickOnTitle}>这是标题title</h1>
    )
  }
}

//这是Header组件
class Header extends Component {
  render () {
    return (
      <div>
        <Title />
        <h2>这是头部header</h2>
      </div>
    )
  }
}

class Main extends Component{
  render(){
    return(
      <div>
        <h2>这是主要内容mian</h2>
      </div>
    )
  }
}

class Footer extends Component{
  render(){
    return(
      <div>
        <h2>这是底部footer</h2>
      </div>
    )
  }
}

class Index extends Component{
  render(){
    return (
    <div>
      <Header/>
      <Main/>
      <Footer/>
    </div>
    )
  }
}
//把DOM元素塞到页面上
//ReactDOM.render功能就是把组件渲染并构造DOM树，
// 然后插入到页面某个特定的元素上
//(这里是id为root的div元素)
ReactDOM.render(
  <Index/>,
  document.getElementById('root')
)



