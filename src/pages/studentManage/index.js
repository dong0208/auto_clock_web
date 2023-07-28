import React from "react";
import { Input, Button, Divider,Table,Pagination } from 'antd'
import AddStudent from "./addStudent/index";
import {getTableDataApi,getStudentEditApi} from './api'
class StudentManage extends React.Component {
    state = {
        keyInput: '',
        visible: false,
        editData: {},
        tableList:[
            {
                phone:'17616088908',
                address:'浙江省杭州市余杭区',
                remainDay:28
            }
        ],
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
        const res = await getTableDataApi({
            page:currentPage-1,
        })

    }
    changeInput = () => {

    }
    search = () => {

    }
    reset = () => {

    }
    changeVisible = () => {
        this.setState({
            visible: !this.state.visible,
            isEdit:false
        })

    }
    pageChange = ()=>{

    }
    editStudentData = async ()=>{
        const res = await getStudentEditApi()
        this.setState({
            visible:true,
            editData:{},
            isEdit:true
        })
    }
    render() {
        const { keyInput, visible, editData,tableList,tableLoading,total,currentPage,isEdit } = this.state
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
                title: '剩余天数',
                key: 'remainDay',
                dataIndex: 'remainDay',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <>
                        <span className="table-action table-action-right" onClick={()=>{this.editStudentData(record)}} >编辑</span>
                        <span className="table-action" >打卡</span>
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


export default StudentManage