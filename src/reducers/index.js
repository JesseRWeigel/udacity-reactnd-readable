import { ADD_POST, RECEIVE_POSTS } from '../actions'

function receivePosts (state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS :
      return action.posts
    default :
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



export default receivePosts
