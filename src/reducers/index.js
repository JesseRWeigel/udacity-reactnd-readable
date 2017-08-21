import { combineReducers } from 'redux'
import { ADD_POST, RECEIVE_POSTS, RECEIVE_CATEGORIES } from '../actions'

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

// function post (state, action) {
//   const { id, timestamp, title, body, author, category, voteScore, deleted } = action
//
//   switch (action.type) {
//     case ADD_POST :
//       return {
//         ...state,
//         [id]: {
//           ...state[id],
//           [category]: post.category,
//         }
//       }
//
//     default :
//       return state
//   }
// }

export default combineReducers({
  receivePosts,
  receiveCategories
})
