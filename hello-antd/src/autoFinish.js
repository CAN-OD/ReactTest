import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AutoComplete } from 'antd';

function onSelect(value) {
  console.log('onSelect', value);
}
export default class AutoFinish extends Component {
  constructor(){
    super()
    this.state={
      dataSource:["aa","ab","bc"],
      arr:[]
    }
  }


  render() {
    let {dataSource,arr}=this.state
    let aa=[],that=this

    function handleSearch(value){
      if(value){
        for(let i=0;i<dataSource.length;i++){
          if(dataSource[i]&&dataSource[i].indexOf(value)>-1){
            aa.push(dataSource[i])
          }
        }
        that.setState({
          arr:aa
        })
      }else{
        that.setState({
          arr:[]
        })
      }
    }
    function onSelect(value) {
      console.log(value)
    }
    return (
      <AutoComplete
        // dataSource={dataSource}
        dataSource={arr}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={handleSearch}
        placeholder="input here"
      />
    );
  }
}


