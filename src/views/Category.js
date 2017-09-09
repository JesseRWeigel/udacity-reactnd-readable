import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostsByCategory } from '../actions'
import { Link } from 'react-router-dom'

class Category extends Component {
    componentWillMount () {
      this.props.fetchData(this.props.match.params.category)
    }
  render () {
    return (
              <div style={{ width: '70%', float: 'left' }}>
                <h2>Category > {this.props.match.params.category}</h2>

                {this.props.posts && this.props.posts.length > 0 ?
                  this.props.posts.map(post =>
                    <div className='post' key={post.id}>
                      <Link to={`/${post.category}/${post.id}`}>
                        <h3>
                          {post.title}
                        </h3>
                      </Link>
                      <span>Author: {post.author}</span>
                      <span>Comments: </span>
                      <span>Score: {post.voteScore} <span id='plus'>+</span>/<span id='minus'>-</span></span>
                      <span>Edit / Delete</span>
                    </div>
                  ) : <h3>There are no posts in this category.</h3>}
              </div>
    )
  }
}

        const mapStateToProps = state => ({
          posts: state.getPostsByCategory,
        })

        const mapDispatchToProps = dispatch => ({
          fetchData: category =>
          dispatch(fetchPostsByCategory(category))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Category)
