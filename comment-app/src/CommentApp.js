import React,{Component} from 'react';
import CommentList from './CommentList';
import CommentInput from "./CommentInput";

class CommentApp extends Component {
  constructor(){
    super()
    this.state={
      comments:[]
    }
  }
  //每当用户发布评论（点击按钮）的时候，就把
  //评论数组插入到comments中，然后通过setSate更新到页面上
  fabuApp(comment){
    //防止意外情况
    if(!comment) return
    if(!comment.username) return alert('请输入用户名')
    if(!comment.content) return alert('请输入评论内容')
    this.state.comments.push(comment)
    this.setState({comments:this.state.comments})
    this._saveComments(this.state.comments)
  }

  componentWillMount(){
    this._loadComments()
  }

  _loadComments(){
    let comments=localStorage.getItem("comments")
    if(comments){
    //  将其转换为json格式
      comments= JSON.parse(comments)
      this.setState({comments})
    }
  }

  _saveComments(comments){
    //将数组comments全部转化为字符串存进去
    localStorage.setItem('comments',JSON.stringify(comments))
  }

  handleDeleteComment(index){
    let comments=this.state.comments
    comments.splice(index,1)
    //刷新状态
    this.setState({comments})
    //更改localstroage中的评论
    this._saveComments(comments)
  }

  render() {
    //通过传入回调函数获取数据
    return (
      <div className='wrapper'>
        <CommentInput fabuInputOut={this.fabuApp.bind(this)}/>
        <CommentList
          comments={this.state.comments}
          onDeleteComment={this.handleDeleteComment.bind(this)}
        />
      </div>
    )
  }
}

export default CommentApp
