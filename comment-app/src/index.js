import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CommentApp from "./CommentApp";
//在头部引入该库
import PropTypes from 'prop-types'

class Input extends Component {
  constructor(){
    super()
    this.state={
      number:0
    }
  }

  render () {
    return (
      <div>
        <input type='number'
               value={this.state.number}
               onChange={(event)=>{
                 if(this.props.numberOut){
                   this.props.numberOut({number:event.target.value})
                 }
                 this.setState({number:event.target.value})

               }}
        />
      </div>
    )
  }
}

class PercentageShower extends Component {
  static defaultProps={
    pernumber:0
  }



  render () {
    return (
      <div>
        {(this.props.pernumber*100).toFixed(2)+'%'}
      </div>
    )
  }
}

class PercentageApp extends Component {
  constructor(){
    super()
    this.state={
      numbers:0
    }
  }

  numberApp(number){
    //防止意外情况
    if(!number.number) return
    this.setState({numbers:number.number})
  }


  render () {
    return (
      <div>
        <Input numberOut={this.numberApp.bind(this)}/>
        <PercentageShower pernumber={this.state.numbers}/>
      </div>
    )
  }
}

class Header extends Component{
  constructor(){
    super()
    console.log("constructor")
  }

  componentWillMount(){
    console.log("组件将嵌入")
  }

  render(){
    console.log("render")
    return(
      <div>啊啊啊啊啊啊</div>
    )
  }

  componentDidMount(){
    console.log("组件已被嵌入")
  }


}

class Index extends Component{
  constructor(){
    super()
    this.state={
      isShow:true
    }
  }
 showOrHide(){
    this.setState({
      isShow:!this.state.isShow
    })
 }

 render(){
    return(
      <div>
        {this.state.isShow?<Header/>:null}
        <button onClick={this.showOrHide.bind(this)}>
          显示或隐藏标题
        </button>
      </div>
    )
 }

}

class Clock extends Component {
  constructor () {
    super()
    this.state = {
      date:new Date(),
    }
  }


  //一些组件启动的动作，包括像Ajax数据的拉取操作
  //一些定时器的启动等，放在componentWillMount执行
  componentWillMount(){
    console.log("组件将嵌入")
    //从后台获取的数据
    // ajax.get('http://json-api.com/user',(userData)=>{
    //   this.setState({userData})
    // })

  //  定时器
    this.timer=setInterval(()=>{
      this.setState({date:new Date()})
    },1000)

  }

  render () {
    return (
      <div>
        <h1>
          <p>现在的时间是:</p>
          {this.state.date.getSeconds()}
        </h1>

      </div>
    )
  }

  //删除组件的时候记得要清除定时器
  componentWillUnmount () {
    clearInterval(this.timer)
  }
}

class ShowClock extends Component{
  constructor(){
    super()
    this.state={
      isShow:true
    }
    console.log("constructor")
  }

  showOrHide(){
    this.setState({
      isShow:!this.state.isShow
    })
  }


  componentWillMount(){
    console.log("组件将嵌入")
  }

  render(){
    console.log("render")
    return(
      <div>
        {this.state.isShow?<Clock/>:null}
        <button onClick={this.showOrHide.bind(this)}>
          显示或隐藏时钟
        </button>
      </div>
    )
  }

  componentDidMount(){
    console.log("组件已被嵌入")
  }
}

class AutoFocusInput extends Component{
  constructor(){
    super()
    this.state = {
    }
    console.log("constructor")
  }

  componentWillMount(){
    console.log("组件将嵌入")
  }

  render(){
    console.log("render")
    //先给input标签设置ref属性
    //ref属性会将该DOM节点传给inputa
    //这样，我们就可以直接操作DOM了
    return(
      <div>
        <input value='aaa'/>
        <input ref={(input)=>this.inputa=input}/>
      </div>

    )
  }

  componentDidMount(){
    console.log("组件已被嵌入")
    this.inputa.focus()
  }
  componentWillUnmount () {

  }
}

class Card extends Component{
  constructor(){
    super()
    this.state = {
    }

  }

  componentWillMount(){

  }

  render(){

    return(
      <div>
        <div>{this.props.children[1]}</div>
        <div>{this.props.children[1]}</div>
      </div>
    )
  }

  componentDidMount(){

  }
  componentWillUnmount () {

  }
}



class BlackBorderContainer extends Component {
  render () {
    return (
      <div>
        {this.props.children.map((item)=>
          <div style={{border:'1px solid #000000'}}>
            {item}
          </div>
        )}
      </div>
    )
  }
}

class Editor extends Component {
  constructor() {
    super()
    this.state = {
      content: '<h1>React.js 小书</h1>'
    }
  }
  render () {
    return (
      <div className='editor-wrapper'
           dangerouslySetInnerHTML={{__html:this.state.content}}/>
    )
  }
}

class Proptype extends Component{
  static propTypes={
    //传入的类型必须为对象object
    comment:PropTypes.object.isRequired
  }

  render(){
    let {comment}=this.props
    return(
      <div className='comment'>
        <div className='comment-user'>
          <span>{comment} </span>：
        </div>
        <p>{comment}</p>
      </div>

    )
  }
}

class Aaa extends Component{
  render(){
    return(
      <div>
      <Proptype />
      </div>
    )
  }
}

ReactDOM.render(
  <CommentApp />
    ,
  document.getElementById('root')
)

