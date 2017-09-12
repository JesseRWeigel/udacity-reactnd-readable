import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchPost, fetchComments, vote } from '../actions'
import '../styles/app.css'

class PostDetail extends Component {
  constructor(props) {
    super(props)
  }

    componentWillMount () {
      this.props.fetchData(this.props.match.params.post_id)
    }

    submitVote = (id, voteType) => {
      this.props.dispatch(vote(id, voteType))
      console.log(id, voteType)
    }

  render () {
    return (
      <div>
        {this.props.post &&
          <div>
            <h1>{this.props.post.title}({this.props.post.voteScore} <span id='plus' onClick={ () => this.submitVote(this.props.post.id, 'upVote')}>+</span>/<span id='minus' onClick={() => this.submitVote(this.props.post.id, 'downVote')}>-</span>)</h1>
            <span className='author'>Author: {this.props.post.author}</span>
            <span className='timestamp'>Date: {new Date(this.props.post.timestamp).toDateString()}</span>


            <p>
              {this.props.post.body}
            </p>
            <span>Edit / Delete </span>
          </div>
        }

        <h2>Comments ({this.props.comments && this.props.comments.comments.length})</h2>
        {this.props.comments && this.props.comments.comments.length > 0 && this.props.comments.comments.map(comment =>
          <div key={comment.id}>
            <hr />
            <span className='author'>Comment by: {comment.author}</span>
            <span className='timestamp'>Date: {new Date(comment.timestamp).toDateString()}</span>
            <p>{comment.body} <span className='score'>({comment.voteScore} <span id='plus'>+</span>/<span id='minus'>-</span>)</span></p>
            <span>Edit / Delete </span>
          </div>
        )}

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
