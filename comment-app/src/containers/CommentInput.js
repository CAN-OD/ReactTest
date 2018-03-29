import React,{Component} from 'react';
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import CommentInput from '../components/CommentInput'
import { addComment } from '../reducers/comments'
//CommentInputContainer
//负责用户名的加载、保存、评论的发布
class CommentInputContainer extends Component{
  static propTypes= {
    comments: PropTypes.array,
    onSubmit: PropTypes.func
  }

  constructor(){
    super()
    this.state={username:''}
  }

  submitComment(comment) {
    if(!comment) return
    if (!comment.username) return alert('请输入用户名')
    if (!comment.content) return alert('请输入评论内容')
  //  新增评论保存到localstroage中
    let {comments}=this.props
    let newComments=[...comments,comment]
    localStorage.setItem('comments',JSON.stringify(newComments))
  //  this.props.fabuInput是connect传进来的
  //  所以要dispatch一个action去新增评论
    if(this.props.onSubmit){
      this.props.onSubmit(comment)
    }
  }


  _saveUsername(username){
    localStorage.setItem('username',username)
  }

  _loadUserName(){
  //  从localstroage加载username
  //  然后在render方法中传给commentinput
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
      <CommentInput
        username={this.state.username}
        onUserNameInputBlur={this._saveUsername.bind(this)}
        onSubmit={this.submitComment.bind(this)}
      />
    )
  }
}

let mapStateToProps=(state)=>{
  return{
    comments:state.comments
  }
}

let mapDispatchToProps=(dispatch)=>{
  return{
    onSubmit:(comment)=>{
      dispatch(addComment(comment))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInputContainer)
