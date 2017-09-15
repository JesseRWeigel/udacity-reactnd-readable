import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories, vote, deletePost } from '../actions'
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

  deletePost = id => {
    this.props.dispatch(deletePost(id))
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

          {this.props.posts &&
            Object.keys(this.props.posts).map((k) => (
              <div className='post' key={uuidv1()}>
                <Link to={`/${this.props.posts[k].category}/${this.props.posts[k].id}`}>
                  <h3>
                    {this.props.posts[k].title}
                  </h3>
                </Link>
                <span>Author> {this.props.posts[k].author}</span>
                <span>Comments> {this.props.posts[k].comments}</span>
                <span>Score> {this.props.posts[k].voteScore} <span id='plus' onClick={ () => this.submitVote(this.props.posts[k].id, 'upVote')}>+</span>/<span id='minus' onClick={() => this.submitVote(this.props.posts[k].id, 'downVote')}>-</span></span>
                  <span><Link to={`/edit-post/${this.props.posts[k].id}`}>
                    Edit
                  </Link> / <span onClick={() => this.deletePost(this.props.posts[k].id)}>Delete</span></span>
              </div>
            ))

          }
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
