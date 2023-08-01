import React from "react";
import { Input, Button,Divider,Table,Pagination } from 'antd'
import {getTableDataApi} from './api'
import {connect} from 'react-redux'
class ClockList extends React.Component {
    state ={
        keyInput:'',
        visible:false,
        editData:{},
        isEdit:false,
        tableList:[],
        tableLoading:false,
        total:0,
        currentPage:1,
        createPhone:''
    }
    componentDidMount(){
        this.getTableData()
    }
    getTableData = async ()=>{
        const {currentPage,keyInput,createPhone} = this.state
        const {userInfo:{userId}} = this.props
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
    changeInput = (e)=>{
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
    changeVisible = ()=>{
        this.setState({
            visible:!this.state.visible,
            isEdit:false
        })
    }
    editAccountData =async (record)=>{
        // const res = await getAccountEditApi()
        this.setState({
            visible:true,
            editData:{},
            isEdit:true
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
        const {keyInput,visible,editData,isEdit,tableList,currentPage,total,tableLoading,createPhone} = this.state
        const {userInfo:{type}} = this.props
        const columns = [
            {
                title: '手机号',
                key: 'phone',
                dataIndex: 'phone',
            },
            {
                title: '打卡地址',
                key: 'address',
                dataIndex: 'address',
            },
            {
                title: '打卡类型',
                key: 'appType',
                dataIndex: 'appType',
                render:(text)=>{
                    if(!text) return 
                    return <div>{text==1?'工学云':"职校家园"}</div>
                }
            },
            {
                title: '已打卡天数',
                key: 'alreadyClockDays',
                dataIndex: 'alreadyClockDays',
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
  )(ClockList);
