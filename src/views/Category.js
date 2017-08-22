import React, { Component } from 'react'
import { connect } from 'react-redux'
class Category extends Component {
  render () {
    return (
      <div>
        <h1>Category</h1>
        <h3>
          {this.props.match.params.category}
        </h3>
      </div>
    )
  }
}

export default Category
