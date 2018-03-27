import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'


class Comment extends Component{
  static propTypes={
    comment:PropTypes.object.isRequired
  }

  constructor(){
    super()
    this.state={timeString:''}
  }

  componentWillMount(){
    this._updateTimeString()
  //  添加定时器
    this.timer=setInterval(
     this._updateTimeString.bind(this)
    ,5000)

  }

  _updateTimeString(){
    let comment=this.props.comment
    let duration=(+new Date-comment.punishTime)/1000
    //Math.max返回两者较大的那个数
    this.setState({
      timeString:duration>60? `${Math.round(duration/60)}分钟前`:
        `${Math.round(Math.max(duration,1))}秒前`
    })
  }

  render(){
    return(
      <div className='comment'>
        <div className='comment-user'>
          <span>{this.props.comment.username}：</span>
        </div>
        <p>{this.props.comment.content} 发布时间：{this.state.timeString}</p>
      </div>
    )
  }
}
export default Comment
