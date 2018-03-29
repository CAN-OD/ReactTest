import React,{Component} from 'react';
import PropTypes from 'prop-types'
export default class Comment extends Component{
  static propTypes={
    //评论
    comment:PropTypes.object.isRequired,
  //  删除某个评论
    onDeleteComment:PropTypes.func,
  //  注意！下标是由父组件传给该组件的
    index:PropTypes.number

  }

  constructor(){
    super()
    this.state={timeString:''}
  }

  componentWillMount(){
    //初始化时间
    //即一开始就要显示多少分钟前
    this._updateTimeString()
  //  然后添加定时器去每隔5秒改变文字
    this.timer=setInterval(
     this._updateTimeString.bind(this)
    ,5000)

  }

  //获取当前时间距离发布评论的时间 的差值
  _updateTimeString(){
    let comment=this.props.comment
    let duration=(+new Date-comment.punishTime)/1000
    //Math.max返回两者较大的那个数
    this.setState({
      timeString:duration>60? `${Math.round(duration/60)}分钟前`:
        `${Math.round(Math.max(duration,1))}秒前`
    })
  }

  //删除评论
  handleDeleteComment(){
    if(this.props.onDeleteComment){
      this.props.onDeleteComment(this.props.index)
    }
  }

  //当用户输入``的时候将``转化为<code></code>,使被包裹其中的用代码形式来显示
  _getProcessedContent (content) {
    // 但是这样做会有严重的 XSS 漏洞，
    // 用户可以输入任意的 HTML 标签，
    // 用 <script> 执行任意的 JavaScript 代码。
    // 所以在替换代码之前，
    // 我们要手动地把这些 HTML 标签进行转义：
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }

  render(){
    let comment=this.props.comment
    return(
      <div className='comment'>
        <div className='comment-user'>
          <span>{comment.username}：</span>
        </div>

        <p dangerouslySetInnerHTML={{
          __html:this._getProcessedContent(comment.content)
        }}
          />

        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>

        <span className='comment-delete'
              onClick={this.handleDeleteComment.bind(this)}>
          删除
        </span>

      </div>
    )
  }

  //注意！在评论被删除后需要取消定时器！！
  componentWillUnmount () {
    clearInterval(this.timer)
  }

}

