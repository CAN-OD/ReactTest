import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CommentApp from "./CommentApp";


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



ReactDOM.render(
  <Index />,
  document.getElementById('root')
)

