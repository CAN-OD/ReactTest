//action types
const INIT_COMMENTS='INIT_COMMENTS'
const ADD_COMMENT='ADD_COMMENT'
const DELETE_COMMENT='DELETE_COMMENT'

//reducer用于描述数据的状态和相应的变更
//功能
// 如：新增评论、删除评论、初始化评论
export default function (state,action) {
  //在CommentApp中state就一个comments数组，
  //数组中包含每一个评论的对象，
  // 每个对象由用户名、评论内容、评论时间组成
  if(!state){
    state={comments:[]}
  }
  //判断action的type
  switch(action.type){
  //  初始化评论
    case INIT_COMMENTS:
      // 我们的评论功能其实会从 LocalStorage 读取数据，读取数据以后其实需要保存到应用状态中。
      // 当遇到 INIT_COMMENTS 的 action 的时候，
      // 会新建一个对象，然后用 action.comments 覆盖里面的 comments 属性。
      //意思就是程序每执行一次，就去localstroage去读取一次
      //每读取一次，我们就为comments重新赋值一次
      return {comments:action.comments}
    case ADD_COMMENT:
      //新增评论，除了之前状态的评论数组 state.comments
      //还有新增动作(action)的新增评论
      return {comments:[...state.comments,action.comment]}
    case DELETE_COMMENT:
      //删除评论，记住 index！
      //删除评论是从先前的状态去删除的，所以取得评论数组都是state.comments
      //在return前执行逻辑操作，否则
      // 放在return中执行会报:
      // Uncaught TypeError: Cannot read property 'slice' of undefined 错误
      let aa=state.comments.slice(0,action.commentIndex)
      let bb=state.comments.slice(action.commentIndex+1)
      return {
          comments: [
            ...aa,
            ...bb
          ]

        }
    default:
      return state
  }
}

//action creators
//第二步：将action封装到action creators函数中，去帮助我们构建action
export const initComments=(comments)=>{
  return {type:INIT_COMMENTS,comments}
}

export const addComment=(comment)=>{
  return {type:ADD_COMMENT,comment}
}

export const deleteComment=(commentIndex)=>{
  return {type:DELETE_COMMENT,commentIndex}
}






