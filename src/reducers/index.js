import { combineReducers } from 'redux'
import { GET_POST, GET_POSTS_BY_CATEGORY, RECEIVE_POSTS, RECEIVE_CATEGORIES, RECEIVE_COMMENTS, SET_SORTING, Sorting, VOTE, ADD_POST, COMMENT_VOTE, ADD_COMMENTS, DELETE_POST } from '../actions'
const { BY_DATE_NEWEST } = Sorting

const initialState = {
  sortBy: 'BY_DATE_NEWEST',
  posts: [],
  categories: {}
}

function sort (state = BY_DATE_NEWEST, action) {
  switch (action.type) {
    case SET_SORTING:
      return action.sortBy
    default:
      return state
  }
}

// function receivePosts (state = {}, action) {
//   switch (action.type) {
//     case RECEIVE_POSTS:
//       return action.posts
//     default:
//       return state
//   }
// }

function receiveCategories (state = null, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

function mapPosts(posts) {
  return posts.posts.map(post => {([post.id]: post)})
}

function postsById(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    return [...state, ...action.posts]

    case ADD_POST:
    return [...state, ...action.posts]

    case DELETE_POST:
    return [...state, ...action.posts]

    default:
    return state
  }
}

function getPostsByCategory (state = {}, action) {
  switch (action.type) {
    case GET_POSTS_BY_CATEGORY:
      return action.posts
    default:
      return state
  }
}

function receiveComments (state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return [...state, ...action.comments]
    case ADD_COMMENTS:
      return [...state, ...action.comments]
    case COMMENT_VOTE:
      return [...state, ...action.comments]
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

function postVote (state = null, action) {
  switch (action.type) {
    case GET_POST:
      return action.post
    default:
      return state
  }
}

export default combineReducers({
  // receivePosts,
  receiveCategories,
  getPostsByCategory,
  receiveComments,
  getPost,
  sort,
  postVote,
  postsById
})
