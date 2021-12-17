import React, { Component } from "react";
import { sidebar } from "../utils/sidebar";
import { Link } from "react-router-dom";

class SideBar extends Component {
  render() {
    return (
      <div className={ 'sidebar' }>
        <ul>
          {
            sidebar.map((item) => {
              return (
                <li key={ item.id } className={ 'subTitle' }>
                  <Link to={ item.path }>
                    { item.title }
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default SideBar
