import React, { Component } from 'react'

class PostDetail extends Component {
  render () {
    return (
      <div>
        <h1>Post Detail</h1>
        <h3>
          PostID: {this.props.match.params.post_id}
        </h3>
      </div>
    )
  }
}

export default PostDetail
