import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories, vote } from '../actions'
import { Link } from 'react-router-dom'
import '../styles/app.css'
const uuidv1 = require('uuid/v1')

class Home extends Component  {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.props.fetchData()
  }

  submitVote = (id, voteType) => {
    this.props.dispatch(vote(id, voteType))
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
          <h2>Posts (<Link to='/create-post'>
            Add New
          </Link>)</h2>

          {this.props.posts.length > 0 &&
            this.props.posts.map(post =>
              <div className='post' key={uuidv1()}>
                <Link to={`/${post.category}/${post.id}`}>
                  <h3>
                    {post.title}
                  </h3>
                </Link>
                <span>Author> {post.author}</span>
                <span>Comments> {post.comments}</span>
                <span>Score> {post.voteScore} <span id='plus' onClick={ () => this.submitVote(post.id, 'upVote')}>+</span>/<span id='minus' onClick={() => this.submitVote(post.id, 'downVote')}>-</span></span>
                <span><Link to={`/edit-post/${post.id}`}>
                  Edit
                </Link> / Delete></span>
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

const mapDispatchToProps = dispatch => ({ dispatch,
    fetchData: () =>
      dispatch(fetchPosts()).then(() => dispatch(fetchCategories()))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Home)
