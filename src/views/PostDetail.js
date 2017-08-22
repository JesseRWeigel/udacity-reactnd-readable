import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../actions'
import '../styles/app.css'

class PostDetail extends Component {
    componentWillMount () {
      this.props.fetchData(this.props.match.params.post_id)
    }
  render () {
    return (
      <div>
        <h1>Post Detail</h1>
        <h3>
          PostID: {this.props.post && this.props.post.length > 0 && this.props.post.title}

        </h3>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    post: state.getPost,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (id) =>
      dispatch(fetchPost(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
