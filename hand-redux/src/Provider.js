import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from './Connect'

export default class Provider extends Component{
  static propTypes={
    stroe:PropTypes.object,
    children:PropTypes.any
  }

  static childContextTypes={
    store:PropTypes.object
  }

//  获取context
//  把外界传给它的props.store放到context
  getChildContext(){
    return{
      store:this.props.store
    }
  }

  render(){
    //容器组件，将嵌套的内容原封不动作为自己的
    //子组件渲染出来
    return(
      <div>{this.props.children}</div>
    )


  }

}