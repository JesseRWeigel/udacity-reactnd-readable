import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { withRouter } from 'react-router-dom'
import { addPost, fetchPost } from '../actions'
import '../styles/app.css'
const uuidv1 = require('uuid/v1')


class CreatePost extends Component {
    constructor(props) {
      super(props)
    }

  state = {
    postTitle: '',
    postAuthor: '',
    postCategory: '',
    postContent: ''
  }

    componentWillMount () {
      const k = this.props.match.params.post_id
      console.log(this.props.post)
      console.log(k)
      this.props.fetchData(k)
      this.setState({
        postTitle: this.props.post[k].title,
        postAuthor: this.props.post[k].author,
        postCategory: this.props.post[k].category,
        postContent: this.props.post[k].body
      })
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
    const data = {id: this.props.post[this.props.match.params.post_id].id,
      timestamp: this.props.post[this.props.match.params.post_id].timestamp,
      title: this.state.postTitle,
      body: this.state.postContent,
      author: this.state.postAuthor,
      category: this.state.postCategory,
      voteScore: this.props.post[this.props.match.params.post_id].voteScore,
      deleted: this.props.post[this.props.match.params.post_id].deleted}
    console.log(data)
    this.props.dispatch(addPost(data))
  }

  render () {
    return (
      <div>

        <div>
          <h1>Create New Post</h1>
          <form onSubmit={this.handleSubmit}>
            <div className='input-container'>
              <label htmlFor='post-title'>Title:
                <input
                  type='text'
                  name='postTitle'
                  id='post-title'
                  value={this.state.postTitle}
                  onChange={this.handleInputChange} />

              </label>
            </div>
            <div className='input-container'>
              <label htmlFor='post-author'>Author:
                <input
                  type='text'
                  name='postAuthor'
                  id='post-author'
                  value={this.state.postAuthor}
                  onChange={this.handleInputChange} />
              </label>
            </div>
            <div className='input-container'>
              <label htmlFor='post-category'>Category:
                <input
                  type='text'
                  name='postCategory'
                  id='post-category'
                  value={this.state.postCategory}
                  onChange={this.handleInputChange} />
              </label>
            </div>
            <div className='input-container'>
              <label htmlFor='post-content'>Content:
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

      const mapStateToProps = state => ({
        post: state.postsById,
      })

      const mapDispatchToProps = dispatch => ({ dispatch,
        fetchData: id =>
        dispatch(fetchPost(id))

      })

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
