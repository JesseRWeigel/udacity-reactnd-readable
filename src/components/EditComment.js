import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment, voteComment, deleteComment } from '../actions'
import '../styles/app.css'

class EditComment extends Component {
  state = {
    commentAuthor: '',
    commentContent: '',
    showEditor: false
  }

  componentDidMount () {
    this.setState({
      commentAuthor: this.props.author,
      commentContent: this.props.body
    })
  }

  submitVote = (id, voteType) => {
    this.props.dispatch(voteComment(id, voteType))
  }

  handleDelete = id => {
    this.props.dispatch(deleteComment(id))
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleEditSubmit = event => {
    event.preventDefault()
    const data = {
      id: this.props.id,
      timestamp: this.props.timestamp,
      body: this.state.commentContent,
      author: this.state.commentAuthor,
      parentId: this.props.parentId,
      voteScore: this.props.voteScore,
      deleted: this.props.deleted,
      parentDeleted: false
    }
    console.log(data)
    this.props.dispatch(addComment(data))
  }

  beginEdit = () => {
    this.setState({
      showEditor: true
    })
  }

  render () {
    return (
      <div>
        <div key={this.props.id}>
          <hr />
          <span className='author'>
            Comment by: {this.props.author}
          </span>
          <span className='timestamp'>
            Date: {new Date(this.props.timestamp).toDateString()}
          </span>
          <p>
            {this.props.body}{' '}
            <span className='score'>
              ({this.props.voteScore}{' '}
              <span
                className='clickable'
                onClick={() => this.submitVote(this.props.id, 'upVote')}
              >
                +
              </span>/<span
                className='clickable'
                onClick={() => this.submitVote(this.props.id, 'downVote')}
              >
                -
              </span>)
            </span>
          </p>
          <span>
            <span className='clickable' onClick={this.beginEdit}>
              Edit
            </span>{' '}
            /{' '}
            <span
              className='clickable'
              onClick={() => this.handleDelete(this.props.id)}
            >
              Delete
            </span>{' '}
          </span>
          {this.state.showEditor &&
            <form onSubmit={this.handleEditSubmit}>
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
            </form>}
        </div>
      </div>
    )
  }
}

export default connect()(EditComment)
