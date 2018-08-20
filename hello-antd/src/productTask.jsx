
import React, {Component} from 'react';
import {Button, Table, Row, Col, Modal, Input, Select, DatePicker, Tabs, Icon} from 'antd';
import {ajaxGet, ajaxPost, getCookie} from 'COMMON/common';
import {is, fromJS} from 'immutable'
import moment from 'moment'

export default class ProductTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //输入框显示
      filterDropdownVisible: false,
      //搜索的内容
      searchText: '',
      //是否过滤
      filtered: false,
      dataSource: this.props.tableDatas

    }
    this.onInputChange=this.onInputChange.bind(this)
    this.onSearch=this.onSearch.bind(this)
  }

//输入框的value变化时触发
onInputChange(e){
  this.setState({ searchText: e.target.value })
}
//搜索
onSearch() {
  const { searchText } = this.state
  //创建正则表达式
  const reg = new RegExp(searchText, 'gi')
  //每次搜索都是从所有表数据搜索，而不是在之前搜索的基础上过滤
  let trueDataSource=this.props.tableDatas
  this.setState({
    filterDropdownVisible: false,
    filtered: !!searchText,
    dataSource: trueDataSource.map((record) => {
      //表格的某列来进行筛选，也可以使用模糊查询，全部筛选
      const match = record.name.match(reg)
      if (!match) {
        return null
      }
      return {
        ...record,
        name: (
          <span>
            {/*搜索字段高亮*/}
            {record.name.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((text, i) => (
              text.toLowerCase() === searchText.toLowerCase()||text===searchText ?
                <span key={i} className="highlight">{text}</span> : text // eslint-disable-line
            ))}
          </span>
        ),
      }
    }).filter(record => !!record),
  })
}

  render() {
    let { dataSource} = this.state;
    let scrollWidth = 0;
    colWidth.forEach(item => {
      scrollWidth += item;
    })
    let datasCol = this.props.tableDatas.get('cols')
    let column = datasCol.map((item, key) => {
        let dataIndex = item.get('dataindex')
        let width = colWidth[key]
        let option = {
            title: <div style={{
              display: 'flex',
              flexFlow: 'row'
            }}>
              <p className="spanLineText">{item.get('text')}</p>
            </div>,
            dataIndex: dataIndex,
            key: dataIndex,
            width: width,
            //todo:筛选
            filterDropdown: (
              <div className="custom-filter-dropdown">
                <Input
                  ref={ele => this.searchInput = ele}
                  placeholder="输入关键字"
                  value={this.state.searchText}
                  onChange={(e)=>this.onInputChange(e)}
                  onPressEnter={()=>this.onSearch()}
                />
                <Button type="primary" onClick={()=>this.onSearch()}>Search</Button>
              </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
              this.setState(
                {filterDropdownVisible: visible},
                () => this.searchInput && this.searchInput.focus()
              )
            },

            render(text, record, index) {
              return <span title={text} className="norwap"
                           style={{
                             width: width
                           }}>{text}</span>
            }
          }
        return option;
      })

    return <Table size='middle'
             bordered
             rowKey="a"
             dataSource={dataSource}
             columns={column}
            />
  }
}