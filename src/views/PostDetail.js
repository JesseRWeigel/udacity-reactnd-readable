import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchPost, fetchComments, vote, addComment, deletePost } from '../actions'
import EditComment from '../components/EditComment'
import '../styles/app.css'
const uuidv1 = require('uuid/v1')

class PostDetail extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    commentAuthor: '',
    commentContent: ''
  }

    componentWillMount () {
      this.props.fetchData(this.props.match.params.post_id)
    }

    submitVote = (id, voteType) => {
      this.props.dispatch(vote(id, voteType))
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

      handleEditSubmit = (event, id) => {
        event.preventDefault();
        const data = {
          id: this.props.post.id,
          timestamp: this.props.post.timestamp,
          title: this.state.postTitle,
          body: this.state.postContent,
          author: this.state.postAuthor,
          category: this.state.postCategory,
          voteScore: this.props.post.voteScore,
          deleted: this.props.post.deleted}
        console.log(data)
        this.props.dispatch(addComment(data))
      }

    deletePost = id => {
      this.props.dispatch(deletePost(id))
    }

  render () {
    return (
      <div>
        {this.props.post &&
          <div>
            <h1>{this.props.post.title}(Votes: {this.props.post.voteScore} <span id='plus' onClick={ () => this.submitVote(this.props.post.id, 'upVote')}>+</span>/<span id='minus' onClick={() => this.submitVote(this.props.post.id, 'downVote')}>-</span>)</h1>
              <span className='author'>Author: {this.props.post.author}</span>
              <span className='timestamp'>Date: {new Date(this.props.post.timestamp).toDateString()}</span>


              <p>
                {this.props.post.body}
              </p>
              <span><Link to={`/edit-post/${this.props.post.id}`}>
                Edit
              </Link> / <span onClick={() => this.deletePost(this.props.post.id)}>Delete</span> </span>
            </div>
            }

              <h2>Comments ({this.props.comments && this.props.comments.length})</h2>
              {this.props.comments && this.props.comments.length > 0 && this.props.comments.map(comment =>
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
                    <label htmlFor='comment-author'>Author:
                      <input
                        type='text'
                        name='commentAuthor'
                        id='comment-author'
                        value={this.state.commentAuthor}
                        onChange={this.handleInputChange} />
                    </label>
                  </div>

                  <div className='input-container'>
                    <label htmlFor='comment-content'>Content:
                      <textarea
                        name='commentContent'
                        id='comment-content'
                        value={this.state.commentContent}
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
          post: state.getPost,
          comments: state.receiveComments
        })

        const mapDispatchToProps = dispatch => ({ dispatch,
          fetchData: id =>
          dispatch(fetchPost(id)).then(() => dispatch(fetchComments(id)))

  })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail))
