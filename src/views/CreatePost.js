import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import { withRouter } from 'react-router-dom'
//import { fetchPost, fetchComments, vote } from '../actions'
import '../styles/app.css'

class CreatePost extends Component {
  state = {
    postTitle: '',
    postAuthor: '',
    postCategory: '',
    postContent: ''
  }

   handleInputChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      })
    }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render () {
    return (
      <div>

        <div>
          <h1>Create New Post</h1>
          <form onSubmit={this.handleSubmit}>
            <div className='input-container'>
              <label for='post-title'>Title:
                <input
                  type='text'
                  name='postTitle'
                  id='post-title'
                  value={this.state.postTitle}
                  onChange={this.handleInputChange} />

              </label>
            </div>
            <div className='input-container'>
              <label for='post-author'>Author:
                <input
                  type='text'
                  name='postAuthor'
                  id='post-author'
                  value={this.state.postAuthor}
                  onChange={this.handleInputChange} />
              </label>
            </div>
            <div className='input-container'>
              <label for='post-category'>Category:
                <input
                  type='text'
                  name='postCategory'
                  id='post-category'
                  value={this.state.postCategory}
                  onChange={this.handleInputChange} />
              </label>
            </div>
            <div className='input-container'>
              <label for='post-content'>Content:
                <textarea
                  name='postContent'
                  id='post-content'
                  value={this.state.postContent}
                  onChange={this.handleInputChange} />
              </label>
            </div>
            <input type='submit' value='Submit' />
          </form>
        </div>


      </div>

          )
        }


  }

export default CreatePost
