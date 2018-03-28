import React,{Component} from 'react'

//传进去的是WrappedComponent
export default (WrappedComponent,name)=>{
  //构建新的组件类NewComponent
  class NewComponent extends Component{
  //  可以做很多自定义逻辑
    constructor(){
      super()
      this.state={data:null}
    }

    //渲染前获取name
    componentWillMount(){
      let data=localStorage.getItem(name)
      this.setState({data})
    }

    //给props.data赋值name
    render(){
      return <WrappedComponent data={this.state.data}/>
    }
  }
  return NewComponent
}

