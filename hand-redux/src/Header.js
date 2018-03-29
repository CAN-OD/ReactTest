import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { connect } from './Connect'
import { connect } from 'react-redux'

class Header extends Component {
  // static contextTypes={
  //   store:PropTypes.object
  // }

  static propsTypes={
    themeColor:PropTypes.string
  }

  // constructor(){
  //   super()
  //   this.state={themeColor:''}
  // }

  // componentWillMount(){
  //   const { store } = this.context
  //   this._updateThemeColor()
  //   监听数据变化重新渲染
    // store.subscribe(() => this._updateThemeColor())
  // }

  //私有方法，更新主题色
  // _updateThemeColor(){
    //先获取父组件的context
    // let {store} =this.context
    //然后获取其中的状态
    // let state=store.getState()
    //改变状态themeColor
    // this.setState({themeColor:state.themeColor})
  // }

// <h1 style={{color:this.state.themeColor}}>React.js 小书</h1>
  render () {
    return (
      <h1 style={{color:this.props.themeColor}}>React.js 小书</h1>
    )
  }
}

//需要在子组件去定义mapStateToProps，来告诉
//高级组件，子组件需要哪些状态
const mapStateToProps=(state)=>{
  return {
    themeColor:state.themeColor
  }
}
Header=connect(mapStateToProps)(Header)

export default Header

