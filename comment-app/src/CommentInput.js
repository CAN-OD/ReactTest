import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'


class CommentInput extends Component{
  static propTypes={
    fabuInputOut:PropTypes.func
  }

  constructor(){
    super()
    this.state={
      username:'',
      content:''
    }
  }
  //发布按钮
  fabuInputIn(){
    //如果props中有fabu函数
    if(this.props.fabuInputOut){
      //重新定义变量把state中的属性传入
      //为什么?因为state改变不会立即改变
      let {username,content}=this.state
      //就调用该函数，把username,content传进去
      //子传父
      this.props.fabuInputOut({username,content})
    }
    //点击发布就清空内容
    this.setState({content:''})
  }
  //将用户名保存在localstroage中
  //所有私有方法都以 _开头

  changeUsername(event){
    this.setState({username:event.target.value})
  }
  saveUsername(event){
    localStorage.setItem('username',event.target.value)
    console.log(localStorage)
  }

  _loadUserName(){
    let username=localStorage.getItem('username')
    if(username){
      this.setState({username})
    }
  }

  //在渲染前加载用户名
  componentWillMount(){
    this._loadUserName()
  }

  render(){
    return(
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input
              value={this.state.username}
              onChange={this.changeUsername.bind(this)}
              onBlur={this.saveUsername.bind(this)}
            />
          </div>
        </div>

        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea  ref={(textarea)=>this.textareaa=textarea} value={this.state.content} onChange={(event)=>{this.setState({content:event.target.value})}}/>
          </div>
        </div>

        <div className='comment-field-button'>
          <button onClick={this.fabuInputIn.bind(this)}>发布</button>
        </div>
      </div>
    )
  }

  componentDidMount(){
    this.textareaa.focus()
  }

}

export default CommentInput