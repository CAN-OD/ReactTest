import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Header extends Component {
  static contextTypes={
    store:PropTypes.object
  }

  constructor(){
    super()
    this.state={themeColor:''}
  }

  componentWillMount(){
    const { store } = this.context
    this._updateThemeColor()
    //监听数据变化重新渲染
    store.subscribe(() => this._updateThemeColor())
  }

  //私有方法，更新主题色
  _updateThemeColor(){
    //先获取父组件的context
    let {store} =this.context
    //然后获取其中的状态
    let state=store.getState()
    //改变状态themeColor
    this.setState({themeColor:state.themeColor})
  }

  render () {
    return (
      <h1 style={{color:this.state.themeColor}}>React.js 小书</h1>
    )
  }
}

export default Header