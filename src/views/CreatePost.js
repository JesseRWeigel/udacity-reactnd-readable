import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import SideNav from '../components/SideNav'
import '../styles/app.css'
const uuidv1 = require('uuid/v1')

class CreatePost extends Component {
  state = {
    postTitle: '',
    postAuthor: '',
    postCategory: '',
    postContent: ''
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
      title: this.state.postTitle,
      body: this.state.postContent,
      author: this.state.postAuthor,
      category: this.state.postCategory,
      voteScore: 0,
      deleted: false
    }
    this.props.dispatch(addPost(data))
    this.props.history.push('/')
  }

  render () {
    return (
      <div>
        <SideNav />
        <div style={{ width: '70%', float: 'left' }}>
          <h1>Create New Post</h1>
          <form onSubmit={this.handleSubmit}>
            <div className='input-container'>
              <label htmlFor='post-title'>
                Title:
                <input
                  type='text'
                  name='postTitle'
                  id='post-title'
                  value={this.state.postTitle}
                  onChange={this.handleInputChange}
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
                />
              </label>
            </div>
            <div className='input-container'>
              <label htmlFor='post-category'>
                Category:
                <input
                  type='text'
                  name='postCategory'
                  id='post-category'
                  value={this.state.postCategory}
                  onChange={this.handleInputChange}
                />
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
        </div>
      </div>
    )
  }
}

export default connect()(CreatePost)
