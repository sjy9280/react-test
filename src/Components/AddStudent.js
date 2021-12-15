import React, { Component } from "react";

class AddStudent extends Component {

  constructor(props) {
    super(props);
    this.stateHandler = this.stateHandler.bind(this)
  }

  state = {
    number: '',
    name: '',
    sex: '女',
    age: '',
    college: '大前端',
    hobbies: [
      {
        id: 1,
        title: '篮球',
        isChecked: false
      },
      {
        id: 2,
        title: '足球',
        isChecked: true
      },
      {
        id: 3,
        title: '网球',
        isChecked: false
      }
    ]
  }

  stateHandler(e) {
    const value = e.target.value
    const name = e.target.name
    this.setState({ [name]: value }, () => console.log(this.state[name]))
  }

  hobbyHandler(index, ev) {
    const isChecked = ev.target.checked
    const hobbies = [...this.state.hobbies]
    hobbies[index].isChecked = isChecked
    this.setState({ hobbies })
  }

  submit = (ev) => {
    ev.preventDefault()
    console.log(this.state.hobbies
      .filter(hobby => hobby.isChecked)
      .map(hobby => hobby.title))
  }

  render() {
    return (
      <div className="col-md-5">
        <form onSubmit={ this.submit }>
          <div className="form-group">
            <label>学号</label>
            <input type="number" name={ 'number' } value={ this.state.number } onChange={ this.stateHandler }
                   className="form-control" placeholder="请输入学号"/>
          </div>
          <div className="form-group">
            <label>姓名</label>
            <input type="text" name={ 'name' } value={ this.state.name } onChange={ this.stateHandler }
                   className="form-control" placeholder="请输入姓名"/>
          </div>
          <div className="form-group">
            <label>性别&nbsp;&nbsp;</label>
            <label className="checkbox-inline">
              <input name={ 'sex' } type="radio" value="男" defaultChecked={ this.state.sex === '男' }
                     onChange={ this.stateHandler }/> 男
            </label>
            <label className="checkbox-inline">
              <input name={ 'sex' } type="radio" value="女" defaultChecked={ this.state.sex === '女' }
                     onChange={ this.stateHandler }/> 女
            </label>
          </div>
          <div className="form-group">
            <label>年龄</label>
            <input name={ 'age' } type="text" value={ this.state.age } onChange={ this.stateHandler }
                   className="form-control" placeholder="请输入年龄"/>
          </div>
          <div className="form-group">
            <label>爱好</label>
            {
              this.state.hobbies.map((hobby, index) => {
                return (
                  <div className="checkbox" key={ hobby.id }>
                    <label>
                      <input type="checkbox" defaultChecked={ hobby.isChecked } value={ hobby.title }
                             onChange={ this.hobbyHandler.bind(this, index) }/> { hobby.title }
                    </label>
                  </div>
                )
              })
            }
          </div>
          <div className="form-group">
            <label>所属学院</label>
            <select name={ 'college' } value={ this.state.college } onChange={ this.stateHandler }
                    className="form-control">
              <option value="大前端">大前端</option>
              <option value="Java">Java</option>
              <option value="python">python</option>
            </select>
          </div>
          <button type="submit" className="btn btn-default">添加</button>
        </form>
      </div>
    )
  }
}


export default AddStudent
