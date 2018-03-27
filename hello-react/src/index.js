//导入react
//导入Component
//Component是reactjs的组件父类
//只要写Reactjs的组件，就必须引入这两个东西
import React,{Component} from 'react';
//导入reactDom
//可以帮助我们把React组件渲染到页面上去
import ReactDOM from 'react-dom';
//导入样式文件
import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

class LikeButton extends Component {
  //  默认配置,不在构造函数里面！
  static defaultProps={
    likeText:'取消aa',
    unlikeText:'点赞bb'
  }
  constructor () {
    super()
    this.state = {
      isLiked: false,
    }
  }
  handleClickOnLikeButton () {
    this.setState({
      isLiked: !this.state.isLiked,
      //在这里面可以更改配置props的状态
      likedText: '取消',
      unlikedText: '点赞'
    })
  //  如果有this.props.onClick属性的话就执行
    if(this.props.onClick){
      this.props.onClick()
    }
  }
  render () {
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked ? this.props.likeText : this.props.unlikeText} 👍
      </button>
    )
  }
}

//列表渲染
let users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
]

class User extends Component{
  render(){
    let {user} =this.props
    return(
      <div>
        <div>姓名：{user.username}</div>
        <div>年龄：{user.age}</div>
        <div>性别：{user.gender}</div>
        <hr/>
      </div>
    )

  }

}

const lessons = [
  { title: 'Lesson 1: title', description: 'Lesson 1: description' },
  { title: 'Lesson 2: title', description: 'Lesson 2: description' },
  { title: 'Lesson 3: title', description: 'Lesson 3: description' },
  { title: 'Lesson 4: title', description: 'Lesson 4: description' }
]

class Lesson extends Component {
  render(){
    let {lesson} =this.props
    return(
      <div onClick={()=>console.log(`${this.props.index} - ${lesson.title}`)}>
        <h1>{lesson.title}</h1>
        <p>{lesson.description}</p>
      </div>
    )

  }
}

class LessonsList extends Component {
  render () {
    return (
      <div>
        {lessons.map((lesson,i)=>{return <Lesson key={i} index={i} lesson={lesson}/>}
        )}
      </div>
    )
  }
}



class Index extends Component {
  render () {
    //显示数组
    return (
      <div>
        <LikeButton/>
        <hr/>
        {users.map((user,i)=><User key={i} user={user}/>
        )}
        <div></div>
        <LessonsList/>
      </div>
    )
    }
}






// {<LikeButton/>,}
ReactDOM.render(
  <Index/>,
  document.getElementById('root')
)



