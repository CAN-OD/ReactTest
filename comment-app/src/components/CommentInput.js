import React,{Component} from 'react'
import PropTypes from 'prop-types'

export default class CommentInput extends Component{
  //改成dumb组件
  //那么username需要从props上获取
  static propTypes={
    username:PropTypes.any,
    onSubmit:PropTypes.func,
    onUserNameInputBlur:PropTypes.func
  }

  static defaultProps={
    username:''
  }

  //初始化需要从props上获取字段
  constructor(props){
    super(props)
    this.state={
      username:props.username,
      content:'',
    }
  }
  //发布按钮
  handleSubmit(){
    //如果props中有fabu函数
    if(this.props.onSubmit){
      //重新定义变量把state中的属性传入
      //为什么?因为state改变不会立即改变
      // let {username,content}=this.state
      //就调用该函数，把username,content传进去
      //子传父
      this.props.onSubmit({
        username:this.state.username,
        content:this.state.content,
        punishTime: +new Date()
      })
    }
    //点击发布就清空内容
    this.setState({content:''})
  }

  //将用户名保存在localstroage中
  //所有私有方法都以 _开头
  //handleUserNameChange
  changeUsername(event){
    this.setState({username:event.target.value})
  }
  //handleContentChange
  changeContent(event){
    this.setState({content:event.target.value})
  }

  //saveUserName改从props获取
  //saveUsername即从用户名框离开焦点
  saveUsername(event){
    if(this.props.onUserNameInputBlur){
      //如存在就赋值
      this.props.onUserNameInputBlur(event.target.value)
    }
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
            <textarea  ref={(textarea)=>this.textareaa=textarea} value={this.state.content} onChange={this.changeContent.bind(this)}/>
          </div>
        </div>

        <div className='comment-field-button'>
          <button onClick={this.handleSubmit.bind(this)}>发布</button>
        </div>
      </div>
    )
  }

  componentDidMount(){
    this.textareaa.focus()
  }

}

// export default CommentInput