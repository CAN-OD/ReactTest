//action types
const INIT_COMMENTS='INIT_COMMENTS'
const ADD_COMMENT='ADD_COMMENT'
const DELETE_COMMENT='DELETE_COMMENT'

//reducer用于描述数据的状态和相应的变更
// 如：新增评论、删除评论、初始化评论
export default function (state,action) {
  if(!state){
    state={comments:[]}
  }
  switch(action.type){
  //  初始化评论
    case INIT_COMMENTS:
      return {comments:action.comments}
    case ADD_COMMENT:
      //新增评论，除了之前的评论数组
      //还有新增的评论
      return {comments:[...state.comments,action.comment]}
    case DELETE_COMMENT:
      //删除评论，记住 index！
      // console.log(state.comments,222222222)
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
//将action封装到action creators函数中，去帮助我们构建action
export const initComments=(comments)=>{
  return {type:INIT_COMMENTS,comments}
}

export const addComment=(comment)=>{
  return {type:ADD_COMMENT,comment}
}

export const deleteComment=(commentIndex)=>{
  return {type:DELETE_COMMENT,commentIndex}
}






