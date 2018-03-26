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

class Index extends Component {
  render () {
    return (
      <div>
        <LikeButton/>
      </div>
    )
  }
}

// {<LikeButton/>,}
ReactDOM.render(
  <Index/>,
  document.getElementById('root')
)



