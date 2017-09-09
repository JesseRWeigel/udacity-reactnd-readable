import { combineReducers } from 'redux'
import { GET_POST, GET_POST_BY_CATEGORY, RECEIVE_POSTS, RECEIVE_CATEGORIES, RECEIVE_COMMENTS } from '../actions'

function receivePosts (state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts
    default:
      return state
  }
}

function receiveCategories (state = null, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

function receiveComments (state = null, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {...state, comments: action.comments}
    default:
      return state
  }
}

function getPost (state = null, action) {
  switch (action.type) {
    case GET_POST:
      return action.post
    default:
      return state
  }
}

export default combineReducers({
  receivePosts,
  receiveCategories,
  receiveComments,
  getPost
})
