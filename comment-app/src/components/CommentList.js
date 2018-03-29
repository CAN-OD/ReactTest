import React,{Component} from 'react';
import Comment from './Comment'
import PropTypes from 'prop-types'


export default class CommentList extends Component{
  static propTypes={
    comments:PropTypes.array,
    onDeleteComment:PropTypes.func
  }

  static defaultProps={
    comments:[]
  }

  //用来接收子组件传来的index
  handleDeleteComment(index){
    if(this.props.onDeleteComment){
      this.props.onDeleteComment(index)
    }
  }

  render(){
    return(
      <div>
        {this.props.comments.map(
          (comment,i)=>
            <Comment
              comment={comment}
              key={comment.punishTime}
              index={i}
              onDeleteComment={this.handleDeleteComment.bind(this)}
            />
        )}
      </div>
    )
  }
}
