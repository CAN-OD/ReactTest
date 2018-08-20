// import React, { Component } from 'react';
// // import logo from './logo.svg';
// // import './App.css';
// import { Checkbox,Row,Col,Button,Radio } from 'antd';
// // import {fromJS} from "immutable";
// // const RadioGroup = Radio.Group;
// //
// // export default class CheckBoxx extends Component {
// //   constructor() {
// //     super()
// //     this.state = {
// //       //所有选项
// //       source:["a", "b", "c", "d"],
// //       //默认显示选中的勾
// //       testSource:[],
// //       //test1的值
// //       dataSource1: ["a", "b"],
// //       //test2的值
// //       dataSource2: ["a", "b", "c", "d"],
// //
// //     }
// //     this.editChoose=this.editChoose.bind(this)
// //     this.checkChange=this.checkChange.bind(this)
// //   }
// //
// //   componentWillMount() {
// //     this.setState({
// //       testSource:this.state.dataSource1,
// //     })
// //   }
// //
// //   checkChange(value,index){
// //     let {testSource}=this.state
// //     let newArr=testSource
// //     // if(newArr.includes(value)){
// //     if(newArr.indexOf(value)>-1){
// //       // newArr=newArr.set(index,'')
// //       newArr[index]=""
// //       this.setState({testSource:newArr})
// //     }else{
// //       // newArr=newArr.set(index,value)
// //       newArr[index]=value
// //       this.setState({testSource:newArr})
// //     }
// //     console.log(testSource)
// //   }
// //
// //   editChoose(item){
// //     item==="test1"?
// //       this.setState({testSource:this.state.dataSource1,})
// //       :
// //       this.setState({testSource:this.state.dataSource2,})
// //   }
// //
// //   showCheck() {
// //
// //   }
// //
// //   saveCheck() {
// //
// //   }
// //
// //
// //   render() {
// //     let {dataSource1,dataSource2,source,testSource}=this.state
// //
// //     return <Row>
// //       <Col span="4">
// //         <ul>
// //           <li onClick={()=>{this.editChoose("test1")}}>测试1</li>
// //           <li onClick={()=>{this.editChoose("test2")}}>测试2</li>
// //         </ul>
// //         </Col>
// //       <Col span="4">
// //         <RadioGroup
// //           style={{ width: '380px' }}
// //         >
// //           {
// //             <Row>
// //               {source&&source.map((item,index)=>{
// //                   return <Col span={6}>
// //                     <Checkbox
// //                       style={{fontSize:'13px'}}
// //                       value={item}
// //                       checked={testSource.includes(item)}
// //                       onChange={(e)=>this.checkChange(item,index)}
// //                     >
// //                       {item}
// //                     </Checkbox>
// //                   </Col>
// //                 })
// //
// //               }
// //               <Col span={8} offset={10} style={{marginTop:"5px"}}>{
// //                 <Button type="primary" onClick={()=>{this.saveCheck()}}>改变</Button>
// //               }
// //
// //               </Col>
// //             </Row>
// //           }
// //         </RadioGroup>
// //       </Col>
// //       <Col span="16"> </Col>
// //
// //   </Row>
// //
// //   }
// //
// // }
// //
//
// const { Select, Popover, Button ,Table} = antd;
// const tableData =[
//   {
//     index:'1',
//     sku:'abc',
//     name:'名字'
//   },{
//     index:'2',
//     sku:'abc',
//     name:'名字'
//   },{
//     index:'3',
//     sku:'abc',
//     name:'名字'
//   },{
//     index:'4',
//     sku:'abc',
//     name:'名字'
//   },{
//     index:'5',
//     sku:'abc',
//     name:'名字'
//   }
// ]
//
// const SelectData =[
//   {
//     id:'1',
//     name:'first'
//   },
//   {
//     id:'2',
//     name:'second'
//   }
// ]
//
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       visible: false,
//     };
//     this.columns = [
//       {
//         title: '序号',
//         dataIndex: 'index',
//         width:100
//       },{
//         title: 'sku',
//         dataIndex: 'sku',
//         width:100
//       },{
//         title: '名字',
//         dataIndex: 'name',
//         width:100,
//         render: (text, record, index) => {
//           const options = SelectData.map(region => <Option key={region.id}>{region.name}</Option>)
//           return (
//             <Select style={{width:80}} placeholder='请选择' getPopupContainer={triggerNode => triggerNode.parentNode}>
//               {options}
//             </Select>
//           );
//         }
//       }]
//   }
//
//
//
//   render() {
//     return (
//       <div style={{margin: 10}}>
//         <div style={{height: 200}}>
//           测试
//         </div>
//         <Table scroll={{x:300,y: 100}} bordered dataSource={tableData} columns={this.columns} pagination={false} />
//         <div style={{height: 100}}>
//           测试
//         </div>
//       </div>
//     );
//   }
// }
//
// ReactDOM.render(<App />, document.getElementById('container'));