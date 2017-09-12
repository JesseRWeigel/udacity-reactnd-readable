import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories } from '../actions'
import { Link } from 'react-router-dom'
import '../styles/app.css'

class Home extends Component  {
  componentDidMount () {
    this.props.fetchData()
  }
  render () {
    return (
      <div>
        <div style={{ width: '30%', float: 'left' }}>
          <h2>Categories</h2>
          <ul>
            {this.props.categories &&
              this.props.categories.length > 0 &&
              this.props.categories.map(category =>
                <li key={category.path}>
                  <Link to={`/${category.name}`}>
                    {category.name}
                  </Link>

                </li>
              )}
          </ul>
        </div>
        <div style={{ width: '70%', float: 'left' }}>
          <h2>Posts</h2>

          {this.props.posts.length > 0 &&
            this.props.posts.map(post =>
              <div className='post' key={post.id}>
                <Link to={`/${post.category}/${post.id}`}>
                  <h3>
                    {post.title}
                  </h3>
                </Link>
                <span>Author> {post.author}</span>
                <span>Comments> {post.comments}</span>
                <span>Score> {post.voteScore} <span id='plus'>+</span>/<span id='minus'>-</span></span>
                <span>Edit / Delete></span>
              </div>
            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    posts: state.postsById,
    categories: state.receiveCategories
  })

const mapDispatchToProps = dispatch => ({
    fetchData: () =>
      dispatch(fetchPosts()).then(() => dispatch(fetchCategories()))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Home)
