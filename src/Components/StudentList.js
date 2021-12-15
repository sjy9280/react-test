import React, { Component } from "react";

class StudentList extends Component {
    render() {
        return (
            <div className="col-md-6 col-md-offset-1">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>学号</th>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>年龄</th>
                            <th>入学时间</th>
                            <th>爱好</th>
                            <th>所属学院</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>01</td>
                            <td>张三</td>
                            <td>男</td>
                            <td>20</td>
                            <td>2020-08-02</td>
                            <td>
                                <span>足球</span>
                            </td>
                            <td>python</td>
                            <td>
                                <button>删除</button>
                                <button>修改</button>
                            </td>
                        </tr>
                    </tbody>

                </table>
                <p className="text-center">无学生信息</p>
                <p>总共有 50 个学生</p>
                <p>学生的平均年龄是 25</p>
            </div>
        )
    }
}

export default StudentList
