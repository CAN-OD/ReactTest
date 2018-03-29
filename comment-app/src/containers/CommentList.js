import React,{Component} from 'react';
import {connect} from 'react-redux'
import CommentList from '../components/CommentList'
import {initComments,deleteComment} from "../reducers/comments";
import PropTypes from 'prop-types'


// class CommentList extends Component{
//CommentListContainer
//一个smart组件，负责 评论列表 数据的加载、初始化、删除评论
class CommentListContainer extends Component{
  static propTypes={
    comments:PropTypes.array,
    initComments:PropTypes.func,
    onDeleteComment:PropTypes.func
  }

  handleDeleteComment(index){
    // if(!index) return
    let {comments}=this.props
  // props是不能变得，所以新建一个删除特定下标的评论列表
  //  这个删除是该组件自己新建一个变量去“删除”的

    let newComments=[
      ...comments.slice(0,index),
      ...comments.slice(index+1)
    ]
  //  删除后需要及时更新localstroage中的数据
  //保存最新的评论列表到localstroage
      // console.log(newComments,32)
      localStorage.setItem("comments",JSON.stringify(newComments))
    console.log(localStorage.getItem("comments"),322222222222)
  //  我们还要把要删除的评论传给this.props.onDeleteComment
    if(this.props.onDeleteComment){
    //  this.props.onDeleteComment是connect传进来的
    //  所以要用dispatch一个action去删除评论
      this.props.onDeleteComment(index)
    }
  }


  _loadComments(){
    let comments=localStorage.getItem("comments")
    comments=comments?JSON.parse(comments):[]
  //  this.props.initCommetns是connect传进来的
  //  可以帮我们把数据初始化到state中
    this.props.initComments(comments)
  }

  componentWillMount(){
  //  在这里初始化评论
    this._loadComments()
  }

  render(){
    return(
      <CommentList
        comments={this.props.comments}
        onDeleteComment={this.handleDeleteComment.bind(this)}
      />
    )
  }
}

//评论列表从state.comments中获取
let mapStateToProps=(state)=>{
  return{
    comments:state.comments
  }
}

let mapDispatchToProps=(dispatch)=>{
  return{
  //  提供给CommentListContainer
  //  当从localstroage加载评论列表后会通过该方法
  //  把评论列表初始化到state当中
    initComments:(comments)=>{
      dispatch(initComments(comments))
    },
  //  删除评论
    onDeleteComment:(commentIndex)=>{
      dispatch(deleteComment(commentIndex))
    }
  }
}

//将CommentListContainer connect到store
//这样才能把comments、initComments、
// onDeleteComment传给CommentListContainer

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(CommentListContainer)






