import React from "react";
import {connect} from 'react-redux'
import { Input, Button, Divider,Table,Pagination } from 'antd'
import AddStudent from "./addStudent/index";
import {getTableDataApi,stuClockApi,chanEnableApi} from './api'
import { Switch } from "antd";
class StudentManage extends React.Component {
    state = {
        keyInput: '',
        visible: false,
        editData: {},
        tableList:[],
        tableLoading:false,
        total:0,
        currentPage:1,
        isEdit:false
    }
    componentDidMount(){
        this.getTableData()
    }
    getTableData = async ()=>{
        const {currentPage,keyInput} = this.state
        const {userInfo:{userId}}  = this.props
        const res = await getTableDataApi({
            id:userId,
            pageNo:currentPage,
            phone:keyInput
        })
        this.setState({
            total:res.total,
            tableList:res.table
         })

    }
    changeInput = (e) => {
        let value = e.target.value
        this.setState({
            keyInput:value
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
            keyInput:''
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
        // stuClockApi()
    }
    changeEnable = (checked,recoed)=>{
        // chanEnableApi()
    }
    render() {
        const { keyInput, visible, editData,tableList,tableLoading,total,currentPage,isEdit } = this.state
        const columns = [
            {
                title: '创建时间',
                key: 'gmtCreate',
                dataIndex: 'gmtCreate',
            },
            {
                title: '手机号',
                key: 'phone',
                dataIndex: 'phone',
            },
            {
                title: '密码',
                key: 'password',
                dataIndex: 'password',
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
                title: '打卡时间',
                key: 'clockTime',
                dataIndex: 'clockTime',
                render:(text,record)=>{
                    return <div>
                        {record.clockAm==1&&<span>{'8:00-9:00'}</span>}
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
                render: (text, record) => (
                    <>
                        <span className="table-action table-action-right" onClick={()=>{this.editStudentData(record)}} >编辑</span>
                        <span className="table-action table-action-right" onClick={()=>{this.giveStuClock(record)}}>打卡</span>
                        <span className="table-action">启动/关闭<Switch defaultChecked={record.enable} onChange={(checked)=>{this.changeEnable(checked,record)}}/></span>
                    </>
                ),
            }
            
        ]
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
