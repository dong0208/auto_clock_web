import React from "react";
import {connect} from 'react-redux'
import moment from "moment";
import { Input, Button, Divider,Table,Pagination } from 'antd'
import AddStudent from "./addStudent/index";
import {getTableDataApi,stuClockApi,chanEnableApi} from './api'
import { Switch } from "antd";
import weekObj from './week'
import { message } from "antd";
class StudentManage extends React.Component {
    state = {
        keyInput: '',
        visible: false,
        editData: {},
        tableList:[],
        tableLoading:false,
        total:0,
        currentPage:1,
        isEdit:false,
        bool:true,
        recordChecked:false,
        createPhone:''
    }
    componentDidMount(){
        console.log('7890')
        this.getTableData()
    }
    getTableData = async ()=>{
        const {currentPage,keyInput,createPhone} = this.state
        const {userInfo:{userId}}  = this.props
        this.setState({
            tableLoading:true
        })
        const res = await getTableDataApi({
            id:userId,
            pageNo:currentPage,
            phone:keyInput,
            createPhone
        })
        this.setState({
            total:res.total,
            tableList:res.table,
            tableLoading:false
         })

    }
    changeInput = (e) => {
        let value = e.target.value
        this.setState({
            keyInput:value
        })
    }
    changereatePhone = (e)=>{
        let value = e.target.value
        this.setState({
            createPhone:value
        })
    }
    search = () => {
        this.setState({
            currentPage:1
        },()=>{
            this.getTableData()
        })
    }
    reset = () => {
        this.setState({
            currentPage:1,
            keyInput:'',
            createPhone:''
        },()=>{
            this.getTableData()
        })
    }
    changeVisible = () => {
        this.setState({
            visible: !this.state.visible,
            isEdit:false
        },()=>{
            this.getTableData()
        })

    }
    pageChange = (page)=>{
        this.setState({
            currentPage:page
        },()=>{
            this.getTableData()
        })
    }
    editStudentData = async (record)=>{
        this.setState({
            visible:true,
            editData:record,
            isEdit:true
        })
    }
    giveStuClock = (record)=>{
        const {userInfo:{userId}} = this.props
        stuClockApi({
            createId:userId,
            id:record.id
        }).then((res)=>{
            if(res.code==200){
                this.getTableData()
                message.success(res.entry)
            }
        })
    }
    changeEnable = (checked,record)=>{
        chanEnableApi({
            id:record.id,
            enable:checked
        }).then((res)=>{
            if(res.code==200){
                this.getTableData()
                message.success(checked?'启动成功':'关闭成功')
            }
        })
    }
    
    render() {
        const { keyInput, visible, editData,tableList,tableLoading,total,currentPage,isEdit,createPhone } = this.state
        const {userInfo:{type}} = this.props
        let columns = [
            {
                title: '创建时间',
                key: 'gmtCreate',
                dataIndex: 'gmtCreate',
                render:(text)=>{
                    return <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
                }
            },
            {
                title: '手机号',
                key: 'phone',
                dataIndex: 'phone',
            },
            {
                title: '打卡类型',
                key: 'appType',
                dataIndex: 'appType',
                render:(text)=>{
                    return <div>{text==1?"工学云":'职校家园'}</div>
                }
            },
            {
                title: '详细地址',
                key: 'address',
                dataIndex: 'address',
            },
            {
                title: '打卡日期',
                key: 'weeks',
                dataIndex: 'weeks',
                render:(text)=>{
                    if(!text)return 
                    if(Array.isArray(JSON.parse(text))){
                        let arr = JSON.parse(text)
                        return <div>
                            {arr.map((item,index)=>{
                            return <span key={index} style={{marginRight:'8px'}}>周{weekObj[item]}</span>
                        })}
                        </div>
                    }else{
                        let arr = text.split(',')
                        return <div>
                            {arr.map((item,index)=>{
                            return <span key={index}>周{weekObj[item]}</span>
                        })}
                        </div>
                    }
                }
            },
            {
                title: '打卡时间',
                key: 'clockTime',
                dataIndex: 'clockTime',
                render:(text,record)=>{
                    return <div>
                        {record.clockAm==1&&<span style={{marginRight:'20px'}}>{'8:00-9:00'}</span>}
                        {record.clockPm==1&&<span>{'18:00-19:00'}</span>}
                    </div>
                }
            },
            {
                title: '剩余打卡天数',
                key: 'clockDays',
                dataIndex: 'clockDays',
            },
            {
                title: '操作',
                key: 'action',
                fixed:'right',
                render: (text, record) => {
                   const {userInfo:{type}} = this.props
                   return <>
                        <span className="table-action table-action-right" onClick={()=>{this.editStudentData(record)}} >{type==0?record.primaryAccount==0?'查看':'编辑':'编辑'}</span>
                        <span className="table-action table-action-right" onClick={()=>{this.giveStuClock(record)}}>打卡</span>
                        <span className="table-action">启动/关闭<Switch  checked={record.enable} onChange={(checked)=>{this.changeEnable(checked,record)}}/></span>
                    </>
                },
            }
            
        ]
        if(type==0){
            columns.splice(1,0,{
                title: '创建人手机号',
                key: 'createPhone',
                dataIndex: 'createPhone',
            },)
        }
        return <div className='content-main'>
            <div className="search-info">
                <div className="search-body">
                    <div className="search-item">
                        <p>手机号:</p>
                        <Input
                            placeholder="请输入手机号"
                            onChange={this.changeInput}
                            value={keyInput}
                            style={{ width: 240 }}
                        ></Input>
                    </div>
                    {type==0&&<div className="search-item">
                        <p>创建人手机号:</p>
                        <Input
                            placeholder="请输入手机号"
                            onChange={this.changereatePhone}
                            value={createPhone}
                            style={{ width: 240 }}
                        ></Input>
                    </div>}
                </div>
                <div className="search-btn">
                    <Button type="primary" onClick={this.search} className="primary">
                        查询
                    </Button>
                    <Button onClick={this.reset}>重置</Button>
                </div>
            </div>
            <Divider />
            <Button type="primary" style={{marginBottom:'20px'}} onClick={this.changeVisible}>添加学生</Button>
            {
                visible && <AddStudent
                    visible
                    editData={editData}
                    isEdit={isEdit}
                    cancelVisible={this.changeVisible} />
            }
            <Table
                columns={columns}
                dataSource={tableList}
                rowKey={(record) => record.id}
                pagination={false}
                loading={tableLoading}
                scroll={{x:2000}}
            />

            {tableList.length > 0 && (
                <div className="page-box" style={{ marginBottom: 20 }}>
                    <Pagination
                        showTotal={(total) => `共 ${total} 条`}
                        total={total}
                        pageSize={10}
                        current={currentPage}
                        onChange={this.pageChange}
                    />
                </div>
            )}
        </div>
    }
}

const mapStateToProps = ({ userInfoReducer }) => {
    return {
      userInfo: userInfoReducer,
    }
}
export default connect(
    mapStateToProps,
  )(StudentManage);
