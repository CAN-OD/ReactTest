import HighComponent from './HighComponent'
import React,{Component} from 'react'


class InputWithUserName extends Component{

  render(){
    return(
      <input value={this.props.data} />
    )
  }
}

//类inputwidthusername是先在hightcomponent中过滤了一遍，并获取到localstroage中的userName
//并赋值给props.data，所以可以直接在input框中获取到值
//即新组建覆盖了旧组件
//为什么要放下面？
//先定义类然后再去过滤（赋值）
InputWithUserName =HighComponent(InputWithUserName,'username')
export default InputWithUserName