import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  editPost,
  fetchPost,
  fetchComments,
  vote,
  addComment,
  deletePost,
  setCommentSorting
} from '../actions'
import EditComment from '../components/EditComment'
import SideNav from '../components/SideNav'
import '../styles/app.css'
const uuidv1 = require('uuid/v1')

class PostDetail extends Component {
  state = {
    commentAuthor: '',
    commentContent: '',
    postEditorVisible: false,
    postTitle: '',
    postAuthor: '',
    postCategory: '',
    postContent: ''
  }

  componentWillMount () {
    this.props
      .fetchData(this.props.match.params.post_id, 'BY_SCORE_HIGHEST')
      .then(
        () =>
          this.props.location.state &&
          this.props.location.state.postEditorVisible &&
          this.showPostEditor()
      )
  }

  showPostEditor () {
    this.setState({
      postTitle: this.props.post[this.props.match.params.post_id].title,
      postAuthor: this.props.post[this.props.match.params.post_id].author,
      postCategory: this.props.post[this.props.match.params.post_id].category,
      postContent: this.props.post[this.props.match.params.post_id].body,
      postEditorVisible: true
    })
  }

  submitVote = (id, voteType) => {
    this.props.dispatch(vote(id, voteType))
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const data = {
      id: uuidv1(),
      timestamp: Date.now(),
      body: this.state.commentContent,
      author: this.state.commentAuthor,
      parentId: this.props.match.params.post_id,
      voteScore: 0,
      deleted: false,
      parentDeleted: false
    }
    console.log(data)
    this.props.dispatch(addComment(data))
  }

  handlePostSubmit = event => {
    event.preventDefault()
    const data = {
      id: this.props.post[this.props.match.params.post_id].id,
      timestamp: this.props.post[this.props.match.params.post_id].timestamp,
      title: this.state.postTitle,
      body: this.state.postContent,
      author: this.state.postAuthor,
      category: this.state.postCategory,
      voteScore: this.props.post[this.props.match.params.post_id].voteScore,
      deleted: this.props.post[this.props.match.params.post_id].deleted
    }
    this.props.dispatch(editPost(data))
  }

  deletePost = id => {
    this.props.dispatch(deletePost(id))
  }

  render () {
    return (
      <div>
        <SideNav sortCommentsBy={this.props.sortCommentsBy} />
        <div style={{ width: '70%', float: 'left' }}>
          {this.props.post &&
            Object.keys(this.props.post).map(
              k =>
                k === this.props.match.params.post_id &&
                !this.props.post[k].deleted &&
                <div key={k}>
                  <h1>
                    {this.props.post[k].title}(Votes:{' '}
                    {this.props.post[k].voteScore}{' '}
                    <span
                      className='clickable'
                      id='plus'
                      onClick={() => this.submitVote(k, 'upVote')}
                    >
                      +
                    </span>/<span
                      className='clickable'
                      id='minus'
                      onClick={() => this.submitVote(k, 'downVote')}
                    >
                      -
                    </span>)
                  </h1>
                  <span className='author'>
                    Author: {this.props.post[k].author}
                  </span>
                  <span className='timestamp'>
                    Date:{' '}
                    {new Date(this.props.post[k].timestamp).toDateString()}
                  </span>
                  <p>
                    {this.props.post[k].body}
                  </p>
                  <span>
                    <span
                      className='clickable'
                      onClick={() => this.showPostEditor()}
                    >
                      Edit
                    </span>
                    /{' '}
                    <span
                      className='clickable'
                      onClick={() => this.deletePost(this.props.post[k].id)}
                    >
                      Delete
                    </span>{' '}
                  </span>
                  {this.state.postEditorVisible &&
                    <div>
                      <h1>Edit Post</h1>
                      <form onSubmit={this.handlePostSubmit}>
                        <div className='input-container'>
                          <label htmlFor='post-title'>
                            Title:
                            <input
                              type='text'
                              name='postTitle'
                              id='post-title'
                              value={this.state.postTitle}
                              onChange={this.handleInputChange}
                              required='required'
                            />
                          </label>
                        </div>
                        <div className='input-container'>
                          <label htmlFor='post-author'>
                            Author:
                            <input
                              type='text'
                              name='postAuthor'
                              id='post-author'
                              value={this.state.postAuthor}
                              onChange={this.handleInputChange}
                              required='required'
                            />
                          </label>
                        </div>
                        <div className='input-container'>
                          <label htmlFor='post-category'>
                            Category:
                            <select
                              type='text'
                              name='postCategory'
                              id='post-category'
                              value={this.state.postCategory}
                              onChange={this.handleInputChange}
                              required='required'
                            >
                              <option value='react'>React</option>
                              <option value='redux'>Redux</option>
                              <option value='udacity'>Udacity</option>
                            </select>
                          </label>
                        </div>
                        <div className='input-container'>
                          <label htmlFor='post-content'>
                            Content:
                            <textarea
                              name='postContent'
                              id='post-content'
                              value={this.state.postContent}
                              onChange={this.handleInputChange}
                            />
                          </label>
                        </div>
                        <input type='submit' value='Submit' />
                      </form>
                    </div>}

                  <h2>
                    Comments ({this.props.comments &&
                      Object.values(this.props.comments).length})
                  </h2>
                  {this.props.comments &&
                    Object.values(this.props.comments)
                      .filter(comment => !comment.deleted)
                      .sort((a, b) => {
                        switch (this.props.sortCommentsBy) {
                          case 'BY_SCORE_LOWEST':
                            return a.voteScore - b.voteScore
                          case 'BY_DATE_OLDEST':
                            return a.timestamp - b.timestamp
                          case 'BY_DATE_NEWEST':
                            return b.timestamp - a.timestamp
                          default:
                            return b.voteScore - a.voteScore
                        }
                      })
                      .map(comment =>
                        <EditComment
                          key={comment.id}
                          id={comment.id}
                          timestamp={comment.timestamp}
                          body={comment.body}
                          author={comment.author}
                          parentId={comment.parentId}
                          voteScore={comment.voteScore}
                          deleted={comment.deleted}
                          parentDeleted={comment.parentDeleted}
                        />
                      )}
                  <div className='new-comment'>
                    <h3>Add a new comment:</h3>
                    <form onSubmit={this.handleSubmit}>
                      <div className='input-container'>
                        <label htmlFor='comment-author'>
                          Author:
                          <input
                            type='text'
                            name='commentAuthor'
                            id='comment-author'
                            value={this.state.commentAuthor}
                            onChange={this.handleInputChange}
                            required='required'
                          />
                        </label>
                      </div>

                      <div className='input-container'>
                        <label htmlFor='comment-content'>
                          Content:
                          <textarea
                            name='commentContent'
                            id='comment-content'
                            value={this.state.commentContent}
                            onChange={this.handleInputChange}
                            required='required'
                          />
                        </label>
                      </div>
                      <input type='submit' value='Submit' />
                    </form>
                  </div>
                </div>
            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.postsById,
  comments: state.receiveComments,
  sortCommentsBy: state.setCommentSorting ? state.setCommentSorting.sort : ''
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  fetchData: (id, sortCriteria) =>
    dispatch(fetchPost(id))
      .then(() => dispatch(fetchComments(id)))
      .then(() => dispatch(setCommentSorting(sortCriteria)))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
)
