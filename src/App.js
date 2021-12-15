import React, { Component } from "react";
import AddStudent from "./Components/AddStudent";
import StudentTitle from "./Components/StudentTitle";
import StudentList from "./Components/StudentList";

class App extends Component {
    render() {
        return (
            <div className={ 'container' }>
                <StudentTitle/>
                <AddStudent/>
                <StudentList/>
            </div>
        );
    }
}

export default App;
