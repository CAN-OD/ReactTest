import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AutoComplete } from 'antd';

function onSelect(value) {
  console.log('onSelect', value);
}
class App extends Component {
  state = {
    dataSource: [],
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  }
  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={this.handleSearch}
        placeholder="input here"
      />
    );
  }
}

export default App;
