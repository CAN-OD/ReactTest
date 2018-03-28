import React, { Component } from 'react'
import PropTypes from 'prop-types'

//但是每个组件需要从高阶组件获取的数据是不一样的，
//所以我们需要告诉高阶组件，子组件需要什么数据
//让高阶组件返还正确的数据
/*let mapStateToProps=(state)=>{*/
  //该函数接收store.getState()的结果作为参数
  //然后返回一个对象，该对象根据state生成
  /*return{
    themeColor:state.themeColor,
    themeName:state.themeName,
    fullName:`${state.firstName} ${state.lastName}`
  }
}*/

//connect函数接收一个组件Wrappercomponent作为参数
//把该组件包含在新组件Connect里面
//Connect会从context里面取出store
//再从store里面获取数据并通过props传给wrappercomponent
export const connect=(mapStateToProps,mapDispatchToProps)=>(WrapperComponent)=>{
  class Connect extends Component{
    static contextTypes={
      store:PropTypes.object
    }

    constructor(){
      super()
      this.state={
        //用来保存需要传给被包装组件的所有的参数
        allProps:{}
      }
    }

    //在即将渲染的时候
    componentWillMount(){
      let {store}=this.context
      //初始化
      this._updateProps()
      //监听数据变化重新调用_updateProps
      store.subscribe(()=>this._updateProps)
    }

    _updateProps(){
      let {store} = this.context
      //额外传入props，更灵活获取数据
      // let stateProps=mapStateToProps(store.getState(),this.props)
      //防止map State ToProps没有传入
      let stateProps=mapStateToProps?
          mapStateToProps(store.getState(),this.props):
          {}
      //防止map Dispatch ToProps没有传入
      let dispatchProps=mapDispatchToProps?
          mapDispatchToProps(store.dispatch,this.props):
          {}
      this.setState({
        //整合普通的props和从state生成的props
        allProps:{
          ...stateProps,
          ...this.props,
          ...dispatchProps
        }
      })
    }

    render(){
      // let {store} = this.context
      // let stateProps=mapStateToProps(store.getState())
      //{...stateProps}意思是
      // 把该对象里的属性都通过props方式传递进去
      // return <WrapperComponent {...stateProps}/>
      return <WrapperComponent {...this.state.allProps}/>
    }
  }
  return Connect
}

