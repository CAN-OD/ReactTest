import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AutoFinish from './autoFinish';
import CheckBoxx from './checkBoxx';
import UseAjax from "./useAjax";

//自动补全组件
ReactDOM.render(
  //checkbox多选组件
  <UseAjax/>,
  document.getElementById('root')
)

