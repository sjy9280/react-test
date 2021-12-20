import React, { Component } from "react";

class BlockTitle extends Component {

  render() {
    return (
      <div className={ 'block-title' }>
        { this.props.title }
      </div>
    )
  }
}

export default BlockTitle
