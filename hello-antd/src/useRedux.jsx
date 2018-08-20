import React, { Component } from 'react';
import { Checkbox,Row,Col,Button,Radio } from 'antd';
import {fromJS} from "immutable";
const RadioGroup = Radio.Group;
const axios = require('axios');
export default class UseAjax extends Component {
  constructor() {
    super()
    this.state = {
      data:{},
      start:0,
      end:5,
    }

  }

  componentWillMount() {



  }

  componentDidMount() {
    let {start,end}=this.state
    //使用axios发送异步的ajax请求
    /*
    axios.post('http://localhost:3000/looks/showboys', {
      start:start,
      end:end
    })
      .then((response)=> {
        console.log(response.data,"axios,post");
      })
      .catch((error)=> {
        console.log(error);
      })
*/

    //使用fetch发送异步的ajax请求
    /*
    //get
    fetch("http://localhost:3000/looks/showboys?start="+start+"&end="+end)
      .then(response=>{
        //返回的是一个promise对象，所以下面才会.then
        return response.json()
      }).then(data=>{
        //这里的data才是数据
        console.log(data,"fetch,get")
    }).catch(error=>{
      console.log(error)
    })
    */

/*
    // post
    fetch("http://localhost:3000/looks/showboys",{
      method:"POST",
      body:JSON.stringify({start:start,end:end}),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(response=>{
          //返回的是一个promise对象，所以下面才会.then
          return response.json()
        })
      .then(data=>{
        console.log(data,"fetch,post")
      })
      .catch(error=>{
        console.log(error)
      })
*/



  }




  render() {
    let {data}=this.state

    return <Row>

  </Row>

  }

}




// ReactDOM.render(<App />, document.getElementById('container'));