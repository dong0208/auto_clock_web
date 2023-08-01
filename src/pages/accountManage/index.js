import React from "react";
import moment from "moment";
import { Input, Button,Divider,Table,Pagination } from 'antd'
import {connect} from 'react-redux'
import AddAccount from "./addAccount";
import {getTableDataApi} from './api'

class AccountManage extends React.Component {
    state ={
        keyInput:'',
        visible:false,
        editData:{},
        isEdit:false,
        tableList:[],
        tableLoading:false,
        total:0,
        currentPage:1,
    }
    componentDidMount(){
        this.getTableData()
    }
    getTableData = async ()=>{
        const {currentPage,keyInput} = this.state
        const {userInfo:{userId}} = this.props
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
    changeInput = (e)=>{
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
    changeVisible = ()=>{
        this.setState({
            visible:!this.state.visible,
            isEdit:false
        },()=>{
            this.getTableData()
        })
    }
    editAccountData = (record)=>{
        this.setState({
            editData:record,
            isEdit:true,
            visible:true
        })
    }
    pageChange = (page)=>{
        this.setState({
            currentPage:page
        },()=>{
            this.getTableData()
        })
    }
    render() {
        const {keyInput,visible,editData,isEdit,tableList,currentPage,total,tableLoading} = this.state
        const columns = [
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
                title: '账号状态',
                key: 'accountStatus',
                dataIndex: 'accountStatus',
                render:(text)=>{
                    return <div>{text==0?'正常':'禁用'}</div>
                }
            },
            {
                title: '剩余天数(职校家园)',
                key: 'zhiClockDays',
                dataIndex: 'zhiClockDays',
            },
            {
                title: '剩余天数(工学云))',
                key: 'gongClockDays',
                dataIndex: 'gongClockDays',
            },
            {
                title: '已打卡天数(职校家园)',
                key: 'alreadyGongClockDays',
                dataIndex: 'alreadyGongClockDays',
            },
            {
                title: '已打卡天数(工学云)',
                key: 'alreadyZhiClockDays',
                dataIndex: 'alreadyZhiClockDays',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <>
                        <span className="table-action" onClick={()=>{this.editAccountData(record)}} >编辑</span>
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
            <Button type="primary" style={{marginBottom:'20px'}} onClick={this.changeVisible}>添加账号</Button>
            {
                visible&&<AddAccount
                    visible
                    editData={editData}
                    isEdit={isEdit}
                    cancelVisible={this.changeVisible}
                />
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
  )(AccountManage);
