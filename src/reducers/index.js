import { combineReducers } from 'redux'
import { GET_POST, RECEIVE_POSTS, RECEIVE_CATEGORIES } from '../actions'

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
  getPost
})
