import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories } from '../actions'
import '../styles/app.css'

class Home extends Component {
  componentDidMount () {
    this.props.fetchData()
  }
  render () {
    return (
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#000',
          fontFamily: 'Monospace',
          color: 'green'
        }}
      >
        <div style={{ width: '30%', float: 'left' }}>
          <h2>Categories</h2>
          <ul>
            {this.props.categories &&
              this.props.categories.length > 0 &&
              this.props.categories.map(category =>
                <li key={category.path}>
                  {category.name}
                </li>
              )}
          </ul>
        </div>
        <div style={{ width: '70%', float: 'left' }}>
          <h2>Posts</h2>
          {console.log(this.props.posts)}
          {this.props.posts.length > 0 &&
            this.props.posts.map(post =>
              <div className='post' key={post.id}>
                <h3>
                  {post.title}
                </h3>
                <span>Author> {post.author}</span>
                <span>Comments> {post.comments}</span>
                <span>Score> {post.voteScore} <span id='plus'>+</span>/<span id='minus'>-</span></span>
                <span>Edit/Delete> <span id='yes'>Y</span> / N</span>
              </div>
            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.receivePosts,
    categories: state.receiveCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () =>
      dispatch(fetchPosts()).then(() => dispatch(fetchCategories()))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
