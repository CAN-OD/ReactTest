import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import PropTypes from 'prop-types'


class Index extends Component {
  //如果你要设置context，
  // 那么childContextTypes是必写的
  static childContextTypes={
    themeColor:PropTypes.string
  }

  constructor(){
    super()
    this.state={themeColor:'blue'}
  }

  //设置context
  getChildContext(){
    return {
      themeColor:this.state.themeColor
    }
  }

  render () {
    return (
      <div>
        <Header />
        <Main />
      </div>
    )
  }
}

class Header extends Component {
  render () {
    return (
      <div>
        <h2>This is header</h2>
        <Title />
      </div>
    )
  }
}

class Main extends Component {
  render () {
    return (
      <div>
        <h2>This is main</h2>
        <Content />
      </div>
    )
  }
}

class Title extends Component {
  //同理，需要写contextTypes
  //如果不写就无法获取context里面的状态
  static contextTypes={
    themeColor:PropTypes.string
  }

  render () {
    return (
      <h1 style={{color:this.context.themeColor}}>React.js 小书标题</h1>
    )
  }
}

class Content extends Component {
  render () {
    return (
      <div>
        <h2>React.js 小书内容</h2>
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)
