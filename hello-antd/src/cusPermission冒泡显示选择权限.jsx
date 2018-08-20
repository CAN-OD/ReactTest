/*客户权限*/
import React, {Component}from 'react';
import {Button,Row, Col, Icon, Tabs, Popover, message,Checkbox, Modal } from 'antd'
import { is, fromJS } from 'immutable';
import {ajaxPost} from "../../../../common/common";
import {Radio} from "antd/lib/index";
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
export default class CusPermission extends Component {
    constructor(props) {
    super(props);
    this.state = {
      systemUserRights:null,
      defaultRowCheck:fromJS([]),
      // isEdit:false
      // value :"客户管理"
      // value :["客户管理"]
    }
      this.editCustomPermission=this.editCustomPermission.bind(this)
      this.permit=this.permit.bind(this)
  }
  
    componentWillMount() {
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }

    //挂载渲染前
    componentWillUpdate(nextProps) {
    }

  checkChange(item,e){
    let {defaultRowCheck}=this.state
    let newArr=defaultRowCheck
    let index=+(item.FID)
    let value=item.FMc
      // if(newArr[index]===item.FMc){
      if(newArr.includes(value)){
        // newArr[index]=''
        newArr=newArr.set(index,'')
        // console.log(newArr.toJS(),73333)
        // this.setState({defaultRowCheck:newArr,time:new Date()})
        this.setState({defaultRowCheck:newArr})
      }else{
        // newArr[item.FID]=item.FMc
        newArr=newArr.set(index,item.FMc)
        // console.log(newArr.toJS(),79999)
        this.setState({defaultRowCheck:newArr})
      }
    // console.log(this.state.defaultRowCheck,822222)
  }

  //根据管理员的id、客户id修改客户权限
  //  获取相应管理员的客户的所有权限
  editCustomPermission(adminId,adminName,item,e){
    if(!adminName){
      // message.error("请先选择管理员！")
      e.stopPropagation()
      return
    }
      let arr=[]
      const json = {

      }

        ajaxPost('', json)
          .then(res => {
              let data=res.data
              // console.log(data,1100000)
              this.setState({
                systemUserRights: data
                , })
              data.map(item => {
                if (item.press === 'Y') {
                  arr[item.FID]=item.FMc
                }
              })
              this.setState({defaultRowCheck:fromJS(arr)})


            //下拉的权限
            // else {
            //   this.setState({
            //     QXDatas: res.data
            //   })
            // }
          })

    e.stopPropagation()
  }

  //许可、授权
  permit(item) {
      const {adminId} = this.props;
      let arr=this.state.defaultRowCheck
    // console.log(this.state.defaultRowCheck,131111)
      let newArr=[]
      arr.map((item,index)=>{
        if(item!==''&&typeof(item) !== "undefined"){
          newArr.push(index)
        }

      })
    // console.log(newArr,newArr.join(','),149999)
      const json = {
          c: item.get('FID'), //客户id
          u: adminId, //管理员id
          qs: newArr.join(',') //FID
      }

      ajaxPost('/sapi_tq/permission/ACCREDIT', json)
          .then(res => {
              // console.log(json, res,1377777);
              if (!res.isException) {
                  let data = res.data;
                  if (data > 0) {
                      Modal.success({
                          title: '授权成功！'
                      });
                  } else {
                      Modal.error({
                          title: '授权失败！'
                      });
                  }
              }
          })
  }

  render() {
      const {adminId,adminName,item} = this.props;
      let {defaultRowCheck,systemUserRights}=this.state
      // console.log(systemUserRights,defaultRowCheck,128888)
      return  <div style={{}}>
        <Popover placement="right"
                 title={adminName?"您正在修改 "+adminName+" 下的 "+item.get('FKhmc')+" 的权限":"请先选择管理员！"} trigger="click"
                 style={{fontSize:"15px",color:"#2679b5"}}
                 content={
                   <RadioGroup
                     style={{ width: '380px' }}
                     // options={this.state.systemUserRights}
                     // value={this.state.checkedList}
                     // onChange={this.onChange}
                   >
                     {
                       <Row>
                         {systemUserRights&&adminName?systemUserRights.map(item=>{
                             return <Col span={6}>
                               <Checkbox
                                 style={{fontSize:'13px'}}
                                 value={item.FMc}
                                 // checked={defaultRowCheck[item.FID]===item.FMc}
                                 checked={defaultRowCheck.includes(item.FMc)}
                                 onChange={(e)=>this.checkChange(item,e)}
                               >
                                 {item.FMc}
                               </Checkbox>
                             </Col>
                           })
                           :''
                         }
                         <Col span={8} offset={10} style={{marginTop:"5px"}}>{
                           adminName? <Button type="primary" onClick={()=>{this.permit(item)}}>授权</Button>:""
                         }

                         </Col>
                       </Row>
                     }
                   </RadioGroup>
                 }
        >
          <Icon className="systemUserEdit"
                type="edit"
                title="修改客户权限"
                onClick={(e)=>{this.editCustomPermission(adminId,adminName,item,e)}}
          />
        </Popover>
      </div>
    }
}