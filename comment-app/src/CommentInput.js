import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class CommentInput extends Component{
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

  render(){
    return(
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>

            <input value={this.state.username} onChange={(event)=>{this.setState({username:event.target.value})}}/>
          </div>
        </div>

        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea value={this.state.content} onChange={(event)=>{this.setState({content:event.target.value})}}/>
          </div>
        </div>

        <div className='comment-field-button'>
          <button onClick={this.fabuInputIn.bind(this)}>发布</button>
        </div>
      </div>
    )
  }
}

export default CommentInput