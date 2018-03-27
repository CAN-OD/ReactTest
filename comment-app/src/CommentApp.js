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

  }

  render() {
    //通过传入回调函数获取数据
    return (
      <div className='wrapper'>
        <CommentInput fabuInputOut={this.fabuApp.bind(this)}/>
        <CommentList comments={this.state.comments}/>
      </div>
    )
  }
}

export default CommentApp