import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'hand-redux'

class ThemeSwitch extends Component {
  // static contextTypes = {
  //   store: PropTypes.object
  // }
  static propTypes={
    themeColor:PropTypes.string,
    onSwithColor:PropTypes.func
  }

  // constructor () {
  //   super()
  //   this.state = { themeColor: '' }
  // }

  // componentWillMount () {
  //   const { store } = this.context
  //   this._updateThemeColor()
  //   store.subscribe(() => this._updateThemeColor())
  // }

  // _updateThemeColor () {
  //   const { store } = this.context
  //   const state = store.getState()
  //   this.setState({ themeColor: state.themeColor })
  // }

  //dispatch action 去改变颜色
  handleSwitchColor(color){
    // const {store} = this.context
    // store.dispatch({
    //   type:'CHANGE_COLOR',
    //   themeColor:color
    // })
    if(this.props.onSwitchColor){
     this.props.onSwithColor(color)
    }
  }


  render () {
    return (
      <div>
        <button
          // style={{ color: this.state.themeColor }}
          style={{ color: this.props.themeColor }}
          onClick={this.handleSwitchColor.bind(this,'red')}
        >
          Red</button>
        <button
          // style={{ color: this.state.themeColor }}
          style={{ color: this.props.themeColor }}
          onClick={this.handleSwitchColor.bind(this,'blue')}
        >
          Blue</button>
      </div>
    )
  }
}

let mapStateToProps=(state)=>{
  return{
    themeColor:state.themeColor
  }
}

let mapDispatchToProps=(dispatch)=>{
  return{
    onSwithColor:(color)=>{
      dispatch({type:'CHANGE_COLOR',themeColor:color})
    }
  }
}

ThemeSwitch=connect(mapStateToProps,mapDispatchToProps)(ThemeSwitch)

export default ThemeSwitch