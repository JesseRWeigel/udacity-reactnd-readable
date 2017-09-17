import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories, vote, deletePost, setSorting } from '../actions'
import { Link } from 'react-router-dom'
import '../styles/app.css'
const uuidv1 = require('uuid/v1')

class Home extends Component  {
  constructor(props) {
    super(props)
  }

  componentWillMount () {
    this.props.fetchData('BY_SCORE_HIGHEST')
  }

  submitVote = (id, voteType) => {
    this.props.dispatch(vote(id, voteType))
  }

  deletePost = id => {
    this.props.dispatch(deletePost(id))
  }

  handleSort = val => {
    this.props.dispatch(setSorting(val))
  }

  render () {
    return (
      <div>
        <div style={{ width: '30%', float: 'left' }}>
          <h2>Sort Posts By:</h2>
          <ul>
            <li onClick={() => this.handleSort(this.props.sortBy  === 'BY_SCORE_LOWEST' ? 'BY_SCORE_HIGHEST' : 'BY_SCORE_LOWEST' )}>Votes</li>
            <li onClick={() => this.handleSort(this.props.sortBy  === 'BY_DATE_NEWEST' ? 'BY_DATE_OLDEST' : 'BY_DATE_NEWEST' )}>Date</li>
          </ul>
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
            Object.values(this.props.posts)
            .filter(post => !post.deleted)
            .sort((a, b) => {
              switch (this.props.sortBy) {
                case 'BY_SCORE_LOWEST':
                  return a.voteScore - b.voteScore
                case 'BY_DATE_OLDEST':
                  return a.timestamp - b.timestamp
                case 'BY_DATE_NEWEST':
                  return b.timestamp - a.timestamp
                default:
                  return  b.voteScore - a.voteScore
              }
            })
            .map(post =>
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
                </Link> / <span onClick={() => this.deletePost(post.id)}>Delete</span></span>
              </div>
            )




          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    posts: state.postsById,
    categories: state.receiveCategories,
    sortBy: state.setSorting ? state.setSorting.sort : ''
  })

const mapDispatchToProps = dispatch => ({ dispatch,
    fetchData: sortCriteria =>
      dispatch(fetchPosts())
      .then(() => dispatch(setSorting(sortCriteria)))
      .then(() => dispatch(fetchCategories()))

  })

export default connect(mapStateToProps, mapDispatchToProps)(Home)
